import path from "path";

import Image, { ImageProps } from "next/image";

export default function CustomImage({
  image,
  folder,
  alt,
  ...props
}: { image: string; folder?: string } & Omit<ImageProps, "src">) {
  const src = folder ? path.join(folder, image) : image;
  return <Image alt={alt} src={src} {...props} />;
}
