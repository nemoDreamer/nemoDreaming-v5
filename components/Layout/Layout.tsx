import classNames from "classnames";
import { Metadata } from "next";
import Head from "next/head";
import * as React from "react";

import Footer from "./Footer";
import Header from "./Header";
import { PromptProps } from "./Terminal/Prompt";

export const name = "nemoDreaming";
export const siteTitle = "nemoDreaming | Philip Blyth";
export const description =
  "Interactive Media Design & Development Portfolio of Philip Blyth. Projects spanning Web, Print, Graphic, Motion, Photography & Illustration.";

export const metadata: Metadata = {
  icons: { icon: "/favicon.ico" },
  description,
  twitter: { card: "summary_large_image" },
};

const Layout = ({
  children,
  pageTitle,
  prompt,
  isHome = false,
  className,
}: React.PropsWithChildren<{
  pageTitle?: string;
  prompt?: PromptProps;
  isHome?: boolean;
}> &
  React.HTMLAttributes<HTMLDivElement>) => (
  <div className={classNames(className, "flex flex-col min-h-screen")}>
    <Head>
      <meta property="og:image" content="/og-image.png" />
      <meta
        name="og:title"
        content={pageTitle ? `${siteTitle} | ${pageTitle}` : siteTitle}
      />
    </Head>

    <Header isHome={isHome} prompt={prompt} />

    {children}

    <Footer isHome={isHome} />
  </div>
);

export default Layout;
