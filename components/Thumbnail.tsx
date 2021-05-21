import path from "path";

import classNames from "classnames";
import Image from "next/image";
import * as React from "react";

const getRandom = (arr: unknown[]) =>
  arr[Math.round(Math.random() * (arr.length - 1))];

const rotations = [1, 2, 3, 6];
const getRotation = () =>
  `${Math.random() < 0.5 ? "-" : ""}rotate-${getRandom(rotations)}`;

const getImageSrc = (folder: string | undefined, image: string): string =>
  folder ? path.join(folder, image) : image;

const Thumbnail: React.FC<{
  image: string;
  folder?: string;
  width?: number;
  height?: number;
  shouldFill?: boolean;
}> = ({ image, folder, width, height, shouldFill = false }): JSX.Element => {
  return (
    <div
      className={classNames(
        "border-solid border-8 border-white shadow-lg hover:shadow-2xl transition transform hover:-translate-y-2",
        {
          [`hover:${getRotation()}`]: !shouldFill,
        }
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
        className="inline-block"
        src={getImageSrc(folder, image)}
        {...(shouldFill
          ? {
              layout: "fill",
            }
          : {
              width: width as number,
              height: height as number,
            })}
        objectFit="cover"
      />
    </div>
  );
};

export default Thumbnail;
