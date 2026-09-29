import { CliError } from "../../shared/errors.js";
import {
  assertSemanticProviderPromptHasNoProcessChoreography,
  hasExplicitProcessMechanismRepairAuthority,
} from "../context/base-prompts.js";
import type { RunnerContextBundle, RunnerInvocation } from "../types.js";
import { renderTaskRunnerBootstrap } from "./task-run-bootstrap.js";

export { semanticRole } from "./semantic-role.js";

export function renderSemanticBootstrap(
  bundle: RunnerContextBundle,
  invocation: RunnerInvocation,
): string {
  const bootstrapMarkdown = renderTaskRunnerBootstrap(bundle, invocation);
  try {
    assertSemanticProviderPromptHasNoProcessChoreography({
      prompt: bootstrapMarkdown,
      process_mechanism_repair_authorized: hasExplicitProcessMechanismRepairAuthority(bundle.task),
      declared_phase_tool_invocations: bundle.execution.phase_tools?.tools.flatMap((tool) =>
        tool.allowed && tool.invocation ? [tool.invocation] : [],
      ),
    });
  } catch (error) {
    throw new CliError({
      code: "E_VALIDATION",
      message: error instanceof Error ? error.message : "Semantic provider prompt is unsafe.",
      context: {
        reason_code: "semantic_provider_prompt_process_choreography",
      },
    });
  }
  return bootstrapMarkdown;
}
