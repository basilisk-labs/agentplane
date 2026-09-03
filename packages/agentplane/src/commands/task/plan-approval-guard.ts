import {
  taskCentricAggregateFromExtensions,
  taskCentricReplanRequiredFromExtensions,
} from "@agentplaneorg/core/tasks";

import { CliError } from "../../shared/errors.js";

export function assertCanonicalPlanCanBeApproved(
  taskCentric: ReturnType<typeof taskCentricAggregateFromExtensions>,
  extensions: Readonly<Record<string, unknown>> | undefined,
): void {
  if (taskCentric?.current_plan && taskCentricReplanRequiredFromExtensions(extensions)) {
    throw new CliError({
      code: "E_VALIDATION",
      message:
        "Canonical task plan is stale after the task document changed; complete replanning before approval.",
    });
  }
  if (taskCentric?.current_plan?.approval.state === "rejected") {
    throw new CliError({
      code: "E_VALIDATION",
      message: "Rejected canonical task plans cannot be approved; complete replanning first.",
    });
  }
}
