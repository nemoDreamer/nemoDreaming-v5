import type { Repository } from "../types";

export const stargazerCountDesc = (a: Repository, b: Repository): number =>
  b.stargazerCount - a.stargazerCount;
