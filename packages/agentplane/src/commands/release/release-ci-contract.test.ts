import { readFile } from "node:fs/promises";
import path from "node:path";

import { describe, expect, it } from "vitest";

import * as vitestSuiteModule from "../../../../../scripts/run-vitest-suite.mjs";

const { SUITES, VITEST_CHUNK_TIMEOUT_MS } = vitestSuiteModule as {
  SUITES: Record<string, { chunkSize?: number; files: string[]; isolatedPatterns?: RegExp[] }>;
  VITEST_CHUNK_TIMEOUT_MS: number;
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

    const scripts = packageJson.scripts ?? {};
    const releaseCiCheck = scripts["release:ci-check"] ?? "";
    const releaseExtras = scripts["ci:release-extras"] ?? "";
    const releaseCheck = scripts["release:check"] ?? "";

    expect(scripts.ci).toBe("bun run ci:contract && bun run ci:test");
    expect(scripts["ci:local:smoke"]).toBe("node scripts/checks/run-local-ci.mjs --mode smoke");
    expect(scripts["ci:local:touch"]).toBe("node scripts/checks/run-local-ci.mjs --mode smoke");
    expect(scripts["ci:local:explain"]).toBe(
      "node scripts/checks/run-local-ci.mjs --mode smoke --explain",
    );
    expect(scripts["test:critical"]).toBe("node scripts/checks/run-vitest-suite.mjs critical-cli");
    expect(scripts["bench:cli:cold:check"]).toContain("--attempts 3");
    expect(releaseCiCheck).toBe("bun run ci:contract && bun run ci:release-extras");
    expect(releaseCheck).toContain("bun run release:incidents:check");
    expect(releaseCheck.indexOf("bun run release:incidents:check")).toBeLessThan(
      releaseCheck.indexOf("bun run release:acr-example:check"),
    );
    expect(scripts["ci:contract"]).toContain("bun run release:parity");
    expect(scripts["release:incidents:check"]).toBe("node scripts/check-release-incidents.mjs");
    expect(scripts["release:tasks:check"]).toBe(
      "node scripts/release/check-task-registry-ready.mjs",
    );
    expect(scripts["ci:test"]).toContain("bun run typecheck");
    expect(releaseExtras).toContain("bun run coverage:workflow-suite");
    expect(releaseExtras).toContain("bun run coverage:significant-suite");
    expect(releaseExtras).toContain("node scripts/checks/run-vitest-suite.mjs release-ci-base");
    expect(releaseExtras.indexOf("bun run coverage:workflow-suite")).toBeGreaterThan(
      releaseExtras.indexOf("node scripts/checks/run-vitest-suite.mjs release-ci-base"),
    );
    expect(releaseExtras.indexOf("bun run coverage:significant-suite")).toBeGreaterThan(
      releaseExtras.indexOf("bun run coverage:workflow-suite"),
    );

    expect(SUITES["release-ci-base"]?.chunkSize).toBe(10);
    expect(SUITES["critical-cli"]?.chunkSize).toBe(1);
    expect(SUITES["critical-cli"]?.files).toContain(
      "packages/agentplane/src/cli/run-cli.critical.exit-codes.test.ts",
    );
    expect(
      SUITES["release-ci-base"]?.isolatedPatterns?.some((pattern) =>
        pattern.test("packages/agentplane/src/cli/run-cli.core.pr-flow.pr-open.test.ts"),
      ),
    ).toBe(true);
    expect(VITEST_CHUNK_TIMEOUT_MS).toBe(10 * 60 * 1000);
  });

  it("builds testkit after agentplane in release and hosted install routes", async () => {
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

    const [coreCi, prepublish, hostedClose] = await Promise.all([
      readRootText(".github/workflows/ci.yml"),
      readRootText(".github/workflows/prepublish.yml"),
      readRootText(".github/workflows/task-hosted-close.yml"),
    ]);

    for (const text of [coreCi, prepublish, hostedClose]) {
      expect(text).toContain("bun run --filter=@agentplane/testkit build");
      expect(text.indexOf("bun run --filter=agentplane build")).toBeGreaterThan(
        text.indexOf("bun run --filter=@agentplaneorg/core build"),
      );
      expect(text.indexOf("bun run --filter=@agentplane/testkit build")).toBeGreaterThan(
        text.indexOf("bun run --filter=agentplane build"),
      );
    }
  });

  it("keeps the developer reinstall helper on the minimal runtime build path", async () => {
    const wrapper = await readRootText("scripts/reinstall-global-agentplane.sh");
    const reinstall = await readRootText("scripts/workflow/reinstall-global-agentplane.sh");

    expect(wrapper).toContain("workflow/reinstall-global-agentplane.sh");
    expect(reinstall).toContain("bun run --filter=@agentplaneorg/core build");
    expect(reinstall).toContain("bun run --filter=agentplane build:bundle");
    expect(reinstall).toContain("npm link");
    expect(reinstall).not.toContain("bun run --filter=@agentplane/testkit build");
    expect(reinstall).not.toContain("npm install -g ./packages");
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
    const wrapper = await readRootText("scripts/check-agent-bootstrap-fresh.mjs");
    const checkScript = await readRootText("scripts/checks/check-agent-bootstrap-fresh.mjs");

    expect(wrapper).toContain("./checks/check-agent-bootstrap-fresh.mjs");
    expect(checkScript).toContain('"runtime",\n  "shared",\n  "runtime-source.ts"');
    expect(checkScript).not.toContain('"dist",\n  "shared",\n  "runtime-source.js"');
  });

  it("documents the release prepublish coverage guards", async () => {
    const docsText = await readRootText("docs/developer/release-and-publishing.mdx");
    expect(docsText).toContain("workflow/harness coverage guard");
    expect(docsText).toContain("significant-file coverage guard");
    expect(docsText).toContain("release incident registry cleanup gate");
  });

  it("keeps candidate preparation gated on task registry reconciliation before incidents", async () => {
    const candidatePrepare = await readRootText("scripts/release/candidate-prepare.mjs");

    expect(candidatePrepare).toContain('["bun", ["run", "release:tasks:check"]]');
    expect(candidatePrepare.indexOf("release:tasks:check")).toBeLessThan(
      candidatePrepare.indexOf("release:incidents:check"),
    );
  });
});
