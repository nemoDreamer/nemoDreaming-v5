import { H1 } from "@/components/Layout/SubHeader";
import ArrowLink from "@/components/elements/ArrowLink";
import Separator from "@/components/elements/Separator";

const MENU_ITEMS = {
  clients: { label: "Client Work", href: "/work/clients" },
  "open-source": { label: "Open Source", href: "/work/open-source" },
  // "personal-projects": {
  //   label: "Personal",
  //   href: "/work/personal",
  // },
};

export default function WorkMenu({
  currentKey,
}: {
  currentKey: keyof typeof MENU_ITEMS;
}) {
  const currentItem = MENU_ITEMS[currentKey];

  return (
    <div className="flex flex-row items-baseline gap-4">
      <H1>{currentItem.label}</H1>
      <Separator />
      {Object.entries(MENU_ITEMS).map(([key, item]) =>
        key !== currentKey ? (
          <>
            <ArrowLink key={key} href={item.href}>
              {item.label}
            </ArrowLink>
          </>
        ) : null,
      )}
    </div>
  );
}
