import Comments from "@/components/Comments";
import Cursor from "@/components/Cursor";
import Main from "@/components/Layout/Main";
import { H1 } from "@/components/Layout/SubHeader";

const HomeSubHeader = () => <H1>Home</H1>;

export default function HomePage() {
  return (
    <Main subHeader={<HomeSubHeader />}>
      {" "}
      <p className="font-mono">
        $ Hi, I’m Philip Blyth <Cursor />
      </p>
      {/* <pre className="text-gray-200">
        {`
╦ ╦┌┐┌┌┬┐┌─┐┬─┐  ╔═╗┌─┐┌┐┌┌─┐┌┬┐┬─┐┬ ┬┌─┐┌┬┐┬┌─┐┌┐┌
║ ║│││ ││├┤ ├┬┘  ║  │ ││││└─┐ │ ├┬┘│ ││   │ ││ ││││
╚═╝┘└┘─┴┘└─┘┴└─  ╚═╝└─┘┘└┘└─┘ ┴ ┴└─└─┘└─┘ ┴ ┴└─┘┘└┘
`}
      </pre> */}
      <Comments
        lines={[
          <span key="todo">
            <span className="rounded-xs bg-yellow-200 text-yellow-900">
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
    </Main>
  );
}
