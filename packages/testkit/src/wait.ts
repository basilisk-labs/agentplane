export type WaitForConditionOptions<T> = {
  description: string;
  pollMs?: number;
  timeoutMs?: number;
  read: () => Promise<T>;
  predicate: (value: T) => boolean;
  onTimeout?: (lastValue: T | undefined) => Error;
};

export async function waitForCondition<T>(opts: WaitForConditionOptions<T>): Promise<T> {
  const timeoutMs = opts.timeoutMs ?? 5000;
  const pollMs = opts.pollMs ?? 100;
  const started = Date.now();
  let lastValue: T | undefined;

  while (Date.now() - started < timeoutMs) {
    const value = await opts.read();
    lastValue = value;
    if (opts.predicate(value)) return value;
    await new Promise((resolve) => setTimeout(resolve, pollMs));
  }

  if (opts.onTimeout) throw opts.onTimeout(lastValue);
  throw new Error(`Timed out waiting for ${opts.description}`);
}
