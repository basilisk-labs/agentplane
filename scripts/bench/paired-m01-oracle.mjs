#!/usr/bin/env node
import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { performance } from "node:perf_hooks";

const startedAt = performance.now();
const expected = "VERIFIED\n";
let actual = null;
try {
  actual = readFileSync("work/result.txt", "utf8");
} catch {
  // The typed result below records the missing outcome.
}
const paths = execFileSync("git", ["status", "--porcelain=v1", "--untracked-files=all"], {
  encoding: "utf8",
})
  .trim()
  .split("\n")
  .filter(Boolean)
  .map((line) => line.slice(3));
const verified = actual === expected && paths.length === 1 && paths[0] === "work/result.txt";
const outcome = JSON.stringify({ content: actual, path: "work/result.txt", verified });
process.stdout.write(
  JSON.stringify({
    verified,
    outcome_digest: `sha256:${createHash("sha256").update(outcome).digest("hex")}`,
    verifier_digest: process.env.AGENTPLANE_PAIRED_VERIFIER_DIGEST,
    duration_ms: performance.now() - startedAt,
  }),
);
