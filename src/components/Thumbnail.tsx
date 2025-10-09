import classNames from "classnames";
import Image from "next/image";
import { forwardRef } from "react";

import { type PostImage } from "@//lib/posts";

import { useRandom } from "../contexts/Random";

const rotations = [1, 2, 3, 6];

const Thumbnail = forwardRef<
  HTMLDivElement,
  {
    image: PostImage;
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
    >
>(function Thumbnail(
  {
    image,
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
          "cursor-pointer": !!onClick,
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
});

export default Thumbnail;
