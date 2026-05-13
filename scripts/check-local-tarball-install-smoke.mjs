import { execFileSync } from "node:child_process";
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs";
import os from "node:os";
import path from "node:path";

import { defineScript, runScriptMain } from "./lib/script-runtime.mjs";

const PACKAGES = ["core", "recipes", "agentplane"];

function run(command, args, opts = {}) {
  return execFileSync(command, args, {
    cwd: opts.cwd ?? process.cwd(),
    encoding: "utf8",
    env: opts.env ?? process.env,
    stdio: opts.stdio ?? ["ignore", "pipe", "pipe"],
  });
}

function npmPack(packageDir, outDir, cacheDir) {
  const stdout = run("npm", ["pack", "--json", "--pack-destination", outDir], {
    cwd: packageDir,
    env: { ...process.env, NPM_CONFIG_CACHE: cacheDir },
  });
  const jsonMatch = /(^|\n)(\[\s*\{[\s\S]*\]\s*)$/u.exec(stdout);
  if (!jsonMatch) {
    throw new Error(`npm pack did not emit JSON inventory for ${packageDir}`);
  }
  const parsed = JSON.parse(jsonMatch[2]);
  const first = Array.isArray(parsed) ? parsed[0] : parsed;
  return path.join(outDir, String(first.filename));
}

function binPath(prefix) {
  return process.platform === "win32"
    ? path.join(prefix, "agentplane.cmd")
    : path.join(prefix, "bin", "agentplane");
}

function apBinPath(prefix) {
  return process.platform === "win32"
    ? path.join(prefix, "ap.cmd")
    : path.join(prefix, "bin", "ap");
}

const main = defineScript({
  name: "check-local-tarball-install-smoke.mjs",
  async run() {
    const tempRoot = mkdtempSync(path.join(os.tmpdir(), "agentplane-local-install-smoke-"));
    const packDir = path.join(tempRoot, "packs");
    const prefix = path.join(tempRoot, "prefix");
    const repo = path.join(tempRoot, "repo");
    const cacheDir = path.resolve(process.cwd(), ".agentplane", ".npm-cache");

    try {
      mkdirSync(packDir, { recursive: true });
      mkdirSync(prefix, { recursive: true });
      const tarballs = PACKAGES.map((name) =>
        npmPack(path.resolve(process.cwd(), "packages", name), packDir, cacheDir),
      );
      run("npm", ["install", "--global", "--prefix", prefix, ...tarballs], {
        env: { ...process.env, NPM_CONFIG_CACHE: cacheDir },
        stdio: "pipe",
      });

      const agentplane = binPath(prefix);
      const ap = apBinPath(prefix);
      run(agentplane, ["--version"]);
      run(agentplane, ["--help"]);
      run(ap, ["--version"]);
      run(ap, ["help"]);

      run("git", ["init", "-q", "-b", "main", repo]);
      run("git", ["config", "user.name", "AgentPlane Smoke"], { cwd: repo });
      run("git", ["config", "user.email", "agentplane-smoke@example.com"], { cwd: repo });
      writeFileSync(path.join(repo, "README.md"), "# Smoke\n", "utf8");
      run("git", ["add", "README.md"], { cwd: repo });
      run("git", ["commit", "-m", "seed"], { cwd: repo });
      run(agentplane, ["init", "--yes"], { cwd: repo });
      run(agentplane, ["context", "init"], { cwd: repo });
      mkdirSync(path.join(repo, "context", "raw", "smoke"), { recursive: true });
      writeFileSync(
        path.join(repo, "context", "raw", "smoke", "source.md"),
        "# Smoke context\n\nPackaged install context smoke source.\n",
        "utf8",
      );
      run(agentplane, ["context", "ingest", "--dry-run", "context/raw/smoke/source.md"], {
        cwd: repo,
      });
      run(agentplane, ["context", "reindex", "--include-raw"], { cwd: repo });
      run(agentplane, ["context", "search", "Packaged", "--format", "json"], { cwd: repo });
      const taskId = run(
        agentplane,
        [
          "task",
          "new",
          "--title",
          "Tarball smoke",
          "--description",
          "Verify local tarball install",
          "--priority",
          "med",
          "--owner",
          "CODER",
          "--tag",
          "docs",
        ],
        { cwd: repo },
      ).trim();
      run(agentplane, ["task", "export"], { cwd: repo });

      process.stdout.write(`local tarball install smoke OK (${taskId})\n`);
    } finally {
      rmSync(tempRoot, { recursive: true, force: true });
    }
  },
});

runScriptMain(main);
