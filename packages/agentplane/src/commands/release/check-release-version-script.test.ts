import path from "node:path";
import { execFile } from "node:child_process";
import { promisify } from "node:util";

import { describe, expect, it } from "vitest";

import { initReleaseWorkspace } from "@agentplane/testkit/release";

const execFileAsync = promisify(execFile);

const SCRIPT_PATH = path.resolve(process.cwd(), "scripts/check-release-version.mjs");

describe("check-release-version script", () => {
  it("passes when tag, package versions, and core dependency are aligned", async () => {
    const root = await initReleaseWorkspace({ prefix: "agentplane-release-check-" });

    await expect(
      execFileAsync("node", [SCRIPT_PATH, "--tag", "v1.2.3"], { cwd: root }),
    ).resolves.toBeDefined();
  });

  it("passes when prerelease tag and package versions are aligned", async () => {
    const root = await initReleaseWorkspace({
      prefix: "agentplane-release-check-",
      coreVersion: "1.2.3-rc.1",
      cliVersion: "1.2.3-rc.1",
      recipesVersion: "1.2.3-rc.1",
      dependencyVersion: "1.2.3-rc.1",
      recipesDependencyVersion: "1.2.3-rc.1",
    });

    await expect(
      execFileAsync("node", [SCRIPT_PATH, "--tag", "v1.2.3-rc.1"], { cwd: root }),
    ).resolves.toBeDefined();
  });

  it("fails when agentplane depends on a different core version", async () => {
    const root = await initReleaseWorkspace({
      prefix: "agentplane-release-check-",
      dependencyVersion: "1.2.2",
    });

    const result = await execFileAsync("node", [SCRIPT_PATH, "--tag", "v1.2.3"], {
      cwd: root,
    }).then(
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
    expect(result.stderr).toContain("@agentplaneorg/core=1.2.2");
  });
});
