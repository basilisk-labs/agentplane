import type { TaskBackend, TaskData } from "../../backends/task-backend.js";
import type { TaskExecutionContext } from "../../runtime/task-execution-context/index.js";
import {
  makeTaskBackendDouble,
  makeTaskCommandContext,
  makeTaskFixture,
} from "@agentplane/testkit/task";
import type { CommandContext } from "../shared/task-backend.js";

export function makeVerifyRecordTask(overrides: Partial<TaskData>): TaskData {
  return makeTaskFixture({ status: "DONE", owner: "me", ...overrides });
}

export function makeVerifyRecordContext(overrides?: Partial<CommandContext>): CommandContext {
  return makeTaskCommandContext({
    taskBackend: makeTaskBackendDouble(),
    overrides,
    configureConfig: (config) => {
      config.tasks.doc.required_sections = ["Summary", "Verify Steps", "Verification"];
    },
  });
}

export function makeVerificationExecutionContext(
  ctx: CommandContext,
  taskId = "T-1",
): TaskExecutionContext {
  const mode = ctx.config.workflow_mode === "branch_pr" ? "branch_pr" : "direct";
  return {
    schema_version: 1,
    primary_task_id: taskId,
    task_ids: [taskId],
    repository_mode: mode,
    selected_mode: mode,
    requested_mode: mode,
    route_source: "execution_contract",
    reason_codes: [],
    base_ref: "main",
    base_sha: "a".repeat(40),
    authoritative_task_source: "base_checkout",
  };
}

export function makeWriteThroughVerificationBackend(opts: {
  getTaskDoc: () => Promise<string>;
  writeTask: TaskBackend["writeTask"];
}): TaskBackend {
  let persisted: TaskData | null = null;
  return makeTaskBackendDouble({
    getTask: () => Promise.resolve(persisted && structuredClone(persisted)),
    getTaskDoc: opts.getTaskDoc,
    writeTask: async (task, writeOptions) => {
      await opts.writeTask(task, writeOptions);
      persisted = structuredClone(task);
    },
  });
}
