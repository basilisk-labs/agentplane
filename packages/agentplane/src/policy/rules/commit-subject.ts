import { validateCommitSubject } from "@agentplaneorg/core";

import { gitError, okResult } from "../result.js";
import type { PolicyContext, PolicyResult } from "../types.js";

export function commitSubjectRule(ctx: PolicyContext): PolicyResult {
  const subject = (ctx.commit?.subject ?? "").trim();
  if (!subject) {
    return { ok: false, errors: [gitError("Commit message subject is empty")], warnings: [] };
  }

  const taskId = (ctx.taskId ?? "").trim();
  if (!taskId) {
    return {
      ok: false,
      errors: [
        gitError(
          ctx.action === "hook_commit_msg"
            ? "AGENTPLANE_TASK_ID is required (use `agentplane commit ...`)"
            : "Task id is required for commit subject validation",
        ),
      ],
      warnings: [],
    };
  }

  const policy = validateCommitSubject({
    subject,
    taskId,
    genericTokens: ctx.config.commit.generic_tokens,
  });
  if (!policy.ok) {
    return {
      ok: false,
      errors: policy.errors.map((msg) => gitError(msg)),
      warnings: [],
    };
  }
  return okResult();
}
