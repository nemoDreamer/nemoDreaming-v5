import classNames from "classnames";
import * as React from "react";

const Container = ({
  className,
  disableLeftMargin = false,
  disableRightMargin = false,
  children,
}: React.PropsWithChildren<{
  disableLeftMargin?: boolean;
  disableRightMargin?: boolean;
}> &
  React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={classNames(
      "container mx-auto md:max-w-2xl print:w-full print:max-w-full h-full flex flex-col",
      className,
      {
        "ml-0": disableLeftMargin,
        "mr-0": disableRightMargin,
      },
    )}
  >
    {children}
  </div>
);

export default Container;
