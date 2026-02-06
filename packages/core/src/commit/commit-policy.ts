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

function isGenericAfterStrippingTaskRef(opts: {
  subject: string;
  taskId: string;
  suffix: string;
  genericTokens: string[];
}): boolean {
  const normalized = stripPunctuation(opts.subject).toLowerCase().trim();
  if (!normalized) return true;

  const taskId = opts.taskId.toLowerCase();
  const suffix = opts.suffix.toLowerCase();
  const tokenSet = new Set(opts.genericTokens.map((t) => t.toLowerCase()));

  const words = normalized
    .split(/\s+/)
    .filter(Boolean)
    .filter((w) => w !== taskId && (suffix.length === 0 || w !== suffix));

  if (words.length === 0) return true;

  const nonGenericCount = words.filter((w) => !tokenSet.has(w)).length;

  // Require at least two meaningful words after stripping task refs,
  // and at least one of them must be non-generic.
  return words.length < 2 || nonGenericCount < 1;
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
  const subjectLower = subject.toLowerCase();
  const taskIdLower = opts.taskId.toLowerCase();
  const suffixLower = suffix.toLowerCase();
  if (
    !subjectLower.includes(taskIdLower) &&
    (suffixLower.length === 0 || !subjectLower.includes(suffixLower))
  ) {
    errors.push("commit subject must include task id or suffix");
  }

  if (
    isGenericAfterStrippingTaskRef({
      subject,
      taskId: opts.taskId,
      suffix,
      genericTokens: opts.genericTokens,
    })
  ) {
    errors.push("commit subject is too generic");
  }

  return { ok: errors.length === 0, errors };
}
