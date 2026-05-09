import { gitDiffNameStatus, gitDiffNumstat } from "@agentplaneorg/core/git";
import type { AgentChangeRecord } from "@agentplaneorg/core/schemas";

export async function readDiffSummary(gitRoot: string, baseCommit: string, workCommit: string) {
  const [numstat, names] = await Promise.all([
    gitDiffNumstat(gitRoot, baseCommit, workCommit, { range: "two-dot" }).catch(() => []),
    gitDiffNameStatus(gitRoot, baseCommit, workCommit, { range: "two-dot" }).catch(() => []),
  ]);
  const files = names.map(({ statusCode, path: filePath }) => ({
    path: filePath,
    status: mapGitStatus(statusCode),
    risk_categories: inferRiskCategories(filePath),
  }));
  const insertions = numstat.reduce((sum, entry) => sum + entry.insertions, 0);
  const deletions = numstat.reduce((sum, entry) => sum + entry.deletions, 0);
  return {
    diff_stats: {
      files_changed: files.length,
      insertions,
      deletions,
    },
    files,
  };
}

function mapGitStatus(status: string): AgentChangeRecord["changes"]["files"][number]["status"] {
  const code = status[0];
  if (code === "A") return "added";
  if (code === "M") return "modified";
  if (code === "D") return "deleted";
  if (code === "R") return "renamed";
  if (code === "C") return "copied";
  if (code === "T") return "type_changed";
  return "unknown";
}

function inferRiskCategories(
  filePath: string,
): NonNullable<AgentChangeRecord["changes"]["files"][number]["risk_categories"]> {
  const categories = new Set<
    NonNullable<AgentChangeRecord["changes"]["files"][number]["risk_categories"]>[number]
  >();
  if (filePath.includes("schema")) categories.add("schema");
  if (filePath.startsWith("docs/")) categories.add("docs");
  if (filePath.includes("/test") || filePath.endsWith(".test.ts")) categories.add("tests");
  if (filePath.startsWith(".github/")) categories.add("ci");
  if (filePath.startsWith("packages/agentplane/src/commands/")) categories.add("cli");
  if (categories.size === 0) categories.add("tooling");
  return [...categories];
}
