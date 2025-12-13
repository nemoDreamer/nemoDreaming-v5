"use client";

import { GoogleAnalytics } from "@next/third-parties/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import classNames from "classnames";
import { LazyMotion, domAnimation } from "motion/react";
import { useEffect } from "react";

import Footer from "@/components/Layout/Footer";
import Header from "@/components/Layout/Header";
import Main from "@/components/Layout/Main";
import Prompt from "@/components/Terminal/Prompt";
import {
  font_ascii,
  font_mono_override,
  font_sans_override,
} from "@/utils/fonts";

import "./globals.scss";

export default function Error({
  error,
  // reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // eslint-disable-next-line no-console
    console.error(error);
  }, [error]);

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
          <Header prompt={<Prompt branch="bad" filePath="booboo.tsx" />} />

          <Main title="Oops!">
            <p>Something went wrong:</p>
            {error.message && (
              <pre className="text-red-300 bg-red-900 p-4 rounded">
                {error.message}
              </pre>
            )}
            {/* <button onClick={() => reset()}>Try again</button> */}
          </Main>

          <Footer />
        </LazyMotion>

        <GoogleAnalytics gaId={process.env.GA_TRACKING_ID as string} />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
