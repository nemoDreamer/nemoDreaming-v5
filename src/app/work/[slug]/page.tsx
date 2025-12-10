import type { Metadata } from "next";

import Main from "@/components/Layout/Main";
import ArrowLink from "@/components/elements/ArrowLink";

import WorkContent from "../_components/Work/WorkContent";
import { loadAllWorkPostSlugs, loadWorkPost } from "../_data/work-post";

const PageSubHeader = () => (
  <ArrowLink href="/work" isBack>
    Back
  </ArrowLink>
);

type PageParams = Promise<{
  slug: string;
}>;

const getWorkPostFromParams = async (params: PageParams) =>
  loadWorkPost((await params).slug);

export const generateMetadata = async ({
  params,
}: {
  params: PageParams;
}): Promise<Metadata> => {
  const {
    data: { title },
  } = await getWorkPostFromParams(params);

  return {
    title: `Client Work - ${title}`,
  };
};

export const generateStaticParams = () => loadAllWorkPostSlugs();

export default async function WorkPost({ params }: { params: PageParams }) {
  const workPost = await getWorkPostFromParams(params);

  return (
    <Main subHeader={<PageSubHeader />}>
      <WorkContent workPost={workPost} />
    </Main>
  );
}
