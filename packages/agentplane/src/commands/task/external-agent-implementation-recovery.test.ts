import { describe, expect, it } from "vitest";
import { renderTaskReadme } from "@agentplaneorg/core/tasks";
import { taskReadmesPreserveRecoveryContract } from "./external-agent-implementation-recovery.js";
import { resolveEvidenceOnlyReworkCommit } from "./direct-task-verification.js";

const COMMIT = "a".repeat(40);
const BASE_CONTEXT = {
  schema_version: 1,
  base_ref: "main",
  base_sha: COMMIT,
  repository_identity: "sha256:" + "c".repeat(64),
};

function contextReadme(context: Record<string, unknown>) {
  const original = task();
  return renderTaskReadme(
    {
      ...original,
      extensions: { ...original.extensions, task_execution_context: context },
    },
    "## Summary\nApproved behavior.\n",
  );
}

function task() {
  return {
    id: "202608280009-QMVHM2",
    status: "DOING",
    verify: ["bun run ci:local:full"],
    execution_contract: {
      declaration: { scope_roots: ["src"], repository_effects: ["source_code"] },
      authority: { writable_roots: ["src"] },
      observed: { changed_paths: ["src/feature.ts"] },
      verification: { required_evidence: ["task_outcome"] },
      reason_codes: ["declared"],
    },
    extensions: {
      "agentplane.task_centric": { current_plan: { revision: 1, digest: "approved-plan" } },
    },
  };
}

