import path from "node:path";
import type { ExecutionProfile } from "@agentplaneorg/core";
import { buildExecutionProfile } from "@agentplaneorg/core";
import { setPinnedBaseBranch } from "@agentplaneorg/core/git";

import type { WorkflowMode } from "../../../../agents/agents-template.js";
import { cmdHooksInstall, ensureInitCommit } from "../../../../commands/workflow.js";
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
import { renderInitSection, renderInitWelcome } from "./ui.js";
import { cmdInitV2 } from "./orchestrate-v2.js";

function shouldUseExperimentalInitV2(flags: InitParsed): boolean {
  return flags.experimentalUi === true || process.env.AGENTPLANE_INIT_UI === "v2";
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
  if (shouldUseExperimentalInitV2(flags)) {
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
    process.stdout.write(renderInitWelcome());
    const presetLines = Object.entries(setupProfilePresets).map(
      ([id, preset]) => `- ${id}: ${preset.description}`,
    );
    process.stdout.write(
      renderInitSection(
        "Setup Profile",
        "Pick one of three setup profiles. This controls policy strictness and questionnaire depth.",
      ),
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

    if (flags.policyGateway) {
      policyGateway = flags.policyGateway;
    } else {
      process.stdout.write(
        renderInitSection(
          "Policy Gateway",
          "Choose which root policy gateway file to install for your primary agent runtime.",
        ),
      );
      policyGateway = (await askChoice(
        "Policy gateway",
        ["codex", "claude"],
        policyGateway,
      )) as PolicyGatewayFlavor;
    }

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
      process.stdout.write(
        renderInitSection(
          "Workflow",
          "Choose how this repository will be orchestrated: direct means one branch, branch_pr means PR-first tasks.",
        ),
      );
      const choice = await askChoice("Workflow mode", ["direct", "branch_pr"], workflow);
      workflow = choice === "branch_pr" ? "branch_pr" : "direct";
    }
    if (workflow === "direct" && setupProfile === "full" && !flags.directCloseDirtyPolicy) {
      process.stdout.write(
        renderInitSection(
          "Direct Close Dirt Policy",
          "Choose how direct close commits handle unrelated tracked dirt. The tolerant mode ignores only README changes from other active tasks; strict mode blocks on any unrelated tracked change.",
        ),
      );
      const choice = await askChoice(
        "Direct close dirt policy",
        ["allow-other-task-readmes", "strict"],
        directCloseDirtyPolicy === "strict" ? "strict" : "allow-other-task-readmes",
      );
      directCloseDirtyPolicy = choice === "strict" ? "strict" : "allow_other_task_readmes";
    }
    if (shouldPromptBackend) {
      if (shouldPromptWorkflow || setupProfile === "full") {
        process.stdout.write(
          renderInitSection("Task Backend", "Choose where task data is stored and managed."),
        );
      }
      const choice = await askChoice("Task backend", ["local", "redmine"], backend);
      backend = choice === "redmine" ? "redmine" : "local";
    }

    if (setupProfile === "full") {
      process.stdout.write(
        renderInitSection(
          "Hooks",
          hooks
            ? "Managed git hooks are enabled and will be installed automatically."
            : "Managed git hooks are disabled by profile/flag and will not be installed.",
        ),
      );
      process.stdout.write(
        renderInitSection(
          "Execution Profile",
          "Set default autonomy/effort for agents. You can change this later in config.",
        ),
      );
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
      process.stdout.write(
        renderInitSection(
          "Network Approval",
          "Control whether network actions require explicit approval by default. Plan and verification approvals follow the selected setup profile unless you override them with explicit flags.",
        ),
      );
      if (flags.requireNetworkApproval === undefined) {
        requireNetworkApproval = await askYesNo(
          "Require explicit approval for network actions?",
          requireNetworkApproval,
        );
      }
      process.stdout.write(
        renderInitSection(
          "Recipes",
          "Optional: materialize cached recipes now (comma-separated IDs) or choose none.",
        ),
      );
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
      process.stdout.write(
        renderInitSection(
          "Defaults Applied",
          `Using compact ${setupProfilePreset} defaults for approvals, execution profile, and cached recipe selection. Hooks: ${hooks ? "enabled" : "disabled"}.`,
        ),
      );
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
    const conflicts = await collectInitConflicts({ initDirs, initFiles });
    const gatewayPath = path.join(resolved.gitRoot, policyGatewayFileName(policyGateway));
    const agentsMissing = !(await fileExists(gatewayPath));
    if (conflicts.length > 0 && agentsMissing) {
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
