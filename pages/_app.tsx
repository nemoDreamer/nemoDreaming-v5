import type { AppProps } from "next/app";
import React from "react";
import "../styles/globals.css";

/* <link rel="stylesheet" href="https://use.typekit.net/fmg4grs.css"/> */

const App = ({ Component, pageProps }: AppProps): JSX.Element => (
  <Component {...pageProps} />
);

export default App;
