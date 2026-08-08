import path from "node:path";

import type { AgentWorkOrderV2 } from "@agentplaneorg/core/schemas";
import { runProcess } from "@agentplaneorg/core/process";

import { CliError } from "../../shared/errors.js";
import { cmdCommit } from "../guard/impl/commit.js";
import type { TaskRouteDecision } from "../shared/route-decision-types.js";
import type { CommandContext } from "../shared/task-backend.js";

import type {
  ExternalAgentExchange,
  ExternalAgentResultEnvelope,
} from "./external-agent-exchange.js";
import { readDirectRepositoryStatus, readDirectTaskHead } from "./direct-task-finalization.js";
import { prepareDirectImplementationEvidence } from "./direct-task-supervisor-implementation.js";
import { cmdTaskComment } from "./comment.js";
import { cmdTaskSetStatus } from "./set-status.js";

function pathFromStatusLine(line: string): string {
  const raw = line.length >= 4 ? line.slice(3).trim() : "";
  const renamed = raw.includes(" -> ") ? (raw.split(" -> ").at(-1) ?? raw) : raw;
  return renamed.replaceAll("\\", "/");
}

function authorityPath(value: string, cwd: string): string | null {
  const relative = path.relative(cwd, path.resolve(cwd, value)).replaceAll("\\", "/");
  if (relative === "") return ".";
  if (relative === ".." || relative.startsWith("../") || path.posix.isAbsolute(relative)) {
    return null;
  }
  return relative.replace(/\/$/u, "");
}

function pathAllowed(value: string, allowed: readonly string[]): boolean {
  return allowed.some((root) => root === "." || value === root || value.startsWith(`${root}/`));
}

function implementationSubject(taskId: string): string {
  return `🚧 ${taskId.split("-").at(-1)} task: apply external agent result`;
}

async function assertRecoverableImplementationCommit(opts: {
  cwd: string;
  baseline: string | null;
  commit: string;
  task_id: string;
}): Promise<void> {
  const subject = await runProcess({
    command: "git",
    args: ["show", "-s", "--format=%s", opts.commit],
    cwd: opts.cwd,
    reject: false,
  });
  const ancestry = opts.baseline
    ? await runProcess({
        command: "git",
        args: ["merge-base", "--is-ancestor", opts.baseline, opts.commit],
        cwd: opts.cwd,
        reject: false,
      })
    : null;
  if (
    subject.exitCode !== 0 ||
    subject.stdout.trim() !== implementationSubject(opts.task_id) ||
    (ancestry && ancestry.exitCode !== 0)
  ) {
    throw new CliError({
      code: "E_VALIDATION",
      message: "Git history changed outside the recoverable Agentplane implementation effect.",
    });
  }
}

function hasChangedTaskArtifacts(statusLines: readonly string[], taskId: string): boolean {
  const prefix = `.agentplane/tasks/${taskId}/`;
  return statusLines.some((line) => pathFromStatusLine(line).startsWith(prefix));
}

function assertExternalImplementationReturnState(opts: {
  exchange: ExternalAgentExchange;
  work_order: AgentWorkOrderV2;
  current: TaskRouteDecision;
  current_head: string | null;
  current_status_lines: readonly string[];
}): string[] {
  const expected = opts.work_order.state_fingerprint;
  const current = opts.current.workflowStep.preconditionFingerprint;
  if (
    current.task_id !== expected.task_id ||
    current.task_revision !== expected.task_revision ||
    current.worktree !== expected.worktree ||
    current.components.task.digest !== expected.components.task.digest ||
    current.components.backend_projection.digest !== expected.components.backend_projection.digest
  ) {
    throw new CliError({
      code: "E_VALIDATION",
      message: "External-agent implementation result is stale against current task authority.",
    });
  }
  if (opts.current_head !== opts.exchange.baseline.head) {
    throw new CliError({
      code: "E_VALIDATION",
      message: "External agent changed Git history; Agentplane must own the implementation commit.",
    });
  }
  const baseline = new Set(opts.exchange.baseline.changed_paths);
  for (const line of baseline) {
    if (!opts.current_status_lines.includes(line)) {
      throw new CliError({
        code: "E_VALIDATION",
        message: "A pre-existing repository change moved during the external-agent episode.",
      });
    }
  }
  const changed = opts.current_status_lines
    .filter((line) => !baseline.has(line))
    .map((line) => pathFromStatusLine(line))
    .filter(Boolean)
    .toSorted();
  const allowed = opts.work_order.authority.writable_roots
    .map((entry) => authorityPath(entry, opts.exchange.checkout))
    .filter((entry): entry is string => entry !== null);
  const taskPrefix = `.agentplane/tasks/${opts.exchange.task_id}/`;
  const forbidden = changed.filter(
    (entry) => entry.startsWith(taskPrefix) || !pathAllowed(entry, allowed),
  );
  if (forbidden.length > 0) {
    throw new CliError({
      code: "E_VALIDATION",
      message: `External-agent changes escaped semantic authority: ${forbidden.join(", ")}.`,
    });
  }
  if (changed.length === 0) {
    throw new CliError({
      code: "E_VALIDATION",
      message: "Completed implementation result produced no supervisor-observed workspace change.",
    });
  }
  return changed;
}

