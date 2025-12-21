import classNames from "classnames";

const A = ({
  children,
  className,
  ...props
}: React.HtmlHTMLAttributes<HTMLAnchorElement>) => (
  <a
    className={classNames(
      className,
      "underline text-cyan-600 hover:border-b hover:no-underline",
    )}
    {...props}
  >
    {children}
  </a>
);

export default A;
