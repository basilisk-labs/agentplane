import type { CommandCtx, CommandSpec } from "../../cli/spec/spec.js";
import { createCliEmitter, infoMessage } from "../../cli/output.js";
import { resolveBlueprint } from "../../blueprints/index.js";
import { blueprintResolveInputFromTask } from "../blueprint/task-input.js";
import { loadTaskFromContext, type CommandContext } from "../shared/task-backend.js";

type EvidenceState = "present" | "missing" | "unknown";

type EvidenceCheckRow = {
  id: string;
  kind: string;
  producedBy: string;
  state: EvidenceState;
  reason: string;
};

export type TaskEvidenceCheckParsed = {
  taskId: string;
  strict: boolean;
  json: boolean;
};

export const taskEvidenceCheckSpec: CommandSpec<TaskEvidenceCheckParsed> = {
  id: ["task", "evidence", "check"],
  group: "Task",
  summary: "Compare blueprint required evidence with task artifacts and report missing evidence.",
  args: [{ name: "task-id", required: true, valueHint: "<task-id>" }],
  options: [
    {
      kind: "boolean",
      name: "strict",
      default: false,
      description: "Exit non-zero when required evidence is missing.",
    },
    { kind: "boolean", name: "json", default: false, description: "Emit JSON." },
  ],
  examples: [
    {
      cmd: "agentplane task evidence check 202602030608-F1Q8AB --strict",
      why: "Fail before finish/integrate when blueprint evidence is incomplete.",
    },
  ],
  parse: (raw) => ({
    taskId: String(raw.args["task-id"]),
    strict: raw.opts.strict === true,
    json: raw.opts.json === true,
  }),
};

function sectionText(task: { sections?: Record<string, string> }, name: string): string {
  return task.sections?.[name] ?? "";
}

function evidenceState(
  task: Awaited<ReturnType<typeof loadTaskFromContext>>,
  kind: string,
): {
  state: EvidenceState;
  reason: string;
} {
  const verificationText = sectionText(task, "Verification");
  const planText = sectionText(task, "Plan");
  const scopeText = sectionText(task, "Scope");
  if (kind === "commit") {
    return task.commit && typeof task.commit.hash === "string"
      ? { state: "present", reason: `commit=${task.commit.hash}` }
      : { state: "missing", reason: "task commit metadata is absent" };
  }
  if (kind === "quality_report") {
    return task.quality_review?.state === "pass"
      ? { state: "present", reason: "quality_review.state=pass" }
      : { state: "missing", reason: "quality_review.state=pass is absent" };
  }
  if (kind === "check_result") {
    return task.verification?.state === "ok" || verificationText.trim().length > 0
      ? { state: "present", reason: "verification record or Verification section is present" }
      : { state: "missing", reason: "verification record is absent" };
  }
  if (kind === "approval") {
    return task.plan_approval?.state === "approved"
      ? { state: "present", reason: "plan_approval.state=approved" }
      : { state: "missing", reason: "approved plan is absent" };
  }
  if (kind === "artifact") {
    return planText.trim().length > 0 || scopeText.trim().length > 0
      ? { state: "present", reason: "Plan or Scope section is present" }
      : { state: "missing", reason: "task artifact narrative is absent" };
  }
  if (kind === "external_link") {
    return /https?:\/\/|#\d+|PR\b/i.test(verificationText)
      ? { state: "present", reason: "Verification section references an external link or PR" }
      : {
          state: "unknown",
          reason: "external evidence is provider-specific; inspect PR artifacts",
        };
  }
  return { state: "unknown", reason: `no checker registered for evidence kind ${kind}` };
}

export function makeRunTaskEvidenceCheckHandler(getCtx: (cmd: string) => Promise<CommandContext>) {
  return async (ctx: CommandCtx, parsed: TaskEvidenceCheckParsed): Promise<number> => {
    const commandCtx = await getCtx("task evidence check");
    const task = await loadTaskFromContext({ ctx: commandCtx, taskId: parsed.taskId });
    const input = blueprintResolveInputFromTask({ task, config: commandCtx.config });
    const resolved = resolveBlueprint({ input });
    const rows: EvidenceCheckRow[] = resolved.requiredEvidence.map((evidence) => {
      const state = evidenceState(task, evidence.kind);
      return {
        id: evidence.id,
        kind: evidence.kind,
        producedBy: evidence.producedBy,
        state: state.state,
        reason: state.reason,
      };
    });
    const missing = rows.filter((row) => row.state === "missing");
    const output = createCliEmitter();
    const payload = {
      task_id: task.id,
      blueprint_id: resolved.blueprint.id,
      ok: missing.length === 0,
      missing_count: missing.length,
      evidence: rows,
    };
    if (parsed.json) {
      output.json(payload);
    } else {
      output.report(
        [
          { label: "task", value: task.id },
          { label: "blueprint", value: resolved.blueprint.id },
          { label: "ok", value: payload.ok },
          ...rows.map((row) => ({
            label: row.state === "missing" ? "missing" : "evidence",
            value: `${row.id} ${row.kind}/${row.producedBy}: ${row.state} (${row.reason})`,
          })),
        ],
        { header: infoMessage(`task evidence check: ${task.id}`) },
      );
    }
    return parsed.strict && missing.length > 0 ? 3 : 0;
  };
}
