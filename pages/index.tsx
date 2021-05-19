import { GetStaticProps } from "next";
import React from "react";

import ArrowLink from "../components/ArrowLink";
import Cursor from "../components/Cursor";
import Main from "../components/Layout/Main";

const subHeader = (
  <>
    <h1>Home</h1>
    <p>
      <ArrowLink href="/about">About</ArrowLink>
    </p>
  </>
);

const Home = (): JSX.Element => (
  <Main subHeader={subHeader}>
    <p className="font-mono">
      $ Hi, I’m Philip Blyth <Cursor />
    </p>
  </Main>
);

export const getStaticProps: GetStaticProps = async () => ({
  props: {
    isHome: true,
    prompt: {
      filePath: "index.tsx",
    },
  },
});

export default Home;
