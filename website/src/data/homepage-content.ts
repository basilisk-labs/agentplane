export const githubUrl = "https://github.com/basilisk-labs/agentplane";
export const docsUrl = "/docs/user/overview";
export const recipesUrl = "/docs/recipes";
export const workflowDocsUrl = "/docs/user/workflow";
export const quickstartUrl = "/docs/user/setup";
export const installCommand = "npm i -g agentplane";

export const homepageContent = {
  seo: {
    title: "Use coding agents without losing Git discipline",
    description:
      "AgentPlane is a local CLI that makes coding-agent work reviewable inside Git repositories.",
  },
  hero: {
    eyebrow: "Local CLI for reviewable coding-agent work",
    title: "Use coding agents without losing Git discipline.",
    subtitle:
      "AgentPlane makes Claude Code, Codex, Cursor, Aider, and similar coding-agent work auditable inside your Git repository.",
    flow: "task → plan → approve → implement → verify → finish",
    assurances: ["No hosted runtime", "No hidden state", "Everything stays in your repo"],
    terminal: {
      title: "Command preview",
      lines: [installCommand, "agentplane init", "agentplane quickstart"],
    },
  },
  demo: {
    title: "See an agent task become reviewable.",
    text: "AgentPlane records the task, plan, verification, and finish state around coding-agent work so reviewers can reconstruct what happened from Git-visible artifacts.",
    terminal: {
      title: "Terminal walkthrough",
      lines: [
        'agentplane task new --title "Fix parser test" --owner CODER --tag frontend',
        'agentplane task plan set <task-id> --text "..."',
        'agentplane verify <task-id> --ok --note "Tests passed"',
        'agentplane finish <task-id> --result "Verified change" --commit <git-rev>',
        "ls .agentplane/tasks/<task-id>/",
      ],
    },
    tryCommands: [installCommand, "agentplane init", "agentplane quickstart"],
  },
  workflow: {
    title: "A thin workflow layer around your coding agent.",
    text: "Your agent writes code. AgentPlane records the workflow around that code.",
    note: "AgentPlane does not replace your agent, editor, terminal, or Git.",
    items: [
      {
        title: "Task",
        text: "Define what the agent is working on before files start changing.",
      },
      {
        title: "Plan",
        text: "Keep the intended approach visible before implementation.",
      },
      {
        title: "Verify",
        text: "Attach verification evidence to the task instead of leaving it in chat history.",
      },
      {
        title: "Finish",
        text: "Close the work with explicit state linked to the repository.",
      },
    ],
  },
  artifacts: {
    title: "Everything stays in your repo.",
    text: "AgentPlane creates local workflow artifacts that can be inspected, reviewed, and committed with the rest of your project.",
    tree: [
      ".",
      "|-- AGENTS.md / CLAUDE.md",
      "`-- .agentplane/",
      "    |-- config.json",
      "    |-- WORKFLOW.md",
      "    `-- tasks/",
      "        `-- <task-id>/",
      "            |-- plan.md",
      "            |-- verification.md",
      "            `-- finish.md",
    ],
    bullets: [
      "Policy lives with the repository.",
      "Task state is visible.",
      "Verification is explicit.",
      "Git remains the source of truth.",
    ],
  },
  nextSteps: {
    title: "Choose your next step.",
    items: [
      {
        title: "Get started",
        text: "Install AgentPlane and initialize your first repository.",
        action: "Read quickstart",
        to: quickstartUrl,
      },
      {
        title: "Use with your agent",
        text: "Recipes for Claude Code, Codex, Cursor, Aider, and local coding agents.",
        action: "Open recipes",
        to: recipesUrl,
      },
      {
        title: "Understand the workflow",
        text: "Learn how task, plan, verification, and finish state work.",
        action: "Read workflow docs",
        to: workflowDocsUrl,
      },
      {
        title: "View the source",
        text: "Inspect the CLI, open issues, or contribute.",
        action: "View on GitHub",
        to: githubUrl,
        featured: true,
      },
    ],
  },
  closing: {
    title: "Put coding agents on a visible Git workflow.",
  },
} as const;
