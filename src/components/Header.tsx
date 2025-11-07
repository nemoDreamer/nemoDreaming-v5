"use client";

import { useLayout } from "@/contexts/layout";

export function Header() {
  const { pageTitle } = useLayout();

  return (
    <header>
      <h1 className="border-solid border-2 border-red-500">
        {pageTitle || "NemoDreaming"}
      </h1>
    </header>
  );
}
