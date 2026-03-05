const DISABLED_VALUES = new Set(["0", "false", "off", "disabled"]);

export function isWorkflowEnforcementDisabled(env: NodeJS.ProcessEnv = process.env): boolean {
  const raw = env.AGENTPLANE_WORKFLOW_ENFORCEMENT ?? env.AGENTPLANE_WORKFLOW_CONTRACT;
  if (typeof raw !== "string") return false;
  return DISABLED_VALUES.has(raw.trim().toLowerCase());
}

export function workflowEnforcementEnvHint(): string {
  return "AGENTPLANE_WORKFLOW_ENFORCEMENT";
}
