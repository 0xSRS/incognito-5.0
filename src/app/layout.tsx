import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import "@/styles/globals.css";

export const metadata: Metadata = {
  title: "Incognito 5.0 — An Invitation to the Family",
  description: "Incognito 5.0 — a cinematic freshers invitation.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="theme-color" content="#0a0705" />
      </head>
      <body suppressHydrationWarning>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
