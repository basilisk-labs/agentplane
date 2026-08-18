import { describe, expect, it } from "vitest";

import type { TaskData } from "../../backends/task-backend.js";
import { makeTaskCommandContext, makeTaskFixture } from "@agentplane/testkit/task";
import { resolveTaskExecutionContract } from "../../runtime/task-routing/index.js";
import {
  applyApprovedTaskScopeExtension,
  createTaskScopeExtensionRequestState,
  normalizeTaskScopeRoot,
  scopeExtensionReceiptForState,
  TASK_SCOPE_EXTENSION_REQUEST_KEY,
} from "../shared/task-scope-extension-request.js";

import { extendBlockedTaskExecutionContract } from "./scope-extend.js";

function fixture(
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

describe("blocked task execution scope extension", () => {
  it("adds repository authority monotonically and preserves observations", () => {
    const { command, pending, task } = fixture();

    const extended = extendBlockedTaskExecutionContract({
      command,
      task,
      scope_roots: ["website"],
      repository_effects: ["release_metadata"],
      request_digest: pending.request_digest,
      by: "USER",
    });

    expect(extended.declaration.scope_roots).toEqual(["docs/releases", "website"]);
    expect(extended.declaration.repository_effects).toEqual(["documentation", "release_metadata"]);
    expect(extended.observed.changed_paths).toEqual(["docs/releases/v0.7.7.md"]);
    expect(extended.authority.allowed_repository_effects).toContain("release_metadata");
    expect(extended.declaration.rationale).toContain(
      "USER-approved blocked-result scope extension: roots=website; repository_effects=release_metadata",
    );
  });

  it("preserves evaluator rework evidence while invalidating verification", () => {
    const qualityReview = {
      state: "rework" as const,
      updated_at: "2026-08-18T00:00:00.000Z",
      updated_by: "EVALUATOR",
      note: "The evaluator requested scoped rework.",
      evaluated_sha: "reviewed-head",
      blueprint_digest: "sha256:reviewed-blueprint",
      evidence_refs: ["quality/report.json"],
      findings: ["Generated asset is outside the issued writable roots."],
    };
    const { command, pending, task } = fixture({ quality_review: qualityReview });
    const executionContract = extendBlockedTaskExecutionContract({
      command,
      task,
      scope_roots: ["website"],
      repository_effects: ["release_metadata"],
      request_digest: pending.request_digest,
      by: "USER",
    });

    const updated = applyApprovedTaskScopeExtension({
      task,
      executionContract,
      pending,
      scopeRoots: ["website"],
      repositoryEffects: ["release_metadata"],
      by: "USER",
      now: "2026-08-18T01:00:00.000Z",
    });

    expect(updated.quality_review).toEqual(qualityReview);
    expect(updated.verification).toMatchObject({
      state: "pending",
      note: "Invalidated by USER-approved execution scope extension.",
    });
  });

  it("requires a BLOCKED task, blocker receipt, and explicit USER authority", () => {
    const { command, pending, task } = fixture();
    const cases: { task: TaskData; by: string; message: RegExp }[] = [
      { task: { ...task, status: "DOING" }, by: "USER", message: /only after a recorded BLOCKED/u },
      { task: { ...task, comments: [] }, by: "USER", message: /blocker receipt/u },
      { task, by: "SUPERVISOR", message: /explicit --by USER/u },
    ];

    for (const testCase of cases) {
      expect(() =>
        extendBlockedTaskExecutionContract({
          command,
          task: testCase.task,
          scope_roots: ["website"],
          repository_effects: [],
          request_digest: pending.request_digest,
          by: testCase.by,
        }),
      ).toThrow(testCase.message);
    }
  });

  it("rejects unsafe roots and no-op extensions", () => {
    const { command, pending, task } = fixture();

    expect(() => normalizeTaskScopeRoot("../outside")).toThrow(/Invalid scope root/u);
    expect(() =>
      extendBlockedTaskExecutionContract({
        command,
        task,
        scope_roots: ["website"],
        repository_effects: ["release_metadata"],
        request_digest: `sha256:${"f".repeat(64)}`,
        by: "USER",
      }),
    ).toThrow(/request digest does not match/u);
    expect(() =>
      extendBlockedTaskExecutionContract({
        command,
        task,
        scope_roots: ["website-other"],
        repository_effects: ["release_metadata"],
        request_digest: pending.request_digest,
        by: "USER",
      }),
    ).toThrow(/exactly match/u);

    const noOp = fixture(
      {},
      { scope_roots: ["docs/releases"], repository_effects: ["documentation"] },
    );
    expect(() =>
      extendBlockedTaskExecutionContract({
        command: noOp.command,
        task: noOp.task,
        scope_roots: ["docs/releases"],
        repository_effects: ["documentation"],
        request_digest: noOp.pending.request_digest,
        by: "USER",
      }),
    ).toThrow(/must add a new scope root or repository effect/u);
  });
});
