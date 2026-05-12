import fs from "node:fs";
import path from "node:path";

import { afterEach, describe, expect, it } from "vitest";

import { captureStdIO, clearRuntimeModeEnv } from "@agentplane/testkit";
import {
  buildFrameworkDevWorkflow,
  runRuntimeExplain,
  renderRuntimeExplainText,
} from "./runtime.command.js";
import { compareVersions } from "../runtime/shared/version-compare.js";

const envSnapshot = { ...process.env };
const workspaceRoot = process.cwd();
const repoWorkflowText = fs.readFileSync(
  path.join(workspaceRoot, ".agentplane", "WORKFLOW.md"),
  "utf8",
);
const repoExpectedCliVersion =
  /expected_version:\s+"?([^"\n]+)"?/u.exec(repoWorkflowText)?.[1]?.trim() ?? "0.0.0";
const repoPackageVersion = JSON.parse(
  fs.readFileSync(path.join(workspaceRoot, "packages", "agentplane", "package.json"), "utf8"),
) as { version: string };
const agentplaneVersion = repoPackageVersion.version;

afterEach(() => {
  for (const key of Object.keys(process.env)) {
    if (!(key in envSnapshot)) delete process.env[key];
  }
  for (const [key, value] of Object.entries(envSnapshot)) {
    if (value === undefined) delete process.env[key];
    else process.env[key] = value;
  }
});

