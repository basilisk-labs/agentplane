#!/usr/bin/env node
import { execFileSync } from "node:child_process";
import path from "node:path";
import { readFile, stat } from "node:fs/promises";
import { fileURLToPath } from "node:url";

async function exists(p) {
  try {
    await stat(p);
    return true;
  } catch {
    return false;
  }
}

async function maybeWarnGlobalBinaryInRepoCheckout() {
  const cwd = process.cwd();
  const repoCli = path.join(cwd, "packages", "agentplane", "src", "cli.ts");
  const repoBin = path.join(cwd, "packages", "agentplane", "bin", "agentplane.js");
  if (!(await exists(repoCli)) || !(await exists(repoBin))) return;

  const thisBin = fileURLToPath(import.meta.url);
  const normalizedThis = path.resolve(thisBin);
  const normalizedRepo = path.resolve(repoBin);
  if (normalizedThis === normalizedRepo) return;

  process.stderr.write(
    "warning: running global agentplane binary inside repository checkout.\n" +
      "using global binary: " +
      normalizedThis +
      "\n" +
      "expected local binary: " +
      normalizedRepo +
      "\n" +
      "tip: run `node packages/agentplane/bin/agentplane.js ...` for repo-local changes.\n",
  );
}

async function readJsonIfExists(p) {
  let raw = "";
  try {
    raw = await readFile(p, "utf8");
  } catch {
    return null;
  }
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

function resolveGitHead(cwd) {
  try {
    return execFileSync("git", ["rev-parse", "HEAD"], { cwd, encoding: "utf8" }).trim() || null;
  } catch {
    return null;
  }
}

function hasSrcChanges(cwd) {
  try {
    const out = execFileSync(
      "git",
      ["status", "--porcelain", "--untracked-files=all", "--", "src"],
      {
        cwd,
        encoding: "utf8",
      },
    );
    return out.trim().length > 0;
  } catch {
    return false;
  }
}

async function fileMtimeMs(p) {
  try {
    const s = await stat(p);
    if (!s.isFile()) return null;
    return s.mtimeMs;
  } catch {
    return null;
  }
}

async function isPackageBuildFresh(packageRoot) {
  const manifestPath = path.join(packageRoot, "dist", ".build-manifest.json");
  const manifest = await readJsonIfExists(manifestPath);
  if (!manifest || manifest.schema_version !== 1) {
    return { ok: false, reason: "manifest_missing" };
  }

  const currentHead = resolveGitHead(packageRoot);
  if (manifest.git_head && currentHead && manifest.git_head !== currentHead) {
    return { ok: false, reason: "git_head_changed" };
  }

  if (hasSrcChanges(packageRoot)) {
    return { ok: false, reason: "src_dirty" };
  }

  const srcCliMtimeMs = await fileMtimeMs(path.join(packageRoot, "src", "cli.ts"));
  const srcIndexMtimeMs = await fileMtimeMs(path.join(packageRoot, "src", "index.ts"));
  if (
    typeof manifest.src_cli_mtime_ms === "number" &&
    typeof srcCliMtimeMs === "number" &&
    srcCliMtimeMs > manifest.src_cli_mtime_ms
  ) {
    return { ok: false, reason: "src_cli_newer_than_manifest" };
  }
  if (
    typeof manifest.src_index_mtime_ms === "number" &&
    typeof srcIndexMtimeMs === "number" &&
    srcIndexMtimeMs > manifest.src_index_mtime_ms
  ) {
    return { ok: false, reason: "src_index_newer_than_manifest" };
  }

  return { ok: true, reason: "fresh" };
}

function isHooksRunCommitMsgInvocation(argv) {
  const args = argv.slice(2).map((value) => String(value ?? "").trim());
  for (let i = 0; i < args.length; i += 1) {
    if (args[i] !== "hooks") continue;
    return args[i + 1] === "run" && args[i + 2] === "commit-msg";
  }
  return false;
}

function isPathInside(baseDir, targetPath) {
  const rel = path.relative(path.resolve(baseDir), path.resolve(targetPath));
  return rel === "" || (!rel.startsWith("..") && !path.isAbsolute(rel));
}

async function assertDistUpToDate() {
  const here = path.dirname(fileURLToPath(import.meta.url));
  const agentplaneRoot = path.resolve(here, "..");
  const inRepo = await exists(path.join(agentplaneRoot, "src", "cli.ts"));
  if (!inRepo) return true;

  const allowStale = (process.env.AGENTPLANE_DEV_ALLOW_STALE_DIST ?? "").trim() === "1";
  const agentplaneDistDir = path.join(agentplaneRoot, "dist");
  if (!(await exists(agentplaneDistDir))) {
    process.stderr.write(
      "error: agentplane dist is missing for this repo checkout.\n" +
        "Fix:\n" +
        "  bun run --filter=@agentplaneorg/core build\n" +
        "  bun run --filter=agentplane build\n",
    );
    process.exitCode = 2;
    return false;
  }

  const repoRoot = path.resolve(agentplaneRoot, "..", "..");
  const coreRoot = path.join(repoRoot, "packages", "core");
  const checks = [{ name: "agentplane", root: agentplaneRoot }];
  if (await exists(path.join(coreRoot, "src"))) checks.push({ name: "core", root: coreRoot });

  const staleReasons = [];
  for (const check of checks) {
    const result = await isPackageBuildFresh(check.root);
    if (!result.ok) staleReasons.push(`${check.name}:${result.reason}`);
  }

  if (staleReasons.length > 0 && !allowStale) {
    const runningInsideCheckout = isPathInside(repoRoot, process.cwd());
    if (!runningInsideCheckout) {
      process.stderr.write(
        "warning: linked development binary has a stale build, but current working directory is outside the agentplane checkout.\n" +
          "proceeding with existing dist output.\n" +
          `detected: ${staleReasons.join(", ")}\n` +
          "tip: rebuild (`bun run --filter=@agentplaneorg/core build && bun run --filter=agentplane build`) or reinstall from npm for stable global usage.\n",
      );
      return true;
    }

    process.stderr.write(
      "error: refusing to run a stale repo build (manifest/git quick-check failed).\n" +
        "Fix:\n" +
        "  bun run --filter=@agentplaneorg/core build\n" +
        "  bun run --filter=agentplane build\n" +
        `Detected: ${staleReasons.join(", ")}\n` +
        "Override (not recommended): set AGENTPLANE_DEV_ALLOW_STALE_DIST=1\n",
    );
    process.exitCode = 2;
    return false;
  }

  return true;
}

await maybeWarnGlobalBinaryInRepoCheckout();
const ok = isHooksRunCommitMsgInvocation(process.argv) ? true : await assertDistUpToDate();
if (ok) await import("../dist/cli.js");
