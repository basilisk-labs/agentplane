import { readFile } from "node:fs/promises";
import path from "node:path";

import { applyContextExtractionResult } from "../../context/extraction-writer.js";

export async function cmdContextExtractionApply(opts: {
  cwd: string;
  rootOverride?: string;
  parsed: { file: string; taskId: string; dryRun: boolean };
}): Promise<number> {
  const root = path.resolve(opts.rootOverride ?? opts.cwd);
  const filePath = path.resolve(opts.cwd, opts.parsed.file);
  const raw = JSON.parse(await readFile(filePath, "utf8")) as unknown;
  const result = await applyContextExtractionResult({
    root,
    raw,
    taskId: opts.parsed.taskId || undefined,
    dryRun: opts.parsed.dryRun,
  });
  process.stdout.write(
    [
      `context extraction apply${opts.parsed.dryRun ? " (dry-run)" : ""}: facts=${result.facts} entities=${result.entities} edges=${result.edges} provenance=${result.provenance}`,
      `coverage=${result.coverage}`,
      result.changed_paths.length > 0 ? `changed=${result.changed_paths.join(",")}` : "",
    ]
      .filter(Boolean)
      .join(" ") + "\n",
  );
  return 0;
}
