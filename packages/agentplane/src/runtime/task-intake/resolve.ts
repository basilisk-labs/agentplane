import type { BehaviorLayer } from "../behavior/index.js";
import type { AgentplaneCapabilityRegistry } from "../capabilities/index.js";
import type { ResolvedExecutionProfileRuntime } from "../execution-profile/index.js";
import type { ResolvedHarnessContract } from "../harness/index.js";
import type {
  ClarificationContract,
  ClarificationQuestion,
  TaskGraphDependency,
  TaskGraphDraft,
  TaskGraphDraftTask,
  TaskIntakeContext,
  TaskIntakeInput,
  TaskIntakeRuntime,
  TaskMaterializationPlan,
} from "./types.js";
import {
  dedupeTrimmed,
  normalizeDependencies,
  normalizeInputs,
  normalizeOutcome,
  normalizeQuestions,
  normalizeSourceDetail,
  normalizeDraftTasks,
} from "./resolve-normalize.js";
import { materializeTaskGraphDraftPlan } from "./resolve-materialize.js";

const TASK_INTAKE_BEHAVIOR_ORDER = [
  "harness",
  "extension",
  "user",
  "builtin",
] as const satisfies readonly BehaviorLayer[];

export function createTaskIntakeRuntime(opts: {
  repo: TaskIntakeRuntime["repo"];
  backend: {
    id: string;
    config_path: string;
    capabilities: TaskIntakeRuntime["backend"]["capabilities"];
    supports_generate_task_id: boolean;
    supports_bulk_write: boolean;
  };
  harness: Pick<ResolvedHarnessContract, "workflow" | "task" | "policy">;
  execution_profile: ResolvedExecutionProfileRuntime;
  capabilities: AgentplaneCapabilityRegistry;
}): TaskIntakeRuntime {
  return {
    repo: {
      git_root: opts.repo.git_root,
      agentplane_dir: opts.repo.agentplane_dir,
      workflow_dir: opts.repo.workflow_dir,
    },
    workflow: {
      mode: opts.harness.workflow.mode,
    },
    backend: {
      id: opts.backend.id,
      config_path: opts.backend.config_path,
      capabilities: opts.backend.capabilities ? structuredClone(opts.backend.capabilities) : null,
      supports_generate_task_id: opts.backend.supports_generate_task_id,
      supports_bulk_write: opts.backend.supports_bulk_write,
    },
    task_contract: {
      doc_sections: [...opts.harness.task.doc_sections],
      required_doc_sections: [...opts.harness.task.required_doc_sections],
      verify_required_tags: [...opts.harness.task.verify_required_tags],
    },
    policy: {
      approvals: structuredClone(opts.harness.policy.approvals),
      protected_paths: structuredClone(opts.harness.policy.protected_paths),
      unsafe_actions_requiring_explicit_user_ok: [
        ...opts.harness.policy.unsafe_actions_requiring_explicit_user_ok,
      ],
    },
    execution_profile: structuredClone(opts.execution_profile),
    capabilities: structuredClone(opts.capabilities),
    precedence: {
      behavior_order: [...TASK_INTAKE_BEHAVIOR_ORDER],
      extension_layer: "recipes",
    },
  };
}

export function createTaskIntakeContext(opts: {
  runtime: TaskIntakeRuntime;
  source: TaskIntakeContext["source"];
  requested_outcome: string;
  requested_owner?: string;
  requested_tags?: string[];
  requested_verify?: string[];
  requested_dependencies?: string[];
  parent_task_id?: string;
  inputs?: TaskIntakeInput[];
}): TaskIntakeContext {
  return {
    runtime: structuredClone(opts.runtime),
    source: {
      id: opts.source.id,
      detail: normalizeSourceDetail(opts.source.detail),
    },
    requested_outcome: normalizeOutcome(opts.requested_outcome),
    ...(opts.requested_owner?.trim() ? { requested_owner: opts.requested_owner.trim() } : {}),
    requested_tags: dedupeTrimmed(opts.requested_tags ?? []).toSorted(),
    requested_verify: dedupeTrimmed(opts.requested_verify ?? []).toSorted(),
    requested_dependencies: dedupeTrimmed(opts.requested_dependencies ?? []).toSorted(),
    ...(opts.parent_task_id?.trim() ? { parent_task_id: opts.parent_task_id.trim() } : {}),
    inputs: normalizeInputs(opts.inputs ?? []),
  };
}

export function createClarificationContract(opts: {
  context: TaskIntakeContext;
  assumptions?: string[];
  questions?: ClarificationQuestion[];
}): ClarificationContract {
  const questions = normalizeQuestions(opts.questions ?? []);
  return {
    context: structuredClone(opts.context),
    status: questions.some((question) => question.required) ? "needs_input" : "ready",
    assumptions: dedupeTrimmed(opts.assumptions ?? []),
    questions,
  };
}

export function createTaskGraphDraft(opts: {
  context: TaskIntakeContext;
  clarification: ClarificationContract;
  summary: string;
  tasks: TaskGraphDraftTask[];
  dependencies?: TaskGraphDependency[];
  warnings?: string[];
}): TaskGraphDraft {
  const tasks = normalizeDraftTasks(opts.tasks);
  return {
    context: structuredClone(opts.context),
    clarification: structuredClone(opts.clarification),
    summary: normalizeOutcome(opts.summary),
    tasks,
    dependencies: normalizeDependencies(tasks, opts.dependencies ?? []),
    warnings: dedupeTrimmed(opts.warnings ?? []),
  };
}

export async function materializeTaskGraphDraft(opts: {
  draft: TaskGraphDraft;
  task_ids?: Record<string, string>;
  allocateTaskId?: (task: TaskGraphDraft["tasks"][number], index: number) => Promise<string>;
  created_at?: string;
}): Promise<TaskMaterializationPlan> {
  return materializeTaskGraphDraftPlan(opts);
}
