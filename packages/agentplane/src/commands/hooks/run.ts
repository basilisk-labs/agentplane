import { mapBackendError } from "../../cli/error-map.js";
import { CliError } from "../../shared/errors.js";
import { withGitMutationMutex } from "../../shared/git-mutation.js";
import {
  hookCapabilityDiagnosticContext,
  resolveHookCapability,
  withHookCapabilityEnvironment,
} from "./capabilities.js";
import type { HookName } from "./shared.js";
import { runCommitMsgHook } from "./run.commit-msg.js";
import { runPostMergeHook } from "./run.post-merge.js";
import { runPreCommitHook } from "./run.pre-commit.js";
import { runPrePushHook } from "./run.pre-push.js";

export type HooksRunOptions = {
  cwd: string;
  rootOverride?: string;
  hook: HookName;
  args: string[];
};

async function runHook(opts: HooksRunOptions): Promise<number> {
  switch (opts.hook) {
    case "commit-msg": {
      return await runCommitMsgHook(opts);
    }
    case "pre-commit": {
      return await runPreCommitHook(opts);
    }
    case "pre-push": {
      return await runPrePushHook(opts);
    }
    case "post-merge": {
      return await runPostMergeHook(opts);
    }
  }
}

async function runHookWithGitMutationMutex(
  capability: ReturnType<typeof resolveHookCapability>,
  opts: HooksRunOptions,
): Promise<number> {
  if (capability.gitIndexWriteIntent !== "worktree_mutex_required") {
    return withHookCapabilityEnvironment(capability, () => runHook(opts));
  }

  return withGitMutationMutex(
    {
      repoRoot: opts.rootOverride ?? opts.cwd,
      operation: `git-hook-${opts.hook}`,
      mutationKind: capability.mutationKind,
      workflowMode: process.env.AGENTPLANE_WORKFLOW_MODE,
      taskId: (process.env.AGENTPLANE_TASK_ID ?? "").trim() || undefined,
    },
    () => withHookCapabilityEnvironment(capability, () => runHook(opts)),
  );
}

export async function cmdHooksRun(opts: HooksRunOptions): Promise<number> {
  const capability = resolveHookCapability(opts.hook);
  try {
    return await runHookWithGitMutationMutex(capability, opts);
  } catch (err) {
    const status = (err as { status?: unknown } | null)?.status;
    const stdout = (err as { stdout?: unknown } | null)?.stdout;
    const stderr = (err as { stderr?: unknown } | null)?.stderr;
    if (typeof stdout === "string" && stdout.length > 0) process.stdout.write(stdout);
    if (typeof stderr === "string" && stderr.length > 0) process.stderr.write(stderr);
    if (typeof status === "number" && Number.isInteger(status) && status >= 0) {
      return status;
    }
    if (err instanceof CliError) {
      const context = hookCapabilityDiagnosticContext(capability);
      if (err.context) Object.assign(context, err.context);
      throw new CliError({
        exitCode: err.exitCode,
        code: err.code,
        message: err.message,
        context,
      });
    }
    throw mapBackendError(err, {
      command: `hooks run ${opts.hook}`,
      root: opts.rootOverride ?? null,
    });
  }
}
