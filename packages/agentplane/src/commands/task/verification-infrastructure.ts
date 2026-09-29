import path from "node:path";
import { isManagedTaskArtifact } from "../shared/quality-review-target.js";
import { readDirectRepositoryStatus, readDirectTaskHead } from "./direct-task-finalization.js";
import { mkdir } from "node:fs/promises";
import { taskCentricDigest } from "@agentplaneorg/core/tasks";
import { isRuntimeInfrastructureError } from "../../shared/runtime-env.js";
import { isRecord } from "../../shared/guards.js";
import {
  readStableRegularTextNoFollow,
  writeNewStableRegularFileNoFollow,
} from "../../shared/stable-file.js";
import { resolveCommandGitCommonDir, type CommandContext } from "../shared/task-backend.js";
import type { DirectTaskVerificationResult } from "./direct-task-verification.js";

/** Test output is not an infrastructure diagnosis. Only native process errors qualify. */
export function isVerificationInfrastructureError(error: unknown): boolean {
  const code = (error as NodeJS.ErrnoException | null)?.code;
  return isRuntimeInfrastructureError(error) || code === "ENOSPC" || code === "EDQUOT";
}

export function isInfrastructureVerification(
  result: Omit<DirectTaskVerificationResult, "artifact_path">,
): boolean {
  const failed = result.checks.filter((check) => check.exit_code !== 0 || check.failure_kind);
  return (
    result.status === "unsupported" &&
    failed.length > 0 &&
    failed.every((check) => check.failure_kind === "infrastructure")
  );
}

/** Called under the formal verification lease. Failed attempts never dirty the task worktree. */
export async function prepareInfrastructureVerification(opts: {
  command: CommandContext;
  task_id: string;
  implementation_commit: string;
  verification_scope?: string | null;
  identity: unknown;
  source_dirty: () => Promise<boolean>;
}) {
  if (
    !/^[A-Za-z0-9_-]+$/u.test(opts.task_id) ||
    !/^[a-f0-9]{40}(?:[a-f0-9]{24})?$/u.test(opts.implementation_commit)
  )
    throw new Error("Infrastructure verification requires an exact implementation identity.");
  const directory = path.join(
    await resolveCommandGitCommonDir(opts.command),
    "agentplane",
    "verification-retries",
    opts.task_id,
    opts.implementation_commit,
    opts.verification_scope == null
      ? "task"
      : `work-item-${taskCentricDigest(opts.verification_scope).slice(7)}`,
  );
  const identity = taskCentricDigest(opts.identity);
  let attempt = 1;
  for (; attempt <= 3; attempt++) {
    let previous: unknown;
    try {
      previous = JSON.parse(
        await readStableRegularTextNoFollow(
          path.join(directory, `attempt-${attempt}.json`),
          "infrastructure verification attempt",
        ),
      );
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code === "ENOENT") break;
      throw error;
    }
    if (
      !isRecord(previous) ||
      previous.schema_version !== 1 ||
      previous.kind !== "verification_infrastructure_attempt" ||
      previous.status !== "unsupported" ||
      previous.identity !== identity ||
      previous.task_id !== opts.task_id ||
      previous.implementation_commit !== opts.implementation_commit ||
      previous.attempt !== attempt
    )
      throw new Error(
        "Infrastructure verification retry requires an unchanged verification contract.",
      );
  }
  if (attempt > 3)
    throw new Error("Infrastructure verification retry budget exhausted after three attempts.");
  if (attempt > 1 && (await opts.source_dirty()))
    throw new Error("Infrastructure verification retry requires unchanged source files.");
  return async (result: Omit<DirectTaskVerificationResult, "artifact_path">): Promise<string> => {
    if (!isInfrastructureVerification(result))
      throw new Error("Only confirmed infrastructure failures can be retained for retry.");
    if (await opts.source_dirty())
      throw new Error("Verification changed source files; infrastructure retry is not allowed.");
    await mkdir(directory, { recursive: true, mode: 0o700 });
    const artifact = path.join(directory, `attempt-${attempt}.json`);
    await writeNewStableRegularFileNoFollow(
      artifact,
      `${JSON.stringify(
        {
          schema_version: 1,
          kind: "verification_infrastructure_attempt",
          task_id: opts.task_id,
          implementation_commit: opts.implementation_commit,
          identity,
          attempt,
          ...result,
        },
        null,
        2,
      )}\n`,
      "infrastructure verification attempt",
    );
    return artifact;
  };
}

export async function prepareInfrastructureVerificationForCheckout(
  opts: Omit<Parameters<typeof prepareInfrastructureVerification>[0], "source_dirty"> & {
    checkout: string;
  },
) {
  const head = await readDirectTaskHead(opts.checkout);
  return prepareInfrastructureVerification({
    ...opts,
    source_dirty: async () => {
      const status = await readDirectRepositoryStatus(opts.checkout);
      const prefix = `${opts.command.config.paths.workflow_dir}/${opts.task_id}/`;
      return (
        !head ||
        (await readDirectTaskHead(opts.checkout)) !== head ||
        !status ||
        status.lines.some((line) => {
          const relative = line.slice(3).trim();
          return (
            relative.includes(" -> ") ||
            relative.startsWith('"') ||
            !relative.startsWith(prefix) ||
            !isManagedTaskArtifact(relative.slice(prefix.length))
          );
        })
      );
    },
  });
}
