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
    title: "Agentplane | Guardrails and workflow for coding agents",
    description:
      "AGENTS.md sets repository guardrails. Agentplane's CLI gives coding agents one bounded action at a time and records approvals, observed changes, and checks in Git.",
  },
  hero: {
    eyebrow: "A workflow CLI for coding agents",
    titleLines: ["Less workflow to track.", "More focus on the code."],
    subtitle:
      "AGENTS.md sets repository guardrails. The Agentplane CLI tracks task state, enforces approval boundaries, and gives your coding agent one bounded action at a time. Review observed changes and check results in Git.",
    trustLine: "Agent-agnostic · Local-first · No account required · MIT licensed",
  },
  receipt: {
    id: "run_9f3c2a1b · 2026-08-19 14:32 UTC",
    objective: "Fix parser edge case",
    commit: "b1e9d4f",
    rows: [
      ["Authority", "Bounded WorkOrder", "scope + allowed effects"],
      ["Scope", "src/parser/**", "modify + test"],
      ["Observed facts", "3 files changed", "repository readback"],
      ["Verification", "Unit · lint · types", "all required checks passed"],
    ],
  },
  authorityGap: {
    eyebrow: "Beyond the diff",
    title: "A diff shows the change. The task record shows its boundaries.",
    text: "See the approved scope, observed paths, and required check results together, without reconstructing the task from chat logs.",
  },
  controlLoop: {
    eyebrow: "The control loop",
    title: "The CLI carries the process. The agent handles the problem.",
    text: "After approval, Agentplane supplies one bounded WorkOrder at a time, observes the repository result, runs required checks, and records the outcome.",
    steps: [
      {
        id: "authorize",
        icon: "authorize",
        tone: "blue",
        title: "Authorize",
        text: "Set the objective, writable paths, and required checks.",
        evidence: "The agent receives the approved scope.",
        artifact: "AgentWorkOrder v2",
      },
      {
        id: "run",
        icon: "run",
        tone: "violet",
        title: "Run",
        text: "Give the coding agent one bounded action.",
        evidence: "Changes are checked against the approved scope.",
        artifact: "AgentSemanticResult v2",
      },
      {
        id: "verify",
        icon: "verify",
        tone: "green",
        title: "Verify",
        text: "Observe repository changes and run required checks.",
        evidence: "Observed facts stay separate from the agent's report.",
        artifact: "task verification",
      },
      {
        id: "record",
        icon: "record",
        tone: "coral",
        title: "Record",
        text: "Keep the task outcome and evidence in the repository.",
        evidence: "Reviewers can inspect the task record in Git.",
        artifact: "acr.json",
      },
    ],
  },
  formalChecks: {
    eyebrow: "Checking Agentplane itself",
    title: "We test the guardrails, too.",
    text: "A bounded Quint model explores a critical Task Kernel rule: a replayed effect must not gain a fresh right to dispatch. TLC checks the finite state space, and trace tests exercise the matching TypeScript paths.",
    scope:
      "A focused effect-ownership pilot, run during development and outside your agent's task.",
    rule: "Record intent before dispatch. Replays cannot own the effect again.",
    steps: [
      ["Model", "Quint describes the rule"],
      ["Explore", "TLC checks bounded states"],
      ["Match code", "Trace tests exercise TypeScript"],
    ],
  },
  durableProof: {
    eyebrow: "The review trail",
    title: "Inspect the task behind the diff.",
    text: "This illustrative task shows the approved scope, changed paths, check results, and task files a reviewer can inspect after the agent session ends.",
    commit: "b1e9d4f",
    summary: "agentplane: fix parser edge case",
    files: [
      ".agentplane/tasks/parser-edge/README.md",
      ".agentplane/tasks/parser-edge/observations.jsonl",
      ".agentplane/tasks/parser-edge/acr.json",
      ".agentplane/tasks/parser-edge/evidence/manifest.json",
    ],
    facts: [
      ["Authority", "bounded WorkOrder"],
      ["Scope", "src/parser/**"],
      ["Observed", "3 paths changed"],
      ["Verification", "unit, lint, types passed"],
    ],
    footer:
      "When you create an evidence bundle, verify its hashes and review the ACR with Git tooling.",
  },
  worksWith: {
    title: "Use the coding agent you already trust.",
    text: "Keep your model, editor, and CI. Agentplane adds a consistent task boundary and review trail around the agent's work.",
    tools: ["Codex", "Claude Code", "Cursor", "Hermes", "Any repository-capable agent"],
  },
  closing: {
    title: "Try Agentplane on one task in your repository.",
    text: "Set the scope, hand the next bounded action to your agent, and inspect the result in Git.",
  },
} as const;
