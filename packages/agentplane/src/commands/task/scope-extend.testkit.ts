import type { TaskData } from "../../backends/task-backend.js";
import { makeTaskCommandContext, makeTaskFixture } from "@agentplane/testkit/task";
import { resolveTaskExecutionContract } from "../../runtime/task-routing/index.js";
import {
  createTaskScopeExtensionRequestState,
  scopeExtensionReceiptForState,
  TASK_SCOPE_EXTENSION_REQUEST_KEY,
} from "../shared/task-scope-extension-request.js";

export function scopeExtensionFixture(
  overrides: Partial<TaskData> = {},
  request?: {
    scope_roots: string[];
    repository_effects: ("documentation" | "release_metadata")[];
  },
) {
  const requested = request ?? {
    scope_roots: ["website"],
    repository_effects: ["release_metadata" as const],
  };
  const command = makeTaskCommandContext({
    configureConfig: (config) => {
      config.workflow_mode = "branch_pr";
    },
  });
  const executionContract = resolveTaskExecutionContract({
    config: command.config,
    task: { task_kind: "code", mutation_scope: "code", risk_flags: [] },
    requestedMode: "branch_pr",
    declaration: {
      schema_version: 2,
      preferred_mode: "branch_pr",
      scope_roots: ["docs/releases"],
      repository_effects: ["documentation"],
      external_effects: [],
      requirements_uncertainty: "bounded",
      implementation_uncertainty: "bounded",
      reversibility: "reversible",
      rationale: ["release documentation"],
    },
  });
  executionContract.observed.changed_paths = ["docs/releases/v0.7.7.md"];
  const pending = createTaskScopeExtensionRequestState({
    request: {
      schema_version: 1,
      ...requested,
      rationale: "The required generated asset is outside the current scope.",
    },
    transition_id: "tr_11111111111111111111111111111111",
    state_fingerprint: `sha256:${"a".repeat(64)}`,
  });
  const task = makeTaskFixture({
    id: "202608181404-SCOPE1",
    status: "BLOCKED",
    execution_contract: executionContract,
    execution_route: {
      requested_mode: "branch_pr",
      selected_mode: "branch_pr",
      repository_mode: "branch_pr",
      reason_codes: [...executionContract.reason_codes],
    },
    comments: [
      {
        author: "SUPERVISOR",
        body: scopeExtensionReceiptForState(pending),
      },
    ],
    extensions: { [TASK_SCOPE_EXTENSION_REQUEST_KEY]: pending },
    ...overrides,
  });
  return { command, pending, task };
}
