import { GetStaticProps } from "next";
import React from "react";

import ArrowLink from "../components/ArrowLink";
import Main from "../components/Layout/Main";

const subHeader = (
  <>
    <h1>Home</h1>
    <p>
      <ArrowLink href="/about">About</ArrowLink>
    </p>
  </>
);

const Home = (): JSX.Element => <Main subHeader={subHeader}></Main>;

export const getStaticProps: GetStaticProps = async () => ({
  props: {
    isHome: true,
    prompt: {
      filePath: "index.tsx",
    },
  },
});

export default Home;
