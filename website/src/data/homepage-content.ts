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
    titleLines: ["Let agents write code.", "Keep authority and", "proof in Git."],
    subtitle: "Agentplane puts coding agents on an approved, verifiable repository workflow.",
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
    eyebrow: "The authority gap",
    title: "A diff shows what changed. It does not show what was authorized or independently verified.",
    text: "Without a durable control record, reviewers have to trust the worker's own report about scope, checks, and completion.",
  },
  controlLoop: {
    eyebrow: "The control loop",
    title: "One clear path from intent to durable proof.",
    text: "Agentplane separates the worker from the authority that approves, observes, verifies, and closes its work.",
    steps: [
      {
        id: "authorize",
        icon: "authorize",
        tone: "blue",
        title: "Authorize",
        text: "Define the objective, writable scope, and allowed effects.",
        evidence: "The agent receives one bounded WorkOrder.",
        artifact: "AgentWorkOrder v2",
      },
      {
        id: "run",
        icon: "run",
        tone: "violet",
        title: "Run",
        text: "Dispatch one semantic episode to the coding agent.",
        evidence: "Actions stay inside the approved boundary.",
        artifact: "AgentSemanticResult v2",
      },
      {
        id: "verify",
        icon: "verify",
        tone: "green",
        title: "Verify",
        text: "Read repository facts and execute required checks.",
        evidence: "Observed results stay separate from agent claims.",
        artifact: "task verification",
      },
      {
        id: "record",
        icon: "record",
        tone: "coral",
        title: "Record",
        text: "Close deterministically or preserve an exact recovery route.",
        evidence: "Authority and proof travel with the code in Git.",
        artifact: "acr.json",
      },
    ],
  },
  durableProof: {
    eyebrow: "Durable proof in Git",
    title: "Every controlled task leaves evidence a reviewer can inspect.",
    text: "Task state, observations, verification status, and the Agent Change Record remain repository-owned and versioned together.",
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
    footer: "Hash-verify the evidence bundle and review the ACR with standard Git tooling.",
  },
  worksWith: {
    title: "Control plane, not another coding agent.",
    text: "Keep the model, editor, agent, and CI you already use. Agentplane gives each worker the same authority and evidence contract.",
    tools: ["Codex", "Claude Code", "Cursor", "Aider", "Any repository-capable agent"],
  },
  closing: {
    title: "Put your next agent task under control.",
    text: "Start in a repository you own. Inspect the WorkOrder, run the agent, and review the task record and ACR in Git.",
  },
} as const;
