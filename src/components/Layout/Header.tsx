"use client";

import classNames from "classnames";
import * as motion from "motion/react-m";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

import Container from "./Container";
import Menu from "./Menu";
import Socials from "./Socials";
import { getColorsForPath } from "./menu-items";

const baseFontSize = 16;

const toRem = (px: number) => px / baseFontSize;
const toPx = (rem: number) => rem * baseFontSize;

const TRANSITION = {
  type: "spring" as const,
  bounce: 0,
  duration: 0.5,
};

const LOGOS = [
  {
    src: "/header.png",
    className: "print:hidden",
    priority: true,
    width: 1748,
    height: 348,
  },
  {
    src: "/header-bnw.png",
    className: "hidden print:block",
    priority: false,
  },
] as const;

/** Scaled logo width */
const LOGO_WIDTH = 550;
/** Adjusted logo height based on scaled width, maintaining aspect ratio */
const LOGO_HEIGHT = Math.round(LOGOS[0].height / (LOGOS[0].width / LOGO_WIDTH));

const extraLines = 11; // <- extra space for text lines in rem
const negativeMargins = 4 + 2.5; // <- sum of negative top and bottom margins in rem

const HEADER_HEIGHT = {
  min: toPx(toRem(LOGO_HEIGHT) + extraLines - negativeMargins),
  max: toPx(toRem(LOGO_HEIGHT) + extraLines),
};

const Header: React.FC<{
  prompt?: ReactNode;
}> = ({ prompt }) => {
  const pathName = usePathname();
  const isExpanded = pathName === "/";

  const animate = {
    height: `${isExpanded ? HEADER_HEIGHT.max : HEADER_HEIGHT.min}px`,
  };

  const colorClassNames = getColorsForPath(pathName);

  return (
    <motion.header
      id="header"
      className={classNames(
        colorClassNames.bg,
        "transition-colors duration-500 shadow-xl cursor-default flex z-20 print:bg-transparent print:shadow-none",
      )}
      transition={TRANSITION}
      // - used on initial document load only:
      initial={animate}
      // on re-renders:
      animate={animate}
    >
      <Container className="py-2 px-4">
        <div
          // NOTE: negative margins to not make the image's shadow "count"
          className={
            "flex flex-1 items-center justify-center -mt-16 -mb-10 z-0"
          }
        >
          <Link href="/">
            {LOGOS.map(({ src, className, priority }) => (
              <Image
                key={src}
                src={src}
                className={className}
                alt="nemoDreaming Logo"
                width={LOGO_WIDTH}
                height={LOGO_HEIGHT}
                priority={!!priority}
              />
            ))}
          </Link>
        </div>
        <div className="z-10 print:hidden">
          <div
            className={classNames(
              "flex flex-col justify-end items-start xs:flex-row xs:justify-between xs:items-baseline gap-4",
              colorClassNames.fg,
            )}
          >
            <Menu />
            <Socials className="-order-1 self-end xs:order-1 xs:self-start xs:-mt-1 sm:self-baseline sm:mt-0" />
          </div>
          {prompt}
        </div>
      </Container>
    </motion.header>
  );
};

export default Header;
