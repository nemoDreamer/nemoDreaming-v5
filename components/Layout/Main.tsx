import classNames from "classnames";
import React from "react";

import Container from "../Container";

import styles from "./Main.module.scss";

const Main = ({
  children,
  subHeader,
}: React.PropsWithChildren<{
  subHeader?: React.ReactNode;
}>) => (
  <main className={"flex-1 z-10 bg-gray-100"}>
    {subHeader && (
      <section
        className={
          "bg-teal-500 text-teal-200 print:text-black shadow-xl print:shadow-none"
        }
      >
        <Container
          className={classNames(styles.subHeader, "py-4 px-4 print:py-0")}
        >
          {subHeader}
        </Container>
      </section>
    )}
    <Container className={classNames(styles.children, "py-4 px-4 print:py-0")}>
      {children}
    </Container>
  </main>
);

export default Main;
