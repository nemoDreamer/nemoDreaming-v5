import classNames from "classnames";
import { motion } from "framer-motion";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import * as React from "react";

import Container from "./Container";
import Prompt from "./Terminal/Prompt";
import styles from "./layout.module.scss";

export const name = "nemoDreaming";
export const siteTitle = "nemoDreaming | Philip Blyth";
export const description =
  "Interactive Media Design & Development Portfolio of Philip Blyth. Projects spanning Web, Print, Graphic, Motion, Photography & Illustration.";

const getHeaderHeight = (isHome: boolean) => (isHome ? "252px" : "150px");

const Layout: React.FC<{
  isHome?: boolean;
  subHeader?: React.ReactNode;
}> = ({ children, isHome = false, subHeader }) => (
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
      <div className="flex flex-1 flex-col justify-end">
        <div
          className="mb-3"
          style={{
            backgroundColor: "#00403d",
            height: 20,
          }}
        >
          &nbsp;
        </div>
      </div>
      <Container disableLeftMargin disableRightMargin>
        <div className="flex flex-1 items-center justify-center">
          <div className="h-10 w-20 flex flex-row items-center justify-center bg-black text-gray-50">
            Logo
          </div>
        </div>
        <div className="mb-3">
          <Prompt filePath="about/README.md" />
        </div>
      </Container>
      <div className="flex flex-1">&nbsp;</div>
    </motion.header>

    <main className={styles.main} style={{ zIndex: 1 }}>
      {subHeader && (
        <div
          className={classNames(
            styles.subHeader,
            "bg-teal-500 text-teal-200 shadow-xl"
          )}
        >
          <Container className="py-4">{subHeader}</Container>
        </div>
      )}
      <Container className="py-4">{children}</Container>
    </main>

    <div className="flex-1"> </div>

    <footer className="flex flex-row items-center justify-center p-4 bg-gray-100">
      {!isHome && (
        <>
          <Link href="/">
            <a>← Back to home</a>
          </Link>
          <span className="mx-2">{" | "}</span>
        </>
      )}

      <a
        className="flex items-center"
        href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
        target="_blank"
        rel="noopener noreferrer"
      >
        Powered by{" "}
        <span className="inline-block h-4 ml-1">
          <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
        </span>
      </a>
    </footer>
  </div>
);

export default Layout;
