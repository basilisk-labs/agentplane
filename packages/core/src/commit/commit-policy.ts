export type CommitPolicyResult = {
  ok: boolean;
  errors: string[];
};

const NON_TASK_SUFFIX = "DEV";

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

function parseTaskSubjectTemplate(subject: string): {
  emoji: string;
  suffix: string;
  scope: string;
  summary: string;
} | null {
  const trimmed = subject.trim();
  if (!trimmed) return null;

  const match = /^(\S+)\s+(\S+)\s+(.+)$/.exec(trimmed);
  if (!match) return null;

  const emoji = match[1] ?? "";
  const suffix = match[2] ?? "";
  const rest = (match[3] ?? "").trim();
  if (!emoji || !suffix || !rest) return null;

  const scopeMatch = /^([a-z][a-z0-9_-]*):\s+(.+)$/.exec(rest);
  if (!scopeMatch) return null;
  const scope = scopeMatch[1] ?? "";
  const summary = (scopeMatch[2] ?? "").trim();
  if (!scope || !summary) return null;

  return { emoji, suffix, scope, summary };
}

function parseNonTaskSubjectTemplate(subject: string): {
  emoji: string;
  scope: string;
  summary: string;
} | null {
  const trimmed = subject.trim();
  if (!trimmed) return null;

  // Non-task: `<emoji> <scope>: <summary>`
  const match = /^(\S+)\s+([a-z][a-z0-9_-]*):\s+(.+)$/.exec(trimmed);
  if (!match) return null;
  const emoji = match[1] ?? "";
  const scope = match[2] ?? "";
  const summary = (match[3] ?? "").trim();
  if (!emoji || !scope || !summary) return null;
  return { emoji, scope, summary };
}

export function validateCommitSubject(opts: {
  subject: string;
  taskId?: string;
  genericTokens: string[];
}): CommitPolicyResult {
  const errors: string[] = [];
  const subject = opts.subject.trim();
  if (!subject) errors.push("commit subject must be non-empty");

  const taskId = (opts.taskId ?? "").trim();
  const taskSuffix = taskId ? extractTaskSuffix(taskId) : "";

  if (taskSuffix) {
    const template = parseTaskSubjectTemplate(subject);
    if (!template) {
      errors.push(
        "commit subject must match: <emoji> <suffix> <scope>: <summary>",
        `example: ✅ ${taskSuffix} close: <summary>`,
        `example: 🚧 ${taskSuffix} task: <summary>`,
      );
      return { ok: false, errors };
    }
    if (template.suffix.toLowerCase() !== taskSuffix.toLowerCase()) {
      errors.push("commit subject must include the task suffix as the second token");
    }
  } else {
    // Non-task commits: `<emoji> <scope>: <summary>`.
    // We also support the explicit legacy form: `<emoji> DEV <scope>: <summary>`.
    const nonTask = parseNonTaskSubjectTemplate(subject);
    if (!nonTask) {
      const taskLike = parseTaskSubjectTemplate(subject);
      if (taskLike?.suffix?.toLowerCase() === NON_TASK_SUFFIX.toLowerCase()) {
        // Explicit non-task form is allowed.
      } else {
        if (taskLike?.suffix?.toLowerCase() !== NON_TASK_SUFFIX.toLowerCase()) {
          errors.push(
            "task-like commit subject found, but task context is missing (AGENTPLANE_TASK_ID is unset)",
            "Fix:",
            "  1) Use the non-task format: <emoji> <scope>: <summary>",
            "  2) Or run the commit via agentplane so task context is set",
            "Examples:",
            "  ✨ ci: enforce full tests before push",
            "  🚧 ABCDEF task: implement upgrade allowlist (via agentplane)",
          );
          return { ok: false, errors };
        }
        errors.push(
          "non-task commit subject must match: <emoji> <scope>: <summary>",
          "example: ✨ ci: enforce full tests before push",
          `example (legacy explicit): ✨ ${NON_TASK_SUFFIX} ci: enforce full tests before push`,
        );
        return { ok: false, errors };
      }
    }
  }

  const parsedForSummary =
    parseNonTaskSubjectTemplate(subject) ??
    (() => {
      const t = parseTaskSubjectTemplate(subject);
      return t ? { summary: t.summary } : null;
    })();
  const summary = parsedForSummary?.summary ?? "";
  const normalizedSummary = stripPunctuation(summary).toLowerCase().trim();
  if (!normalizedSummary) {
    errors.push("commit subject is too generic");
    return { ok: errors.length === 0, errors };
  }
  const words = normalizedSummary.split(/\s+/).filter(Boolean);
  const tokenSet = new Set(opts.genericTokens.map((t) => t.toLowerCase()));
  const nonGenericCount = words.filter((w) => !tokenSet.has(w)).length;

  // Require at least two words in the summary and at least one non-generic token.
  if (words.length < 2 || nonGenericCount < 1) errors.push("commit subject is too generic");

  return { ok: errors.length === 0, errors };
}
