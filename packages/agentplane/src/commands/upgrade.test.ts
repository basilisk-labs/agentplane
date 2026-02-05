import { describe, expect, it } from "vitest";

import { cmdUpgrade } from "./upgrade.js";

describe("commands/upgrade", () => {
  it("rejects unknown upgrade flags", async () => {
    await expect(
      cmdUpgrade({
        cwd: process.cwd(),
        args: ["--nope"],
      }),
    ).rejects.toMatchObject({ code: "E_USAGE" });
  });

  it("rejects bundle without checksum", async () => {
    await expect(
      cmdUpgrade({
        cwd: process.cwd(),
        args: ["--bundle", "bundle.tar.gz"],
      }),
    ).rejects.toMatchObject({ code: "E_USAGE" });
  });

  it("rejects checksum without bundle", async () => {
    await expect(
      cmdUpgrade({
        cwd: process.cwd(),
        args: ["--checksum", "bundle.tar.gz.sha256"],
      }),
    ).rejects.toMatchObject({ code: "E_USAGE" });
  });

  it("rejects missing value for --source", async () => {
    await expect(
      cmdUpgrade({
        cwd: process.cwd(),
        args: ["--source"],
      }),
    ).rejects.toMatchObject({ code: "E_USAGE" });
  });

  it("rejects non-flag upgrade args", async () => {
    await expect(
      cmdUpgrade({
        cwd: process.cwd(),
        args: ["oops"],
      }),
    ).rejects.toMatchObject({ code: "E_USAGE" });
  });
});
