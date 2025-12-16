"use client";

import classNames from "classnames";
import { usePathname } from "next/navigation";

import CoreH1 from "../core/H1";

import Container from "./Container";
import { getColorsForPath } from "./menu-items";

export const H1 = ({
  children,
  className = "mb-0",
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

export const Code = ({ children }: React.ComponentProps<"code">) => {
  const pathName = usePathname();
  const { capsule } = getColorsForPath(pathName);

  return <code className={capsule}>{children}</code>;
};

export const Strong = ({ children }: React.ComponentProps<"strong">) => {
  const pathName = usePathname();
  const { capsule } = getColorsForPath(pathName);

  return (
    <strong
      className={classNames(
        capsule,
        "text-sm leading-none px-2 pt-0.5 pb-1 rounded-xs",
        "print:text-base print:p-0 print:text-black print:bg-transparent",
      )}
    >
      {children}
    </strong>
  );
};

export default function SubHeader({ children }: React.PropsWithChildren) {
  const pathName = usePathname();
  const isSticky = pathName.includes("work") ? true : false;

  const colorClassNames = getColorsForPath(pathName);

  return (
    <section
      className={classNames(
        isSticky && "sticky top-0 w-full z-20 print:static",
        "transition-colors duration-500",
        colorClassNames.bg,
        colorClassNames.fg,
        "print:text-black",
        "shadow-xl print:shadow-none",
        "font-mono print:font-sans",
      )}
    >
      <div className="sticky top-0 w-full z-20 print:static">
        <Container className="py-4 px-4 print:py-0">{children}</Container>
      </div>
    </section>
  );
}