describe("runtime.command", () => {
  it("renders machine-readable runtime details", async () => {
    clearRuntimeModeEnv(process.env);
    process.env.AGENTPLANE_RUNTIME_ACTIVE_BIN = path.join(
      workspaceRoot,
      "packages",
      "agentplane",
      "bin",
      "agentplane.js",
    );

    const io = captureStdIO();
    try {
      const rc = await runRuntimeExplain(
        { cwd: workspaceRoot, rootOverride: null } as Parameters<typeof runRuntimeExplain>[0],
        { json: true },
      );
      expect(rc).toBe(0);
      const payload = JSON.parse(io.stdout) as {
        mode: string;
        activeBinaryPath: string | null;
        framework: { inFrameworkCheckout: boolean };
        agentplane: { version: string | null; packageRoot: string | null };
        core: { version: string | null; packageRoot: string | null };
        frameworkDev: {
          available: boolean;
          bootstrapCommand: string;
          manualRepairCommands: string[];
          repoLocalVerifyCommand: string;
          reinstallScript: string;
          globalVerifyCommand: string;
          forceGlobalExample: string;
          recommendation: string | null;
        };
        repoCliExpectation: {
          expectedVersion: string | null;
          activeVersion: string | null;
          state: string;
          summary: string | null;
          recovery: string | null;
        };
        promptGraph: {
          artifactPath: string | null;
          artifactState: string;
          activeRecipeIds: string[];
          summary: unknown;
        };
      };
      expect(payload.mode).toBe("repo-local");
      expect(payload.activeBinaryPath).toContain("packages/agentplane/bin/agentplane.js");
      expect(payload.framework.inFrameworkCheckout).toBe(true);
      expect(payload.agentplane.packageRoot).toContain("packages/agentplane");
      expect(payload.core).toHaveProperty("packageRoot");
      expect(payload.frameworkDev.available).toBe(true);
      expect(payload.frameworkDev.bootstrapCommand).toBe("bun run framework:dev:bootstrap");
      expect(payload.frameworkDev.manualRepairCommands).toContain("bun install");
      expect(payload.frameworkDev.reinstallScript).toBe("scripts/reinstall-global-agentplane.sh");
      expect(payload.frameworkDev.repoLocalVerifyCommand).toBe(
        "node packages/agentplane/bin/agentplane.js runtime explain",
      );
      expect(payload.frameworkDev.globalVerifyCommand).toBe("agentplane runtime explain");
      expect(payload.frameworkDev.forceGlobalExample).toContain(
        "AGENTPLANE_USE_GLOBAL_IN_FRAMEWORK=1",
      );
      expect(payload.repoCliExpectation.expectedVersion).toBe(repoExpectedCliVersion);
      const relation = compareVersions(agentplaneVersion, repoExpectedCliVersion);
      if (relation === 0) {
        expect(payload.repoCliExpectation.state).toBe("satisfied");
      } else if (relation < 0) {
        expect(payload.repoCliExpectation.state).toBe("older_than_expected");
      } else {
        expect(payload.repoCliExpectation.state).toBe("satisfied");
      }
      expect(payload.promptGraph.artifactState).toBe("not_configured");
      expect(payload.promptGraph.activeRecipeIds).toEqual([]);
      expect(io.stdout).toBe(`${JSON.stringify(payload, null, 2)}\n`);
    } finally {
      io.restore();
    }
  });

  it("renders handoff details in the text output", async () => {
    clearRuntimeModeEnv(process.env);
    process.env.AGENTPLANE_RUNTIME_ACTIVE_BIN = path.join(
      workspaceRoot,
      "packages",
      "agentplane",
      "bin",
      "agentplane.js",
    );
    process.env.AGENTPLANE_REPO_LOCAL_HANDOFF = "1";
    process.env.AGENTPLANE_RUNTIME_HANDOFF_FROM = "/usr/local/bin/agentplane";

    const io = captureStdIO();
    try {
      const rc = await runRuntimeExplain(
        { cwd: workspaceRoot, rootOverride: null } as Parameters<typeof runRuntimeExplain>[0],
        { json: false },
      );
      expect(rc).toBe(0);
      expect(io.stdout).toContain("Mode: repo-local-handoff");
      expect(io.stdout).toContain("Handoff from: /usr/local/bin/agentplane");
      expect(io.stdout).toContain("Resolved @agentplaneorg/core:");
      expect(io.stdout).toContain(`Repository expected agentplane CLI: ${repoExpectedCliVersion}`);
      expect(io.stdout).toContain("Repository CLI status:");
      expect(io.stdout).toContain("Framework dev workflow:");
      expect(io.stdout).toContain("bun run framework:dev:bootstrap");
      expect(io.stdout).toContain("node packages/agentplane/bin/agentplane.js runtime explain");
      expect(io.stdout).toContain("scripts/reinstall-global-agentplane.sh");
      expect(io.stdout).toContain("AGENTPLANE_USE_GLOBAL_IN_FRAMEWORK=1 agentplane <command>");
    } finally {
      io.restore();
    }
  });

  it("formats runtime reports with stable field labels", () => {
    const text = renderRuntimeExplainText(
      {
        cwd: "/repo",
        activeBinaryPath: "/repo/packages/agentplane/bin/agentplane.js",
        handoffFromBinaryPath: null,
        mode: "repo-local",
        framework: {
          inFrameworkCheckout: true,
          isRepoLocalBinary: true,
          isRepoLocalRuntime: true,
          checkout: {
            repoRoot: "/repo",
            packageRoot: "/repo/packages/agentplane",
            repoBin: "/repo/packages/agentplane/bin/agentplane.js",
            repoCli: "/repo/packages/agentplane/src/cli.ts",
          },
          thisBin: "/repo/packages/agentplane/bin/agentplane.js",
        },
        frameworkSources: {
          repoRoot: "/repo",
          agentplaneRoot: "/repo/packages/agentplane",
          coreRoot: "/repo/packages/core",
        },
        agentplane: {
          name: "agentplane",
          version: agentplaneVersion,
          packageRoot: "/repo/packages/agentplane",
          packageJsonPath: "/repo/packages/agentplane/package.json",
        },
        core: {
          name: "@agentplaneorg/core",
          version: agentplaneVersion,
          packageRoot: "/repo/packages/core",
          packageJsonPath: "/repo/packages/core/package.json",
        },
      },
      {
        expectedVersion: repoExpectedCliVersion,
        activeVersion: agentplaneVersion,
        state: "satisfied",
        summary: `Active runtime ${agentplaneVersion} matches the repository expectation ${repoExpectedCliVersion}.`,
        recovery: null,
      },
    );

    expect(text).toContain("Active binary:");
    expect(text).toContain("Framework repo root:");
    expect(text).toContain("Resolved agentplane:");
    expect(text).toContain(`Repository expected agentplane CLI: ${repoExpectedCliVersion}`);
    expect(text).toContain("Framework dev workflow:");
    expect(text).toContain("bun run framework:dev:bootstrap");
    expect(text).toContain("scripts/reinstall-global-agentplane.sh");
  });

  it("renders prompt graph diagnostics with module provenance", () => {
    const text = renderRuntimeExplainText(
      {
        cwd: "/repo",
        activeBinaryPath: "/repo/packages/agentplane/bin/agentplane.js",
        handoffFromBinaryPath: null,
        mode: "repo-local",
        framework: {
          inFrameworkCheckout: true,
          isRepoLocalBinary: true,
          isRepoLocalRuntime: true,
          checkout: {
            repoRoot: "/repo",
            packageRoot: "/repo/packages/agentplane",
            repoBin: "/repo/packages/agentplane/bin/agentplane.js",
            repoCli: "/repo/packages/agentplane/src/cli.ts",
          },
          thisBin: "/repo/packages/agentplane/bin/agentplane.js",
        },
        frameworkSources: {
          repoRoot: "/repo",
          agentplaneRoot: "/repo/packages/agentplane",
          coreRoot: "/repo/packages/core",
        },
        agentplane: {
          name: "agentplane",
          version: agentplaneVersion,
          packageRoot: "/repo/packages/agentplane",
          packageJsonPath: "/repo/packages/agentplane/package.json",
        },
        core: {
          name: "@agentplaneorg/core",
          version: agentplaneVersion,
          packageRoot: "/repo/packages/core",
          packageJsonPath: "/repo/packages/core/package.json",
        },
      },
      {
        expectedVersion: repoExpectedCliVersion,
        activeVersion: agentplaneVersion,
        state: "satisfied",
        summary: `Active runtime ${agentplaneVersion} matches the repository expectation ${repoExpectedCliVersion}.`,
        recovery: null,
      },
      {
        artifactPath: "/repo/.agentplane/generated/prompt-graph.json",
        artifactState: "current",
        activeRecipeIds: ["review"],
        summary: {
          moduleCount: 2,
          bindingCount: 1,
          validatorCount: 1,
          diagnosticCount: 0,
          errorCount: 0,
          warningCount: 0,
          repoOverrideCount: 1,
          ownerCounts: { framework: 1, recipe: 1 },
          sourceKindCounts: { framework_builtin: 1, recipe_asset: 1 },
          contentHash: "abc123",
        },
        modules: [
          {
            address: "recipe.review/policy/.agentplane~policy/body/rule",
            title: "Review policy rule",
            ownerKind: "recipe",
            ownerLabel: "recipe:review@1.0.0",
            sourceKind: "recipe_asset",
            sourceRef: ".agentplane/recipes/packages/review/prompt-modules/rule.json",
            fragmentId: "recipe.review.policy.body.rule",
            recipeId: "review",
          },
        ],
        diagnostics: [],
        error: null,
      },
    );

    expect(text).toContain("Prompt graph:");
    expect(text).toContain("Active recipes: review");
    expect(text).toContain("Repo overrides: 1");
    expect(text).toContain("Mutation effects: bindings=1, validators=1, diagnostics=0");
    expect(text).toContain(
      "recipe.review/policy/.agentplane~policy/body/rule [recipe:review@1.0.0; recipe_asset; .agentplane/recipes/packages/review/prompt-modules/rule.json; fragment=recipe.review.policy.body.rule]",
    );
  });

  it("builds a no-op framework workflow outside the framework checkout", () => {
    const workflow = buildFrameworkDevWorkflow({
      cwd: "/tmp/outside",
      activeBinaryPath: "/usr/local/bin/agentplane",
      handoffFromBinaryPath: null,
      mode: "global-installed",
      framework: {
        inFrameworkCheckout: false,
        isRepoLocalBinary: false,
        isRepoLocalRuntime: false,
        checkout: null,
        thisBin: "/usr/local/bin/agentplane",
      },
      frameworkSources: {
        repoRoot: null,
        agentplaneRoot: "/usr/local/lib/node_modules/agentplane",
        coreRoot: null,
      },
      agentplane: {
        name: "agentplane",
        version: agentplaneVersion,
        packageRoot: "/usr/local/lib/node_modules/agentplane",
        packageJsonPath: "/usr/local/lib/node_modules/agentplane/package.json",
      },
      core: {
        name: "@agentplaneorg/core",
        version: agentplaneVersion,
        packageRoot: "/usr/local/lib/node_modules/@agentplaneorg/core",
        packageJsonPath: "/usr/local/lib/node_modules/@agentplaneorg/core/package.json",
      },
    });

    expect(workflow.available).toBe(false);
    expect(workflow.recommendation).toBeNull();
  });
});
