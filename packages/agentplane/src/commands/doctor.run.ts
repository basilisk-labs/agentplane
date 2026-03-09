import { loadConfig, resolveProject } from "@agentplaneorg/core";

import type { CommandHandler } from "../cli/spec/spec.js";
import { warnMessage, successMessage } from "../cli/output.js";
import type { DoctorParsed } from "./doctor.spec.js";
import { loadCommandContext } from "./shared/task-backend.js";
import { checkDoneTaskCommitInvariants } from "./doctor/archive.js";
import { safeFixGitignore, safeFixTaskIndex } from "./doctor/fixes.js";
import { checkLayering } from "./doctor/layering.js";
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

  const runChecks = async (): Promise<string[]> => {
    let checks = [
      ...(await checkWorkspace(repoRoot, { ctx: commandCtx })),
      ...checkRuntimeSourceFacts(ctx.cwd, loadedConfig.config),
      ...(await checkDoneTaskCommitInvariants(repoRoot, { fullArchive: p.archiveFull })),
    ];
    if (!isWorkflowEnforcementDisabled()) {
      checks = [...checks, ...(await checkWorkflowContract(repoRoot))];
    }
    if (p.dev) {
      checks = [...checks, ...(await checkLayering(repoRoot))];
    }
    return checks;
  };

  if (isWorkflowEnforcementDisabled()) {
    console.log(
      successMessage(
        "doctor",
        undefined,
        `workflow contract checks disabled via ${workflowEnforcementEnvHint()}.`,
      ),
    );
  }

  if (p.fix) {
    const fix = await safeFixGitignore(repoRoot);
    console.log(successMessage("doctor fix", undefined, fix.note));
    const idx = await safeFixTaskIndex(repoRoot);
    console.log(successMessage("doctor fix", undefined, idx.note));
    const workflowFix = await safeFixWorkflow(repoRoot);
    console.log(successMessage("doctor fix", undefined, workflowFix.note));
  }

  const problems = await runChecks();
  const errors = problems.filter((problem) => findingSeverity(problem) === "ERROR");
  if (problems.length > 0) {
    const warningCount = problems.filter((problem) => findingSeverity(problem) === "WARN").length;
    const infoCount = problems.filter((problem) => findingSeverity(problem) === "INFO").length;
    console.error(
      warnMessage(
        `doctor findings: errors=${errors.length} warnings=${warningCount} info=${infoCount}`,
      ),
    );
    for (const prob of problems) console.error(`- ${prob}`);
    if (errors.length > 0) return 1;
  }

  console.log(successMessage("doctor", undefined, "OK"));
  return 0;
};
