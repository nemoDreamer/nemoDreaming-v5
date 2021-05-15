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
    className={classNames(
      "w-5/6 md:w-3/4 lg:w-1/2 max-w-2xl h-full flex flex-col",
      className,
      {
        "ml-auto": !disableLeftMargin,
        "mr-auto": !disableRightMargin,
      }
    )}
  >
    {children}
  </div>
);

export default Container;
