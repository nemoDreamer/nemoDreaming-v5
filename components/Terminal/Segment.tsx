import classNames from "classnames";
import * as React from "react";

import Caret from "./Caret";

const height = 20;
const fontSize = height / 1.5;

const Segment: React.FC<{
  className?: string;
  label: string;
  fg?: string;
  bg?: string;
  zIndex: number;
  isLast?: boolean;
}> = ({
  className,
  label,
  fg = "#fff",
  bg = undefined,
  zIndex,
  isLast = false,
}) => (
  <span
    className={classNames(className, "relative", {
      "block sm:inline-block": isLast,
    })}
    style={{
      zIndex,
      marginLeft: -height / 2,
    }}
  >
    {label && (
      <span
        className="inline-block relative font-mono whitespace-nowrap"
        style={{
          height,
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
    {isLast || <Caret height={height} fill={bg} />}
  </span>
);

export default Segment;
