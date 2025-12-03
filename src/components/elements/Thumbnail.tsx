import classNames from "classnames";
import Image from "next/image";

import { getRotationClassNames } from "@/utils/class-names";
import type { ImageData } from "@/utils/image";

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
  const rotationClassNames =
    !disableRotate && getRotationClassNames(image.blurDataURL);

  return (
    <div
      ref={ref}
      className={classNames(
        className,
        "border-solid border-8 border-white shadow-lg",
        "transition hover:shadow-2xl hover:-translate-y-2 group-hover:-translate-y-2",
        rotationClassNames,
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
