import { type GetStaticProps } from "next";
import useSWR from "swr";

import ArrowLink from "@/components/ArrowLink";
import Comments from "@/components/Comments";
import RepoGroup from "@/components/Github/RepoGroup";
import Main from "@/components/Layout/Main";
import Thumbnail from "@/components/Thumbnail";
import fetcher from "@/lib/fetcher";
import { type PostData, getAllPosts } from "@/lib/posts";
import formatDate from "@/utils/formatDate";

import { customFetch, endpoints } from "../api/github/[endpointId]";
import { type Repository } from "../api/github/types";

export const DIRECTORY = "work";

export const getStaticProps: GetStaticProps = async () => ({
  props: {
    workPosts: await getAllPosts(DIRECTORY),
    repos: await customFetch(endpoints.allTopRepositories),
    // ---
    pageTitle: "Work",
    prompt: {
      branch: "dev",
      filePath: "work/index.tsx",
    },
  },
});

const subHeader = (
  <>
    <h1>Work</h1>
  </>
);

const AllWork: React.FC<{
  workPosts: PostData[];
  repos: Repository[];
}> = ({ workPosts, repos: initialRepos }) => {
  const { data: repos } = useSWR<Repository[]>(
    ["/api/github/allTopRepositories", undefined],
    fetcher,
    {
      initialData: initialRepos,
    },
  );

  return (
    <Main subHeader={subHeader}>
      <Comments
        lines={[
          <span key="note">
            <span className="rounded-sm bg-teal-500 text-teal-200">NOTE:</span>{" "}
            please excuse the mess...
          </span>,
          <span key="todo" className="rounded-sm bg-yellow-200 text-yellow-900">
            TODO:
          </span>,
          "- [x] temporary thumbnailed links",
          "- [x] temporary repo list",
          "- [ ] make thumbnail grid",
          "- [ ] transfer items from old portfolio...!",
          "- [x] use `topRepositories` to better reflect open-source contributions",
          "- [ ] add larger `featured` to top",
        ]}
      />
      <div className="mb-8">
        <h2>Client Work</h2>
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
      <div>
        <h2>Open-Source</h2>
        <RepoGroup title="Top Repositories" repos={repos} truncate={10} />
      </div>
    </Main>
  );
};

export default AllWork;
