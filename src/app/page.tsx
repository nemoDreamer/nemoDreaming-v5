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

                    _                            
 ._   _  ._ _   _  | \\ ._ _   _. ._ _  o ._   _  
 | | (/_ | | | (_) |_/ | (/_ (_| | | | | | | (_| 
                                              _| 


░█▀█░█▀▀░█▄█░█▀█░█▀▄░█▀▄░█▀▀░█▀█░█▄█░▀█▀░█▀█░█▀▀
░█░█░█▀▀░█░█░█░█░█░█░█▀▄░█▀▀░█▀█░█░█░░█░░█░█░█░█
░▀░▀░▀▀▀░▀░▀░▀▀▀░▀▀░░▀░▀░▀▀▀░▀░▀░▀░▀░▀▀▀░▀░▀░▀▀▀

                       ___                     _
  ___  ___ __ _  ___  / _ \\_______ ___ ___ _  (_)__  ___ _
 / _ \\/ -_)  ' \\/ _ \\/ // / __/ -_) _ \`/  ' \\/ / _ \\/ _ \`/
/_//_/\\__/_/_/_/\\___/____/_/  \\__/\\_,_/_/_/_/_/_//_/\\_, /
                                                   /___/

 __ _ ____ _  _ ____ ___  ____ ____ ____ _  _ _ __ _ ____
 | \\| |=== |\\/| [__] |__> |--< |=== |--| |\\/| | | \\| |__,
`}
      </pre> */}
      <Comments
        className="mt-16"
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
          "- [x] transfer items from old portfolio...!",
          "- [ ] generate `sitemap.xml`, `robots.txt`, rss, og",
          "- [ ] add social links",
        ]}
      />
    </Main>
  );
}
