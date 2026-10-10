import { taskKernel as k } from "@agentplaneorg/core/tasks";
import type { CommandSpec } from "../../cli/spec/spec.js";
import { usageError } from "../../cli/spec/errors.js";
import type { CommandContext } from "../shared/task-backend.js";
import { createKernelRuntime, requireKernelCommit } from "./kernel-runtime-context.js";

type Parsed = {
  taskId: string;
  action: "inspect" | "grant" | "revoke";
  stateDigest?: string;
  by?: string;
  maxAttempts?: number;
  expiresAt?: string;
  grantDigest?: string;
};
function fail(message: string): never {
  throw usageError({ spec: taskCorrectiveAuthoritySpec, message });
}

export const taskCorrectiveAuthoritySpec: CommandSpec<Parsed> = {
  id: ["task", "corrective-authority"],
  group: "Task",
  summary: "Inspect, explicitly grant, or revoke bounded native final-check correction authority.",
  args: [{ name: "task-id", required: true, valueHint: "<task-id>" }],
  options: [
    {
      kind: "string",
      name: "action",
      choices: ["inspect", "grant", "revoke"],
      valueHint: "<action>",
      description:
        "Defaults to inspect. Mutation requires explicit USER decision and exact state digest.",
    },
    {
      kind: "string",
      name: "state-digest",
      valueHint: "<sha256:...>",
      description: "Exact canonical record digest returned by inspect.",
    },
    {
      kind: "string",
      name: "by",
      valueHint: "<USER>",
      description: "Explicit operator decision. Standing conversational intent is not a grant.",
    },
    {
      kind: "string",
      name: "max-attempts",
      valueHint: "<1-100>",
      description: "Finite correction admission budget. Required for grant.",
    },
    {
      kind: "string",
      name: "expires-at",
      valueHint: "<ISO-8601>",
      description: "Explicit expiry instant. Required for grant.",
    },
    {
      kind: "string",
      name: "grant-digest",
      valueHint: "<sha256:...>",
      description: "Exact retained grant to revoke.",
    },
  ],
  validateRaw(raw) {
    const action = raw.opts.action ?? "inspect";
    if (
      action !== "inspect" &&
      (raw.opts.by !== "USER" ||
        typeof raw.opts["state-digest"] !== "string" ||
        !/^sha256:[a-f0-9]{64}$/u.test(raw.opts["state-digest"]))
    )
      fail("Grant or revoke requires --by USER and exact --state-digest from inspect.");
    if (
      action === "grant" &&
      (typeof raw.opts["max-attempts"] !== "string" ||
        !/^(?:[1-9]\d?|100)$/u.test(raw.opts["max-attempts"]) ||
        typeof raw.opts["expires-at"] !== "string" ||
        !Number.isFinite(Date.parse(raw.opts["expires-at"])))
    )
      fail("Grant requires finite --max-attempts 1-100 and valid --expires-at.");
    if (
      action === "revoke" &&
      (typeof raw.opts["grant-digest"] !== "string" ||
        !/^sha256:[a-f0-9]{64}$/u.test(raw.opts["grant-digest"]))
    )
      fail("Revoke requires exact --grant-digest.");
  },
  parse: (raw) => ({
    taskId: String(raw.args["task-id"]),
    action: (raw.opts.action ?? "inspect") as Parsed["action"],
    stateDigest: raw.opts["state-digest"] as string | undefined,
    by: raw.opts.by as string | undefined,
    maxAttempts:
      raw.opts["max-attempts"] === undefined ? undefined : Number(raw.opts["max-attempts"]),
    expiresAt: raw.opts["expires-at"] as string | undefined,
    grantDigest: raw.opts["grant-digest"] as string | undefined,
  }),
};

export function makeRunTaskCorrectiveAuthorityHandler(
  getCtx: (cmd: string) => Promise<CommandContext>,
) {
  return async (_ctx: unknown, parsed: Parsed): Promise<number> => {
    const command = await getCtx("task corrective-authority");
    const decision = k.kernelDigest(parsed);
    const runtime = await createKernelRuntime({
      command,
      task_id: parsed.taskId,
      transport: "manual",
      operation_id: `corrective:${decision}`,
      ...(parsed.action === "inspect"
        ? {}
        : {
            approval: {
              kind: "manual_operator" as const,
              actor_id: parsed.by!,
              invocation_id: decision,
            },
          }),
    });
    const read = await runtime.adapter.read(parsed.taskId);
    if (read.kind !== "canonical")
      throw new Error("Corrective authority requires a canonical task");
    const plan = read.record.aggregate.current_plan;
    if (plan?.state !== "APPROVED")
      throw new Error("Corrective authority requires an approved plan");
    const contracts = read.record.documents?.contracts ?? {};
    const snapshot = {
      requirements: k.correctiveRequirements(plan),
      verification_commands: k.correctiveVerificationCommands(plan, contracts),
      verification_contract_digest: k.kernelDigest(read.task.execution_contract ?? null),
    };
    if (parsed.action === "inspect") {
      process.stdout.write(
        JSON.stringify(
          {
            task_id: parsed.taskId,
            state_digest: read.record.digest,
            plan_digest: plan.digest,
            authority_delta: {
              adds_corrective_work_items_only: true,
              ...snapshot,
              external_effects: [],
            },
            grants: read.record.aggregate.corrective_authority ?? [],
          },
          null,
          2,
        ) + "\n",
      );
      return 0;
    }
    if (parsed.stateDigest !== read.record.digest)
      throw new Error("Corrective authority decision is stale; inspect the current state");
    const approval = await runtime.native.readApproval(parsed.taskId);
    if (
      approval?.kind !== "manual_operator" ||
      approval.actor_id !== "USER" ||
      approval.invocation_id !== decision
    )
      throw new Error("Corrective authority requires exact native manual operator decision");
    const context = await runtime.native.readContext(parsed.taskId);
    const authority = read.record.aggregate.authority_lineage?.at(-1)?.authority;
    if (!authority) throw new Error("Corrective authority requires retained plan authority");
    const value = {
      task_id: parsed.taskId,
      initial_plan_digest: plan.digest,
      actor_id: approval.actor_id,
      issued_at: context.occurred_at,
      expires_at: parsed.expiresAt ?? context.occurred_at,
      max_attempts: parsed.maxAttempts ?? 1,
      ...snapshot,
      policy_digest: k.kernelDigest(authority.policy_digests),
      revoked_at: null,
      uses: [],
    };
    const payload =
      parsed.action === "grant"
        ? {
            kind: "grant_corrective_authority" as const,
            grant: { ...value, digest: k.correctiveGrantDigest(value) },
            work_contracts: contracts,
          }
        : {
            kind: "revoke_corrective_authority" as const,
            grant_digest: parsed.grantDigest as k.Sha256Digest,
          };
    const input = await runtime.input(payload, `corrective:${decision}`);
    if (input.command.expected_task_revision !== read.record.aggregate.revision)
      throw new Error("Corrective authority state changed before admission");
    const result = requireKernelCommit(
      await runtime.lifecycle.apply({
        ...input,
        occurred_at: context.occurred_at,
        actor: { ...input.actor, id: approval.actor_id, kind: "USER" },
      }),
    );
    process.stdout.write(
      JSON.stringify(
        {
          task_id: parsed.taskId,
          state_digest: result.record.digest,
          grants: result.record.aggregate.corrective_authority,
        },
        null,
        2,
      ) + "\n",
    );
    return 0;
  };
}
