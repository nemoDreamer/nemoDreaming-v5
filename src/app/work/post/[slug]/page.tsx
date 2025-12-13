import type { Metadata } from "next";

import Main from "@/components/Layout/Main";
import ArrowLink from "@/components/elements/ArrowLink";

import CategoryMenu from "../../_components/Work/CategoryMenu";
import WorkContent from "../../_components/Work/WorkContent";
import {
  getCategoryWorkPosts,
  loadAllWorkPostSlugs,
  loadAndProcessWorkPost,
} from "../../_data/work-post";

type PageParams = Promise<{
  slug: string;
}>;

type SearchParams = Promise<{
  category: string;
}>;

const getWorkPostFromParams = async (params: PageParams, isShallow = false) =>
  loadAndProcessWorkPost({ slug: (await params).slug, isShallow });

export const generateMetadata = async ({
  params,
}: {
  params: PageParams;
}): Promise<Metadata> => {
  const {
    data: { title },
  } = await getWorkPostFromParams(params, true);

  return {
    title: `Client Work - ${title}`,
  };
};

export const generateStaticParams = () => loadAllWorkPostSlugs();

export default async function WorkPostPage({
  params,
  searchParams,
}: {
  params: PageParams;
  searchParams: SearchParams;
}) {
  const workPost = await getWorkPostFromParams(params);
  const { category } = await searchParams;

  // find previous and next posts in category:
  // TODO: cache this lookup?
  const categoryPosts = await getCategoryWorkPosts(category);
  const currentIndex = categoryPosts.findIndex(
    (post) => post.slug === workPost.slug,
  );
  const olderPost =
    currentIndex < categoryPosts.length - 1
      ? categoryPosts[currentIndex + 1]
      : null;
  const newerPost = currentIndex > 0 ? categoryPosts[currentIndex - 1] : null;

  const subHeader = (
    <div className="flex flex-row justify-between items-center gap-8">
      <div className="w-32 -ml-24">
        {olderPost && (
          <ArrowLink
            className="justify-end"
            href={`/work/post/${olderPost.slug}?category=${category}`}
            isBack
          >
            Older
          </ArrowLink>
        )}
      </div>
      <CategoryMenu category={category} />
      <div className="w-32 -mr-24">
        {newerPost && (
          <ArrowLink
            href={`/work/post/${newerPost.slug}?category=${category}`}
            isBehind
          >
            Newer
          </ArrowLink>
        )}
      </div>
    </div>
  );

  return (
    <Main subHeader={subHeader}>
      <WorkContent workPost={workPost} />
    </Main>
  );
}
