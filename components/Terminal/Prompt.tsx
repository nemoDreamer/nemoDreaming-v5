import * as React from "react";

import Segment from "./Segment";

// TODO: make variations? Bake into tailwind.config?
const segmentColors = [
  { fg: "#d7efee", bg: "#00403d" },
  { fg: "#002e01", bg: "#f3e2bf" },
  { fg: "#edf8f7", bg: "#002321" },
  { fg: "#005101", bg: "#ffe600" },
  { fg: "#b7e2e1" },
];

const Prompt: React.FC<{
  version?: string;
  user?: string;
  branch?: string;
  filePath?: string;
}> = ({
  version = "v5.0.1",
  user = "philip.blyth",
  branch = "main",
  filePath = "about/README.md",
}) => {
  const segments = ["", version, user, branch, filePath];
  const length = segments.length;

  return (
    <>
      {segments.map((label, index) => {
        const { fg, bg } = segmentColors[index];
        const isLast = index === length - 1;

        return (
          <Segment
            key={`segment-${index}`}
            label={label}
            fg={fg}
            bg={bg}
            zIndex={length - index}
            isLast={isLast}
          />
        );
      })}
    </>
  );
};

export default Prompt;
