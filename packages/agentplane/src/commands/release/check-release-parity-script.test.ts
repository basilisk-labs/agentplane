import path from "node:path";
import { execFile } from "node:child_process";
import { promisify } from "node:util";

import { describe, expect, it } from "vitest";

import { initReleaseWorkspace } from "../../../../testkit/src/release.js";

const execFileAsync = promisify(execFile);

const SCRIPT_PATH = path.resolve(process.cwd(), "scripts/check-release-parity.mjs");

describe("check-release-parity script", () => {
  it("passes when package versions and core dependency are aligned", async () => {
    const root = await initReleaseWorkspace({
      prefix: "agentplane-release-parity-",
      coreVersion: "2.3.4",
      cliVersion: "2.3.4",
      recipesVersion: "2.3.4",
      dependencyVersion: "2.3.4",
      recipesDependencyVersion: "2.3.4",
    });

    await expect(execFileAsync("node", [SCRIPT_PATH], { cwd: root })).resolves.toBeDefined();
  });

  it("fails when core dependency version drifts from workspace version", async () => {
    const root = await initReleaseWorkspace({
      prefix: "agentplane-release-parity-",
      coreVersion: "2.3.4",
      cliVersion: "2.3.4",
      recipesVersion: "2.3.4",
      dependencyVersion: "2.3.3",
      recipesDependencyVersion: "2.3.4",
    });

    const result = await execFileAsync("node", [SCRIPT_PATH], { cwd: root }).then(
      () => ({ ok: true as const, stderr: "" }),
      (error: unknown) => {
        const stderr =
          typeof error === "object" &&
          error !== null &&
          "stderr" in error &&
          typeof (error as { stderr?: unknown }).stderr === "string"
            ? (error as { stderr: string }).stderr
            : "";
        return { ok: false as const, stderr };
      },
    );

    expect(result.ok).toBe(false);
    expect(result.stderr).toContain("@agentplaneorg/core=2.3.3");
  });

  it("fails when recipes package or dependency versions drift from the release version", async () => {
    const root = await initReleaseWorkspace({
      prefix: "agentplane-release-parity-",
      coreVersion: "2.3.4",
      cliVersion: "2.3.4",
      recipesVersion: "2.3.3",
      dependencyVersion: "2.3.4",
      recipesDependencyVersion: "2.3.2",
    });

    const result = await execFileAsync("node", [SCRIPT_PATH], { cwd: root }).then(
      () => ({ ok: true as const, stderr: "" }),
      (error: unknown) => {
        const stderr =
          typeof error === "object" &&
          error !== null &&
          "stderr" in error &&
          typeof (error as { stderr?: unknown }).stderr === "string"
            ? (error as { stderr: string }).stderr
            : "";
        return { ok: false as const, stderr };
      },
    );

    expect(result.ok).toBe(false);
    expect(result.stderr).toContain("packages/recipes=2.3.3");
    expect(result.stderr).toContain("@agentplaneorg/recipes=2.3.2");
  });

  it("fails when the publishable package manifest leaks a workspace protocol dependency", async () => {
    const root = await initReleaseWorkspace({
      prefix: "agentplane-release-parity-",
      coreVersion: "2.3.4",
      cliVersion: "2.3.4",
      recipesVersion: "2.3.4",
      dependencyVersion: "2.3.4",
      recipesDependencyVersion: "2.3.4",
      extraDependencies: {
        "@agentplane/recipes": "workspace:packages/recipes",
      },
      extraWorkspacePackages: [
        {
          relDir: "packages/recipes",
          name: "@agentplane/recipes",
          version: "0.0.0",
          private: true,
        },
      ],
    });

    const result = await execFileAsync("node", [SCRIPT_PATH], { cwd: root }).then(
      () => ({ ok: true as const, stderr: "" }),
      (error: unknown) => {
        const stderr =
          typeof error === "object" &&
          error !== null &&
          "stderr" in error &&
          typeof (error as { stderr?: unknown }).stderr === "string"
            ? (error as { stderr: string }).stderr
            : "";
        return { ok: false as const, stderr };
      },
    );

    expect(result.ok).toBe(false);
    expect(result.stderr).toContain("unsupported workspace protocol");
    expect(result.stderr).toContain("@agentplane/recipes=workspace:packages/recipes");
  });
});
