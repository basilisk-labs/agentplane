import { readFile } from "node:fs/promises";
import path from "node:path";

import type { AgentSemanticResult } from "@agentplaneorg/core/schemas";

import { CliError } from "../../shared/errors.js";
import { cmdCommit } from "../guard/impl/commit.js";
import { loadTaskFromContext, type CommandContext } from "../shared/task-backend.js";

import type { ExternalAgentExchange } from "./external-agent-exchange.js";
import { readDirectRepositoryStatus } from "./direct-task-finalization.js";
import { cmdVerifyParsed } from "./verify-record.js";

type DeclaredChecksArtifact = {
  status: "passed" | "failed" | "unsupported";
  checks: { command: string; check_ids: string[]; exit_code: number | null }[];
};

function verificationArtifactPath(command: CommandContext, taskId: string): string {
  return path.join(
    command.config.paths.workflow_dir,
    taskId,
    "supervision",
    "declared-checks.json",
  );
}

async function readPassedDeclaredChecks(opts: {
  command: CommandContext;
  taskId: string;
}): Promise<DeclaredChecksArtifact> {
  const relative = verificationArtifactPath(opts.command, opts.taskId);
  const absolute = path.join(opts.command.resolvedProject.gitRoot, relative);
  const raw = JSON.parse(await readFile(absolute, "utf8")) as Partial<DeclaredChecksArtifact>;
  if (
    raw.status !== "passed" ||
    !Array.isArray(raw.checks) ||
    raw.checks.length === 0 ||
    raw.checks.some(
      (check) =>
        !check ||
        typeof check.command !== "string" ||
        check.command.trim().length === 0 ||
        !Array.isArray(check.check_ids) ||
        check.check_ids.some((checkId) => typeof checkId !== "string" || !checkId.trim()) ||
        check.exit_code !== 0,
    )
  ) {
    throw new CliError({
      code: "E_VALIDATION",
      message:
        "A completed external verification result requires a passed supervisor-owned declared-checks artifact.",
    });
  }
  return raw as DeclaredChecksArtifact;
}

function completedVerificationDetails(opts: {
  command: CommandContext;
  taskId: string;
  selectedChecks: readonly string[];
  artifact: DeclaredChecksArtifact;
}): string {
  const evidence = `${verificationArtifactPath(opts.command, opts.taskId)}#checks`;
  const selectedChecks = opts.selectedChecks.filter((checkId) => checkId !== "hosted_integration");
  const checks = selectedChecks.length > 0 ? selectedChecks : ["task_outcome"];
  return checks
    .flatMap((checkId) => {
      const commands = opts.artifact.checks
        .filter((check) => selectedChecks.length === 0 || check.check_ids.includes(checkId))
        .map((check) => check.command);
      if (commands.length === 0) {
        throw new CliError({
          code: "E_VALIDATION",
          message: `Completed external verification lacks concrete evidence for ${checkId}.`,
        });
      }
      return [
        [
          `Check: ${checkId}`,
          `Command: ${commands.join(" && ")}`,
          "Result: pass",
          `Evidence: ${evidence}`,
          `Scope: external TESTER review for task ${opts.taskId}`,
        ].join("\n"),
      ];
    })
    .join("\n\n");
}

export async function isExternalVerificationResultApplied(opts: {
  command: CommandContext;
  exchange: ExternalAgentExchange;
  semantic: AgentSemanticResult;
}): Promise<boolean> {
  const task = await loadTaskFromContext({ ctx: opts.command, taskId: opts.exchange.task_id });
  return Boolean(
    task.verification?.updated_by === "TESTER" && task.verification.note === opts.semantic.summary,
  );
}

export async function applyExternalVerificationResult(opts: {
  command: CommandContext;
  exchange: ExternalAgentExchange;
  semantic: AgentSemanticResult;
}): Promise<void> {
  if (!(await isExternalVerificationResultApplied(opts))) {
    const task = await loadTaskFromContext({ ctx: opts.command, taskId: opts.exchange.task_id });
    const completed = opts.semantic.status === "completed";
    const artifact = completed
      ? await readPassedDeclaredChecks({ command: opts.command, taskId: opts.exchange.task_id })
      : null;
    const exitCode = await cmdVerifyParsed({
      ctx: opts.command,
      cwd: opts.exchange.checkout,
      taskId: opts.exchange.task_id,
      state: completed ? "ok" : "needs_rework",
      by: "TESTER",
      note: opts.semantic.summary,
      ...(artifact
        ? {
            details: completedVerificationDetails({
              command: opts.command,
              taskId: opts.exchange.task_id,
              selectedChecks: task.execution_contract?.verification.contract?.selected_checks ?? [],
              artifact,
            }),
          }
        : {}),
      localOnly: false,
      repoFixable: !completed,
      incidentTags: [],
      incidentMatch: [],
      quiet: true,
    });
    if (exitCode !== 0) throw new Error(`External TESTER result exited ${exitCode}.`);
  }

  const status = await readDirectRepositoryStatus(opts.exchange.checkout);
  const prefix = `.agentplane/tasks/${opts.exchange.task_id}/`;
  if (!(status?.lines ?? []).some((line) => line.slice(3).trim().startsWith(prefix))) return;
  const exitCode = await cmdCommit({
    ctx: opts.command,
    cwd: opts.exchange.checkout,
    taskId: opts.exchange.task_id,
    message: `🚧 ${opts.exchange.task_id.split("-").at(-1)} task: record external tester result`,
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
  if (exitCode !== 0) throw new Error(`External TESTER evidence commit exited ${exitCode}.`);
}
