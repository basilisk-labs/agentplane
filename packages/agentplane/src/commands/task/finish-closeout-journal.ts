import { createHash } from "node:crypto";
import { mkdir, readFile } from "node:fs/promises";
import path from "node:path";

import { canonicalizeJson } from "@agentplaneorg/core/tasks";

import { writeJsonStableIfChanged } from "../../shared/write-if-changed.js";
import { resolveCommandGitCommonDir, type CommandContext } from "../shared/task-backend.js";
import type { FinishExecutionPlan, FinishOptions } from "./finish-types.js";

export type FinishCloseoutState =
  | "prepared"
  | "task_state_written"
  | "close_commit_written"
  | "completed"
  | "recovery_required";

export type FinishCloseoutJournal = {
  schema_version: 1;
  kind: "agentplane.finish_closeout";
  task_ids: string[];
  request_digest: `sha256:${string}`;
  execution_digest: `sha256:${string}`;
  state: FinishCloseoutState;
  updated_at: string;
  previous_state?: FinishCloseoutState;
  recovery?: { error: string; command: string };
};

function digest(value: unknown): `sha256:${string}` {
  return `sha256:${createHash("sha256")
    .update(JSON.stringify(canonicalizeJson(value)))
    .digest("hex")}`;
}

function safeTaskId(taskId: string): string {
  if (!/^[A-Za-z0-9][A-Za-z0-9._-]*$/u.test(taskId)) {
    throw new Error(`Finish closeout task id is not portable: ${taskId}`);
  }
  return taskId;
}

async function readJournal(filePath: string): Promise<FinishCloseoutJournal | null> {
  try {
    const value = JSON.parse(await readFile(filePath, "utf8")) as FinishCloseoutJournal;
    return value?.kind === "agentplane.finish_closeout" && value.schema_version === 1
      ? value
      : null;
  } catch (error) {
    if ((error as NodeJS.ErrnoException | null)?.code === "ENOENT") return null;
    throw error;
  }
}

function resumeState(
  journal: FinishCloseoutJournal,
): Exclude<FinishCloseoutState, "recovery_required"> {
  if (journal.state !== "recovery_required") return journal.state;
  return journal.previous_state && journal.previous_state !== "recovery_required"
    ? journal.previous_state
    : "prepared";
}

export async function openFinishCloseoutJournal(opts: {
  ctx: CommandContext;
  options: FinishOptions;
  plan: FinishExecutionPlan;
}): Promise<{ path: string; journal: FinishCloseoutJournal }> {
  const primaryTaskId = safeTaskId(opts.plan.primaryTaskId || opts.options.taskIds[0] || "");
  const commonDir = await resolveCommandGitCommonDir(opts.ctx);
  const directory = path.join(commonDir, "agentplane", "finish-closeout");
  const filePath = path.join(directory, `${primaryTaskId}.json`);
  const execution_digest = digest(opts.plan.execution);
  const request_digest = digest({
    task_ids: opts.options.taskIds,
    author: opts.options.author,
    body: opts.options.body,
    result: opts.options.result ?? null,
    commit: opts.options.commit ?? null,
    implementation_commit: opts.options.implementationCommit ?? null,
    execution_digest,
  });
  const existing = await readJournal(filePath);
  if (existing && existing.state !== "completed" && existing.request_digest !== request_digest) {
    throw new Error(
      `Finish closeout for ${primaryTaskId} requires recovery before a different request can run (${filePath}).`,
    );
  }
  if (existing && existing.state !== "completed") {
    return {
      path: filePath,
      journal: {
        ...existing,
        state: resumeState(existing),
      },
    };
  }
  const journal: FinishCloseoutJournal = {
    schema_version: 1,
    kind: "agentplane.finish_closeout",
    task_ids: [...opts.options.taskIds],
    request_digest,
    execution_digest,
    state: "prepared",
    updated_at: new Date().toISOString(),
  };
  await mkdir(directory, { recursive: true });
  await writeJsonStableIfChanged(filePath, journal);
  return { path: filePath, journal };
}

export async function advanceFinishCloseoutJournal(opts: {
  path: string;
  journal: FinishCloseoutJournal;
  state: Exclude<FinishCloseoutState, "recovery_required">;
}): Promise<FinishCloseoutJournal> {
  const next: FinishCloseoutJournal = {
    ...opts.journal,
    previous_state: opts.journal.state,
    state: opts.state,
    updated_at: new Date().toISOString(),
    recovery: undefined,
  };
  await writeJsonStableIfChanged(opts.path, next);
  return next;
}

export async function markFinishCloseoutRecoveryRequired(opts: {
  path: string;
  journal: FinishCloseoutJournal;
  error: unknown;
  taskId: string;
}): Promise<void> {
  await writeJsonStableIfChanged(opts.path, {
    ...opts.journal,
    previous_state: opts.journal.state,
    state: "recovery_required",
    updated_at: new Date().toISOString(),
    recovery: {
      error: opts.error instanceof Error ? opts.error.message : String(opts.error),
      command: `agentplane finish ${opts.taskId} --force <repeat-the-original-finish-options>`,
    },
  } satisfies FinishCloseoutJournal);
}
