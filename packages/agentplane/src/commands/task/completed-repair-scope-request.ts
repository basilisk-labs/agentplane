import path from "node:path";
import { execFileAsync } from "@agentplaneorg/core/process";
import { gitProofIsAncestor, gitProofEnv } from "@agentplaneorg/core/git";
import {
  digestSupervisorEpisodeValue,
  validateSupervisorExecutionEpisodeJournal,
} from "@agentplaneorg/core/schemas";
import type { TaskData } from "../../backends/task-backend.js";
import { CliError } from "../../shared/errors.js";
import {
  createSupervisorEpisodeStore,
  resolveSupervisorExecutionEpisodePath,
} from "../shared/supervisor-execution-episode.js";
import { parseTaskScopeExtensionRequestState } from "../shared/task-scope-extension-request.js";
import { resolveCommandGitCommonDir, type CommandContext } from "../shared/task-backend.js";
import { readDirectRepositoryStatus } from "./direct-task-finalization.js";
import { isExternalBlockedResultRecorded } from "./external-agent-blocked-result.js";
import {
  externalAgentResultDigest,
  externalAgentIssueDigest,
  readExternalAgentExchange,
  readExternalAgentWorkOrder,
  validateExternalAgentResultEnvelope,
} from "./external-agent-exchange.js";

function fail(): never {
  throw new CliError({
    code: "E_VALIDATION",
    message:
      "Completed repair scope requires the exact consumed native blocker and unchanged checkout.",
  });
}

/** Authenticate the preserved native blocker before task-level scope admission. */
export async function completedRepairScopeRequest(command: CommandContext, task: TaskData) {
  const pending = parseTaskScopeExtensionRequestState(task);
  if (task.status !== "DONE" || pending?.status !== "pending" || pending.work_item_id !== null)
    return null;
  const root = command.resolvedProject.gitRoot;
  const journalPath = await resolveSupervisorExecutionEpisodePath({
    git_root: root,
    common_git_dir: await resolveCommandGitCommonDir(command),
    task_id: task.id,
  });
  const journal = validateSupervisorExecutionEpisodeJournal(
    await createSupervisorEpisodeStore(journalPath).read(),
  );
  const op = journal.operations.at(-1);
  if (
    journal.task_id !== task.id ||
    journal.status !== "running" ||
    journal.cursor.phase !== "ready" ||
    op?.status !== "completed" ||
    op.kind !== "agent_episode" ||
    op.role !== "EXECUTOR" ||
    !op.work_order_ref
  )
    return fail();
  const exchange = await readExternalAgentExchange(
    path.join(path.dirname(op.work_order_ref), "exchange.json"),
  );
  if (
    exchange?.status !== "consumed" ||
    exchange.purpose !== "implementation_rework" ||
    exchange.task_id !== task.id ||
    exchange.checkout !== root ||
    exchange.transition_id !== pending.transition_id ||
    exchange.state_fingerprint !== pending.blocker_state_fingerprint ||
    exchange.work_order_ref !== op.work_order_ref ||
    op.precondition_fingerprint_digest !== exchange.state_fingerprint ||
    !exchange.baseline.head ||
    exchange.result?.result.status !== "blocked" ||
    exchange.result_digest !== externalAgentResultDigest(exchange.result) ||
    op.postcondition_fingerprint_digest !== exchange.postcondition_fingerprint ||
    op.result_digest !==
      digestSupervisorEpisodeValue({
        work_order_id: exchange.work_order_id,
        semantic_status: "blocked",
        result_digest: exchange.result_digest,
      })
  )
    return fail();
  const order = await readExternalAgentWorkOrder(exchange.work_order_ref);
  const envelope = validateExternalAgentResultEnvelope({
    raw: exchange.result,
    exchange,
    work_order: order,
  });
  if (
    externalAgentResultDigest(envelope) !== exchange.result_digest ||
    op.effect_ref !==
      `external-agent-issue:${externalAgentIssueDigest({ exchange, work_order: order })}`
  )
    return fail();
  if (
    !(await isExternalBlockedResultRecorded({
      command,
      exchange,
      semantic: exchange.result.result,
    }))
  )
    return fail();
  const status = await readDirectRepositoryStatus(root);
  if (!(await gitProofIsAncestor(root, exchange.baseline.head, "HEAD"))) return fail();
  const observedHistory = await execFileAsync(
    "git",
    [
      "log",
      "--format=",
      "--name-only",
      "--no-renames",
      "--full-history",
      "--diff-merges=separate",
      `${exchange.baseline.head}..HEAD`,
    ],
    {
      cwd: root,
      env: gitProofEnv(),
      maxBuffer: 16 * 1024 * 1024,
    },
  );
  const history = observedHistory.stdout.split("\n").filter(Boolean);
  if (history.some((file) => file !== `${command.config.paths.workflow_dir}/${task.id}/README.md`))
    return fail();
  if (!status || status.lines.length > 0) return fail();
  return pending;
}
