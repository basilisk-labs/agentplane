import { site } from "./site";

export const githubUrl = site.githubUrl;
export const installCommand = "npm i -g agentplane";

export const siteRoutes = {
  docs: "/docs/",
  quickstart: "/docs/start/quickstart/",
  overview: "/docs/user/overview/",
  filesWritten: "/docs/start/files-written/",
  acr: "/docs/reference/acr/",
  compare: "/docs/compare/",
  examples: "/examples/",
  context: "/docs/concepts/context-engineering/",
  traces: "/docs/concepts/traces/",
  harness: "/docs/concepts/harness-engineering/",
} as const;

export const githubProofFallback = {
  stars: 51,
  forks: 6,
  releases: 64,
  latestRelease: "v0.6.4",
  latestReleaseDate: "2026-05-20",
} as const;

export const docsUrl = siteRoutes.docs;
export const quickstartUrl = siteRoutes.quickstart;
export const examplesUrl = siteRoutes.examples;
export const acrUrl = siteRoutes.acr;
export const contextUrl = siteRoutes.context;
export const tracesUrl = siteRoutes.traces;
export const harnessUrl = siteRoutes.harness;

export const homepageContent = {
  seo: {
    title: "Agentplane | Make AI-authored code reviewable in Git",
    description:
      "Agentplane is an agent-agnostic harness that wraps coding agents with task intent, guardrails, verification evidence, commits, traces, and Agent Change Records inside your repository.",
  },
  hero: {
    eyebrow: "Agent-agnostic harness for coding agents",
    title: "Make AI-authored code reviewable in Git.",
    subtitle:
      "The agent writes code and uses the CLI. The human sets tasks, guardrails, and review boundaries. Agentplane keeps the evidence durable across models and tools.",
    trustLine: "Agent-agnostic. LLM-agnostic. Local-first. MIT licensed.",
    commands: [installCommand, "agentplane init", "agent reads AGENTS.md", "human reviews ACR"],
    output: [
      "wrote policy gateway",
      "approved task plan",
      "recorded verification",
      "generated ACR",
      "ready for review",
    ],
  },
  proof: [
    `${githubProofFallback.stars} stars`,
    `${githubProofFallback.releases} releases`,
    githubProofFallback.latestRelease,
    "MIT",
    "TypeScript",
    "local-first CLI",
  ],
  problem: {
    title: "A diff is not the whole story.",
    text: "A diff shows what changed. It does not show why the agent changed it, what plan was approved, what checks ran, or whether the result is ready for review.",
    evidence:
      "Agentplane turns AI-authored work into repo-local evidence: task intent, plan, verification, traces, commits, and Agent Change Records.",
  },
  whatIs: {
    title: "Agentplane is not another agent framework.",
    text: "Agent frameworks define agent logic. Model providers run inference. Prompt tools shape instructions.",
    use: "Agentplane coordinates the operational layer around coding-agent work: workflows, traces, context, recipes, verification, artifacts, and Git evidence.",
    rows: [
      ["Agent frameworks", "Define agent logic and application behavior."],
      ["Model providers", "Run model inference."],
      ["Prompt tools", "Shape individual instructions."],
      [
        "Agentplane",
        "Coordinates workflows, traces, context, artifacts, and operational state around agents.",
      ],
    ],
  },
  records: {
    title: "Agentplane writes evidence your repo can keep.",
    text: "No account. No hosted dependency. Start in a repository and inspect the artifacts before deciding what to automate.",
    tree: [
      "AGENTS.md",
      ".agentplane/WORKFLOW.md",
      ".agentplane/tasks/<task-id>/README.md",
      ".agentplane/tasks/<task-id>/acr.json",
      ".agentplane/traces/<run-id>.json",
    ],
  },
  surfaces: [
    ["AGENTS.md", "Repository policy gateway for coding agents."],
    [".agentplane/WORKFLOW.md", "Workflow and verification contract."],
    ["Task README", "Task intent, lifecycle, plan, status, and handoff evidence."],
    ["acr.json", "Machine-readable Agent Change Record for review and tooling."],
    ["Trace JSON", "Inspectable run timeline and exportable trace data."],
    ["Recipes", "Reusable workflow overlays for TDD, security review, and docs work."],
  ],
  harness: {
    title: "Why harnesses matter",
    text: "A model alone is not an agent. Real agents need workflows, tools, context, state, verification, and traces. Agentplane gives that surrounding harness a local, inspectable structure.",
    items: [
      ["Context", "What the agent needs to know."],
      ["Tools", "What the agent is allowed to do."],
      ["Workflow", "How the run progresses."],
      ["Verification", "How work is checked."],
      ["Trace", "What happened and why."],
    ],
  },
  timeline: [
    ["workflow.start", "run begins from a declared workflow"],
    ["context.load", "repository rules and workflow state"],
    ["model.call", "model interaction metadata"],
    ["tool.call", "external action with input/output metadata"],
    ["verification.check", "tests, typecheck, lint, or custom validation"],
    ["trace.export", "JSON or OpenTelemetry-compatible artifact"],
  ],
  examples: [
    ["Debug an agent run with traces", "trace JSON"],
    ["Create an Agent Change Record", "acr.json"],
    ["Run a TDD workflow recipe", "recipe YAML"],
  ],
  worksWith: {
    title: "Use your existing coding agent.",
    text: "Agentplane does not replace Claude Code, Codex, Cursor, Aider, or your Git workflow. It gives any repository-capable coding agent the same harness boundary and evidence trail.",
    tools: ["Claude Code", "Codex", "Cursor", "Aider", "GitHub Actions", "OpenTelemetry"],
  },
  whoShouldUse: {
    title: "Who should open the repo?",
    items: [
      "using coding agents in real repositories",
      "reviewing AI-authored pull requests and missing intent, plan, and check evidence",
      "maintaining an OSS project where agent changes need audit trails",
      "building platform workflows around reproducible AI-agent work",
      "tired of agent demos that disappear after the chat session",
    ],
  },
  closing: {
    title: "Help make AI-authored code reviewable in Git.",
    text: "Open the repository, inspect the CLI, then run the local loop in a repo you control.",
  },
} as const;
