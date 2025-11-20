import ArrowLink from "@/components/ArrowLink";
import Comments from "@/components/Comments";
import Main from "@/components/Layout/Main";
import { H1 } from "@/components/Layout/SubHeader";
import Thumbnail from "@/components/Thumbnail";
import H2 from "@/components/core/H2";
import formatDate from "@/utils/format-date";

import { getAllWorkPosts } from "./data/work-post";

const WorkSubHeader = () => <H1>Work</H1>;

export default async function WorkPage() {
  const workPosts = await getAllWorkPosts();

  return (
    <Main subHeader={<WorkSubHeader />}>
      <Comments
        lines={[
          <span key="note">
            <span className="rounded-xs bg-teal-500 text-teal-200">NOTE:</span>{" "}
            please excuse the mess...
          </span>,
          <span key="todo" className="rounded-xs bg-yellow-200 text-yellow-900">
            TODO:
          </span>,
          "- [x] temporary thumbnailed links",
          "- [ ] temporary repo list",
          "- [ ] make thumbnail grid",
          "- [ ] transfer items from old portfolio...!",
          "- [x] use `topRepositories` to better reflect open-source contributions",
          "- [ ] add larger 'featured' to top",
          "- [ ] add filtering by category / technology",
          "- [ ] generate `sitemap.xml`, `robots.txt`, rss, og",
        ]}
      />
      <div className="mb-8">
        <H2>Client Work</H2>
        {workPosts.map(({ title, slug, date, thumbnail }) => (
          <div key={`work-post-${slug}`} className="mb-2">
            <ArrowLink href={`/work/${slug}`}>
              <div className="inline-block mr-2 align-middle">
                <Thumbnail
                  alt="Preview Thumbnail"
                  image={thumbnail}
                  width={48}
                  height={48}
                />
              </div>
              <span className="underline group-hover:no-underline">
                {title}
              </span>
              <span className="ml-2 text-xs italic text-gray-500 group-hover:text-gray-300">
                {formatDate(date)}
              </span>
            </ArrowLink>
          </div>
        ))}
      </div>
      {/* <div>
        <H2>Open-Source</H2>
        <RepoGroup
          title="Top Repositories"
          repos={truncatedRepos}
          total={reposTotal}
        />
      </div> */}
    </Main>
  );
}
