import type { Metadata } from "next";

import Main from "@/components/Layout/Main";
import ArrowLink from "@/components/elements/ArrowLink";

import WorkContent from "../_components/Work/WorkContent";
import { getAllWorkPostSlugs, getWorkPost } from "../_data/posts";

const PageSubHeader = () => (
  <ArrowLink href="/work" isBack>
    Back
  </ArrowLink>
);

type PageParams = Promise<{
  slug: string;
}>;

const getWorkPostFromParams = async (params: PageParams) =>
  getWorkPost((await params).slug);

export const generateMetadata = async ({
  params,
}: {
  params: PageParams;
}): Promise<Metadata> => {
  const { title } = await getWorkPostFromParams(params);

  return {
    title: `Work - ${title}`,
  };
};

export const generateStaticParams = () => getAllWorkPostSlugs();

export default async function WorkPost({ params }: { params: PageParams }) {
  const workPost = await getWorkPostFromParams(params);

  return (
    <Main subHeader={<PageSubHeader />}>
      <WorkContent workPost={workPost} />
    </Main>
  );
}
