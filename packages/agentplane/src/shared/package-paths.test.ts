import { mkdir, mkdtemp, readFile, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { describe, expect, it } from "vitest";

import {
  resolveAgentplaneAssetPath,
  resolveAgentplaneBinPath,
  resolveAgentplanePackageRoot,
  resolveAgentplaneRepoScriptPath,
} from "./package-paths.js";

const ACTIVE_BIN_ENV = "AGENTPLANE_RUNTIME_ACTIVE_BIN";
const FORCE_BUILTIN_ASSETS_ENV = "AGENTPLANE_FORCE_BUILTIN_ASSETS";

async function withPackageRoot<T>(fn: (root: string) => T | Promise<T>): Promise<T> {
  const previous = process.env[ACTIVE_BIN_ENV];
  const root = await mkdtemp(path.join(os.tmpdir(), "agentplane-package-root-"));
  await mkdir(path.join(root, "bin"), { recursive: true });
  await writeFile(path.join(root, "package.json"), '{"name":"agentplane"}\n', "utf8");
  process.env[ACTIVE_BIN_ENV] = path.join(root, "bin", "agentplane.js");
  try {
    return await fn(root);
  } finally {
    if (previous === undefined) {
      delete process.env[ACTIVE_BIN_ENV];
    } else {
      process.env[ACTIVE_BIN_ENV] = previous;
    }
  }
}

describe("package path resolution", () => {
  it("resolves package-relative paths from the active wrapper binary", async () => {
    await withPackageRoot((root) => {
      expect(resolveAgentplanePackageRoot()).toBe(root);
      expect(resolveAgentplaneBinPath()).toBe(path.join(root, "bin", "agentplane.js"));
      expect(resolveAgentplaneAssetPath("AGENTS.md")).toBe(path.join(root, "assets", "AGENTS.md"));
      expect(resolveAgentplaneRepoScriptPath("run-pre-push-hook.mjs")).toBe(
        path.resolve(root, "..", "..", "scripts", "run-pre-push-hook.mjs"),
      );
    });
  });

  it("resolves a compiled Bun executable to the binary-adjacent runtime root", () => {
    const previous = process.env[ACTIVE_BIN_ENV];
    delete process.env[ACTIVE_BIN_ENV];

    try {
      expect(resolveAgentplanePackageRoot("file:///$bunfs/root/agentplane-bun")).toBe(
        path.dirname(path.resolve(process.execPath)),
      );
    } finally {
      if (previous === undefined) {
        delete process.env[ACTIVE_BIN_ENV];
      } else {
        process.env[ACTIVE_BIN_ENV] = previous;
      }
    }
  });

  it("materializes builtin assets when compiled runtime has no adjacent asset tree", async () => {
    const previousActiveBin = process.env[ACTIVE_BIN_ENV];
    const previousForceAssets = process.env[FORCE_BUILTIN_ASSETS_ENV];
    const root = await mkdtemp(path.join(os.tmpdir(), "agentplane-compiled-assets-"));
    await mkdir(path.join(root, "bin"), { recursive: true });
    await writeFile(path.join(root, "package.json"), '{"name":"agentplane"}\n', "utf8");

    process.env[ACTIVE_BIN_ENV] = path.join(root, "bin", "agentplane.js");
    process.env[FORCE_BUILTIN_ASSETS_ENV] = "1";

    try {
      const agentsPath = resolveAgentplaneAssetPath("AGENTS.md");
      expect(agentsPath.startsWith(root)).toBe(false);
      await expect(readFile(agentsPath, "utf8")).resolves.toContain("# PURPOSE");
    } finally {
      if (previousActiveBin === undefined) {
        delete process.env[ACTIVE_BIN_ENV];
      } else {
        process.env[ACTIVE_BIN_ENV] = previousActiveBin;
      }
      if (previousForceAssets === undefined) {
        delete process.env[FORCE_BUILTIN_ASSETS_ENV];
      } else {
        process.env[FORCE_BUILTIN_ASSETS_ENV] = previousForceAssets;
      }
    }
  });
});
