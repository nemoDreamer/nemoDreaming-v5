import classNames from "classnames";
import * as React from "react";

import Container from "../Container";

import styles from "./Main.module.scss";

const Main: React.FC<{
  subHeader?: React.ReactNode;
}> = ({ children, subHeader }) => (
  <main className={classNames(styles.base, "flex-1 z-10")}>
    {subHeader && (
      <section className={"bg-teal-500 text-teal-200 shadow-xl"}>
        <Container className={classNames(styles.subHeader, "py-4 px-4")}>
          {subHeader}
        </Container>
      </section>
    )}
    <Container className={classNames(styles.children, "py-4 px-4")}>
      {children}
    </Container>
  </main>
);

export default Main;
