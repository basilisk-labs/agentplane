import { CliError } from "../../shared/errors.js";
import { checkTaskBlueprintSnapshotDrift } from "../blueprint/snapshot-artifact.js";
import type { CommandContext } from "../shared/task-backend.js";

import type { LoadedFinishTask } from "./finish-shared.js";

const BLUEPRINT_SNAPSHOT_REF_MARKER = "BlueprintSnapshotRef:";

export async function assertBlueprintEvidenceBeforeFinish(opts: {
  ctx: CommandContext;
  loadedTasks: readonly LoadedFinishTask[];
}): Promise<void> {
  for (const loaded of opts.loadedTasks) {
    const doc = typeof loaded.task.doc === "string" ? loaded.task.doc : "";
    const hasSnapshotRef = doc.includes(BLUEPRINT_SNAPSHOT_REF_MARKER);
    const snapshot = await checkTaskBlueprintSnapshotDrift({
      ctx: opts.ctx,
      task: loaded.task,
    });
    if (snapshot.state === "missing" && !hasSnapshotRef) {
      continue;
    }
    if (snapshot.state !== "current") {
      throw new CliError({
        exitCode: 2,
        code: "E_VALIDATION",
        message: [
          "finish requires current blueprint snapshot evidence.",
          `task=${loaded.taskId}`,
          `snapshot_state=${snapshot.state}`,
          `snapshot_path=${snapshot.path}`,
          "Fix:",
          `  1) ${snapshot.safeCommand}`,
          `  2) agentplane verify ${loaded.taskId} --ok --by <ROLE> --note "Verified: ..."`,
          `  3) agentplane finish ${loaded.taskId} --author <ROLE> --body "Verified: ..." --result "..." --commit <hash>`,
        ].join("\n"),
      });
    }

    if (!hasSnapshotRef) {
      throw new CliError({
        exitCode: 2,
        code: "E_VALIDATION",
        message: [
          "finish requires recorded blueprint verification evidence.",
          `task=${loaded.taskId}`,
          `snapshot_digest=${snapshot.current.digest}`,
          "Fix:",
          `  1) agentplane verify ${loaded.taskId} --ok --by <ROLE> --note "Verified: ..."`,
          `  2) agentplane finish ${loaded.taskId} --author <ROLE> --body "Verified: ..." --result "..." --commit <hash>`,
        ].join("\n"),
      });
    }
  }
}
