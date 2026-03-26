# Supabase + Turnstile Setup for Contact Form and Email Alerts

This portfolio contact system now uses a secure flow:

1. Browser completes Cloudflare Turnstile challenge.
2. Browser sends form data to `submit-contact` Edge Function.
3. Function verifies Turnstile token server-side.
4. Function inserts message into `public.contact_messages`.
5. Database webhook triggers `new-contact-email` function and sends notification email via Resend.

---

## 1) Create Supabase project

1. Go to [https://supabase.com](https://supabase.com) and create a new project.
2. Choose a strong DB password and nearest region.

---

## 2) Create contact table and policies

1. Open Supabase **SQL Editor**.
2. Run:

- `supabase/contact_messages.sql`

Important: this SQL keeps RLS enabled and does **not** allow anonymous direct inserts.
All inserts should happen through the `submit-contact` Edge Function.

---

## 3) Create Cloudflare Turnstile keys

1. Go to [https://dash.cloudflare.com](https://dash.cloudflare.com) → Turnstile.
2. Create a new widget for your domain (`localhost` while developing).
3. Copy:

- Site Key (public)
- Secret Key (server)

---

## 4) Configure local frontend `.env`

Set these in local `.env`:

```env
VITE_SUPABASE_URL=https://your-project-ref.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-public-key
VITE_TURNSTILE_SITE_KEY=your-turnstile-site-key
```

---

## 5) Deploy secure submit function

Function file:

- `supabase/functions/submit-contact/index.ts`

### 5.1 Set required secrets

```bash
supabase secrets set \
  TURNSTILE_SECRET_KEY=your_turnstile_secret \
  SUPABASE_SERVICE_ROLE_KEY=your_service_role_key \
  ALLOWED_ORIGINS=https://ashenafi.dev,http://localhost:5173 \
  CONTACT_MESSAGES_TABLE=contact_messages
```

Notes:

- `SUPABASE_SERVICE_ROLE_KEY` is from Supabase **Project Settings → API**.
- Never expose this key in frontend code.

### 5.2 Deploy

```bash
supabase functions deploy submit-contact --no-verify-jwt
```

`--no-verify-jwt` is used because this endpoint validates Turnstile token instead of requiring an authenticated Supabase user session.

---

## 6) Deploy email notification function

Function file:

- `supabase/functions/new-contact-email/index.ts`

### 6.1 Prepare Resend

1. Create account at [https://resend.com](https://resend.com)
2. Get API key
3. Verify sender domain/email

### 6.2 Set secrets

```bash
supabase secrets set \
  RESEND_API_KEY=your_resend_api_key \
  RESEND_FROM_EMAIL="Ashenafi Portfolio <onboarding@resend.dev>" \
  CONTACT_NOTIFY_EMAIL=your_email@example.com \
  SUPABASE_WEBHOOK_SECRET=your_long_random_secret
```

### 6.3 Deploy

```bash
supabase functions deploy new-contact-email --no-verify-jwt
```

---

## 7) Create database webhook for email alerts

In Supabase Dashboard:

1. Go to **Database → Webhooks**.
2. Create webhook:
   - Name: `contact-message-email`
   - Table: `public.contact_messages`
   - Event: `INSERT`
   - Type: `HTTP Request`
   - Method: `POST`
   - URL: `https://<PROJECT_REF>.functions.supabase.co/new-contact-email`
3. Add header:
   - `x-webhook-secret: <SUPABASE_WEBHOOK_SECRET>`

---

## 8) Test full flow

1. Run app:

```bash
npm run dev
```

2. Submit contact form and complete Turnstile.
3. Verify:
   - Row inserted in `contact_messages`
   - Notification email received

---

## Troubleshooting

- Message fails with captcha error:
  - Check `VITE_TURNSTILE_SITE_KEY` and `TURNSTILE_SECRET_KEY`
  - Recreate widget and retest
- Message fails with server error:
  - Check `submit-contact` function logs
  - Confirm `SUPABASE_SERVICE_ROLE_KEY` secret exists
- Row inserted but no email:
  - Check webhook logs
  - Verify Resend secrets and sender identity
  - Verify `x-webhook-secret`

---

## Security rules

- Never expose `SUPABASE_SERVICE_ROLE_KEY` in frontend.
- Keep RLS enabled on `contact_messages`.
- Keep `SUPABASE_WEBHOOK_SECRET` private.
- Rotate secrets if compromised.
