import Segment from "./Segment";

// TODO: make variations? Bake into tailwind.config?
export const segmentConfigs = [
  /* root:     */ { fg: "#f1f7f7", bg: "#002d2b" },
  /* version:  */ { fg: "#002c02", bg: "#f3d6a6", font: "font-extralight" },
  /* user:     */ { fg: "#f9fcfb", bg: "#001918" },
  /* branch:   */ { fg: "#004f02", bg: "#ffdc00", font: "font-bold" },
  /* filePath: */ { fg: "#b1d2d1" /* bg: none */, font: "italic" },
];

export type PromptProps = {
  version?: string;
  user?: string;
  branch?: string;
  filePath?: string;
};

// const middleTruncate = (str: string, maxLength = 32) => {
//   if (str.length <= maxLength) return str;

//   const ellipsis = "...";
//   const lastSlashIndex = str.lastIndexOf("/");
//   const amountToKeep = maxLength - ellipsis.length;

//   const beforeSlash = str.substring(0, lastSlashIndex + 1);
//   const afterSlash = str.substring(lastSlashIndex + 1);

//   const index = Math.floor(amountToKeep / 2);

//   const truncatedAfterSlash = afterSlash.substring(0, index);
//   const endAfterSlash = afterSlash.substring(afterSlash.length - index);

//   return beforeSlash + truncatedAfterSlash + ellipsis + endAfterSlash;
// };

const Prompt: React.FC<PromptProps> = ({
  version = "v5.0.1",
  user = "philip.blyth",
  branch = "main",
  filePath = "index.tsx",
}) => {
  const segments = ["", version, user, branch, filePath];
  const length = segments.length;

  return (
    <div className="flex flex-row items-center justify-start">
      {segments.map((label, index) => {
        const { fg, bg, font } = segmentConfigs[index];

        return (
          <Segment
            className={font}
            key={`segment-${index}`}
            // label={index === 4 ? middleTruncate(label) : label}
            label={label}
            fg={fg}
            bg={bg}
            // placement:
            index={index}
            length={length}
          />
        );
      })}
    </div>
  );
};

export default Prompt;
