import { spawnSync } from "node:child_process";
import { mkdtemp, readFile, rm } from "node:fs/promises";
import os from "node:os";
import path from "node:path";

import { describe, expect, it } from "vitest";

import * as vitestSuiteModule from "../../../../../scripts/run-vitest-suite.mjs";

const { SUITES, VITEST_CHUNK_TIMEOUT_MS, resolveVitestChunkTimeoutMs } = vitestSuiteModule as {
  SUITES: Record<string, { chunkSize?: number; files: string[]; isolatedPatterns?: RegExp[] }>;
  VITEST_CHUNK_TIMEOUT_MS: number;
  resolveVitestChunkTimeoutMs: (raw?: string) => number;
};

it("bounds the optional slow-host chunk timeout without changing the default", () => {
  expect(resolveVitestChunkTimeoutMs()).toBe(600_000);
  expect(resolveVitestChunkTimeoutMs("")).toBe(600_000);
  expect(resolveVitestChunkTimeoutMs("1800000")).toBe(1_800_000);
  expect(resolveVitestChunkTimeoutMs("3600000")).toBe(3_600_000);
  for (const raw of ["0", "-1", "599999", "3600001", "600000.5", "Infinity", "oops"]) {
    expect(() => resolveVitestChunkTimeoutMs(raw)).toThrow("AGENTPLANE_VITEST_CHUNK_TIMEOUT_MS");
  }
});

async function readRootText(relativePath: string): Promise<string> {
  return readFile(path.join(process.cwd(), relativePath), "utf8");
}

async function runCandidatePrepare(args: string[], planOutput?: string) {
  const root = await mkdtemp(path.join(os.tmpdir(), "candidate-prepare-contract-"));
  const script = path.join(process.cwd(), "scripts/release/candidate-prepare.mjs");
  const plan =
    planOutput ??
    JSON.stringify({
      prevVersion: "0.7.12-beta.1",
      nextVersion: "0.7.12",
      nextTag: "v0.7.12",
      bump: "patch",
    });
  try {
    const result = spawnSync(
      process.execPath,
      [
        "--input-type=module",
        "--eval",
        `
      import cp from "node:child_process";
      import fs from "node:fs";
      import path from "node:path";
      import { syncBuiltinESMExports } from "node:module";
      import { pathToFileURL } from "node:url";
      const calls = [];
      let version = "0.7.12-beta.1";
      cp.execFileSync = (cmd, argv) => {
        calls.push([cmd, argv]);
        if (cmd === "ap" && argv[1] === "plan") {
          const dir = path.join(process.cwd(), ".agentplane/.release/plan/2026-09-28-test");
          fs.mkdirSync(dir, { recursive: true });
          fs.writeFileSync(path.join(dir, "version.json"), ${JSON.stringify(plan)});
        }
        if (argv.includes("release:version:bump")) version = "0.7.12";
        if (cmd === "ap" && argv[1] === "candidate" && version !== "0.7.12-beta.1") {
          throw new Error("Current version does not match the release-plan baseline");
        }
        return "";
      };
      syncBuiltinESMExports();
      process.argv = [process.execPath, ${JSON.stringify(script)}, ...${JSON.stringify(args)}];
      try { await import(pathToFileURL(${JSON.stringify(script)}).href); }
      finally { fs.writeFileSync("calls.json", JSON.stringify(calls)); }
    `,
      ],
      { cwd: root, encoding: "utf8", timeout: 20_000 },
    );
    return {
      ...result,
      calls: JSON.parse(await readFile(path.join(root, "calls.json"), "utf8")) as [
        string,
        string[],
      ][],
    };
  } finally {
    await rm(root, { recursive: true, force: true });
  }
}