describe("recorded implementation recovery contract", () => {
  it("rebinds a verified implementation through managed evidence-only commits", () => {
    const eligible = {
      purpose: "implementation_rework" as const,
      changed_paths: [],
      recorded_commit: "implementation-sha",
      head: "managed-evidence-head",
      work_item_id: "work-item",
      work_item_state: "REWORK_READY",
      task_verification_state: "ok",
      quality_review_state: "pass",
      quality_review_evaluated_sha: "implementation-sha",
      head_is_managed_descendant: true,
      all_required_work_items_completed: false,
    };

    expect(resolveEvidenceOnlyReworkCommit(eligible)).toBe("implementation-sha");
    expect(
      resolveEvidenceOnlyReworkCommit({ ...eligible, task_verification_state: "needs_rework" }),
    ).toBeNull();
    expect(
      resolveEvidenceOnlyReworkCommit({ ...eligible, quality_review_state: "rework" }),
    ).toBeNull();
    expect(
      resolveEvidenceOnlyReworkCommit({
        ...eligible,
        quality_review_evaluated_sha: "different-sha",
      }),
    ).toBeNull();
    expect(
      resolveEvidenceOnlyReworkCommit({ ...eligible, head_is_managed_descendant: false }),
    ).toBeNull();
  });

  it("accepts only removal of creation-checkout provenance for the same valid identity", () => {
    const before = contextReadme({ ...BASE_CONTEXT, source: "creation_checkout" });
    const after = contextReadme(BASE_CONTEXT);
    expect(taskReadmesPreserveRecoveryContract(before, after, COMMIT)).toBe(true);
    expect(taskReadmesPreserveRecoveryContract(after, before, COMMIT)).toBe(false);
    expect(taskReadmesPreserveRecoveryContract(before, before, COMMIT)).toBe(true);
  });

  it.each([
    ["base_ref", "other"],
    ["base_sha", "b".repeat(40)],
    ["repository_identity", "sha256:" + "d".repeat(64)],
    ["schema_version", 2],
    ["source", "explicit"],
    ["source", null],
    ["unrecognized", true],
  ])("rejects changed execution context %s=%s", (key, value) => {
    expect(
      taskReadmesPreserveRecoveryContract(
        contextReadme({ ...BASE_CONTEXT, source: "creation_checkout" }),
        contextReadme({ ...BASE_CONTEXT, [key as string]: value }),
        COMMIT,
      ),
    ).toBe(false);
  });

  it.each([
    ["base_ref", ""],
    ["base_ref", " "],
    ["base_sha", "not-a-commit"],
    ["base_sha", "0".repeat(40)],
    ["repository_identity", null],
    ["repository_identity", "not-a-digest"],
    ["schema_version", 2],
    ["unrecognized", true],
  ])("does not hide invalid or unknown context %s=%s behind provenance", (key, value) => {
    const identity = { ...BASE_CONTEXT, [key as string]: value };
    expect(
      taskReadmesPreserveRecoveryContract(
        contextReadme({ ...identity, source: "creation_checkout" }),
        contextReadme(identity),
        COMMIT,
      ),
    ).toBe(false);
  });

  it.each(["explicit", "legacy", "unknown", null])(
    "does not remove unproved provenance %s",
    (source) => {
      expect(
        taskReadmesPreserveRecoveryContract(
          contextReadme({ ...BASE_CONTEXT, source }),
          contextReadme(BASE_CONTEXT),
          COMMIT,
        ),
      ).toBe(false);
    },
  );

  it("allows Findings-only repair without accepting verification or authority changes", () => {
    const before = task();
    const original = renderTaskReadme(before, "## Findings\nMissing implementation evidence.\n");
    const repaired = "## Findings\nRecorded implementation; fresh checks remain required.\n";
    expect(
      taskReadmesPreserveRecoveryContract(original, renderTaskReadme(before, repaired), COMMIT),
    ).toBe(true);
    expect(
      taskReadmesPreserveRecoveryContract(
        original,
        renderTaskReadme(
          {
            ...before,
            verify: ["bun run weaker-check"],
          },
          repaired,
        ),
        COMMIT,
      ),
    ).toBe(false);
    expect(
      taskReadmesPreserveRecoveryContract(
        original,
        renderTaskReadme(
          {
            ...before,
            extensions: {
              ...before.extensions,
              "agentplane.execution_grant": { status: "revoked" },
            },
          },
          repaired,
        ),
        COMMIT,
      ),
    ).toBe(false);
  });
  it("accepts execution-context hydration only for the already-frozen base", () => {
    const original = task();
    const before = {
      ...original,
      extensions: {
        ...original.extensions,
        workflow_route_baseline: { version: 1, start_head_sha: COMMIT },
      },
    };
    for (const base of [COMMIT, "b".repeat(40)]) {
      const after = {
        ...before,
        extensions: {
          ...before.extensions,
          task_execution_context: {
            schema_version: 1,
            base_ref: "main",
            base_sha: base,
            repository_identity: null,
          },
        },
      };
      expect(
        taskReadmesPreserveRecoveryContract(
          renderTaskReadme(before, "unchanged"),
          renderTaskReadme(after, "unchanged"),
          COMMIT,
        ),
      ).toBe(base === COMMIT);
    }
  });
  it("allows CLI-observed verification and receipt drift without changing the approved contract", () => {
    const before = task();
    const after = {
      ...before,
      status: "DONE",
      token_usage: { agent_runs: 2 },
      execution_contract: {
        ...before.execution_contract,
        observed: { changed_paths: ["src/feature.ts", "docs/contract.md"] },
        verification: { required_evidence: ["task_outcome", "docs_contract"] },
        reason_codes: ["observed_documentation"],
      },
      extensions: {
        ...before.extensions,
        implementation_commit: { hash: COMMIT, message: "implementation" },
      },
    };
    expect(
      taskReadmesPreserveRecoveryContract(
        renderTaskReadme(before, "## Summary\nApproved behavior.\n"),
        renderTaskReadme(
          after,
          "## Summary\nApproved behavior.\n\n## Token Usage\nUpdated counters.\n",
        ),
        COMMIT,
      ),
    ).toBe(true);
  });

  it.each(["scope", "authority", "effects", "commands", "plan", "work-item", "receipt", "body"])(
    "rejects changed %s",
    (change) => {
      const before = task();
      const after: Record<string, unknown> = structuredClone(before);
      if (change === "scope")
        after.execution_contract = {
          ...before.execution_contract,
          declaration: { scope_roots: ["other"] },
        };
      if (change === "authority")
        after.execution_contract = {
          ...before.execution_contract,
          authority: { writable_roots: ["other"] },
        };
      if (change === "commands") after.verify = ["bun run weaker-check"];
      if (change === "effects")
        after.execution_contract = {
          ...before.execution_contract,
          declaration: {
            ...before.execution_contract.declaration,
            repository_effects: ["source_code", "documentation"],
          },
        };
      if (change === "work-item")
        after.extensions = {
          "agentplane.task_centric": {
            ...before.extensions["agentplane.task_centric"],
            work_items: { other: { id: "other", state: "READY" } },
          },
        };
      if (change === "plan")
        after.extensions = {
          "agentplane.task_centric": { current_plan: { revision: 2, digest: "different-plan" } },
        };
      if (change === "receipt")
        after.extensions = {
          ...before.extensions,
          implementation_commit: { hash: "b".repeat(40), message: "different implementation" },
        };
      expect(
        taskReadmesPreserveRecoveryContract(
          renderTaskReadme(before, "## Summary\nApproved behavior.\n"),
          renderTaskReadme(
            after,
            change === "body"
              ? "## Summary\nDifferent behavior.\n"
              : "## Summary\nApproved behavior.\n",
          ),
          COMMIT,
        ),
      ).toBe(false);
    },
  );
});
