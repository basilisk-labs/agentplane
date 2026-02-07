import { readFile } from "node:fs/promises";
import path from "node:path";

import { ensureDocSections, setMarkdownSection } from "@agentplaneorg/core";

import { mapBackendError, mapCoreError } from "../../cli/error-map.js";
import { backendNotSupportedMessage, missingValueMessage, usageMessage } from "../../cli/output.js";
import { CliError } from "../../shared/errors.js";
import {
  loadCommandContext,
  loadTaskFromContext,
  type CommandContext,
} from "../shared/task-backend.js";

import { nowIso } from "./shared.js";

export const TASK_PLAN_USAGE = "Usage: agentplane task plan <set|approve|reject> <task-id> [flags]";
export const TASK_PLAN_USAGE_EXAMPLE = 'agentplane task plan set 202602030608-F1Q8AB --text "..."';

export const TASK_PLAN_SET_USAGE =
  "Usage: agentplane task plan set <task-id> (--text <text> | --file <path>) [--updated-by <id>]";
export const TASK_PLAN_SET_USAGE_EXAMPLE = String.raw`agentplane task plan set 202602030608-F1Q8AB --text "1) ...\n2) ..." --updated-by ORCHESTRATOR`;

export const TASK_PLAN_APPROVE_USAGE =
  "Usage: agentplane task plan approve <task-id> --by <id> [--note <text>]";
export const TASK_PLAN_APPROVE_USAGE_EXAMPLE =
  'agentplane task plan approve 202602030608-F1Q8AB --by USER --note "OK"';

export const TASK_PLAN_REJECT_USAGE =
  "Usage: agentplane task plan reject <task-id> --by <id> --note <text>";
export const TASK_PLAN_REJECT_USAGE_EXAMPLE =
  'agentplane task plan reject 202602030608-F1Q8AB --by USER --note "Need clarification"';

type PlanSetFlags = {
  text?: string;
  file?: string;
  updatedBy?: string;
};

type PlanDecisionFlags = {
  by?: string;
  note?: string;
};

function extractDocSection(doc: string, sectionName: string): string | null {
  const lines = doc.replaceAll("\r\n", "\n").split("\n");
  let capturing = false;
  const out: string[] = [];

  for (const line of lines) {
    const match = /^##\s+(.*)$/.exec(line.trim());
    if (match) {
      if (capturing) break;
      capturing = (match[1] ?? "").trim() === sectionName;
      continue;
    }
    if (capturing) out.push(line);
  }

  if (!capturing) return null;
  return out.join("\n").trimEnd();
}

function parsePlanSetFlags(args: string[]): PlanSetFlags {
  const out: PlanSetFlags = {};

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    if (!arg) continue;
    if (!arg.startsWith("--")) {
      throw new CliError({ exitCode: 2, code: "E_USAGE", message: `Unexpected argument: ${arg}` });
    }
    const next = args[i + 1];
    if (!next) {
      throw new CliError({ exitCode: 2, code: "E_USAGE", message: missingValueMessage(arg) });
    }
    switch (arg) {
      case "--text": {
        out.text = next;
        break;
      }
      case "--file": {
        out.file = next;
        break;
      }
      case "--updated-by": {
        out.updatedBy = next;
        break;
      }
      default: {
        throw new CliError({ exitCode: 2, code: "E_USAGE", message: `Unknown flag: ${arg}` });
      }
    }
    i++;
  }

  return out;
}

function parsePlanDecisionFlags(args: string[]): PlanDecisionFlags {
  const out: PlanDecisionFlags = {};

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    if (!arg) continue;
    if (!arg.startsWith("--")) {
      throw new CliError({ exitCode: 2, code: "E_USAGE", message: `Unexpected argument: ${arg}` });
    }
    const next = args[i + 1];
    if (!next) {
      throw new CliError({ exitCode: 2, code: "E_USAGE", message: missingValueMessage(arg) });
    }
    switch (arg) {
      case "--by": {
        out.by = next;
        break;
      }
      case "--note": {
        out.note = next;
        break;
      }
      default: {
        throw new CliError({ exitCode: 2, code: "E_USAGE", message: `Unknown flag: ${arg}` });
      }
    }
    i++;
  }

  return out;
}

