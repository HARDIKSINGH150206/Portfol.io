"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { Github, Linkedin, Mail } from "lucide-react";
import { ChangeEvent, FormEvent, useMemo, useState } from "react";
import SectionHeader from "./SectionHeader";

const DynamicLocationMap = dynamic(() => import("./LocationMap"), {
  ssr: false,
  loading: () => (
    <div className="flex h-[320px] items-center justify-center rounded-3xl border border-border bg-card text-sm text-text-muted">
      Loading map...
    </div>
  ),
});

type ContactProps = {
  githubUsername: string;
};

type FormState = {
  fullName: string;
  email: string;
  subject: string;
  message: string;
};

const initialState: FormState = {
  fullName: "",
  email: "",
  subject: "",
  message: "",
};

export default function Contact({ githubUsername }: ContactProps) {
  const [form, setForm] = useState<FormState>(initialState);
  const [errors, setErrors] = useState<Partial<FormState>>({});
  const [submitted, setSubmitted] = useState(false);

  const socials = useMemo(
    () => [
      {
        label: "Email",
        value: "hardik.singh@example.com",
        href: "mailto:hardik.singh@example.com",
        icon: Mail,
      },
      {
        label: "GitHub",
        value: `github.com/${githubUsername}`,
        href: `https://github.com/${githubUsername}`,
        icon: Github,
      },
      {
        label: "LinkedIn",
        value: "linkedin.com/in/hardik-singh",
        href: "https://www.linkedin.com/in/hardik-singh/",
        icon: Linkedin,
      },
    ],
    [githubUsername],
  );

  function validate(values: FormState) {
    const nextErrors: Partial<FormState> = {};

    if (!values.fullName.trim()) nextErrors.fullName = "Full name is required.";
    if (!values.email.trim()) {
      nextErrors.email = "Email address is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
      nextErrors.email = "Enter a valid email address.";
    }
    if (!values.subject.trim()) nextErrors.subject = "Subject is required.";
    if (!values.message.trim()) nextErrors.message = "Message is required.";

    return nextErrors;
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validate(form);

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      setSubmitted(false);
      return;
    }

    setErrors({});
    setSubmitted(true);
    setForm(initialState);
  }

  function handleChange(
    key: keyof FormState,
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    setForm((current) => ({ ...current, [key]: event.target.value }));
    setSubmitted(false);
    setErrors((current) => {
      if (!current[key]) {
        return current;
      }

      return { ...current, [key]: undefined };
    });
  }

  return (
    <section id="contact" className="section-shell">
      <div className="container-shell">
        <SectionHeader
          eyebrow="Contact"
          title="Open to product, platform, and AI-focused opportunities."
          description="The contact flow is intentionally simple for the MVP: validated form fields, clean feedback, and a privacy-safe optional location map."
        />

        <div className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            className="surface-card p-8"
          >
            <div className="flex items-start gap-4">
              <div className="rounded-2xl border border-border p-3 text-accent">
                <Mail size={20} />
              </div>
              <div className="space-y-3">
                <h3 className="text-2xl font-semibold text-white">Let&apos;s talk.</h3>
                <p className="muted-copy">
                  For internships, product builds, hackathons, or engineering
                  collaboration, use the form or reach out directly through the
                  channels below.
                </p>
              </div>
            </div>

            <div className="mt-8 grid gap-3">
              {socials.map((item) => {
                const Icon = item.icon;

                return (
                  <a
                    key={item.label}
                    href={item.href}
                    target={item.href.startsWith("http") ? "_blank" : undefined}
                    rel={item.href.startsWith("http") ? "noreferrer" : undefined}
                    className="rounded-2xl border border-border p-4 transition hover:border-accent-border hover:bg-card-hover"
                  >
                    <div className="flex items-center gap-3">
                      <Icon size={18} className="text-accent" />
                      <div>
                        <p className="text-sm font-medium text-white">{item.label}</p>
                        <p className="text-sm text-text-secondary">{item.value}</p>
                      </div>
                    </div>
                  </a>
                );
              })}
            </div>

            <div className="mt-8">
              <DynamicLocationMap />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.45, delay: 0.08, ease: "easeOut" }}
            className="surface-card p-8"
          >
            <h3 className="text-2xl font-semibold text-white">Send a message</h3>
            <p className="mt-3 muted-copy">
              Form submission is frontend-only for the MVP. It validates input and
              shows success feedback without storing data or sending email yet.
            </p>

            <form className="mt-8 space-y-5" onSubmit={handleSubmit} noValidate>
              <div>
                <label htmlFor="fullName" className="mb-2 block text-sm text-white">
                  Full name
                </label>
                <input
                  id="fullName"
                  name="fullName"
                  value={form.fullName}
                  autoComplete="name"
                  aria-invalid={Boolean(errors.fullName)}
                  aria-describedby={errors.fullName ? "fullName-error" : undefined}
                  onChange={(event) => handleChange("fullName", event)}
                  className="input-shell"
                  placeholder="Your full name"
                />
                {errors.fullName ? (
                  <p id="fullName-error" className="mt-2 text-sm text-text-muted">
                    {errors.fullName}
                  </p>
                ) : null}
              </div>

              <div>
                <label htmlFor="email" className="mb-2 block text-sm text-white">
                  Email address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={form.email}
                  autoComplete="email"
                  inputMode="email"
                  aria-invalid={Boolean(errors.email)}
                  aria-describedby={errors.email ? "email-error" : undefined}
                  onChange={(event) => handleChange("email", event)}
                  className="input-shell"
                  placeholder="you@example.com"
                />
                {errors.email ? (
                  <p id="email-error" className="mt-2 text-sm text-text-muted">
                    {errors.email}
                  </p>
                ) : null}
              </div>

              <div>
                <label htmlFor="subject" className="mb-2 block text-sm text-white">
                  Subject
                </label>
                <input
                  id="subject"
                  name="subject"
                  value={form.subject}
                  autoComplete="off"
                  aria-invalid={Boolean(errors.subject)}
                  aria-describedby={errors.subject ? "subject-error" : undefined}
                  onChange={(event) => handleChange("subject", event)}
                  className="input-shell"
                  placeholder="How can I help?"
                />
                {errors.subject ? (
                  <p id="subject-error" className="mt-2 text-sm text-text-muted">
                    {errors.subject}
                  </p>
                ) : null}
              </div>

              <div>
                <label htmlFor="message" className="mb-2 block text-sm text-white">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={6}
                  value={form.message}
                  autoComplete="off"
                  aria-invalid={Boolean(errors.message)}
                  aria-describedby={errors.message ? "message-error" : undefined}
                  onChange={(event) => handleChange("message", event)}
                  className="input-shell resize-y"
                  placeholder="Share the context, role, or project."
                />
                {errors.message ? (
                  <p id="message-error" className="mt-2 text-sm text-text-muted">
                    {errors.message}
                  </p>
                ) : null}
              </div>

              <button
                type="submit"
                className="rounded-full bg-white px-6 py-3 text-sm font-medium text-black transition hover:bg-white/90"
              >
                Submit
              </button>

              {submitted ? (
                <p className="text-sm text-text-secondary" role="status" aria-live="polite">
                  Message submitted successfully for the MVP flow.
                </p>
              ) : null}
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