export async function applyExternalImplementationResult(opts: {
  command: CommandContext;
  decision: TaskRouteDecision;
  exchange: ExternalAgentExchange;
  work_order: AgentWorkOrderV2;
  envelope: ExternalAgentResultEnvelope;
}): Promise<void> {
  const semantic = opts.envelope.result;
  if (semantic.status !== "completed") {
    await cmdTaskComment({
      ctx: opts.command,
      cwd: opts.exchange.checkout,
      taskId: opts.exchange.task_id,
      author: "SUPERVISOR",
      body: `External ${opts.exchange.role} returned ${semantic.status}: ${semantic.summary}`,
      quiet: true,
    });
    return;
  }
  const [head, status] = await Promise.all([
    readDirectTaskHead(opts.exchange.checkout),
    readDirectRepositoryStatus(opts.exchange.checkout),
  ]);
  let implementationCommit =
    opts.exchange.purpose === "task_worktree_resolution" ? null : opts.decision.task.commit;
  let observedChangedPaths: string[] | null = null;
  if (implementationCommit) {
    await assertRecoverableImplementationCommit({
      cwd: opts.exchange.checkout,
      baseline: opts.exchange.baseline.head,
      commit: implementationCommit,
      task_id: opts.exchange.task_id,
    });
  } else if (head !== opts.exchange.baseline.head && head) {
    await assertRecoverableImplementationCommit({
      cwd: opts.exchange.checkout,
      baseline: opts.exchange.baseline.head,
      commit: head,
      task_id: opts.exchange.task_id,
    });
    implementationCommit = head;
  } else {
    observedChangedPaths = assertExternalImplementationReturnState({
      exchange: opts.exchange,
      work_order: opts.work_order,
      current: opts.decision,
      current_head: head,
      current_status_lines: status?.lines ?? [],
    });
    const exitCode = await cmdCommit({
      ctx: opts.command,
      cwd: opts.exchange.checkout,
      taskId: opts.exchange.task_id,
      message: implementationSubject(opts.exchange.task_id),
      close: false,
      allow: observedChangedPaths,
      autoAllow: false,
      allowTasks: true,
      allowBase: false,
      allowPolicy: false,
      allowConfig: false,
      allowHooks: false,
      allowCI: false,
      requireClean: false,
      quiet: true,
      closeUnstageOthers: false,
      closeCheckOnly: false,
    });
    if (exitCode !== 0) throw new Error(`External-agent implementation commit exited ${exitCode}.`);
  }
  const implementation = await prepareDirectImplementationEvidence({
    command: opts.command,
    cwd: opts.exchange.checkout,
    task_id: opts.exchange.task_id,
    execution_base_commit: opts.exchange.baseline.head,
    execution_baseline_status: {
      command: "git status --short --untracked-files=all",
      lines: opts.exchange.baseline.changed_paths,
    },
    allowed_paths: [
      ...opts.work_order.authority.writable_roots,
      `.agentplane/tasks/${opts.exchange.task_id}`,
    ],
    observed_changed_paths: observedChangedPaths,
  });
  if (implementation.status !== "ready") {
    throw new CliError({ code: "E_VALIDATION", message: implementation.reason });
  }
  if (opts.decision.task.commit !== implementation.evidence.implementation_commit) {
    await cmdTaskSetStatus({
      ctx: opts.command,
      cwd: opts.exchange.checkout,
      taskId: opts.exchange.task_id,
      status: "DOING",
      author: "SUPERVISOR",
      body:
        `Implementation committed: ${implementation.evidence.implementation_commit.slice(0, 12)}. ` +
        "CLI accepted one state-bound external-agent semantic result.",
      commit: implementation.evidence.implementation_commit,
      force: false,
      yes: false,
      commitFromComment: false,
      commitAllow: [],
      commitAutoAllow: false,
      commitAllowTasks: true,
      commitRequireClean: false,
      confirmStatusCommit: false,
      quiet: true,
    });
  }
  if (opts.decision.workflowMode === "branch_pr") {
    const currentStatus = await readDirectRepositoryStatus(opts.exchange.checkout);
    if (!hasChangedTaskArtifacts(currentStatus?.lines ?? [], opts.exchange.task_id)) return;
    const evidenceExitCode = await cmdCommit({
      ctx: opts.command,
      cwd: opts.exchange.checkout,
      taskId: opts.exchange.task_id,
      message: `🚧 ${opts.exchange.task_id.split("-").at(-1)} task: record external implementation evidence`,
      close: false,
      allow: [],
      autoAllow: false,
      allowTasks: true,
      allowBase: false,
      allowPolicy: false,
      allowConfig: false,
      allowHooks: false,
      allowCI: false,
      requireClean: false,
      quiet: true,
      closeUnstageOthers: false,
      closeCheckOnly: false,
    });
    if (evidenceExitCode !== 0) {
      throw new Error(`External-agent implementation evidence commit exited ${evidenceExitCode}.`);
    }
  }
}
