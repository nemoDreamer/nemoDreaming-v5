import Head from "next/head";
import Link from "next/link";
import React from "react";

import Layout, { siteTitle } from "../../components/layout";

const About = (): JSX.Element => (
  <Layout>
    <Head>
      <title>{siteTitle} | About</title>
    </Head>

    <h1 className="text-2xl font-bold">About</h1>
    <p>
      <Link href="../">
        <a>&larr; Back</a>
      </Link>
    </p>
    <p>
      Lorem ipsum, dolor{" "}
      <code>
        sit amet <em>consectetur</em>
      </code>{" "}
      adipisicing elit. Explicabo architecto fugiat magnam ab, cum unde, eos
      nostrum dolorum ipsa error possimus saepe tempore voluptas perferendis.
      Quia ipsum veniam quasi quisquam!
    </p>
  </Layout>
);

export default About;
