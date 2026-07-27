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
export type EvaluatorRunProvenance = "human_supplied" | "evaluator_supplied";

export type EvaluatorRunParsed = {
  taskId: string;
  evaluator: string;
  verdict: EvaluatorRunVerdict;
  provenance: EvaluatorRunProvenance;
  summary: string;
  findings: string[];
  evidenceRefs: string[];
  missingTests: string[];
  hiddenAssumptions: string[];
  residualRisks: string[];
  reworkContext: string[];
  json: boolean;
  record: boolean;
};

export type EvaluatorPrepareParsed = {
  taskId: string;
  evaluator: string;
  json: boolean;
};

export type EvaluatorApplyParsed = {
  taskId: string;
  workOrderPath: string;
  resultPath: string;
  json: boolean;
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
  summary: "Prepare, apply, inspect, and record evaluator quality reviews.",
  description:
    "This is a command group. Use `agentplane evaluator prepare`, `agentplane evaluator apply`, `agentplane evaluator list`, `agentplane evaluator show <id>`, or the compatibility `agentplane evaluator run <task-id>` facade.",
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

export const evaluatorPrepareSpec: CommandSpec<EvaluatorPrepareParsed> = {
  id: ["evaluator", "prepare"],
  group: "Evaluators",
  summary: "Freeze bounded evidence and build a read-only EVALUATOR work order.",
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
      kind: "boolean",
      name: "json",
      default: false,
      description: "Emit machine-readable work-order paths.",
    },
  ],
  parse: (raw) => ({
    taskId: String(raw.args.taskId ?? "").trim(),
    evaluator:
      typeof raw.opts.evaluator === "string" ? raw.opts.evaluator.trim() : "recovery-context",
    json: raw.opts.json === true,
  }),
};

export const evaluatorApplySpec: CommandSpec<EvaluatorApplyParsed> = {
  id: ["evaluator", "apply"],
  group: "Evaluators",
  summary: "Validate and record a typed EVALUATOR result against a frozen work order.",
  args: [{ name: "taskId", required: true, valueHint: "<task-id>" }],
  options: [
    {
      kind: "string",
      name: "work-order",
      valueHint: "<path>",
      description: "Prepared EvaluatorWorkOrder JSON path.",
    },
    {
      kind: "string",
      name: "result",
      valueHint: "<path>",
      description: "EVALUATOR-produced EvaluatorSgrResult JSON path.",
    },
    {
      kind: "boolean",
      name: "json",
      default: false,
      description: "Emit machine-readable recorded paths.",
    },
  ],
  validateRaw: (raw) => {
    if (
      !raw.args.taskId ||
      typeof raw.opts["work-order"] !== "string" ||
      typeof raw.opts.result !== "string"
    ) {
      throw usageError({
        spec: evaluatorApplySpec,
        command: "evaluator apply",
        message: "Provide a task id, --work-order, and --result.",
      });
    }
  },
  parse: (raw) => {
    const workOrderPath = raw.opts["work-order"];
    const resultPath = raw.opts.result;
    return {
      taskId: String(raw.args.taskId ?? "").trim(),
      workOrderPath: typeof workOrderPath === "string" ? workOrderPath.trim() : "",
      resultPath: typeof resultPath === "string" ? resultPath.trim() : "",
      json: raw.opts.json === true,
    };
  },
};

export const evaluatorRunSpec: CommandSpec<EvaluatorRunParsed> = {
  id: ["evaluator", "run"],
  group: "Evaluators",
  summary: "Compatibility facade for preparing and recording a structured quality review.",
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
      name: "provenance",
      valueHint: "<human_supplied|evaluator_supplied>",
      choices: ["human_supplied", "evaluator_supplied"],
      description:
        "Origin of the supplied review values. This command records a result; it does not execute an evaluator.",
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
      kind: "string",
      name: "rework-context",
      valueHint: "<text>",
      repeatable: true,
      description: "Machine-readable rework instruction for the next owner pass. May be repeated.",
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
      cmd: 'agentplane evaluator run 202605232011-MAW1PK --provenance human_supplied --verdict human_review --summary "A human decision is required." --finding "Acceptance remains ambiguous." --evidence .agentplane/tasks/202605232011-MAW1PK/README.md',
      why: "Record an explicitly human-supplied semantic review.",
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
    if (!raw.opts.provenance) {
      throw usageError({
        spec: evaluatorRunSpec,
        command: "evaluator run",
        message: "Provide --provenance.",
      });
    }
  },
  parse: (raw) => ({
    taskId: String(raw.args.taskId ?? "").trim(),
    evaluator:
      typeof raw.opts.evaluator === "string" ? raw.opts.evaluator.trim() : "recovery-context",
    verdict: String(raw.opts.verdict) as EvaluatorRunVerdict,
    provenance: String(raw.opts.provenance) as EvaluatorRunProvenance,
    summary: typeof raw.opts.summary === "string" ? raw.opts.summary.trim() : "",
    findings: toStringList(raw.opts.finding),
    evidenceRefs: toStringList(raw.opts.evidence),
    missingTests: toStringList(raw.opts["missing-test"]),
    hiddenAssumptions: toStringList(raw.opts["hidden-assumption"]),
    residualRisks: toStringList(raw.opts["residual-risk"]),
    reworkContext: toStringList(raw.opts["rework-context"]),
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
