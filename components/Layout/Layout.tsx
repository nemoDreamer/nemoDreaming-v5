import Head from "next/head";
import * as React from "react";

import Footer from "./Footer";
import Header from "./Header";
import { PromptProps } from "./Terminal/Prompt";

export const name = "nemoDreaming";
export const siteTitle = "nemoDreaming | Philip Blyth";
export const description =
  "Interactive Media Design & Development Portfolio of Philip Blyth. Projects spanning Web, Print, Graphic, Motion, Photography & Illustration.";

const Layout: React.FC<{
  pageTitle?: string;
  prompt?: PromptProps;
  isHome?: boolean;
}> = ({ children, pageTitle, prompt, isHome = false }) => (
  <div className="flex flex-col min-h-screen">
    <Head>
      <link rel="icon" href="/favicon.ico" />
      <meta name="description" content={description} />
      <meta property="og:image" content="/og-image.png" />
      <meta
        name="og:title"
        content={pageTitle ? `${siteTitle} | ${pageTitle}` : siteTitle}
      />
      <meta name="twitter:card" content="summary_large_image" />
    </Head>

    <Header isHome={isHome} prompt={prompt} />

    {children}

    <Footer isHome={isHome} />
  </div>
);

export default Layout;
