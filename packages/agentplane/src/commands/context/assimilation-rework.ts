import { mkdir } from "node:fs/promises";
import path from "node:path";

import { atomicWriteFile } from "@agentplaneorg/core/fs";
import { digestSupervisorEpisodeValue } from "@agentplaneorg/core/schemas";

import type { TaskData } from "../../backends/task-backend.js";
import type { ContextIngestRunJournal } from "../../context/ingest-run-journal.js";
import { CliError } from "../../shared/errors.js";

function boundedText(value: string | null | undefined, max = 1000): string | null {
  if (!value) return null;
  const compact = value.replaceAll(/\s+/gu, " ").trim();
  return compact.length <= max ? compact : `${compact.slice(0, Math.max(0, max - 1))}…`;
}

export async function writeContextSemanticReworkWorkOrder(opts: {
  root: string;
  run: ContextIngestRunJournal;
  semanticFingerprint: string;
  task: TaskData;
}): Promise<{ feedback_digest: string; work_order_file: string }> {
  const review = opts.task.quality_review;
  if (review?.state !== "rework") {
    throw new CliError({
      code: "E_RUNTIME",
      message: "Context semantic rework requires an evaluator quality_review=rework result.",
    });
  }
  const cursor = (opts.run.supervision?.rework.length ?? 0) + 1;
  const feedback = {
    verdict: review.state,
    note: boundedText(review.note),
    findings: review.findings.slice(0, 12).map((finding) => boundedText(finding, 500) ?? ""),
    evidence_refs: review.evidence_refs.slice(0, 16),
  };
  const workOrderFile = `.agentplane/tasks/${opts.task.id}/context-rework/${String(cursor).padStart(3, "0")}.json`;
  const workOrder = {
    schema_version: 1,
    kind: "context_semantic_rework",
    task_id: opts.task.id,
    run_id: opts.run.run_id,
    cursor,
    replaces_semantic_fingerprint: opts.semanticFingerprint,
    input: {
      context_pack: `.agentplane/tasks/${opts.task.id}/context-pack.md`,
      extraction_contract: `.agentplane/tasks/${opts.task.id}/extraction-contract.json`,
      canonical_catalog: `.agentplane/tasks/${opts.task.id}/canonical-entity-catalog.json`,
    },
    semantic_feedback: feedback,
    required_output: {
      kind: "context_extraction",
      schema_contract: `.agentplane/tasks/${opts.task.id}/extraction-contract.json`,
      instruction:
        "Return one corrected, schema-valid semantic SGR result. Do not run lifecycle, indexing, validation, evaluator, ACR, or finalization commands.",
    },
    stop_rules: [
      "Do not resolve ambiguity by lexical similarity or identifiers alone.",
      "Preserve unresolved or conflicting identity decisions explicitly.",
      "Stop and return the SGR result when the semantic correction is complete; CLI owns all mechanical processing.",
    ],
  };
  await mkdir(path.dirname(path.join(opts.root, workOrderFile)), { recursive: true });
  await atomicWriteFile(
    path.join(opts.root, workOrderFile),
    `${JSON.stringify(workOrder, null, 2)}\n`,
    "utf8",
  );
  return {
    feedback_digest: digestSupervisorEpisodeValue(feedback),
    work_order_file: workOrderFile,
  };
}
