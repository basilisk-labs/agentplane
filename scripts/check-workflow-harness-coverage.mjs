import { readFile } from "node:fs/promises";
import path from "node:path";

const THRESHOLDS = [
  { file: "packages/agentplane/src/workflow-runtime/validate.ts", minBranchPct: 70 },
  { file: "packages/agentplane/src/workflow-runtime/file-ops.ts", minBranchPct: 30 },
  { file: "packages/agentplane/src/harness/state-machine.ts", minBranchPct: 60 },
  { file: "packages/agentplane/src/harness/retry-policy.ts", minBranchPct: 90 },
  { file: "packages/agentplane/src/harness/scheduler.ts", minBranchPct: 70 },
];

function branchPct(entry) {
  const branches = Object.values(entry?.b ?? {});
  let total = 0;
  let covered = 0;
  for (const branchSet of branches) {
    if (!Array.isArray(branchSet)) continue;
    for (const hit of branchSet) {
      total += 1;
      if (typeof hit === "number" && hit > 0) covered += 1;
    }
  }
  if (total === 0) return 100;
  return (covered / total) * 100;
}

function findEntry(coverage, targetRelPath) {
  const normalized = targetRelPath.replaceAll("\\", "/");
  for (const [absPath, entry] of Object.entries(coverage)) {
    const normAbs = absPath.replaceAll("\\", "/");
    if (normAbs.endsWith(`/${normalized}`) || normAbs === normalized) {
      return entry;
    }
  }
  return null;
}

async function main() {
  const reportPath = path.join(process.cwd(), "coverage", "coverage-final.json");
  const raw = await readFile(reportPath, "utf8");
  const coverage = JSON.parse(raw);
  const failures = [];

  for (const threshold of THRESHOLDS) {
    const entry = findEntry(coverage, threshold.file);
    if (!entry) {
      failures.push(`Missing coverage entry: ${threshold.file}`);
      continue;
    }
    const pct = branchPct(entry);
    if (pct < threshold.minBranchPct) {
      failures.push(
        `${threshold.file} branch=${pct.toFixed(2)}% < ${threshold.minBranchPct.toFixed(2)}%`,
      );
    } else {
      process.stdout.write(
        `OK ${threshold.file} branch=${pct.toFixed(2)}% >= ${threshold.minBranchPct.toFixed(2)}%\n`,
      );
    }
  }

  if (failures.length > 0) {
    throw new Error(failures.join("\n"));
  }
}

await main().catch((error) => {
  const message = error instanceof Error ? error.message : String(error);
  process.stderr.write(`${message}\n`);
  throw error;
});
