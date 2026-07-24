import { afterEach, describe, expect, it } from "vitest";

import { readObservedProcessIdentity } from "./signals.js";

const originalLang = process.env.LANG;
const originalLcAll = process.env.LC_ALL;

afterEach(() => {
  if (originalLang === undefined) delete process.env.LANG;
  else process.env.LANG = originalLang;
  if (originalLcAll === undefined) delete process.env.LC_ALL;
  else process.env.LC_ALL = originalLcAll;
});

describe("runner process identity", () => {
  it.skipIf(process.platform === "win32")(
    "uses a stable ps locale even when the caller locale is not parseable",
    async () => {
      process.env.LANG = "ru_RU.UTF-8";
      process.env.LC_ALL = "ru_RU.UTF-8";

      const observed = await readObservedProcessIdentity(process.pid);

      expect(observed?.pid).toBe(process.pid);
      expect(typeof observed?.command).toBe("string");
      expect(typeof observed?.started_at).toBe("string");
    },
  );
});
