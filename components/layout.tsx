import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import * as React from "react";

export const name = "Your Name";
export const siteTitle = "Next.js Sample Website";
export const description =
  "Learn how to build a personal website using Next.js";

const Layout: React.FC<{
  isHome?: boolean;
}> = ({ children, isHome = false }) => (
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

    <header className={`${isHome ? "h-48" : "h-32"} bg-gray-500`} id="header">
      <div className="w-1/2 h-full mx-auto flex flex-col items-start justify-center bg-gray-600">
        <div className="h-10 w-20 flex flex-row items-center justify-center bg-black text-gray-50">
          Logo
        </div>
      </div>
    </header>

    <main className="flex-1 p-4">
      <div className="w-1/2 mx-auto">{children}</div>
    </main>

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