export async function cmdTaskPlan(opts: {
  ctx?: CommandContext;
  cwd: string;
  rootOverride?: string;
  args: string[];
}): Promise<number> {
  const [subcommand, taskId, ...restArgs] = opts.args;
  if (!subcommand || !taskId) {
    throw new CliError({
      exitCode: 2,
      code: "E_USAGE",
      message: usageMessage(TASK_PLAN_USAGE, TASK_PLAN_USAGE_EXAMPLE),
    });
  }

  try {
    const ctx =
      opts.ctx ??
      (await loadCommandContext({ cwd: opts.cwd, rootOverride: opts.rootOverride ?? null }));
    const backend = ctx.taskBackend;
    const config = ctx.config;
    const resolved = ctx.resolvedProject;
    const task = await loadTaskFromContext({ ctx, taskId });
    if (!backend.getTaskDoc || !backend.setTaskDoc || !backend.writeTask) {
      throw new CliError({
        exitCode: 2,
        code: "E_USAGE",
        message: backendNotSupportedMessage("task docs"),
      });
    }

    if (subcommand === "set") {
      const flags = parsePlanSetFlags(restArgs);
      const hasText = flags.text !== undefined;
      const hasFile = flags.file !== undefined;
      if (hasText === hasFile) {
        throw new CliError({
          exitCode: 2,
          code: "E_USAGE",
          message: usageMessage(TASK_PLAN_SET_USAGE, TASK_PLAN_SET_USAGE_EXAMPLE),
        });
      }
      let updatedBy: string | undefined;
      if (flags.updatedBy !== undefined) {
        const trimmed = flags.updatedBy.trim();
        if (!trimmed) {
          throw new CliError({
            exitCode: 2,
            code: "E_USAGE",
            message: "--updated-by must be non-empty",
          });
        }
        updatedBy = trimmed;
      }

      let text = flags.text ?? "";
      if (hasFile) {
        try {
          text = await readFile(path.resolve(opts.cwd, flags.file ?? ""), "utf8");
        } catch (err) {
          throw mapCoreError(err, { command: "task plan set", filePath: flags.file ?? "" });
        }
      }

      const existingDoc =
        (typeof task.doc === "string" ? task.doc : "") || (await backend.getTaskDoc(task.id));
      const baseDoc = ensureDocSections(existingDoc ?? "", config.tasks.doc.required_sections);
      const nextDoc = ensureDocSections(
        setMarkdownSection(baseDoc, "Plan", text),
        config.tasks.doc.required_sections,
      );

      await backend.writeTask({
        ...task,
        doc: nextDoc,
        plan_approval: { state: "pending", updated_at: null, updated_by: null, note: null },
        ...(updatedBy ? { doc_updated_by: updatedBy } : {}),
      });

      const readmePath = path.join(
        resolved.gitRoot,
        config.paths.workflow_dir,
        task.id,
        "README.md",
      );
      process.stdout.write(`${readmePath}\n`);
      return 0;
    }

    if (subcommand === "approve" || subcommand === "reject") {
      const flags = parsePlanDecisionFlags(restArgs);
      const by = (flags.by ?? "").trim();
      if (!by) {
        const usage = subcommand === "approve" ? TASK_PLAN_APPROVE_USAGE : TASK_PLAN_REJECT_USAGE;
        const example =
          subcommand === "approve"
            ? TASK_PLAN_APPROVE_USAGE_EXAMPLE
            : TASK_PLAN_REJECT_USAGE_EXAMPLE;
        throw new CliError({ exitCode: 2, code: "E_USAGE", message: usageMessage(usage, example) });
      }
      const note = typeof flags.note === "string" ? flags.note.trim() : "";
      if (subcommand === "reject" && note.length === 0) {
        throw new CliError({
          exitCode: 2,
          code: "E_USAGE",
          message: usageMessage(TASK_PLAN_REJECT_USAGE, TASK_PLAN_REJECT_USAGE_EXAMPLE),
        });
      }

      const existingDoc =
        (typeof task.doc === "string" ? task.doc : "") || (await backend.getTaskDoc(task.id));
      const baseDoc = ensureDocSections(existingDoc ?? "", config.tasks.doc.required_sections);
      const plan = extractDocSection(baseDoc, "Plan");
      if (!plan || plan.trim().length === 0) {
        throw new CliError({
          exitCode: 3,
          code: "E_VALIDATION",
          message: `${task.id}: cannot ${subcommand} plan: ## Plan section is missing or empty`,
        });
      }

      await backend.writeTask({
        ...task,
        plan_approval: {
          state: subcommand === "approve" ? "approved" : "rejected",
          updated_at: nowIso(),
          updated_by: by,
          note: note || null,
        },
      });

      return 0;
    }

    throw new CliError({
      exitCode: 2,
      code: "E_USAGE",
      message: usageMessage(TASK_PLAN_USAGE, TASK_PLAN_USAGE_EXAMPLE),
    });
  } catch (err) {
    if (err instanceof CliError) throw err;
    throw mapBackendError(err, { command: "task plan", root: opts.rootOverride ?? null });
  }
}
