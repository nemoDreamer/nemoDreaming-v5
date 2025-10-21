const fetcher = async <T>(
  url: string,
  body: Record<string, unknown> | undefined,
): Promise<T> => {
  const res = await fetch(url, {
    method: "POST",
    body: body ? JSON.stringify(body) : undefined,
  });

  const data = await res.json();

  if (res.status !== 200) {
    throw new Error(data.message);
  }

  return data;
};

export default fetcher;

/*
import { FetcherResponse } from "swr/dist/types";

const fetcher = <T>(...args: [string, RequestInit?]): FetcherResponse<T> =>
  fetch(args[0], {
    method: "POST",
    body: args[1]?.body ? JSON.stringify(args[1].body) : undefined,
  }).then(async (res) => {
    const data: T = await res.json();

    if (res.status !== 200) {
      throw new Error((data as { message: string }).message);
    }

    return data;
  });

export default fetcher;
*/
