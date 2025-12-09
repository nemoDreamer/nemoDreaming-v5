import type { Metadata } from "next";

import Main from "@/components/Layout/Main";

import WorkGroup from "../_components/WorkGroup";
import WorkMenu from "../_components/WorkMenu";

export const metadata: Metadata = {
  title: "Client Work",
};

/*
TODO:
- [ ] Missing projects:
  - Urban Icons
  - Slow Night
  - Winter's Fire
  - Between the Times
  - Design Libraries?
  - Kerosene / Day You Left
- [ ] add larger 'featured' to top
- [ ] add filtering by category / technology
*/

export default function ClientWorkPage() {
  return (
    <Main subHeader={<WorkMenu currentKey="clients" />}>
      <WorkGroup basepath="/work/clients" />
    </Main>
  );
}
