import { parseGroupCommand, type GroupCommandParsed } from "../../cli/group-command.js";
import { usageError } from "../../cli/spec/errors.js";
import type { CommandSpec } from "../../cli/spec/spec.js";

type AcrMode = "schema" | "local" | "ci";

export type AcrGenerateParsed = {
  taskId: string;
  workCommit?: string;
  baseCommit?: string;
  agent?: string;
  agentName?: string;
  modelProvider?: "anthropic" | "openai" | "cursor" | "aider" | "unknown" | "custom";
  modelName?: string;
  out?: string;
  write: boolean;
  stdout: boolean;
  refresh: boolean;
  json: boolean;
};

export type AcrValidateParsed = {
  target: string;
  mode: AcrMode;
  strict: boolean;
  json: boolean;
};

export type AcrCheckParsed = {
  taskId: string;
  mode: AcrMode;
  requirePlanApproved: boolean;
  requireVerification: boolean;
  requirePolicyPass: boolean;
  allowWaivedVerification: boolean;
  allowManualOverride: boolean;
  json: boolean;
};

export type AcrExplainParsed = {
  target: string;
  json: boolean;
};

export type AcrSchemaParsed = {
  version: "0.1";
  out?: string;
};

export const acrSpec: CommandSpec<GroupCommandParsed> = {
  id: ["acr"],
  group: "ACR",
  summary: "Generate, validate, check, explain, and print Agent Change Record artifacts.",
  description:
    "This is a command group. Use a subcommand such as `agentplane acr generate ...`, `agentplane acr validate ...`, or `agentplane acr schema`.",
  args: [{ name: "cmd", required: false, variadic: true, valueHint: "<cmd>" }],
  examples: [
    {
      cmd: "agentplane acr generate 202605031625-886KZ6 --work-commit HEAD --write",
      why: "Generate a task-local ACR.",
    },
  ],
  parse: (raw) => parseGroupCommand(raw),
};

export const acrSchemaSpec: CommandSpec<AcrSchemaParsed> = {
  id: ["acr", "schema"],
  group: "ACR",
  summary: "Print or write the ACR v0.1 JSON Schema.",
  options: [
    {
      kind: "string",
      name: "version",
      valueHint: "<version>",
      choices: ["0.1"],
      default: "0.1",
      description: "ACR schema version.",
    },
    {
      kind: "string",
      name: "out",
      valueHint: "<path>",
      description: "Write schema to a file instead of stdout.",
    },
  ],
  examples: [
    { cmd: "agentplane acr schema --version 0.1", why: "Print the bundled schema." },
    {
      cmd: "agentplane acr schema --version 0.1 --out schemas/acr-v0.1.schema.json",
      why: "Write the bundled schema to a custom path.",
    },
  ],
  parse: (raw) => ({
    version: (raw.opts.version ?? "0.1") as "0.1",
    out: typeof raw.opts.out === "string" ? raw.opts.out : undefined,
  }),
};

export const acrGenerateSpec: CommandSpec<AcrGenerateParsed> = {
  id: ["acr", "generate"],
  group: "ACR",
  summary: "Generate an Agent Change Record from task, Git, policy, and verification state.",
  args: [{ name: "task-id", required: true, valueHint: "<task-id>" }],
  options: [
    {
      kind: "string",
      name: "work-commit",
      valueHint: "<rev>",
      description: "Implementation revision.",
    },
    {
      kind: "string",
      name: "base-commit",
      valueHint: "<rev>",
      description: "Base revision override.",
    },
    {
      kind: "string",
      name: "agent",
      valueHint: "<id>",
      description: "Agentplane role or agent id.",
    },
    {
      kind: "string",
      name: "agent-name",
      valueHint: "<name>",
      description: "Human-readable agent name.",
    },
    {
      kind: "string",
      name: "model-provider",
      valueHint: "<provider>",
      choices: ["anthropic", "openai", "cursor", "aider", "unknown", "custom"],
      description: "Model provider.",
    },
    { kind: "string", name: "model-name", valueHint: "<name>", description: "Model name." },
    { kind: "string", name: "out", valueHint: "<path>", description: "Write ACR to custom path." },
    { kind: "boolean", name: "write", default: false, description: "Write task-local ACR." },
    { kind: "boolean", name: "stdout", default: false, description: "Print ACR JSON to stdout." },
    { kind: "boolean", name: "refresh", default: false, description: "Overwrite existing ACR." },
    { kind: "boolean", name: "json", default: false, description: "Emit machine-readable result." },
  ],
  examples: [
    {
      cmd: "agentplane acr generate 202605031625-886KZ6 --work-commit HEAD --write",
      why: "Write `.agentplane/tasks/<task-id>/acr.json`.",
    },
  ],
  validateRaw: (raw) => {
    if (raw.opts.write === true && typeof raw.opts.out === "string") {
      throw usageError({
        spec: acrGenerateSpec,
        command: "acr generate",
        message: "--write and --out are mutually exclusive.",
      });
    }
  },
  parse: (raw) => ({
    taskId: String(raw.args["task-id"]),
    workCommit: typeof raw.opts["work-commit"] === "string" ? raw.opts["work-commit"] : undefined,
    baseCommit: typeof raw.opts["base-commit"] === "string" ? raw.opts["base-commit"] : undefined,
    agent: typeof raw.opts.agent === "string" ? raw.opts.agent : undefined,
    agentName: typeof raw.opts["agent-name"] === "string" ? raw.opts["agent-name"] : undefined,
    modelProvider: raw.opts["model-provider"] as AcrGenerateParsed["modelProvider"],
    modelName: typeof raw.opts["model-name"] === "string" ? raw.opts["model-name"] : undefined,
    out: typeof raw.opts.out === "string" ? raw.opts.out : undefined,
    write: raw.opts.write === true,
    stdout: raw.opts.stdout === true,
    refresh: raw.opts.refresh === true,
    json: raw.opts.json === true,
  }),
};

