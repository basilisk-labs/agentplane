import { access } from "node:fs/promises";
import path from "node:path";

import type {
  validateSupervisorExecutionEpisodeJournal,
  AgentWorkOrderV2,
} from "@agentplaneorg/core/schemas";

import { CliError } from "../../shared/errors.js";
import { assertExternalAgentExchangeIdentity } from "./external-agent-exchange-authority.js";
import {
  externalAgentIssueDigest,
  readExternalAgentWorkOrder,
  type ExternalAgentExchange,
  type ExternalAgentExchangePaths,
} from "./external-agent-exchange.js";
import { isReadOnlyWorktreeObservation } from "./external-agent-consumed-recovery.js";

type Journal = ReturnType<typeof validateSupervisorExecutionEpisodeJournal>;
type Operation = Journal["operations"][number];

async function resultAbsent(resultPath: string): Promise<boolean> {
  return await access(resultPath).then(
    () => false,
    (error) => {
      if ((error as NodeJS.ErrnoException | null)?.code === "ENOENT") return true;
      throw error;
    },
  );
}

export async function verifyUnansweredReadOnlyObservation(opts: {
  journal: Journal;
  operation: Operation;
  exchange: ExternalAgentExchange;
  paths: ExternalAgentExchangePaths;
  work_order: AgentWorkOrderV2;
  task_id: string;
  require_absent?: boolean;
}): Promise<boolean> {
  const { journal, operation, exchange, paths, work_order: workOrder } = opts;
  assertExternalAgentExchangeIdentity({
    exchange,
    paths,
    task_id: opts.task_id,
    transition_id: path.basename(path.dirname(paths.directory)),
    state_fingerprint: workOrder.state_fingerprint.digest,
    work_order_id: workOrder.work_order_id,
    role: workOrder.role,
    purpose: "task_worktree_resolution",
    checkout: workOrder.state_fingerprint.worktree ?? exchange.checkout,
  });
  if (
    journal.task_id !== opts.task_id ||
    operation.precondition_fingerprint_digest !== exchange.state_fingerprint ||
    workOrder.task.id !== opts.task_id ||
    operation.role !== workOrder.role ||
    operation.effect_ref !==
      `external-agent-issue:${externalAgentIssueDigest({ exchange, work_order: workOrder })}`
  ) {
    throw new CliError({
      code: "E_VALIDATION",
      message: "Read-only observation does not match the unresolved supervisor intent.",
    });
  }
  const absent = await resultAbsent(paths.result);
  if (opts.require_absent && !absent) {
    throw new CliError({
      code: "E_RUNTIME",
      message: "An unresolved external-agent observation gained a result before retirement.",
    });
  }
  return absent;
}

/** A completed provider route must stop on any unresolved ineligible external-agent intent. */
export async function requireRecoverableReadOnlyObservation(opts: {
  journal: Journal;
  operation: Operation;
  exchange: ExternalAgentExchange | null;
  paths: ExternalAgentExchangePaths;
  task_id: string;
  current_fingerprint: string;
}): Promise<void> {
  const { exchange } = opts;
  if (exchange?.task_id !== opts.task_id) {
    throw new CliError({
      code: "E_RUNTIME",
      message: "An unresolved external-agent intent has no matching task exchange.",
    });
  }
  if (
    (exchange.status !== "issued" &&
      exchange.status !== "prepared" &&
      exchange.status !== "retired") ||
    exchange.result !== null ||
    exchange.result_digest !== null
  ) {
    throw new CliError({
      code: "E_RUNTIME",
      message: "An unresolved external-agent intent has a retained result or non-pending exchange.",
    });
  }
  const workOrder = await readExternalAgentWorkOrder(opts.paths.work_order);
  if (!isReadOnlyWorktreeObservation({ exchange, work_order: workOrder })) {
    throw new CliError({
      code: "E_RUNTIME",
      message: "An unresolved external-agent intent is not a read-only observation.",
    });
  }
  if (
    !(await verifyUnansweredReadOnlyObservation({
      ...opts,
      exchange,
      work_order: workOrder,
    }))
  ) {
    throw new CliError({
      code: "E_RUNTIME",
      message: "An unresolved external-agent observation has a result at its original path.",
    });
  }
  if (opts.operation.precondition_fingerprint_digest === opts.current_fingerprint) {
    throw new CliError({
      code: "E_RUNTIME",
      message: "An unresolved read-only observation still owns the current task boundary.",
    });
  }
}
