import { CliError } from "../../../../shared/errors.js";
import {
  DEFAULT_WORKFLOW_TEMPLATE,
  buildWorkflowFromTemplates,
  diagnosticsSummary,
  publishWorkflowCandidate,
  resolveWorkflowPaths,
} from "../../../../workflow-runtime/index.js";

export async function ensureInitWorkflow(opts: {
  gitRoot: string;
  workflowMode: "direct" | "branch_pr";
}): Promise<{ installPaths: string[] }> {
  const built = buildWorkflowFromTemplates({
    baseTemplate: DEFAULT_WORKFLOW_TEMPLATE,
    runtimeContext: {
      workflow: {
        mode: opts.workflowMode,
        version: 1,
      },
      runtime: {
        repo_root: opts.gitRoot,
        timestamp: new Date().toISOString(),
      },
    },
  });

  if (built.diagnostics.some((d) => d.severity === "ERROR")) {
    throw new CliError({
      exitCode: 3,
      code: "E_VALIDATION",
      message: `Failed to generate WORKFLOW.md: ${diagnosticsSummary(built.diagnostics)}`,
      context: {
        diagnostics: built.diagnostics.map((d) => ({
          severity: d.severity,
          code: d.code,
          path: d.path,
          message: d.message,
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
        diagnostics: published.diagnostics.map((d) => ({
          severity: d.severity,
          code: d.code,
          path: d.path,
          message: d.message,
        })),
      },
    });
  }

  const workflowPaths = resolveWorkflowPaths(opts.gitRoot);
  return {
    installPaths: [workflowPaths.workflowPath, workflowPaths.lastKnownGoodPath],
  };
}
