import Head from "next/head";
import React from "react";

import ArrowLink from "../../components/ArrowLink";
import Layout, { siteTitle } from "../../components/layout";

const subHeader = (
  <React.Fragment>
    <h1>About</h1>
    <p>
      I am an innovative and creative professional with{" "}
      <code>22 years of experience</code> in design and development. Skilled in
      front~ to back-end development using a variety of modern stacks, I also
      hold a Bachelor of Arts in{" "}
      <em>Visual Communication and Interactive Media Design</em>.
    </p>
    <p>
      <ArrowLink href="/" isBack>
        Back
      </ArrowLink>
    </p>
  </React.Fragment>
);

const About = (): JSX.Element => (
  <Layout
    subHeader={subHeader}
    prompt={{
      filePath: "about/README.md",
    }}
  >
    <Head>
      <title>{siteTitle} | About</title>
    </Head>

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
  </Layout>
);

export default About;
