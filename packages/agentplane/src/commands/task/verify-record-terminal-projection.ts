import {
  taskCentricAggregateFromExtensions,
  taskExecutionBaseFromExtensions,
  withTaskCentricAggregate,
} from "@agentplaneorg/core/tasks";
import type { TaskData } from "../../backends/task-backend.js";
import type { resolveTaskExecutionContext } from "../../runtime/task-execution-context/index.js";
import type { VerifyState } from "./verify-record.types.js";

export function projectVerificationExtensions(opts: {
  task: TaskData;
  execution: Pick<Awaited<ReturnType<typeof resolveTaskExecutionContext>>, "base_ref" | "base_sha">;
  state: VerifyState;
}): Record<string, unknown> {
  const previousExecutionBase = taskExecutionBaseFromExtensions(opts.task.extensions);
  const preserveExecutionSource =
    previousExecutionBase !== null &&
    previousExecutionBase.repository_identity !== null &&
    previousExecutionBase.base_ref === opts.execution.base_ref &&
    previousExecutionBase.base_sha === opts.execution.base_sha &&
    previousExecutionBase.source !== "legacy";
  let extensions: Record<string, unknown> = {
    ...opts.task.extensions,
    task_execution_context: {
      schema_version: 1,
      base_ref: opts.execution.base_ref,
      base_sha: opts.execution.base_sha,
      repository_identity: previousExecutionBase?.repository_identity ?? null,
      // Provenance belongs to the frozen identity, not a newly resolved verification base.
      ...(preserveExecutionSource ? { source: previousExecutionBase.source } : {}),
    },
  };
  if (opts.state !== "ok") {
    Reflect.deleteProperty(extensions, "implementation_commit");
    const aggregate = taskCentricAggregateFromExtensions(extensions);
    if (aggregate?.lifecycle === "COMPLETED") {
      extensions = withTaskCentricAggregate(extensions, {
        ...aggregate,
        lifecycle: "ACTIVE",
      });
    }
  }
  return extensions;
}
