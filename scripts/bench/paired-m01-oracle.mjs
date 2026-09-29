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
const tracked = execFileSync("git", ["diff", "--name-only", "-z", "HEAD"], {
  encoding: "utf8",
});
const untracked = execFileSync("git", ["ls-files", "--others", "--exclude-standard", "-z"], {
  encoding: "utf8",
});
const paths = [...new Set(`${tracked}${untracked}`.split("\0").filter(Boolean))].toSorted();
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
