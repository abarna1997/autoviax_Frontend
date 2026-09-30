import { useState, useRef, useCallback, type FormEvent, type ChangeEvent } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowRight,
  Check,
  Mail,
  MapPin,
  Phone,
  Facebook,
  Youtube,
  Linkedin,
  Loader2,
} from "lucide-react";
import { toast } from "sonner";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Reveal } from "@/components/site/Reveal";
import { AmbientGlow, Eyebrow, GlassCard, Section } from "@/components/site/Primitives";
import { ReCaptcha, type ReCaptchaRef } from "@/components/site/ReCaptcha";

const FORMSPREE_ENDPOINT =
  (import.meta.env.VITE_FORMSPREE_ENDPOINT as string) || "https://formspree.io/f/mvkojdvq";

const RECAPTCHA_SITE_KEY =
  (import.meta.env.VITE_RECAPTCHA_SITE_KEY as string) || "6LfLfbotAAAAAOR5iAnqDOQahaL9B2j_apHDUrks";

const checkIsLocalhost = (): boolean => {
  if (typeof window === "undefined") return false;
  const { hostname } = window.location;
  return (
    hostname === "localhost" ||
    hostname === "127.0.0.1" ||
    hostname.endsWith(".localhost")
  );
};

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      {
        title: "Contact AutoViaX — Book a Mobility Intelligence Demo",
      },
      {
        name: "description",
        content:
          "Talk to the AutoViaX mobility team. Book a demo, reach an office in Sri Lanka or the United States, or send us a message.",
      },
      {
        property: "og:title",
        content: "Contact AutoViaX",
      },
      {
        property: "og:description",
        content: "Book a demo or reach our mobility engineering teams across two regions.",
      },
    ],
  }),

  component: Contact,
});

const OFFICES = [
  {
    city: "Sri Lanka",
    role: "Global HQ",
    address: "75 Station Road, Nugegoda, Sri Lanka",
    phone: "+94 11 267 9834",
    mapUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4018.1708871290275!2d79.8702962!3d6.8387427!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae25b1ee6003ca9%3A0x87fbde06718c9a9c!2s75%20Huludagoda%20Rd%2C%20Dehiwala-Mount%20Lavinia!5e1!3m2!1sen!2slk!4v1789188080495!5m2!1sen!2slk",
  },
  {
    city: "United States of America",
    role: "Automotive engineering",
    address: "500 North Brand Boulevard, Suite 1800, Glendale, CA 91203, USA",
    phone: "+1 818 555 6319",
    mapUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3349.0122057617696!2d-118.25712942436057!3d34.153455912379286!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80c2c0536c916921%3A0xa280dc108d01b149!2s500%20N%20Brand%20Blvd%20%231800%2C%20Glendale%2C%20CA%2091203%2C%20USA!5e1!3m2!1sen!2slk!4v1789188131716!5m2!1sen!2slk",
  },
];

