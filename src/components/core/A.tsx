import classNames from "classnames";

const A = ({
  children,
  className,
  ...props
}: React.DetailedHTMLProps<
  React.AnchorHTMLAttributes<HTMLAnchorElement>,
  HTMLAnchorElement
>) => (
  <a
    className={classNames(
      className,
      "underline text-cyan-600 hover:border-b hover:no-underline cursor-pointer",
    )}
    target={props.href?.startsWith("http") ? "_blank" : undefined}
    {...props}
  >
    {children}
  </a>
);

export default A;
