import { describe, expect, it } from "vitest";
import { kernelDigest, reduceTaskCommand } from "./kernel.js";
import { aggregate, effect, fingerprint, input, runtime } from "./kernel.test-fixtures.js";
import type { TaskAggregate, TaskCommand } from "./model.js";

function close(state: TaskAggregate) {
  const contents = {
    kind: "canonical_administrative_closure",
    task_id: state.id,
    task_revision: state.revision,
    fingerprint,
    closure_kind: "duplicate" as const,
    note: "Duplicate tracking",
    related_task_id: "task-2",
    actor_id: "USER",
  };
  const command: TaskCommand = {
    kind: "close_without_implementation",
    task_id: state.id,
    expected_task_revision: state.revision,
    expected_state_fingerprint: fingerprint,
    closure_kind: contents.closure_kind,
    note: contents.note,
    related_task_id: contents.related_task_id,
    approval_evidence_digest: kernelDigest(contents),
  };
  return {
    ...input(state, command),
    authority: null,
    actor: {
      id: "USER",
      kind: "USER" as const,
      transport: "manual" as const,
      capabilities: ["task.close"],
    },
  };
}

describe("canonical bookkeeping authority", () => {
  it("records audit text without granting execution or changing unresolved effects", () => {
    const state = aggregate({ effects: [effect("pending", "IN_DOUBT")] });
    const command: TaskCommand = {
      kind: "append_audit_comment",
      task_id: state.id,
      expected_task_revision: state.revision,
      expected_state_fingerprint: fingerprint,
      author: "USER",
      body: "Attribution is not approval.",
    };
    const invocation = {
      ...input(state, command),
      authority: null,
      actor: {
        id: "native-controller",
        kind: "SYSTEM" as const,
        transport: "manual" as const,
        capabilities: ["task.audit"],
      },
    };
    const result = reduceTaskCommand(invocation);
    expect(result).toMatchObject({
      kind: "accepted",
      aggregate: {
        audit_comments: [{ author: "USER", actor_id: "native-controller", body: command.body }],
        effects: state.effects,
        current_plan: state.current_plan,
        work_items: state.work_items,
      },
    });
    expect(
      reduceTaskCommand({ ...invocation, actor: { ...invocation.actor, kind: "AGENT" } }),
    ).toMatchObject({ kind: "rejected", code: "AUTHORITY_SCOPE_EXCEEDED" });
  });

  it("closes only unstarted work with exact manual approval", () => {
    const state = aggregate({
      work_items: { kernel: { ...runtime("READY"), attempt: 0, claim_id: null } },
    });
    const invocation = close(state);
    expect(reduceTaskCommand(invocation)).toMatchObject({
      kind: "accepted",
      aggregate: {
        state: "CANCELLED",
        administrative_closure: { kind: "duplicate", related_task_id: "task-2", actor_id: "USER" },
      },
    });
    expect(
      reduceTaskCommand({ ...invocation, actor: { ...invocation.actor, kind: "AGENT" } }),
    ).toMatchObject({ kind: "rejected", code: "AUTHORITY_PROVENANCE_ESCALATION" });
    const changed = {
      ...invocation,
      command: { ...invocation.command, note: "changed" } as TaskCommand,
    };
    expect(reduceTaskCommand(changed)).toMatchObject({
      kind: "rejected",
      code: "AUTHORITY_PROVENANCE_ESCALATION",
    });
    expect(
      reduceTaskCommand(close(aggregate({ work_items: { kernel: runtime("EXECUTING") } }))),
    ).toMatchObject({ kind: "rejected", code: "TASK_COMPLETION_INELIGIBLE" });
  });

  it.each(["PREPARED", "PENDING", "IN_DOUBT", "APPLIED", "RECONCILED"] as const)(
    "retains %s effects on closure rejection",
    (status) => {
      const state = aggregate({ work_items: {}, effects: [effect("external", status)] });
      expect(reduceTaskCommand(close(state))).toMatchObject({
        kind: "rejected",
        code: "EFFECT_RECONCILIATION_REQUIRED",
        facts: ["external"],
      });
      expect(state.effects[0]?.state).toBe(status);
    },
  );
});
