import { execFile } from "node:child_process";
import { promisify } from "node:util";
import { mkdir, mkdtemp, readFile, rm, stat, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { describe, expect, it, vi } from "vitest";

import {
  BUILTIN_AGENTPLANE_ASSETS,
  BUILTIN_AGENTPLANE_ASSETS_HASH,
} from "./builtin-assets.generated.js";
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

  it("isolates concurrent compiled runtimes and removes their temporary assets on exit", async () => {
    await withPackageRoot(async (root) => {
      const tempRoot = await mkdtemp(path.join(os.tmpdir(), "agentplane-concurrent-assets-"));
      const script = `
        import fs from "node:fs";
        import { resolveAgentplaneAssetPath } from ${JSON.stringify(new URL("./package-paths.ts", import.meta.url).href)};
        globalThis.__AGENTPLANE_BUILTIN_ASSETS__ = {
          hash: "same-hash",
          assets: [{ path: "probe.txt", base64: Buffer.from("trusted content").toString("base64") }],
        };
        const asset = resolveAgentplaneAssetPath("probe.txt");
        console.log(JSON.stringify({ asset, content: fs.readFileSync(asset, "utf8"), repeated: resolveAgentplaneAssetPath("probe.txt") }));
      `;
      try {
        const results = await Promise.all(
          [0, 1].map(() =>
            promisify(execFile)("bun", ["--eval", script], {
              env: {
                ...process.env,
                [ACTIVE_BIN_ENV]: path.join(root, "bin", "agentplane.js"),
                [FORCE_BUILTIN_ASSETS_ENV]: "1",
                TMPDIR: tempRoot,
                TMP: tempRoot,
                TEMP: tempRoot,
              },
              timeout: 15000,
            }),
          ),
        );
        const assets = results.map(
          ({ stdout }) =>
            JSON.parse(stdout) as { asset: string; content: string; repeated: string },
        );
        expect(assets[0]!.asset).not.toBe(assets[1]!.asset);
        for (const result of assets) {
          expect(result.content).toBe("trusted content");
          expect(result.repeated).toBe(result.asset);
          await expect(stat(result.asset)).rejects.toMatchObject({ code: "ENOENT" });
        }
      } finally {
        await rm(tempRoot, { recursive: true, force: true });
      }
    });
  });

  it("materializes builtin assets when compiled runtime has no adjacent asset tree", async () => {
    const previousActiveBin = process.env[ACTIVE_BIN_ENV];
    const previousForceAssets = process.env[FORCE_BUILTIN_ASSETS_ENV];
    const runtimeGlobals = globalThis as Record<string, unknown>;
    const previousBuiltinAssets = runtimeGlobals.__AGENTPLANE_BUILTIN_ASSETS__;
    const root = await mkdtemp(path.join(os.tmpdir(), "agentplane-compiled-assets-"));
    await mkdir(path.join(root, "bin"), { recursive: true });
    await writeFile(path.join(root, "package.json"), '{"name":"agentplane"}\n', "utf8");

    process.env[ACTIVE_BIN_ENV] = path.join(root, "bin", "agentplane.js");
    process.env[FORCE_BUILTIN_ASSETS_ENV] = "1";
    runtimeGlobals.__AGENTPLANE_BUILTIN_ASSETS__ = {
      assets: BUILTIN_AGENTPLANE_ASSETS,
      hash: BUILTIN_AGENTPLANE_ASSETS_HASH,
    };

    const tempRoot = await mkdtemp(path.join(os.tmpdir(), "agentplane-private-assets-"));
    const sharedAssets = path.join(
      tempRoot,
      "agentplane-builtin-assets",
      BUILTIN_AGENTPLANE_ASSETS_HASH,
      "assets",
    );
    await mkdir(sharedAssets, { recursive: true });
    await writeFile(path.join(sharedAssets, ".agentplane-builtin-assets-ready"), "ready");
    await writeFile(path.join(sharedAssets, "AGENTS.md"), "attacker-controlled assets");
    const tmpdir = vi.spyOn(os, "tmpdir").mockReturnValue(tempRoot);

    try {
      const agentsPath = resolveAgentplaneAssetPath("AGENTS.md");
      expect(agentsPath.startsWith(root)).toBe(false);
      await expect(readFile(agentsPath, "utf8")).resolves.toContain("# PURPOSE");
      expect(resolveAgentplaneAssetPath("AGENTS.md")).toBe(agentsPath);
      if (process.platform !== "win32") {
        expect((await stat(path.dirname(agentsPath))).mode & 0o077).toBe(0);
      }
      await expect(readFile(path.join(sharedAssets, "AGENTS.md"), "utf8")).resolves.toBe(
        "attacker-controlled assets",
      );
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
      tmpdir.mockRestore();
      await rm(tempRoot, { recursive: true, force: true });
      await rm(root, { recursive: true, force: true });
      if (previousBuiltinAssets === undefined) {
        delete runtimeGlobals.__AGENTPLANE_BUILTIN_ASSETS__;
      } else {
        runtimeGlobals.__AGENTPLANE_BUILTIN_ASSETS__ = previousBuiltinAssets;
      }
    }
  });
});
