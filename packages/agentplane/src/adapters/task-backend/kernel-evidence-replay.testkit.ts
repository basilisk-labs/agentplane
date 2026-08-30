import { mkdtemp, rm } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { runProcess } from "@agentplaneorg/core/process";
import { taskKernel as k } from "@agentplaneorg/core/tasks";
import { KernelBackendAdapter, type KernelCommandInput } from "./kernel-backend-adapter.js";
import {
  bindKernelWorkItemEvidence,
  readKernelReview,
  readKernelValidation,
} from "./kernel-observations.js";
import { observeKernelPersistenceState } from "./kernel-replay-capture.testkit.js";
import { replayBytesDigest } from "./kernel-replay.js";
import {
  kernelReplayJourney,
  replayRepositoryIdentity,
} from "./kernel-replay-journey.test-fixtures.js";
import {
  kernelReplayStorage,
  replayBackendKinds,
  type ReplayBackendKind,
} from "./kernel-replay-storage.testkit.js";

const scenarios = ["metadata-review", "semantic-review", "missing-executable"] as const;
type Source = {
  backend: ReplayBackendKind;
  scenario: (typeof scenarios)[number];
  journey: ReturnType<typeof kernelReplayJourney>;
};
export function kernelEvidenceReplayCases() {
  return replayBackendKinds.flatMap((backend) =>
    scenarios.map((scenario) => ({
      id: `${backend}-${scenario}`,
      scenario,
      source_bytes: JSON.stringify({
        backend,
        scenario,
        journey: kernelReplayJourney("direct"),
      } satisfies Source),
    })),
  );
}

