import * as React from "react";

const Comment = ({ children }: React.PropsWithChildren) => (
  <div>
    {`//`} {children}
  </div>
);

const Comments: React.FC<{
  lines: (string | React.ReactNode)[];
}> = ({ lines }) => (
  <p className="font-mono text-xs text-gray-500">
    {lines.map((line, index) => (
      <Comment key={index}>{line}</Comment>
    ))}
  </p>
);

export default Comments;
