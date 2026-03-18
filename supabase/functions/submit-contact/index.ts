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

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

const jsonResponse = (body: Record<string, unknown>, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: {
      ...corsHeaders,
      'Content-Type': 'application/json',
    },
  });

const normalize = (value: string | undefined, maxLength: number) => (value || '').trim().slice(0, maxLength);

const isEmailValid = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

Deno.serve(async (request) => {
  if (request.method === 'OPTIONS') {
    return new Response('ok', {
      status: 200,
      headers: corsHeaders,
    });
  }

  if (request.method !== 'POST') {
    return jsonResponse({ error: 'Method not allowed' }, 405);
  }

  let payload: SubmitContactPayload;

  try {
    payload = await request.json();
  } catch {
    return jsonResponse({ error: 'Invalid JSON body' }, 400);
  }

  const name = normalize(payload.name, 120);
  const email = normalize(payload.email, 180).toLowerCase();
  const subject = normalize(payload.subject, 180);
  const message = normalize(payload.message, 4000);
  const turnstileToken = normalize(payload.turnstileToken, 4096);
  const source = normalize(payload.source, 80) || 'portfolio-site';
  const userAgent = normalize(payload.userAgent, 500) || null;

  if (name.length < 2) {
    return jsonResponse({ error: 'Name must be at least 2 characters.' }, 400);
  }

  if (!isEmailValid(email)) {
    return jsonResponse({ error: 'Please provide a valid email address.' }, 400);
  }

  if (subject.length < 2) {
    return jsonResponse({ error: 'Subject must be at least 2 characters.' }, 400);
  }

  if (message.length < 10) {
    return jsonResponse({ error: 'Message must be at least 10 characters.' }, 400);
  }

  if (!turnstileToken) {
    return jsonResponse({ error: 'Missing anti-spam verification token.' }, 400);
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
      500
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
    return jsonResponse({ error: 'Turnstile verification service unavailable. Please try again.' }, 502);
  }

  const turnstileResult = (await turnstileResponse.json()) as TurnstileVerificationResponse;
  if (!turnstileResult.success) {
    return jsonResponse(
      {
        error: 'Captcha verification failed. Please retry the challenge.',
        turnstileErrorCodes: turnstileResult['error-codes'] || [],
      },
      400
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
    return jsonResponse({ error: `Database insert failed: ${error.message}` }, 500);
  }

  return jsonResponse(
    {
      ok: true,
      message: 'Message submitted successfully.',
      id: data?.id ?? null,
    },
    201
  );
});
