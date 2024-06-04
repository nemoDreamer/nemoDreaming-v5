import classNames from "classnames";
import * as React from "react";

const CardContext = React.createContext({ hasHover: false });

const Card = ({
  hasHover = false,
  className,
  children,
}: React.PropsWithChildren<{
  hasHover?: boolean;
}> &
  React.HTMLAttributes<HTMLDivElement>) => (
  <CardContext.Provider value={{ hasHover }}>
    <div
      className={classNames(
        "bg-white shadow-md border border-solid border-gray-200",
        className,
        {
          "group hover:shadow-xl transition-shadow": hasHover,
        },
      )}
    >
      {children}
    </div>
  </CardContext.Provider>
);

const CardTop = ({
  className,
  children,
}: React.PropsWithChildren & React.HTMLAttributes<HTMLDivElement>) => (
  <div className={classNames("p-4", className)}>{children}</div>
);

const CardBottom = ({
  className,
  children,
}: React.PropsWithChildren & React.HTMLAttributes<HTMLDivElement>) => {
  const { hasHover } = React.useContext(CardContext);

  return (
    <div
      className={classNames("bg-gray-100 px-4 py-2", className, {
        "group-hover:bg-gray-50 transition-colors": hasHover,
      })}
    >
      {children}
    </div>
  );
};

Card.Top = CardTop;
Card.Bottom = CardBottom;
// NOTE: aliases:
Card.Body = CardTop;
Card.Details = CardBottom;

export default Card;
