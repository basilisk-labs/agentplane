export type CommitPolicyResult = {
  ok: boolean;
  errors: string[];
};

export type CommitTaskIntent = {
  taskKind?: "analysis" | "content" | "docs" | "code" | "release" | "ops" | "context";
  mutationScope?: "none" | "docs" | "code" | "release" | "ops" | "context" | "unknown";
  blueprintRequest?:
    | "analysis.light"
    | "content.light"
    | "docs.change"
    | "code.direct"
    | "code.branch_pr"
    | "performance.benchmark"
    | "quality.regression"
    | "context.assimilation"
    | "runner.execution"
    | "post_run.improvement_review"
    | "release.strict"
    | "ops.approval";
  tags?: string[];
};

const NON_TASK_SUFFIX = "DEV";
const SCOPE_PATTERN = "[a-z][a-z0-9_-]*(?:/[a-z0-9_-]+)*";
export const TASK_INTENT_COMMIT_SCOPES = [
  "analysis",
  "content",
  "docs",
  "code",
  "release",
  "ops",
  "task",
  "close",
  "integrate",
] as const;
const STATUS_SUMMARY_TOKENS = new Set([
  "todo",
  "doing",
  "blocked",
  "done",
  "verified",
  "finished",
  "exported",
  "status-transition",
]);

function stripPunctuation(input: string): string {
  return input.replaceAll(/[^\p{L}\p{N}\s-]/gu, " ");
}

function normalizeSummaryText(input: string): string {
  return stripPunctuation(input).toLowerCase().trim().replaceAll(/\s+/g, " ");
}

function rootScope(scope: string): string {
  return scope.trim().toLowerCase().split("/")[0] ?? "";
}

export function commitScopesForTaskIntent(intent: CommitTaskIntent): string[] {
  const scopes = new Set<string>();
  if (
    intent.mutationScope &&
    intent.mutationScope !== "none" &&
    intent.mutationScope !== "unknown"
  ) {
    scopes.add(intent.mutationScope);
  }
  if (intent.taskKind) scopes.add(intent.taskKind);
  if (intent.blueprintRequest) scopes.add(intent.blueprintRequest.split(".")[0] ?? "");
  for (const tag of intent.tags ?? []) {
    const normalized = rootScope(tag);
    if (normalized && new RegExp(`^${SCOPE_PATTERN}$`).test(normalized)) scopes.add(normalized);
  }
  return [...scopes].filter(Boolean).toSorted();
}

