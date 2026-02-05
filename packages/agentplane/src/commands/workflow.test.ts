import { describe, expect, it } from "vitest";

import { cmdTaskAdd, cmdTaskNew } from "./workflow.js";

describe("commands/workflow", () => {
  it("rejects task new with missing flags", async () => {
    await expect(
      cmdTaskNew({
        cwd: process.cwd(),
        args: [],
      }),
    ).rejects.toMatchObject({ code: "E_USAGE" });
  });

  it("rejects task add with missing flags", async () => {
    await expect(
      cmdTaskAdd({
        cwd: process.cwd(),
        args: [],
      }),
    ).rejects.toMatchObject({ code: "E_USAGE" });
  });
});
