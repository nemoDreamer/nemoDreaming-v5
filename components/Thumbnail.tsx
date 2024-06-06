import classNames from "classnames";
import * as React from "react";

import { useRandom } from "../contexts/Random";

import Image from "./Image";

const rotations = [1, 2, 3, 6];

const Thumbnail = React.forwardRef<
  HTMLDivElement,
  {
    disableRotate?: boolean;
    onClick?: React.MouseEventHandler<HTMLDivElement>;
  } & (
    | {
        shouldFill: true;
        width?: never;
        height?: never;
      }
    | {
        shouldFill?: false;
        width: number;
        height: number;
      }
  ) &
    Omit<React.ComponentProps<typeof Image>, "onClick">
>(function Thumbnail(
  {
    width,
    height,
    shouldFill,
    disableRotate = false,
    onClick,
    alt, // <- needs to be explicitly set in `Image` for linter
    ...imageProps
  },
  ref,
): JSX.Element {
  const [rng] = useRandom();

  const getRandom = (arr: unknown[]) =>
    arr[Math.round(rng.quick() * (arr.length - 1))];

  const getRotation = () =>
    `${rng.quick() < 0.5 ? "-" : ""}rotate-${getRandom(rotations)}`;

  const rotation = getRotation();

  return (
    <div
      ref={ref}
      className={classNames(
        "border-solid border-8 border-white shadow-lg hover:shadow-2xl transition hover:-translate-y-2",
        {
          [`hover:${rotation}`]: !disableRotate,
          [`group-hover:${rotation}`]: !disableRotate,
        },
      )}
      style={
        shouldFill
          ? {
              boxSizing: "border-box",
              width: "100%",
              height: "100%",
              position: "relative",
            }
          : { boxSizing: "content-box", width, height }
      }
      onClick={onClick}
    >
      <Image
        alt={alt}
        {...imageProps}
        {...(shouldFill
          ? {
              fill: true,
              layout: "fill",
            }
          : {
              width,
              height,
            })}
        style={{
          objectFit: "cover",
        }}
      />
    </div>
  );
});

export default Thumbnail;
