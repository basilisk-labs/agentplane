import path from "node:path";

import type { WorkflowMode } from "../../../agents/agents-template.js";
import { mapCoreError } from "../../error-map.js";
import { promptChoice, promptInput, promptYesNo } from "../../prompts.js";
import { invalidValueForFlag } from "../../output.js";
import {
  renderBundledRecipesHint,
  validateBundledRecipesSelection,
} from "../../recipes-bundled.js";
import { usageError } from "../../spec/errors.js";
import type { CommandHandler, CommandSpec } from "../../spec/spec.js";
import { CliError } from "../../../shared/errors.js";
import { getVersion } from "../../../meta/version.js";
import { cmdHooksInstall, ensureInitCommit } from "../../../commands/workflow.js";
import {
  buildExecutionProfile,
  setPinnedBaseBranch,
  type ExecutionProfile,
} from "@agentplaneorg/core";

import { resolveInitBaseBranchForInit } from "./init/base-branch.js";
import { collectInitConflicts, handleInitConflicts } from "./init/conflicts.js";
import { ensureGitRoot } from "./init/git.js";
import { maybeSyncIde } from "./init/ide-sync.js";
import { maybeInstallBundledRecipes } from "./init/recipes.js";
import { ensureInitWorkflow } from "./init/write-workflow.js";
import { ensureAgentplaneDirs, writeBackendStubs, writeInitConfig } from "./init/write-config.js";
import { ensureAgentsFiles } from "./init/write-agents.js";
import { ensureInitGitignore } from "./init/write-gitignore.js";
import { ensureInitRedmineEnvTemplate } from "./init/write-env.js";
import { renderInitSection, renderInitWelcome } from "./init/ui.js";
import { fileExists } from "../../fs-utils.js";
import type { PolicyGatewayFlavor } from "../../../shared/policy-gateway.js";
import { policyGatewayFileName } from "../../../shared/policy-gateway.js";

type InitFlags = {
  setupProfile?: SetupProfilePreset;
  policyGateway?: PolicyGatewayFlavor;
  ide?: "codex" | "cursor" | "windsurf";
  workflow?: "direct" | "branch_pr";
  backend?: "local" | "redmine";
  hooks?: boolean;
  gitignoreAgents?: boolean;
  requirePlanApproval?: boolean;
  requireNetworkApproval?: boolean;
  requireVerifyApproval?: boolean;
  executionProfile?: ExecutionProfile;
  strictUnsafeConfirm?: boolean;
  recipes?: string[];
  force?: boolean;
  backup?: boolean;
  yes: boolean;
};

type SetupProfilePreset = "light" | "normal" | "full-harness";

const setupProfilePresets: Record<
  SetupProfilePreset,
  {
    mode: "compact" | "full";
    description: string;
    defaultHooks: boolean;
    defaultStrictUnsafeConfirm: boolean;
    defaultRequirePlanApproval: boolean;
    defaultRequireNetworkApproval: boolean;
    defaultRequireVerifyApproval: boolean;
    defaultExecutionProfile: ExecutionProfile;
    defaultRecipes: string[];
  }
> = {
  light: {
    mode: "compact",
    description: "Light profile (maximum flexibility, minimal enforcement, hooks disabled).",
    defaultHooks: false,
    defaultStrictUnsafeConfirm: false,
    defaultRequirePlanApproval: false,
    defaultRequireNetworkApproval: false,
    defaultRequireVerifyApproval: false,
    defaultExecutionProfile: "aggressive",
    defaultRecipes: [],
  },
  normal: {
    mode: "compact",
    description:
      "Normal profile (balanced defaults and approvals enabled for standard team workflows; hooks enabled).",
    defaultHooks: true,
    defaultStrictUnsafeConfirm: false,
    defaultRequirePlanApproval: true,
    defaultRequireNetworkApproval: true,
    defaultRequireVerifyApproval: true,
    defaultExecutionProfile: "balanced",
    defaultRecipes: [],
  },
  "full-harness": {
    mode: "full",
    description:
      "Full Harness profile (strict guardrails, explicit confirmations, conservative execution; hooks enabled).",
    defaultHooks: true,
    defaultStrictUnsafeConfirm: true,
    defaultRequirePlanApproval: true,
    defaultRequireNetworkApproval: true,
    defaultRequireVerifyApproval: true,
    defaultExecutionProfile: "conservative",
    defaultRecipes: [],
  },
};

