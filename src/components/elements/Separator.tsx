import classNames from "classnames";

export default function Separator({
  className = "",
  char = "|",
}: {
  className?: string;
  char?: string;
}) {
  return <span className={classNames("opacity-50", className)}>{char}</span>;
}