export function isTaskIntentCommitScope(opts: {
  scope: string;
  intent: CommitTaskIntent;
  lifecycleScopes?: readonly string[];
}): boolean {
  const normalizedScope = rootScope(opts.scope);
  const lifecycleScopes = new Set(opts.lifecycleScopes ?? ["task", "close", "integrate"]);
  if (lifecycleScopes.has(normalizedScope)) return true;
  const allowed = new Set(commitScopesForTaskIntent(opts.intent));
  return allowed.size === 0 || allowed.has(normalizedScope);
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

export function parseTaskSubjectTemplate(subject: string): {
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

  const scopeMatch = new RegExp(String.raw`^(${SCOPE_PATTERN}):\s+(.+)$`).exec(rest);
  if (!scopeMatch) return null;
  const scope = scopeMatch[1] ?? "";
  const summary = (scopeMatch[2] ?? "").trim();
  if (!scope || !summary) return null;

  return { emoji, suffix, scope, summary };
}

const TASK_ARTIFACT_REFRESH_SUMMARY = "refresh task artifacts after commit";

export function buildTaskArtifactRefreshCommitSubject(opts: {
  taskId: string;
  baseSubject?: string | null;
  defaultEmoji?: string;
  defaultScope?: string;
}): string {
  const suffix = extractTaskSuffix(opts.taskId);
  const parsed = parseTaskSubjectTemplate(opts.baseSubject ?? "");
  const canInherit = parsed !== null && parsed.suffix.toLowerCase() === suffix.toLowerCase();
  const emoji = canInherit ? parsed.emoji : (opts.defaultEmoji ?? "🧩");
  const scope = canInherit ? parsed.scope : (opts.defaultScope ?? "task");
  return `${emoji} ${suffix} ${scope}: ${TASK_ARTIFACT_REFRESH_SUMMARY}`;
}

export function isTaskArtifactRefreshCommitSubject(opts: {
  subject: string;
  taskId?: string | null;
}): boolean {
  const parsed = parseTaskSubjectTemplate(opts.subject);
  if (!parsed) return false;
  const taskId = (opts.taskId ?? "").trim();
  if (taskId && parsed.suffix.toLowerCase() !== extractTaskSuffix(taskId).toLowerCase()) {
    return false;
  }
  return normalizeSummaryText(parsed.summary) === TASK_ARTIFACT_REFRESH_SUMMARY;
}

function parseNonTaskSubjectTemplate(subject: string): {
  emoji: string;
  scope: string;
  summary: string;
} | null {
  const trimmed = subject.trim();
  if (!trimmed) return null;

  // Non-task: `<emoji> <scope>: <summary>`
  const match = new RegExp(String.raw`^(\S+)\s+(${SCOPE_PATTERN}):\s+(.+)$`).exec(trimmed);
  if (!match) return null;
  const emoji = match[1] ?? "";
  const scope = match[2] ?? "";
  const summary = (match[3] ?? "").trim();
  if (!emoji || !scope || !summary) return null;
  return { emoji, scope, summary };
}

function parseHumanTaskSubjectTemplate(subject: string): {
  scope: string;
  summary: string;
} | null {
  const trimmed = subject.trim();
  if (!trimmed) return null;

  const match = new RegExp(String.raw`^(${SCOPE_PATTERN}):\s+(.+)$`).exec(trimmed);
  if (!match) return null;
  const scope = match[1] ?? "";
  const summary = (match[2] ?? "").trim();
  if (!scope || !summary) return null;
  return { scope, summary };
}

export function validateCommitSubject(opts: {
  subject: string;
  taskId?: string;
  genericTokens: string[];
  taskIntent?: CommitTaskIntent;
  allowHumanTaskSubject?: boolean;
}): CommitPolicyResult {
  const errors: string[] = [];
  const subject = opts.subject.trim();
  if (!subject) errors.push("commit subject must be non-empty");

  const taskId = (opts.taskId ?? "").trim();
  const taskSuffix = taskId ? extractTaskSuffix(taskId) : "";

  if (taskSuffix) {
    const template = parseTaskSubjectTemplate(subject);
    if (template) {
      if (template.suffix.toLowerCase() !== taskSuffix.toLowerCase()) {
        errors.push("commit subject must include the task suffix as the second token");
      }
      if (
        opts.taskIntent &&
        !isTaskIntentCommitScope({ scope: template.scope, intent: opts.taskIntent })
      ) {
        const expected =
          commitScopesForTaskIntent(opts.taskIntent).join(", ") || "task intent scope";
        errors.push(
          `commit scope '${template.scope}' does not match task intent; expected one of: ${expected}, task, close, integrate`,
        );
      }
    } else {
      const humanTaskSubject = opts.allowHumanTaskSubject
        ? parseHumanTaskSubjectTemplate(subject)
        : null;
      if (!humanTaskSubject) {
        errors.push(
          "commit subject must match: <emoji> <suffix> <scope>: <summary>",
          `example: ✅ ${taskSuffix} close: <summary>`,
          `example: 🚧 ${taskSuffix} task: <summary>`,
        );
        return { ok: false, errors };
      }
      if (
        opts.taskIntent &&
        !isTaskIntentCommitScope({ scope: humanTaskSubject.scope, intent: opts.taskIntent })
      ) {
        const expected =
          commitScopesForTaskIntent(opts.taskIntent).join(", ") || "task intent scope";
        errors.push(
          `commit scope '${humanTaskSubject.scope}' does not match task intent; expected one of: ${expected}, task, close, integrate`,
        );
      }
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
    parseHumanTaskSubjectTemplate(subject) ??
    parseNonTaskSubjectTemplate(subject) ??
    (() => {
      const t = parseTaskSubjectTemplate(subject);
      return t ? { summary: t.summary } : null;
    })();
  const summary = parsedForSummary?.summary ?? "";
  const normalizedSummary = normalizeSummaryText(summary);
  if (!normalizedSummary) {
    errors.push("commit subject is too generic");
    return { ok: errors.length === 0, errors };
  }
  const words = normalizedSummary.split(/\s+/).filter(Boolean);
  const tokenSet = new Set(opts.genericTokens.map((t) => t.toLowerCase()));
  const nonGenericCount = words.filter((w) => !tokenSet.has(w)).length;

  const isStatusSummary = words.length === 1 && STATUS_SUMMARY_TOKENS.has(words[0] ?? "");
  // Require at least two words in the summary and at least one non-generic token,
  // except status-style one-word summaries used by status commits.
  if (!isStatusSummary && (words.length < 2 || nonGenericCount < 1)) {
    errors.push("commit subject is too generic");
  }

  return { ok: errors.length === 0, errors };
}
