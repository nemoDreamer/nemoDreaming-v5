import * as React from "react";

import Caret from "./Caret";

type SegmentProps = {
  label: string;
  fg?: string;
  bg?: string;
  hideCaret?: boolean;
  zIndex: number;
};

const height = 20;
const fontSize = height / 1.5;

const Segment: React.FC<SegmentProps> = ({
  label,
  fg = "#fff",
  bg = undefined,
  hideCaret = false,
  zIndex,
}: SegmentProps) => (
  <span
    style={{
      zIndex,
      marginLeft: -height / 2,
      position: "relative",
    }}
  >
    {label && (
      <span
        className="inline-block font-mono"
        style={{
          height,
          position: "relative",
          bottom: -1,

          paddingLeft: height,
          paddingRight: height / 2,

          fontSize: `${fontSize}px`,
          lineHeight: `${height}px`,

          color: fg,
          backgroundColor: bg,
        }}
      >
        {label}
      </span>
    )}
    {hideCaret || <Caret height={height} fill={bg} />}
  </span>
);

export default Segment;
