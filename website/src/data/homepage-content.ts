import { site } from "./site";

export const githubUrl = site.githubUrl;
export const docsUrl = site.docsUrl;
export const quickstartUrl = site.quickstartUrl;
export const examplesUrl = site.examplesUrl;
export const acrUrl = "/docs/reference/acr";
export const contextUrl = "/docs/user/local-context";
export const tracesUrl = "/docs/concepts/traces";
export const harnessUrl = "/docs/concepts/harness-engineering";
export const installCommand = "npm i -g agentplane";

export const homepageContent = {
  seo: {
    title: "Agentplane | Observable and reproducible AI-agent workflows",
    description:
      "Agentplane is a CLI-first operational workflow and observability layer for AI agents: local runs, traces, context, recipes, artifacts, and Git-native evidence.",
  },
  hero: {
    eyebrow: "Open-source CLI · Local-first workflows",
    title: "Make AI-agent work observable and reproducible.",
    subtitle:
      "Agentplane is a CLI-first operational workflow layer for AI agents. Run agents locally, record traces, manage context, apply recipes, and keep every run inspectable from the terminal to Git.",
    trustLine: "Local-first. CLI-first. OpenTelemetry-friendly. MIT licensed.",
    commands: [
      installCommand,
      "agentplane init",
      "agentplane run ./agentplane.yaml",
      "agentplane trace open",
    ],
    output: [
      "initialized .agentplane/",
      "loaded workflow",
      "started local agent run",
      "recorded trace spans",
      "exported run artifacts",
    ],
  },
  whatIs: {
    title: "What is Agentplane?",
    text: "Agentplane is not another agent framework. It is the operational layer around AI agents: workflows, orchestration, traces, local context, recipes, verification, and run artifacts.",
    use: "Use Agentplane when you want agent work to be debuggable, reproducible, observable, and safe to operate beyond a single chat session.",
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
    title: "What Agentplane records",
    text: "Agentplane keeps operational state inspectable. Workflows, runs, traces, recipes, and exports live as files you can inspect, version, and share.",
    tree: [
      ".agentplane/",
      "  workflows/",
      "    default.yaml",
      "  runs/",
      "    run-2026-05-18/",
      "  traces/",
      "    run-2026-05-18.json",
      "  recipes/",
      "    tdd.yaml",
      "  exports/",
      "    run-2026-05-18.otel.json",
    ],
  },
  surfaces: [
    ["Workflows", "Define reproducible steps for agent runs."],
    [
      "Traces",
      "Record what happened, what context was used, which tools were called, and how outputs were produced.",
    ],
    [
      "Recipes",
      "Apply reusable workflow overlays for TDD, security review, documentation, and team standards.",
    ],
    [
      "Local Context",
      "Keep operational context close to the workflow, not buried in chat history.",
    ],
    ["Agent Change Records", "Capture auditable evidence for AI-assisted engineering work."],
    ["Exports", "Share traces and run artifacts with other tools."],
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
    ["Debug an agent run with traces", "agentplane trace open"],
    ["Run a TDD workflow recipe", "agentplane recipes install tdd"],
    ["Create an Agent Change Record", "agentplane acr generate <task-id> --write"],
  ],
  closing: {
    title: "Run the local loop first.",
    text: "Install the CLI, initialize a project, run a workflow, inspect the trace, then decide which recipes or context packs are worth adding.",
  },
} as const;
