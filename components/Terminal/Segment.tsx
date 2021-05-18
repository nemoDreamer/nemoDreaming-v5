import * as React from "react";

import Caret from "./Caret";

const height = 20;
const fontSize = height / 1.5;

const Segment: React.FC<{
  className?: string;
  label: string;
  fg?: string;
  bg?: string;
  index: number;
  length: number;
}> = ({ className, label, fg = "#fff", bg = undefined, index, length }) => {
  const isFirst = index === 0;
  const isLast = index === length - 1;

  return (
    <span
      className={`flex flex-row items-center ${className}`}
      style={{
        zIndex: length - index,
        marginLeft: -height / 2,
      }}
    >
      {(isFirst || label) && (
        <span
          className="font-mono whitespace-nowrap"
          style={{
            height,
            bottom: -1,

            fontSize: `${fontSize}px`,
            lineHeight: `${height}px`,

            color: fg,
            backgroundColor: bg,

            ...(isFirst
              ? {
                  width: "9999px",
                  marginLeft: "-9999px",
                }
              : {
                  paddingLeft: height,
                  paddingRight: height / 2,
                }),
          }}
        >
          {label || <span>&nbsp;</span>}
        </span>
      )}
      {isLast || <Caret height={height} fill={bg} />}
    </span>
  );
};

export default Segment;
