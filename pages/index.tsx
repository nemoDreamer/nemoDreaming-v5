import Head from "next/head";
import Link from "next/link";
import React from "react";

import Layout, { siteTitle } from "../components/layout";

const Home = (): JSX.Element => (
  <Layout isHome>
    <Head>
      <title>{siteTitle}</title>
    </Head>

    <h1 className="text-2xl font-bold">Home</h1>
    <p>
      <Link href="./about">
        <a>&rarr; About</a>
      </Link>
    </p>
  </Layout>
);

export default Home;
