import classNames from "classnames";
import startCase from "lodash.startcase";
import * as React from "react";

import Markdown from "../Markdown";

import styles from "./Resume.module.scss";

const Resume: React.FC<{
  data: ResumeType;
  skipFirstLine?: boolean;
  skipHeader?: boolean;
}> = ({
  data: { header, qualifications, skills, experience, education },
  skipFirstLine = false,
  skipHeader = false,
}) => (
  <div className={styles.body}>
    {!skipHeader && (
      <div className="header">
        <h1 className="name">{header.name}</h1>
        {header.url && <div className="url">{header.url}</div>}
        <div className="phone">{header.phone}</div>
        <div className="email">{header.email}</div>
      </div>
    )}

    <div className="qualifications">
      {!skipFirstLine && (
        <>
          <h2>{startCase(qualifications.title)}</h2>
          <Markdown content={qualifications.body[0]} />
        </>
      )}
      {qualifications.body.length > 1 && (
        <Markdown content={qualifications.body.slice(1).join("\n\n")} />
      )}
    </div>

    <div className="skills">
      <h2>{startCase(skills.title)}</h2>
      {/* TODO: use table instead? Hm, should be responsive, tho... */}
      <div className={styles.groups}>
        {Object.entries(skills.groups).map(([group, items], iG) => (
          <React.Fragment key={`item-${iG}`}>
            <div className={styles.label}>{startCase(group)}</div>
            <Markdown
              className="items col-span-2 no-break-inside"
              content={items.join(" | ")}
            />
          </React.Fragment>
        ))}
      </div>
    </div>

    <div className="experience">
      <h2>{startCase(experience.title)}</h2>
      {experience.jobs.map(
        (
          { employer, location, date, position, additional, achievements },
          iJ
        ) => (
          <div className={styles.item} key={`job-${iJ}`}>
            <h3 className="no-break-inside no-break-after">
              <span className={styles.label}>{employer}</span>
              <span className={styles.location}>{location}</span>
              <span className={styles.date}>{date}</span>
            </h3>

            <p className={classNames(styles.position, "no-break-after")}>
              {position}
              {additional && (
                <span className={styles.detail}>{additional}</span>
              )}
            </p>

            {achievements && (
              <ul>
                {achievements.map((achievement, iA) => (
                  <Markdown
                    tag="li"
                    key={`achievement-${iA}`}
                    content={achievement}
                  />
                ))}
              </ul>
            )}
          </div>
        )
      )}
    </div>

    <div className="education">
      <h2>{startCase(education.title)}</h2>
      {education.degrees.map(
        ({ school, location, date, degree, major }, iJ) => (
          <div
            className={classNames(styles.item, "no-break-inside")}
            key={`job-${iJ}`}
          >
            <h3>
              <span className={styles.label}>{school}</span>
              <span className={styles.location}>{location}</span>
              <span className={styles.date}>{date}</span>
            </h3>

            <p className={styles.degree}>
              {degree}
              {major && <span className={styles.detail}>{major}</span>}
            </p>
          </div>
        )
      )}
    </div>
  </div>
);

export default Resume;
