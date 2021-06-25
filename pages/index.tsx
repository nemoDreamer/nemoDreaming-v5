import { GetStaticProps } from "next";
import React from "react";

import Comments from "../components/Comments";
import Cursor from "../components/Cursor";
import Main from "../components/Layout/Main";

const subHeader = <h1>Home</h1>;

const Home = (): JSX.Element => (
  <Main subHeader={subHeader}>
    <p className="font-mono">
      $ Hi, I’m Philip Blyth <Cursor />
    </p>
    <Comments
      lines={[
        <span key="todo">
          <span className="rounded-sm bg-yellow-200 text-yellow-900">
            TODO:
          </span>{" "}
          under construction...
        </span>,
        "- [x] add résumé",
        "- [ ] pull in `featured` from `work`",
        "- [x] add GitHub repos",
        "- [ ] transfer items from old portfolio...!",
        "- [ ] add social links",
      ]}
    />
    {/* <pre className="text-gray-200">
      {`
╦ ╦┌┐┌┌┬┐┌─┐┬─┐  ╔═╗┌─┐┌┐┌┌─┐┌┬┐┬─┐┬ ┬┌─┐┌┬┐┬┌─┐┌┐┌
║ ║│││ ││├┤ ├┬┘  ║  │ ││││└─┐ │ ├┬┘│ ││   │ ││ ││││
╚═╝┘└┘─┴┘└─┘┴└─  ╚═╝└─┘┘└┘└─┘ ┴ ┴└─└─┘└─┘ ┴ ┴└─┘┘└┘
`}
    </pre> */}
  </Main>
);

export const getStaticProps: GetStaticProps = async () => ({
  props: {
    isHome: true,
    prompt: {
      filePath: "index.tsx",
    },
  },
});

export default Home;
