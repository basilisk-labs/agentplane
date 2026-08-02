import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";
import path from "node:path";

const taskId = "202608020907-FMGM4Z";
const activeBranch = `origin/task/${taskId}/assimilate-v0-6-26-maintenance-fixes-into-v0-7`;
const loopsBranch = "origin/agentplane-loops";
const loopsCheckout = process.argv[2];

if (!loopsCheckout) {
  throw new Error("usage: node verify-branch-disposition.mjs <agentplane-loops-checkout>");
}

function git(args, cwd = process.cwd()) {
  return execFileSync("git", args, { cwd, encoding: "utf8" }).trim();
}

const reportPath = path.join(
  process.cwd(),
  ".agentplane",
  "tasks",
  taskId,
  "branch-disposition.md",
);
const report = readFileSync(reportPath, "utf8");
const remoteBranches = git(["for-each-ref", "--format=%(refname:short)", "refs/remotes/origin"])
  .split("\n")
  .filter(Boolean)
  .toSorted();
const excluded = new Set(["origin", "origin/HEAD", "origin/main", loopsBranch, activeBranch]);
const inScope = remoteBranches.filter((branch) => !excluded.has(branch));
const versionRange = new Set(["origin/0.1", "origin/0.2", "origin/0.3", "origin/0.4", "origin/0.5"]);
const missing = inScope.filter(
  (branch) =>
    !(report.includes(`\`${branch}\``) ||
      (versionRange.has(branch) && report.includes("`origin/0.1` through `origin/0.5`"))),
);

if (missing.length > 0) {
  throw new Error(`remote branches missing explicit disposition: ${missing.join(", ")}`);
}
if (!report.includes(`Excluded by explicit scope: \`${loopsBranch}\`.`)) {
  throw new Error("agentplane-loops exclusion is not explicit");
}

const loopsLocalBranch = git(["symbolic-ref", "--short", "HEAD"], loopsCheckout);
const loopsHead = git(["rev-parse", "HEAD"], loopsCheckout);
const loopsRemoteHead = git(["rev-parse", loopsBranch]);
const loopsTrackedStatus = git(["status", "--short", "--untracked-files=no"], loopsCheckout);

if (loopsLocalBranch !== "agentplane-loops") {
  throw new Error(`unexpected loops checkout branch: ${loopsLocalBranch}`);
}
if (loopsHead !== loopsRemoteHead) {
  throw new Error(`agentplane-loops checkout moved: local=${loopsHead} remote=${loopsRemoteHead}`);
}
if (loopsTrackedStatus !== "") {
  throw new Error("agentplane-loops checkout has tracked mutations");
}

process.stdout.write(
  `${JSON.stringify(
    {
      result: "pass",
      task_id: taskId,
      remote_branches_observed: remoteBranches.length,
      branches_with_disposition: inScope.length,
      excluded_branches: ["origin/main", loopsBranch, activeBranch],
      agentplane_loops_head: loopsHead,
      agentplane_loops_tracked_status: "clean",
    },
    null,
    2,
  )}\n`,
);
