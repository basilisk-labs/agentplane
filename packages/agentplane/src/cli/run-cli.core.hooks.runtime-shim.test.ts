/* eslint-disable @typescript-eslint/no-unused-vars */
import { execFile, execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";
import {
  chmod,
  mkdir,
  mkdtemp,
  readdir,
  readFile,
  realpath,
  rm,
  writeFile,
} from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { promisify } from "node:util";
import { describe, expect, it, vi } from "vitest";
import {
  HOOKS_SUITE_TIMEOUT_MS,
  TEST_WORKFLOW_GITIGNORE,
  markTaskDoneWithCommit,
  withInstalledAgentplaneRuntime,
} from "@agentplane/testkit/hooks";
import { defaultConfig, extractTaskSuffix, type ResolvedProject } from "./core-imports.js";
import { readTask, renderTaskReadme } from "@agentplaneorg/core/tasks";

import { runCli } from "./run-cli.js";
import {
  filterAgentsByWorkflow,
  loadAgentTemplates,
  loadAgentsTemplate,
} from "../agents/agents-template.js";
import type * as taskBackend from "../backends/task-backend.js";
import {
  captureStdIO,
  cleanGitEnv,
  commitAll,
  configureGitUser,
  createUpgradeBundle,
  getAgentplaneHome,
  gitBranchExists,
  installRunCliIntegrationHarness,
  runCliSilent,
  mkGitRepoRoot,
  mkGitRepoRootWithBranch,
  pathExists,
  stageGitignoreIfPresent,
  stubTaskBackend,
  writeConfig,
  writeDefaultConfig,
} from "@agentplane/testkit";
import { resolveUpdateCheckCachePath } from "./update-check.js";
import { resolvePrePushHookScriptPath } from "../commands/hooks/index.js";
import * as prompts from "./prompts.js";

installRunCliIntegrationHarness();

const PRE_PUSH_HOOK_SCRIPT = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "../../../../scripts/run-pre-push-hook.mjs",
);

describe("runCli hooks runtime shim", { timeout: HOOKS_SUITE_TIMEOUT_MS }, () => {
  it("hooks run pre-push resolves the repository-local script before bundled fallbacks", async () => {
    const root = await mkGitRepoRoot();
    await mkdir(path.join(root, "scripts"), { recursive: true });
    const repoScript = path.join(root, "scripts", "run-pre-push-hook.mjs");
    await writeFile(repoScript, "process.exit(0);\n", "utf8");

    await expect(resolvePrePushHookScriptPath(root)).resolves.toBe(repoScript);
  });

  it("hooks run pre-push treats missing global-install fallbacks as unresolved", async () => {
    const root = await mkGitRepoRoot();
    const missingGlobalFallback = path.join(
      root,
      "simulated-global-prefix",
      "lib",
      "scripts",
      "run-pre-push-hook.mjs",
    );

    await expect(
      resolvePrePushHookScriptPath(root, { bundledScriptPath: missingGlobalFallback }),
    ).resolves.toBeNull();
  });

  it("hooks run pre-push uses installed CLI fallback when repository script is absent", async () => {
    await withInstalledAgentplaneRuntime(async () => {
      const root = await mkGitRepoRoot();
      await writeDefaultConfig(root);
      await writeFile(
        path.join(root, "package.json"),
        JSON.stringify(
          {
            name: "installed-hook-fallback",
            private: true,
            scripts: {
              "format:check": "node scripts/format-check.mjs",
              "ci:local:fast": "node scripts/ci-fast.mjs",
              "ci:local:full": "node scripts/ci-fast.mjs",
            },
          },
          null,
          2,
        ),
        "utf8",
      );
      await mkdir(path.join(root, "scripts"), { recursive: true });
      await writeFile(path.join(root, "scripts", "format-check.mjs"), "process.exit(0);\n", "utf8");
      await writeFile(
        path.join(root, "scripts", "ci-fast.mjs"),
        "import { writeFileSync } from 'node:fs';\nwriteFileSync('.agentplane/cache/pre-push-fallback.marker', 'ok\\n');\n",
        "utf8",
      );
      await mkdir(path.join(root, ".agentplane", "cache"), { recursive: true });

      const io = captureStdIO();
      try {
        const code = await runCli(["hooks", "run", "pre-push", "--root", root]);
        expect(code).toBe(0);
        expect(io.stderr).not.toContain("Missing pre-push hook script");
        await expect(
          pathExists(path.join(root, ".agentplane/cache/pre-push-fallback.marker")),
        ).resolves.toBe(true);
      } finally {
        io.restore();
      }
    });
  });

  it("hooks run pre-push skips missing project scripts in clean initialized repositories", async () => {
    await withInstalledAgentplaneRuntime(async () => {
      const root = await mkGitRepoRoot();
      await writeDefaultConfig(root);

      const io = captureStdIO();
      try {
        const code = await runCli(["hooks", "run", "pre-push", "--root", root]);
        expect(code).toBe(0);
        expect(io.stdout).toContain("Running pre-push checks in standard mode.");
        expect(io.stdout).toContain("Skipping format:check: package.json script is not defined.");
        expect(io.stdout).toContain("Skipping ci:local:fast: package.json script is not defined.");
        expect(io.stderr).not.toContain("Missing pre-push hook script");
      } finally {
        io.restore();
      }
    });
  });

  it("hooks run pre-push fails malformed package.json before optional script skips", async () => {
    await withInstalledAgentplaneRuntime(async () => {
      const root = await mkGitRepoRoot();
      await writeDefaultConfig(root);
      await writeFile(path.join(root, "package.json"), "{not-json", "utf8");

      const io = captureStdIO();
      try {
        const code = await runCli(["hooks", "run", "pre-push", "--root", root]);
        expect(code).toBe(1);
        expect(io.stderr).toContain("pre-push blocked: package.json could not be parsed.");
        expect(io.stdout).not.toContain("Skipping format:check");
      } finally {
        io.restore();
      }
    });
  });

  it("hooks run pre-push skips framework release scripts in clean initialized repositories", async () => {
    await withInstalledAgentplaneRuntime(async () => {
      const root = await mkGitRepoRoot();
      await writeDefaultConfig(root);
      const previousRelease = process.env.AGENTPLANE_HOOKS_RELEASE;
      process.env.AGENTPLANE_HOOKS_RELEASE = "1";

      const io = captureStdIO();
      try {
        const code = await runCli(["hooks", "run", "pre-push", "--root", root]);
        expect(code).toBe(0);
        expect(io.stdout).toContain("Running pre-push checks in release mode.");
        expect(io.stdout).toContain(
          "Skipping release notes check: scripts/check-release-notes.mjs is not defined.",
        );
        expect(io.stdout).toContain(
          "Skipping release:prepublish: package.json script is not defined.",
        );
        expect(io.stderr).not.toContain("Missing pre-push hook script");
      } finally {
        io.restore();
        if (previousRelease === undefined) delete process.env.AGENTPLANE_HOOKS_RELEASE;
        else process.env.AGENTPLANE_HOOKS_RELEASE = previousRelease;
      }
    });
  });
});
