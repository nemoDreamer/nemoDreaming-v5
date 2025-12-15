import type { Metadata } from "next";
import { Suspense } from "react";

import Main from "@/components/Layout/Main";

import WorkContent from "../../_components/Work/WorkContent";
import WorkPostSubHeader from "../../_components/Work/WorkPostSubHeader";
import {
  getAllCategoryLabels,
  getAllCategoryWorkPostSlugs,
  loadAllWorkPostSlugs,
  loadAndProcessWorkPost,
} from "../../_data/work-post";

type PageParams = Promise<{
  slug: string;
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

export default async function WorkPostPage({ params }: { params: PageParams }) {
  const workPost = await getWorkPostFromParams(params);

  const categoryLabels = await getAllCategoryLabels();
  const categoryWorkPostSlugs = await getAllCategoryWorkPostSlugs();

  const subHeader = (
    <Suspense fallback={<div>Loading...</div>}>
      <WorkPostSubHeader
        workPost={workPost}
        categoryLabels={categoryLabels}
        categoryWorkPostSlugs={categoryWorkPostSlugs}
      />
    </Suspense>
  );

  return (
    <Main subHeader={subHeader}>
      <WorkContent workPost={workPost} />
    </Main>
  );
}
