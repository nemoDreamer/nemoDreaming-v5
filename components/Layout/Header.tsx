import { motion } from "framer-motion";
import Image from "next/image";
import * as React from "react";

import Container from "../Container";

import Menu from "./Menu";
import Prompt, { PromptProps } from "./Terminal/Prompt";

const baseFontSize = 16;

const toRem = (px: number) => px / baseFontSize;
const toPx = (rem: number) => rem * baseFontSize;

const logoHeight = Math.round(518 / (1666 / 640));
const extraLines = 4.5;
const negativeMargins = 6;
const headerHeight = {
  min: toPx(toRem(logoHeight) + extraLines - negativeMargins),
  max: toPx(toRem(logoHeight) + extraLines),
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
      className="bg-teal-500 shadow-xl flex z-20 print:hidden"
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
          className={
            "flex flex-1 items-center justify-center -mt-14 -mb-10 z-0"
          }
        >
          {/* TODO: make b&w logo for print styles */}
          <Image
            alt="nemoDreaming Logo"
            src="/logo.png"
            width={640}
            height={199}
            className="flex items-center justify-center"
            priority
          />
        </div>
        <div className="z-10">
          <Menu />
          <Prompt {...prompt} />
        </div>
      </Container>
    </motion.header>
  );
};

export default Header;
