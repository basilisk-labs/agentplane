import { gitDiffNames, gitIsAncestor, gitRevParse, gitShowFile } from "@agentplaneorg/core/git";
import { canonicalizeJson, parseTaskReadme } from "@agentplaneorg/core/tasks";
import { isRecord } from "../../shared/guards.js";

const SIDE_EFFECT_AUTHORITY_EXTENSION_KEY = "agentplane.side_effect_authority";
const VERIFICATION_RESULTS_BEGIN = "<!-- BEGIN VERIFICATION RESULTS -->";
const VERIFICATION_RESULTS_END = "<!-- END VERIFICATION RESULTS -->";
const MANAGED_TASK_ARTIFACT_DIRECTORIES = [
  "quality/",
  "pr/",
  "blueprint/",
  "verification/",
  "evidence/",
  "supervision/",
] as const;

function normalizeWorkflowDir(value: string): string {
  return value.replaceAll("\\", "/").replaceAll(/\/+$/g, "");
}

function isManagedTaskArtifact(relativePath: string): boolean {
  return (
    relativePath === "README.md" ||
    MANAGED_TASK_ARTIFACT_DIRECTORIES.some((directory) => relativePath.startsWith(directory))
  );
}

function isDerivedTaskArtifact(relativePath: string): boolean {
  return MANAGED_TASK_ARTIFACT_DIRECTORIES.some((directory) => relativePath.startsWith(directory));
}

type ImplementationReceiptReadme = {
  comparable: string;
  commit: Record<string, unknown> | null;
  comments: unknown[];
  events: unknown[];
  docUpdatedAt: unknown;
  docUpdatedBy: unknown;
  status: unknown;
};

function implementationReceiptReadme(markdown: string): ImplementationReceiptReadme | null {
  try {
    const parsed = parseTaskReadme(markdown);
    const frontmatter = structuredClone(parsed.frontmatter);
    const commit = isRecord(frontmatter.commit) ? structuredClone(frontmatter.commit) : null;
    const comments = Array.isArray(frontmatter.comments)
      ? structuredClone(frontmatter.comments)
      : [];
    const events = Array.isArray(frontmatter.events) ? structuredClone(frontmatter.events) : [];
    const docUpdatedAt = frontmatter.doc_updated_at;
    const docUpdatedBy = frontmatter.doc_updated_by;
    const status = frontmatter.status;

    for (const key of [
      "revision",
      "commit",
      "comments",
      "events",
      "doc_updated_at",
      "doc_updated_by",
    ]) {
      Reflect.deleteProperty(frontmatter, key);
    }

    return {
      comparable: JSON.stringify(canonicalizeJson({ frontmatter, body: parsed.body })),
      commit,
      comments,
      events,
      docUpdatedAt,
      docUpdatedBy,
      status,
    };
  } catch {
    return null;
  }
}

function sameCanonicalJson(left: unknown, right: unknown): boolean {
  return JSON.stringify(canonicalizeJson(left)) === JSON.stringify(canonicalizeJson(right));
}

function stripManagedVerificationResults(value: string): string {
  return value.replaceAll(
    /<!-- BEGIN VERIFICATION RESULTS -->[\s\S]*?<!-- END VERIFICATION RESULTS -->/gu,
    `${VERIFICATION_RESULTS_BEGIN}\n${VERIFICATION_RESULTS_END}`,
  );
}

function lifecycleComparableTaskReadme(markdown: string): string | null {
  try {
    const parsed = parseTaskReadme(markdown);
    const frontmatter = structuredClone(parsed.frontmatter);
    for (const key of [
      "revision",
      "result_summary",
      "status",
      "verification",
      "quality_review",
      "commit",
      "comments",
      "events",
      "doc_updated_at",
      "doc_updated_by",
    ]) {
      Reflect.deleteProperty(frontmatter, key);
    }
    if (isRecord(frontmatter.sections)) {
      frontmatter.sections = Object.fromEntries(
        Object.entries(frontmatter.sections).map(([key, value]) => [
          key,
          typeof value === "string" ? stripManagedVerificationResults(value) : value,
        ]),
      );
    }
    return JSON.stringify(
      canonicalizeJson({
        frontmatter,
        body: stripManagedVerificationResults(parsed.body),
      }),
    );
  } catch {
    return null;
  }
}

type TaskReadmeAdvanceOptions = {
  gitRoot: string;
  parent: string;
  current: string;
  changed: readonly string[];
  taskRelativePath: (name: string) => string | null;
};

