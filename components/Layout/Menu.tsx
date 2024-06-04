import { useRouter } from "next/dist/client/router";
import Link from "next/link";
import * as React from "react";

const items = [
  { route: "/", label: "Home" },
  { route: "/work", label: "Work" },
  { route: "/about", label: "About" },
];

const Menu: React.FC = () => {
  const { pathname } = useRouter();

  return (
    <div className="font-mono mb-3">
      {items.map(({ route, label }, index) => {
        const isLast = index === items.length - 1;
        const isCurrent = route === pathname;

        return (
          <React.Fragment key={`item-${label}`}>
            {isCurrent ? (
              <span className="text-teal-100">
                $(<span className="text-teal-200">{label}</span>)
              </span>
            ) : (
              <Link href={route}>
                <a className="underline text-teal-100">{label}</a>
              </Link>
            )}

            {!isLast && <span className="text-teal-400">{" / "}</span>}
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default Menu;
