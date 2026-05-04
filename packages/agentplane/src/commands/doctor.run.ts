import { loadConfig } from "@agentplaneorg/core/config";
import { resolveProject } from "@agentplaneorg/core/project";

import type { CommandHandler } from "../cli/spec/spec.js";
import { warnMessage, successMessage } from "../cli/output.js";
import type { DoctorParsed } from "./doctor.spec.js";
import { loadCommandContext } from "./shared/task-backend.js";
import { checkDoneTaskCommitInvariants } from "./doctor/archive.js";
import {
  checkBranchPrBatchIncludedTaskDrift,
  checkBranchPrDoneTaskOpenPrDrift,
  checkBranchPrShippedTaskDrift,
} from "./doctor/branch-pr.js";
import { safeFixGitignore, safeFixTaskIndex } from "./doctor/fixes.js";
import { checkLayering } from "./doctor/layering.js";
import { checkPromptGraphFacts } from "./doctor/prompt-graph.js";
import { checkRuntimeSourceFacts, findingSeverity } from "./doctor/runtime.js";
import { checkWorkspace } from "./doctor/workspace.js";
import { checkWorkflowContract, safeFixWorkflow } from "./doctor/workflow.js";
import {
  isWorkflowEnforcementDisabled,
  workflowEnforcementEnvHint,
} from "../workflow-runtime/index.js";

export const runDoctor: CommandHandler<DoctorParsed> = async (ctx, p) => {
  const resolved = await resolveProject({ cwd: ctx.cwd, rootOverride: ctx.rootOverride ?? null });
  const repoRoot = resolved.gitRoot;
  const loadedConfig = await loadConfig(resolved.agentplaneDir);
  const commandCtx = await loadCommandContext({
    cwd: ctx.cwd,
    rootOverride: ctx.rootOverride ?? null,
    resolvedProject: resolved,
    config: loadedConfig.config,
  });

  const reportProgress = (message: string): void => {
    process.stderr.write(`ℹ️ doctor: ${message}\n`);
  };

  const runChecks = async (): Promise<string[]> => {
    const checks: string[] = [];
    reportProgress("checking workspace");
    checks.push(...(await checkWorkspace(repoRoot, { ctx: commandCtx })));
    reportProgress("checking branch_pr drift");
    checks.push(
      ...(await checkBranchPrShippedTaskDrift(commandCtx)),
      ...(await checkBranchPrDoneTaskOpenPrDrift(commandCtx)),
      ...(await checkBranchPrBatchIncludedTaskDrift(commandCtx)),
    );
    reportProgress("checking runtime source");
    checks.push(...checkRuntimeSourceFacts(ctx.cwd, loadedConfig.config));
    reportProgress("checking prompt graph");
    checks.push(...(await checkPromptGraphFacts(resolved)));
    reportProgress(
      p.archiveFull ? "checking full historical task archive" : "checking recent task archive",
    );
    checks.push(...(await checkDoneTaskCommitInvariants(repoRoot, { fullArchive: p.archiveFull })));
    if (!isWorkflowEnforcementDisabled()) {
      reportProgress("checking workflow contract");
      checks.push(...(await checkWorkflowContract(repoRoot)));
    }
    if (p.dev) {
      reportProgress("checking source layering");
      checks.push(...(await checkLayering(repoRoot)));
    }
    return checks;
  };

  if (isWorkflowEnforcementDisabled()) {
    process.stdout.write(
      `${successMessage(
        "doctor",
        undefined,
        `workflow contract checks disabled via ${workflowEnforcementEnvHint()}.`,
      )}\n`,
    );
  }

  if (p.fix) {
    const fix = await safeFixGitignore(repoRoot);
    process.stdout.write(`${successMessage("doctor fix", undefined, fix.note)}\n`);
    const idx = await safeFixTaskIndex(repoRoot);
    process.stdout.write(`${successMessage("doctor fix", undefined, idx.note)}\n`);
    const workflowFix = await safeFixWorkflow(repoRoot);
    process.stdout.write(`${successMessage("doctor fix", undefined, workflowFix.note)}\n`);
  }

  const problems = await runChecks();
  const errors = problems.filter((problem) => findingSeverity(problem) === "ERROR");
  if (problems.length > 0) {
    const warningCount = problems.filter((problem) => findingSeverity(problem) === "WARN").length;
    const infoCount = problems.filter((problem) => findingSeverity(problem) === "INFO").length;
    process.stderr.write(
      `${warnMessage(
        `doctor findings: errors=${errors.length} warnings=${warningCount} info=${infoCount}`,
      )}\n`,
    );
    for (const prob of problems) process.stderr.write(`- ${prob}\n`);
    if (errors.length > 0) return 1;
  }

  process.stdout.write(`${successMessage("doctor", undefined, "OK")}\n`);
  return 0;
};
