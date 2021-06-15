import { GetStaticProps } from "next";
import * as React from "react";

import ArrowLink from "../../components/ArrowLink";
import Comments from "../../components/Comments";
import Main from "../../components/Layout/Main";
import Thumbnail from "../../components/Thumbnail";
import { PostData, getAllPosts } from "../../lib/posts";
import formatDate from "../../utils/formatDate";

export const DIRECTORY = "work";

export const getStaticProps: GetStaticProps = async () => ({
  props: {
    siteTitle: "Work",
    workPosts: await getAllPosts(DIRECTORY),
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
}> = ({ workPosts }) => (
  <Main subHeader={subHeader}>
    <Comments
      lines={[
        <span key="todo" className="rounded-sm bg-yellow-200 text-yellow-900">
          TODO:
        </span>,
        "- [x] temporary thumbnailed links",
        "- [ ] make thumbnail grid",
        "- [ ] transfer items from old portfolio...!",
        "- [ ] add larger `featured` to top",
      ]}
    />
    {workPosts.map(({ title, slug, date, folder, thumbnail }) => (
      <div key={`work-post-${slug}`} className="mb-4">
        <ArrowLink href={`/work/${slug}`}>
          <div className="inline-block mr-2 align-middle">
            <Thumbnail
              image={thumbnail}
              folder={folder}
              width={48}
              height={48}
            />
          </div>
          <span className="underline group-hover:no-underline">{title}</span>
          <span className="ml-2 text-xs italic text-gray-500 group-hover:text-gray-300">
            {formatDate(date)}
          </span>
        </ArrowLink>
      </div>
    ))}
  </Main>
);

export default AllWork;
