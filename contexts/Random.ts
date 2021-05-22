import React, { useContext } from "react";
import seedrandom from "seedrandom";

const Random = React.createContext("seed");

const rngCache: {
  [key: string]: ReturnType<seedrandom>;
} = {};

export const useRandom = (): [ReturnType<seedrandom>, string] => {
  const seed = useContext(Random);

  let rng = rngCache[seed];
  if (!rng) {
    rng = rngCache[seed] = seedrandom(seed);
  }

  return [rng, seed];
};

export default Random;
