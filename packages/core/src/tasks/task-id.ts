import { randomInt } from "node:crypto";

export const TASK_ID_ALPHABET = "0123456789ABCDEFGHJKMNPQRSTVWXYZ";

export function timestampIdPrefix(date: Date): string {
  const yyyy = String(date.getUTCFullYear()).padStart(4, "0");
  const mm = String(date.getUTCMonth() + 1).padStart(2, "0");
  const dd = String(date.getUTCDate()).padStart(2, "0");
  const hh = String(date.getUTCHours()).padStart(2, "0");
  const min = String(date.getUTCMinutes()).padStart(2, "0");
  return `${yyyy}${mm}${dd}${hh}${min}`;
}

export function generateTaskId(opts: {
  length: number;
  attempts: number;
  isAvailable?: (taskId: string) => boolean | Promise<boolean>;
  date?: Date;
}): Promise<string> {
  const attempts = Math.max(1, opts.attempts);
  const length = opts.length;
  const isAvailable = opts.isAvailable ?? ((taskId: string) => Promise.resolve(taskId.length > 0));

  return (async () => {
    for (let i = 0; i < attempts; i += 1) {
      const now = opts.date ?? new Date();
      let suffix = "";
      for (let j = 0; j < length; j += 1) {
        suffix += TASK_ID_ALPHABET[randomInt(0, TASK_ID_ALPHABET.length)];
      }
      const taskId = `${timestampIdPrefix(now)}-${suffix}`;
      if (await isAvailable(taskId)) return taskId;
    }
    throw new Error("Failed to generate a unique task id (exhausted attempts)");
  })();
}
