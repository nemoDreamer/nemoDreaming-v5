import classNames from "classnames";
import { GetStaticPaths, GetStaticProps } from "next";
import * as React from "react";

import ArrowLink from "../../components/ArrowLink";
import Dialog, { useDialog } from "../../components/Dialog";
import Image from "../../components/Image";
import Main from "../../components/Layout/Main";
import Separator from "../../components/Separator";
import Thumbnail from "../../components/Thumbnail";
import Random from "../../contexts/Random";
import { PostData, getAllPostSlugs, getPost } from "../../lib/posts";
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

// FIXME: type T = keyof React.HTMLAttributes<HTMLDivElement>
const CAROUSEL_NAV_CLASSES =
  "opacity-0 hover:opacity-100 transition-opacity duration-300 from-black/25 via-35% via-black/10 to-transparent w-1/4 absolute top-0 bottom-0 grid place-items-center cursor-pointer select-none";

const Work: React.FC<{
  workPost: PostData;
}> = ({
  workPost: {
    title,
    date,
    contentHtml,
    category,
    technologies,
    folder,
    images,
  },
}) => {
  const {
    refs,
    context,
    isOpen,
    setIsOpen,
    // getReferenceProps,
    getFloatingProps,
    headingId,
    descriptionId,
  } = useDialog();

  const [imageIndex, setImageIndex] = React.useState(0);

  const makeThumbnailClickHandler = React.useCallback(
    (index: number) => () => {
      setImageIndex(index);
      setIsOpen(true);
    },
    [setIsOpen, setImageIndex],
  );

  const prevImage = React.useCallback(() => {
    setImageIndex((imageIndex + images.length - 1) % images.length);
  }, [imageIndex, images.length]);

  const nextImage = React.useCallback(() => {
    setImageIndex((imageIndex + 1) % images.length);
  }, [imageIndex, images.length]);

  return (
    <Random.Provider value={/* seed: */ `${title}|${date}`}>
      <Main subHeader={subHeader}>
        <h1>{title}</h1>
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
              <div className="content">
                <Thumbnail
                  alt="Main Preview Image"
                  image={images[0]}
                  folder={folder}
                  shouldFill
                  disableRotate
                  onClick={makeThumbnailClickHandler(0)}
                />
              </div>
            </div>
          </div>
          <div
            className="mb-4 mx-3 xs:mx-0 xs:mb-0 xs:col-span-2 md:col-span-5"
            dangerouslySetInnerHTML={{ __html: contentHtml }}
          />
        </div>

        <div className="mb-4 grid grid-flow-row grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4 justify-center place-items-center">
          {images.slice(1).map((image, index) => (
            <div className="square" key={`image-${image}`}>
              <div className="content">
                <Thumbnail
                  alt={`Preview Thumbnail #${index + 1}`}
                  image={image}
                  folder={folder}
                  shouldFill
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
          isOpen={isOpen}
          getFloatingProps={getFloatingProps}
          headingId={headingId}
          descriptionId={descriptionId}
        >
          <div className="relative">
            <Image
              id={headingId}
              alt={`Preview #${imageIndex + 1}`}
              image={images[imageIndex]}
              folder={folder}
              width={640}
              height={480}
              className="transition-[height]"
              style={{
                objectFit: "contain",
              }}
            />
            <div
              className={classNames(
                CAROUSEL_NAV_CLASSES,
                "left-0 bg-gradient-to-r",
              )}
              onClick={prevImage}
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
              onClick={nextImage}
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
