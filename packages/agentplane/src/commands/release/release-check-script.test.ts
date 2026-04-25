import { readFile } from "node:fs/promises";
import path from "node:path";

import { describe, expect, it } from "vitest";

describe("release-check script", () => {
  it("delegates to the package tarball policy assertion", async () => {
    const script = await readFile(path.resolve(process.cwd(), "scripts/release-check.mjs"), "utf8");
    expect(script).toContain("./check-package-tarball.mjs");
  });
});
