export type CommitPolicyResult = {
  ok: boolean;
  errors: string[];
};

function stripPunctuation(input: string): string {
  return input.replaceAll(/[^\p{L}\p{N}\s-]/gu, " ");
}

export function extractTaskSuffix(taskId: string): string {
  const parts = taskId.split("-");
  return parts.at(-1) ?? "";
}

export function isGenericSubject(subject: string, genericTokens: string[]): boolean {
  const normalized = stripPunctuation(subject).toLowerCase().trim();
  if (!normalized) return true;
  const words = normalized.split(/\s+/).filter(Boolean);
  if (words.length === 0) return true;
  const tokenSet = new Set(genericTokens.map((t) => t.toLowerCase()));
  return words.length <= 3 && words.every((w) => tokenSet.has(w));
}

export function validateCommitSubject(opts: {
  subject: string;
  taskId: string;
  genericTokens: string[];
}): CommitPolicyResult {
  const errors: string[] = [];
  const subject = opts.subject.trim();
  if (!subject) errors.push("commit subject must be non-empty");

  const suffix = extractTaskSuffix(opts.taskId);
  if (!subject.includes(opts.taskId) && (suffix.length === 0 || !subject.includes(suffix))) {
    errors.push("commit subject must include task id or suffix");
  }

  if (isGenericSubject(subject, opts.genericTokens)) {
    errors.push("commit subject is too generic");
  }

  return { ok: errors.length === 0, errors };
}
