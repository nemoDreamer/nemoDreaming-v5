import classNames from "classnames";

const H1 = ({
  children,
  className,
  ...props
}: React.HtmlHTMLAttributes<HTMLHeadingElement>) => (
  <h1 className={classNames(className, "font-bold text-2xl")} {...props}>
    {children}
  </h1>
);

export default H1;
