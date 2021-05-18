import * as React from "react";

import Segment from "./Segment";

// TODO: make variations? Bake into tailwind.config?
export const segmentConfigs = [
  /* root:     */ { fg: "#f1f7f7", bg: "#002d2b" },
  /* version:  */ { fg: "#002c02", bg: "#f3d6a6", font: "font-extralight" },
  /* user:     */ { fg: "#f9fcfb", bg: "#001918" },
  /* branch:   */ { fg: "#004f02", bg: "#ffdc00", font: "font-bold" },
  /* filePath: */ { fg: "#b1d2d1" /* bg: none */, font: "italic" },
];

export type PromptProps = {
  version?: string;
  user?: string;
  branch?: string;
  filePath?: string;
};

const Prompt: React.FC<PromptProps> = ({
  version = "v5.0.1",
  user = "philip.blyth",
  branch = "main",
  filePath = "about/README.md",
}) => {
  const segments = ["", version, user, branch, filePath];
  const length = segments.length;

  return (
    <div className="flex flex-row items-center justify-start flex-wrap">
      {segments.map((label, index) => {
        const { fg, bg, font } = segmentConfigs[index];

        return (
          <Segment
            className={font}
            key={`segment-${index}`}
            label={label}
            fg={fg}
            bg={bg}
            // placement:
            index={index}
            length={length}
          />
        );
      })}
    </div>
  );
};

export default Prompt;
