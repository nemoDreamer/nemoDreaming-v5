import classNames from "classnames";
import { LazyMotion } from "framer-motion";
import type { AppProps } from "next/app";
import { IBM_Plex_Mono, IBM_Plex_Sans } from "next/font/google";
import Script from "next/script";
import { useReportWebVitals } from "next/web-vitals";

import Layout from "../components/Layout/Layout";

import "../styles/global.scss";

// defer loading:
const loadFeatures = () =>
  import("@/lib/framer-motion-features").then((res) => res.default);

const GA_TRACKING_ID = process.env.GA_TRACKING_ID; // "G-Z8RFGTQHDF"

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

const App = ({
  Component,
  pageProps: { pageTitle, prompt, isHome, ...pageProps },
}: AppProps): JSX.Element => {
  useReportWebVitals(({ id, name, label, value }): void => {
    // NOTE: see https://github.com/vercel/next.js/blob/canary/examples/with-google-analytics/pages/_document.js
    window.gtag("event", name, {
      event_category:
        label === "web-vital" ? "Web Vitals" : "Next.js custom metric",
      value: Math.round(name === "CLS" ? value * 1000 : value), // values must be integers
      event_label: id, // id unique to current page load
      non_interaction: true, // avoids affecting bounce rate.
    });
  });

  return (
    <LazyMotion features={loadFeatures}>
      <Layout
        pageTitle={pageTitle}
        prompt={prompt}
        isHome={isHome}
        className={classNames(
          ibm_plex_mono.variable,
          ibm_plex_sans.variable,
          "font-sans",
        )}
      >
        <Component {...pageProps} />

        {/* Global site tag (gtag.js) - Google Analytics */}
        <Script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
        />
        <Script
          id="ga-tracking"
          dangerouslySetInnerHTML={{
            __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag() {
                  dataLayer.push(arguments);
                }
                gtag('js', new Date());
                gtag('config', '${GA_TRACKING_ID}', {
                  page_path: window.location.pathname,
                });
              `,
          }}
        />
      </Layout>
    </LazyMotion>
  );
};

export default App;
