import path from "node:path";
import type { ExecutionProfile } from "@agentplaneorg/core/config";
import { buildExecutionProfile } from "@agentplaneorg/core/config";
import { setPinnedBaseBranch } from "@agentplaneorg/core/git";

import type { WorkflowMode } from "../../../../agents/agents-template.js";
import { cmdHooksInstall, ensureInitCommit } from "../../../../commands/workflow.js";
import { collectHooksInstallConflicts } from "../../../../commands/hooks/install.js";
import { getVersion } from "../../../../meta/version.js";
import { CliError } from "../../../../shared/errors.js";
import type { PolicyGatewayFlavor } from "../../../../shared/policy-gateway.js";
import { policyGatewayFileName } from "../../../../shared/policy-gateway.js";
import { mapCoreError } from "../../../error-map.js";
import { fileExists } from "../../../fs-utils.js";
import { promptChoice, promptInput, promptYesNo } from "../../../prompts.js";
import { usageError } from "../../../spec/errors.js";
import type { CommandSpec } from "../../../spec/spec.js";

import { resolveInitBaseBranchForInit } from "./base-branch.js";
import { collectInitConflicts, handleInitConflicts } from "./conflicts.js";
import { ensureGitRoot } from "./git.js";
import { maybeSyncIde } from "./ide-sync.js";
import {
  listCachedRecipes,
  maybeAddCachedRecipes,
  renderCachedRecipesHint,
  validateCachedRecipesSelection,
} from "./recipes.js";
import { INIT_DEFAULTS, setupProfilePresets } from "./presets.js";
import type { InitFlags, InitIde, InitParsed, SetupProfilePreset } from "./model.js";
import { ensureAgentsFiles } from "./write-agents.js";
import { ensureAgentplaneDirs, writeBackendStubs, writeInitConfig } from "./write-config.js";
import { ensureInitRedmineEnvTemplate } from "./write-env.js";
import { ensureInitGitignore } from "./write-gitignore.js";
import { ensureInitWorkflow } from "./write-workflow.js";
import { cmdInitV2 } from "./orchestrate-v2.js";

function shouldUseInteractiveInitUi(flags: InitParsed): boolean {
  if (
    flags.interactiveUi === true ||
    process.env.AGENTPLANE_INIT_UI === "interactive" ||
    process.env.AGENTPLANE_INIT_UI === "v2"
  ) {
    return true;
  }
  if (flags.yes || process.env.AGENTPLANE_PROMPTS === "plain") return false;
  return process.stdin.isTTY === true && process.stdout.isTTY === true;
}

async function askChoice(label: string, choices: string[], defaultValue: string): Promise<string> {
  const result = await promptChoice(`\n${label}`, choices, defaultValue);
  process.stdout.write("\n");
  return result;
}

async function askYesNo(label: string, defaultValue: boolean): Promise<boolean> {
  const result = await promptYesNo(`\n${label}`, defaultValue);
  process.stdout.write("\n");
  return result;
}

async function askInput(label: string): Promise<string> {
  const result = await promptInput(`\n${label}`);
  process.stdout.write("\n");
  return result;
}

