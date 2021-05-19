import { GetStaticProps } from "next";
import React from "react";

import Cursor from "../components/Cursor";
import Main from "../components/Layout/Main";

const subHeader = <h1>Home</h1>;

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
