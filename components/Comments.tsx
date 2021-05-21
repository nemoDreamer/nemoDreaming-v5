import * as React from "react";

const Comment: React.FC = ({ children }) => (
  <div className="line">
    {`//`} {children}
  </div>
);

const Comments: React.FC<{ lines: (string | React.ReactNode)[] }> = ({
  lines,
}) => (
  <p className="comments font-mono text-xs text-gray-500">
    {lines.map((line, index) => (
      <Comment key={index}>{line}</Comment>
    ))}
  </p>
);

export default Comments;
