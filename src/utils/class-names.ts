import seedrandom from "seedrandom";

// TailwindCSS rotations (spelled out to avoid culling in production builds)
const ROTATIONS = {
  default: [
    "rotate-1",
    "rotate-2",
    "rotate-3",
    // "rotate-6",
    "-rotate-1",
    "-rotate-2",
    "-rotate-3",
    // "-rotate-6",
  ],
  hover: [
    "hover:rotate-1", // group-hover:rotate-1
    "hover:rotate-2", // group-hover:rotate-2
    "hover:rotate-3", // group-hover:rotate-3
    // "hover:rotate-6", // group-hover:rotate-6
    "hover:-rotate-1", // group-hover:-rotate-1
    "hover:-rotate-2", // group-hover:-rotate-2
    "hover:-rotate-3", // group-hover:-rotate-3
    // "hover:-rotate-6", // group-hover:-rotate-6
  ],
} as const;

export function getRotationClassNames(seed: string) {
  // Seeded `getRandom` for consistent results between SSR and CSR:
  const rng = seedrandom(seed);
  const getRandom = (arr: readonly string[]) =>
    arr[Math.round(rng.quick() * (arr.length - 1))];

  const rotationClassNames = `${getRandom(ROTATIONS.default)} hover:rotate-0 group-hover:rotate-0`;

  return rotationClassNames;
}
