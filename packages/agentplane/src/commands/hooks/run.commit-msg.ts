import { resolveProject } from "@agentplaneorg/core/project";
import { parseTaskReadme } from "@agentplaneorg/core/tasks";
import { readFile } from "node:fs/promises";
import path from "node:path";
import type { CommitTaskIntent } from "@agentplaneorg/core/commit";

import { loadConfig } from "@agentplaneorg/core/config";

import { evaluatePolicy } from "../../policy/evaluate.js";
import { CliError } from "../../shared/errors.js";
import { throwIfPolicyDenied } from "../shared/policy-deny.js";
import { gitCurrentBranch } from "../shared/git-ops.js";
import { assertDcoSignoff } from "../guard/impl/dco.js";
import { parseTaskIdFromBranch, parseTaskIdFromCloseBranch } from "@agentplaneorg/core/git";
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

function stringValue<T extends string>(value: unknown, allowed: Set<string>): T | undefined {
  return typeof value === "string" && allowed.has(value) ? (value as T) : undefined;
}

async function readTaskIntent(opts: {
  gitRoot: string;
  workflowDir: string;
  taskId: string;
}): Promise<CommitTaskIntent | undefined> {
  const taskReadmePath = path.join(opts.gitRoot, opts.workflowDir, opts.taskId, "README.md");
  let parsed;
  try {
    parsed = parseTaskReadme(await readFile(taskReadmePath, "utf8"));
  } catch {
    return undefined;
  }
  const fm = parsed.frontmatter;
  const intent: CommitTaskIntent = {
    taskKind: stringValue(
      fm.task_kind,
      new Set(["analysis", "content", "docs", "code", "release", "ops"]),
    ),
    mutationScope: stringValue(
      fm.mutation_scope,
      new Set(["none", "docs", "code", "release", "ops", "unknown"]),
    ),
    blueprintRequest: stringValue(
      fm.blueprint_request,
      new Set([
        "analysis.light",
        "content.light",
        "docs.change",
        "code.direct",
        "code.branch_pr",
        "release.strict",
        "ops.approval",
      ]),
    ),
  };
  return intent.taskKind || intent.mutationScope || intent.blueprintRequest ? intent : undefined;
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
  const taskIntent = taskId
    ? await readTaskIntent({
        gitRoot: resolved.gitRoot,
        workflowDir: loaded.config.paths.workflow_dir,
        taskId,
      })
    : undefined;

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
    commit: { subject, taskIntent },
  });
  throwIfPolicyDenied(res);
  try {
    assertDcoSignoff({ config: loaded.config, message: raw });
  } catch (err) {
    throw new CliError({
      exitCode: 5,
      code: "E_GIT",
      message: err instanceof Error ? err.message : String(err),
    });
  }
  return 0;
}
