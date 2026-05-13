import path from "node:path";

import { CliError } from "../../../../shared/errors.js";
import { mapCoreError } from "../../../error-map.js";
import { usageError } from "../../../spec/errors.js";
import type { CommandSpec } from "../../../spec/spec.js";

import { resolveInitBaseBranchForInit } from "./base-branch.js";
import { ensureGitRoot } from "./git.js";
import type { InitParsed } from "./model.js";
import { InitAborted, loadInitClackPrompts, shouldUseInitClackPrompts } from "./prompts.js";
import type { InitClackPrompts } from "./prompts.js";
import { validateCachedRecipesSelection } from "./recipes.js";
import { validateCachedBlueprintSelection } from "./blueprints.js";
import {
  applyInitPlan,
  buildInitPlan,
  collectInitAndHookConflicts,
  detectGithubCliInstalled,
  maybeConfirmInteractiveApply,
  resolveConflictStrategy,
  resolveInitPaths,
} from "./execution.js";
import { buildNonInteractiveAnswers, promptInteractiveAnswers } from "./answers.js";
import { outroError, outroSuccess } from "./ui.js";
import { resolveInitMode } from "./modes.js";

function shouldRunInteractiveInit(flags: InitParsed): boolean {
  if (flags.yes || flags.dryRun || process.env.AGENTPLANE_PROMPTS === "plain") return false;
  return shouldUseInitClackPrompts();
}

function assertNonInteractiveInitAllowed(opts: {
  flags: InitParsed;
  spec: CommandSpec<InitParsed>;
  interactive: boolean;
}): void {
  if (opts.interactive || opts.flags.yes || opts.flags.setupProfile) return;
  if (opts.flags.dryRun) return;
  if (opts.flags.workflow && opts.flags.requireNetworkApproval !== undefined) return;
  throw usageError({
    spec: opts.spec,
    command: "init",
    message:
      "Non-interactive init requires --yes, --setup-profile, or explicit values for: --workflow, --require-network-approval.",
  });
}

function renderDryRunPlanText(plan: ReturnType<typeof buildInitPlan>): string {
  const lines = [
    "AgentPlane init plan",
    `Root: ${plan.root}`,
    `Mode: ${plan.mode}`,
    `Profile: ${plan.profile} (${plan.internalSetupProfile})`,
    `Workflow: ${plan.answers.workflow}`,
    `Backend: ${plan.answers.backend}`,
    `Git init: ${String(!plan.context.gitRootExisted)}`,
    `Parent Git: ${plan.context.parentGitRoot ?? "none"}`,
    `Conflicts: ${plan.conflicts.length === 0 ? "none" : plan.conflicts.join(", ")}`,
    ...(plan.warnings.length > 0
      ? ["Warnings:", ...plan.warnings.map((warning) => `- ${warning}`)]
      : []),
    "Effects:",
    ...plan.effects.map((effect) => {
      const pathSuffix = effect.path ? ` ${effect.path}` : "";
      return `- ${effect.kind}${pathSuffix}: ${effect.summary}`;
    }),
    "Next:",
    ...plan.nextSteps.map((step, index) => `${index + 1}. ${step}`),
  ];
  return `${lines.join("\n")}\n`;
}

function requireInitClack(
  clack: InitClackPrompts | null,
  spec: CommandSpec<InitParsed>,
): InitClackPrompts {
  if (clack) return clack;
  throw usageError({
    spec,
    command: "init",
    message: "Interactive init requires an interactive TTY.",
  });
}

export async function cmdInit(opts: {
  cwd: string;
  rootOverride?: string;
  outputMode?: "text" | "json";
  flags: InitParsed;
  spec: CommandSpec<InitParsed>;
}): Promise<number> {
  const interactive = shouldRunInteractiveInit(opts.flags);
  const initMode = resolveInitMode({ flags: opts.flags, interactive });
  assertNonInteractiveInitAllowed({ flags: opts.flags, spec: opts.spec, interactive });
  const clack = interactive ? requireInitClack(await loadInitClackPrompts(), opts.spec) : null;
  const targetRoot = path.resolve(opts.rootOverride ?? opts.cwd);

  try {
    const answers = clack
      ? await promptInteractiveAnswers({ flags: opts.flags, clack, targetRoot })
      : buildNonInteractiveAnswers(opts.flags);
    await validateCachedRecipesSelection(answers.recipes, { cwd: targetRoot });
    await validateCachedBlueprintSelection(answers.blueprints, { cwd: targetRoot });
    const paths = await resolveInitPaths({
      cwd: opts.cwd,
      rootOverride: opts.rootOverride,
      backend: answers.backend,
    });
    const initBaseBranchSelection = await resolveInitBaseBranchForInit({
      gitRoot: paths.gitRoot,
      baseBranchFallback: "main",
      isInteractive: interactive,
      workflow: answers.workflow,
      gitRootExisted: paths.gitRootExisted,
    });
    const conflicts = await collectInitAndHookConflicts({ paths, answers });
    const conflictMode = await resolveConflictStrategy({
      clack,
      flags: opts.flags,
      gitRoot: paths.gitRoot,
      conflicts,
    });
    const githubCliInstalled =
      answers.workflow === "branch_pr" ? await detectGithubCliInstalled(paths.gitRoot) : null;
    const plan = buildInitPlan({
      paths,
      answers,
      conflicts,
      conflictMode,
      outputMode: opts.outputMode ?? "text",
      includeInstallCommit: !opts.flags.gitignoreAgents,
      initMode,
      githubCliInstalled,
    });
    if (opts.flags.dryRun) {
      if ((opts.outputMode ?? "text") === "json") {
        process.stdout.write(`${JSON.stringify(plan, null, 2)}\n`);
      } else {
        process.stdout.write(renderDryRunPlanText(plan));
      }
      return 0;
    }
    await maybeConfirmInteractiveApply({ clack, flags: opts.flags, answers, paths, plan });
    await applyInitPlan({
      cwd: opts.cwd,
      rootOverride: opts.rootOverride,
      flags: opts.flags,
      clack,
      answers,
      paths,
      initBaseBranchSelection,
      conflictMode,
      conflicts,
      ensureGitRoot,
    });
    if (clack) {
      outroSuccess(clack, paths.gitRoot);
    }
    process.stdout.write(`${path.relative(paths.gitRoot, paths.agentplaneDir)}\n`);
    return 0;
  } catch (err) {
    if (err instanceof InitAborted) {
      throw usageError({ spec: opts.spec, command: "init", message: err.message });
    }
    if (clack) {
      outroError(clack, err);
    }
    if (err instanceof CliError) throw err;
    throw mapCoreError(err, { command: "init", root: opts.rootOverride ?? null });
  }
}
