import { execFileSync } from "node:child_process";
import { mkdtempSync, rmSync } from "node:fs";
import os from "node:os";
import path from "node:path";

import { defineScript, runScriptMain } from "../lib/script-runtime.mjs";

const SCRIPT_NAME = "check-agentplane-artifacts.mjs";
const HISTORICAL_VOLATILE_CUTOFF_EPOCH_SECONDS = 1_777_052_921;

function git(args, opts = {}) {
  return execFileSync("git", args, {
    cwd: opts.cwd ?? process.cwd(),
    encoding: "utf8",
    stdio: opts.stdio ?? ["ignore", "pipe", "pipe"],
  });
}

function normalize(filePath) {
  return filePath.replaceAll(path.sep, "/");
}

function isPrEvidence(filePath) {
  return /^\.agentplane\/tasks\/[^/]+\/pr\/(?:verify\.log|notes\.jsonl)$/u.test(filePath);
}

function isVolatileAgentplanePath(filePath) {
  const rel = normalize(filePath);
  if (rel === ".agentplane/tasks.json") return true;
  if (/^\.agentplane\/tasks\/[^/]+\/(?:runs|repro)(?:\/|$)/u.test(rel)) return true;
  if (/^\.agentplane\/(?:cache|bin|\.npm-cache|\.release|\.upgrade)\//u.test(rel)) return true;
  if (isPrEvidence(rel)) return false;
  if (/^\.agentplane\/tasks\/.+\.(?:log|jsonl)$/u.test(rel)) return true;
  return false;
}

function listTrackedFiles() {
  return git(["ls-files", "-z"])
    .split("\0")
    .filter(Boolean)
    .map((filePath) => normalize(filePath));
}

function lastCommitEpochSeconds(filePath) {
  const out = git(["log", "-1", "--format=%ct", "--", filePath]).trim();
  if (!out) return null;
  const parsed = Number.parseInt(out, 10);
  return Number.isSafeInteger(parsed) ? parsed : null;
}

function listArchiveFiles() {
  const tempDir = mkdtempSync(path.join(os.tmpdir(), "agentplane-archive-check-"));
  const tarPath = path.join(tempDir, "source.tar");
  try {
    execFileSync(
      "git",
      ["archive", "--worktree-attributes", "--format=tar", "-o", tarPath, "HEAD"],
      {
        cwd: process.cwd(),
        stdio: ["ignore", "pipe", "pipe"],
      },
    );
    return execFileSync("tar", ["-tf", tarPath], { encoding: "utf8" })
      .split(/\r?\n/u)
      .filter(Boolean)
      .map((filePath) => normalize(filePath));
  } finally {
    rmSync(tempDir, { recursive: true, force: true });
  }
}

function formatList(items) {
  return items.length === 0 ? "  - none" : items.map((item) => `  - ${item}`).join("\n");
}

function checkTrackedVolatile() {
  const offenders = [];
  for (const filePath of listTrackedFiles().filter((item) => isVolatileAgentplanePath(item))) {
    const committedAt = lastCommitEpochSeconds(filePath);
    if (!committedAt || committedAt > HISTORICAL_VOLATILE_CUTOFF_EPOCH_SECONDS) {
      offenders.push(filePath);
    }
  }
  if (offenders.length > 0) {
    throw new Error(
      [
        "new tracked volatile .agentplane artifacts are not allowed.",
        "Existing historical volatile artifacts are grandfathered by cutoff; new task evidence must be summarized in task READMEs or compact PR artifacts.",
        "Offenders:",
        formatList(offenders),
      ].join("\n"),
    );
  }
}

function checkArchiveVolatile() {
  const offenders = listArchiveFiles().filter((item) => isVolatileAgentplanePath(item));
  if (offenders.length > 0) {
    throw new Error(
      [
        "source archive includes volatile .agentplane artifacts.",
        "Add export-ignore rules for these paths:",
        formatList(offenders.slice(0, 50)),
      ].join("\n"),
    );
  }
}

const main = defineScript({
  name: SCRIPT_NAME,
  async run() {
    checkTrackedVolatile();
    checkArchiveVolatile();
    process.stdout.write("agentplane artifact policy OK\n");
  },
});

runScriptMain(main);
