import classNames from "classnames";
import * as React from "react";

import { useRandom } from "../contexts/Random";

import Image from "./Image";

const rotations = [1, 2, 3, 6];

const Thumbnail = React.forwardRef<
  HTMLDivElement,
  {
    image: string;
    alt: string;
    folder?: string;
    disableRotate?: boolean;
    id?: string;
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
  )
>(function Thumbnail(
  {
    image,
    alt,
    folder,
    width,
    height,
    shouldFill,
    disableRotate = false,
    id,
    onClick,
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
        id={id}
        alt={alt}
        image={image}
        folder={folder}
        {...(shouldFill
          ? {
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
