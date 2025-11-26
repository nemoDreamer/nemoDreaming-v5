import { GoogleAnalytics } from "@next/third-parties/google";
import classNames from "classnames";
import { LazyMotion, domAnimation } from "motion/react";
import type { Metadata } from "next";
import { IBM_Plex_Mono, IBM_Plex_Sans } from "next/font/google";
import type { ReactNode } from "react";

import Footer from "@/components/Layout/Footer";
import Header from "@/components/Layout/Header";

import "./globals.scss";

const ibm_plex_mono = IBM_Plex_Mono({
  weight: ["200", "400", "700"],
  subsets: ["latin-ext"],
  variable: "--font-ibm-plex-mono",
  style: ["normal", "italic"],
});
const ibm_plex_sans = IBM_Plex_Sans({
  weight: ["200", "400", "700"],
  subsets: ["latin-ext"],
  variable: "--font-ibm-plex-sans",
  style: ["normal", "italic"],
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
      <GoogleAnalytics gaId={process.env.GA_TRACKING_ID as string} />

      <body
        className={classNames(
          ibm_plex_mono.variable,
          ibm_plex_sans.variable,
          "font-sans _antialiased",
          "flex flex-col min-h-screen",
        )}
      >
        <LazyMotion features={domAnimation}>
          <Header prompt={prompt} />

          {children}

          <Footer />
        </LazyMotion>
      </body>
    </html>
  );
}
