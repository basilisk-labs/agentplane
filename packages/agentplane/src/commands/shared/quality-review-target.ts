import { gitDiffNames, gitIsAncestor, gitRevParse } from "@agentplaneorg/core/git";

function normalizeWorkflowDir(value: string): string {
  return value.replaceAll("\\", "/").replaceAll(/\/+$/g, "");
}

function isManagedTaskArtifact(relativePath: string): boolean {
  return (
    relativePath === "README.md" ||
    relativePath.startsWith("quality/") ||
    relativePath.startsWith("pr/") ||
    relativePath.startsWith("blueprint/")
  );
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
      const taskRelativePaths = changed.flatMap((name) => {
        const relativePath = taskRelativePath(name);
        return relativePath === null ? [] : [relativePath];
      });
      const touchesDerivedArtifacts = taskRelativePaths.some(
        (name) =>
          name.startsWith("quality/") || name.startsWith("pr/") || name.startsWith("blueprint/"),
      );
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
