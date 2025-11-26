import classNames from "classnames";

const H3 = ({
  children,
  className,
  ...props
}: React.HtmlHTMLAttributes<HTMLHeadingElement>) => (
  <h3
    className={classNames(
      className,
      "relative text-lg border-b border-gray-400 border-solid",
    )}
    {...props}
  >
    <span className="absolute -left-[2.15em] font-bold text-gray-300 print:hidden">
      {"### "}
    </span>

    {children}
  </h3>
);

export default H3;
