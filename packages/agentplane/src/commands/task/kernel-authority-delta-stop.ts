import { repositoryEffectsForPath } from "@agentplaneorg/core/tasks";
import type { createKernelRuntime } from "./kernel-runtime-context.js";
type Runtime = Awaited<ReturnType<typeof createKernelRuntime>>;

export async function authorityDeltaStop(runtime: Runtime, taskId: string) {
  const prepared = await runtime.authority.prepareDelta(taskId, repositoryEffectsForPath);
  return {
    kind: "human_required" as const,
    reason: "canonical_authority_delta_requires_user",
    summary: "Repository changes exceed the approved canonical scope.",
    authority_delta: prepared,
    operator_action: {
      kind: "extend_scope" as const,
      argv: [
        "agentplane",
        "task",
        "scope",
        "extend",
        taskId,
        ...prepared.request.added_scope_roots.flatMap((root) => ["--scope-root", root]),
        ...prepared.request.added_repository_effects.flatMap((effect) => [
          "--repository-effect",
          effect,
        ]),
        "--request-digest",
        prepared.request_digest,
        "--state-scope-digest",
        prepared.request_digest,
        "--by",
        "USER",
      ],
    },
  };
}
