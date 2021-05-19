import { AnimateSharedLayout } from "framer-motion";
import type { AppProps } from "next/app";
import React from "react";

import Layout from "../components/Layout/Layout";

import "tailwindcss/tailwind.css";

const App = ({
  Component,
  pageProps: { pageTitle, subHeader, prompt, isHome, ...pageProps },
}: AppProps): JSX.Element => (
  <AnimateSharedLayout>
    <Layout
      pageTitle={pageTitle}
      subHeader={subHeader}
      prompt={prompt}
      isHome={isHome}
    >
      <Component {...pageProps} />
    </Layout>
  </AnimateSharedLayout>
);

export default App;
