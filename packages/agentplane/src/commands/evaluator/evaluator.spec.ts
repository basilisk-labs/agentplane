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

export const evaluatorSpec: CommandSpec<GroupCommandParsed> = {
  id: ["evaluator"],
  group: "Evaluators",
  summary: "List and inspect evaluator prompt modules.",
  description:
    "This is a command group. Use `agentplane evaluator list` or `agentplane evaluator show <id>`. Evaluator execution is planned for v0.8 and is not exposed yet.",
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

export const evaluatorListSpec: CommandSpec<EvaluatorListParsed> = {
  id: ["evaluator", "list"],
  group: "Evaluators",
  summary: "List evaluator prompt modules from .agentplane/evaluators.",
  options: [
    {
      kind: "boolean",
      name: "builtin",
      default: true,
      description: "Include packaged evaluator modules when no project override exists.",
    },
    { kind: "boolean", name: "json", default: false, description: "Emit JSON." },
  ],
  examples: [
    { cmd: "agentplane evaluator list", why: "Show evaluator ids and prompt metadata." },
    { cmd: "agentplane evaluator list --json", why: "Emit machine-readable evaluator metadata." },
  ],
  parse: (raw) => ({
    json: raw.opts.json === true,
    builtin: raw.opts.builtin !== false,
  }),
};

export const evaluatorShowSpec: CommandSpec<EvaluatorShowParsed> = {
  id: ["evaluator", "show"],
  group: "Evaluators",
  summary: "Print an evaluator prompt module.",
  args: [{ name: "id", required: true, valueHint: "<id>" }],
  options: [
    {
      kind: "boolean",
      name: "builtin",
      default: true,
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
    builtin: raw.opts.builtin !== false,
  }),
};
