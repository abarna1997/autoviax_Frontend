import { forwardRef, memo, useEffect, useImperativeHandle, useRef, useState } from "react";

declare global {
  interface Window {
    grecaptcha?: {
      render: (
        container: HTMLElement | string,
        parameters: {
          sitekey: string;
          theme?: "dark" | "light";
          size?: "normal" | "compact" | "invisible";
          callback?: (token: string) => void;
          "expired-callback"?: () => void;
          "error-callback"?: () => void;
        },
      ) => number;
      reset: (widgetId?: number) => void;
      getResponse: (widgetId?: number) => string;
      ready: (callback: () => void) => void;
    };
    onRecaptchaLoaded?: () => void;
  }
}

export interface ReCaptchaRef {
  reset: () => void;
  getResponse: () => string;
}

export interface ReCaptchaProps {
  siteKey?: string;
  onVerify: (token: string) => void;
  onExpire?: () => void;
  onError?: () => void;
  theme?: "dark" | "light";
  className?: string;
}

const DEFAULT_SITE_KEY =
  (import.meta.env.VITE_RECAPTCHA_SITE_KEY as string) || "6LfLfbotAAAAAOR5iAnqDOQahaL9B2j_apHDUrks";

export const ReCaptcha = memo(
  forwardRef<ReCaptchaRef, ReCaptchaProps>(
    (
      { siteKey = DEFAULT_SITE_KEY, onVerify, onExpire, onError, theme = "dark", className = "" },
      ref,
    ) => {
      const containerRef = useRef<HTMLDivElement>(null);
      const widgetIdRef = useRef<number | null>(null);
      const [isLoaded, setIsLoaded] = useState(false);

      // Keep callbacks in ref so re-renders don't re-trigger the render effect
      const callbacksRef = useRef({ onVerify, onExpire, onError });
      useEffect(() => {
        callbacksRef.current = { onVerify, onExpire, onError };
      });

      useImperativeHandle(ref, () => ({
        reset: () => {
          if (widgetIdRef.current !== null && typeof window.grecaptcha?.reset === "function") {
            try {
              window.grecaptcha.reset(widgetIdRef.current);
            } catch (e) {
              console.warn("reCAPTCHA reset error:", e);
            }
          }
        },
        getResponse: () => {
          if (
            widgetIdRef.current !== null &&
            typeof window.grecaptcha?.getResponse === "function"
          ) {
            try {
              return window.grecaptcha.getResponse(widgetIdRef.current);
            } catch {
              return "";
            }
          }
          return "";
        },
      }));

      // Load reCAPTCHA script
      useEffect(() => {
        if (typeof window === "undefined") return;

        if (window.grecaptcha && window.grecaptcha.render) {
          setIsLoaded(true);
          return;
        }

        const scriptId = "google-recaptcha-script";
        let script = document.getElementById(scriptId) as HTMLScriptElement | null;

        if (!script) {
          script = document.createElement("script");
          script.id = scriptId;
          script.src =
            "https://www.google.com/recaptcha/api.js?onload=onRecaptchaLoaded&render=explicit";
          script.async = true;
          script.defer = true;
          document.head.appendChild(script);
        }

        const prevCallback = window.onRecaptchaLoaded;
        window.onRecaptchaLoaded = () => {
          if (typeof prevCallback === "function") prevCallback();
          setIsLoaded(true);
        };
      }, []);

      // Render widget when script is loaded and container is ready
      useEffect(() => {
        if (!isLoaded || !containerRef.current || !window.grecaptcha) return;

        // Prevent re-rendering if already rendered in this container
        if (widgetIdRef.current !== null) {
          return;
        }

        let isMounted = true;

        const renderWidget = () => {
          if (!isMounted || widgetIdRef.current !== null || !containerRef.current) return;
          try {
            // Only render if container does not already have an iframe or widget
            if (containerRef.current.children.length === 0) {
              const widgetId = window.grecaptcha!.render(containerRef.current, {
                sitekey: siteKey,
                theme,
                callback: (token: string) => {
                  callbacksRef.current.onVerify(token);
                },
                "expired-callback": () => {
                  callbacksRef.current.onExpire?.();
                },
                "error-callback": () => {
                  callbacksRef.current.onError?.();
                },
              });
              widgetIdRef.current = widgetId;
            }
          } catch (err) {
            console.warn("reCAPTCHA rendering notice:", err);
          }
        };

        if (typeof window.grecaptcha.ready === "function") {
          window.grecaptcha.ready(renderWidget);
        } else {
          renderWidget();
        }

        return () => {
          isMounted = false;
        };
      }, [isLoaded, siteKey, theme]);

      return (
        <div className={`recaptcha-wrapper min-h-[78px] ${className}`}>
          <div ref={containerRef} />
        </div>
      );
    },
  ),
);

ReCaptcha.displayName = "ReCaptcha";
