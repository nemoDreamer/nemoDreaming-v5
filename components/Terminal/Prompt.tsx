import * as React from "react";

import Segment from "./Segment";

const segmentColors = [
  { bg: "#00403d" },
  { fg: "#002201", bg: "#f3e2bf" },
  { fg: "#c5e8e6", bg: "#002321" },
  { fg: "#003b01", bg: "#ffe600" },
  { fg: "#67c3bf" },
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

        return (
          <Segment
            key={`segment-${index}`}
            label={label}
            fg={fg}
            bg={bg}
            hideCaret={index === length - 1}
            zIndex={length - index}
          />
        );
      })}
    </>
  );
};

export default Prompt;