export async function observeKernelEvidenceScenario(sourceBytes: string) {
  const source = JSON.parse(sourceBytes) as Source;
  const roots: string[] = [];
  try {
    const store = await kernelReplayStorage(source.backend, roots);
    const adapter = new KernelBackendAdapter(store.backend, replayRepositoryIdentity);
    const journey = source.journey;
    const seed = journey.steps[6]!.input;
    const fingerprint = seed.repository_fingerprint;
    const commands: KernelCommandInput[] = [];
    for (const [index, step] of journey.steps.slice(0, 7).entries()) {
      commands.push(step.input);
      const result =
        index === 0
          ? await adapter.create(journey.task, step.input)
          : await adapter.execute(step.input);
      if (result.kind !== "committed") throw new Error(JSON.stringify(result));
    }
    const identity = {
      fixture_id: `${source.backend}-${source.scenario}`,
      implementation_anchor: "capture-context",
      reproduction_command: "qualified kernel evidence replay",
    };
    const snapshot = () =>
      observeKernelPersistenceState(
        store.restart(),
        journey.task.id,
        replayRepositoryIdentity,
        fingerprint,
        "evidence",
        identity,
      );
    const before = await snapshot();
    const bound = bindKernelWorkItemEvidence(before.read, "build", fingerprint);
    if (bound.kind !== "binding") throw new Error(JSON.stringify(bound));
    const review = {
      kind: "review",
      binding: bound.binding,
      verdict: "PASS",
      evidence_digests: [k.kernelDigest("qualified-review")],
      findings: [],
    };
    let sequence = 0;
    async function run(command: k.TaskCommand) {
      const current = await adapter.read(journey.task.id);
      if (current.kind !== "canonical") throw new Error("Missing evidence Task");
      const next = {
        ...seed,
        mutation_id: `qualified-evidence-${sequence++}`,
        command: { ...command, expected_task_revision: current.record.aggregate.revision },
      };
      commands.push(next);
      return adapter.execute(next);
    }
    async function commit(command: k.TaskCommand) {
      const result = await run(command);
      if (result.kind !== "committed") throw new Error(JSON.stringify(result));
    }
    if (source.scenario === "metadata-review") {
      const task = before.read.task;
      await store.backend.writeTask(
        {
          ...task,
          revision: task.revision! + 1,
          doc_updated_at: "2026-08-30T01:00:00.000Z",
          doc_updated_by: "fixture-operator",
        },
        { expectedRevision: task.revision },
      );
    } else if (source.scenario === "semantic-review") {
      await commit(journey.steps[7]!.input.command);
      const validated = journey.steps[8]!.input.command;
      if (validated.kind !== "record_work_item_validation")
        throw new Error("Missing validation fixture");
      await commit({ ...validated, validation: { ...validated.validation, status: "FAILED" } });
      const claim = journey.steps[4]!.input.command;
      if (claim.kind !== "transition_work_item") throw new Error("Missing claim fixture");
      await commit({ ...claim, action: "rework" });
      await commit(claim);
      await commit(journey.steps[5]!.input.command);
      const result = seed.command;
      if (result.kind !== "accept_work_item_result") throw new Error("Missing result fixture");
      await commit({
        ...result,
        result_digest: k.kernelDigest("changed-implementation"),
        output_manifests: result.output_manifests.map((output) => ({
          ...output,
          attempt: 2,
          digest: k.kernelDigest("changed-output"),
        })),
      });
    } else {
      const directory = await mkdtemp(path.join(os.tmpdir(), "qualified-missing-executable-"));
      roots.push(directory);
      let code: string | null = null;
      try {
        await runProcess({
          command: "node",
          args: ["--version"],
          cwd: directory,
          env: { PATH: directory },
          extendEnv: false,
        });
      } catch (error) {
        if (!(error instanceof Error) || !("code" in error) || error.code !== "ENOENT") throw error;
        code = error.code;
      }
      if (code !== "ENOENT") throw new Error("Missing executable unexpectedly ran");
      const check: k.ValidationIdentity = {
        implementation_identity: bound.binding.implementation_identity,
        check_id: "required-executable",
        command_digest: k.kernelDigest({
          command: "node",
          args: ["--version"],
          path: "$FIXTURE_ROOT/empty",
        }),
        toolchain_digest: k.kernelDigest("unavailable-executable"),
        environment_digest: k.kernelDigest("isolated-process-fixture"),
      };
      const observed = readKernelValidation(
        {
          kind: "validation",
          binding: bound.binding,
          validation: {
            status: "BLOCKED",
            identity: check,
            evidence_digests: [k.kernelDigest({ code })],
            observed_at: "2026-08-30T00:00:00.000Z",
          },
        },
        bound.binding,
        check,
      );
      if (observed.kind !== "validation") throw new Error(JSON.stringify(observed));
      await commit(journey.steps[7]!.input.command);
      await commit({
        kind: "record_work_item_validation",
        task_id: journey.task.id,
        expected_task_revision: 0,
        expected_state_fingerprint: fingerprint,
        work_item_id: "build",
        validation: observed.validation,
      });
      const completion = await run(journey.steps[9]!.input.command);
      if (completion.kind !== "rejected")
        throw new Error("Blocked validation satisfied WorkItem completion");
      const after = await snapshot();
      return {
        commands,
        before: before.observation,
        after: after.observation,
        process: { command: "node", path: "$FIXTURE_ROOT/empty", code },
        validation: observed,
        completion,
      };
    }
    const after = await snapshot();
    const rebound = bindKernelWorkItemEvidence(after.read, "build", fingerprint);
    if (rebound.kind !== "binding") throw new Error(JSON.stringify(rebound));
    return {
      commands,
      before: before.observation,
      after: after.observation,
      review_input: review,
      binding_before: bound.binding,
      binding_after: rebound.binding,
      review: readKernelReview(review, rebound.binding),
    };
  } finally {
    await Promise.all(roots.map((root) => rm(root, { recursive: true, force: true })));
  }
}

export async function captureKernelEvidenceScenarios(anchor: string) {
  if (!/^[a-f0-9]{40}$/u.test(anchor)) throw new Error("Exact qualification anchor required");
  const fixtures = [];
  for (const fixture of kernelEvidenceReplayCases())
    fixtures.push({
      identity: {
        fixture_id: fixture.id,
        implementation_anchor: anchor,
        source_digest: replayBytesDigest(fixture.source_bytes),
        reproduction_command: `node scripts/bench/qualify-kernel-replay.mjs ${anchor}`,
      },
      family: fixture.scenario === "missing-executable" ? "validation" : "evaluator",
      source_bytes: fixture.source_bytes,
      expected: await observeKernelEvidenceScenario(fixture.source_bytes),
    });
  return fixtures;
}
