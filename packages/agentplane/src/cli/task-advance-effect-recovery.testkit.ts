import type { AgentWorkOrderV2 } from "@agentplaneorg/core/schemas";
import type { TaskPlanProposal } from "@agentplaneorg/core/tasks";

export function recoveryPlanningProposal(
  workOrder: AgentWorkOrderV2,
  summary: string,
): TaskPlanProposal {
  const baseline = workOrder.planning_context?.repository_snapshot;
  if (!baseline) throw new Error("Recovery fixture requires the issued planning snapshot.");
  const criterion = {
    id: "exact-recovery",
    description: summary,
    required: true,
    check_ids: ["task-check"],
  };
  const validation = {
    schema_version: 1 as const,
    criteria: [criterion],
    checks: [
      {
        id: "task-check",
        kind: "deterministic" as const,
        required: true,
        capability: "task.verify",
        command: "bun run test:critical",
      },
    ],
    evidence_fingerprint: baseline.digest,
  };
  return {
    schema_version: 1,
    task_id: workOrder.task.id,
    planning_baseline: baseline,
    work_items: {
      schema_version: 1,
      work_items: [
        {
          id: "exercise-recovery",
          objective: summary,
          depends_on: [],
          required_inputs: [],
          expected_outputs: ["recovery-result"],
          scope_roots: ["."],
          acceptance_criteria: [criterion],
          validation,
          context: {
            required_sources: [],
            optional_sources: [],
            symbol_hints: [],
            max_bytes: 65_536,
          },
          risk: "low",
          capabilities: ["task.verify"],
          resource_claims: [{ kind: "workspace", resource: ".", mode: "write" }],
          optional: false,
          priority: 1,
        },
      ],
    },
    assumptions: [],
    unresolved_questions: [],
    top_level_validation: validation,
  };
}