export async function cmdInit(opts: {
  cwd: string;
  rootOverride?: string;
  flags: InitParsed;
  spec: CommandSpec<InitParsed>;
}): Promise<number> {
  const flags = opts.flags;
  if (shouldUseInteractiveInitUi(flags)) {
    return cmdInitV2(opts);
  }

  let ide: InitIde = flags.ide ?? INIT_DEFAULTS.ide;
  let policyGateway: PolicyGatewayFlavor = flags.policyGateway ?? INIT_DEFAULTS.policyGateway;
  let workflow: WorkflowMode = flags.workflow ?? INIT_DEFAULTS.workflow;
  let directCloseDirtyPolicy = flags.directCloseDirtyPolicy ?? INIT_DEFAULTS.directCloseDirtyPolicy;
  let backend: NonNullable<InitFlags["backend"]> = flags.backend ?? INIT_DEFAULTS.backend;
  let hooks = flags.hooks ?? INIT_DEFAULTS.hooks;
  let recipes = flags.recipes ?? INIT_DEFAULTS.recipes;
  let requirePlanApproval = flags.requirePlanApproval ?? INIT_DEFAULTS.requirePlanApproval;
  let requireNetworkApproval = flags.requireNetworkApproval ?? INIT_DEFAULTS.requireNetworkApproval;
  let requireVerifyApproval = flags.requireVerifyApproval ?? INIT_DEFAULTS.requireVerifyApproval;
  let executionProfile = flags.executionProfile ?? INIT_DEFAULTS.executionProfile;
  let strictUnsafeConfirm = flags.strictUnsafeConfirm ?? INIT_DEFAULTS.strictUnsafeConfirm;
  let setupProfile: "compact" | "full" = flags.setupProfile
    ? setupProfilePresets[flags.setupProfile].mode
    : "compact";
  let setupProfilePreset: SetupProfilePreset = flags.setupProfile ?? "normal";
  const isInteractive = process.stdin.isTTY && !flags.yes;

  if (
    !process.stdin.isTTY &&
    !flags.yes &&
    (!flags.workflow || flags.requireNetworkApproval === undefined)
  ) {
    throw usageError({
      spec: opts.spec,
      command: "init",
      message:
        "Non-interactive init requires --yes or explicit values for: --workflow, --require-network-approval.",
    });
  }

  if (isInteractive) {
    const presetLines = Object.entries(setupProfilePresets).map(
      ([id, preset]) => `- ${id}: ${preset.description}`,
    );
    process.stdout.write(`${presetLines.join("\n")}\n\n`);
    setupProfilePreset =
      flags.setupProfile ??
      ((await askChoice(
        "Setup profile",
        ["light", "normal", "full-harness"],
        "normal",
      )) as SetupProfilePreset);

    const selectedPreset = setupProfilePresets[setupProfilePreset];
    setupProfile = selectedPreset.mode;
    hooks = flags.hooks ?? selectedPreset.defaultHooks;

    policyGateway =
      flags.policyGateway ??
      ((await askChoice(
        "Policy gateway",
        ["codex", "claude"],
        policyGateway,
      )) as PolicyGatewayFlavor);

    if (flags.strictUnsafeConfirm === undefined) {
      strictUnsafeConfirm = selectedPreset.defaultStrictUnsafeConfirm;
    }
    if (flags.requirePlanApproval === undefined) {
      requirePlanApproval = selectedPreset.defaultRequirePlanApproval;
    }
    if (flags.requireNetworkApproval === undefined) {
      requireNetworkApproval = selectedPreset.defaultRequireNetworkApproval;
    }
    if (flags.requireVerifyApproval === undefined) {
      requireVerifyApproval = selectedPreset.defaultRequireVerifyApproval;
    }
    if (!flags.executionProfile) {
      executionProfile = selectedPreset.defaultExecutionProfile;
    }

    const shouldPromptWorkflow = !flags.workflow && setupProfile === "full";
    const shouldPromptBackend = !flags.backend;

    ide = flags.ide ?? INIT_DEFAULTS.ide;
    if (shouldPromptWorkflow) {
      const choice = await askChoice("Workflow mode", ["direct", "branch_pr"], workflow);
      workflow = choice === "branch_pr" ? "branch_pr" : "direct";
    }
    if (workflow === "direct" && setupProfile === "full" && !flags.directCloseDirtyPolicy) {
      const choice = await askChoice(
        "Direct close dirt policy",
        ["allow-other-task-readmes", "strict"],
        directCloseDirtyPolicy === "strict" ? "strict" : "allow-other-task-readmes",
      );
      directCloseDirtyPolicy = choice === "strict" ? "strict" : "allow_other_task_readmes";
    }
    if (shouldPromptBackend) {
      const choice = await askChoice("Task backend", ["local", "redmine"], backend);
      backend = choice === "redmine" ? "redmine" : "local";
    }

    if (setupProfile === "full") {
      if (!flags.executionProfile) {
        executionProfile = (await askChoice(
          "Execution profile",
          ["conservative", "balanced", "aggressive"],
          executionProfile,
        )) as ExecutionProfile;
      }
      if (flags.strictUnsafeConfirm === undefined) {
        strictUnsafeConfirm = await askYesNo(
          "Require strict explicit confirmation for extra unsafe actions?",
          strictUnsafeConfirm,
        );
      }
      if (flags.requireNetworkApproval === undefined) {
        requireNetworkApproval = await askYesNo(
          "Require explicit approval for network actions?",
          requireNetworkApproval,
        );
      }
      if (!flags.recipes) {
        const cachedRecipes = await listCachedRecipes();
        process.stdout.write(`${renderCachedRecipesHint(cachedRecipes)}\n`);
        if (cachedRecipes.length === 0) {
          recipes = [];
        } else {
          const defaultRecipesLabel =
            selectedPreset.defaultRecipes.length > 0
              ? selectedPreset.defaultRecipes.join(", ")
              : "none";
          const answer = await askInput(
            `Materialize cached recipes (comma separated, or none) [default: ${defaultRecipesLabel}]: `,
          );
          const normalized = answer.trim().toLowerCase();
          if (normalized === "") {
            recipes = [...selectedPreset.defaultRecipes];
          } else if (normalized === "none") {
            recipes = [];
          } else {
            recipes = answer
              .split(",")
              .map((item) => item.trim())
              .filter(Boolean);
          }
        }
      }
    } else {
      recipes = flags.recipes ?? selectedPreset.defaultRecipes;
      requirePlanApproval = flags.requirePlanApproval ?? selectedPreset.defaultRequirePlanApproval;
      requireNetworkApproval =
        flags.requireNetworkApproval ?? selectedPreset.defaultRequireNetworkApproval;
      requireVerifyApproval =
        flags.requireVerifyApproval ?? selectedPreset.defaultRequireVerifyApproval;
      executionProfile = flags.executionProfile ?? selectedPreset.defaultExecutionProfile;
      strictUnsafeConfirm = flags.strictUnsafeConfirm ?? selectedPreset.defaultStrictUnsafeConfirm;
    }
  }

  if (flags.yes) {
    const yesPreset = setupProfilePresets[setupProfilePreset];
    ide = flags.ide ?? INIT_DEFAULTS.ide;
    policyGateway = flags.policyGateway ?? INIT_DEFAULTS.policyGateway;
    workflow = flags.workflow ?? INIT_DEFAULTS.workflow;
    directCloseDirtyPolicy = flags.directCloseDirtyPolicy ?? INIT_DEFAULTS.directCloseDirtyPolicy;
    backend = flags.backend ?? INIT_DEFAULTS.backend;
    hooks = flags.hooks ?? yesPreset.defaultHooks;
    recipes = flags.recipes ?? yesPreset.defaultRecipes;
    requirePlanApproval = flags.requirePlanApproval ?? yesPreset.defaultRequirePlanApproval;
    requireNetworkApproval =
      flags.requireNetworkApproval ?? yesPreset.defaultRequireNetworkApproval;
    requireVerifyApproval = flags.requireVerifyApproval ?? yesPreset.defaultRequireVerifyApproval;
    executionProfile = flags.executionProfile ?? yesPreset.defaultExecutionProfile;
    strictUnsafeConfirm = flags.strictUnsafeConfirm ?? yesPreset.defaultStrictUnsafeConfirm;
  }

  await validateCachedRecipesSelection(recipes);

  try {
    const initRoot = path.resolve(opts.rootOverride ?? opts.cwd);
    const baseBranchFallback = "main";
    const { gitRoot, gitRootExisted } = await ensureGitRoot({ initRoot, baseBranchFallback });
    const resolved = { gitRoot, agentplaneDir: path.join(gitRoot, ".agentplane") };
    const initBaseBranch = await resolveInitBaseBranchForInit({
      gitRoot: resolved.gitRoot,
      baseBranchFallback,
      isInteractive,
      workflow,
      gitRootExisted,
    });
    const configPath = path.join(resolved.agentplaneDir, "config.json");
    const localBackendPath = path.join(resolved.agentplaneDir, "backends", "local", "backend.json");
    const redmineBackendPath = path.join(
      resolved.agentplaneDir,
      "backends",
      "redmine",
      "backend.json",
    );
    const backendPath = backend === "redmine" ? redmineBackendPath : localBackendPath;
    const initDirs = [
      resolved.agentplaneDir,
      path.join(resolved.agentplaneDir, "tasks"),
      path.join(resolved.agentplaneDir, "agents"),
      path.join(resolved.agentplaneDir, "cache"),
      path.join(resolved.agentplaneDir, "backends"),
      path.join(resolved.agentplaneDir, "backends", backend),
    ];
    const initFiles = [configPath, backendPath];
    const initConflicts = await collectInitConflicts({ initDirs, initFiles });
    const gatewayPath = path.join(resolved.gitRoot, policyGatewayFileName(policyGateway));
    const agentsMissing = !(await fileExists(gatewayPath));
    if (initConflicts.length > 0 && agentsMissing) {
      await ensureAgentplaneDirs(resolved.agentplaneDir, backend);
      await ensureAgentsFiles({
        gitRoot: resolved.gitRoot,
        agentplaneDir: resolved.agentplaneDir,
        workflow,
        policyGateway,
        configPathAbs: configPath,
        backendPathAbs: backendPath,
      });
    }
    const hookConflicts = hooks
      ? await collectHooksInstallConflicts({
          gitRoot: resolved.gitRoot,
          agentplaneDir: resolved.agentplaneDir,
        })
      : [];
    const conflicts = [...new Set([...initConflicts, ...hookConflicts])];
    await handleInitConflicts({
      gitRoot: resolved.gitRoot,
      conflicts,
      backup: flags.backup === true,
      force: flags.force === true,
    });

    await ensureAgentplaneDirs(resolved.agentplaneDir, backend);
    const execution = buildExecutionProfile(executionProfile, { strictUnsafeConfirm });
    await writeInitConfig({
      agentplaneDir: resolved.agentplaneDir,
      gitRoot: resolved.gitRoot,
      workflow,
      directCloseDirtyPolicy,
      backendConfigPathAbs: backendPath,
      requirePlanApproval,
      requireNetworkApproval,
      requireVerifyApproval,
      execution,
    });
    await writeBackendStubs({ backend, backendPath });
    if (backend === "redmine") {
      await ensureInitRedmineEnvTemplate({ gitRoot: resolved.gitRoot });
    }

    const { installPaths } = await ensureAgentsFiles({
      gitRoot: resolved.gitRoot,
      agentplaneDir: resolved.agentplaneDir,
      workflow,
      policyGateway,
      configPathAbs: configPath,
      backendPathAbs: backendPath,
    });
    if (backend === "redmine") {
      installPaths.push(".env.example");
    }

    await ensureInitGitignore({
      gitRoot: resolved.gitRoot,
      includeAgentPromptFiles: flags.gitignoreAgents === true,
    });
    installPaths.push(".gitignore");

    const workflowInit = await ensureInitWorkflow({
      gitRoot: resolved.gitRoot,
      workflowMode: workflow,
      approvals: {
        requirePlanApproval,
        requireVerifyApproval,
        requireNetworkApproval,
      },
    });
    for (const abs of workflowInit.installPaths) {
      installPaths.push(path.relative(resolved.gitRoot, abs));
    }

    if (flags.gitignoreAgents) {
      await setPinnedBaseBranch({
        cwd: resolved.gitRoot,
        rootOverride: resolved.gitRoot,
        value: initBaseBranch,
      });
    }

    if (hooks) {
      await cmdHooksInstall({ cwd: opts.cwd, rootOverride: opts.rootOverride, quiet: true });
      installPaths.push(".agentplane/bin/agentplane");
    }

    const ideRes = await maybeSyncIde({
      cwd: opts.cwd,
      rootOverride: opts.rootOverride,
      ide,
      gitRoot: resolved.gitRoot,
    });
    installPaths.push(...ideRes.installPaths);

    await maybeAddCachedRecipes({
      recipes,
      cwd: opts.cwd,
      rootOverride: opts.rootOverride,
    });

    if (!flags.gitignoreAgents) {
      await ensureInitCommit({
        gitRoot: resolved.gitRoot,
        baseBranch: initBaseBranch,
        installPaths,
        version: getVersion(),
        skipHooks: true,
      });
    }

    process.stdout.write(`${path.relative(resolved.gitRoot, resolved.agentplaneDir)}\n`);
    return 0;
  } catch (err) {
    if (err instanceof CliError) throw err;
    throw mapCoreError(err, { command: "init", root: opts.rootOverride ?? null });
  }
}
