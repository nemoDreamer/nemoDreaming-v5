"use client";

import { useEffect } from "react";

import { useLayout } from "@/contexts/layout";

/**
 * A non-rendering Component that sets contextual layout properties.
 *
 * @param props
 * @param props.pageTitle {string} The title to set for the page layout
 */
export default function LayoutSetter({ pageTitle }: { pageTitle: string }) {
  const { setPageTitle } = useLayout();

  useEffect(() => {
    setPageTitle(pageTitle);
  }, [pageTitle, setPageTitle]);

  return null; // This component doesn't render anything
}