describe("release CI contract", () => {
  it("preserves the original version baseline until native candidate preparation", async () => {
    const result = await runCandidatePrepare(["--write", "--version", "0.7.12"]);
    expect(result.stderr).toBe("");
    expect(result.status).toBe(0);
    expect(result.calls.map(([cmd, args]) => [cmd, ...args.slice(0, 2)])).toEqual([
      ["bun", "run", "release:state"],
      ["bun", "run", "release:tasks:check"],
      ["bun", "run", "release:incidents:check"],
      ["ap", "release", "plan"],
      ["bun", "run", "release:check:registry"],
      ["bun", "run", "release:prepublish:fast"],
      ["ap", "release", "candidate"],
    ]);
    expect(result.calls[4]?.[1]).toEqual([
      "run",
      "release:check:registry",
      "--",
      "--version",
      "0.7.12",
    ]);
    expect(result.calls.at(-1)?.[1]).toEqual([
      "release",
      "candidate",
      "--plan",
      path.join(".agentplane", ".release", "plan", "2026-09-28-test"),
    ]);
  });

  it("checks the planned version in the registry when no explicit version is supplied", async () => {
    const result = await runCandidatePrepare(["--write", "--push", "--yes"]);
    expect(result.status).toBe(0);
    expect(result.calls[4]?.[1]).toContain("0.7.12");
    expect(result.calls.at(-1)?.[1]).toEqual(expect.arrayContaining(["--push", "--yes"]));
  });

  it("rejects a requested version that differs from the native plan before candidate mutation", async () => {
    const result = await runCandidatePrepare(["--write", "--version", "0.7.13"]);
    expect(result.status).toBe(1);
    expect(result.stderr).toContain("does not match planned version");
    expect(result.calls.some(([, args]) => args.includes("candidate"))).toBe(false);
  });

  it.each([
    "not json",
    "null",
    JSON.stringify({ nextVersion: 12 }),
    JSON.stringify({
      prevVersion: "0.7.12-beta.1",
      nextVersion: "0.7.12",
      nextTag: "v0.7.13",
      bump: "patch",
    }),
  ])("rejects malformed native planning evidence: %s", async (plan) => {
    const result = await runCandidatePrepare(["--write"], plan);
    expect(result.status).toBe(1);
    expect(result.calls.some(([, args]) => args.includes("candidate"))).toBe(false);
  });

  it.each([
    ["--write", "--push"],
    ["--write", "--bump", "invalid"],
    ["--write", "--bump", "minor"],
  ])("rejects invalid or unapproved invocation %j before running any command", async (...args) => {
    const result = await runCandidatePrepare(args);
    expect(result.status).toBe(1);
    expect(result.calls).toEqual([]);
  });

  it.each([[], ["--json"], ["--write", "--json"]])(
    "keeps inspection read-only %j",
    async (...args) => {
      const result = await runCandidatePrepare(args);
      expect(result.status).toBe(0);
      expect(result.calls).toEqual([]);
      expect(result.stdout).not.toContain("release:version:bump");
    },
  );

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
    expect(scripts["test:agent-efficiency:qualification"]).toBe(
      "node scripts/checks/run-vitest-suite.mjs agent-efficiency-qualification",
    );
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
    expect(SUITES["critical-cli"]?.chunkSize).toBe(2);
    expect(SUITES["critical-cli"]?.files).toContain(
      "packages/agentplane/src/cli/run-cli.critical.exit-codes.test.ts",
    );
    expect(SUITES["critical-cli"]?.files).not.toContainEqual(
      expect.stringContaining("run-cli.critical.agent-efficiency"),
    );
    expect(SUITES["agent-efficiency-qualification"]?.chunkSize).toBe(1);
    expect(SUITES["agent-efficiency-qualification"]?.files).toHaveLength(5);
    expect(SUITES["agent-efficiency-qualification"]?.files).toEqual(
      expect.arrayContaining([
        "packages/agentplane/src/cli/run-cli.critical.agent-efficiency-baseline.test.ts",
        "packages/agentplane/src/cli/run-cli.critical.agent-efficiency-candidate.test.ts",
        "packages/agentplane/src/cli/run-cli.critical.agent-efficiency-replay-driver.test.ts",
        "packages/agentplane/src/cli/run-cli.critical.agent-efficiency-replay-hardening.test.ts",
        "packages/agentplane/src/cli/run-cli.critical.agent-efficiency-replay.test.ts",
      ]),
    );
    expect(
      SUITES["release-ci-base"]?.isolatedPatterns?.some((pattern) =>
        pattern.test("packages/agentplane/src/cli/run-cli.core.pr-flow.pr-open.test.ts"),
      ),
    ).toBe(true);
    expect(
      SUITES["release-ci-base"]?.isolatedPatterns?.some((pattern) =>
        pattern.test("packages/agentplane/src/cli/run-cli.core.intake.test.ts"),
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

  it("does not require recipes submodule inventory checks for docs-only fast CI", async () => {
    const localCi = await readRootText("scripts/checks/run-local-ci.mjs");

    expect(localCi).toContain(
      "createBaselineStepEntries({ includeBuild: false, includeRecipesInventory: false })",
    );
    expect(localCi).toContain("includeRecipesInventory = true");
    expect(localCi.indexOf('"Build"')).toBeLessThan(
      localCi.indexOf('"CLI cold-start baseline (check)"'),
    );
  });

  it("bounds local CI Vitest subprocesses with an operator-tunable suite timeout", async () => {
    const localCi = await readRootText("scripts/checks/run-local-ci.mjs");
    const localCiGroup = await readRootText("scripts/checks/run-local-ci-group.mjs");

    expect(localCi).toContain("AGENTPLANE_LOCAL_VITEST_SUITE_TIMEOUT_MS");
    expect(localCi).toContain("DEFAULT_LOCAL_VITEST_SUITE_TIMEOUT_MS = 15 * 60 * 1000");
    expect(localCi).toContain("timeout: options.timeoutMs");
    expect(localCi).toContain('timeoutLabel: "Vitest suite"');
    expect(localCi).toContain('args: ["scripts/checks/run-local-ci-group.mjs", id]');
    expect(localCi).toContain("switch (executionPlan.route)");
    expect(localCi).toContain('case "full-fast":');
    expect(localCiGroup).toContain(
      '"packages/agentplane/src/commands/evaluator/evaluator-execute.command.test.ts"',
    );
    expect(localCiGroup).toContain(
      '"packages/agentplane/src/runner/usecases/task-run-active-claim-concurrency.test.ts"',
    );
    expect(localCiGroup).toContain('"--maxWorkers",\n      "1"');
    expect(localCi.indexOf("timeout: options.timeoutMs")).toBeLessThan(
      localCi.indexOf("Set AGENTPLANE_LOCAL_VITEST_SUITE_TIMEOUT_MS"),
    );
  });

  it("keeps the developer reinstall helper on the minimal runtime build path", async () => {
    const wrapper = await readRootText("scripts/reinstall-global-agentplane.sh");
    const reinstall = await readRootText("scripts/workflow/reinstall-global-agentplane.sh");

    expect(wrapper).toContain("workflow/reinstall-global-agentplane.sh");
    expect(reinstall).toContain("bun run --filter=@agentplaneorg/core build");
    expect(reinstall).toContain("bun run --filter=@agentplaneorg/recipes build");
    expect(reinstall).toContain("bun run --filter=agentplane build:bundle");
    expect(reinstall).toContain("npm pack ./packages/core");
    expect(reinstall).toContain("npm pack ./packages/recipes");
    expect(reinstall).toContain("npm pack ./packages/agentplane");
    expect(reinstall).toContain("npm install --global");
    expect(reinstall).toContain("AGENTPLANE_USE_GLOBAL_IN_FRAMEWORK=1 agentplane --version");
    expect(reinstall).not.toContain("npm link");
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
    expect(agentplanePackageJson.scripts?.build).toContain(
      "node ../../scripts/checks/run-typescript-build.mjs --force",
    );
  });

  it("keeps test modules and test helpers out of the publishable agentplane build", async () => {
    const agentplaneTsconfigText = await readRootText("packages/agentplane/tsconfig.json");
    const agentplaneTsconfig = JSON.parse(agentplaneTsconfigText) as {
      exclude?: string[];
    };

    expect(agentplaneTsconfig.exclude).toEqual(["src/**/*.test.ts", "src/**/*.testkit.ts"]);
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
