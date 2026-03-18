interface ContactMessageRecord {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  source?: string;
  user_agent?: string | null;
  created_at?: string;
}

interface WebhookPayload {
  type?: 'INSERT' | 'UPDATE' | 'DELETE' | string;
  table?: string;
  schema?: string;
  record?: ContactMessageRecord;
  old_record?: ContactMessageRecord | null;
}

const jsonHeaders = {
  'Content-Type': 'application/json',
};

const getEnv = (name: string) => Deno.env.get(name)?.trim();

const sanitize = (input: string) =>
  input
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');

Deno.serve(async (request) => {
  if (request.method !== 'POST') {
    return new Response(JSON.stringify({ ok: false, error: 'Method not allowed' }), {
      status: 405,
      headers: jsonHeaders,
    });
  }

  const expectedSecret = getEnv('SUPABASE_WEBHOOK_SECRET');
  if (expectedSecret) {
    const incomingSecret = request.headers.get('x-webhook-secret');
    if (!incomingSecret || incomingSecret !== expectedSecret) {
      return new Response(JSON.stringify({ ok: false, error: 'Unauthorized webhook request' }), {
        status: 401,
        headers: jsonHeaders,
      });
    }
  }

  let payload: WebhookPayload;

  try {
    payload = await request.json();
  } catch {
    return new Response(JSON.stringify({ ok: false, error: 'Invalid JSON payload' }), {
      status: 400,
      headers: jsonHeaders,
    });
  }

  if (payload.type !== 'INSERT') {
    return new Response(JSON.stringify({ ok: true, skipped: true, reason: 'Not an INSERT event' }), {
      status: 200,
      headers: jsonHeaders,
    });
  }

  const record = payload.record;
  if (!record) {
    return new Response(JSON.stringify({ ok: false, error: 'Missing record in webhook payload' }), {
      status: 400,
      headers: jsonHeaders,
    });
  }

  const resendApiKey = getEnv('RESEND_API_KEY');
  const resendFromEmail = getEnv('RESEND_FROM_EMAIL');
  const notifyEmail = getEnv('CONTACT_NOTIFY_EMAIL');

  if (!resendApiKey || !resendFromEmail || !notifyEmail) {
    return new Response(
      JSON.stringify({
        ok: false,
        error:
          'Missing required secrets. Set RESEND_API_KEY, RESEND_FROM_EMAIL, and CONTACT_NOTIFY_EMAIL.',
      }),
      {
        status: 500,
        headers: jsonHeaders,
      }
    );
  }

  const safeName = sanitize(record.name || 'Unknown');
  const safeEmail = sanitize(record.email || 'Unknown');
  const safeSubject = sanitize(record.subject || 'No subject');
  const safeMessage = sanitize(record.message || 'No message content');
  const safeSource = sanitize(record.source || 'portfolio-site');
  const safeCreatedAt = sanitize(record.created_at || new Date().toISOString());

  const subject = `New portfolio message: ${record.subject || 'No subject'}`;

  const html = `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #0f172a;">
      <h2 style="margin-bottom: 12px;">New Contact Message</h2>
      <p style="margin: 0 0 8px;"><strong>Name:</strong> ${safeName}</p>
      <p style="margin: 0 0 8px;"><strong>Email:</strong> ${safeEmail}</p>
      <p style="margin: 0 0 8px;"><strong>Subject:</strong> ${safeSubject}</p>
      <p style="margin: 0 0 8px;"><strong>Source:</strong> ${safeSource}</p>
      <p style="margin: 0 0 16px;"><strong>Created At:</strong> ${safeCreatedAt}</p>
      <div style="padding: 12px; border: 1px solid #cbd5e1; border-radius: 8px; background: #f8fafc; white-space: pre-wrap;">
        ${safeMessage}
      </div>
    </div>
  `;

  const text = [
    'New Contact Message',
    `Name: ${record.name}`,
    `Email: ${record.email}`,
    `Subject: ${record.subject}`,
    `Source: ${record.source || 'portfolio-site'}`,
    `Created At: ${record.created_at || new Date().toISOString()}`,
    '',
    'Message:',
    record.message,
  ].join('\n');

  const resendResponse = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${resendApiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: resendFromEmail,
      to: [notifyEmail],
      reply_to: record.email,
      subject,
      html,
      text,
      tags: [
        { name: 'source', value: 'portfolio-contact' },
        { name: 'table', value: payload.table || 'contact_messages' },
      ],
    }),
  });

  if (!resendResponse.ok) {
    const resendError = await resendResponse.text();
    return new Response(
      JSON.stringify({
        ok: false,
        error: 'Resend API request failed',
        details: resendError,
      }),
      {
        status: 502,
        headers: jsonHeaders,
      }
    );
  }

  const resendData = await resendResponse.json();

  return new Response(
    JSON.stringify({
      ok: true,
      message: 'Notification email sent',
      resendId: resendData?.id ?? null,
      contactMessageId: record.id,
    }),
    {
      status: 200,
      headers: jsonHeaders,
    }
  );
});
