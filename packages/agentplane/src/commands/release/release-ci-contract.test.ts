import { readFile } from "node:fs/promises";
import path from "node:path";

import { describe, expect, it } from "vitest";

import * as vitestSuiteModule from "../../../../../scripts/run-vitest-suite.mjs";

const { SUITES } = vitestSuiteModule as {
  SUITES: Record<string, { chunkSize?: number; files: string[] }>;
};

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
    expect(releaseCiCheck).toContain("bun run coverage:workflow-suite");
    expect(releaseCiCheck).toContain("bun run coverage:significant-suite");
    expect(releaseCiCheck).toContain("node scripts/run-vitest-suite.mjs release-ci-base");
    expect(releaseCiCheck.indexOf("bun run coverage:workflow-suite")).toBeGreaterThan(
      releaseCiCheck.indexOf("node scripts/run-vitest-suite.mjs release-ci-base"),
    );
    expect(releaseCiCheck.indexOf("bun run coverage:significant-suite")).toBeGreaterThan(
      releaseCiCheck.indexOf("bun run coverage:workflow-suite"),
    );

    expect(SUITES["release-ci-base"]?.chunkSize).toBe(40);
  });

  it("builds testkit before agentplane in release and hosted install routes", async () => {
    const rootPackageJsonText = await readRootText("package.json");
    const rootPackageJson = JSON.parse(rootPackageJsonText) as {
      scripts?: Record<string, string>;
    };
    const releaseCheck = rootPackageJson.scripts?.["release:check"] ?? "";

    expect(releaseCheck.indexOf("bun run --filter=agentplane build")).toBeGreaterThan(
      releaseCheck.indexOf("bun run --filter=@agentplaneorg/core build"),
    );
    expect(releaseCheck.indexOf("bun run --filter=@agentplane/testkit build")).toBeGreaterThan(
      releaseCheck.indexOf("bun run --filter=agentplane build"),
    );

    const [coreCi, prepublish, hostedClose, reinstall] = await Promise.all([
      readRootText(".github/workflows/ci.yml"),
      readRootText(".github/workflows/prepublish.yml"),
      readRootText(".github/workflows/task-hosted-close.yml"),
      readRootText("scripts/reinstall-global-agentplane.sh"),
    ]);

    for (const text of [coreCi, prepublish, hostedClose, reinstall]) {
      expect(text).toContain("bun run --filter=@agentplane/testkit build");
      expect(text.indexOf("bun run --filter=agentplane build")).toBeGreaterThan(
        text.indexOf("bun run --filter=@agentplaneorg/core build"),
      );
      expect(text.indexOf("bun run --filter=@agentplane/testkit build")).toBeGreaterThan(
        text.indexOf("bun run --filter=agentplane build"),
      );
    }
  });

  it("does not expose repo-private test helpers from the published agentplane package", async () => {
    const agentplanePackageJsonText = await readRootText("packages/agentplane/package.json");
    const agentplanePackageJson = JSON.parse(agentplanePackageJsonText) as {
      exports?: Record<string, unknown>;
    };

    expect(agentplanePackageJson.exports?.["./internal/testing"]).toBeUndefined();
  });

  it("keeps the publishable agentplane build independent from cached dist state", async () => {
    const agentplanePackageJsonText = await readRootText("packages/agentplane/package.json");
    const agentplanePackageJson = JSON.parse(agentplanePackageJsonText) as {
      scripts?: Record<string, string>;
    };

    expect(agentplanePackageJson.scripts?.build).toContain("npm run clean");
    expect(agentplanePackageJson.scripts?.build).toContain("tsc -b --force");
  });

  it("keeps repo-only CLI helper exclusions out of the publishable agentplane build", async () => {
    const agentplaneTsconfigText = await readRootText("packages/agentplane/tsconfig.json");
    const agentplaneTsconfig = JSON.parse(agentplaneTsconfigText) as {
      exclude?: string[];
    };

    expect(agentplaneTsconfig.exclude).toEqual(["src/**/*.test.ts"]);
  });

  it("checks the generated bootstrap doc against the actual runtime-source source path", async () => {
    const checkScript = await readRootText("scripts/check-agent-bootstrap-fresh.mjs");

    expect(checkScript).toContain('"runtime",\n  "shared",\n  "runtime-source.ts"');
    expect(checkScript).not.toContain('"dist",\n  "shared",\n  "runtime-source.js"');
  });

  it("documents the release prepublish coverage guards", async () => {
    const docsText = await readRootText("docs/developer/release-and-publishing.mdx");
    expect(docsText).toContain("workflow/harness coverage guard");
    expect(docsText).toContain("significant-file coverage guard");
  });
});
