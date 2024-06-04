import path from "path";

import classNames from "classnames";
import Image from "next/image";
import * as React from "react";

import { useRandom } from "../contexts/Random";

const rotations = [1, 2, 3, 6];

const getImageSrc = (folder: string | undefined, image: string): string =>
  folder ? path.join(folder, image) : image;

const Thumbnail: React.FC<{
  image: string;
  alt: string;
  folder?: string;
  width?: number;
  height?: number;
  shouldFill?: boolean;
  disableRotate?: boolean;
}> = ({
  image,
  alt,
  folder,
  width,
  height,
  shouldFill = false,
  disableRotate = false,
}): JSX.Element => {
  const [rng] = useRandom();

  const getRandom = (arr: unknown[]) =>
    arr[Math.round(rng.quick() * (arr.length - 1))];

  const getRotation = () =>
    `${rng.quick() < 0.5 ? "-" : ""}rotate-${getRandom(rotations)}`;

  const rotation = getRotation();

  const src = getImageSrc(folder, image);

  return (
    <div
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
    >
      <Image
        alt={alt}
        className="inline-block"
        src={src}
        {...(shouldFill
          ? {
              fill: true,
            }
          : {
              width: width as number,
              height: height as number,
            })}
        style={{
          objectFit: "cover",
        }}
      />
    </div>
  );
};

export default Thumbnail;
