import { readFile } from "node:fs/promises";

import { writeJsonStableIfChanged } from "../../shared/write-if-changed.js";
import { ensurePrArtifactsSynced } from "../pr/internal/sync.js";
import { resolvePrPaths } from "../pr/internal/pr-paths.js";
import { buildVerifiedPrMeta, parsePrMeta } from "../shared/pr-meta.js";
import type { CommandContext } from "../shared/task-backend.js";

import type { VerifyState } from "./verify-record.types.js";

export async function syncRecordedVerificationArtifacts(opts: {
  ctx: CommandContext;
  cwd: string;
  rootOverride?: string;
  taskId: string;
  by: string;
  at: string;
  state: VerifyState;
}): Promise<void> {
  const syncResult = await ensurePrArtifactsSynced({
    ...opts,
    author: opts.by,
    workflowMode: "branch_pr",
  });
  if (!syncResult) return;
  const { metaPath } = await resolvePrPaths(opts);
  const meta = parsePrMeta(await readFile(metaPath, "utf8"), opts.taskId);
  await writeJsonStableIfChanged(
    metaPath,
    buildVerifiedPrMeta({ meta, at: opts.at, state: opts.state === "ok" ? "pass" : "fail" }),
  );
}
