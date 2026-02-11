import { mkdtemp, mkdir, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { execFile } from "node:child_process";
import { promisify } from "node:util";

import { describe, expect, it } from "vitest";

const execFileAsync = promisify(execFile);

const SCRIPT_PATH = path.resolve(process.cwd(), "scripts/check-release-version.mjs");

async function writePackageJson(root: string, relDir: string, data: Record<string, unknown>) {
  const dir = path.join(root, relDir);
  await mkdir(dir, { recursive: true });
  await writeFile(path.join(dir, "package.json"), `${JSON.stringify(data, null, 2)}\n`, "utf8");
}

describe("check-release-version script", () => {
  it("passes when tag, package versions, and core dependency are aligned", async () => {
    const root = await mkdtemp(path.join(tmpdir(), "agentplane-release-check-"));
    await writePackageJson(root, "packages/core", {
      name: "@agentplaneorg/core",
      version: "1.2.3",
    });
    await writePackageJson(root, "packages/agentplane", {
      name: "agentplane",
      version: "1.2.3",
      dependencies: {
        "@agentplaneorg/core": "1.2.3",
      },
    });

    await expect(
      execFileAsync("node", [SCRIPT_PATH, "--tag", "v1.2.3"], { cwd: root }),
    ).resolves.toBeDefined();
  });

  it("fails when agentplane depends on a different core version", async () => {
    const root = await mkdtemp(path.join(tmpdir(), "agentplane-release-check-"));
    await writePackageJson(root, "packages/core", {
      name: "@agentplaneorg/core",
      version: "1.2.3",
    });
    await writePackageJson(root, "packages/agentplane", {
      name: "agentplane",
      version: "1.2.3",
      dependencies: {
        "@agentplaneorg/core": "1.2.2",
      },
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
