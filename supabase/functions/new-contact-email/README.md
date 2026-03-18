# new-contact-email Edge Function

This function sends an email notification through Resend whenever a new row is inserted into `public.contact_messages`.

## Required secrets

Set these in Supabase:

- `RESEND_API_KEY`
- `RESEND_FROM_EMAIL` (example: `Ashenafi Portfolio <onboarding@resend.dev>`)
- `CONTACT_NOTIFY_EMAIL` (your inbox)
- `SUPABASE_WEBHOOK_SECRET` (random long secret string)

## Deploy

```bash
supabase functions deploy new-contact-email --no-verify-jwt
```

## Create Database Webhook

In Supabase Dashboard:

1. Go to **Database → Webhooks**.
2. Create webhook:
   - **Name:** `contact-message-email`
   - **Table:** `public.contact_messages`
   - **Events:** `INSERT`
   - **Type:** `HTTP Request`
   - **Method:** `POST`
   - **URL:** `https://<PROJECT_REF>.functions.supabase.co/new-contact-email`
3. Add header:
   - `x-webhook-secret: <SUPABASE_WEBHOOK_SECRET>`

Once set, every contact form insert triggers email delivery.
