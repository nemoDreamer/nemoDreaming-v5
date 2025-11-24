import classNames from "classnames";

import CoreH1 from "../core/H1";

import Container from "./Container";

export const H1 = ({
  children,
  className,
  ...props
}: React.ComponentProps<typeof CoreH1>) => (
  <CoreH1
    className={classNames(
      className,
      "font-bold text-base text-white print:text-black print:text-2xl",
    )}
    {...props}
  >
    <span className="opacity-50 print:hidden"># </span>
    {children}
  </CoreH1>
);

export const Code = ({ children }: React.ComponentProps<"code">) => (
  <code className="text-white bg-teal-600">{children}</code>
);

export const Strong = ({ children }: React.ComponentProps<"strong">) => (
  <strong className="text-sm leading-none px-2 pt-0.5 pb-1 rounded-xs text-white bg-teal-600 print:text-base print:p-0 print:text-black print:bg-transparent">
    {children}
  </strong>
);

export default function SubHeader({
  bgClassName,
  children,
}: React.PropsWithChildren<{ bgClassName?: string }>) {
  return (
    <section
      className={classNames(
        bgClassName || "bg-teal-500",
        "text-teal-200 print:text-black",
        "shadow-xl print:shadow-none",
        "font-mono print:font-sans",
      )}
    >
      <Container className="py-4 px-4 print:py-0">{children}</Container>
    </section>
  );
}
