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

export const docsUrl = siteRoutes.docs;
export const quickstartUrl = siteRoutes.quickstart;
export const examplesUrl = siteRoutes.examples;
export const acrUrl = siteRoutes.acr;
export const contextUrl = siteRoutes.context;
export const tracesUrl = siteRoutes.traces;
export const harnessUrl = siteRoutes.harness;

export const homepageContent = {
  seo: {
    title: "Agentplane | Git-native control plane for coding agents",
    description:
      "Agentplane puts coding agents on an approved, verifiable Git workflow with bounded authority, observed proof, recovery, and deterministic closure.",
  },
  hero: {
    eyebrow: "The Git-native control plane for coding agents",
    title: "Let agents write code. Keep authority and proof in Git.",
    titleLines: ["Let agents", "write code.", "Keep authority", "and proof in Git."],
    subtitle:
      "Agentplane puts Codex, Claude Code, Cursor, Aider, and other coding agents on an approved, verifiable repository workflow.",
    trustLine: "Agent-agnostic. Local-first. No account required. MIT licensed.",
    commands: [
      installCommand,
      "agentplane init",
      'agentplane task create "Fix parser edge case"',
      "agentplane task run <task-id>",
    ],
    output: [
      "wrote policy gateway",
      "approved task plan",
      "recorded verification",
      "generated ACR",
      "ready for review",
    ],
  },
  proof: [
    "MIT licensed",
    "local-first CLI",
    "agent-agnostic",
    "Git-owned state",
    "direct + branch/PR routes",
  ],
  problem: {
    title: "Delegated code needs a control boundary.",
    text: "A diff shows what changed. It does not prove what work was authorized, which effects were allowed, what the supervisor observed, or whether closure was justified.",
    evidence:
      "Agentplane keeps authority and proof separate from the worker's own report, then stores the durable control record with the repository.",
  },
  reviewFlow: {
    title: "One control loop from intent to closure.",
    text: "Authorize, dispatch, observe, verify, then close or recover through an explicit route.",
    before: {
      title: "Coding agent: semantic worker",
      points: [
        "Reasons, edits, and runs tools.",
        "Receives bounded work for one semantic episode.",
        "Reports a result without promoting its own claims to proof.",
      ],
    },
    after: {
      title: "Agentplane: control plane",
      points: [
        "Holds scoped authority and attributable approval gates.",
        "Observes repository, Git, checks, and external effects independently.",
        "Chooses deterministic closure or an exact recovery route.",
      ],
    },
  },
  whatIs: {
    title: "Control plane, not another worker.",
    text: "Coding agents produce changes. Agent frameworks define agent logic. Git and CI preserve history and run checks.",
    use: "Agentplane controls delegated work across those layers: authority, approvals, observed proof, recovery, and closure.",
    rows: [
      ["Coding agents", "Reason, edit, test, and report a semantic result."],
      ["Git + CI", "Preserve code history and execute configured checks."],
      ["Fleet platforms", "Run and observe many workers from an operations surface."],
      [
        "Agentplane",
        "Bounds authority, owns observed facts, and closes or recovers the lifecycle.",
      ],
    ],
  },
  records: {
    title: "Inspect the control state in a repo you own.",
    text: "No account. No hosted dependency. Start locally, inspect authority and observed proof, then decide what to automate.",
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
    ["Task README", "Intent, authority, lifecycle, plan, findings, and recovery route."],
    ["acr.json", "Machine-readable evidence projection for review and tooling."],
    ["Trace JSON", "Inspectable run timeline and exportable trace data."],
    ["Recipes", "Reusable workflow overlays for TDD, security review, and docs work."],
  ],
  harness: {
    title: "Mechanisms behind the control plane",
    text: "Harnesses, traces, context, recipes, and Agent Change Records make the control boundary inspectable. They are product mechanisms, not competing category labels.",
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
    title: "Keep the worker replaceable.",
    text: "Agentplane does not replace your model, coding agent, editor, Git workflow, or CI. It gives any repository-capable agent the same control boundary and evidence contract.",
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
    title: "When a control plane earns its keep",
    items: [
      "coding agents make consequential changes in real repositories",
      "reviewers need to distinguish agent claims from supervisor-observed facts",
      "approvals, writable scope, and allowed effects must be explicit",
      "interrupted or ambiguous work needs a deterministic recovery route",
      "task authority and proof must survive beyond a chat or IDE session",
    ],
  },
  closing: {
    title: "Put your next agent task under control.",
    text: "Start in a repository you control, inspect the authority and evidence artifacts, then choose the workflow route that fits your team.",
  },
} as const;
