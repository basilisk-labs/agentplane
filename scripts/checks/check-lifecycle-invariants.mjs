import { readFileSync } from "node:fs";
import path from "node:path";

const repoRoot = process.cwd();

function read(relPath) {
  return readFileSync(path.join(repoRoot, relPath), "utf8");
}

const checks = [
  {
    name: "branch_pr route blocks unapproved plans",
    files: [
      "packages/agentplane/src/commands/shared/route-decision-blockers.ts",
      "packages/agentplane/src/commands/shared/route-decision-repair.ts",
    ],
    patterns: ["plan_not_approved", "agentplane task plan approve"],
  },
  {
    name: "branch_pr route blocks base-checkout owner execution",
    files: [
      "packages/agentplane/src/commands/shared/route-decision-blockers.ts",
      "packages/agentplane/src/commands/shared/route-decision-repair.ts",
    ],
    patterns: ["on_base_checkout", "current checkout is the base branch"],
  },
  {
    name: "branch_pr route requires close-tail after merged implementation PR",
    files: [
      "packages/agentplane/src/commands/shared/route-decision-blockers.ts",
      "packages/agentplane/src/commands/shared/route-decision-repair.ts",
    ],
    patterns: ["close_tail_missing", "agentplane task hosted-close-pr"],
  },
  {
    name: "verify state is surfaced before integration decisions",
    file: "packages/agentplane/src/commands/pr/flow-status.ts",
    patterns: ["verification", "task.verification?.state"],
  },
  {
    name: "integration queue has single active lane semantics",
    file: "packages/agentplane/src/commands/pr/integrate/queue-state.ts",
    patterns: ["activeLane", 'status === "claimed" || entry.status === "handoff"'],
  },
  {
    name: "integration queue exposes doctor handler",
    file: "packages/agentplane/src/commands/integrate-queue.command.ts",
    patterns: ["makeRunIntegrateQueueDoctorHandler", "runIntegrationQueueDoctor"],
  },
  {
    name: "integration queue terminalization follows provider PR and close-tail evidence",
    files: [
      "packages/agentplane/src/commands/integrate-queue-recovery.ts",
      "packages/agentplane/src/commands/integrate-queue-doctor-command.ts",
      "packages/agentplane/src/commands/integrate-queue-lane.ts",
    ],
    patterns: [
      "task has pre-merge closure but remote PR is still open",
      'report.closeTail.state === "recorded_on_base"',
      "decideIntegrationQueueRecovery({ entry, report })",
    ],
  },
  {
    name: "PR checks can wait for hosted required-check rollup",
    file: "packages/agentplane/src/commands/pr/check.ts",
    patterns: ["waitForHostedChecks", "requiredChecks"],
  },
];

const failures = [];
for (const check of checks) {
  const files = check.files ?? [check.file];
  const text = files.map((file) => read(file)).join("\n");
  const missing = check.patterns.filter((pattern) => !text.includes(pattern));
  if (missing.length > 0) {
    failures.push(`${check.name}: missing ${missing.join(", ")} in ${files.join(", ")}`);
  }
}

if (failures.length > 0) {
  process.stderr.write(`Lifecycle invariant check failed:\n- ${failures.join("\n- ")}\n`);
  throw new Error("Lifecycle invariant check failed");
}

process.stdout.write(`Lifecycle invariant check OK (${checks.length} invariants)\n`);
