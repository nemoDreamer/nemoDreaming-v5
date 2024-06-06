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
import { useState } from "react";

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
  getFloatingProps,
  headingId,
  descriptionId,
  children,
}: React.PropsWithChildren<
  Omit<ReturnType<typeof useDialog>, "setIsOpen" | "getReferenceProps">
>) {
  const { isMounted, styles } = useTransitionStyles(context, {
    duration: 250,
    initial: {
      opacity: "0",
      transform: "translate(0,25px) scale(0.975)",
    },
  });

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
              className="trans m-4 p-4 bg-white rounded-md shadow-2xl font-sans outline-none"
              ref={refs.setFloating}
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
            </div>
          </FloatingFocusManager>
        </FloatingOverlay>
      )}
    </FloatingPortal>
  );
}
