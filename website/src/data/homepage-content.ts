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
    title: "Agentplane | Audit trails for AI-written code changes",
    description:
      "Agentplane adds repo-local audit trails to AI-written code changes: task intent, approved plans, verification evidence, commits, traces, and Agent Change Records.",
  },
  hero: {
    eyebrow: "Agent-agnostic evidence layer for code review",
    title: "Audit trails for AI-written code changes.",
    subtitle:
      "When an agent changes code, reviewers need more than a diff. Agentplane keeps the task, approved plan, checks, traces, and Agent Change Record inside the repo.",
    trustLine: "Agent-agnostic. Local-first. No account required. MIT licensed.",
    commands: [installCommand, "agentplane init", "agentplane demo", "human reviews evidence"],
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
    title: "A diff is not enough to merge agent work.",
    text: "A diff shows what changed. It does not show why the agent changed it, what scope was approved, what checks ran, or whether the result is ready for review.",
    evidence:
      "Agentplane turns AI-written code changes into repo-local evidence: task intent, approved plan, verification, traces, commits, and Agent Change Records.",
  },
  reviewFlow: {
    title: "From uncertain diff to reviewable change.",
    text: "Give reviewers a durable trail before asking them to trust an agent-authored pull request.",
    before: {
      title: "Before Agentplane",
      points: [
        "The agent changed files, but the approved scope is buried in chat.",
        "Checks ran somewhere, but the result is not tied to the task.",
        "The reviewer sees a diff and has to infer intent.",
      ],
    },
    after: {
      title: "After Agentplane",
      points: [
        "The task README records intent, plan, owner, findings, and rollback.",
        "The ACR links changed files to verification evidence.",
        "The PR carries a review packet instead of a loose agent summary.",
      ],
    },
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
    title: "Try the review trail in a repo you control.",
    text: "No account. No hosted dependency. Start locally, generate the evidence shape, then decide what to automate.",
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
    title: "Agent-agnostic by design.",
    text: "Agentplane does not replace your model, coding agent, editor, or Git workflow. It gives any repository-capable agent the same harness boundary and evidence trail.",
    tools: [
      "Agent-agnostic",
      "LLM-agnostic",
      "CLI-first",
      "Git-native",
      "Local-first",
      "OpenTelemetry-friendly",
    ],
  },
  whoShouldUse: {
    title: "Who should open the repo?",
    items: [
      "using agentic coding tools in real repositories",
      "reviewing AI-written pull requests and missing intent, plan, and check evidence",
      "maintaining an OSS project where agent changes need audit trails",
      "building platform workflows around reproducible AI-agent work",
      "tired of agent demos that disappear after the chat session",
    ],
  },
  closing: {
    title: "Make the next AI-written change reviewable.",
    text: "Run the quickstart, inspect the generated evidence, then decide where Agentplane belongs in your agent workflow.",
  },
} as const;
