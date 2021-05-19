import { motion } from "framer-motion";
import Image from "next/image";
import * as React from "react";

import Container from "../Container";

import Prompt, { PromptProps } from "./Terminal/Prompt";

const baseFontSize = 16;

const toRem = (px: number) => px / baseFontSize;
const toPx = (rem: number) => rem * baseFontSize;

const logoHeight = Math.round(518 / (1666 / 640));
const headerHeight = {
  min: toPx(toRem(logoHeight) + 3 - /* negative top~ and bottom-margins: */ 6),
  max: toPx(toRem(logoHeight) + 3),
};

const transition = { type: "spring", bounce: 0, duration: 0.5 };

const Header: React.FC<{
  isHome: boolean;
  prompt?: PromptProps;
}> = ({ isHome, prompt }) => {
  const animate = {
    height: `${isHome ? headerHeight.max : headerHeight.min}px`,
  };

  return (
    <motion.header
      className="bg-teal-500 shadow-xl flex z-20"
      transition={transition}
      // NOTE: since we have a shared Layout that won't be replaced:
      // - used on initial document load only:
      initial={animate}
      // on re-renders:
      animate={animate}
    >
      <Container className="py-2 px-4">
        <div
          // NOTE: negative margins to not make the image's shaddow "count"
          className={"flex flex-1 items-center justify-center -mt-14 -mb-10"}
        >
          <Image
            src="/logo.png"
            width={640}
            height={199}
            className="flex items-center justify-center"
            priority
          />
        </div>
        <Prompt {...prompt} />
      </Container>
    </motion.header>
  );
};

export default Header;
