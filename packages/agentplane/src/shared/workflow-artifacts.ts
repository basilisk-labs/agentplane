import path from "node:path";
import { readFile } from "node:fs/promises";

import {
  DEFAULT_WORKFLOW_TEMPLATE,
  buildWorkflowFromTemplates,
  diagnosticsSummary,
  publishWorkflowCandidate,
  resolveWorkflowPaths,
} from "../workflow-runtime/index.js";
import { CliError } from "./errors.js";

export type WorkflowArtifactApprovals = {
  requirePlanApproval: boolean;
  requireVerifyApproval: boolean;
  requireNetworkApproval: boolean;
};

export function buildWorkflowRuntimeContext(opts: {
  gitRoot: string;
  workflowMode: "direct" | "branch_pr";
  approvals: WorkflowArtifactApprovals;
  timestamp?: string;
}) {
  return {
    workflow: {
      mode: opts.workflowMode,
      version: 1,
      approvals: {
        require_plan: opts.approvals.requirePlanApproval,
        require_verify: opts.approvals.requireVerifyApproval,
        require_network: opts.approvals.requireNetworkApproval,
      },
    },
    runtime: {
      repo_name: path.basename(opts.gitRoot) || "repo",
      repo_root: opts.gitRoot,
      timestamp: opts.timestamp ?? new Date().toISOString(),
    },
  };
}

async function readIfPresent(absPath: string): Promise<string | null> {
  try {
    return await readFile(absPath, "utf8");
  } catch {
    return null;
  }
}

export async function ensureWorkflowArtifacts(opts: {
  gitRoot: string;
  workflowMode: "direct" | "branch_pr";
  approvals: WorkflowArtifactApprovals;
  projectOverrideTemplate?: string;
}): Promise<{ installPaths: string[]; commitPaths: string[]; changedPaths: string[] }> {
  const workflowPaths = resolveWorkflowPaths(opts.gitRoot);
  const [beforeWorkflow, beforeLastKnownGood, beforeLegacyWorkflow] = await Promise.all([
    readIfPresent(workflowPaths.workflowPath),
    readIfPresent(workflowPaths.lastKnownGoodPath),
    workflowPaths.legacyWorkflowPath === workflowPaths.workflowPath
      ? Promise.resolve(null)
      : readIfPresent(workflowPaths.legacyWorkflowPath),
  ]);

  const built = buildWorkflowFromTemplates({
    baseTemplate: DEFAULT_WORKFLOW_TEMPLATE,
    projectOverrideTemplate: opts.projectOverrideTemplate,
    runtimeContext: buildWorkflowRuntimeContext({
      gitRoot: opts.gitRoot,
      workflowMode: opts.workflowMode,
      approvals: opts.approvals,
    }),
  });

  if (built.diagnostics.some((diagnostic) => diagnostic.severity === "ERROR")) {
    throw new CliError({
      exitCode: 3,
      code: "E_VALIDATION",
      message: `Failed to generate WORKFLOW.md: ${diagnosticsSummary(built.diagnostics)}`,
      context: {
        diagnostics: built.diagnostics.map((diagnostic) => ({
          severity: diagnostic.severity,
          code: diagnostic.code,
          path: diagnostic.path,
          message: diagnostic.message,
        })),
      },
    });
  }

  const published = await publishWorkflowCandidate(opts.gitRoot, built.text);
  if (!published.ok) {
    throw new CliError({
      exitCode: 3,
      code: "E_VALIDATION",
      message: `Failed to publish WORKFLOW.md: ${diagnosticsSummary(published.diagnostics)}`,
      context: {
        diagnostics: published.diagnostics.map((diagnostic) => ({
          severity: diagnostic.severity,
          code: diagnostic.code,
          path: diagnostic.path,
          message: diagnostic.message,
        })),
      },
    });
  }

  const changedPaths: string[] = [];
  if (beforeWorkflow !== built.text) changedPaths.push(workflowPaths.workflowPath);
  if (beforeLastKnownGood !== built.text) changedPaths.push(workflowPaths.lastKnownGoodPath);
  if (
    workflowPaths.legacyWorkflowPath !== workflowPaths.workflowPath &&
    beforeLegacyWorkflow !== null
  ) {
    changedPaths.push(workflowPaths.legacyWorkflowPath);
  }

  const commitPaths = [
    ...new Set(changedPaths.map((absPath) => path.relative(opts.gitRoot, absPath))),
  ];

  return {
    installPaths: [workflowPaths.workflowPath, workflowPaths.lastKnownGoodPath],
    commitPaths,
    changedPaths,
  };
}
