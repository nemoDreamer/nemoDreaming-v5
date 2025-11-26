import Main from "@/components/Layout/Main";
import { Code, H1, Strong } from "@/components/Layout/SubHeader";
import Markdown from "@/components/Markdown";
import ArrowLink from "@/components/elements/ArrowLink";

import Resume from "./_components/Resume";
import resume from "./_data/resume.yaml";

const fixYears = (resume: ResumeType): void => {
  resume.qualifications.body[0] = resume.qualifications.body[0].replace(
    "22 years",
    new Date().getFullYear() - 1999 + " years",
  );
};

const AboutSubHeader = () => {
  fixYears(resume);

  return (
    <>
      <p className="print:hidden">
        <ArrowLink href="/" isBack>
          Back
        </ArrowLink>
      </p>

      <H1>{resume.header.name}</H1>

      <p className="contact hidden print:block text-right no-break-inside no-break-after">
        {resume.header.url && (
          <>
            <span className="url">{resume.header.url}</span>
            {" | "}
          </>
        )}
        <span className="phone">{resume.header.phone}</span>
        {" | "}
        <span className="email">{resume.header.email}</span>
      </p>

      <Markdown
        content={resume.qualifications.body[0]}
        components={{
          code: Code,
          strong: Strong,
        }}
      />
    </>
  );
};

export default function AboutPage() {
  return (
    <Main subHeader={<AboutSubHeader />}>
      <Resume data={resume} skipFirstLine skipHeader />
    </Main>
  );
}
