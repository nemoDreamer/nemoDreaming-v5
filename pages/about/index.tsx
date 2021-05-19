import type { GetStaticProps } from "next";
import React from "react";

import ArrowLink from "../../components/ArrowLink";
import Main from "../../components/Layout/Main";

const subHeader = (
  <>
    <h1>About</h1>
    <p>
      <ArrowLink href="/" isBack>
        Back
      </ArrowLink>
    </p>
    <p>
      I am an innovative and creative professional with{" "}
      <code>22 years of experience</code> in design and development. Skilled in
      front~ to back-end development using a variety of modern stacks, I also
      hold a Bachelor of Arts in{" "}
      <em>Visual Communication and Interactive Media Design</em>.
    </p>
  </>
);

const About = (): JSX.Element => (
  <Main subHeader={subHeader}>
    <p>
      My passion for tinkering with new technologies has kept me up-to-date and
      on my toes, and my time as a senior software developer and a group lead
      and manager has seen me able to drive technical change in a corporate
      setting, incorporating those shiny new toys as flexible, future-proof
      building blocks for major web applications.
    </p>
    <p>
      Natively fluent in English, French and German, with working proficiency in
      Dutch, I am excited to work inside of a distributed team and make use of
      my comprehensive background in remote work.
    </p>
  </Main>
);

export const getStaticProps: GetStaticProps = async () => ({
  props: {
    pageTitle: "About",
    prompt: {
      filePath: "about/README.md",
    },
  },
});

export default About;
