import classNames from "classnames";
import Image from "next/image";
import seedrandom from "seedrandom";

import type { ImageData } from "@/utils/image";

// TailwindCSS rotations (spelled out to avoid culling in production builds)
const rotations = {
  default: [
    "rotate-1",
    "rotate-2",
    "rotate-3",
    // "rotate-6",
    "-rotate-1",
    "-rotate-2",
    "-rotate-3",
    // "-rotate-6",
  ],
  hover: [
    "hover:rotate-1", // group-hover:rotate-1
    "hover:rotate-2", // group-hover:rotate-2
    "hover:rotate-3", // group-hover:rotate-3
    // "hover:rotate-6", // group-hover:rotate-6
    "hover:-rotate-1", // group-hover:-rotate-1
    "hover:-rotate-2", // group-hover:-rotate-2
    "hover:-rotate-3", // group-hover:-rotate-3
    // "hover:-rotate-6", // group-hover:-rotate-6
  ],
} as const;

export default function Thumbnail({
  className,
  image,
  width,
  height,
  alt, // <- needs to be explicitly set in `Image` for linter
  shouldFill,
  disableRotate = false,
  onClick,
  ref,
  ...imageProps
}: {
  image: ImageData;
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
  Omit<
    React.ComponentProps<typeof Image>,
    "onClick" | "src" | "blurDataURL" | "placeholder" | "color"
  >) {
  const rng = seedrandom(image.blurDataURL); // <- seed to get consistent results
  const getRandom = (arr: readonly string[]) =>
    arr[Math.round(rng.quick() * (arr.length - 1))];

  const rotation = getRandom(rotations.default);

  return (
    <div
      ref={ref}
      className={classNames(
        className,
        "border-solid border-8 border-white shadow-lg",
        "transition hover:shadow-2xl hover:-translate-y-2 group-hover:-translate-y-2",
        !disableRotate && `${rotation} hover:rotate-0 group-hover:rotate-0`,
        !!onClick && "cursor-pointer",
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
        src={image.src}
        blurDataURL={image.blurDataURL}
        placeholder="blur"
        {...(shouldFill
          ? {
              fill: true,
            }
          : {
              width,
              height,
            })}
        className="ring-1 ring-gray-300 shadow-md"
        style={{
          objectFit: "cover",
          backgroundColor: image.color,
        }}
      />
    </div>
  );
}
