import Head from "next/head";
import Link from "next/link";
import React from "react";

import Layout, { siteTitle } from "../components/layout";

const subHeader = (
  <>
    <h1 className="text-2xl font-bold">Home</h1>
    <p>
      <Link href="./about">
        <a>&rarr; About</a>
      </Link>
    </p>
  </>
);

const Home = (): JSX.Element => (
  <Layout isHome subHeader={subHeader}>
    <Head>
      <title>{siteTitle}</title>
    </Head>
  </Layout>
);

export default Home;