export const acrValidateSpec: CommandSpec<AcrValidateParsed> = {
  id: ["acr", "validate"],
  group: "ACR",
  summary: "Validate an ACR file by schema, local, or CI invariants.",
  args: [{ name: "task-id-or-path", required: true, valueHint: "<task-id-or-path>" }],
  options: [
    {
      kind: "string",
      name: "mode",
      valueHint: "<schema|local|ci>",
      choices: ["schema", "local", "ci"],
      default: "local",
      description: "Validation mode.",
    },
    { kind: "boolean", name: "strict", default: false, description: "Treat warnings as failures." },
    { kind: "boolean", name: "json", default: false, description: "Emit machine-readable result." },
  ],
  examples: [
    { cmd: "agentplane acr validate 202605031625-886KZ6 --mode local", why: "Validate task ACR." },
  ],
  parse: (raw) => ({
    target: String(raw.args["task-id-or-path"]),
    mode: (raw.opts.mode ?? "local") as AcrMode,
    strict: raw.opts.strict === true,
    json: raw.opts.json === true,
  }),
};

export const acrCheckSpec: CommandSpec<AcrCheckParsed> = {
  id: ["acr", "check"],
  group: "ACR",
  summary: "Run the ACR merge-gate check for CI and branch review.",
  args: [{ name: "task-id", required: true, valueHint: "<task-id>" }],
  options: [
    {
      kind: "string",
      name: "mode",
      valueHint: "<ci>",
      choices: ["ci"],
      default: "ci",
      description: "Check mode.",
    },
    {
      kind: "boolean",
      name: "require-plan-approved",
      default: true,
      description: "Require approved plan.",
    },
    {
      kind: "boolean",
      name: "require-verification",
      default: true,
      description: "Require passed verification.",
    },
    {
      kind: "boolean",
      name: "require-policy-pass",
      default: true,
      description: "Reject failed policy decisions.",
    },
    {
      kind: "boolean",
      name: "allow-waived-verification",
      default: false,
      description: "Allow waived verification with approval.",
    },
    {
      kind: "boolean",
      name: "allow-manual-override",
      default: false,
      description: "Allow policy manual_override with approval.",
    },
    { kind: "boolean", name: "json", default: false, description: "Emit machine-readable result." },
  ],
  examples: [{ cmd: "agentplane acr check 202605031625-886KZ6 --mode ci", why: "Run merge gate." }],
  parse: (raw) => ({
    taskId: String(raw.args["task-id"]),
    mode: (raw.opts.mode ?? "ci") as AcrMode,
    requirePlanApproved: raw.opts["require-plan-approved"] !== false,
    requireVerification: raw.opts["require-verification"] !== false,
    requirePolicyPass: raw.opts["require-policy-pass"] !== false,
    allowWaivedVerification: raw.opts["allow-waived-verification"] === true,
    allowManualOverride: raw.opts["allow-manual-override"] === true,
    json: raw.opts.json === true,
  }),
};

export const acrExplainSpec: CommandSpec<AcrExplainParsed> = {
  id: ["acr", "explain"],
  group: "ACR",
  summary: "Explain an ACR for human review.",
  args: [{ name: "task-id-or-path", required: true, valueHint: "<task-id-or-path>" }],
  options: [
    {
      kind: "boolean",
      name: "json",
      default: false,
      description: "Emit machine-readable summary.",
    },
  ],
  examples: [
    { cmd: "agentplane acr explain 202605031625-886KZ6", why: "Summarize ACR readiness." },
  ],
  parse: (raw) => ({
    target: String(raw.args["task-id-or-path"]),
    json: raw.opts.json === true,
  }),
};
