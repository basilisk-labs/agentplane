import type { CommandSpec } from "../../cli/spec/spec.js";

export type TaskAdvanceParsed = {
  taskId: string;
  agentJson: boolean;
  remote: boolean;
};

export const taskAdvanceSpec: CommandSpec<TaskAdvanceParsed> = {
  id: ["task", "advance"],
  group: "Task",
  summary: "Return one compact external-agent action from the shared task supervisor state.",
  args: [{ name: "task-id", required: true, valueHint: "<task-id>" }],
  options: [
    {
      kind: "boolean",
      name: "agent-json",
      default: false,
      description: "Emit the stable compact external-agent protocol.",
    },
    {
      kind: "boolean",
      name: "remote",
      default: false,
      description: "Include hosted state while preparing the shared supervisor decision.",
    },
  ],
  examples: [
    {
      cmd: "agentplane task advance 202602030608-F1Q8AB --agent-json",
      why: "Obtain one bounded action without reconstructing lifecycle state.",
    },
  ],
  notes: [
    "The command prepares the same canonical work order and route decision used by the managed task runner.",
    "It executes only registered deterministic transitions, then stops before semantic work, approval, human input, external wait, or terminal attention.",
    "--agent-json changes only rendering; any formal transition is journaled, fingerprint-checked, and supervisor-owned.",
  ],
  parse: (raw) => ({
    taskId: String(raw.args["task-id"]),
    agentJson: raw.opts["agent-json"] === true,
    remote: raw.opts.remote === true,
  }),
};
