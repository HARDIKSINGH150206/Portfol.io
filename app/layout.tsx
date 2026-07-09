import type { Metadata } from "next";
import "leaflet/dist/leaflet.css";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const metadata: Metadata = {
  title: "Hardik Singh | AI/ML & Full-Stack Developer",
  description:
    "Minimal premium portfolio for Hardik Singh with GitHub-synced projects, coding activity, and recruiter-friendly contact details.",
  metadataBase: new URL(siteUrl),
  openGraph: {
    title: "Hardik Singh | Portfolio",
    description:
      "AI/ML and full-stack developer portfolio with dynamic GitHub projects and coding activity.",
    url: siteUrl,
    siteName: "Hardik Singh Portfolio",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-sans">
        <a
          href="#content"
          className="sr-only absolute left-4 top-4 z-[100] rounded-full bg-white px-4 py-2 text-sm font-medium text-black focus:not-sr-only"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