function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [sent, setSent] = useState(false);
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);
  const [recaptchaError, setRecaptchaError] = useState(false);
  const recaptchaRef = useRef<ReCaptchaRef>(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    fleet: "",
    message: "",
  });

  const isLocalhost = checkIsLocalhost();

  const handleInputChange = useCallback(
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
    },
    []
  );

  const handleVerify = useCallback((token: string) => {
    setRecaptchaToken(token);
    setRecaptchaError(false);
  }, []);

  const handleExpire = useCallback(() => {
    setRecaptchaToken(null);
  }, []);

  const handleError = useCallback(() => {
    setRecaptchaToken(null);
  }, []);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!recaptchaToken && !isLocalhost) {
      setRecaptchaError(true);
      toast.error("reCAPTCHA verification required", {
        description: "Please check the box to confirm you are not a robot.",
      });
      return;
    }

    setIsSubmitting(true);
    setRecaptchaError(false);

    const payload: Record<string, string> = {
      ...formData,
    };
    if (recaptchaToken) {
      payload["g-recaptcha-response"] = recaptchaToken;
    }

    // Set a 12-second timeout to prevent indefinite hanging in production
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 12000);

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        signal: controller.signal,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      clearTimeout(timeoutId);

      if (response.ok) {
        setSent(true);
        setFormData({
          name: "",
          email: "",
          company: "",
          fleet: "",
          message: "",
        });
        setRecaptchaToken(null);
        recaptchaRef.current?.reset();

        toast.success("Message sent successfully", {
          description: "A mobility specialist will reply within one business day.",
        });
      } else {
        const errorData = (await response.json().catch(() => null)) as {
          error?: string;
          errors?: Array<{ message: string }>;
        } | null;

        const errorMsg =
          errorData?.errors?.map((err) => err.message).join(", ") ||
          errorData?.error ||
          "Failed to send message. Please verify your captcha or try again.";

        toast.error("Submission failed", {
          description: errorMsg,
        });

        setRecaptchaToken(null);
        recaptchaRef.current?.reset();
      }
    } catch (err: unknown) {
      clearTimeout(timeoutId);
      console.error("Contact form submission error:", err);

      const isTimeout = err instanceof Error && err.name === "AbortError";
      toast.error(isTimeout ? "Request timed out" : "Network error", {
        description: isTimeout
          ? "The server took too long to respond. Please try again."
          : "Unable to reach the server. Please check your connection or email us directly.",
      });

      setRecaptchaToken(null);
      recaptchaRef.current?.reset();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <GlassCard hover={false} className="glass-strong p-6 sm:p-9 isolate relative z-10">
      <h2 className="text-2xl font-semibold">Send a message</h2>

      <p className="mt-2 text-sm text-muted-foreground">
        Typical reply time: under one business day.
      </p>

      <form onSubmit={onSubmit} className="mt-8 grid gap-5 sm:grid-cols-2">
        {/* Full Name */}
        <div className="grid gap-2">
          <Label htmlFor="name">Full name</Label>
          <Input
            id="name"
            name="name"
            autoComplete="name"
            required
            placeholder="name"
            value={formData.name}
            onChange={handleInputChange}
          />
        </div>

        {/* Work Email */}
        <div className="grid gap-2">
          <Label htmlFor="email">Work email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            placeholder="email"
            value={formData.email}
            onChange={handleInputChange}
          />
        </div>

        {/* Company */}
        <div className="grid gap-2">
          <Label htmlFor="company">Company</Label>
          <Input
            id="company"
            name="company"
            autoComplete="organization"
            placeholder=""
            value={formData.company}
            onChange={handleInputChange}
          />
        </div>

        {/* Fleet Size */}
        <div className="grid gap-2">
          <Label htmlFor="fleet">Fleet size</Label>
          <Input
            id="fleet"
            name="fleet"
            placeholder="e.g. 480 units"
            value={formData.fleet}
            onChange={handleInputChange}
          />
        </div>

        {/* Message */}
        <div className="grid gap-2 sm:col-span-2">
          <Label htmlFor="message">What are you trying to solve?</Label>
          <Textarea
            id="message"
            name="message"
            rows={5}
            required
            placeholder="Tell us about your fleet operation and objectives..."
            value={formData.message}
            onChange={handleInputChange}
          />
        </div>

        {/* Google reCAPTCHA v2 */}
        <div className="grid gap-2 sm:col-span-2">
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <Label className="text-xs text-muted-foreground">Security Verification</Label>
              {isLocalhost && (
                <span className="text-[10px] font-mono text-primary/80 bg-primary/10 px-2 py-0.5 rounded">
                  Localhost Dev
                </span>
              )}
            </div>
            <div
              className={`inline-block max-w-full overflow-x-auto rounded-lg transition-all ${
                recaptchaError ? "ring-2 ring-destructive" : ""
              }`}
            >
              <ReCaptcha
                ref={recaptchaRef}
                siteKey={RECAPTCHA_SITE_KEY}
                theme="dark"
                onVerify={handleVerify}
                onExpire={handleExpire}
                onError={handleError}
              />
            </div>
            {recaptchaError && (
              <p className="text-xs font-medium text-destructive">
                Please check the box to verify you are human before submitting.
              </p>
            )}
          </div>
        </div>

        {/* Submit Button & Status */}
        <div className="sm:col-span-2 flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className="group inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-all duration-300 hover:shadow-[0_18px_50px_-18px] hover:shadow-primary/80 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <>
                <span>Sending message...</span>
                <Loader2 className="h-4 w-4 animate-spin" />
              </>
            ) : sent ? (
              <>
                <span>Message sent</span>
                <Check className="h-4 w-4" />
              </>
            ) : (
              <>
                <span>Send message</span>
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
              </>
            )}
          </button>

          {sent && (
            <button
              type="button"
              onClick={() => setSent(false)}
              className="text-xs text-muted-foreground hover:text-foreground underline underline-offset-4 transition-colors"
            >
              Send another message
            </button>
          )}
        </div>
      </form>
    </GlassCard>
  );
}