async function changedTaskReadmes(
  opts: TaskReadmeAdvanceOptions,
): Promise<readonly (readonly [before: string, after: string])[] | null> {
  if (
    opts.changed.length === 0 ||
    opts.changed.some((name) => opts.taskRelativePath(name) !== "README.md")
  ) {
    return null;
  }

  const readmes: (readonly [before: string, after: string])[] = [];
  for (const name of opts.changed) {
    const pair = await Promise.all([
      gitShowFile(opts.gitRoot, opts.parent, name).catch(() => null),
      gitShowFile(opts.gitRoot, opts.current, name).catch(() => null),
    ]);
    if (pair[0] === null || pair[1] === null || pair[0] === pair[1]) return null;
    readmes.push([pair[0], pair[1]]);
  }
  return readmes;
}

function appendedImplementationReceipt(opts: {
  before: ImplementationReceiptReadme;
  after: ImplementationReceiptReadme;
  parent: string;
}): boolean {
  if (
    opts.before.comparable !== opts.after.comparable ||
    opts.before.status !== "DOING" ||
    opts.after.status !== "DOING" ||
    opts.after.commit?.hash !== opts.parent ||
    typeof opts.after.commit.message !== "string" ||
    opts.after.commit.message.trim().length === 0 ||
    sameCanonicalJson(opts.before.commit, opts.after.commit) ||
    opts.after.comments.length !== opts.before.comments.length + 1 ||
    opts.after.events.length !== opts.before.events.length + 1 ||
    !sameCanonicalJson(
      opts.before.comments,
      opts.after.comments.slice(0, opts.before.comments.length),
    ) ||
    !sameCanonicalJson(opts.before.events, opts.after.events.slice(0, opts.before.events.length))
  ) {
    return false;
  }

  const comment = opts.after.comments.at(-1);
  const event = opts.after.events.at(-1);
  return (
    isRecord(comment) &&
    isRecord(event) &&
    event.type === "status" &&
    event.from === "DOING" &&
    event.to === "DOING" &&
    typeof comment.author === "string" &&
    comment.author === event.author &&
    typeof comment.body === "string" &&
    comment.body === event.note &&
    event.at === opts.after.docUpdatedAt &&
    comment.author === opts.after.docUpdatedBy
  );
}

async function isImplementationReceiptTaskReadmeAdvance(
  opts: TaskReadmeAdvanceOptions,
): Promise<boolean> {
  const readmes = await changedTaskReadmes(opts);
  if (!readmes) return false;
  for (const [beforeMarkdown, afterMarkdown] of readmes) {
    const before = implementationReceiptReadme(beforeMarkdown);
    const after = implementationReceiptReadme(afterMarkdown);
    if (
      !before ||
      !after ||
      !appendedImplementationReceipt({ before, after, parent: opts.parent })
    ) {
      return false;
    }
  }

  return true;
}

async function isLifecycleOnlyTaskReadmeAdvance(opts: TaskReadmeAdvanceOptions): Promise<boolean> {
  const readmes = await changedTaskReadmes(opts);
  if (!readmes) return false;
  for (const [before, after] of readmes) {
    const beforeComparable = lifecycleComparableTaskReadme(before);
    const afterComparable = lifecycleComparableTaskReadme(after);
    if (!beforeComparable || beforeComparable !== afterComparable) return false;
  }
  return true;
}

/**
 * Side-effect authority is formal lifecycle evidence. It is intentionally
 * excluded from semantic review freshness: otherwise a required authority
 * grant changes HEAD, invalidates the review, and creates a review/grant loop.
 */
function authorityComparableTaskReadme(markdown: string): string | null {
  try {
    const parsed = parseTaskReadme(markdown);
    const frontmatter = structuredClone(parsed.frontmatter);
    Reflect.deleteProperty(frontmatter, "revision");
    if (isRecord(frontmatter.extensions)) {
      const extensions = { ...frontmatter.extensions };
      Reflect.deleteProperty(extensions, SIDE_EFFECT_AUTHORITY_EXTENSION_KEY);
      if (Object.keys(extensions).length === 0) {
        Reflect.deleteProperty(frontmatter, "extensions");
      } else {
        frontmatter.extensions = extensions;
      }
    }
    return JSON.stringify(canonicalizeJson({ frontmatter, body: parsed.body }));
  } catch {
    return null;
  }
}

export async function isAuthorityOnlyTaskReadmeAdvance(opts: {
  gitRoot: string;
  parent: string;
  current: string;
  changed: readonly string[];
  taskRelativePath: (name: string) => string | null;
}): Promise<boolean> {
  const readmes = await changedTaskReadmes(opts);
  if (!readmes) return false;
  for (const [before, after] of readmes) {
    const beforeComparable = authorityComparableTaskReadme(before);
    const afterComparable = authorityComparableTaskReadme(after);
    if (!beforeComparable || beforeComparable !== afterComparable) return false;
  }
  return true;
}

