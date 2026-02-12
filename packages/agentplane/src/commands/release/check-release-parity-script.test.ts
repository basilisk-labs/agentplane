import { mkdtemp, mkdir, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { execFile } from "node:child_process";
import { promisify } from "node:util";

import { describe, expect, it } from "vitest";

const execFileAsync = promisify(execFile);

const SCRIPT_PATH = path.resolve(process.cwd(), "scripts/check-release-parity.mjs");

async function writePackageJson(root: string, relDir: string, data: Record<string, unknown>) {
  const dir = path.join(root, relDir);
  await mkdir(dir, { recursive: true });
  await writeFile(path.join(dir, "package.json"), `${JSON.stringify(data, null, 2)}\n`, "utf8");
}

describe("check-release-parity script", () => {
  it("passes when package versions and core dependency are aligned", async () => {
    const root = await mkdtemp(path.join(tmpdir(), "agentplane-release-parity-"));
    await writePackageJson(root, "packages/core", {
      name: "@agentplaneorg/core",
      version: "2.3.4",
    });
    await writePackageJson(root, "packages/agentplane", {
      name: "agentplane",
      version: "2.3.4",
      dependencies: {
        "@agentplaneorg/core": "2.3.4",
      },
    });

    await expect(execFileAsync("node", [SCRIPT_PATH], { cwd: root })).resolves.toBeDefined();
  });

  it("fails when core dependency version drifts from workspace version", async () => {
    const root = await mkdtemp(path.join(tmpdir(), "agentplane-release-parity-"));
    await writePackageJson(root, "packages/core", {
      name: "@agentplaneorg/core",
      version: "2.3.4",
    });
    await writePackageJson(root, "packages/agentplane", {
      name: "agentplane",
      version: "2.3.4",
      dependencies: {
        "@agentplaneorg/core": "2.3.3",
      },
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
});
