export const githubUrl = "https://github.com/basilisk-labs/agentplane";
export const docsUrl = "/docs/user/overview";
export const acrUrl = "/docs/user/agent-change-record";
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
    title: "AgentPlane.org - Git-native infrastructure for traceable AI work",
    description:
      "AgentPlane records AI-agent work as reviewable Git evidence: task intent, approved plan, verification, Agent Change Record, and closure metadata.",
  },
  hero: {
    eyebrow: "Local-first evidence layer for AI-authored software changes",
    title: "Git-native infrastructure for traceable AI work.",
    subtitle:
      "AgentPlane records what an AI agent was asked to do, which plan was approved, what changed, which checks ran, and why the work is safe to merge or revert - all as reviewable artifacts inside your Git repository.",
    flow: "task → plan → approve → implement → verify → finish",
    assurances: [
      "Repo-local evidence",
      "Git-visible review trail",
      "Use any coding agent",
      "Privacy-bounded feedback prompts",
      "Your repository stays the source of truth",
    ],
    terminal: {
      title: "Install path",
      lines: [installCommand, "agentplane init", "agentplane quickstart"],
    },
  },
  problem: {
    title: "The diff is not the whole story.",
    text: "AI agents can produce real code changes faster than teams can reconstruct why those changes happened. A pull request shows what changed. It rarely shows what the agent was asked to do, which plan was approved, which checks actually ran, or why the work is safe to merge.",
    bullets: [
      "What task was the agent executing?",
      "Which plan constrained the change?",
      "What verification evidence exists?",
      "Can another human or agent safely review, merge, or revert it?",
    ],
  },
  demo: {
    title: "One agent task. One reviewable evidence trail.",
    text: "Quickstart shows the repo-visible artifact shape before you let an agent touch product code. Reviewers do not need to trust an agent transcript; they can inspect files, commits, checks, hashes, and the ACR.",
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
    title: "AgentPlane does not replace your stack.",
    text: "Claude Code, Codex, Cursor, Aider, Git, CI, and PR review keep their jobs. AgentPlane records the missing evidence around their work.",
    rows: [
      {
        label: "Claude Code / Codex / Cursor / Aider",
        value: "They generate or edit code; AgentPlane records the review trail around the work.",
      },
      {
        label: "AGENTS.md alone",
        value:
          "Policy text tells agents what to do; AgentPlane turns policy into lifecycle artifacts and gates.",
      },
      {
        label: "Git alone",
        value:
          "Git stores the final diff; AgentPlane stores task intent, plan, verification, and closure.",
      },
      {
        label: "Hosted dashboards",
        value:
          "They move workflow state elsewhere; AgentPlane keeps the durable record in the repository.",
      },
    ],
    action: { label: "Read comparison", to: comparisonUrl },
  },
  workflow: {
    title: "How AgentPlane wraps AI work.",
    text: "Use any coding agent. Keep the evidence in Git.",
    note: "AgentPlane does not replace your agent, editor, terminal, or Git.",
    items: [
      {
        title: "Create a task before mutation",
        text: "Record the scope before the agent edits files.",
      },
      {
        title: "Approve a plan",
        text: "Keep the intended route visible before implementation.",
      },
      {
        title: "Let your agent work",
        text: "Use Claude Code, Codex, Cursor, Aider, or another coding agent.",
      },
      {
        title: "Verify and finish with Git context",
        text: "Attach checks, notes, CI results, findings, commit metadata, and ACR.",
      },
    ],
  },
  artifacts: {
    title: "What AgentPlane writes.",
    text: "AgentPlane creates ordinary repository artifacts that can be inspected, reviewed, and committed with the rest of your project.",
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
      "`AGENTS.md` is the repository policy gateway.",
      "`.agentplane/WORKFLOW.md` is the workflow contract.",
      "`.agentplane/tasks/<id>/` stores task state, plan, verification, and PR artifacts.",
      "`acr.json` is a machine-readable Agent Change Record.",
      "Git remains the source of truth.",
    ],
  },
  acr: {
    title: "Agent Change Record: the evidence file for AI work.",
    text: "Every meaningful agent change should leave behind one machine-readable record: task intent, approved or waived plan, agent and toolchain identity, Git base and work commits, policy decisions, verification results, and merge readiness.",
    terminal: {
      title: "ACR reviewer path",
      lines: [
        "agentplane acr generate <task-id> --work-commit HEAD --write",
        "agentplane acr validate <task-id> --mode local",
        "agentplane acr check <task-id> --mode ci",
        "agentplane acr explain <task-id>",
      ],
    },
    action: { label: "Read the ACR spec", to: acrUrl },
  },
  recipesCatalog: {
    title: "Extensions, not the core story.",
    text: "Recipes are optional signed packages for teams that want reusable agent profiles, prompt modules, skills, or repository mapping assets.",
    stepText:
      "Start with the task -> plan -> verify -> ACR flow first; add recipes only when you need reusable behavior.",
  },
  whyNow: {
    title: "AI work is becoming repository work.",
    text: "Agents are no longer just drafting snippets. They edit real repos, open branches, run checks, change docs, touch release paths, and leave reviewers with incomplete context. The next failure mode is not whether the agent can write code; it is whether the team can reconstruct, verify, and govern what happened.",
    action: { label: "Read why", to: manifestoUrl },
  },
  nextSteps: {
    title: "Choose your path.",
    items: [
      {
        title: "New to AgentPlane?",
        text: "Start with the 90-second local task and see the first evidence artifact before the abstractions.",
        action: "Start quickstart",
        to: quickstartUrl,
      },
      {
        title: "Using Claude Code or Codex?",
        text: "Open the workflow guide for your agent and keep the work reviewable after the session is gone.",
        action: "Open workflows",
        to: workflowGuidesUrl,
      },
      {
        title: "Reviewing agent PRs?",
        text: "Add task evidence and ACR validation before merge.",
        action: "Read ACR",
        to: acrUrl,
      },
      {
        title: "Comparing alternatives?",
        text: "See how AgentPlane differs from coding agents, AGENTS.md, Git-only workflows, and CI.",
        action: "Read comparison",
        to: comparisonUrl,
      },
      {
        title: "Building extensions?",
        text: "Read the recipe model after you understand the core evidence trail.",
        action: "Open recipes",
        to: recipesUrl,
        featured: true,
      },
    ],
  },
  closing: {
    title: "Make AI work reviewable in Git.",
  },
} as const;
