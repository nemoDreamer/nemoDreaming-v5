import Prompt from "@/components/Terminal/Prompt";

export default async function PagePrompt({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return <Prompt branch="dev" filePath={`work/post/${slug}.md`} />;
}
