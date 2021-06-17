import type { GetStaticProps } from "next";
import React from "react";

import ArrowLink from "../../components/ArrowLink";
import Main from "../../components/Layout/Main";
import Resume from "../../components/Resume";
import resume from "../../data/resume.yaml";

const subHeader = (
  <>
    <p>
      <ArrowLink href="/" isBack>
        Back
      </ArrowLink>
    </p>
    <h1>{resume.header.name}</h1>
    <p>{resume.qualifications.body[0]}</p>
  </>
);

const About: React.FC = () => (
  <Main subHeader={subHeader}>
    <Resume data={resume} skipFirstLine skipHeader />
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
