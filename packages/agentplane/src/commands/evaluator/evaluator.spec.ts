import { parseGroupCommand, type GroupCommandParsed } from "../../cli/group-command.js";
import { usageError } from "../../cli/spec/errors.js";
import type { CommandSpec } from "../../cli/spec/spec.js";

export type EvaluatorListParsed = {
  json: boolean;
  builtin: boolean;
};

export type EvaluatorShowParsed = {
  id: string;
  json: boolean;
  builtin: boolean;
};

export type EvaluatorRunVerdict = "pass" | "rework" | "blocked" | "human_review";

export type EvaluatorRunParsed = {
  taskId: string;
  evaluator: string;
  verdict: EvaluatorRunVerdict;
  summary: string;
  findings: string[];
  evidenceRefs: string[];
  missingTests: string[];
  hiddenAssumptions: string[];
  residualRisks: string[];
  json: boolean;
  record: boolean;
};

function parseBuiltinFlag(value: unknown): boolean {
  return value !== "false";
}

function toStringList(value: unknown): string[] {
  if (Array.isArray(value))
    return value
      .map(String)
      .map((row) => row.trim())
      .filter(Boolean);
  if (typeof value === "string") {
    const trimmed = value.trim();
    return trimmed ? [trimmed] : [];
  }
  return [];
}

export const evaluatorSpec: CommandSpec<GroupCommandParsed> = {
  id: ["evaluator"],
  group: "Evaluators",
  summary: "List, inspect, and run evaluator quality reviews.",
  description:
    "This is a command group. Use `agentplane evaluator list`, `agentplane evaluator show <id>`, or `agentplane evaluator run <task-id>`.",
  args: [{ name: "cmd", required: false, variadic: true, valueHint: "<cmd>" }],
  examples: [
    { cmd: "agentplane evaluator list", why: "Show available evaluator prompt modules." },
    {
      cmd: "agentplane evaluator show recovery-context",
      why: "Print an evaluator prompt module.",
    },
  ],
  parse: (raw) => parseGroupCommand(raw),
};

export const evaluatorRunSpec: CommandSpec<EvaluatorRunParsed> = {
  id: ["evaluator", "run"],
  group: "Evaluators",
  summary: "Create and record a structured EVALUATOR quality review report.",
  args: [{ name: "taskId", required: true, valueHint: "<task-id>" }],
  options: [
    {
      kind: "string",
      name: "evaluator",
      valueHint: "<id>",
      default: "recovery-context",
      description: "Evaluator prompt module id to use.",
    },
    {
      kind: "string",
      name: "verdict",
      valueHint: "<pass|rework|blocked|human_review>",
      choices: ["pass", "rework", "blocked", "human_review"],
      description: "Quality verdict to record.",
    },
    {
      kind: "string",
      name: "summary",
      valueHint: "<text>",
      description: "Concise evaluator judgement summary.",
    },
    {
      kind: "string",
      name: "finding",
      valueHint: "<text>",
      repeatable: true,
      description: "Structured review finding. May be repeated.",
    },
    {
      kind: "string",
      name: "evidence",
      valueHint: "<path-or-note>",
      repeatable: true,
      description: "Evidence reference checked by the evaluator. May be repeated.",
    },
    {
      kind: "string",
      name: "missing-test",
      valueHint: "<text>",
      repeatable: true,
      description: "Missing test or check. May be repeated.",
    },
    {
      kind: "string",
      name: "hidden-assumption",
      valueHint: "<text>",
      repeatable: true,
      description: "Hidden assumption found during review. May be repeated.",
    },
    {
      kind: "string",
      name: "residual-risk",
      valueHint: "<text>",
      repeatable: true,
      description: "Residual risk after review. May be repeated.",
    },
    {
      kind: "boolean",
      name: "no-record",
      default: false,
      description: "Write evaluator artifacts without updating task quality_review.",
    },
    { kind: "boolean", name: "json", default: false, description: "Emit JSON." },
  ],
  examples: [
    {
      cmd: 'agentplane evaluator run 202605232011-MAW1PK --verdict pass --summary "Reviewed diff and checks." --finding "No unresolved findings after diff and verification review." --evidence .agentplane/tasks/202605232011-MAW1PK/README.md',
      why: "Record a structured EVALUATOR quality review.",
    },
  ],
  validateRaw: (raw) => {
    if (!raw.args.taskId) {
      throw usageError({
        spec: evaluatorRunSpec,
        command: "evaluator run",
        message: "Provide a task id.",
      });
    }
    if (!raw.opts.verdict) {
      throw usageError({
        spec: evaluatorRunSpec,
        command: "evaluator run",
        message: "Provide --verdict.",
      });
    }
  },
  parse: (raw) => ({
    taskId: String(raw.args.taskId ?? "").trim(),
    evaluator:
      typeof raw.opts.evaluator === "string" ? raw.opts.evaluator.trim() : "recovery-context",
    verdict: String(raw.opts.verdict) as EvaluatorRunVerdict,
    summary: typeof raw.opts.summary === "string" ? raw.opts.summary.trim() : "",
    findings: toStringList(raw.opts.finding),
    evidenceRefs: toStringList(raw.opts.evidence),
    missingTests: toStringList(raw.opts["missing-test"]),
    hiddenAssumptions: toStringList(raw.opts["hidden-assumption"]),
    residualRisks: toStringList(raw.opts["residual-risk"]),
    json: raw.opts.json === true,
    record: raw.opts["no-record"] !== true,
  }),
};

export const evaluatorListSpec: CommandSpec<EvaluatorListParsed> = {
  id: ["evaluator", "list"],
  group: "Evaluators",
  summary: "List evaluator prompt modules from .agentplane/evaluators.",
  options: [
    {
      kind: "string",
      name: "builtin",
      valueHint: "<true|false>",
      choices: ["true", "false"],
      default: "true",
      description: "Include packaged evaluator modules when no project override exists.",
    },
    { kind: "boolean", name: "json", default: false, description: "Emit JSON." },
  ],
  examples: [
    { cmd: "agentplane evaluator list", why: "Show evaluator ids and prompt metadata." },
    { cmd: "agentplane evaluator list --json", why: "Emit machine-readable evaluator metadata." },
    {
      cmd: "agentplane evaluator list --builtin false",
      why: "Show project-local evaluators only.",
    },
  ],
  parse: (raw) => ({
    json: raw.opts.json === true,
    builtin: parseBuiltinFlag(raw.opts.builtin),
  }),
};

export const evaluatorShowSpec: CommandSpec<EvaluatorShowParsed> = {
  id: ["evaluator", "show"],
  group: "Evaluators",
  summary: "Print an evaluator prompt module.",
  args: [{ name: "id", required: true, valueHint: "<id>" }],
  options: [
    {
      kind: "string",
      name: "builtin",
      valueHint: "<true|false>",
      choices: ["true", "false"],
      default: "true",
      description: "Include packaged evaluator modules when no project override exists.",
    },
    { kind: "boolean", name: "json", default: false, description: "Emit JSON." },
  ],
  examples: [
    {
      cmd: "agentplane evaluator show recovery-context",
      why: "Print the recovery-context evaluator prompt.",
    },
  ],
  validateRaw: (raw) => {
    if (!raw.args.id) {
      throw usageError({
        spec: evaluatorShowSpec,
        command: "evaluator show",
        message: "Provide an evaluator id.",
      });
    }
  },
  parse: (raw) => ({
    id: String(raw.args.id ?? "").trim(),
    json: raw.opts.json === true,
    builtin: parseBuiltinFlag(raw.opts.builtin),
  }),
};
