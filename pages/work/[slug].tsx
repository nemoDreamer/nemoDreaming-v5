import classNames from "classnames";
import { type GetStaticPaths, type GetStaticProps } from "next";
import Image from "next/image";
import { useCallback, useMemo, useState } from "react";

import ReadMore from "@/components/ReadMore";

import ArrowLink from "../../components/ArrowLink";
import Dialog, { useDialog } from "../../components/Dialog";
import Main from "../../components/Layout/Main";
import Separator from "../../components/Separator";
import Thumbnail from "../../components/Thumbnail";
import Random from "../../contexts/Random";
import { type PostData, getAllPostSlugs, getPost } from "../../lib/posts";
import formatDate from "../../utils/formatDate";

import { DIRECTORY } from ".";

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const workPost = await getPost(DIRECTORY, params?.slug as string);

  return {
    props: {
      workPost,
      siteTitle: workPost.title,
      prompt: {
        branch: "dev",
        filePath: `work/${workPost.slug ? `${workPost.slug}.md` : ""}`,
      },
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: getAllPostSlugs(DIRECTORY),
  fallback: false,
});

const subHeader = (
  <ArrowLink href="/work" isBack>
    Back
  </ArrowLink>
);

const CAROUSEL_NAV_CLASSES: React.HTMLAttributes<HTMLDivElement>["className"] =
  "opacity-0 hover:opacity-100 transition-opacity duration-300 from-black/25 via-35% via-black/10 to-transparent w-1/4 absolute top-0 bottom-0 grid place-items-center cursor-pointer select-none";

const Work: React.FC<{
  workPost: PostData;
}> = ({
  workPost: { title, date, contentHtml, category, technologies, images },
}) => {
  const {
    refs,
    context,
    // isOpen,
    setIsOpen,
    // getReferenceProps,
    getFloatingProps,
    headingId,
    descriptionId,
  } = useDialog();

  const [imageIndex, setImageIndex] = useState(0);

  const makeThumbnailClickHandler = useCallback(
    (index: number) => () => {
      setImageIndex(index);
      setIsOpen(true);
    },
    [setIsOpen, setImageIndex],
  );

  const currentImage = useMemo(() => images[imageIndex], [images, imageIndex]);

  const onPrevImage = useCallback(() => {
    setImageIndex((imageIndex + images.length - 1) % images.length);
  }, [imageIndex, images.length]);

  const onNextImage = useCallback(() => {
    setImageIndex((imageIndex + 1) % images.length);
  }, [imageIndex, images.length]);

  const innerHtml = useMemo(() => ({ __html: contentHtml }), [contentHtml]);

  return (
    <Random.Provider value={/* seed: */ `${title}|${date}`}>
      <Main subHeader={subHeader}>
        <h2>{title}</h2>
        <div className="mb-4 text-sm text-gray-500 flex flex-row items-baseline space-x-4">
          <span className="date">{formatDate(date)}</span>
          {category && (
            <>
              <Separator />
              <span className="category rounded-sm bg-yellow-300 text-yellow-900 px-1.5 py-0.5">
                {category}
              </span>
            </>
          )}
          {technologies && (
            <>
              <Separator />
              <span className="technologies">
                {technologies.sort().join(" / ")}
              </span>
            </>
          )}
        </div>

        <div className="mb-8 xs:grid xs:gap-4 xs:grid-cols-3 md:grid-cols-7">
          <div className="mb-4 xs:mb-0 md:col-span-2 md:-ml-24 md:w-64">
            <div className="square">
              <div className="content relative">
                <Thumbnail
                  alt="Main Preview Image"
                  image={images[0]}
                  shouldFill
                  sizes="(max-width: 768px) 256px, (max-width: 480px) 160px, 480px"
                  disableRotate
                  priority
                  onClick={makeThumbnailClickHandler(0)}
                />
              </div>
            </div>
          </div>
          <ReadMore className="mb-4 mx-3 xs:mx-0 xs:mb-0 xs:col-span-2 md:col-span-5">
            <div dangerouslySetInnerHTML={innerHtml} />
          </ReadMore>
        </div>

        <div className="mb-4 grid grid-flow-row grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4 justify-center place-items-center">
          {images.slice(1).map((image, index) => (
            <div className="square" key={`image-${image.src}`}>
              <div className="content relative">
                <Thumbnail
                  alt={`Preview Thumbnail #${index + 1}`}
                  image={image}
                  shouldFill
                  // NOTE: this is the responsive grid break-points translated...:
                  sizes="(max-width: 480px) 240px, (max-width: 640px) 213px, (max-width: 768px) 192px, 153px"
                  onClick={makeThumbnailClickHandler(
                    index + 1 /* <- +1 because of `.slice` */,
                  )}
                />
              </div>
            </div>
          ))}
        </div>

        <Dialog
          refs={refs}
          context={context}
          setIsOpen={setIsOpen}
          getFloatingProps={getFloatingProps}
          headingId={headingId}
          descriptionId={descriptionId}
        >
          <div className="relative">
            <Image
              key={imageIndex} // <- force new instance of Image (to show blur)
              id={headingId}
              alt={`Preview #${imageIndex + 1}`}
              {...currentImage}
              placeholder="blur"
              sizes="100vw"
              quality={85}
              className="transition-[height]"
              style={{
                objectFit: "contain",
                backgroundColor: currentImage.color,
              }}
              priority
            />
            <div
              className={classNames(
                CAROUSEL_NAV_CLASSES,
                "left-0 bg-gradient-to-r",
              )}
              onClick={onPrevImage}
            >
              <div className="bg-black p-4 leading-none text-white font-sans">
                &larr;
              </div>
            </div>
            <div
              className={classNames(
                CAROUSEL_NAV_CLASSES,
                "right-0 bg-gradient-to-l",
              )}
              onClick={onNextImage}
            >
              <div className="bg-black p-4 leading-none text-white font-sans">
                &rarr;
              </div>
            </div>
          </div>
          {/* TODO: add descriptions per image */}
          <p id={descriptionId} className="hidden">
            A screenshot ({imageIndex + 1} of {images.length})
          </p>
        </Dialog>
      </Main>
    </Random.Provider>
  );
};

export default Work;
