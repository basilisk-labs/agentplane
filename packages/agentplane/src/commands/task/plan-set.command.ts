import {
  readRecipeTaskInput,
  prepareRecipeTaskInput,
  recipePreparationMessage,
} from "./recipe-input.js";
import { TASK_KERNEL_EXTENSION } from "../../adapters/task-backend/kernel-record.js";
import { setCanonicalPlan } from "./kernel-plan.js";
import { createCliEmitter } from "../../cli/output.js";
import type { CommandCtx, CommandSpec } from "../../cli/spec/spec.js";
import { usageError } from "../../cli/spec/errors.js";
import type { CommandContext } from "../shared/task-backend.js";
import { resolveTextPayload, validateTextPayloadSource } from "../shared/text-payload.js";

import { cmdTaskPlanSet } from "./plan.js";

export type TaskPlanSetParsed = {
  taskId: string;
  text?: string;
  file?: string;
  recipeFile?: string;
  updatedBy?: string;
  scopeExpansionApprovedBy?: string;
};

export const taskPlanSetSpec: CommandSpec<TaskPlanSetParsed> = {
  id: ["task", "plan", "set"],
  group: "Task",
  summary: "Set a task plan (writes the Plan section and resets plan approval to pending).",
  args: [{ name: "task-id", required: true, valueHint: "<task-id>" }],
  options: [
    {
      kind: "string",
      name: "recipe-file",
      valueHint: "<path>",
      description:
        "Prepare an exact V2 selection or propose its committed retained closure. Never approves or executes work. Exclusive with --file/--text.",
    },
    {
      kind: "string",
      name: "text",
      valueHint: "<text>",
      description: String.raw`Plan text to write into the task README Plan section. Literal escaped newlines (\n) are normalized for inline text.`,
    },
    {
      kind: "string",
      name: "file",
      valueHint: "<path>",
      description: "Read plan text from a file path (relative to cwd).",
    },
    {
      kind: "string",
      name: "updated-by",
      valueHint: "<id>",
      description: "Optional. Sets doc_updated_by when writing the plan.",
    },
    {
      kind: "string",
      name: "scope-expansion-approved-by",
      valueHint: "<role>",
      description:
        "Explicit manual approval for an additive canonical WorkItem scope expansion. Requires USER.",
    },
  ],
  examples: [
    {
      cmd: String.raw`agentplane task plan set 202602030608-F1Q8AB --text "1) Do X\n2) Verify Y" --updated-by ORCHESTRATOR`,
      why: "Write plan from text and set doc_updated_by.",
    },
    {
      cmd: "agentplane task plan set 202602030608-F1Q8AB --file plan.md",
      why: "Write plan from a file.",
    },
  ],
  validateRaw: (raw) => {
    if (raw.opts["recipe-file"] === undefined) {
      validateTextPayloadSource(
        raw,
        taskPlanSetSpec,
        { inline: "text", file: "file", label: "plan text" },
        { required: true },
      );
    } else if (
      typeof raw.opts["recipe-file"] !== "string" ||
      !raw.opts["recipe-file"].trim() ||
      raw.opts.text !== undefined ||
      raw.opts.file !== undefined
    ) {
      throw usageError({
        spec: taskPlanSetSpec,
        message:
          "--recipe-file requires a nonempty path and cannot be combined with --file or --text.",
      });
    }
    const updatedBy = raw.opts["updated-by"];
    if (typeof updatedBy === "string" && updatedBy.trim().length === 0) {
      throw usageError({
        spec: taskPlanSetSpec,
        message: "Invalid value for --updated-by: empty.",
      });
    }
    const scopeExpansionApprovedBy = raw.opts["scope-expansion-approved-by"];
    if (scopeExpansionApprovedBy !== undefined && scopeExpansionApprovedBy !== "USER") {
      throw usageError({
        spec: taskPlanSetSpec,
        message: "--scope-expansion-approved-by requires exact USER authority.",
      });
    }
  },
  parse: (raw) => {
    return {
      taskId: String(raw.args["task-id"]),
      text: typeof raw.opts.text === "string" ? raw.opts.text : undefined,
      file: typeof raw.opts.file === "string" ? raw.opts.file : undefined,
      recipeFile:
        typeof raw.opts["recipe-file"] === "string" ? raw.opts["recipe-file"].trim() : undefined,
      updatedBy: typeof raw.opts["updated-by"] === "string" ? raw.opts["updated-by"] : undefined,
      scopeExpansionApprovedBy:
        typeof raw.opts["scope-expansion-approved-by"] === "string"
          ? raw.opts["scope-expansion-approved-by"]
          : undefined,
    };
  },
};

export function makeRunTaskPlanSetHandler(getCtx: (cmd: string) => Promise<CommandContext>) {
  return async (ctx: CommandCtx, p: TaskPlanSetParsed): Promise<number> => {
    const command = await getCtx("task plan set");
    const source = await command.taskBackend.getTask(p.taskId);
    if (p.recipeFile) {
      if (!source?.extensions || !Object.hasOwn(source.extensions, TASK_KERNEL_EXTENSION))
        throw new Error("Recipe preparation requires an existing canonical Task.");
      const input = await readRecipeTaskInput({
        root: command.resolvedProject.gitRoot,
        cwd: ctx.cwd,
        file: p.recipeFile,
      });
      const preparation = await prepareRecipeTaskInput(command, p.taskId, input);
      if (preparation.prepared.kind !== "compiled") {
        createCliEmitter().json({
          task_id: p.taskId,
          status: preparation.prepared.kind,
          ...preparation,
          guidance: recipePreparationMessage(preparation.prepared.kind),
        });
        return 0;
      }
      const result = await setCanonicalPlan(command, p.taskId, preparation.prepared.proposal, {
        scopeExpansionApprovedBy: p.scopeExpansionApprovedBy,
      });
      createCliEmitter().json({
        task_id: p.taskId,
        status: "advance_required",
        canonical_revision: result.record.aggregate.revision,
        plan_digest: result.record.aggregate.current_plan?.digest,
        next_command: `agentplane task advance ${p.taskId} --agent-json`,
      });
      return 0;
    }
    if (source?.extensions && Object.hasOwn(source.extensions, TASK_KERNEL_EXTENSION)) {
      const text = await resolveTextPayload({
        cwd: ctx.cwd,
        inline: p.text,
        file: p.file,
        label: "plan",
      });
      const result = await setCanonicalPlan(command, p.taskId, JSON.parse(text), {
        scopeExpansionApprovedBy: p.scopeExpansionApprovedBy,
      });
      createCliEmitter().json({
        task_id: p.taskId,
        canonical_revision: result.record.aggregate.revision,
        plan_digest: result.record.aggregate.current_plan?.digest,
      });
      return 0;
    }
    return await cmdTaskPlanSet({
      ctx: command,
      cwd: ctx.cwd,
      rootOverride: ctx.rootOverride,
      taskId: p.taskId,
      text: p.text,
      file: p.file,
      updatedBy: p.updatedBy,
    });
  };
}