function Contact() {
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden px-5 pt-36 pb-10 sm:px-8 sm:pt-44">
        <AmbientGlow className="pointer-events-none top-0 left-1/4 h-[28rem] w-[28rem]" />

        <div className="relative mx-auto grid w-full max-w-7xl gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
          <div>
            <Reveal>
              <Eyebrow>Contact</Eyebrow>
            </Reveal>

            <Reveal delay={80}>
              <h1 className="mt-7 max-w-3xl text-[2.4rem] leading-[1.05] sm:text-6xl">
                Let's map your <span className="text-gradient">first corridor</span>.
              </h1>
            </Reveal>
          </div>

          <Reveal delay={140}>
            <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
              Whether you run three yard tractors or three thousand long-haul units, the
              conversation starts the same way: your constraints, your data, and what "good" looks
              like twelve months from now.
            </p>
          </Reveal>
        </div>
      </section>

      {/* FORM + CONTACT DETAILS */}
      <Section className="pt-10">
        <div className="grid gap-4 lg:grid-cols-[1.35fr_0.65fr]">
          {/* Contact Form */}
          <Reveal>
            <ContactForm />
          </Reveal>

          {/* CONTACT INFORMATION */}
          <Reveal delay={140}>
            <GlassCard className="p-7">
              <div className="space-y-5 text-sm">
                {/* USA Email */}
                <a
                  href="mailto:info.us@autoviax.net"
                  className="flex items-center gap-3 text-muted-foreground transition-colors hover:text-primary"
                >
                  <Mail className="h-4 w-4 shrink-0 text-primary" />
                  <span>info.us@autoviax.net</span>
                </a>

                {/* Sri Lanka Email */}
                <a
                  href="mailto:info.lk@autoviax.net"
                  className="flex items-center gap-3 text-muted-foreground transition-colors hover:text-primary"
                >
                  <Mail className="h-4 w-4 shrink-0 text-primary" />
                  <span>info.lk@autoviax.net</span>
                </a>

                {/* Phone */}
                <div className="flex items-center gap-3 text-muted-foreground">
                  <Phone className="h-4 w-4 shrink-0 text-primary" />
                  <div className="flex flex-wrap gap-x-2">
                    <a href="tel:+94112679834" className="transition-colors hover:text-primary">
                      +94 11 267 9834
                    </a>
                    <span>,</span>
                    <a href="tel:+18185556319" className="transition-colors hover:text-primary">
                      +1 818 555 6319
                    </a>
                  </div>
                </div>

                {/* Working Hours */}
                <p className="flex items-center gap-3 text-muted-foreground">
                  <MapPin className="h-4 w-4 shrink-0 text-primary" />
                  <span>Mon–Fri · 08:00–19:00 CET</span>
                </p>

                {/* SOCIAL MEDIA */}
                <div className="border-t border-border/50 pt-5">
                  <p className="mb-4 text-sm font-medium text-foreground">Follow AutoViaX</p>

                  <div className="flex flex-wrap items-center gap-3">
                    <a
                      href="https://www.facebook.com/Autoviax/"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Facebook"
                      className="flex h-10 w-10 items-center justify-center rounded-full border border-border/60 bg-background/40 text-muted-foreground transition-all duration-300 hover:border-primary/60 hover:bg-primary/10 hover:text-primary"
                    >
                      <Facebook className="h-4 w-4" />
                    </a>

                    <a
                      href="https://www.youtube.com/@Autoviax"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="YouTube"
                      className="flex h-10 w-10 items-center justify-center rounded-full border border-border/60 bg-background/40 text-muted-foreground transition-all duration-300 hover:border-primary/60 hover:bg-primary/10 hover:text-primary"
                    >
                      <Youtube className="h-4 w-4" />
                    </a>

                    <a
                      href="https://medium.com/@Autoviax/about"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Medium"
                      className="flex h-10 w-10 items-center justify-center rounded-full border border-border/60 bg-background/40 text-muted-foreground transition-all duration-300 hover:border-primary/60 hover:bg-primary/10 hover:text-primary"
                    >
                      <span className="text-sm font-bold">M</span>
                    </a>

                    <a
                      href="https://www.linkedin.com/company/autoviax-mobility/"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="LinkedIn"
                      className="flex h-10 w-10 items-center justify-center rounded-full border border-border/60 bg-background/40 text-muted-foreground transition-all duration-300 hover:border-primary/60 hover:bg-primary/10 hover:text-primary"
                    >
                      <Linkedin className="h-4 w-4" />
                    </a>

                    <a
                      href="https://www.crunchbase.com/organization/autoviax-4613"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Crunchbase"
                      className="flex h-10 w-10 items-center justify-center rounded-full border border-border/60 bg-background/40 text-muted-foreground transition-all duration-300 hover:border-primary/60 hover:bg-primary/10 hover:text-primary"
                    >
                      <span className="text-[10px] font-bold">CB</span>
                    </a>

                    <a
                      href="https://www.f6s.com/autoviax-mobility"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="F6S"
                      className="flex h-10 w-10 items-center justify-center rounded-full border border-border/60 bg-background/40 text-muted-foreground transition-all duration-300 hover:border-primary/60 hover:bg-primary/10 hover:text-primary"
                    >
                      <span className="text-[10px] font-bold">F6S</span>
                    </a>
                  </div>
                </div>
              </div>
            </GlassCard>
          </Reveal>
        </div>
      </Section>

      {/* OFFICES */}
      <Section className="pb-28">
        <Reveal>
          <Eyebrow>Offices</Eyebrow>
          <h2 className="mt-5 max-w-2xl text-3xl sm:text-4xl">Two regions, one operating team</h2>
        </Reveal>

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          {/* Sri Lanka */}
          <Reveal>
            <GlassCard hover={false} className="overflow-hidden p-0">
              <div className="p-6 sm:p-7">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <h3 className="text-xl">Sri Lanka</h3>
                  <span className="w-fit font-mono text-[10px] tracking-[0.18em] text-primary uppercase">
                    Global HQ
                  </span>
                </div>

                <div className="mt-4 space-y-1">
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    75 Station Road, Nugegoda, Sri Lanka
                  </p>
                  <p className="text-sm text-muted-foreground">+94 11 267 9834</p>
                </div>
              </div>

              <div className="h-[320px] w-full sm:h-[400px]">
                <iframe
                  title="AutoViaX Sri Lanka Office"
                  src={OFFICES[0].mapUrl}
                  className="h-full w-full border-0"
                  loading="lazy"
                  allowFullScreen
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </GlassCard>
          </Reveal>

          {/* USA */}
          <Reveal delay={100}>
            <GlassCard hover={false} className="overflow-hidden p-0">
              <div className="p-6 sm:p-7">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <h3 className="text-xl">United States of America</h3>
                  <span className="w-fit font-mono text-[10px] tracking-[0.18em] text-primary uppercase">
                    Automotive Engineering
                  </span>
                </div>

                <div className="mt-4 space-y-1">
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    500 North Brand Boulevard, Suite 1800, Glendale, CA 91203, USA
                  </p>
                  <p className="text-sm text-muted-foreground">+1 818 555 6319</p>
                </div>
              </div>

              <div className="h-[320px] w-full sm:h-[400px]">
                <iframe
                  title="AutoViaX United States Office"
                  src={OFFICES[1].mapUrl}
                  className="h-full w-full border-0"
                  loading="lazy"
                  allowFullScreen
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </GlassCard>
          </Reveal>
        </div>
      </Section>
    </>
  );
}