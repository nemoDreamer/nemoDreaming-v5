import Prompt from "@/components/Terminal/Prompt";

export default async function PagePrompt({
  params,
}: {
  params: Promise<{ category: string; page: string }>;
}) {
  const { category, page } = await params;
  return (
    <Prompt branch="dev" filePath={`work/${category}/${page}/index.tsx`} />
  );
}
