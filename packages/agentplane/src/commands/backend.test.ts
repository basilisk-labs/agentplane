import { describe, expect, it } from "vitest";

import { cmdBackendSync, cmdSync } from "./backend.js";

describe("commands/backend", () => {
  it("rejects backend sync with missing args", async () => {
    await expect(
      cmdBackendSync({
        cwd: process.cwd(),
        args: [],
      }),
    ).rejects.toMatchObject({ code: "E_USAGE" });
  });

  it("rejects sync with duplicate backend ids", async () => {
    await expect(
      cmdSync({
        cwd: process.cwd(),
        args: ["local", "extra"],
      }),
    ).rejects.toMatchObject({ code: "E_USAGE" });
  });
});