function parseBooleanValueForInit(flag: string, value: string): boolean {
  const normalized = value.trim().toLowerCase();
  if (["1", "true", "yes", "y", "on"].includes(normalized)) return true;
  if (["0", "false", "no", "n", "off"].includes(normalized)) return false;
  throw usageError({
    spec: initSpec,
    command: "init",
    message: invalidValueForFlag(flag, value, "true|false"),
  });
}

function parseRecipesSelectionForInit(value: string): string[] {
  const normalized = value.trim().toLowerCase();
  if (normalized === "none" || normalized === "") return [];
  return value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

function normalizeSetupProfile(raw: string | undefined): InitFlags["setupProfile"] {
  if (!raw) return undefined;
  const value = raw.trim().toLowerCase();
  if (value === "developer") return "full-harness";
  if (value === "enterprise") return "full-harness";
  if (value === "manager") return "normal";
  if (value === "vibecoder") return "light";
  if (value === "light" || value === "normal" || value === "full-harness") return value;
  return undefined;
}

type InitParsed = Omit<InitFlags, "yes"> & { yes: boolean };

export const initSpec: CommandSpec<InitParsed> = {
  id: ["init"],
  group: "Setup",
  summary: "Initialize agentplane project files under .agentplane/.",
  description:
    "Creates .agentplane/ config, backend stubs, and agent templates in the target directory. If the target directory is not a git repository, it initializes one and (by default) writes an initial install commit. Use --gitignore-agents to keep agent templates local (gitignored) and skip the install commit. In interactive mode it prompts for missing inputs; use --yes for non-interactive mode.",
  options: [
    {
      kind: "string",
      name: "setup-profile",
      valueHint: "<light|normal|full-harness>",
      choices: [
        "light",
        "normal",
        "full-harness",
        "developer",
        "vibecoder",
        "manager",
        "enterprise",
      ],
      description: "Setup profile preset. Preferred values: light, normal, full-harness.",
    },
    {
      kind: "string",
      name: "policy-gateway",
      valueHint: "<codex|claude>",
      choices: ["codex", "claude"],
      coerce: (raw) => raw.trim().toLowerCase(),
      description: "Policy gateway file to install (codex -> AGENTS.md, claude -> CLAUDE.md).",
    },
    {
      kind: "string",
      name: "ide",
      valueHint: "<codex|cursor|windsurf>",
      choices: ["codex", "cursor", "windsurf"],
      coerce: (raw) => raw.trim().toLowerCase(),
      description: "IDE rules integration target (default: codex).",
    },
    {
      kind: "string",
      name: "workflow",
      valueHint: "<direct|branch_pr>",
      choices: ["direct", "branch_pr"],
      description: "Workflow mode (default: direct).",
    },
    {
      kind: "string",
      name: "backend",
      valueHint: "<local|redmine>",
      choices: ["local", "redmine"],
      coerce: (raw) => raw.trim().toLowerCase(),
      description: "Task backend (default: local).",
    },
    {
      kind: "string",
      name: "hooks",
      valueHint: "<true|false>",
      description:
        "Install managed git hooks (default by setup profile: light=false, normal/full-harness=true).",
    },
    {
      kind: "string",
      name: "require-plan-approval",
      valueHint: "<true|false>",
      description: "Require explicit plan approval before starting work.",
    },
    {
      kind: "string",
      name: "require-network-approval",
      valueHint: "<true|false>",
      description: "Require explicit approval before any network operation.",
    },
    {
      kind: "string",
      name: "require-verify-approval",
      valueHint: "<true|false>",
      description: "Require explicit approval before recording verification.",
    },
    {
      kind: "string",
      name: "execution-profile",
      valueHint: "<conservative|balanced|aggressive>",
      choices: ["conservative", "balanced", "aggressive"],
      description: "Execution profile preset controlling autonomy, reasoning, and tool budgets.",
    },
    {
      kind: "string",
      name: "strict-unsafe-confirm",
      valueHint: "<true|false>",
      description: "Require strict explicit confirmations for additional unsafe actions.",
    },
    {
      kind: "string",
      name: "recipes",
      valueHint: "<none|id1,id2,...>",
      description: "Optional bundled recipes selection (comma-separated), or 'none'.",
    },
    {
      kind: "boolean",
      name: "force",
      default: false,
      description: "Overwrite init conflicts by deleting existing paths.",
    },
    {
      kind: "boolean",
      name: "backup",
      default: false,
      description: "Backup init conflicts before overwriting.",
    },
    {
      kind: "boolean",
      name: "yes",
      default: false,
      description: "Non-interactive mode (do not prompt; use defaults for missing flags).",
    },
    {
      kind: "boolean",
      name: "gitignore-agents",
      default: false,
      description:
        "Add gateway/agent files (AGENTS.md or CLAUDE.md and .agentplane/agents/) to .gitignore and skip the initial install commit.",
    },
  ],
  examples: [
    { cmd: "agentplane init", why: "Interactive setup (prompts for missing values)." },
    {
      cmd: "agentplane init --setup-profile light --yes",
      why: "Non-interactive setup with flexible defaults.",
    },
    {
      cmd: "agentplane init --workflow direct --backend local --hooks true --require-network-approval true --yes",
      why: "Non-interactive setup with profile defaults plus an explicit network-approval override.",
    },
    {
      cmd: "agentplane init --force --yes",
      why: "Re-initialize, overwriting conflicts (non-interactive).",
    },
    {
      cmd: "agentplane init --yes --gitignore-agents",
      why: "Initialize without committing and keep agent prompts/templates local (gitignored).",
    },
  ],
  validateRaw: (raw) => {
    if (raw.extra.length > 0) {
      throw usageError({
        spec: initSpec,
        command: "init",
        message: `Unexpected argument: ${raw.extra[0]}`,
      });
    }
  },
  parse: (raw) => {
    const hooksRaw = raw.opts.hooks as string | undefined;
    const requirePlanRaw = raw.opts["require-plan-approval"] as string | undefined;
    const requireNetworkRaw = raw.opts["require-network-approval"] as string | undefined;
    const requireVerifyRaw = raw.opts["require-verify-approval"] as string | undefined;
    const recipesRaw = raw.opts.recipes as string | undefined;

    return {
      setupProfile: normalizeSetupProfile(raw.opts["setup-profile"] as string | undefined),
      policyGateway: raw.opts["policy-gateway"] as InitFlags["policyGateway"],
      ide: raw.opts.ide as InitFlags["ide"],
      workflow: raw.opts.workflow as InitFlags["workflow"],
      backend: raw.opts.backend as InitFlags["backend"],
      hooks: hooksRaw === undefined ? undefined : parseBooleanValueForInit("--hooks", hooksRaw),
      requirePlanApproval:
        requirePlanRaw === undefined
          ? undefined
          : parseBooleanValueForInit("--require-plan-approval", requirePlanRaw),
      requireNetworkApproval:
        requireNetworkRaw === undefined
          ? undefined
          : parseBooleanValueForInit("--require-network-approval", requireNetworkRaw),
      requireVerifyApproval:
        requireVerifyRaw === undefined
          ? undefined
          : parseBooleanValueForInit("--require-verify-approval", requireVerifyRaw),
      executionProfile: raw.opts["execution-profile"] as InitFlags["executionProfile"],
      strictUnsafeConfirm:
        (raw.opts["strict-unsafe-confirm"] as string | undefined) === undefined
          ? undefined
          : parseBooleanValueForInit(
              "--strict-unsafe-confirm",
              String(raw.opts["strict-unsafe-confirm"]),
            ),
      recipes: recipesRaw === undefined ? undefined : parseRecipesSelectionForInit(recipesRaw),
      force: raw.opts.force === true,
      backup: raw.opts.backup === true,
      yes: raw.opts.yes === true,
      gitignoreAgents: raw.opts["gitignore-agents"] === true,
    };
  },
  validate: (p) => {
    if (p.force && p.backup) {
      throw usageError({
        spec: initSpec,
        command: "init",
        message: "Use either --force or --backup (not both).",
      });
    }
  },
};

export const runInit: CommandHandler<InitParsed> = (ctx, flags) =>
  cmdInit({ cwd: ctx.cwd, rootOverride: ctx.rootOverride, flags });

async function cmdInit(opts: {
  cwd: string;
  rootOverride?: string;
  flags: InitParsed;
}): Promise<number> {
  const flags = opts.flags;
  type InitIde = NonNullable<InitFlags["ide"]>;
  const defaults: {
    policyGateway: PolicyGatewayFlavor;
    ide: InitIde;
    workflow: WorkflowMode;
    backend: NonNullable<InitFlags["backend"]>;
    hooks: boolean;
    recipes: string[];
    requirePlanApproval: boolean;
    requireNetworkApproval: boolean;
    requireVerifyApproval: boolean;
    executionProfile: ExecutionProfile;
    strictUnsafeConfirm: boolean;
  } = {
    policyGateway: "codex",
    ide: "codex",
    workflow: "direct",
    backend: "local",
    hooks: true,
    recipes: [],
    requirePlanApproval: true,
    requireNetworkApproval: true,
    requireVerifyApproval: true,
    executionProfile: "balanced",
    strictUnsafeConfirm: false,
  };
  let ide: InitIde = flags.ide ?? defaults.ide;
  let policyGateway: PolicyGatewayFlavor = flags.policyGateway ?? defaults.policyGateway;
  let workflow: WorkflowMode = flags.workflow ?? defaults.workflow;
  let backend: NonNullable<InitFlags["backend"]> = flags.backend ?? defaults.backend;
  let hooks = flags.hooks ?? defaults.hooks;
  let recipes = flags.recipes ?? defaults.recipes;
  let requirePlanApproval = flags.requirePlanApproval ?? defaults.requirePlanApproval;
  let requireNetworkApproval = flags.requireNetworkApproval ?? defaults.requireNetworkApproval;
  let requireVerifyApproval = flags.requireVerifyApproval ?? defaults.requireVerifyApproval;
  let executionProfile = flags.executionProfile ?? defaults.executionProfile;
  let strictUnsafeConfirm = flags.strictUnsafeConfirm ?? defaults.strictUnsafeConfirm;
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
      spec: initSpec,
      command: "init",
      message:
        "Non-interactive init requires --yes or explicit values for: --workflow, --require-network-approval.",
    });
  }

  if (isInteractive) {
    const askChoice = async (
      label: string,
      choices: string[],
      defaultValue: string,
    ): Promise<string> => {
      const result = await promptChoice(`\n${label}`, choices, defaultValue);
      process.stdout.write("\n");
      return result;
    };
    const askYesNo = async (label: string, defaultValue: boolean): Promise<boolean> => {
      const result = await promptYesNo(`\n${label}`, defaultValue);
      process.stdout.write("\n");
      return result;
    };
    const askInput = async (label: string): Promise<string> => {
      const result = await promptInput(`\n${label}`);
      process.stdout.write("\n");
      return result;
    };

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
    if (flags.setupProfile) {
      setupProfilePreset = flags.setupProfile;
    } else {
      const selected = await askChoice(
        "Setup profile",
        ["light", "normal", "full-harness"],
        "normal",
      );
      setupProfilePreset = selected as SetupProfilePreset;
    }
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

    ide = flags.ide ?? defaults.ide;
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
          "Optional: install recipe packs now (comma-separated IDs) or choose none.",
        ),
      );
      if (!flags.recipes) {
        process.stdout.write(`${renderBundledRecipesHint()}\n`);
        const defaultRecipesLabel =
          selectedPreset.defaultRecipes.length > 0
            ? selectedPreset.defaultRecipes.join(", ")
            : "none";
        const answer = await askInput(
          `Install optional recipes (comma separated, or none) [default: ${defaultRecipesLabel}]: `,
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
          `Using compact ${setupProfilePreset} defaults for approvals, execution profile, and recipes. Hooks: ${hooks ? "enabled" : "disabled"}.`,
        ),
      );
    }
  }

  if (flags.yes) {
    const yesPreset = setupProfilePresets[setupProfilePreset];
    ide = flags.ide ?? defaults.ide;
    policyGateway = flags.policyGateway ?? defaults.policyGateway;
    workflow = flags.workflow ?? defaults.workflow;
    backend = flags.backend ?? defaults.backend;
    hooks = flags.hooks ?? yesPreset.defaultHooks;
    recipes = flags.recipes ?? yesPreset.defaultRecipes;
    requirePlanApproval = flags.requirePlanApproval ?? yesPreset.defaultRequirePlanApproval;
    requireNetworkApproval =
      flags.requireNetworkApproval ?? yesPreset.defaultRequireNetworkApproval;
    requireVerifyApproval = flags.requireVerifyApproval ?? yesPreset.defaultRequireVerifyApproval;
    executionProfile = flags.executionProfile ?? yesPreset.defaultExecutionProfile;
    strictUnsafeConfirm = flags.strictUnsafeConfirm ?? yesPreset.defaultStrictUnsafeConfirm;
  }

  validateBundledRecipesSelection(recipes);

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
      // Recovery path: if a repo already contains conflicting .agentplane config/backend files,
      // still materialize missing policy/agent templates before reporting conflicts.
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

    await maybeInstallBundledRecipes({
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
