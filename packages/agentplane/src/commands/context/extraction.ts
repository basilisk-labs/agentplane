import { readFile } from "node:fs/promises";
import path from "node:path";

import { applyContextExtractionResult } from "../../context/extraction-writer.js";
import {
  advanceContextIngestRunForTask,
  contextIngestSemanticFingerprint,
} from "../../context/ingest-run-journal.js";
import { validateContextExtractionSgrResult } from "../../context/sgr-extraction.js";

export async function cmdContextExtractionApply(opts: {
  cwd: string;
  rootOverride?: string;
  parsed: { file: string; taskId: string; dryRun: boolean; synthesizeWiki?: boolean };
}): Promise<number> {
  const root = path.resolve(opts.rootOverride ?? opts.cwd);
  const filePath = path.resolve(root, opts.parsed.file);
  const rawText = await readFile(filePath, "utf8");
  const raw = JSON.parse(rawText) as unknown;
  const extraction = validateContextExtractionSgrResult(raw);
  const taskId = opts.parsed.taskId.length > 0 ? opts.parsed.taskId : extraction.task_id;
  const semantic = {
    extraction_file: opts.parsed.file,
    extraction_fingerprint: contextIngestSemanticFingerprint(rawText),
  };
  if (!opts.parsed.dryRun && taskId) {
    await advanceContextIngestRunForTask(root, taskId, {
      phase: "semantic_result_received",
      semantic,
    });
  }
  const result = await applyContextExtractionResult({
    root,
    raw,
    taskId: taskId === "" ? undefined : taskId,
    dryRun: opts.parsed.dryRun,
    synthesizeWiki: opts.parsed.synthesizeWiki,
  });
  if (!opts.parsed.dryRun && taskId) {
    await advanceContextIngestRunForTask(root, taskId, {
      phase: "artifacts_applied",
      semantic,
    });
  }
  process.stdout.write(
    [
      `context extraction apply${opts.parsed.dryRun ? " (dry-run)" : ""}: items=${result.items} input_source_paths=${result.input_source_paths} source_paths=${result.source_paths} source_refs=${result.source_refs} facts=${result.facts} entities=${result.entities} edges=${result.edges} provenance=${result.provenance}`,
      `coverage=${result.coverage}`,
      `claims=${result.claims}`,
      `ontology=${result.ontology}`,
      `sources=${result.sources}`,
      `wiki=${result.wiki}`,
      `wiki_pages=${result.wiki_pages}`,
      `wiki_atoms=${result.wiki_atoms}`,
      `wiki_log_entries=${result.wiki_log_entries}`,
      `quality=${result.quality}`,
      result.changed_paths.length > 0 ? `changed=${result.changed_paths.join(",")}` : "",
    ]
      .filter(Boolean)
      .join(" ") + "\n",
  );
  return 0;
}
