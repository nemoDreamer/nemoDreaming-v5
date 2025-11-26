import { segmentConfigs } from "./Prompt";

const shades = ["█", "▓", "▒", "░"];

const Cursor: React.FC<{ variant?: number }> = ({ variant = 2 }) => (
  <span className="animate-blink" style={{ color: segmentConfigs[3].bg }}>
    {shades[variant]}
  </span>
);

export default Cursor;
