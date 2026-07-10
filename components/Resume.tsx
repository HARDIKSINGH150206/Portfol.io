import { Download, ExternalLink, FileText } from "lucide-react";
import fs from "node:fs";
import path from "node:path";

export default function Resume() {
  const resumePath = path.join(process.cwd(), "public", "resume.pdf");
  const hasResume = fs.existsSync(resumePath);
  const resumeDocsUrl = "https://drive.google.com/file/d/1dqK-iqgqZ12pAZ13f05dxTxA1qtLn01c/view";

  return (
    <section id="resume" className="section-shell">
      <div className="container-shell">
        <div className="mb-14 max-w-4xl">
          <h1 className="text-5xl font-semibold tracking-tight text-white md:text-6xl lg:text-7xl">
            RESUME
          </h1>

          <h2 className="mt-5 max-w-3xl text-[clamp(1rem,1.5vw,1.25rem)] font-medium leading-8 text-violet-400">
            A quick snapshot of my work, skills, and project experience.
          </h2>

          <p className="mt-6 max-w-3xl text-base leading-8 text-zinc-400 md:text-lg">
            Download my latest resume for a concise overview of my technical background, full-stack projects, AI/ML work, hackathon experience, and hands-on product development exposure.
          </p>
        </div>

        <div className="surface-card flex flex-col items-start justify-between gap-6 p-8 md:flex-row md:items-center">
          <div className="flex items-start gap-4">
            <div className="rounded-2xl border border-border p-3 text-accent">
              <FileText size={22} />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-white">Resume PDF</h3>
              <p className="mt-2 muted-copy">
                {hasResume
                  ? "Download the current resume in a clean PDF format."
                  : "Resume file is not available yet. Add `public/resume.pdf` to enable downloads."}
              </p>
            </div>
          </div>

          {hasResume ? (
            <div className="flex items-center gap-3">
              <a
                href={resumeDocsUrl}
                target="_blank"
                rel="noreferrer"
                aria-label="Open resume in Google Docs"
                title="Open resume in Google Docs"
                className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-zinc-800 bg-black text-zinc-300 transition hover:border-violet-400/60 hover:text-white"
              >
                <ExternalLink className="h-5 w-5" />
              </a>

              <a
                href="/resume.pdf"
                download
                className="inline-flex h-12 items-center gap-2 rounded-full border border-zinc-800 bg-black px-6 text-sm font-medium text-zinc-300 transition hover:border-violet-400/60 hover:text-white"
              >
                <Download className="h-4 w-4" />
                Download Resume
              </a>
            </div>
          ) : (
            <span className="rounded-full border border-dashed border-border px-5 py-3 text-sm text-text-muted">
              Resume unavailable
            </span>
          )}
        </div>
      </div>
    </section>
  );
}
