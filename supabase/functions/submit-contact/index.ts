import { createClient } from 'npm:@supabase/supabase-js@2';

interface SubmitContactPayload {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
  turnstileToken?: string;
  source?: string;
  userAgent?: string;
}

interface TurnstileVerificationResponse {
  success: boolean;
  'error-codes'?: string[];
}

const parseAllowedOrigins = () => {
  const value = Deno.env.get('ALLOWED_ORIGINS')?.trim();
  if (!value) {
    return [] as string[];
  }

  return value
    .split(',')
    .map((origin) => origin.trim())
    .filter(Boolean);
};

const resolveCorsOrigin = (requestOrigin: string | null) => {
  const allowedOrigins = parseAllowedOrigins();

  if (allowedOrigins.length === 0) {
    return requestOrigin || '*';
  }

  if (!requestOrigin) {
    return allowedOrigins[0];
  }

  return allowedOrigins.includes(requestOrigin) ? requestOrigin : null;
};

const getCorsHeaders = (origin: string) => ({
  'Access-Control-Allow-Origin': origin,
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  Vary: 'Origin',
});

const jsonResponse = (body: Record<string, unknown>, status = 200, origin = '*') =>
  new Response(JSON.stringify(body), {
    status,
    headers: {
      ...getCorsHeaders(origin),
      'Content-Type': 'application/json',
    },
  });

const normalize = (value: string | undefined, maxLength: number) => (value || '').trim().slice(0, maxLength);

const isEmailValid = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

Deno.serve(async (request) => {
  const requestOrigin = request.headers.get('origin');
  const corsOrigin = resolveCorsOrigin(requestOrigin);

  if (!corsOrigin) {
    return jsonResponse({ error: 'Origin not allowed' }, 403, requestOrigin || '*');
  }

  if (request.method === 'OPTIONS') {
    return new Response('ok', {
      status: 200,
      headers: getCorsHeaders(corsOrigin),
    });
  }

  if (request.method !== 'POST') {
    return jsonResponse({ error: 'Method not allowed' }, 405, corsOrigin);
  }

  let payload: SubmitContactPayload;

  try {
    payload = await request.json();
  } catch {
    return jsonResponse({ error: 'Invalid JSON body' }, 400, corsOrigin);
  }

  const name = normalize(payload.name, 120);
  const email = normalize(payload.email, 180).toLowerCase();
  const subject = normalize(payload.subject, 180);
  const message = normalize(payload.message, 4000);
  const turnstileToken = normalize(payload.turnstileToken, 4096);
  const source = normalize(payload.source, 80) || 'portfolio-site';
  const userAgent = normalize(payload.userAgent, 500) || null;

  if (name.length < 2) {
    return jsonResponse({ error: 'Name must be at least 2 characters.' }, 400, corsOrigin);
  }

  if (!isEmailValid(email)) {
    return jsonResponse({ error: 'Please provide a valid email address.' }, 400, corsOrigin);
  }

  if (subject.length < 2) {
    return jsonResponse({ error: 'Subject must be at least 2 characters.' }, 400, corsOrigin);
  }

  if (message.length < 10) {
    return jsonResponse({ error: 'Message must be at least 10 characters.' }, 400, corsOrigin);
  }

  if (!turnstileToken) {
    return jsonResponse({ error: 'Missing anti-spam verification token.' }, 400, corsOrigin);
  }

  const turnstileSecretKey = Deno.env.get('TURNSTILE_SECRET_KEY')?.trim();
  const supabaseUrl = Deno.env.get('SUPABASE_URL')?.trim();
  const supabaseServiceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')?.trim();
  const contactMessagesTable = Deno.env.get('CONTACT_MESSAGES_TABLE')?.trim() || 'contact_messages';

  if (!turnstileSecretKey || !supabaseUrl || !supabaseServiceRoleKey) {
    return jsonResponse(
      {
        error:
          'Function is not configured correctly. Set TURNSTILE_SECRET_KEY, SUPABASE_URL, and SUPABASE_SERVICE_ROLE_KEY.',
      },
      500,
      corsOrigin
    );
  }

  const turnstileBody = new URLSearchParams({
    secret: turnstileSecretKey,
    response: turnstileToken,
  });

  const xForwardedFor = request.headers.get('x-forwarded-for');
  if (xForwardedFor) {
    turnstileBody.set('remoteip', xForwardedFor.split(',')[0].trim());
  }

  const turnstileResponse = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: turnstileBody.toString(),
  });

  if (!turnstileResponse.ok) {
    return jsonResponse({ error: 'Turnstile verification service unavailable. Please try again.' }, 502, corsOrigin);
  }

  const turnstileResult = (await turnstileResponse.json()) as TurnstileVerificationResponse;
  if (!turnstileResult.success) {
    return jsonResponse(
      {
        error: 'Captcha verification failed. Please retry the challenge.',
        turnstileErrorCodes: turnstileResult['error-codes'] || [],
      },
      400,
      corsOrigin
    );
  }

  const supabaseAdmin = createClient(supabaseUrl, supabaseServiceRoleKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });

  const { data, error } = await supabaseAdmin
    .from(contactMessagesTable)
    .insert({
      name,
      email,
      subject,
      message,
      source,
      user_agent: userAgent,
    })
    .select('id')
    .single();

  if (error) {
    return jsonResponse({ error: `Database insert failed: ${error.message}` }, 500, corsOrigin);
  }

  return jsonResponse(
    {
      ok: true,
      message: 'Message submitted successfully.',
      id: data?.id ?? null,
    },
    201,
    corsOrigin
  );
});
