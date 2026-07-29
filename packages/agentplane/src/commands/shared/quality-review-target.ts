import { gitDiffNames, gitIsAncestor, gitRevParse, gitShowFile } from "@agentplaneorg/core/git";
import { canonicalizeJson, parseTaskReadme } from "@agentplaneorg/core/tasks";
import { isRecord } from "../../shared/guards.js";

const SIDE_EFFECT_AUTHORITY_EXTENSION_KEY = "agentplane.side_effect_authority";
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
  if (
    opts.changed.length === 0 ||
    opts.changed.some((name) => opts.taskRelativePath(name) !== "README.md")
  ) {
    return false;
  }
  for (const name of opts.changed) {
    const [before, after] = await Promise.all([
      gitShowFile(opts.gitRoot, opts.parent, name).catch(() => null),
      gitShowFile(opts.gitRoot, opts.current, name).catch(() => null),
    ]);
    if (before === null || after === null || before === after) return false;
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
  const taskArtifactPrefixes = taskIds.map((taskId) => `${workflowDir}/${taskId}/`);
  const workflowArtifactPrefix = `${workflowDir}/`;
  const taskRelativePath = (name: string): string | null => {
    const prefix = taskArtifactPrefixes.find((candidate) => name.startsWith(candidate));
    return prefix ? name.slice(prefix.length) : null;
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
      return current;
    }

    const changed = await gitDiffNames(opts.gitRoot, parent, current);
    if (changed.length === 0) {
      return current;
    }

    const touchesCurrentTaskSet = changed.some((name) => taskRelativePath(name) !== null);
    const touchesOnlyCurrentTaskSet = changed.every((name) => taskRelativePath(name) !== null);
    const touchesOnlyWorkflowArtifacts = changed.every((name) =>
      name.startsWith(workflowArtifactPrefix),
    );

    if (!touchesOnlyCurrentTaskSet && !touchesOnlyWorkflowArtifacts) {
      return current;
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
      const taskRelativePaths = changed.flatMap((name) => {
        const relativePath = taskRelativePath(name);
        return relativePath === null ? [] : [relativePath];
      });
      const touchesDerivedArtifacts = taskRelativePaths.some((name) => isDerivedTaskArtifact(name));
      const touchesOnlyManagedArtifacts = taskRelativePaths.every((name) =>
        isManagedTaskArtifact(name),
      );
      if (previousEvaluatedSha && touchesDerivedArtifacts && touchesOnlyManagedArtifacts) {
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
