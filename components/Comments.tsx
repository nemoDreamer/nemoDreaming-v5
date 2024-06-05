import * as React from "react";

type Comment = string | React.ReactNode;

const Comment = ({ children }: { children: Comment }) => (
  <p className="m-0">
    {`//`} {children}
  </p>
);

const Comments = ({ lines }: { lines: Comment[] }) => (
  <div className="font-mono text-xs text-gray-500 mb-4">
    {lines.map((line, index) => (
      <Comment key={index}>{line}</Comment>
    ))}
  </div>
);

export default Comments;
