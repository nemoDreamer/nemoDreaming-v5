import { GoogleAnalytics } from "@next/third-parties/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import classNames from "classnames";
import { LazyMotion, domAnimation } from "motion/react";
import type { Metadata } from "next";
import { Fira_Code, IBM_Plex_Mono, IBM_Plex_Sans } from "next/font/google";
import type { ReactNode } from "react";

import Footer from "@/components/Layout/Footer";
import Header from "@/components/Layout/Header";

import "./globals.scss";

const font_mono_override = IBM_Plex_Mono({
  weight: ["200", "400", "700"],
  subsets: ["latin-ext"],
  variable: "--font-mono-override",
  style: ["normal", "italic"],
});

const font_sans_override = IBM_Plex_Sans({
  weight: ["200", "400", "700"],
  subsets: ["latin-ext"],
  variable: "--font-sans-override",
  style: ["normal", "italic"],
});

const font_ascii = Fira_Code({
  weight: "variable",
  subsets: ["latin-ext"],
  variable: "--font-ascii",
  style: "normal",
});

export const metadata: Metadata = {
  title: {
    template: "%s | nemoDreaming",
    default: "nemoDreaming | Philip Blyth",
  },
  description:
    "Interactive Media Design & Development Portfolio of Philip Blyth. Projects spanning Web, Print, Graphic, Motion, Photography & Illustration.",
};

export default function RootLayout({
  children,
  prompt,
}: Readonly<{
  children: React.ReactNode;
  prompt: ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={classNames(
          font_mono_override.variable,
          font_sans_override.variable,
          font_ascii.variable,
          "font-sans antialiased",
          "flex flex-col min-h-screen",
        )}
      >
        <LazyMotion features={domAnimation}>
          <Header prompt={prompt} />

          {children}

          <Footer />
        </LazyMotion>

        <GoogleAnalytics gaId={process.env.GA_TRACKING_ID as string} />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
