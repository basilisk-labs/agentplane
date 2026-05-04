export const githubUrl = "https://github.com/basilisk-labs/agentplane";
export const docsUrl = "/docs/user/overview";
export const workflowGuidesUrl = "/docs/workflow-guides";
export const recipesUrl = "/docs/recipes";
export const comparisonUrl = "/docs/compare";
export const manifestoUrl = "/docs/manifesto";
export const workflowDocsUrl = "/docs/user/workflow";
export const quickstartUrl = "/docs/user/setup";
export const installCommand = "npm i -g agentplane";
export const recipesIndexUrl =
  "https://raw.githubusercontent.com/basilisk-labs/agentplane-recipes/main/index.json";

export const homepageContent = {
  seo: {
    title: "AgentPlane: the audit layer for coding agents",
    description:
      "Open-source CLI that turns Claude Code, Codex, Cursor, and Aider into reviewable, reversible work inside Git repositories.",
  },
  hero: {
    eyebrow: "Open-source audit layer for coding agents",
    title: "The audit layer for coding agents.",
    subtitle:
      "Turn Claude Code, Codex, Cursor, Aider, and similar coding-agent work into reviewable, reversible Git artifacts.",
    flow: "task → plan → approve → implement → verify → finish",
    assurances: ["No hosted runtime", "No telemetry", "Everything stays in your repo"],
    terminal: {
      title: "Install path",
      lines: [installCommand, "agentplane init", "agentplane quickstart"],
    },
  },
  problem: {
    title: "The diff is not the whole story.",
    text: "A coding agent can edit 47 files before a reviewer sees the trail. AgentPlane records the task, plan, verification, and finish state before that context disappears into chat history.",
    bullets: [
      "What was the agent asked to do?",
      "Which plan was accepted?",
      "What checks actually ran?",
      "Why is this safe to merge or revert?",
    ],
  },
  demo: {
    title: "See the task trail before the diff grows.",
    text: "Quickstart shows a harmless demo-task path and the repo-visible artifact shape before you let an agent touch product code. Agent IDs are configurable profiles.",
    terminal: {
      title: "First visible payoff",
      lines: [
        'agentplane task new --title "Demo task" --owner <agent-id> --tag docs',
        'agentplane task plan set <task-id> --text "Inspect the artifact."',
        'agentplane task start-ready <task-id> --author <agent-id> --body "Start: inspect artifacts."',
        "agentplane task verify-show <task-id>",
        "ls .agentplane/tasks/<task-id>/",
      ],
    },
    tryCommands: [installCommand, "agentplane init", "agentplane quickstart"],
  },
  comparison: {
    title: "Not another coding agent.",
    text: "AgentPlane is the workflow envelope around the tools you already use.",
    rows: [
      {
        label: "Claude Code / Codex / Cursor / Aider",
        value: "They generate or edit code; AgentPlane records the review trail around the work.",
      },
      {
        label: "AGENTS.md alone",
        value: "Policy text tells agents what to do; AgentPlane records task state and gates.",
      },
      {
        label: "Git alone",
        value:
          "Git stores the final diff; AgentPlane stores task intent, plan, verification, and closure.",
      },
      {
        label: "Hosted dashboards",
        value:
          "They centralize workflow state elsewhere; AgentPlane keeps artifacts in the repository.",
      },
    ],
    action: { label: "Read comparison", to: comparisonUrl },
  },
  workflow: {
    title: "A thin audit workflow around your coding agent.",
    text: "Your agent writes code. AgentPlane records the evidence around that code.",
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
      "|-- AGENTS.md",
      "`-- .agentplane/",
      "    |-- WORKFLOW.md",
      "    `-- tasks/<id>/",
      "        |-- README.md",
      "        |-- pr/",
      "        `-- acr.json",
    ],
    bullets: [
      "Policy lives with the repository.",
      "Task state is visible.",
      "Verification is explicit.",
      "`acr.json` is a machine-readable Agent Change Record; the schema is open and stable.",
      "Git remains the source of truth.",
    ],
  },
  recipesCatalog: {
    title: "Recipes are signed behavior modules.",
    text: "Recipes add named agent profiles, prompt modules, skills, scenario assets, and expected project artifacts from a remote catalog.",
    stepText:
      "Each card shows what the recipe does and the exact CLI command to install it locally.",
  },
  whyNow: {
    title: "Coding agents need an audit layer now.",
    text: "Agents moved from demos into real repositories. The next failure mode is not whether they can edit code; it is whether teams can reconstruct what happened after they do.",
    action: { label: "Read why", to: manifestoUrl },
  },
  nextSteps: {
    title: "Choose the next artifact.",
    items: [
      {
        title: "Get started",
        text: "Install AgentPlane and initialize your first repository.",
        action: "Read quickstart",
        to: quickstartUrl,
      },
      {
        title: "Use with your agent",
        text: "Workflow guides for Claude Code, Codex, Cursor, Aider, GitHub Actions, and branch_pr.",
        action: "Open guides",
        to: workflowGuidesUrl,
      },
      {
        title: "Install a recipe",
        text: "Start with the signed Code Map recipe for lightweight repository mapping.",
        action: "Open recipes",
        to: recipesUrl,
      },
      {
        title: "Compare alternatives",
        text: "See how AgentPlane relates to raw AGENTS.md, Git-only workflows, and agent tools.",
        action: "Read comparison",
        to: comparisonUrl,
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
    title: "Audit every agent change in Git.",
  },
} as const;
