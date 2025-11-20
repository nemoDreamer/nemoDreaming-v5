import ArrowLink from "@/components/ArrowLink";
import Main from "@/components/Layout/Main";

import WorkContent from "../components/WorkContent";
import { getAllWorkPostSlugs, getWorkPost } from "../data/work-post";

export function generateStaticParams() {
  return getAllWorkPostSlugs();
}

const PageSubHeader = () => (
  <ArrowLink href="/work" isBack>
    Back
  </ArrowLink>
);

export default async function WorkPost({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const workPost = await getWorkPost(slug);

  return (
    <Main subHeader={<PageSubHeader />}>
      <WorkContent workPost={workPost} />
    </Main>
  );
}
