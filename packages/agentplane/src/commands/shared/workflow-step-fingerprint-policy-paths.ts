function uniqueSorted(values: readonly string[]): string[] {
  return [...new Set(values)].toSorted();
}

export function workflowFingerprintPolicyPaths(
  workflowMode: string,
  blueprintPolicyModules: readonly string[],
  changedPaths: readonly string[],
): string[] {
  const policyMutation = changedPaths.some(
    (changedPath) => changedPath === "AGENTS.md" || changedPath.startsWith(".agentplane/policy/"),
  );
  return uniqueSorted([
    "AGENTS.md",
    ".agentplane/WORKFLOW.md",
    workflowMode === "branch_pr"
      ? ".agentplane/policy/workflow.branch_pr.md"
      : ".agentplane/policy/workflow.direct.md",
    ...blueprintPolicyModules,
    ...(changedPaths.some((changedPath) => changedPath.startsWith(".agentplane/.upgrade/"))
      ? [".agentplane/policy/workflow.upgrade.md"]
      : []),
    ...(policyMutation
      ? [".agentplane/policy/dod.docs.md", ".agentplane/policy/governance.md"]
      : []),
    ...(changedPaths.includes(".agentplane/policy/incidents.md")
      ? [".agentplane/policy/incidents.md"]
      : []),
  ]);
}
