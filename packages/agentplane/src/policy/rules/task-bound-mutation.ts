import type { CommitTaskIntent } from "@agentplaneorg/core/commit";

import { gitPathIsUnderPrefix } from "../../shared/git-path.js";
import { protectedPathKindForFile } from "../../shared/protected-paths.js";
import { gitError, okResult } from "../result.js";
import type { PolicyContext, PolicyResult } from "../model.js";

const DOC_FILE_RE = /(^|\/)(README|CHANGELOG|CONTRIBUTING|LICENSE)(\.[^/]*)?$/i;
const DOC_EXT_RE = /\.(md|mdx|txt|adoc|rst)$/i;

function isDocsOnlyPath(filePath: string): boolean {
  return (
    DOC_FILE_RE.test(filePath) ||
    DOC_EXT_RE.test(filePath) ||
    gitPathIsUnderPrefix(filePath, "docs") ||
    gitPathIsUnderPrefix(filePath, "website/docs")
  );
}

function isTaskArtifactPath(ctx: PolicyContext, filePath: string): boolean {
  return (
    protectedPathKindForFile({
      filePath,
      tasksPath: ctx.config.paths.tasks_path,
      workflowDir: ctx.config.paths.workflow_dir,
      taskId: ctx.taskId,
    }) === "tasks"
  );
}

function isDocsOrContentIntent(intent?: CommitTaskIntent): boolean {
  if (!intent) return false;
  return (
    intent.mutationScope === "docs" ||
    intent.taskKind === "content" ||
    intent.blueprintRequest === "docs.change" ||
    intent.blueprintRequest === "content.light"
  );
}

function isNonMutatingIntent(intent?: CommitTaskIntent): boolean {
  if (!intent) return false;
  return intent.mutationScope === "none" || intent.blueprintRequest === "analysis.light";
}

function hasDeployFixEvidence(subject: string, body?: string): boolean {
  if (!/^🚑\s+deploy-fix:\s+\S+/u.test(subject) && !/^deploy-fix:\s+\S+/u.test(subject)) {
    return false;
  }
  const message = body ?? "";
  if (!/^Deploy-Fix:\s*true\s*$/im.test(message)) return false;
  const evidence = /^Deploy-Fix-Evidence:\s*(.+)$/im.exec(message)?.[1]?.trim() ?? "";
  return evidence.length >= 12;
}

export function stagedMutationRequiresTaskRule(ctx: PolicyContext): PolicyResult {
  const staged = ctx.git.stagedPaths ?? [];
  if (staged.length === 0) return okResult();
  if (ctx.allow?.allowUpgrade === true) return okResult();

  const scoped = staged.filter((filePath) => !isTaskArtifactPath(ctx, filePath));
  if (scoped.length === 0) return okResult();

  const mutating = scoped.filter((filePath) => !isDocsOnlyPath(filePath));
  if (mutating.length === 0) return okResult();

  const taskId = (ctx.taskId ?? "").trim();
  if (!taskId) {
    if (hasDeployFixEvidence((ctx.commit?.subject ?? "").trim(), ctx.commit?.body)) {
      return okResult();
    }
    return {
      ok: false,
      errors: [
        gitError(
          [
            "Mutating staged paths require an active AgentPlane task.",
            "Fix:",
            "  1) Work from task/<task-id>/<slug> or set AGENTPLANE_TASK_ID=<task-id>.",
            "  2) Or include a valid task id in the commit subject so commit-msg/pre-push can bind it.",
            "  3) Emergency hotfixes must use explicit emergency backfill evidence and are checked at pre-push.",
            "  4) Tiny deploy-only fixes may use subject `🚑 deploy-fix: ...` plus trailers `Deploy-Fix: true` and `Deploy-Fix-Evidence: <evidence>`.",
            `Mutating paths: ${mutating.slice(0, 8).join(", ")}${mutating.length > 8 ? ", ..." : ""}`,
          ].join("\n"),
        ),
      ],
      warnings: [],
    };
  }

  if (
    isNonMutatingIntent(ctx.commit?.taskIntent) ||
    isDocsOrContentIntent(ctx.commit?.taskIntent)
  ) {
    return {
      ok: false,
      errors: [
        gitError(
          [
            `Task ${taskId} is not allowed to commit implementation-mutating paths.`,
            "Use a code/release/ops task for implementation changes, or keep this task to docs-only paths.",
            `Mutating paths: ${mutating.slice(0, 8).join(", ")}${mutating.length > 8 ? ", ..." : ""}`,
          ].join("\n"),
        ),
      ],
      warnings: [],
    };
  }

  return okResult();
}
