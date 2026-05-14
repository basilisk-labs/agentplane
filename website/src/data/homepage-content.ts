export const githubUrl = "https://github.com/basilisk-labs/agentplane";
export const docsUrl = "/docs/user/overview";
export const acrUrl = "/docs/user/agent-change-record";
export const contextUrl = "/docs/user/local-context";
export const blueprintsUrl = "/docs/developer/blueprints";
export const blogUrl = "/blog";
export const workflowGuidesUrl = "/docs/workflow-guides";
export const recipesUrl = "/docs/recipes";
export const comparisonUrl = "/docs/compare";
export const quickstartUrl = "/docs/user/setup";
export const contributingUrl =
  "https://github.com/basilisk-labs/agentplane/blob/main/CONTRIBUTING.md";
export const securityUrl = "https://github.com/basilisk-labs/agentplane/blob/main/SECURITY.md";
export const roadmapUrl = "https://github.com/basilisk-labs/agentplane/blob/main/ROADMAP.md";
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
    eyebrow: "VOL. 1 - ISSUE NO. 006",
    title: "Inspectable work for coding agents.",
    subtitle:
      "AgentPlane wraps Claude Code, Codex, Cursor, Aider, and other coding agents with task intent, approved plans, verification evidence, commits, and Agent Change Records - all inside your repository.",
    flow: "intent -> plan -> agent work -> verify -> commit",
    proofLine: "Run locally. No signup. No hosted runtime required.",
    trustItems: [
      "MIT licensed",
      "Local-first",
      "Works with Git",
      "Node.js 24+",
      "No cloud account required",
      "Security policy",
      "Contributing guide",
    ],
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
  menuSections: [
    {
      id: "recipes",
      code: "RCP-01",
      label: "Recipes",
      title: "Reusable agent behavior without copy-pasted prompts.",
      text: "Recipes package repeatable agent profiles, prompt modules, skills, and repository mapping assets so a team can install known-good behavior instead of rediscovering it in every checkout.",
      proof:
        "Good for onboarding new agents, sharing workflow patterns, and keeping reusable automation signed and inspectable.",
      linkLabel: "Open recipes docs",
      to: recipesUrl,
      status: "signed catalog",
    },
    {
      id: "blueprints",
      code: "BPR-02",
      label: "Blueprints",
      title: "Execution routes that make task shape explicit.",
      text: "Blueprints resolve a task into a route: what evidence is required, which owner should act, what checks matter, and where the work should stop when the scope drifts.",
      proof:
        "Useful when agents need a deterministic path instead of improvising lifecycle steps from prose.",
      linkLabel: "Open blueprints docs",
      to: blueprintsUrl,
      status: "route contract",
    },
    {
      id: "blog",
      code: "BLG-04",
      label: "Blog",
      title: "Release notes and workflow reasoning in one place.",
      text: "The blog is the narrative layer for release notes, implementation notes, and operational lessons that are too contextual for command reference pages.",
      proof:
        "Good for understanding direction, tradeoffs, and migration context before adopting a new workflow surface.",
      linkLabel: "Open blog",
      to: blogUrl,
      status: "field notes",
    },
    {
      id: "acr",
      code: "ACR-03",
      label: "ACR",
      title: "A compact record reviewers and automations can trust.",
      text: "Agent Change Record keeps intent, plan approval, changed files, commands, verification result, commit, and review status in a machine-readable artifact.",
      proof:
        "The diff stays in Git; ACR preserves why the diff exists and what evidence came with it.",
      linkLabel: "Open ACR docs",
      to: acrUrl,
      status: "review evidence",
    },
    {
      id: "docs",
      code: "DOC-05",
      label: "Docs",
      title: "The operator manual for local-first agent work.",
      text: "Docs cover setup, command contracts, branch_pr and direct workflows, PR artifacts, and the policies agents need before they mutate a repository.",
      proof:
        "Use it as the public source for users; use AGENTS.md and policy modules as the repo-local source for agents.",
      linkLabel: "Open docs",
      to: docsUrl,
      status: "operator manual",
    },
    {
      id: "context",
      code: "CTX-06",
      label: "Context",
      title: "Repository memory that stays below the workflow.",
      text: "Local context turns capabilities, project facts, and relevant repository knowledge into a controlled surface that agents can load without swallowing the entire repo.",
      proof:
        "It helps agents reuse what matters while keeping mutation policy and verification gates explicit.",
      linkLabel: "Open context docs",
      to: contextUrl,
      status: "local memory",
    },
  ],
  quickstart: {
    title: "Copy this, run it in any repo.",
    text: "The first win is not a dashboard. It is a local evidence trail you can inspect in Git.",
    lines: [installCommand, "agentplane init", "agentplane quickstart"],
    expectedArtifacts: [
      ".agentplane/tasks/<task-id>/README.md",
      ".agentplane/tasks/<task-id>/acr.json",
    ],
    afterAction: "Tried it? Star the repo.",
  },
  projectStatus: {
    title: "Project status",
    text: "AgentPlane is an early open-source CLI for local-first, Git-native AI-agent workflow evidence.",
    currentScope: [
      "repo-local task lifecycle",
      "plan / verify / finish flow",
      "Agent Change Record generation and validation",
      "direct and branch_pr workflows",
      "local context",
      "signed recipes catalog",
    ],
    notInScope: [
      "replacing your coding agent",
      "replacing Git, CI, or PR review",
      "hosted runtime dependency",
      "cloud account requirement",
    ],
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
          "They help with team visibility, alerts, and governance. AgentPlane keeps the durable evidence record in Git.",
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
    text: "For teams, hosted traces and shared dashboards can sync around the Git record later. The CLI works locally today. Context and recipes extend the evidence layer after the first task -> plan -> verify loop is clear.",
    action: { label: "Open context docs", to: contextUrl },
  },
  contribute: {
    title: "Contribute",
    text: "AgentPlane is early and useful contributions are small, concrete, and evidence-backed.",
    items: [
      "fix unclear docs",
      "add workflow examples for real coding agents",
      "improve CLI reference wording",
      "add reproducible bug reports",
      "share public ACR examples",
    ],
    note: "Open an issue before larger behavior changes.",
  },
  security: {
    title: "Security",
    text: "Please do not report vulnerabilities in public issues. Use security@agentplane.dev or GitHub private vulnerability reporting.",
  },
  roadmap: {
    title: "Roadmap",
    text: "AgentPlane is moving from repo-local evidence toward reusable recipes, typed execution paths, local context, controlled runners, and evaluation loops. See ROADMAP.md for direction, not promises.",
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
