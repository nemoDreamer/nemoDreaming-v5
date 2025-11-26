import Comments from "@/components/Comments";
import Main from "@/components/Layout/Main";
import Cursor from "@/components/Terminal/Cursor";

export default function HomePage() {
  return (
    <Main title="Home">
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
