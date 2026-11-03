import { execFileSync } from "node:child_process";
import { mkdtempSync, rmSync } from "node:fs";
import os from "node:os";
import path from "node:path";

import { defineScript, runScriptMain } from "../lib/script-runtime.mjs";
import { isNativeVerificationJournal } from "./native-verification-journal.mjs";

const SCRIPT_NAME = "check-agentplane-artifacts.mjs";
const HISTORICAL_VOLATILE_CUTOFF_EPOCH_SECONDS = 1_777_052_921;
const COMMAND_MAX_BUFFER_BYTES = 64 * 1024 * 1024;

function git(args, opts = {}) {
  return execFileSync("git", args, {
    cwd: opts.cwd ?? process.cwd(),
    encoding: "utf8",
    stdio: opts.stdio ?? ["ignore", "pipe", "pipe"],
    maxBuffer: COMMAND_MAX_BUFFER_BYTES,
  });
}

function normalize(filePath) {
  return filePath.replaceAll(path.sep, "/");
}

function isPrEvidence(filePath) {
  return /^\.agentplane\/tasks\/[^/]+\/pr\/(?:verify\.log|notes\.jsonl)$/u.test(filePath);
}

function isVolatileAgentplanePath(filePath, allowNativeJournal = false) {
  const rel = normalize(filePath);
  if (rel === ".agentplane/tasks.json") return true;
  if (/^\.agentplane\/tasks\/[^/]+\/(?:runs|repro)(?:\/|$)/u.test(rel)) return true;
  if (/^\.agentplane\/(?:cache|bin|\.npm-cache|\.release|\.upgrade)\//u.test(rel)) return true;
  if (isPrEvidence(rel)) return false;
  if (allowNativeJournal && isNativeVerificationJournal(rel, readTrackedFile)) return false;
  if (/^\.agentplane\/tasks\/.+\.(?:log|jsonl)$/u.test(rel)) return true;
  return false;
}

let sparseBlobs;

function readSparseBlobs(trackedFiles) {
  const paths = trackedFiles.filter((filePath) =>
    /^\.agentplane\/tasks\/[^/]+\/supervision\/verification-runs\//u.test(filePath),
  );
  if (paths.length === 0) return new Map();
  const headers = execFileSync("git", ["cat-file", "--batch-check"], {
    input: paths.map((filePath) => `:${filePath}\n`).join(""),
    encoding: "utf8",
    maxBuffer: COMMAND_MAX_BUFFER_BYTES,
  })
    .trimEnd()
    .split("\n");
  if (headers.length !== paths.length) throw new Error("tracked verification inventory changed");
  const blobs = new Map();
  let batch = [];
  let batchBytes = 0;
  const readBatch = () => {
    if (batch.length === 0) return;
    const output = execFileSync("git", ["cat-file", "--batch"], {
      input: batch.map((entry) => `${entry.oid}\n`).join(""),
      maxBuffer: COMMAND_MAX_BUFFER_BYTES,
    });
    let offset = 0;
    for (const entry of batch) {
      const end = output.indexOf(10, offset);
      if (end === -1 || output.toString("utf8", offset, end) !== entry.header)
        throw new Error(`tracked verification blob identity changed: ${entry.filePath}`);
      const start = end + 1;
      if (output[start + entry.size] !== 10)
        throw new Error(`truncated tracked verification blob: ${entry.filePath}`);
      blobs.set(entry.filePath, output.subarray(start, start + entry.size));
      offset = start + entry.size + 1;
    }
    if (offset !== output.length) throw new Error("unexpected tracked verification batch bytes");
    batch = [];
    batchBytes = 0;
  };
  for (const [index, filePath] of paths.entries()) {
    const header = headers[index];
    const match = /^[0-9a-f]{40,64} blob (\d+)$/u.exec(header);
    if (!match) throw new Error(`cannot read tracked verification blob: ${filePath}`);
    const size = Number(match[1]);
    const bytes = size + Buffer.byteLength(header) + 2;
    if (!Number.isSafeInteger(bytes) || bytes > COMMAND_MAX_BUFFER_BYTES)
      throw new Error(`tracked verification blob exceeds the read limit: ${filePath}`);
    if (batchBytes + bytes > COMMAND_MAX_BUFFER_BYTES) readBatch();
    batch.push({ filePath, oid: header.split(" ")[0], header, size });
    batchBytes += bytes;
  }
  readBatch();
  return blobs;
}

function readTrackedFile(filePath) {
  // Validate the tracked index, including in sparse or locally dirty worktrees.
  if (!sparseBlobs) throw new Error("tracked verification snapshot was not loaded");
  const bytes = sparseBlobs.get(filePath);
  if (!bytes) throw new Error(`missing tracked verification blob: ${filePath}`);
  return bytes;
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
        maxBuffer: COMMAND_MAX_BUFFER_BYTES,
      },
    );
    return execFileSync("tar", ["-tf", tarPath], {
      encoding: "utf8",
      maxBuffer: COMMAND_MAX_BUFFER_BYTES,
    })
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
  const trackedFiles = listTrackedFiles();
  sparseBlobs = readSparseBlobs(trackedFiles);
  const offenders = [];
  for (const filePath of trackedFiles.filter((item) => isVolatileAgentplanePath(item, true))) {
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
