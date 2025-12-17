import classNames from "classnames";

const H2 = ({
  children,
  className = "mt-8 first:mt-0",
  ...props
}: React.HtmlHTMLAttributes<HTMLHeadingElement>) => (
  <h2
    className={classNames(
      className,
      "relative font-bold text-xl",
      "no-break-inside no-break-after",
    )}
    {...props}
  >
    <span className="absolute -left-[1.5em] text-gray-300 print:hidden">
      {"## "}
    </span>

    {children}

    <span className="block h-[.5em] -mx-4 md:-mx-[2em] shadow-lg border-b border-solid border-gray-200" />
  </h2>
);

export default H2;
