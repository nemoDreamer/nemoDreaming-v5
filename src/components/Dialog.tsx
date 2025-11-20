"use client";

import {
  FloatingFocusManager,
  FloatingOverlay,
  FloatingPortal,
  useClick,
  useDismiss,
  useFloating,
  useId,
  useInteractions,
  useRole,
  useTransitionStyles,
} from "@floating-ui/react";
import { useCallback, useState } from "react";

// import "./styles.css";

export const useDialog = () => {
  const [isOpen, setIsOpen] = useState(false);

  const { refs, context } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
  });

  const click = useClick(context);
  const role = useRole(context);
  const dismiss = useDismiss(context, { outsidePressEvent: "mousedown" });

  const { getReferenceProps, getFloatingProps } = useInteractions([
    click,
    role,
    dismiss,
  ]);

  const headingId = useId();
  const descriptionId = useId();

  return {
    refs,
    context,
    isOpen,
    setIsOpen,
    getReferenceProps,
    getFloatingProps,
    headingId,
    descriptionId,
  };
};

/**
 * A Dialog using `@floating-ui/react`.
 *
 * @example <caption>Usage:</caption>
 * const {
 *   refs,
 *   context,
 *   isOpen,
 *   setIsOpen,
 *   getReferenceProps,
 *   getFloatingProps,
 *   headingId,
 *   descriptionId,
 *  } = useDialog();
 *
 *  return (
 *   <>
 *     <button ref={refs.setReference} {...getReferenceProps()}>
 *       Open Dialog
 *     </button>
 *     <Dialog
 *       refs={refs}
 *       context={context}
 *       setIsOpen={setIsOpen}
 *       getFloatingProps={getFloatingProps}
 *     >
 *       <h2 id={headingId}>Dialog Heading</h2>
 *       <p id={descriptionId}>Description</p>
 *       <button onClick={() => setIsOpen(false)}/>
 *         Close
 *       </button>
 *     </Dialog>
 *   </>
 * )
 */
export default function Dialog({
  refs,
  context,
  setIsOpen,
  getFloatingProps,
  headingId,
  descriptionId,
  children,
}: React.PropsWithChildren<
  Omit<ReturnType<typeof useDialog>, "isOpen" | "getReferenceProps">
>) {
  const { isMounted, styles } = useTransitionStyles(context, {
    duration: 250,
    initial: {
      opacity: "0",
      transform: "translate(0,25px) scale(0.975)",
    },
  });

  const handleCloseClick = useCallback(() => {
    setIsOpen(false);
  }, [setIsOpen]);

  return (
    <FloatingPortal>
      {isMounted && (
        <FloatingOverlay
          lockScroll
          className="z-50 grid place-items-center bg-teal-300/50"
          style={{
            opacity: styles.opacity,
            transitionProperty: styles.transitionProperty,
            transitionDuration: styles.transitionDuration,
          }}
        >
          <FloatingFocusManager context={context}>
            <div
              className="relative m-4 p-4 bg-white shadow-2xl font-sans outline-none transition-[height]"
              ref={(floatingRef) => refs.setFloating(floatingRef)}
              aria-labelledby={headingId}
              aria-describedby={descriptionId}
              {...getFloatingProps()}
              style={{
                maxWidth: "100vw",
                maxHeight: "100vh",
                ...styles,
              }}
            >
              {children}
              <button
                className="absolute top-0 right-0 z-50 bg-white text-black hover:bg-black hover:text-white font-mono grid place-items-center p-0 m-0 w-8 h-8 leading-none outline-none border-none"
                onClick={handleCloseClick}
              >
                &times;
              </button>
            </div>
          </FloatingFocusManager>
        </FloatingOverlay>
      )}
    </FloatingPortal>
  );
}
