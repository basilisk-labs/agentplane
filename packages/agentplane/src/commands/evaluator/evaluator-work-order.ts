import { createHash } from "node:crypto";
import { z } from "zod";

import type { EvaluatorSgrResult } from "../../evaluators/sgr-result.js";
import { CliError } from "../../shared/errors.js";

export const EVALUATOR_ALLOWED_TOOL_CLASSES = [
  "repository_read",
  "git_read",
  "run_checks",
  "knowledge_request",
  "report_result",
] as const;

export const EVALUATOR_WORK_ORDER_SCHEMA = z
  .object({
    schema_version: z.literal(1),
    kind: z.literal("evaluator_work_order"),
    work_order_id: z.string().trim().min(1),
    prepared_at: z.string().datetime({ offset: true }),
    task: z
      .object({
        id: z.string().trim().min(1),
        revision: z.number().int().positive().nullable(),
        objective: z.string().trim().min(1),
        acceptance_criteria: z.array(z.string().trim().min(1)).min(1),
      })
      .strict(),
    evaluated_sha: z.string().trim().min(1).nullable(),
    diff_base_sha: z.string().trim().min(1).nullable().optional(),
    blueprint_digest: z.string().trim().min(1).nullable(),
    evaluator: z
      .object({
        id: z.string().trim().min(1),
        profile: z.string().trim().min(1),
        prompt_module_path: z.string().trim().min(1),
      })
      .strict(),
    authority: z
      .object({
        sandbox: z.literal("read-only"),
        writable_roots: z.array(z.string()).length(0),
        allowed_tool_classes: z.array(z.enum(EVALUATOR_ALLOWED_TOOL_CLASSES)),
        external_side_effects: z.array(z.string()).length(0),
      })
      .strict(),
    result_contract: z.literal("sgr.evaluator_result.v1"),
    packet: z
      .object({
        manifest_path: z.string().trim().min(1),
        manifest_sha256: z.string().regex(/^sha256:[a-f0-9]{64}$/u),
        prompt_path: z.string().trim().min(1),
        result_schema_path: z.string().trim().min(1),
      })
      .strict()
      .optional(),
    evidence: z
      .array(
        z
          .object({
            id: z.string().trim().min(1),
            kind: z.enum([
              "task_document",
              "actual_diff",
              "observed_checks",
              "verification_log",
              "blueprint",
              "policy_module",
              "knowledge_ref",
              "runtime_evidence",
              "qualification_packet",
            ]),
            path: z.string().trim().min(1),
            sha256: z.string().regex(/^sha256:[a-f0-9]{64}$/u),
            required: z.boolean(),
          })
          .strict(),
      )
      .min(3),
  })
  .strict();

export type EvaluatorWorkOrder = z.infer<typeof EVALUATOR_WORK_ORDER_SCHEMA>;

function sha256(value: string | Buffer): `sha256:${string}` {
  return `sha256:${createHash("sha256").update(value).digest("hex")}`;
}

export function evaluatorWorkOrderId(opts: {
  taskId: string;
  revision: number | null;
  evaluatedSha: string | null;
  diffBaseSha: string | null;
  evidence: EvaluatorWorkOrder["evidence"];
}): string {
  const digest = sha256(
    JSON.stringify({
      task_id: opts.taskId,
      revision: opts.revision,
      evaluated_sha: opts.evaluatedSha,
      diff_base_sha: opts.diffBaseSha,
      evidence: opts.evidence.map((entry) => [entry.id, entry.sha256]),
    }),
  ).slice("sha256:".length, "sha256:".length + 24);
  const task = opts.taskId.replaceAll(/[^A-Za-z0-9_.-]/gu, "-").slice(0, 96) || "task";
  return `evaluator-work-order-${task}-${digest}`;
}

export function readWorkOrder(raw: unknown): EvaluatorWorkOrder {
  try {
    return EVALUATOR_WORK_ORDER_SCHEMA.parse(raw);
  } catch (error) {
    throw new CliError({
      code: "E_VALIDATION",
      message: `Invalid EvaluatorWorkOrder: ${error instanceof Error ? error.message : String(error)}`,
    });
  }
}

export function assertResultEvidenceIsFrozen(opts: {
  workOrder: EvaluatorWorkOrder;
  result: EvaluatorSgrResult;
}): void {
  const allowed = new Set(opts.workOrder.evidence.map((entry) => entry.path));
  for (const finding of opts.result.findings) {
    for (const evidence of finding.evidence_refs) {
      if (!allowed.has(evidence.path)) {
        throw new CliError({
          code: "E_VALIDATION",
          message: `Evaluator finding ${finding.id} refers to evidence outside the frozen work order: ${evidence.path}`,
        });
      }
    }
  }
}
