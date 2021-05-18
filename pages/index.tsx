import Head from "next/head";
import React from "react";

import ArrowLink from "../components/ArrowLink";
import Layout, { siteTitle } from "../components/layout";

const subHeader = (
  <>
    <h1>Home</h1>
    <p>
      <ArrowLink href="/about">About</ArrowLink>
    </p>
  </>
);

const Home = (): JSX.Element => (
  <Layout
    isHome
    subHeader={subHeader}
    prompt={{
      filePath: "index.tsx",
    }}
  >
    <Head>
      <title>{siteTitle}</title>
    </Head>
  </Layout>
);

export default Home;
