import { AnimateSharedLayout } from "framer-motion";
import type { AppProps, NextWebVitalsMetric } from "next/app";
import React from "react";

import Layout from "../components/Layout/Layout";

import "tailwindcss/tailwind.css";
import "../styles/global.scss";

export const reportWebVitals = ({
  id,
  name,
  label,
  value,
}: NextWebVitalsMetric): void => {
  // NOTE: see https://github.com/vercel/next.js/blob/canary/examples/with-google-analytics/pages/_document.js
  window.gtag("event", name, {
    event_category:
      label === "web-vital" ? "Web Vitals" : "Next.js custom metric",
    value: Math.round(name === "CLS" ? value * 1000 : value), // values must be integers
    event_label: id, // id unique to current page load
    non_interaction: true, // avoids affecting bounce rate.
  });
};

const App = ({
  Component,
  pageProps: { pageTitle, prompt, isHome, ...pageProps },
}: AppProps): JSX.Element => (
  <AnimateSharedLayout>
    <Layout pageTitle={pageTitle} prompt={prompt} isHome={isHome}>
      <Component {...pageProps} />
    </Layout>
  </AnimateSharedLayout>
);

export default App;
