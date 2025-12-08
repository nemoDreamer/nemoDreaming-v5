export default function NoWrapList({
  items,
  separator = "/",
}: {
  items: string[];
  separator?: React.ReactNode;
}) {
  return items.map((item, index) => (
    <>
      <span key={`${item}-${index}`} className="whitespace-nowrap">
        {item}
        {index < items.length - 1 && ` ${separator}`}
      </span>{" "}
    </>
  ));
}
