import Link from "next/link";
import { usePathname } from "next/navigation";
import { Fragment } from "react";

const items = [
  { route: "/", label: "Home" },
  { route: "/work", label: "Work" },
  { route: "/about", label: "About" },
];

const Menu: React.FC = () => {
  const pathname = usePathname();

  return (
    <div className="font-mono mb-3">
      {items.map(({ route, label }, index) => {
        const isLast = index === items.length - 1;
        const isCurrent = route === pathname;

        return (
          <Fragment key={`item-${label}`}>
            {isCurrent ? (
              <span className="text-teal-100 cursor-pointer">
                $(<span className="text-teal-200">{label}</span>)
              </span>
            ) : (
              <Link href={route} className="underline text-teal-100">
                {label}
              </Link>
            )}

            {!isLast && <span className="text-teal-400">{" / "}</span>}
          </Fragment>
        );
      })}
    </div>
  );
};

export default Menu;
