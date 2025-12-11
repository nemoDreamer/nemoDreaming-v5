import { Fragment } from "react";

export default function NoWrapList({
  items,
  separator = "/",
}: {
  items: string[];
  separator?: React.ReactNode;
}) {
  return items.map((item, index) => (
    <Fragment key={`${item}-${index}`}>
      <span className="whitespace-nowrap">
        {item}
        {index < items.length - 1 && ` ${separator}`}
      </span>{" "}
    </Fragment>
  ));
}
