const fetcher = async <T>(
  url: string,
  body: Record<string, unknown> | undefined
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
