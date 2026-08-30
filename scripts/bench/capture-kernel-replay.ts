import { execFileSync } from "node:child_process";
import { writeFileSync } from "node:fs";
import { taskKernel as k } from "../../packages/core/src/tasks/index.js";
import {
  aggregate,
  input,
  runtime,
  transitionCommand,
  manifest,
  validation,
  resultDigest,
  fingerprint,
  plan,
  amendmentCommand,
  effect,
} from "../../packages/core/src/tasks/task-kernel/kernel.test-fixtures.js";
import {
  observeKernelReplay,
  replayBytesDigest,
  type KernelReplayFixture,
} from "../../packages/agentplane/src/adapters/task-backend/kernel-replay.js";

// Capture is explicit and cannot overwrite a reviewed corpus. Tests only replay it.
const anchor = process.argv[2];
if (!anchor || !/^[a-f0-9]{40}$/u.test(anchor))
  throw new Error("Pass an exact kernel source anchor.");
execFileSync("git", ["cat-file", "-e", `${anchor}^{commit}`]);
execFileSync(
  "git",
  [
    "diff",
    "--exit-code",
    anchor,
    "--",
    "packages/core/src/tasks/task-kernel",
    "packages/agentplane/src/adapters/task-backend/kernel-projector.ts",
  ],
  { stdio: "pipe" },
);
const fixtures: KernelReplayFixture[] = [];
function add(id: string, family: string, value: k.KernelInput, outcome?: string) {
  const source_bytes = JSON.stringify(value);
  const expected = observeKernelReplay(value);
  if (outcome && expected.outcome !== outcome) throw new Error(`${id}: expected ${outcome}`);
  fixtures.push({
    identity: {
      fixture_id: id,
      source_digest: replayBytesDigest(source_bytes),
      implementation_anchor: anchor,
      reproduction_command: `bun x vitest run packages/agentplane/src/adapters/task-backend/kernel-replay.test.ts -t ${id}`,
    },
    family,
    source_bytes,
    expected,
  });
}
for (const [action, pairs] of Object.entries(k.TASK_ACTION_TRANSITION_TABLE)) {
  for (const state of k.TASK_STATES) {
    const a = aggregate({ state });
    add(
      `task-${action}-${state}`,
      "canonical",
      input(a, {
        kind: "transition_task",
        task_id: a.id,
        expected_task_revision: a.revision,
        expected_state_fingerprint: fingerprint,
        action: action as Extract<k.TaskCommand, { kind: "transition_task" }>["action"],
      }),
      pairs.some(([from]) => from === state) ? "accepted" : "rejected",
    );
  }
}
for (const [action, pairs] of Object.entries(k.WORK_ITEM_TRANSITION_TABLE)) {
  for (const state of k.WORK_ITEM_STATES) {
    const item =
      action === "complete"
        ? {
            ...runtime(state),
            result_digest: resultDigest,
            output_manifests: [manifest()],
            validation: validation(resultDigest),
          }
        : runtime(state);
    const a = aggregate({ work_items: { kernel: item } });
    add(
      `work-item-${action}-${state}`,
      "work-items",
      input(
        a,
        transitionCommand(
          a,
          action as Extract<k.TaskCommand, { kind: "transition_work_item" }>["action"],
        ),
      ),
      pairs.some(([from]) => from === state) ? "accepted" : "rejected",
    );
  }
}
for (const state of k.EFFECT_STATES) {
  for (const observed_state of ["APPLIED", "NOT_APPLIED", "IN_DOUBT"] as const) {
    const a = aggregate({ effects: [effect("merge", state)] });
    add(
      `effect-${state}-${observed_state}`,
      "effects",
      input(a, {
        kind: "observe_effect",
        task_id: a.id,
        expected_task_revision: a.revision,
        expected_state_fingerprint: fingerprint,
        effect_id: "merge",
        observed_state,
        observation_digest: k.kernelDigest("observation"),
      }),
    );
  }
}
for (const resolution of ["APPLIED", "NOT_APPLIED"] as const) {
  const a = aggregate({ state: "EFFECT_IN_DOUBT", effects: [effect("merge", "IN_DOUBT")] });
  add(
    `effect-reconciled-${resolution}`,
    "effects",
    input(a, {
      kind: "reconcile_effect",
      task_id: a.id,
      expected_task_revision: a.revision,
      expected_state_fingerprint: fingerprint,
      effect_id: "merge",
      resolution,
      provider_receipt_digest: k.kernelDigest("provider-receipt"),
    }),
    "accepted",
  );
}
const a = aggregate();
add("plan-non-material", "plans", input(a, amendmentCommand(a, plan.work_items)), "accepted");
const wider = [
  {
    ...plan.work_items[0]!,
    execution_requirements: {
      ...plan.work_items[0]!.execution_requirements,
      scope_roots: ["outside-approved-scope"],
    },
  },
];
add("plan-material", "plans", input(a, amendmentCommand(a, wider)), "rejected");
const stale = { ...amendmentCommand(a, plan.work_items), plan_digest: k.kernelDigest("stale") };
add("plan-stale", "plans", input(a, stale), "rejected");
for (const key of ["expected_task_revision", "expected_state_fingerprint"] as const) {
  const command = transitionCommand(a, "claim");
  const changed =
    key === "expected_task_revision"
      ? { ...command, expected_task_revision: a.revision + 1 }
      : { ...command, expected_state_fingerprint: k.kernelDigest("divergent-head") };
  add(`workspace-${key}`, "workspaces", input(a, changed), "rejected");
}
const command = transitionCommand(a, "claim");
const first = input(a, command, "same-command");
const result = k.reduceTaskCommand(first);
if (result.kind !== "accepted") throw new Error("Cannot capture duplicate command fixture");
add(
  "work-item-duplicate-command",
  "work-items",
  { ...first, aggregate: result.aggregate },
  "accepted",
);
writeFileSync(
  "packages/agentplane/src/adapters/task-backend/kernel-replay.corpus.json",
  JSON.stringify(
    {
      schema_version: 1,
      source_anchor: anchor,
      scope: "Pure kernel vectors. Adapter, migration, and crash qualification are separate gates.",
      fixtures,
    },
    null,
    2,
  ) + "\n",
  { flag: "wx" },
);
process.stdout.write(`Captured ${fixtures.length} frozen kernel vectors.\n`);
