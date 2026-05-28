import { runProcessSync } from "@agentplaneorg/core/process";
import fs from "node:fs";
import path from "node:path";

const TASK_ID_RE = /\b\d{12}-[A-Z0-9]{6}\b/;
const TASK_SUBJECT_RE = /^\S+\s+([A-Z0-9]{6})\s+[a-z][a-z0-9_-]*(?:\/[a-z0-9_-]+)*:\s+.+$/;
const DOC_FILE_RE = /(^|\/)(README|CHANGELOG|CONTRIBUTING|LICENSE)(\.[^/]*)?$/i;
const DOC_EXT_RE = /\.(md|mdx|txt|adoc|rst)$/i;

export type CommitRange = { from: string; to: string } | null;

function readGitText(gitRoot: string, args: readonly string[]): string {
  const result = runProcessSync({
    command: "git",
    args,
    cwd: gitRoot,
    encoding: "utf8",
    reject: false,
  });
  if (result.exitCode !== 0) return "";
  return String(result.stdout ?? "").trim();
}

function gitPathIsUnder(filePath: string, prefix: string): boolean {
  return filePath === prefix || filePath.startsWith(`${prefix}/`);
}

function isDocsOnlyPath(filePath: string): boolean {
  return (
    DOC_FILE_RE.test(filePath) ||
    DOC_EXT_RE.test(filePath) ||
    gitPathIsUnder(filePath, "docs") ||
    gitPathIsUnder(filePath, "website/docs")
  );
}

function isTaskArtifactPath(filePath: string): boolean {
  return filePath === ".agentplane/tasks.json" || gitPathIsUnder(filePath, ".agentplane/tasks");
}

function isMutatingPath(filePath: string): boolean {
  return !isTaskArtifactPath(filePath) && !isDocsOnlyPath(filePath);
}

function taskIdFromSubject(gitRoot: string, subject: string): string {
  const full = TASK_ID_RE.exec(subject)?.[0] ?? "";
  if (full) return full;
  const suffix = TASK_SUBJECT_RE.exec(subject)?.[1] ?? "";
  if (!suffix) return "";
  try {
    const taskRoot = path.join(gitRoot, ".agentplane", "tasks");
    const matches = fs
      .readdirSync(taskRoot, { withFileTypes: true })
      .filter((entry) => entry.isDirectory())
      .map((entry) => entry.name)
      .filter((name) => name.toLowerCase().endsWith(`-${suffix.toLowerCase()}`));
    return matches.length === 1 ? (matches[0] ?? "") : "";
  } catch {
    return "";
  }
}

function hasEmergencyBackfillEvidence(body: string): boolean {
  if (!/^Emergency-Hotfix:\s*true\s*$/im.test(body)) return false;
  if (!/^Backfill-Task:\s*\d{12}-[A-Z0-9]{6}\s*$/im.test(body)) return false;
  const evidence = /^Backfill-Evidence:\s*(.+)$/im.exec(body)?.[1]?.trim() ?? "";
  return evidence.length >= 12;
}

function hasDeployFixEvidence(body: string): boolean {
  const subject = commitSubject(body);
  if (!/^🚑\s+deploy-fix:\s+\S+/u.test(subject) && !/^deploy-fix:\s+\S+/u.test(subject)) {
    return false;
  }
  if (!/^Deploy-Fix:\s*true\s*$/im.test(body)) return false;
  const evidence = /^Deploy-Fix-Evidence:\s*(.+)$/im.exec(body)?.[1]?.trim() ?? "";
  return evidence.length >= 12;
}

function commitSubject(body: string): string {
  return (
    body
      .split("\n")
      .find((line) => line.trim())
      ?.trim() ?? ""
  );
}

function hasManagedUpgradeEvidence(body: string): boolean {
  return (
    /^⬆️\s+upgrade:\s+/u.test(commitSubject(body)) && /^Upgrade-Version:\s*\S+\s*$/im.test(body)
  );
}

function isManagedInstallPath(filePath: string): boolean {
  return (
    filePath === "AGENTS.md" ||
    filePath === "CLAUDE.md" ||
    filePath === ".gitignore" ||
    filePath === ".env.example" ||
    gitPathIsUnder(filePath, ".agentplane") ||
    gitPathIsUnder(filePath, ".cursor") ||
    gitPathIsUnder(filePath, ".windsurf")
  );
}

function hasManagedInstallEvidence(body: string, mutatingPaths: readonly string[]): boolean {
  if (
    !/^chore:\s+install agentplane \d+\.\d+\.\d+(?:-[0-9A-Za-z.-]+)?(?:\+[0-9A-Za-z.-]+)?$/.test(
      commitSubject(body),
    )
  ) {
    return false;
  }
  return (
    mutatingPaths.length > 0 && mutatingPaths.every((filePath) => isManagedInstallPath(filePath))
  );
}

