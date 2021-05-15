import * as React from "react";

const Caret: React.FC<{
  height?: number;
  fill?: string;
}> = ({ height: h = 20, fill = "#fff" }) => {
  const w = h / 2;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={w}
      height={h}
      viewBox={`0 0 ${w} ${h}`}
      className="inline-block"
    >
      <g>
        <path
          d={`m0,0l${w},${w}l-${w},${w}l-0,-${h}z`}
          // stroke="#000"
          fill={fill}
        />
      </g>
    </svg>
  );
};

export default Caret;
