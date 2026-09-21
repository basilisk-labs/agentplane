import { access, readFile } from "node:fs/promises";
import { describe, expect, it } from "vitest";

describe("retired direct task outer supervisor", () => {
  it("verifies before evaluation through the canonical coordinator", async () => {
    await expect(access(new URL("direct-task-supervisor.ts", import.meta.url))).rejects.toThrow();

    const [advance, verification] = await Promise.all([
      readFile(new URL("advance-task-step.ts", import.meta.url), "utf8"),
      readFile(new URL("external-agent-verification.ts", import.meta.url), "utf8"),
    ]);

    expect(advance).toContain("runKernelFinalValidation");
    expect(advance).not.toContain("superviseDirectTaskRun");
    expect(verification).toContain("verifyDirectTask");
  });
});
