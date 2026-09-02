import { buildKernelStateFingerprint } from "./kernel-work-order.js";
import type { RunnerStateFingerprintRecord, RunnerContextBundle } from "../../runner/types.js";
import path from "node:path";
import {
  AGENT_SEMANTIC_RESULT_ZOD_SCHEMA,
  AGENT_WORK_ORDER_V2_ZOD_SCHEMA,
  evaluateStateFingerprintPrecondition,
} from "@agentplaneorg/core/schemas";
import { createRunnerAdapter } from "../../runner/adapters/index.js";
import { RunnerRunRepository } from "../../runner/run-repository.js";
import { resolveSupervisorTaskRunnerPaths } from "../../runner/task-run-paths.js";
import { buildRunnerPolicyDecision } from "../../runner/policy-decision.js";
import { assertRunnerPolicyCompatibility } from "../../runner/usecases/task-run-authority.js";
import { renderSemanticBootstrap } from "../../runner/usecases/task-run-semantic-prompt.js";
import { resolveRunnerSandboxPolicy } from "../../runner/sandbox-policy.js";
import { makeReadOnlyExecutionContext } from "../../runtime/execution-context.js";
import { readStableRegularTextNoFollow } from "../../shared/stable-file.js";
import { resolveCommandGitCommonDir, type CommandContext } from "../shared/task-backend.js";
import { advanceCanonicalTask } from "./kernel-advance.js";
import { writeKernelArtifact } from "./kernel-exchange.js";
import { createKernelRuntime } from "./kernel-runtime-context.js";

type Packet = Awaited<ReturnType<typeof advanceCanonicalTask>>;

