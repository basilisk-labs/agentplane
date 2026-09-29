import type { CommandSpec } from "../../cli/spec/spec.js";

import type { TaskNewParsed } from "./new.js";
import { normalizeDependsOnInput } from "./shared.js";

export const taskNewSpec: CommandSpec<TaskNewParsed> = {
  id: ["task", "new"],
  group: "Task",
  summary: "Create a new task (prints the generated task id).",
  description:
    "Creates a TODO task with doc_version=3, seeds the README v3 section layout, and writes it via the configured task backend.",
  options: [
    {
      kind: "string",
      name: "title",
      valueHint: "<text>",
      required: true,
      description: "Task title.",
    },
    {
      kind: "string",
      name: "description",
      valueHint: "<text>",
      required: true,
      description: "Task description.",
    },
    {
      kind: "string",
      name: "owner",
      valueHint: "<id>",
      required: true,
      description: "Owner id (e.g. CODER).",
    },
    {
      kind: "string",
      name: "priority",
      valueHint: "<low|normal|med|high>",
      choices: ["low", "normal", "med", "high"],
      default: "med",
      description: "Task priority (default: med).",
    },
    {
      kind: "string",
      name: "tag",
      valueHint: "<tag>",
      repeatable: true,
      minCount: 1,
      description: "Repeatable. Adds a tag (must provide at least one).",
    },
    {
      kind: "string",
      name: "task-kind",
      valueHint: "<analysis|content|docs|code|release|ops|context>",
      choices: ["analysis", "content", "docs", "code", "release", "ops", "context"],
      description: "Structured task-kind intent. Tags/title remain fallback hints.",
    },
    {
      kind: "string",
      name: "mutation-scope",
      valueHint: "<none|docs|code|release|ops|context|unknown>",
      choices: ["none", "docs", "code", "release", "ops", "context", "unknown"],
      description: "Structured task mutation scope.",
    },
    {
      kind: "string",
      name: "risk",
      valueHint: "<risk>",
      repeatable: true,
      choices: [
        "network",
        "credentials",
        "deploy",
        "publish",
        "merge",
        "security",
        "external_system",
      ],
      description:
        "Structured task risk flag. Repeatable. Controlled ops requires credentials, deploy, security, or external_system.",
    },
    {
      kind: "string",
      name: "route",
      valueHint: "<auto|direct|branch_pr>",
      choices: ["auto", "direct", "branch_pr"],
      default: "auto",
      description:
        "Task execution route. auto selects direct unless repository policy or isolation risk requires branch_pr.",
    },
    {
      kind: "string",
      name: "depends-on",
      valueHint: "<task-id>",
      repeatable: true,
      coerce: (raw) => normalizeDependsOnInput(raw),
      description: "Repeatable. Adds a dependency. Special-case: '[]' is treated as empty.",
    },
    {
      kind: "string",
      name: "verify",
      valueHint: "<command>",
      repeatable: true,
      description: "Repeatable. Verification commands/checks to run for this task.",
    },
    {
      kind: "boolean",
      name: "allow-duplicate",
      default: false,
      description:
        "Allow creating a task even when an open task with a highly similar title already exists.",
    },
  ],
  examples: [
    {
      cmd: 'agentplane task new --title "Refactor CLI" --description "Improve CLI output" --owner CODER --tag cli',
      why: "Create a new task with one tag.",
    },
    {
      cmd: 'agentplane task new --title "Restart the worker" --description "Restart one production worker" --owner OPS --tag ops --task-kind ops --mutation-scope ops --risk external_system',
      why: "Create a controlled ops task with complete structured intent.",
    },
  ],
  notes: [
    "Task creation defaults to doc_version=3 and seeds the README v3 section contract automatically.",
    "For verify-required primary tags, this command seeds a default ## Verify Steps acceptance contract in README.",
    "Tasks tagged or declared as ops must provide task kind, mutation scope, and a controlled ops risk before creation.",
  ],
  parse: (raw) => ({
    title: raw.opts.title as string,
    description: raw.opts.description as string,
    owner: raw.opts.owner as string,
    priority: (raw.opts.priority ?? "med") as TaskNewParsed["priority"],
    tags: (raw.opts.tag ?? []) as string[],
    taskKind: raw.opts["task-kind"] as TaskNewParsed["taskKind"],
    mutationScope: raw.opts["mutation-scope"] as TaskNewParsed["mutationScope"],
    riskFlags: (raw.opts.risk ?? []) as TaskNewParsed["riskFlags"],
    route: (raw.opts.route ?? "repository") as TaskNewParsed["route"],
    dependsOn: (raw.opts["depends-on"] ?? []) as string[],
    verify: (raw.opts.verify ?? []) as string[],
    allowDuplicate: raw.opts["allow-duplicate"] === true,
  }),
};
