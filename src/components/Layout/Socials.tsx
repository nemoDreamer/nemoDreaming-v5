import classNames from "classnames";
import Image from "next/image";
import Link from "next/link";

import Separator from "../elements/Separator";

export default function Socials({
  className,
  ...props
}: React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>) {
  return (
    <div
      className={classNames(
        "font-mono text-2xs flex flex-row gap-2",
        className,
      )}
      {...props}
    >
      <Link href="https://nemodreamer.itch.io" target="_blank">
        <Image
          className="inline"
          src="/logos/logo-itchio.svg"
          alt="itch.io logo"
          width={12}
          height={12}
        />{" "}
        itch.io
      </Link>
      <Separator />
      <Link
        href="https://bsky.app/profile/nemodreamer.bsky.social"
        target="_blank"
      >
        <Image
          className="inline"
          src="/logos/logo-bluesky.svg"
          alt="bluesky logo"
          width={12}
          height={12}
        />{" "}
        bluesky
      </Link>
    </div>
  );
}
