import classNames from "classnames";
import * as React from "react";

const Container: React.FC<{
  className?: string;
  disableLeftMargin?: boolean;
  disableRightMargin?: boolean;
}> = ({
  className,
  disableLeftMargin = false,
  disableRightMargin = false,
  children,
}) => (
  <div
    className={classNames("w-1/2 h-full flex flex-col", className, {
      "ml-auto": !disableLeftMargin,
      "mr-auto": !disableRightMargin,
    })}
  >
    {children}
  </div>
);

export default Container;
