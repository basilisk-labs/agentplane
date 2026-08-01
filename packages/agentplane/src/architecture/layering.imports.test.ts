import path from "node:path";
import { fileURLToPath } from "node:url";

import { describe, it } from "vitest";

import { checkLayering } from "../commands/doctor/layering.js";

describe("architecture layering guardrails", () => {
  const here = path.dirname(fileURLToPath(import.meta.url));
  const repoRoot = path.resolve(here, "..", "..", "..", "..");
  it("matches the doctor source-layering contract", async () => {
    const problems = await checkLayering(repoRoot);
    if (problems.length > 0) {
      throw new Error(problems.join("\n"));
    }
  });
});
