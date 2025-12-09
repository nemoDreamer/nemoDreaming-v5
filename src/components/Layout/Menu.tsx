import Link from "next/link";
import { usePathname } from "next/navigation";
import { Fragment } from "react";

import Separator from "../elements/Separator";

const MENU_ITEMS = [
  { route: "/", label: "Home" },
  { route: "/work", label: "Work" },
  { route: "/about", label: "About" },
];

const Menu: React.FC = () => {
  const pathname = usePathname();

  return (
    <div className="font-mono mb-3">
      {MENU_ITEMS.map(({ route, label }, index) => {
        const isLast = index === MENU_ITEMS.length - 1;
        const isCurrent =
          route === pathname ||
          (route !== MENU_ITEMS[0].route && pathname.startsWith(route));

        return (
          <Fragment key={`item-${label}`}>
            {isCurrent ? (
              <span className="text-teal-100">
                $(<span className="text-teal-200">{label}</span>)
              </span>
            ) : (
              <Link href={route} className="underline text-teal-100">
                {label}
              </Link>
            )}

            {!isLast && <Separator className="text-teal-200" char=" / " />}
          </Fragment>
        );
      })}
    </div>
  );
};

export default Menu;