/**
 * Resolve the commit that must be covered by a semantic quality review.
 *
 * A previously reviewed commit remains the target only while every later
 * current-task commit contains generated or lifecycle-managed artifacts.
 * Semantic changes and new independently reviewable task metadata become a
 * new target. Unrelated task history never becomes the current task's target.
 */
export async function resolveQualityReviewTargetSha(opts: {
  gitRoot: string;
  workflowDir: string;
  taskId: string;
  taskIds?: readonly string[];
  lifecycleTaskIds?: readonly string[];
  headSha?: string | null;
  previousEvaluatedSha?: string | null;
}): Promise<string | null> {
  const requestedHead = opts.headSha?.trim();
  const head =
    requestedHead && requestedHead.length > 0
      ? requestedHead
      : await gitRevParse(opts.gitRoot, ["HEAD"]).catch(() => null);
  if (!head) return null;

  const workflowDir = normalizeWorkflowDir(opts.workflowDir);
  const taskIds = [...new Set([opts.taskId, ...(opts.taskIds ?? [])])];
  const taskArtifactPrefixes = taskIds.map((taskId) => ({
    taskId,
    prefix: `${workflowDir}/${taskId}/`,
  }));
  const lifecycleTaskIdSet = new Set(opts.lifecycleTaskIds ?? taskIds);
  const workflowArtifactPrefix = `${workflowDir}/`;
  const taskIdForPath = (name: string): string | null =>
    taskArtifactPrefixes.find((candidate) => name.startsWith(candidate.prefix))?.taskId ?? null;
  const taskRelativePath = (name: string): string | null => {
    const match = taskArtifactPrefixes.find((candidate) => name.startsWith(candidate.prefix));
    return match ? name.slice(match.prefix.length) : null;
  };
  const previousEvaluatedSha = await (async (): Promise<string | null> => {
    const candidate = opts.previousEvaluatedSha?.trim();
    if (!candidate) return null;
    const resolved = await gitRevParse(opts.gitRoot, [`${candidate}^{commit}`]).catch(() => null);
    if (!resolved) return null;
    return (await gitIsAncestor(opts.gitRoot, resolved, head)) ? resolved : null;
  })();

  let current = head;
  let currentTaskArtifactHead: string | null = null;

  for (;;) {
    if (current === previousEvaluatedSha) {
      return currentTaskArtifactHead ?? current;
    }

    let parent: string;
    try {
      parent = await gitRevParse(opts.gitRoot, [`${current}^`]);
    } catch {
      return currentTaskArtifactHead ?? current;
    }

    const changed = await gitDiffNames(opts.gitRoot, parent, current);
    if (changed.length === 0) {
      return currentTaskArtifactHead ?? current;
    }

    const touchesCurrentTaskSet = changed.some((name) => taskRelativePath(name) !== null);
    const touchesOnlyCurrentTaskSet = changed.every((name) => taskRelativePath(name) !== null);
    const touchesOnlyWorkflowArtifacts = changed.every((name) =>
      name.startsWith(workflowArtifactPrefix),
    );
    if (!touchesOnlyCurrentTaskSet && !touchesOnlyWorkflowArtifacts) {
      return currentTaskArtifactHead ?? current;
    }

    if (touchesOnlyCurrentTaskSet) {
      if (
        await isAuthorityOnlyTaskReadmeAdvance({
          gitRoot: opts.gitRoot,
          parent,
          current,
          changed,
          taskRelativePath,
        })
      ) {
        current = parent;
        continue;
      }
      if (
        await isImplementationReceiptTaskReadmeAdvance({
          gitRoot: opts.gitRoot,
          parent,
          current,
          changed,
          taskRelativePath,
        })
      ) {
        current = parent;
        continue;
      }
      if (
        changed.every((name) => {
          const taskId = taskIdForPath(name);
          return taskId !== null && lifecycleTaskIdSet.has(taskId);
        }) &&
        (await isLifecycleOnlyTaskReadmeAdvance({
          gitRoot: opts.gitRoot,
          parent,
          current,
          changed,
          taskRelativePath,
        }))
      ) {
        current = parent;
        continue;
      }
      const taskRelativePaths = changed.flatMap((name) => {
        const relativePath = taskRelativePath(name);
        return relativePath === null ? [] : [relativePath];
      });
      const touchesDerivedArtifacts = taskRelativePaths.some((name) => isDerivedTaskArtifact(name));
      const touchesOnlyManagedArtifacts = taskRelativePaths.every((name) =>
        isManagedTaskArtifact(name),
      );
      if (touchesDerivedArtifacts && touchesOnlyManagedArtifacts) {
        current = parent;
        continue;
      }
      currentTaskArtifactHead ??= current;
      current = parent;
      continue;
    }

    if (touchesCurrentTaskSet) {
      return currentTaskArtifactHead ?? current;
    }
    return currentTaskArtifactHead;
  }
}
