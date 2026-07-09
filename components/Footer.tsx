export default function Footer() {
  return (
    <footer className="border-t border-white/5 py-8">
      <div className="container-shell flex flex-col items-start justify-between gap-3 text-sm text-text-muted sm:flex-row sm:items-center">
        <p>© {new Date().getFullYear()} Hardik Singh. Built with Next.js.</p>
        <p>Minimal, dark, API-synced portfolio MVP.</p>
      </div>
    </footer>
  );
}
