import { execFileSync } from "node:child_process";

import { parseScriptArgs } from "../lib/script-runtime.mjs";

function git(args) {
  return execFileSync("git", args, { encoding: "utf8" }).trim();
}

function main() {
  const { flags } = parseScriptArgs(process.argv.slice(2), {
    valueFlags: ["task-id", "base"],
    booleanFlags: ["json"],
  });
  const taskId = String(flags["task-id"] ?? process.env.AGENTPLANE_TASK_ID ?? "").trim();
  const base = String(flags.base ?? "HEAD").trim();
  const branch = git(["rev-parse", "--abbrev-ref", "HEAD"]);
  const changed = git(["diff", "--name-only", "--diff-filter=ACMR", base])
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
  const untracked = git(["ls-files", "--others", "--exclude-standard"])
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
  const errors = [];
  if (taskId && !branch.includes(taskId)) {
    errors.push(`current branch ${branch} does not include task id ${taskId}`);
  }
  if (branch === "main" && changed.length > 0) {
    errors.push("tracked changes are present on main; branch_pr work must use a task worktree");
  }
  const report = {
    schema_version: 1,
    ok: errors.length === 0,
    task_id: taskId || null,
    branch,
    changed: [...new Set([...changed, ...untracked])].toSorted(),
    errors,
  };
  if (flags.json === true) {
    process.stdout.write(`${JSON.stringify(report, null, 2)}\n`);
  } else if (report.ok) {
    process.stdout.write(`ok: task scope looks coherent on ${branch}\n`);
  } else {
    process.stderr.write(`task scope check failed:\n- ${errors.join("\n- ")}\n`);
  }
  process.exitCode = report.ok ? 0 : 1;
}

try {
  main();
} catch (error) {
  process.stderr.write(`error: ${error instanceof Error ? error.message : String(error)}\n`);
  process.exitCode = 1;
}
