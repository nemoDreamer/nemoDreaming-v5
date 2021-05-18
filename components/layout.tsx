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

const getHeaderHeight = (isHome: boolean) => (isHome ? "252px" : "150px");

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
      transition={{ type: "spring", bounce: 0.125, duration: 0.5 }}
      initial={{ height: getHeaderHeight(!isHome) }}
      animate={{ height: getHeaderHeight(isHome) }}
      className="bg-teal-500 shadow-xl flex flex-row"
      style={{ zIndex: 2 }}
    >
      <Container>
        <div
          // NOTE: negative margins to not make the image's shaddow "count"
          className={"flex flex-1 items-center justify-center -mt-10 -mb-10"}
        >
          <Image
            src="/logo.png"
            width={816}
            height={249}
            className="flex flex-row items-center justify-center"
          />
        </div>
        <div className="mb-3">
          <Prompt {...prompt} />
        </div>
      </Container>
    </motion.header>

    <main className={styles.main} style={{ zIndex: 1 }}>
      {subHeader && (
        <div
          className={classNames(
            styles.subHeader,
            "bg-teal-500 text-teal-200 shadow-xl"
          )}
        >
          <Container className="py-4">
            <div className="px-2">{subHeader}</div>
          </Container>
        </div>
      )}
      <Container className="py-4">
        <div className="px-2">{children}</div>
      </Container>
    </main>

    <div className="flex-1"> </div>

    <footer className="flex flex-col md:flex-row items-center justify-center md:space-x-1 p-4 bg-gray-100 text-xs">
      {!isHome && (
        <span className="font-extralight">
          <Link href="/">
            <a>← Back to home</a>
          </Link>
          <span>{" | "}</span>
        </span>
      )}

      <span>
        Designed by <span className="font-bold">Philip Blyth</span> |
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
