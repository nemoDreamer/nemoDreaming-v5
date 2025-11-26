import Main from "@/components/Layout/Main";
import ArrowLink from "@/components/elements/ArrowLink";

import WorkContent from "../_components/Work/WorkContent";
import { getAllWorkPostSlugs, getWorkPost } from "../_data/posts";

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
