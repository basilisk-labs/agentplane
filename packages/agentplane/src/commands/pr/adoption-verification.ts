import type { TaskData } from "../../backends/task-backend.js";
import type { CommandContext } from "../shared/task-backend.js";
import { hasCanonicalAdoptedHeadEvidence } from "../shared/canonical-pre-merge-evidence.js";

/** Use only canonical exact-head verification, never a compatibility task record. */
export function hasExactAdoptedVerificationRecord(opts: {
  ctx: CommandContext;
  task: TaskData;
  headSha: string;
}): Promise<boolean> {
  void opts.ctx;
  return Promise.resolve(hasCanonicalAdoptedHeadEvidence(opts.task, opts.headSha));
}
