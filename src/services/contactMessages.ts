import { isSupabaseConfigured, supabaseAnonKey, supabaseFunctionsUrl } from '../lib/supabase';

export interface ContactMessageInput {
  name: string;
  email: string;
  subject: string;
  message: string;
  turnstileToken: string;
}

export const submitContactMessage = async ({
  name,
  email,
  subject,
  message,
  turnstileToken,
}: ContactMessageInput) => {
  if (!isSupabaseConfigured || !supabaseAnonKey) {
    return {
      ok: false,
      errorMessage: 'Messaging service is currently unavailable. Please try again later.',
    };
  }

  if (!turnstileToken) {
    return {
      ok: false,
      errorMessage: 'Captcha verification failed. Please complete the anti-spam challenge and try again.',
    };
  }

  try {
    const response = await fetch(`${supabaseFunctionsUrl}/submit-contact`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        apikey: supabaseAnonKey,
      },
      body: JSON.stringify({
        name: name.trim(),
        email: email.trim().toLowerCase(),
        subject: subject.trim(),
        message: message.trim(),
        turnstileToken,
        source: 'portfolio-site',
        userAgent: navigator.userAgent,
      }),
    });

    const payload = await response.json().catch(() => ({ message: 'Unexpected server response.' }));

    if (!response.ok) {
      return {
        ok: false,
        errorMessage: payload?.error || payload?.message || 'Unable to send message at the moment. Please try again.',
      };
    }

    return { ok: true, errorMessage: null };
  } catch {
    return {
      ok: false,
      errorMessage: 'Network error. Please check your connection and try again.',
    };
  }
};
