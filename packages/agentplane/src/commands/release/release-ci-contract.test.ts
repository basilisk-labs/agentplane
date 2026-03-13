import { readFile } from "node:fs/promises";
import path from "node:path";

import { describe, expect, it } from "vitest";

async function readRootText(relativePath: string): Promise<string> {
  return readFile(path.join(process.cwd(), relativePath), "utf8");
}

describe("release CI contract", () => {
  it("keeps release:ci-check aligned with release-relevant coverage guards", async () => {
    const packageJsonText = await readRootText("package.json");
    const packageJson = JSON.parse(packageJsonText) as {
      scripts?: Record<string, string>;
    };

    const releaseCiCheck = packageJson.scripts?.["release:ci-check"] ?? "";
    expect(releaseCiCheck).toContain("bun run test:workflow-coverage");
    expect(releaseCiCheck).toContain("bun run test:significant-coverage");
    expect(releaseCiCheck.indexOf("bun run test:workflow-coverage")).toBeGreaterThan(
      releaseCiCheck.indexOf("bun run test:release:ci-base"),
    );
    expect(releaseCiCheck.indexOf("bun run test:significant-coverage")).toBeGreaterThan(
      releaseCiCheck.indexOf("bun run test:workflow-coverage"),
    );
  });

  it("documents the release prepublish coverage guards", async () => {
    const docsText = await readRootText("docs/developer/release-and-publishing.mdx");
    expect(docsText).toContain("workflow/harness coverage guard");
    expect(docsText).toContain("significant-file coverage guard");
  });
});
