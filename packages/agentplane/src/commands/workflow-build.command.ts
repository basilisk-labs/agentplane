import fs from "node:fs/promises";
import path from "node:path";

import { loadConfig, resolveProject } from "@agentplaneorg/core";

import type { CommandHandler, CommandSpec } from "../cli/spec/spec.js";
import { successMessage, warnMessage } from "../cli/output.js";
import {
  DEFAULT_WORKFLOW_TEMPLATE,
  buildWorkflowFromTemplates,
  diagnosticsSummary,
  publishWorkflowCandidate,
  resolveWorkflowPaths,
  validateWorkflowText,
} from "../workflow-runtime/index.js";

export type WorkflowBuildParsed = {
  validate: boolean;
  dryRun: boolean;
};

export const workflowBuildSpec: CommandSpec<WorkflowBuildParsed> = {
  id: ["workflow", "build"],
  group: "Workflow",
  summary: "Build WORKFLOW.md from template layers with strict rendering checks.",
  options: [
    {
      kind: "boolean",
      name: "validate",
      default: false,
      description: "Validate built workflow and fail on errors.",
    },
    {
      kind: "boolean",
      name: "dry-run",
      default: false,
      description: "Do not publish; print candidate and diagnostics only.",
    },
  ],
  examples: [
    {
      cmd: "agentplane workflow build --validate --dry-run",
      why: "Build and validate candidate workflow without publishing.",
    },
    {
      cmd: "agentplane workflow build --validate",
      why: "Build, validate, and atomically publish workflow.",
    },
  ],
  parse: (raw) => ({
    validate: raw.opts.validate === true,
    dryRun: raw.opts["dry-run"] === true,
  }),
};

async function maybeReadOverride(paths: { workflowDir: string }): Promise<string | undefined> {
  const overridePath = path.join(paths.workflowDir, "template.override.md");
  try {
    return await fs.readFile(overridePath, "utf8");
  } catch {
    return undefined;
  }
}

export const runWorkflowBuild: CommandHandler<WorkflowBuildParsed> = async (ctx, flags) => {
  const resolved = await resolveProject({ cwd: ctx.cwd, rootOverride: ctx.rootOverride ?? null });
  const configLoaded = await loadConfig(resolved.agentplaneDir);
  const workflowPaths = resolveWorkflowPaths(resolved.gitRoot);

  const runtimeContext = {
    workflow: {
      mode: configLoaded.config.workflow_mode,
      version: 1,
    },
    runtime: {
      repo_root: resolved.gitRoot,
      timestamp: new Date().toISOString(),
    },
  };

  const overrideTemplate = await maybeReadOverride(workflowPaths);
  const built = buildWorkflowFromTemplates({
    baseTemplate: DEFAULT_WORKFLOW_TEMPLATE,
    projectOverrideTemplate: overrideTemplate,
    runtimeContext,
  });

  if (flags.dryRun) {
    process.stdout.write(`${built.text}\n`);
  }

  let diagnostics = [...built.diagnostics];
  if (flags.validate || flags.dryRun) {
    const validation = await validateWorkflowText(resolved.gitRoot, built.text);
    diagnostics = [...diagnostics, ...validation.diagnostics];
  }

  const hasError = diagnostics.some((d) => d.severity === "ERROR");
  if (diagnostics.length > 0) {
    process.stderr.write(
      `${warnMessage(`workflow diagnostics: ${diagnosticsSummary(diagnostics)}`)}\n`,
    );
    for (const diagnostic of diagnostics) {
      process.stderr.write(
        `- [${diagnostic.severity}] ${diagnostic.code} ${diagnostic.path}: ${diagnostic.message}\n`,
      );
    }
  }

  if (flags.dryRun) {
    return hasError ? 1 : 0;
  }

  const publish = await publishWorkflowCandidate(resolved.gitRoot, built.text);
  if (!publish.ok) {
    process.stderr.write(warnMessage("workflow publish failed") + "\n");
    for (const diagnostic of publish.diagnostics) {
      process.stderr.write(
        `- [${diagnostic.severity}] ${diagnostic.code} ${diagnostic.path}: ${diagnostic.message}\n`,
      );
    }
    return 1;
  }

  process.stdout.write(
    successMessage(
      "workflow build",
      undefined,
      `Published ${path.relative(resolved.gitRoot, workflowPaths.workflowPath)}`,
    ) + "\n",
  );
  return hasError && flags.validate ? 1 : 0;
};
