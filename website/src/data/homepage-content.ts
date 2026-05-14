export const githubUrl = "https://github.com/basilisk-labs/agentplane";
export const docsUrl = "/docs/user/overview";
export const acrUrl = "/docs/user/agent-change-record";
export const contextUrl = "/docs/user/local-context";
export const workflowGuidesUrl = "/docs/workflow-guides";
export const recipesUrl = "/docs/recipes";
export const comparisonUrl = "/docs/compare";
export const quickstartUrl = "/docs/user/setup";
export const installCommand = "npm i -g agentplane";
export const recipesIndexUrl =
  "https://raw.githubusercontent.com/basilisk-labs/agentplane-recipes/main/index.json";

export const githubProofFallback = {
  stars: 48,
  forks: 6,
  releases: 60,
  latestRelease: "v0.6.0",
  license: "MIT",
  language: "TypeScript",
  posture: "local-first CLI",
};

export const homepageContent = {
  seo: {
    title: "Make AI-authored code reviewable in Git",
    description:
      "AgentPlane wraps Claude Code, Codex, Cursor, Aider, and other coding agents with task intent, approved plans, verification evidence, commits, and Agent Change Records inside your repository.",
  },
  hero: {
    eyebrow: "LOCAL-FIRST EVIDENCE LAYER FOR CODING AGENTS",
    title: "Make AI-authored code reviewable in Git.",
    subtitle:
      "AgentPlane wraps Claude Code, Codex, Cursor, Aider, and other coding agents with task intent, approved plans, verification evidence, commits, and Agent Change Records - all inside your repository.",
    flow: "intent -> plan -> agent work -> verify -> commit",
    proofLine: "Local-first. Git-native. Works with your existing coding agent.",
  },
  heroArtifacts: [
    {
      path: ".agentplane/tasks/AP-104/task.md",
      label: "task intent",
      status: "ready",
      lines: ["owner: CODER", "scope: fix parser edge case", "state: plan_approved"],
    },
    {
      path: "approved_plan.md",
      label: "approved plan",
      status: "approved",
      lines: ["1. add failing fixture", "2. tighten validation", "3. run focused tests"],
    },
    {
      path: "acr.json",
      label: "verification / ACR",
      status: "verified",
      lines: ['"result": "pass"', '"commit": "9f3c2a1"', '"review_status": "ready"'],
    },
  ],
  problem: {
    title: "The diff is not the whole story.",
    text: "A diff shows what changed. It does not show why the agent changed it, what plan was approved, what checks ran, or whether the result is reviewable.",
    bullets: [
      "What task was the agent executing?",
      "Which plan constrained the change?",
      "What verification evidence exists?",
      "Can another human or agent safely review, merge, or revert it?",
    ],
  },
  quickstart: {
    title: "Copy this, run it in any repo.",
    text: "The first win is not a dashboard. It is a local evidence trail you can inspect in Git.",
    lines: [installCommand, "agentplane init", "agentplane quickstart"],
    afterAction: "Tried it? Star the repo.",
  },
  artifacts: {
    title: "What AgentPlane writes.",
    text: "AgentPlane writes evidence your repository can keep: policy, workflow state, task records, PR artifacts, and ACR files.",
    items: [
      {
        label: "Policy gateway",
        path: "AGENTS.md",
        text: "The repository contract coding agents read before acting.",
      },
      {
        label: "Workflow contract",
        path: ".agentplane/WORKFLOW.md",
        text: "The selected direct or branch_pr route, approvals, and lifecycle rules.",
      },
      {
        label: "Task record",
        path: ".agentplane/tasks/<id>/README.md",
        text: "Intent, plan, start note, verification evidence, findings, rollback path.",
      },
      {
        label: "Agent Change Record",
        path: ".agentplane/tasks/<id>/acr.json",
        text: "Machine-readable evidence for checks, commits, policy decisions, and review status.",
      },
    ],
  },
  worksWith: {
    title: "Works with the coding agents you already use.",
    items: [
      "Claude Code",
      "Codex",
      "Cursor",
      "Aider",
      "GitHub Actions",
      "your existing Git workflow",
    ],
  },
  comparison: {
    title: "Not another agent framework.",
    text: "AgentPlane is not another coding agent, not a hosted-only dashboard, and not a replacement for Git. It is the repo-local evidence layer around agent work.",
    rows: [
      {
        label: "Coding agents",
        value: "They generate or edit code. AgentPlane records the review trail around the work.",
      },
      {
        label: "Agent frameworks",
        value:
          "They orchestrate behavior. AgentPlane keeps task intent, plan approval, verification, and closure visible in Git.",
      },
      {
        label: "Hosted dashboards",
        value:
          "They move workflow state elsewhere. AgentPlane keeps the durable record in the repository.",
      },
      {
        label: "Git alone",
        value:
          "Git stores the final diff. AgentPlane stores why it happened, who approved it, and what evidence exists.",
      },
    ],
    starLine: "Want local-first evidence instead of another agent framework? Star AgentPlane.",
  },
  acr: {
    title: "ACR becomes useful after the pain is clear.",
    text: "Agent Change Record is the compact evidence file for AI-authored work: task intent, approved plan, files changed, commands run, verification, commit, and review status.",
    snippet: [
      "{",
      '  "task": "AP-104",',
      '  "intent": "Fix parser edge case",',
      '  "approved_plan": "approved_plan.md",',
      '  "files_changed": ["src/parser.ts"],',
      '  "commands_run": ["bun test parser"],',
      '  "verification": { "result": "pass" },',
      '  "commit": "9f3c2a1",',
      '  "review_status": "ready"',
      "}",
    ],
    action: { label: "Open ACR example", to: acrUrl },
  },
  whoShouldStar: {
    title: "Star AgentPlane if you are:",
    items: [
      "using Claude Code, Codex, Cursor, or Aider in real repos",
      "reviewing AI-authored PRs and missing intent, plan, and check evidence",
      "maintaining an OSS project where agent changes need audit trails",
      "building platform or security workflows around AI engineering",
    ],
  },
  context: {
    title: "Advanced: context and recipes stay below the core flow.",
    text: "For teams, hosted traces and shared dashboards can come later. The CLI works locally today. Context and recipes extend the evidence layer after the first task -> plan -> verify loop is clear.",
    action: { label: "Open context docs", to: contextUrl },
  },
  recipesCatalog: {
    title: "Recipes are extensions, not the first step.",
    text: "Recipes are optional signed packages for reusable agent profiles, prompt modules, skills, or repository mapping assets.",
    stepText:
      "Start with the task -> plan -> verify -> ACR flow first; add recipes only when reusable behavior is worth the extra surface area.",
  },
  closing: {
    title: "Help make AI work reviewable in Git.",
    text: "Early OSS project - star it if you want local-first evidence for coding agents.",
  },
} as const;
