"use client";

import { useCallback, useEffect, useReducer, useRef } from "react";

type State = {
  isOverflowing: boolean;
  isRevealed: boolean;
  collapsedHeight: number | null;
  expandedHeight: number | null;
  height: string;
};

function reducer(
  state: State,
  action:
    | { type: "measure"; collapsedHeight: number; expandedHeight: number }
    | { type: "expand" | "collapse" },
): State {
  switch (action.type) {
    case "measure": {
      return {
        ...state,
        collapsedHeight: action.collapsedHeight,
        expandedHeight: action.expandedHeight + 96, // <- buffer for gradient fade,
        isOverflowing: action.expandedHeight > action.collapsedHeight,
        height: `${action.collapsedHeight}px`,
      };
    }
    case "expand": {
      const expanded = state.expandedHeight;
      return {
        ...state,
        isRevealed: true,
        height: expanded !== null ? `${expanded}px` : state.height,
      };
    }
    case "collapse": {
      const collapsed = state.collapsedHeight;
      return {
        ...state,
        isRevealed: false,
        height: collapsed !== null ? `${collapsed}px` : "auto",
      };
    }
    default:
      return state;
  }
}

export default function ReadMore({
  className,
  children,
}: React.HTMLAttributes<HTMLDivElement>) {
  const ref = useRef<HTMLDivElement>(null);
  const lastWidthRef = useRef<number>(0);

  const [
    {
      isOverflowing,
      isRevealed,
      collapsedHeight,
      // expandedHeight,
      height,
    },
    dispatch,
  ] = useReducer(reducer, {
    isOverflowing: false,
    isRevealed: false,
    collapsedHeight: null,
    expandedHeight: null,
    height: "auto",
  });

  const handleToggleClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault();
      dispatch({ type: isRevealed ? "collapse" : "expand" });
    },
    [isRevealed],
  );

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // detect when content is loaded and measure it
    const resizeObserver = new ResizeObserver(() => {
      const currentWidth = element.clientWidth;
      const scrollHeight = element.scrollHeight;

      // Only measure once initially, or when width changes (responsive resize)
      if (
        (collapsedHeight === null && scrollHeight > 0) ||
        (lastWidthRef.current > 0 && currentWidth !== lastWidthRef.current)
      ) {
        lastWidthRef.current = currentWidth;
        dispatch({
          type: "measure",
          collapsedHeight: Math.min(scrollHeight, 288), // 18rem = 288px
          expandedHeight: scrollHeight,
        });
      }
    });

    resizeObserver.observe(element);

    return () => {
      resizeObserver.disconnect();
    };
  }, [collapsedHeight]);

  return (
    <div className={className}>
      <div
        ref={ref}
        className={
          "transition-[height] duration-1000 overflow-y-hidden relative"
        }
        style={{
          height,
        }}
      >
        {children}

        {isOverflowing && (
          <div className="absolute w-full bottom-0">
            <div className="h-24 bg-linear-to-t from-gray-100 to-transparent" />
            <a
              className="block bg-gray-100 border-t border-t-gray-200 p-4 text-center leading-none font-mono italic text-xs text-gray-400 hover:text-teal-300 hover:underline"
              href="#"
              onClick={handleToggleClick}
            >
              {!isRevealed ? (
                <>read more &gt;&gt;</>
              ) : (
                <>read less&hellip; &lt;&lt;</>
              )}
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
