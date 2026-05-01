export const githubUrl = "https://github.com/basilisk-labs/agentplane";
export const installCommand = "npm i -g agentplane";

export const homepageContent = {
  seo: {
    title: "Use coding agents without losing Git discipline",
    description:
      "AgentPlane is a local CLI that makes Claude Code, Codex, Cursor, and Aider-style agent work auditable inside your Git repository.",
  },
  hero: {
    eyebrow: "Local CLI for agent-driven development",
    title: "Use coding agents without losing Git discipline.",
    subtitle:
      "AgentPlane makes Claude Code, Codex, Cursor-style agent work auditable inside your Git repository.",
    flow: "task -> plan -> approve -> implement -> verify -> finish",
    assurances: ["No hosted runtime", "No hidden state", "Everything stays in your repo"],
    actions: [
      { label: "View on GitHub", to: githubUrl, variant: "primary" },
      { label: "Copy install command", command: installCommand, variant: "secondary" },
    ],
    terminal: {
      title: "90-second terminal flow",
      lines: [
        installCommand,
        "agentplane init",
        'agentplane task new --title "Tighten README" --owner DOCS --tag docs',
        'agentplane task plan set <task-id> --text "..." --updated-by DOCS',
        "agentplane task plan approve <task-id> --by ORCHESTRATOR",
        'agentplane task start-ready <task-id> --author DOCS --body "Start: ..."',
        "agentplane task verify-show <task-id>",
        'agentplane verify <task-id> --ok --by DOCS --note "Docs build passed"',
        'agentplane finish <task-id> --author DOCS --result "Verified change" --commit <git-rev>',
      ],
    },
  },
  problem: {
    label: "Problem",
    title: "Coding agents can change files. Teams still need to know what happened.",
    questions: [
      "What task was the agent solving?",
      "What plan was approved?",
      "What changed in the repository?",
      "What was verified?",
      "Why was the task considered finished?",
    ],
    close:
      "AgentPlane adds a visible workflow layer around agent work without replacing Git, your editor, or your terminal.",
  },
  beforeAfter: {
    label: "What it does",
    title: "Workflow discipline for agentic coding.",
    withoutTitle: "Without AgentPlane",
    withTitle: "With AgentPlane",
    without: [
      "Prompt in chat",
      "Agent edits files",
      "Human inspects diff",
      "Context is scattered",
      "Verification is implicit",
      "Closure is manual",
    ],
    with: [
      "Task is recorded",
      "Plan is explicit",
      "Approval is visible",
      "Verification is stored",
      "Finish creates closure evidence",
      "Everything lives in Git",
    ],
  },
  demo: {
    label: "Demo",
    title: "See AgentPlane in 90 seconds.",
    scenario:
      "A coding agent modifies a repository. AgentPlane records task state, plan, verification, and finish so a reviewer can reconstruct what happened from Git-visible artifacts.",
    commands: [installCommand, "agentplane init", "agentplane quickstart"],
    actions: [
      { label: "View source on GitHub", to: githubUrl, variant: "primary" },
      { label: "Open recipes", to: "/docs/recipes", variant: "secondary" },
    ],
  },
  repository: {
    label: "Repo artifacts",
    title: "What appears in your repo.",
    tree: [
      "AGENTS.md or CLAUDE.md",
      ".agentplane/",
      ".agentplane/config.json",
      ".agentplane/tasks/",
      ".agentplane/WORKFLOW.md",
      "verification records",
      "finish record",
    ],
    text: "The workflow state sits close to the code it explains.",
  },
  howItWorks: {
    label: "How it works",
    title: "Five commands turn a loose agent session into a reviewable workflow.",
    steps: [
      {
        name: "Initialize the repo",
        command: "agentplane init",
        text: "Creates the policy gateway and repo-local AgentPlane workspace.",
      },
      {
        name: "Create a task",
        command: "agentplane task new ...",
        text: "Records what the agent is supposed to solve before files change.",
      },
      {
        name: "Record the plan",
        command: "agentplane task plan set ...",
        text: "Makes scope and intended approach visible in the repository.",
      },
      {
        name: "Verify the result",
        command: "agentplane verify ...",
        text: "Stores the verification outcome instead of leaving it in chat history.",
      },
      {
        name: "Finish the task",
        command: "agentplane finish ...",
        text: "Closes the work with traceable evidence and commit metadata.",
      },
    ],
  },
  audience: {
    label: "Who it is for",
    title: "Built for developers already using coding agents.",
    for: [
      "Developers using Claude Code, Codex, Cursor, Aider, or local coding agents.",
      "Maintainers who want agent changes to remain reviewable.",
      "Teams that need task state, verification, and closure before merging agent-generated work.",
      "Local-first builders who do not want a hosted agent runtime between their repo and their workflow.",
    ],
    notFor: [
      "Not a hosted agent platform.",
      "Not a prompt framework.",
      "Not a replacement for Git.",
      "Not a replacement for your editor.",
    ],
  },
  stack: {
    label: "Agent stack",
    title: "Works around your current agent stack.",
    text: "Your agent writes code. AgentPlane records the workflow around that code. Git remains the source of truth.",
    items: [
      "Claude Code",
      "Codex-style CLI workflows",
      "Cursor / Windsurf-style agent edits",
      "Aider",
      "local LLM coding agents",
      "human-driven terminal workflows",
    ],
  },
  workflowModes: {
    label: "Workflow modes",
    title: "Choose the workflow discipline you need.",
    items: [
      {
        name: "direct",
        text: "Fast local loops in the current checkout. Good for solo work, prototypes, and short tasks.",
      },
      {
        name: "branch_pr",
        text: "Structured per-task branch and PR-style handoff. Good for teams, stricter review, and integration boundaries.",
      },
    ],
  },
  gitNative: {
    label: "Why Git-native",
    title: "Agent work should leave reviewable evidence.",
    points: [
      "policy lives in the repo",
      "task records live in the repo",
      "verification is explicit",
      "closure is recorded",
      "reviewers can inspect what happened",
    ],
    diagram: ["Agent", "AgentPlane workflow", "Git repo artifacts", "Human review / CI / merge"],
  },
  quickstart: {
    label: "Quickstart",
    title: "Try it in a Git repository.",
    commands: [installCommand, "agentplane init", "agentplane quickstart"],
    requirements: ["Node.js 20+", "Git repository", "Local terminal"],
    actions: [
      { label: "Read docs", to: "/docs/user/overview", variant: "primary" },
      { label: "View commands", to: "/docs/user/commands", variant: "secondary" },
      { label: "Open GitHub", to: githubUrl, variant: "secondary" },
    ],
  },
  recipes: {
    label: "Recipes",
    title: "Copy-paste flows for the tools you already use.",
    items: [
      { name: "AgentPlane + Claude Code", to: "/docs/recipes/claude-code" },
      { name: "AgentPlane + Codex", to: "/docs/recipes/codex" },
      { name: "AgentPlane + Cursor", to: "/docs/recipes/cursor" },
      { name: "AgentPlane + Aider", to: "/docs/recipes/aider" },
      { name: "AgentPlane + GitHub Actions", to: "/docs/recipes/github-actions" },
      { name: "AgentPlane + branch_pr workflow", to: "/docs/recipes/branch-pr" },
    ],
  },
  proof: {
    label: "Technical proof",
    title: "Built for real repositories.",
    points: [
      "MIT licensed",
      "Local-first CLI",
      "TypeScript codebase",
      "Active release history",
      "No hosted control plane",
    ],
  },
  faq: {
    label: "FAQ",
    title: "Objections, answered directly.",
    items: [
      {
        question: "Is AgentPlane an agent?",
        answer: "No. It is a workflow layer around agent work.",
      },
      {
        question: "Does it send my code to a hosted service?",
        answer: "No. It runs locally in your repository.",
      },
      {
        question: "Does it replace Git?",
        answer: "No. It makes agent work more legible inside Git.",
      },
      {
        question: "Does it replace Claude Code, Codex, or Cursor?",
        answer:
          "No. Use those tools to write code; use AgentPlane to record task state, verification, and closure.",
      },
      {
        question: "Can I use it solo?",
        answer: "Yes. Use direct mode.",
      },
      {
        question: "Can teams use it?",
        answer: "Yes. Use branch_pr mode for stricter handoff and integration.",
      },
      {
        question: "What files does it create?",
        answer:
          "AGENTS.md or CLAUDE.md, .agentplane/, task records, workflow state, and verification records.",
      },
    ],
  },
  closing: {
    label: "Start",
    title: "Put coding agents on a visible Git workflow.",
    command: installCommand,
    actions: [
      { label: "View on GitHub", to: githubUrl, variant: "primary" },
      { label: "Read the docs", to: "/docs/user/overview", variant: "secondary" },
    ],
  },
} as const;
