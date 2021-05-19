import * as React from "react";

import { segmentConfigs } from "./Layout/Terminal/Prompt";

const shades = ["█", "▓", "▒", "░"];

const Cursor: React.FC = () => (
  <span className="animate-blink" style={{ color: segmentConfigs[3].bg }}>
    {shades[2]}
  </span>
);

export default Cursor;