async function executeKernelPacket(
  command: CommandContext,
  taskId: string,
  packet: Extract<Packet, { exchange: object }>,
  sandbox?: string,
) {
  const directory = packet.exchange.directory;
  const workOrder = AGENT_WORK_ORDER_V2_ZOD_SCHEMA.parse(
    JSON.parse(
      await readStableRegularTextNoFollow(
        path.join(directory, "work-order.json"),
        "canonical managed work order",
      ),
    ),
  );
  if (sandbox && sandbox !== workOrder.authority.sandbox)
    throw new Error("Requested sandbox exceeds the canonical WorkOrder");
  const execution = await makeReadOnlyExecutionContext(command);
  const adapter = createRunnerAdapter(execution.config);
  const runId = `kernel-${workOrder.work_order_id.slice(7)}`;
  const paths = await resolveSupervisorTaskRunnerPaths({
    git_root: command.resolvedProject.gitRoot,
    workflow_dir: command.config.paths.workflow_dir,
    task_id: taskId,
    run_id: runId,
    common_git_dir: await resolveCommandGitCommonDir(command),
  });
  const sandboxPolicy = resolveRunnerSandboxPolicy({
    execution_role: workOrder.role,
    requested_sandbox: workOrder.authority.sandbox,
    route_allows_workspace_write: workOrder.authority.writable_roots.length > 0,
  });
  const bundle: RunnerContextBundle = {
    schema_version: 1,
    runner_api_version: "1",
    target: { kind: "task", task_id: taskId },
    base_prompts: [
      {
        id: "canonical-episode",
        role: "task",
        priority: 100,
        content: `${workOrder.task.objective}\n${workOrder.context_intent.purpose}\nReturn AgentSemanticResult v2 with the exact canonical_binding. Return canonical_plan for planning and canonical_outputs for implementation.`,
      },
    ],
    repository: {
      git_root: command.resolvedProject.gitRoot,
      workflow_dir: command.config.paths.workflow_dir,
      backend_id: command.backendId,
      backend_config_path: command.backendConfigPath,
    },
    work_order: workOrder,
    state_fingerprint: workOrder.state_fingerprint,
    state_fingerprint_policy: workOrder.state_fingerprint_policy,
    execution: {
      adapter_id: adapter.id,
      mode: "execute",
      run_id: runId,
      artifact_paths: paths,
      profile_runtime: execution.executionProfile,
      trace_policy: execution.executionProfile.runner.trace_policy,
      timeout_policy: execution.executionProfile.runner.timeout_policy,
      sandbox_policy: sandboxPolicy,
      write_scope: {
        mutation_scope: workOrder.authority.mutation_scope,
        writable_roots: workOrder.authority.writable_roots.map(
          (root) => path.relative(command.resolvedProject.gitRoot, root) || ".",
        ),
        protected_paths: [
          ...new Set([
            ...workOrder.authority.protected_paths,
            ...Object.values(execution.harness.policy.protected_paths).flat(),
          ]),
        ],
      },
    },
  };
  bundle.execution.adapter_capabilities = adapter.describeCapabilities(bundle);
  bundle.execution.policy_decision = buildRunnerPolicyDecision({
    adapter_id: adapter.id,
    recipe: undefined,
    capabilities: bundle.execution.adapter_capabilities,
    requested: { sandbox: sandboxPolicy.requested },
  });
  assertRunnerPolicyCompatibility(bundle);
  const repository = RunnerRunRepository.fromBundle(bundle);
  await repository.createFreshDirectory({ run_id: runId });
  const invocation = await adapter.prepare(bundle);
  const bootstrap = renderSemanticBootstrap(bundle, invocation);
  const prepared = await repository.writePrepared({
    bundle,
    invocation,
    bootstrap_markdown: bootstrap,
  });
  const runtime = await createKernelRuntime({
    command,
    task_id: taskId,
    transport: "managed",
    operation_id: `dispatch:${workOrder.work_order_id}`,
  });
  const fresh = await runtime.native.readContext(taskId);
  if (
    fresh.task_revision !== workOrder.task.revision ||
    fresh.repository_fingerprint !== workOrder.canonical_binding?.repository_fingerprint
  )
    throw new Error("Canonical managed dispatch state changed during preparation");
  // A lost launch response never permits another process with this episode identity.
  const ownsDispatch = await writeKernelArtifact(directory, "managed-dispatch.json", {
    work_order_id: workOrder.work_order_id,
    run_id: runId,
  });
  if (!ownsDispatch)
    throw new Error(
      "Canonical managed dispatch already claimed; inspect the existing run before recovery",
    );
  const capture = async () => {
    const current = await runtime.adapter.read(taskId);
    if (current.kind !== "canonical") throw new Error("Canonical run state unavailable");
    return buildKernelStateFingerprint({
      command,
      record: current.record,
      context: await runtime.native.readContext(taskId),
      authority_digest:
        workOrder.canonical_binding?.phase === "implementation"
          ? workOrder.canonical_binding.authority_digest
          : null,
    });
  };
  const before = await capture();
  const diagnostic = evaluateStateFingerprintPrecondition({
    expected: workOrder.state_fingerprint,
    current: before,
    policy: workOrder.state_fingerprint_policy,
  });
  if (diagnostic.status === "stale" || diagnostic.status === "blocked")
    throw new Error("Canonical managed state precondition failed");
  const stateFingerprint: RunnerStateFingerprintRecord = {
    schema_version: 1,
    kind: "runner_state_fingerprint_record",
    outcome: "effect_started",
    precondition_fingerprint: workOrder.state_fingerprint,
    precondition_policy: workOrder.state_fingerprint_policy,
    state_before: before,
    state_after: null,
    precondition: diagnostic,
    effect_applied: null,
    post_state_reason_code: null,
  };
  await repository.writeState({
    ...prepared,
    updated_at: new Date().toISOString(),
    state_fingerprint: stateFingerprint,
  });
  const result = await adapter.execute(invocation);
  const observed = await repository.readState();
  if (!observed) throw new Error("Canonical managed run evidence is unavailable");
  await repository.writeState({
    ...observed,
    state_fingerprint: {
      ...stateFingerprint,
      outcome: "accepted",
      state_after: await capture(),
      effect_applied: true,
    },
  });
  if (
    result.status !== "success" ||
    result.execution_receipt?.verification_state !== "observed_success"
  )
    return {
      schema_version: 1,
      task_id: taskId,
      action: { kind: "human_required", reason: "canonical_runner_receipt_not_successful" },
      run_id: runId,
      status: result.status,
    };
  const semantic = AGENT_SEMANTIC_RESULT_ZOD_SCHEMA.parse(result.semantic_result?.value);
  await writeKernelArtifact(directory, "result.json", semantic);
  return advanceCanonicalTask({
    command,
    task_id: taskId,
    transport: "managed",
    result_path: packet.exchange.result_path,
  });
}

export async function runCanonicalTask(opts: {
  command: CommandContext;
  task_id: string;
  dry_run?: boolean;
  sandbox?: string;
}) {
  if (opts.dry_run) {
    const runtime = await createKernelRuntime({
      ...opts,
      transport: "managed",
      operation_id: "preview",
    });
    const context = await runtime.native.readContext(opts.task_id);
    const current = await runtime.lifecycle.read(opts.task_id, context.repository_fingerprint);
    return {
      schema_version: 1,
      task_id: opts.task_id,
      action: { kind: "read_only", reason: current.next_action.reason_code },
    };
  }
  let packet: Packet | Awaited<ReturnType<typeof executeKernelPacket>> = await advanceCanonicalTask(
    { command: opts.command, task_id: opts.task_id, transport: "managed" },
  );
  for (let episode = 0; episode < 16 && "exchange" in packet; episode++) {
    packet = await executeKernelPacket(opts.command, opts.task_id, packet, opts.sandbox);
  }
  return packet;
}
