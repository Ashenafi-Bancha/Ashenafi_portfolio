import React, { useEffect, useRef, useState } from 'react';

type TurnstileTheme = 'auto' | 'light' | 'dark';

interface TurnstileRenderOptions {
  sitekey: string;
  theme: TurnstileTheme;
  callback: (token: string) => void;
  'expired-callback': () => void;
  'error-callback': () => void;
}

interface TurnstileApi {
  render: (container: HTMLElement, options: TurnstileRenderOptions) => string;
  reset: (widgetId?: string) => void;
  remove?: (widgetId: string) => void;
}

declare global {
  interface Window {
    turnstile?: TurnstileApi;
    __turnstileScriptPromise?: Promise<void>;
  }
}

interface TurnstileWidgetProps {
  siteKey: string;
  onTokenChange: (token: string | null) => void;
  resetSignal: number;
  theme?: TurnstileTheme;
}

const TURNSTILE_SCRIPT_URL = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';

const loadTurnstileScript = async () => {
  if (window.turnstile) {
    return;
  }

  if (!window.__turnstileScriptPromise) {
    window.__turnstileScriptPromise = new Promise<void>((resolve, reject) => {
      const existingScript = document.querySelector(`script[src="${TURNSTILE_SCRIPT_URL}"]`);
      if (existingScript && window.turnstile) {
        resolve();
        return;
      }

      const script = document.createElement('script');
      script.src = TURNSTILE_SCRIPT_URL;
      script.async = true;
      script.defer = true;
      script.onload = () => resolve();
      script.onerror = () => reject(new Error('Unable to load Turnstile script.'));

      document.head.appendChild(script);
    });
  }

  await window.__turnstileScriptPromise;
};

const TurnstileWidget: React.FC<TurnstileWidgetProps> = ({
  siteKey,
  onTokenChange,
  resetSignal,
  theme = 'auto',
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [widgetId, setWidgetId] = useState<string | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const renderWidget = async () => {
      try {
        setLoadError(null);
        await loadTurnstileScript();

        if (!isMounted || !containerRef.current || !window.turnstile) {
          return;
        }

        containerRef.current.innerHTML = '';

        const id = window.turnstile.render(containerRef.current, {
          sitekey: siteKey,
          theme,
          callback: (token: string) => onTokenChange(token),
          'expired-callback': () => onTokenChange(null),
          'error-callback': () => onTokenChange(null),
        });

        setWidgetId(id);
      } catch {
        if (!isMounted) {
          return;
        }

        setLoadError('Unable to load anti-spam challenge. Please refresh and try again.');
        onTokenChange(null);
      }
    };

    if (siteKey) {
      renderWidget();
    } else {
      onTokenChange(null);
    }

    return () => {
      isMounted = false;
    };
  }, [siteKey, theme, onTokenChange]);

  useEffect(() => {
    if (!widgetId || !window.turnstile) {
      return;
    }

    window.turnstile.reset(widgetId);
    onTokenChange(null);
  }, [resetSignal, widgetId, onTokenChange]);

  return (
    <div>
      {loadError ? (
        <p className="text-sm text-red-700 dark:text-red-300">{loadError}</p>
      ) : (
        <div ref={containerRef} className="min-h-[65px]" />
      )}
    </div>
  );
};

export default TurnstileWidget;
