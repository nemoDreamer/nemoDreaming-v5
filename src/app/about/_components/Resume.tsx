import classNames from "classnames";
import startCase from "lodash.startcase";
import { Fragment } from "react";

import Markdown from "@/components/Markdown";
import H1 from "@/components/core/H1";
import H2 from "@/components/core/H2";
import H3 from "@/components/core/H3";

const Label = ({ children, className }: React.ComponentProps<"span">) => (
  <span
    className={classNames(className, "font-bold uppercase tracking-widest")}
  >
    {children}
  </span>
);

const ResumeH2 = ({
  children,
  className,
  ...props
}: React.ComponentProps<typeof H2>) => (
  <H2 className={classNames(className, "mt-16")} {...props}>
    {children}
  </H2>
);

const ResumeH3 = ({
  children,
  className,
  location,
  date,
  ...props
}: React.ComponentProps<typeof H3> & {
  location: string;
  date: string;
}) => (
  <H3
    className={classNames(
      className,
      "mt-16 mb-0 flex-wrap md:flex-nowrap flex flex-row no-break-inside no-break-after",
    )}
    {...props}
  >
    <Label className="w-full md:w-auto">{children}</Label>
    <span>
      <span className="hidden md:inline">{", "}</span>
      {location}
    </span>
    <span className="flex-1 text-right italic whitespace-nowrap">{date}</span>
  </H3>
);

const ItemPosition = ({
  children,
  className,
  detail,
}: React.ComponentProps<"p"> & { detail?: React.ReactNode }) => (
  <p className={classNames(className, "font-bold text-lg")}>
    {children}
    {detail && <span className="font-normal italic">{detail}</span>}
  </p>
);

const Resume: React.FC<{
  data: ResumeType;
  skipFirstLine?: boolean;
  skipHeader?: boolean;
}> = ({
  data: { header, qualifications, skills, experience, education, passions },
  skipFirstLine = false,
  skipHeader = false,
}) => (
  <div>
    {!skipHeader && (
      <div className="header">
        <H1 className="name">{header.name}</H1>
        {header.url && <div className="url">{header.url}</div>}
        <div className="phone">{header.phone}</div>
        <div className="email">{header.email}</div>
      </div>
    )}

    <div className="qualifications">
      {!skipFirstLine && (
        <>
          <H2>{startCase(qualifications.title)}</H2>
          <Markdown content={qualifications.body[0]} />
        </>
      )}
      {qualifications.body.length > 1 && (
        <Markdown content={qualifications.body.slice(1).join("\n\n")} />
      )}
    </div>

    <div className="skills">
      <ResumeH2>{startCase(skills.title)}</ResumeH2>
      {/* TODO: use table instead? Hm, should be responsive, tho... */}
      <div className="grid grid-cols-1 xs:grid-cols-3 gap-x-2 mb-4">
        {Object.entries(skills.groups).map(([group, items], iG) => (
          <Fragment key={`item-${iG}`}>
            <Label className="text-left xs:text-right">
              {startCase(group)}
            </Label>
            <Markdown
              className="col-span-2 no-break-inside"
              content={items.join(" | ")}
            />
          </Fragment>
        ))}
      </div>
    </div>

    <div className="experience">
      <ResumeH2>{startCase(experience.title)}</ResumeH2>
      {experience.jobs.map(
        (
          { employer, location, date, position, additional, achievements },
          iJ,
        ) => (
          <div key={`job-${iJ}`} className="mb-12">
            <ResumeH3 location={location} date={date}>
              {employer}
            </ResumeH3>

            <ItemPosition
              className="no-break-after"
              detail={
                additional && <span className="ml-1">({additional})</span>
              }
            >
              {position}
            </ItemPosition>

            {achievements && (
              <ul>
                {achievements.map((achievement, iA) => (
                  <Markdown
                    tag="li"
                    isSingleLine
                    key={`achievement-${iA}`}
                    content={achievement}
                  />
                ))}
              </ul>
            )}
          </div>
        ),
      )}
    </div>

    <div className="education">
      <ResumeH2>{startCase(education.title)}</ResumeH2>
      {education.degrees.map(
        ({ school, location, date, degree, major }, iJ) => (
          <div className="no-break-inside mb-12" key={`job-${iJ}`}>
            <ResumeH3 location={location} date={date}>
              {school}
            </ResumeH3>

            <ItemPosition detail={major && `, ${major}`}>{degree}</ItemPosition>
          </div>
        ),
      )}
    </div>

    <div className="passions">
      <ResumeH2>{startCase(passions.title)}</ResumeH2>
      <ul>
        {passions.items.map((passion, iP) => (
          <Markdown
            tag="li"
            isSingleLine
            key={`passion-${iP}`}
            content={passion}
          />
        ))}
      </ul>
    </div>
  </div>
);

export default Resume;
