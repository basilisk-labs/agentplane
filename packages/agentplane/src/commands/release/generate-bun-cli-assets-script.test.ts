import { execFile } from "node:child_process";
import { createHash } from "node:crypto";
import { existsSync } from "node:fs";
import { mkdir, mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { promisify } from "node:util";

import { afterEach, describe, expect, it } from "vitest";

const execFileAsync = promisify(execFile);
const SCRIPT_PATH = path.resolve(process.cwd(), "scripts/generate-bun-cli-assets.mjs");
const tempRoots: string[] = [];

async function makeTempRoot() {
  const root = await mkdtemp(path.join(tmpdir(), "agentplane-bun-assets-test-"));
  tempRoots.push(root);
  return root;
}

afterEach(async () => {
  while (tempRoots.length > 0) {
    const root = tempRoots.pop();
    if (!root) continue;
    await rm(root, { recursive: true, force: true });
  }
});

describe("generate-bun-cli-assets script", () => {
  it("generates synthetic Bun executable asset layout and manifest", async () => {
    const outDir = path.join(await makeTempRoot(), "out");

    await execFileAsync(
      "node",
      [
        SCRIPT_PATH,
        "--out",
        outDir,
        "--version",
        "1.2.3",
        "--tag",
        "v1.2.3",
        "--sha",
        "abc123",
        "--synthetic-binary",
      ],
      { cwd: process.cwd(), timeout: 90_000 },
    );

    const manifest = JSON.parse(await readFile(path.join(outDir, "bun-assets.json"), "utf8")) as {
      assets: {
        name: string;
        kind: string;
        platform: string;
        arch: string;
        bunTarget: string;
        installStrategy: string;
        entrypoint: string;
        dependencyStatus: string;
      }[];
    };

    expect(manifest.assets).toHaveLength(5);
    expect(manifest.assets).toContainEqual(
      expect.objectContaining({
        name: "agentplane-bun-v1.2.3-linux-x64.tar.gz",
        kind: "bun_executable",
        platform: "linux",
        arch: "x64",
        bunTarget: "bun-linux-x64",
        installStrategy: "bun_single_file_executable",
        entrypoint: "bin/agentplane",
        dependencyStatus: "synthetic_check_mode",
      }),
    );
    expect(manifest.assets).toContainEqual(
      expect.objectContaining({
        name: "agentplane-bun-v1.2.3-win32-x64.zip",
        platform: "win32",
        entrypoint: "bin/agentplane.exe",
      }),
    );
    for (const asset of manifest.assets) {
      expect(existsSync(path.join(outDir, asset.name))).toBe(true);
    }
  }, 90_000);

  it.skipIf(process.platform === "win32").each(["success", "sign", "verify", "linux"])(
    "signs before archiving and propagates failures (%s)",
    async (scenario) => {
      const root = await makeTempRoot();
      const outDir = path.join(root, "out");
      await mkdir(path.join(root, "packages/agentplane/dist"), { recursive: true });
      await writeFile(path.join(root, "packages/agentplane/dist/cli-bun.js"), "fixture");
      const preload = path.join(root, "tools.cjs");
      await writeFile(
        preload,
        `
        const cp = require("node:child_process");
        const fs = require("node:fs");
        const original = cp.execFileSync;
        Object.defineProperty(process, "platform", { value: ${JSON.stringify(scenario === "linux" ? "linux" : "darwin")} });
        cp.execFileSync = (command, args, options) => {
          if (command === "bun") {
            fs.writeFileSync(args[args.indexOf("--outfile") + 1], "compiled");
            return "";
          }
          if (command === "codesign") {
            const binary = args.at(-1);
            const step = args.includes("--verify") ? "verify" : "sign";
            if (step === ${JSON.stringify(scenario)}) throw new Error("fixture codesign " + step + " failed");
            if (step === "sign") fs.appendFileSync(binary, " signed");
            else {
              if (!args.includes("--strict") || fs.readFileSync(binary, "utf8") !== "compiled signed") {
                throw new Error("signature was not verified after signing");
              }
              fs.appendFileSync(binary, " verified");
            }
            return "";
          }
          return original(command, args, options);
        };
        require("node:module").syncBuiltinESMExports();
      `,
      );
      const run = execFileAsync(
        "node",
        [
          "--require",
          preload,
          SCRIPT_PATH,
          "--out",
          outDir,
          "--version",
          "1.2.3",
          "--sha",
          "abc123",
        ],
        { cwd: root },
      );
      if (scenario !== "success") {
        await expect(run).rejects.toThrow(
          scenario === "linux" ? "must be signed on macOS" : `fixture codesign ${scenario} failed`,
        );
        expect(existsSync(path.join(outDir, "bun-assets.json"))).toBe(false);
        expect(existsSync(path.join(outDir, "agentplane-bun-v1.2.3-darwin-arm64.tar.gz"))).toBe(
          false,
        );
        return;
      }
      await run;
      const manifest = JSON.parse(await readFile(path.join(outDir, "bun-assets.json"), "utf8")) as {
        assets: { name: string; platform: string; sha256: string }[];
      };
      for (const asset of manifest.assets.filter((asset) => asset.platform === "darwin")) {
        const archive = path.join(outDir, asset.name);
        const { stdout } = await execFileAsync("tar", ["-xOzf", archive, "./bin/agentplane"]);
        expect(stdout).toBe("compiled signed verified");
        expect(
          createHash("sha256")
            .update(await readFile(archive))
            .digest("hex"),
        ).toBe(asset.sha256);
      }
    },
  );

  it("validates Bun executable assets in check mode", async () => {
    const { stdout } = await execFileAsync("node", [SCRIPT_PATH, "--check"], {
      cwd: process.cwd(),
      timeout: 90_000,
    });

    expect(stdout).toContain("bun executable assets check");
  }, 90_000);
});
