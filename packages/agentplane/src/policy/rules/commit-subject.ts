import { validateCommitSubject } from "@agentplaneorg/core/commit";

import { gitError, okResult } from "../result.js";
import type { PolicyContext, PolicyResult } from "../model.js";

export function commitSubjectRule(ctx: PolicyContext): PolicyResult {
  const subject = (ctx.commit?.subject ?? "").trim();
  if (!subject) {
    return { ok: false, errors: [gitError("Commit message subject is empty")], warnings: [] };
  }

  const policy = validateCommitSubject({
    subject,
    taskId: (ctx.taskId ?? "").trim() || undefined,
    genericTokens: ctx.config.commit.generic_tokens,
    taskIntent: ctx.commit?.taskIntent,
    allowHumanTaskSubject: ctx.commit?.allowHumanTaskSubject,
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
