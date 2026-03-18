# submit-contact Edge Function

This function receives contact-form data, validates Cloudflare Turnstile token, and inserts a row into `public.contact_messages` using the Supabase service role key.

## Required secrets

Set these secrets in Supabase:

- `TURNSTILE_SECRET_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `CONTACT_MESSAGES_TABLE` (optional, default: `contact_messages`)

`SUPABASE_URL` is already available in Supabase Edge Functions runtime.

## Deploy

```bash
supabase functions deploy submit-contact --no-verify-jwt
```

## Example request payload

```json
{
  "name": "Ashenafi",
  "email": "ashenafi@example.com",
  "subject": "Internship Opportunity",
  "message": "I want to discuss a software engineering internship role.",
  "turnstileToken": "<token-from-widget>",
  "source": "portfolio-site",
  "userAgent": "Mozilla/5.0 ..."
}
```
