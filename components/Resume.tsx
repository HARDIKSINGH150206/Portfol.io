import { Download, FileText } from "lucide-react";
import fs from "node:fs";
import path from "node:path";
import SectionHeader from "./SectionHeader";

export default function Resume() {
  const resumePath = path.join(process.cwd(), "public", "resume.pdf");
  const hasResume = fs.existsSync(resumePath);

  return (
    <section id="resume" className="section-shell">
      <div className="container-shell">
        <SectionHeader
          eyebrow="Resume"
          title="Direct access for recruiters and collaborators."
          description="The resume is available as a simple download so it is easy to review offline or share quickly during screening."
        />

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
            <a
              href="/resume.pdf"
              download
              className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-3 text-sm font-medium text-text-secondary transition hover:border-accent-border hover:text-white"
            >
              <Download size={16} />
              Download Resume
            </a>
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
