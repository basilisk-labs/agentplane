import { runCliSilent } from "./run-cli.test-helpers.js";

export async function approveTaskPlan(root: string, taskId: string): Promise<void> {
  await runCliSilent([
    "task",
    "plan",
    "set",
    taskId,
    "--text",
    "1) Do the work\n2) Verify the work",
    "--updated-by",
    "ORCHESTRATOR",
    "--root",
    root,
  ]);
  await runCliSilent([
    "task",
    "plan",
    "approve",
    taskId,
    "--by",
    "USER",
    "--note",
    "OK",
    "--root",
    root,
  ]);
}

export async function recordVerificationOk(root: string, taskId: string): Promise<void> {
  await runCliSilent([
    "verify",
    taskId,
    "--ok",
    "--by",
    "REVIEWER",
    "--note",
    "Ok to integrate",
    "--quiet",
    "--root",
    root,
  ]);
}
