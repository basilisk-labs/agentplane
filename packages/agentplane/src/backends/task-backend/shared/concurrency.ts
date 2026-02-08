export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function mapLimit<T, R>(
  items: T[],
  limit: number,
  fn: (item: T, index: number) => Promise<R>,
): Promise<R[]> {
  const bounded = Math.max(1, Math.floor(limit));
  const out: R[] = [];
  out.length = items.length;
  let nextIndex = 0;

  const worker = async (): Promise<void> => {
    for (;;) {
      const i = nextIndex;
      nextIndex++;
      if (i >= items.length) return;
      out[i] = await fn(items[i], i);
    }
  };

  const workers = Array.from({ length: Math.min(bounded, items.length) }, () => worker());
  await Promise.all(workers);
  return out;
}
