import { GoogleAnalytics } from "@next/third-parties/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import classNames from "classnames";
import { LazyMotion, domMin } from "motion/react";
import type { Metadata } from "next";
import type { ReactNode } from "react";

import Footer from "@/components/Layout/Footer";
import Header from "@/components/Layout/Header";
import {
  font_ascii,
  font_mono_override,
  font_sans_override,
} from "@/utils/fonts";

import "./globals.scss";

export const metadata: Metadata = {
  metadataBase: new URL("https://nemodreaming.com"),
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
        <LazyMotion features={domMin}>
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
