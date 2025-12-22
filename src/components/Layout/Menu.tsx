import classNames from "classnames";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Fragment } from "react";

import Separator from "../elements/Separator";

import { MENU_ITEMS, isUnderRoute } from "./menu-items";

export default function Menu({
  className,
  ...props
}: React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>) {
  const pathName = usePathname();

  return (
    <div className={classNames("font-mono mb-3", className)} {...props}>
      {MENU_ITEMS.map(({ route, label }, index) => {
        const isLast = index === MENU_ITEMS.length - 1;
        const isCurrent = isUnderRoute(pathName, route);

        return (
          <Fragment key={`item-${label}`}>
            {isCurrent ? (
              <span>
                $(<span className="opacity-60">{label}</span>)
              </span>
            ) : (
              <Link href={route} className="underline">
                {label}
              </Link>
            )}

            {!isLast && <Separator char=" / " />}
          </Fragment>
        );
      })}
    </div>
  );
}
