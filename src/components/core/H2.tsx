import classNames from "classnames";

const H2 = ({
  children,
  className,
  ...props
}: React.HtmlHTMLAttributes<HTMLHeadingElement>) => (
  <h2
    className={classNames(className, "relative font-bold text-xl mt-8")}
    {...props}
  >
    <span className="absolute -left-[1.5em] text-gray-300 print:hidden">
      {"## "}
    </span>

    {children}

    <span className="block h-[.5em] -mx-[2em] shadow-lg border-b border-solid border-gray-200" />
  </h2>
);

export default H2;
