import type { CommandContext } from "../../commands/shared/task-backend.js";
import { resolveTaskBackendCapabilityRegistry } from "../../runtime/capabilities/index.js";
import type { RecipeApplicabilityObservers, RecipeObservedValue } from "./recipe-applicability.js";

/** Exact native allowlist. Recipe/agent data cannot register readers or supply their values. */
export function createNativeRecipeApplicabilityObservers(
  command: CommandContext,
): RecipeApplicabilityObservers {
  const values = new Map<string, { source: string; read: () => RecipeObservedValue }>([
    ["backend.id", { source: "command.backend", read: () => command.backendId }],
    [
      "workflow.mode",
      { source: "command.config.workflow_mode", read: () => command.config.workflow_mode },
    ],
  ]);
  if (typeof command.config.agents.approvals.require_planner === "boolean")
    values.set("policy.require_planner", {
      source: "command.config.agents.approvals.require_planner",
      read: () => {
        const value = command.config.agents.approvals.require_planner;
        if (typeof value !== "boolean")
          throw new Error("Native planning policy observation unavailable.");
        return value;
      },
    });
  return {
    capabilities: () =>
      resolveTaskBackendCapabilityRegistry({
        backend_id: command.backendId,
        capabilities: command.taskBackend?.capabilities,
      }),
    values,
  };
}
