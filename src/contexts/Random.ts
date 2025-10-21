import { createContext, useContext } from "react";
import seedrandom from "seedrandom";

type SeedRandom = { quick: () => number };

const Random = createContext("seed");

const rngCache: {
  [key: string]: SeedRandom;
} = {};

export const useRandom = (): [SeedRandom, string] => {
  const seed = useContext(Random);

  let rng = rngCache[seed];
  if (!rng) {
    rng = rngCache[seed] = seedrandom(seed) as SeedRandom;
  }

  return [rng, seed];
};

export default Random;
