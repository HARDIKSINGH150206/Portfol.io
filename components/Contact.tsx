"use client";

import { FormEvent, useState } from "react";
import {
  IconBrandGithub,
  IconBrandLinkedin,
  IconMail,
  IconSend,
} from "@tabler/icons-react";
import DottedLocationMap from "./DottedLocationMap";

type FormState = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

const initialFormState: FormState = {
  name: "",
  email: "",
  subject: "",
  message: "",
};

export default function Contact() {
  const [form, setForm] = useState<FormState>(initialFormState);
  const [status, setStatus] = useState("");

  const updateField = (field: keyof FormState, value: string) => {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!form.name || !form.email || !form.subject || !form.message) {
      setStatus("Please fill all fields.");
      return;
    }

    setStatus("Message ready. Email sending can be connected later.");
    setForm(initialFormState);
  };

  return (
    <section id="contact" className="bg-black px-6 py-20 sm:px-8 lg:px-10">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 lg:grid-cols-[0.9fr_1fr] lg:items-start">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-violet-400">
            Contact
          </p>
          <h2 className="mt-5 max-w-xl text-4xl font-semibold leading-tight tracking-tight text-white md:text-5xl">
            Let&apos;s build something useful.
          </h2>

          <p className="mt-5 max-w-xl text-base leading-8 text-zinc-400">
            I&apos;m open to collaborations, internships, hackathons, and
            product-focused engineering opportunities.
          </p>

          <div className="mt-7 space-y-3 text-sm text-zinc-400">
            <a
              href="mailto:hardikn.24.becs@acharya.ac.in"
              className="flex items-center gap-3 transition hover:text-white"
            >
              <IconMail className="h-4 w-4 text-violet-400" />
              hardikn.24.becs@acharya.ac.in
            </a>

            <a
              href="https://github.com/HARDIKSINGH150206"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-3 transition hover:text-white"
            >
              <IconBrandGithub className="h-4 w-4 text-violet-400" />
              github.com/HARDIKSINGH150206
            </a>

            <a
              href="https://www.linkedin.com/in/hardik-singh-/"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-3 transition hover:text-white"
            >
              <IconBrandLinkedin className="h-4 w-4 text-violet-400" />
              linkedin.com/in/hardik-singh-
            </a>
          </div>

          <DottedLocationMap />
        </div>

        <form
          onSubmit={handleSubmit}
          className="grid gap-5 rounded-3xl bg-zinc-950/30 p-6 md:p-8"
        >
          <div>
            <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.24em] text-zinc-400">
              Full name
            </label>
            <input
              value={form.name}
              onChange={(event) => updateField("name", event.target.value)}
              placeholder="Your full name"
              className="h-12 w-full rounded-xl bg-zinc-900/70 px-4 text-sm text-white outline-none transition placeholder:text-zinc-600 focus:ring-1 focus:ring-violet-400/60"
            />
          </div>

          <div>
            <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.24em] text-zinc-400">
              Email address
            </label>
            <input
              type="email"
              value={form.email}
              onChange={(event) => updateField("email", event.target.value)}
              placeholder="you@example.com"
              className="h-12 w-full rounded-xl bg-zinc-900/70 px-4 text-sm text-white outline-none transition placeholder:text-zinc-600 focus:ring-1 focus:ring-violet-400/60"
            />
          </div>

          <div>
            <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.24em] text-zinc-400">
              Subject / Company
            </label>
            <input
              value={form.subject}
              onChange={(event) => updateField("subject", event.target.value)}
              placeholder="What’s this regarding?"
              className="h-12 w-full rounded-xl bg-zinc-900/70 px-4 text-sm text-white outline-none transition placeholder:text-zinc-600 focus:ring-1 focus:ring-violet-400/60"
            />
          </div>

          <div>
            <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.24em] text-zinc-400">
              Message
            </label>
            <textarea
              value={form.message}
              onChange={(event) => updateField("message", event.target.value)}
              placeholder="Tell me about the project or opportunity..."
              rows={4}
              className="w-full resize-none rounded-xl bg-zinc-900/70 px-4 py-3 text-sm text-white outline-none transition placeholder:text-zinc-600 focus:ring-1 focus:ring-violet-400/60"
            />
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <button
              type="submit"
              className="inline-flex h-12 items-center gap-2 rounded-xl bg-violet-600 px-5 text-sm font-semibold text-white transition hover:bg-violet-500"
            >
              Send message
              <IconSend className="h-4 w-4" />
            </button>

            {status && <p className="text-sm text-zinc-500">{status}</p>}
          </div>
        </form>
      </div>
    </section>
  );
}