export const RUNTIME_GITIGNORE_LINES = [
  "# agentplane: ignore runtime/transient workspace artifacts",
  ".env",
  ".agentplane/worktrees",
  ".agentplane/cache",
  ".agentplane/recipes-cache",
  ".agentplane/.upgrade",
  ".agentplane/.release",
  ".agentplane/upgrade",
  ".agentplane/tasks.json",
  "AGENTS.md.bak-*",
  ".agentplane/agents/*.bak-*",
] as const;

export const AGENT_PROMPT_GITIGNORE_LINES = [
  "# agentplane: ignore local agent prompts/templates",
  "AGENTS.md",
  ".agentplane/agents/",
] as const;