function hasManagedContextBootstrapEvidence(
  body: string,
  mutatingPaths: readonly string[],
): boolean {
  const hasBootstrapEvidence =
    commitSubject(body) === "✅ CTX1NT task: initialize AgentPlane context" &&
    /^Context-Bootstrap:\s*true\s*$/im.test(body) &&
    /^Context-Bootstrap-Task:\s*202601010101-CTX1NT\s*$/im.test(body) &&
    mutatingPaths.includes(".agentplane/context/manifest.lock.json");
  return (
    hasBootstrapEvidence &&
    mutatingPaths.every(
      (filePath) =>
        filePath === ".gitignore" ||
        gitPathIsUnder(filePath, ".agentplane/context") ||
        gitPathIsUnder(filePath, "context"),
    )
  );
}

function readCommitList(gitRoot: string, range: CommitRange): string[] {
  if (!range) return [];
  return readGitText(gitRoot, ["log", "--format=%H", `${range.from}..${range.to}`])
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
}

function isCommitAncestorOf(gitRoot: string, ancestor: string, descendant: string): boolean {
  const result = runProcessSync({
    command: "git",
    args: ["merge-base", "--is-ancestor", ancestor, descendant],
    cwd: gitRoot,
    reject: false,
  });
  return result.exitCode === 0;
}

function readCommitParents(gitRoot: string, commit: string): string[] {
  return readGitText(gitRoot, ["rev-list", "--parents", "-n", "1", commit])
    .split(/\s+/)
    .filter(Boolean)
    .slice(1);
}

function isMergedUpgradeLineagePredecessor(
  gitRoot: string,
  commit: string,
  upgradeCommit: string,
  mergeInfos: readonly { firstParent: string; mergedParents: readonly string[] }[],
): boolean {
  if (commit === upgradeCommit || !isCommitAncestorOf(gitRoot, commit, upgradeCommit)) {
    return false;
  }
  return mergeInfos.some(
    ({ firstParent, mergedParents }) =>
      !isCommitAncestorOf(gitRoot, commit, firstParent) &&
      mergedParents.some((parent) => isCommitAncestorOf(gitRoot, upgradeCommit, parent)),
  );
}

function readCommitFiles(gitRoot: string, commit: string): string[] {
  const parentCount = readCommitParents(gitRoot, commit).length;
  const args =
    parentCount > 1
      ? ["diff-tree", "--cc", "--no-commit-id", "--name-only", "-r", commit]
      : ["diff-tree", "--no-commit-id", "--name-only", "-r", commit];
  return readGitText(gitRoot, args)
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
}

function readCommitBody(gitRoot: string, commit: string): string {
  return readGitText(gitRoot, ["show", "--format=%B", "--no-patch", commit]);
}

export function findTaskBoundOutgoingCommitFailures(gitRoot: string, range: CommitRange): string[] {
  const commits = readCommitList(gitRoot, range);
  const commitBodies = new Map<string, string>();
  const commitBodyFor = (commit: string): string => {
    const cached = commitBodies.get(commit);
    if (cached !== undefined) return cached;
    const body = readCommitBody(gitRoot, commit);
    commitBodies.set(commit, body);
    return body;
  };
  const managedUpgradeCommits = commits.filter((commit) =>
    hasManagedUpgradeEvidence(commitBodyFor(commit)),
  );
  const mergeInfos = commits.flatMap((commit) => {
    const [firstParent, ...mergedParents] = readCommitParents(gitRoot, commit);
    return firstParent && mergedParents.length > 0 ? [{ firstParent, mergedParents }] : [];
  });
  const isPreUpgradeCommit = (commit: string): boolean =>
    managedUpgradeCommits.some((upgradeCommit) =>
      isMergedUpgradeLineagePredecessor(gitRoot, commit, upgradeCommit, mergeInfos),
    );

  const failures: string[] = [];
  for (const commit of commits) {
    if (isPreUpgradeCommit(commit)) continue;
    const mutating = readCommitFiles(gitRoot, commit).filter((filePath) =>
      isMutatingPath(filePath),
    );
    if (mutating.length === 0) continue;

    const body = commitBodyFor(commit);
    const subject = commitSubject(body);
    if (taskIdFromSubject(gitRoot, subject)) continue;
    if (hasManagedUpgradeEvidence(body)) continue;
    if (hasManagedInstallEvidence(body, mutating)) continue;
    if (hasManagedContextBootstrapEvidence(body, mutating)) continue;
    if (hasEmergencyBackfillEvidence(body)) continue;
    if (hasDeployFixEvidence(body)) continue;

    failures.push(
      [
        `${commit.slice(0, 12)} ${subject || "(empty subject)"}`,
        `  mutating_paths=${mutating.slice(0, 6).join(", ")}${mutating.length > 6 ? ", ..." : ""}`,
      ].join("\n"),
    );
  }
  return failures;
}
