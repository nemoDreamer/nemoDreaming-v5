import { createRef, useCallback, useEffect, useState } from "react";

export default function ReadMore({
  className,
  children,
}: React.HTMLAttributes<HTMLDivElement>) {
  const ref = createRef<HTMLDivElement>();
  const [isOverflowing, setIsOverflowing] = useState(false);
  const [isRevealed, setIsRevealed] = useState(false);
  const [height, setHeight] = useState("auto");

  const handleExpandClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault();
      setIsRevealed(true);
    },
    [setIsRevealed],
  );

  const handleCollapseClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault();
      setIsRevealed(false);
    },
    [setIsRevealed],
  );

  useEffect(() => {
    if (ref.current) {
      setHeight(isRevealed ? `${ref.current?.scrollHeight}px` : "18rem");
    }
  }, [ref, isRevealed, setHeight]);

  useEffect(() => {
    if (ref.current && !isOverflowing) {
      setIsOverflowing(ref.current.scrollHeight > ref.current.clientHeight);
    }
  }, [ref, isOverflowing, setIsOverflowing]);

  return (
    <div className={className}>
      <div
        ref={ref}
        className="transition-[height] duration-1000 overflow-y-hidden relative"
        style={{
          height,
        }}
      >
        {children}

        {isOverflowing &&
          (!isRevealed ? (
            <div className="absolute w-full -bottom-0">
              <div className="h-24 bg-gradient-to-t from-gray-100 to-transparent" />
              <a
                className="block bg-gray-100 border-t border-t-gray-200 p-4 text-center leading-none font-mono italic text-xs text-gray-400 hover:text-teal-300 hover:underline"
                href="#"
                onClick={handleExpandClick}
              >
                read more &gt;&gt;
              </a>
            </div>
          ) : (
            <a
              className="block bg-gray-100 border-t border-t-gray-200 p-4 text-center leading-none font-mono italic text-xs text-gray-400 hover:text-teal-300 hover:underline"
              href="#"
              onClick={handleCollapseClick}
            >
              read less&hellip; &lt;&lt;
            </a>
          ))}
      </div>
    </div>
  );
}
