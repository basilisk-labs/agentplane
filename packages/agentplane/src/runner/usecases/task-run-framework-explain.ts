import type { ExplainBehaviorInput } from "../../runtime/explain/index.js";
import type { RunnerContextBundle } from "../types.js";

export function collectTaskRunnerFrameworkExplainBehaviorInputs(
  prompts: RunnerContextBundle["base_prompts"],
): ExplainBehaviorInput[] {
  return prompts.flatMap((prompt) =>
    prompt.resolution
      ? [
          {
            id: prompt.id,
            category: "prompt" as const,
            ...(prompt.source ? { source: prompt.source } : {}),
            resolution: prompt.resolution,
          },
        ]
      : [],
  );
}
