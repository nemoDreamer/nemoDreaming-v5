import fs from "fs";
import path from "path";

import { getPlaiceholder } from "plaiceholder";

export type ImageData = {
  src: string;
  width: number;
  height: number;
  blurDataURL: string;
  color: string;
};

const MAX_WIDTH = 1280;
const MAX_HEIGHT = 960;

export const getImageSrc = (image: string, folder?: string) =>
  folder ? path.join(folder, image) : image;

export const getImageData = async (
  image: string,
  folder?: string,
): Promise<ImageData> => {
  const src = getImageSrc(image, folder);
  const file = fs.readFileSync(path.join("./public", src));
  const {
    base64,
    color: { hex },
    metadata: { width: _width, height: _height },
  } = await getPlaiceholder(file, {
    size: 15,
    // saturation: 0.5,
    // brightness: 2,
  });

  let width = _width;
  let height = _height;
  if (width > MAX_WIDTH || height > MAX_HEIGHT) {
    const widthRatio = MAX_WIDTH / width;
    const heightRatio = MAX_HEIGHT / height;
    const scalingFactor = Math.min(widthRatio, heightRatio);

    width = Math.round(width * scalingFactor);
    height = Math.round(height * scalingFactor);
  }

  return { src, width, height, blurDataURL: base64, color: hex };
};
