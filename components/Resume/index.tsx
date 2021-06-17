import startCase from "lodash.startcase";
import * as React from "react";
import remark from "remark";
import html from "remark-html";

import styles from "./Resume.module.scss";

const toHTML = (markdown: string) =>
  remark().use(html).processSync(markdown).toString();

const Resume: React.FC<{
  data: ResumeType;
  skipFirstLine?: boolean;
  skipHeader?: boolean;
}> = ({
  data: { header, qualifications, skills, experience, education },
  skipFirstLine = false,
  skipHeader = false,
}) => (
  <div>
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
          <p>{qualifications.body[0]}</p>
        </>
      )}
      {qualifications.body.slice(1).map((line, index) => (
        <p key={`line-${index}`}>{line}</p>
      ))}
    </div>

    <div className="skills">
      <h2>{startCase(skills.title)}</h2>
      {/* TODO: use table instead? Hm, should be responsive, tho... */}
      <div className={styles.groups}>
        {Object.entries(skills.groups).map(([group, items], iG) => (
          <React.Fragment key={`item-${iG}`}>
            <div className={styles.label}>{startCase(group)}</div>
            <div
              className="items col-span-2"
              // TODO: parse whole all strings in YAML to HTML first?
              dangerouslySetInnerHTML={{ __html: toHTML(items.join(" | ")) }}
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
            <h3>
              <span className={styles.label}>{employer}</span>
              <span className={styles.location}>{location}</span>
              <span className={styles.date}>{date}</span>
            </h3>

            <p className={styles.position}>
              {position}
              {additional && (
                <span className={styles.detail}>{additional}</span>
              )}
            </p>

            {achievements && (
              <ul>
                {achievements.map((achievement, iA) => (
                  <li key={`achievement-${iA}`}>{achievement}</li>
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
          <div className={styles.item} key={`job-${iJ}`}>
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
