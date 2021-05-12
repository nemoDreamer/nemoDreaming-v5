import { AnimateSharedLayout } from "framer-motion";
import type { AppProps } from "next/app";
import React from "react";

import "tailwindcss/tailwind.css";

const App = ({ Component, pageProps }: AppProps): JSX.Element => (
  <AnimateSharedLayout>
    <Component {...pageProps} />
  </AnimateSharedLayout>
);

export default App;
