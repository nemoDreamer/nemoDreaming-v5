import classNames from "classnames";

/**
 * A responsive Tailwind grid layout.
 */
export default function Grid({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={classNames(
        className,
        "grid grid-flow-row",
        "grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 md:grid-cols-5",
        "gap-4 justify-center place-items-center",
      )}
    >
      {children}
    </div>
  );
}

/**
 * NOTE: this is the responsive grid break-points translated...
 */
Grid.SIZES =
  "(max-width: 480px) 240px, (max-width: 640px) 213px, (max-width: 768px) 192px, 153px";
