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
      "container mx-auto px-8 md:max-w-2xl h-full flex flex-col",
      className,
      {
        "ml-0": disableLeftMargin,
        "mr-0": disableRightMargin,
      }
    )}
  >
    {children}
  </div>
);

export default Container;
