import { describe, expect, it } from "vitest";
import { kernelDigest, reduceTaskCommand } from "./kernel.js";
import {
  aggregate,
  runtime,
  input,
  fingerprint,
  effect,
  transitionCommand,
} from "./kernel.test-fixtures.js";
import type { TaskAggregate, TaskCommand } from "./model.js";

function fixture() {
  const initial = aggregate({ work_items: { kernel: runtime("EXECUTING") } });
  const stop = {
    ...transitionCommand(initial, "block"),
    claim_id: initial.work_items.kernel!.claim_id,
    semantic_result_digest: kernelDigest("blocked-result"),
  };
  const order = kernelDigest("work-order");
  const blocked = reduceTaskCommand(input(initial, stop, `semantic-stop:${order}`));
  if (blocked.kind !== "accepted") throw new Error(JSON.stringify(blocked));
  return { state: blocked.aggregate, stops: [{ work_order_id: order, command: stop }] };
}
function invocation(state: TaskAggregate, stops = fixture().stops) {
  const reason = "Required scope was withdrawn";
  const record = kernelDigest("record");
  const request = kernelDigest({
    kind: "withdrawn_scope_cancellation",
    task_id: state.id,
    record_digest: record,
    aggregate_digest: kernelDigest(state),
    task_revision: state.revision,
    plan_digest: state.current_plan!.digest,
    repository_fingerprint: fingerprint,
    reason,
  });
  const command: TaskCommand = {
    kind: "cancel_withdrawn_scope",
    task_id: state.id,
    expected_task_revision: state.revision,
    expected_state_fingerprint: fingerprint,
    record_digest: record,
    reason,
    plan_digest: state.current_plan!.digest,
    request_digest: request,
    approval_evidence_digest: kernelDigest({
      kind: "manual_user_cancellation_approval",
      request_digest: request,
      actor_id: "USER",
    }),
    stops,
  };
  return {
    ...input(state, command, `cancel:${request}`),
    authority: null,
    actor: {
      id: "USER",
      kind: "USER" as const,
      transport: "manual" as const,
      capabilities: ["task.cancel"],
    },
  };
}
describe("withdrawn-scope cancellation", () => {
  it("preserves all history and accepts only exact authorized replay", () => {
    const { state, stops } = fixture();
    const call = invocation(state, stops);
    const result = reduceTaskCommand(call);
    expect(result).toMatchObject({ kind: "accepted" });
    if (result.kind !== "accepted") return;
    expect(result.aggregate).toMatchObject({
      ...state,
      state: "CANCELLED",
      revision: state.revision + 1,
    });
    expect(result.aggregate.work_items).toEqual(state.work_items);
    expect(result.aggregate.current_plan).toEqual(state.current_plan);
    expect(result.aggregate.plan_history).toEqual(state.plan_history);
    expect(result.aggregate.effects).toEqual(state.effects);
    expect(reduceTaskCommand({ ...call, aggregate: result.aggregate })).toMatchObject({
      kind: "accepted",
      events: [],
    });
    expect(
      reduceTaskCommand({
        ...call,
        aggregate: result.aggregate,
        actor: { ...call.actor, kind: "AGENT" },
      }),
    ).toMatchObject({ kind: "rejected" });
    expect(
      reduceTaskCommand({
        ...call,
        aggregate: result.aggregate,
        mutation_id: "late",
        command: { ...transitionCommand(result.aggregate, "resume"), work_item_id: "kernel" },
      }),
    ).toMatchObject({ kind: "rejected" });
  });
  it.each(["CLAIMED", "EXECUTING", "INSPECTING", "RESULT_RECEIVED", "VALIDATING"] as const)(
    "rejects active %s",
    (state) => {
      const f = fixture();
      expect(
        reduceTaskCommand(
          invocation({ ...f.state, work_items: { ...f.state.work_items, other: runtime(state) } }),
        ),
      ).toMatchObject({ kind: "rejected" });
    },
  );
  it.each(["PREPARED", "PENDING", "IN_DOUBT"] as const)(
    "rejects unresolved %s effects",
    (state) => {
      const f = fixture();
      expect(
        reduceTaskCommand(
          invocation({ ...f.state, effects: [{ ...effect("effect", state), state }] }),
        ),
      ).toMatchObject({ kind: "rejected" });
    },
  );
  it.each(["APPLIED", "NOT_APPLIED"] as const)("preserves %s effects", (state) => {
    const f = fixture();
    const aggregate = { ...f.state, effects: [{ ...effect("effect", state), state }] };
    expect(reduceTaskCommand(invocation(aggregate))).toMatchObject({
      kind: "accepted",
      aggregate: { effects: aggregate.effects },
    });
  });
  it("rejects forged proof, approval, stale revision and changed fingerprint", () => {
    const f = fixture();
    const call = invocation(f.state);
    expect(
      reduceTaskCommand({ ...call, command: { ...call.command, stops: [] } as TaskCommand }),
    ).toMatchObject({ kind: "rejected" });
    expect(
      reduceTaskCommand({
        ...call,
        command: {
          ...call.command,
          approval_evidence_digest: kernelDigest("forged"),
        } as TaskCommand,
      }),
    ).toMatchObject({ kind: "rejected" });
    expect(
      reduceTaskCommand({ ...call, aggregate: { ...f.state, revision: f.state.revision + 1 } }),
    ).toMatchObject({ kind: "rejected", code: "STALE_TASK_REVISION" });
    expect(
      reduceTaskCommand({ ...call, repository_fingerprint: kernelDigest("changed") }),
    ).toMatchObject({ kind: "rejected", code: "STALE_STATE_FINGERPRINT" });
    expect(
      reduceTaskCommand({ ...call, actor: { ...call.actor, transport: "managed" } }),
    ).toMatchObject({ kind: "rejected" });
  });
});
