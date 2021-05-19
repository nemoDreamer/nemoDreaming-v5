import { useRouter } from "next/dist/client/router";
import Link from "next/link";
import * as React from "react";

const items = [
  { route: "/", label: "Home" },
  { route: "/about", label: "About" },
  { route: "/blog", label: "Blog" },
];

const Menu: React.FC = () => (
  <div className="font-mono mb-3">
    {items.map(({ route, label }, index) => {
      const { pathname } = useRouter();

      const isLast = index === items.length - 1;
      const isCurrent = route === pathname;

      return (
        <>
          {isCurrent ? (
            <span className="text-teal-100">
              $(<span className="text-teal-200">{label}</span>)
            </span>
          ) : (
            <Link key={`item-${label}`} href={route}>
              <a className="underline text-teal-100">{label}</a>
            </Link>
          )}

          {!isLast && <span className="text-teal-400">{" / "}</span>}
        </>
      );
    })}
  </div>
);

export default Menu;
