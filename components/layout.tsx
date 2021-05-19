import classNames from "classnames";
import { motion } from "framer-motion";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import * as React from "react";

import Container from "./Container";
import Prompt, { PromptProps } from "./Terminal/Prompt";
import styles from "./layout.module.scss";

export const name = "nemoDreaming";
export const siteTitle = "nemoDreaming | Philip Blyth";
export const description =
  "Interactive Media Design & Development Portfolio of Philip Blyth. Projects spanning Web, Print, Graphic, Motion, Photography & Illustration.";

const baseFontSize = 16;

const toRem = (px: number) => px / baseFontSize;
const toPx = (rem: number) => rem * baseFontSize;

const logoHeight = Math.round(518 / (1666 / 640));
const headerHeight = {
  min: toPx(toRem(logoHeight) + 3 - /* negative top~ and bottom-margins: */ 6),
  max: toPx(toRem(logoHeight) + 3),
};

const getHeaderHeight = (isHome: boolean) =>
  isHome ? `${headerHeight.max}px` : `${headerHeight.min}px`;

const Layout: React.FC<{
  isHome?: boolean;
  subHeader?: React.ReactNode;
  prompt?: PromptProps;
}> = ({ children, isHome = false, subHeader, prompt }) => (
  <div className="flex flex-col min-h-screen">
    <Head>
      <link rel="icon" href="/favicon.ico" />
      <meta name="description" content={description} />
      <meta
        property="og:image"
        content={`https://og-image.vercel.app/${encodeURIComponent(
          siteTitle
        )}.png?theme=light&md=0&fontSize=75px&images=${encodeURIComponent(
          "https://assets.vercel.com/image/upload/front/assets/design/nextjs-black-logo.svg"
        )}`}
      />
      <meta name="og:title" content={siteTitle} />
      <meta name="twitter:card" content="summary_large_image" />
    </Head>

    <motion.header
      layoutId="header"
      transition={{ type: "spring", bounce: 0, duration: 0.5 }}
      initial={{ height: getHeaderHeight(!isHome) }}
      animate={{ height: getHeaderHeight(isHome) }}
      className="bg-teal-500 shadow-xl flex z-20"
    >
      <Container className="py-2 px-4">
        <div
          // NOTE: negative margins to not make the image's shaddow "count"
          className={"flex flex-1 items-center justify-center -mt-14 -mb-10"}
        >
          <Image
            src="/logo.png"
            width={640}
            height={199}
            className="flex items-center justify-center"
            priority
          />
        </div>
        <Prompt {...prompt} />
      </Container>
    </motion.header>

    <main className={classNames(styles.base, "flex-1 z-10")}>
      {subHeader && (
        <section className={"bg-teal-500 text-teal-200 shadow-xl"}>
          <Container className={classNames(styles.subHeader, "py-4 px-4")}>
            {subHeader}
          </Container>
        </section>
      )}
      <Container className={classNames(styles.children, "py-4 px-4")}>
        {children}
      </Container>
    </main>

    <footer className="flex flex-col md:flex-row items-center justify-center md:space-x-1 p-4 text-gray-500 bg-gray-100 text-xs">
      {!isHome && (
        <span className="font-extralight">
          <Link href="/">
            <a>← Back to home</a>
          </Link>
          <span>{" | "}</span>
        </span>
      )}

      <span>
        Design & Code by <span className="font-bold">Philip Blyth</span>
        <span>{" | "}</span>
      </span>

      <a
        className="flex items-center"
        href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
        target="_blank"
        rel="noopener noreferrer"
      >
        Powered by Next.js &
        <span className="inline-block h-3.5 ml-1">
          <Image src="/vercel.svg" alt="Vercel Logo" width={45} height={10} />
        </span>
      </a>
    </footer>
  </div>
);

export default Layout;
