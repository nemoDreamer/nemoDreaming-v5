import type { GetStaticProps } from "next";
import React from "react";

import ArrowLink from "../../components/ArrowLink";
import Main from "../../components/Layout/Main";
import Markdown from "../../components/Markdown";
import Resume from "../../components/Resume";
import resume from "../../data/resume.yaml";

const SubHeader: React.FC<{ resume: ResumeType }> = ({
  resume: { header },
}) => (
  <>
    <p className="print:hidden">
      <ArrowLink href="/" isBack>
        Back
      </ArrowLink>
    </p>
    <h1>{resume.header.name}</h1>

    <p className="contact hidden print:block text-right no-break-inside no-break-after">
      {header.url && (
        <>
          <span className="url">{header.url}</span>
          {" | "}
        </>
      )}
      <span className="phone">{header.phone}</span>
      {" | "}
      <span className="email">{header.email}</span>
    </p>

    <Markdown content={resume.qualifications.body[0]} />
  </>
);

const About: React.FC = () => (
  <Main subHeader={<SubHeader resume={resume} />}>
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
