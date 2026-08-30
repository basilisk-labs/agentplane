import { execFileSync } from "node:child_process";
import { writeFileSync } from "node:fs";
import { taskKernel as k } from "../../packages/core/src/tasks/index.js";
import {
  aggregate,
  effect,
  fingerprint,
} from "../../packages/core/src/tasks/task-kernel/kernel.test-fixtures.js";
import {
  observeKernelEvidenceReplay,
  replayBytesDigest,
  type ObservationReplayInput,
} from "../../packages/agentplane/src/adapters/task-backend/kernel-replay.js";

const anchor = process.argv[2];
if (!anchor || !/^[a-f0-9]{40}$/u.test(anchor))
  throw new Error("Pass an exact observation source anchor.");
execFileSync("git", ["cat-file", "-e", `${anchor}^{commit}`]);
execFileSync(
  "git",
  [
    "diff",
    "--exit-code",
    anchor,
    "--",
    "packages/agentplane/src/adapters/task-backend/kernel-observations.ts",
    "packages/agentplane/src/adapters/task-backend/kernel-record.ts",
  ],
  { stdio: "pipe" },
);
const binding = {
  task_id: "task-1",
  plan_revision: 1,
  plan_digest: k.kernelDigest("plan"),
  work_item_id: "build",
  repository_fingerprint: fingerprint,
  implementation_identity: k.kernelDigest("implementation"),
};
const check: k.ValidationIdentity = {
  implementation_identity: binding.implementation_identity,
  check_id: "focused",
  command_digest: k.kernelDigest("tests"),
  toolchain_digest: k.kernelDigest("node"),
  environment_digest: k.kernelDigest("env"),
};
const validation: k.ValidationRecord = {
  status: "PASSED",
  identity: check,
  evidence_digests: [k.kernelDigest("log")],
  observed_at: "2026-08-30T00:00:00.000Z",
};
const fixtures = [];
function add(id: string, input: ObservationReplayInput, expectedKind: string) {
  const source_bytes = JSON.stringify(input);
  const expected = observeKernelEvidenceReplay(input);
  if (expected.kind !== expectedKind) throw new Error(`${id}: ${JSON.stringify(expected)}`);
  fixtures.push({
    identity: {
      fixture_id: id,
      source_digest: replayBytesDigest(source_bytes),
      implementation_anchor: anchor,
      reproduction_command: `bun x vitest run packages/agentplane/src/adapters/task-backend/kernel-replay.test.ts -t ${id}`,
    },
    source_bytes,
    expected,
  });
}
for (const checkId of ["focused", "full", "hosted"]) {
  const identity = { ...check, check_id: checkId };
  add(
    `validation-${checkId}`,
    {
      kind: "validation",
      binding,
      check: identity,
      raw: { kind: "validation", binding, validation: { ...validation, identity } },
    },
    "validation",
  );
}
for (const status of ["FAILED", "BLOCKED", "STALE"] as const)
  add(
    `validation-${status}`,
    {
      kind: "validation",
      binding,
      check,
      raw: { kind: "validation", binding, validation: { ...validation, status } },
    },
    "validation",
  );
const raw = { kind: "validation", binding, validation };
for (const stronger of ["full", "hosted"])
  add(
    `validation-focused-cannot-satisfy-${stronger}`,
    {
      kind: "validation",
      binding,
      check: { ...check, check_id: stronger },
      raw,
    },
    "rejected",
  );
add(
  "validation-changed-toolchain",
  {
    kind: "validation",
    binding,
    check: { ...check, toolchain_digest: k.kernelDigest("different-node") },
    raw,
  },
  "rejected",
);
add(
  "validation-stale-implementation",
  {
    kind: "validation",
    check,
    raw,
    binding: { ...binding, implementation_identity: k.kernelDigest("changed-source") },
  },
  "rejected",
);
add(
  "validation-missing-evidence-shape",
  { kind: "validation", binding, check, raw: { ...raw, validation: { status: "BLOCKED" } } },
  "rejected",
);
for (const verdict of ["PASS", "REWORK", "BLOCKED", "HUMAN_REQUIRED"]) {
  add(
    `review-${verdict}`,
    {
      kind: "review",
      binding,
      raw: {
        kind: "review",
        binding,
        verdict,
        evidence_digests: [k.kernelDigest("review")],
        findings: [],
      },
    },
    "review",
  );
}
const review = {
  kind: "review",
  binding,
  verdict: "PASS",
  evidence_digests: [k.kernelDigest("review")],
  findings: [],
};
add(
  "review-semantic-drift",
  {
    kind: "review",
    raw: review,
    binding: { ...binding, implementation_identity: k.kernelDigest("new-source") },
  },
  "rejected",
);
add(
  "review-other-work-item",
  { kind: "review", raw: review, binding: { ...binding, work_item_id: "other" } },
  "rejected",
);
const state = aggregate({ effects: [effect("merge", "PREPARED")] });
const provider = {
  kind: "provider",
  task_id: state.id,
  repository_fingerprint: fingerprint,
  effect_id: "merge",
  request_digest: k.kernelDigest("merge"),
  state: "APPLIED",
  receipt_digest: k.kernelDigest("provider-receipt"),
};
for (const observed of ["APPLIED", "NOT_APPLIED", "IN_DOUBT"])
  add(
    `provider-${observed}`,
    {
      kind: "provider",
      raw: { ...provider, state: observed },
      aggregate: state,
      repository_fingerprint: fingerprint,
    },
    "provider",
  );
add(
  "provider-wrong-request",
  {
    kind: "provider",
    raw: { ...provider, request_digest: k.kernelDigest("other-request") },
    aggregate: state,
    repository_fingerprint: fingerprint,
  },
  "rejected",
);
add(
  "provider-wrong-checkout",
  {
    kind: "provider",
    raw: provider,
    aggregate: state,
    repository_fingerprint: k.kernelDigest("other-checkout"),
  },
  "rejected",
);
writeFileSync(
  "packages/agentplane/src/adapters/task-backend/kernel-replay-evidence.corpus.json",
  JSON.stringify({ schema_version: 1, source_anchor: anchor, fixtures }, null, 2) + "\n",
  { flag: "wx" },
);
process.stdout.write(`Captured ${fixtures.length} frozen observation fixtures.\n`);
