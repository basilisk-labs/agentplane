import path from "node:path";

import { afterEach, describe, expect, it } from "vitest";

import { captureStdIO } from "../cli/run-cli.test-helpers.js";
import {
  buildFrameworkDevWorkflow,
  runRuntimeExplain,
  renderRuntimeExplainText,
} from "./runtime.command.js";

const envSnapshot = { ...process.env };
const workspaceRoot = process.cwd();

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
          rebuildCommands: string[];
          reinstallScript: string;
          verifyCommand: string;
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
      };
      expect(payload.mode).toBe("repo-local");
      expect(payload.activeBinaryPath).toContain("packages/agentplane/bin/agentplane.js");
      expect(payload.framework.inFrameworkCheckout).toBe(true);
      expect(payload.agentplane.packageRoot).toContain("packages/agentplane");
      expect(payload.core).toHaveProperty("packageRoot");
      expect(payload.frameworkDev.available).toBe(true);
      expect(payload.frameworkDev.reinstallScript).toBe("scripts/reinstall-global-agentplane.sh");
      expect(payload.frameworkDev.verifyCommand).toBe("agentplane runtime explain");
      expect(payload.frameworkDev.forceGlobalExample).toContain(
        "AGENTPLANE_USE_GLOBAL_IN_FRAMEWORK=1",
      );
      expect(payload.repoCliExpectation.expectedVersion).toBe("0.3.2");
      expect(payload.repoCliExpectation.state).toBe("satisfied");
    } finally {
      io.restore();
    }
  });

  it("renders handoff details in the text output", async () => {
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
      expect(io.stdout).toContain("Repository expected agentplane CLI: 0.3.2");
      expect(io.stdout).toContain("Repository CLI status:");
      expect(io.stdout).toContain("Framework dev workflow:");
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
          version: "0.3.2",
          packageRoot: "/repo/packages/agentplane",
          packageJsonPath: "/repo/packages/agentplane/package.json",
        },
        core: {
          name: "@agentplaneorg/core",
          version: "0.3.2",
          packageRoot: "/repo/packages/core",
          packageJsonPath: "/repo/packages/core/package.json",
        },
      },
      {
        expectedVersion: "0.3.2",
        activeVersion: "0.3.2",
        state: "satisfied",
        summary: "Active runtime 0.3.2 matches the repository expectation 0.3.2.",
        recovery: null,
      },
    );

    expect(text).toContain("Active binary:");
    expect(text).toContain("Framework repo root:");
    expect(text).toContain("Resolved agentplane:");
    expect(text).toContain("Repository expected agentplane CLI: 0.3.2");
    expect(text).toContain("Framework dev workflow:");
    expect(text).toContain("scripts/reinstall-global-agentplane.sh");
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
        version: "0.3.2",
        packageRoot: "/usr/local/lib/node_modules/agentplane",
        packageJsonPath: "/usr/local/lib/node_modules/agentplane/package.json",
      },
      core: {
        name: "@agentplaneorg/core",
        version: "0.3.2",
        packageRoot: "/usr/local/lib/node_modules/@agentplaneorg/core",
        packageJsonPath: "/usr/local/lib/node_modules/@agentplaneorg/core/package.json",
      },
    });

    expect(workflow.available).toBe(false);
    expect(workflow.recommendation).toBeNull();
  });
});
