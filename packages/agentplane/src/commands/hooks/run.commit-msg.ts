import { readFile } from "node:fs/promises";

import { loadConfig, resolveProject } from "@agentplaneorg/core";

import { evaluatePolicy } from "../../policy/evaluate.js";
import { CliError } from "../../shared/errors.js";
import { throwIfPolicyDenied } from "../shared/policy-deny.js";
import { gitCurrentBranch } from "../shared/git-ops.js";
import { parseTaskIdFromBranch, parseTaskIdFromCloseBranch } from "../shared/git-worktree.js";
import type { HooksRunOptions } from "./run.js";

async function inferTaskIdFromBranchContext(opts: {
  gitRoot: string;
  taskPrefix: string;
}): Promise<string> {
  try {
    const branch = await gitCurrentBranch(opts.gitRoot);
    return (
      parseTaskIdFromBranch(opts.taskPrefix, branch) ?? parseTaskIdFromCloseBranch(branch) ?? ""
    );
  } catch {
    return "";
  }
}

function readCommitSubject(message: string): string {
  for (const line of message.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    return trimmed;
  }
  return "";
}

export async function runCommitMsgHook(opts: HooksRunOptions): Promise<number> {
  const messagePath = opts.args[0];
  if (!messagePath) {
    throw new CliError({
      exitCode: 2,
      code: "E_USAGE",
      message: "Missing commit message file path",
    });
  }
  const raw = await readFile(messagePath, "utf8");
  const subject = readCommitSubject(raw);

  const resolved = await resolveProject({
    cwd: opts.cwd,
    rootOverride: opts.rootOverride ?? null,
  });
  const loaded = await loadConfig(resolved.agentplaneDir);

  const taskId =
    (process.env.AGENTPLANE_TASK_ID ?? "").trim() ||
    (await inferTaskIdFromBranchContext({
      gitRoot: resolved.gitRoot,
      taskPrefix: loaded.config.branch.task_prefix,
    }));
  const statusTo = (process.env.AGENTPLANE_STATUS_TO ?? "").trim().toUpperCase();

  const emoji = subject.split(/\s+/).find(Boolean) ?? "";
  if (taskId && statusTo === "DONE" && emoji !== "✅") {
    throw new CliError({
      exitCode: 5,
      code: "E_GIT",
      message:
        "Finish commits must use a checkmark emoji.\n" +
        "Expected:\n" +
        "  ✅ <TASK_SUFFIX> <scope>: <summary>",
    });
  }

  const res = evaluatePolicy({
    action: "hook_commit_msg",
    config: loaded.config,
    taskId,
    git: { stagedPaths: [] },
    commit: { subject },
  });
  throwIfPolicyDenied(res);
  return 0;
}
