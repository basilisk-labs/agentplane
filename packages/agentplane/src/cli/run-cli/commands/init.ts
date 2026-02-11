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
import { setPinnedBaseBranch } from "@agentplaneorg/core";

import { resolveInitBaseBranchForInit } from "./init/base-branch.js";
import { collectInitConflicts, handleInitConflicts } from "./init/conflicts.js";
import { ensureGitRoot } from "./init/git.js";
import { maybeSyncIde } from "./init/ide-sync.js";
import { maybeInstallBundledRecipes } from "./init/recipes.js";
import {
  ensureAgentplaneDirs,
  type InitExecutionConfig,
  writeBackendStubs,
  writeInitConfig,
} from "./init/write-config.js";
import { ensureAgentsFiles } from "./init/write-agents.js";
import { ensureInitGitignore } from "./init/write-gitignore.js";
import { ensureInitRedmineEnvTemplate } from "./init/write-env.js";
import { renderInitSection, renderInitWelcome } from "./init/ui.js";

type ExecutionProfile = "conservative" | "balanced" | "aggressive";

function buildInitExecutionProfile(
  profile: ExecutionProfile,
  opts?: { strictUnsafeConfirm?: boolean },
): InitExecutionConfig {
  const shared = {
    stop_conditions: [
      "Missing required input blocks correctness.",
      "Requested action expands scope or risk beyond approved plan.",
      "Verification fails and remediation changes scope.",
    ],
    handoff_conditions: [
      "Role boundary reached (for example CODER -> TESTER/REVIEWER).",
      "Task depends_on prerequisites are incomplete.",
      "Specialized agent is required.",
    ],
  };
  const byProfile: Record<ExecutionProfile, InitExecutionConfig> = {
    conservative: {
      profile: "conservative",
      reasoning_effort: "high",
      tool_budget: { discovery: 4, implementation: 8, verification: 8 },
      ...shared,
      unsafe_actions_requiring_explicit_user_ok: [
        "Destructive git history operations.",
        "Outside-repo read/write.",
        "Credential, keychain, or SSH material changes.",
        "Network actions when approvals are enabled.",
      ],
    },
    balanced: {
      profile: "balanced",
      reasoning_effort: "medium",
      tool_budget: { discovery: 6, implementation: 10, verification: 6 },
      ...shared,
      unsafe_actions_requiring_explicit_user_ok: [
        "Destructive git history operations.",
        "Outside-repo read/write.",
        "Credential, keychain, or SSH material changes.",
      ],
    },
    aggressive: {
      profile: "aggressive",
      reasoning_effort: "low",
      tool_budget: { discovery: 10, implementation: 16, verification: 8 },
      stop_conditions: [
        "Requested action expands scope or risk beyond approved plan.",
        "Verification fails and remediation changes scope.",
      ],
      handoff_conditions: [
        "Role boundary reached (for example CODER -> TESTER/REVIEWER).",
        "Specialized agent is required.",
      ],
      unsafe_actions_requiring_explicit_user_ok: [
        "Destructive git history operations.",
        "Outside-repo read/write.",
        "Credential, keychain, or SSH material changes.",
      ],
    },
  };
  const resolved = structuredClone(byProfile[profile]);
  if (opts?.strictUnsafeConfirm === true) {
    const extra = "Network actions when approvals are disabled.";
    if (!resolved.unsafe_actions_requiring_explicit_user_ok.includes(extra)) {
      resolved.unsafe_actions_requiring_explicit_user_ok.push(extra);
    }
  }
  return resolved;
}

type InitFlags = {
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
      description: "Install git hooks (non-interactive requires an explicit value).",
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
        "Add agent files (AGENTS.md and .agentplane/agents/) to .gitignore and skip the initial install commit.",
    },
  ],
  examples: [
    { cmd: "agentplane init", why: "Interactive setup (prompts for missing values)." },
    {
      cmd: "agentplane init --workflow direct --backend local --hooks false --require-plan-approval true --require-network-approval true --require-verify-approval true --yes",
      why: "Non-interactive setup with explicit policy flags.",
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
    ide: "codex",
    workflow: "direct",
    backend: "local",
    hooks: false,
    recipes: [],
    requirePlanApproval: true,
    requireNetworkApproval: true,
    requireVerifyApproval: true,
    executionProfile: "balanced",
    strictUnsafeConfirm: false,
  };
  let ide: InitIde = flags.ide ?? defaults.ide;
  let workflow: WorkflowMode = flags.workflow ?? defaults.workflow;
  let backend: NonNullable<InitFlags["backend"]> = flags.backend ?? defaults.backend;
  let hooks = flags.hooks ?? defaults.hooks;
  let recipes = flags.recipes ?? defaults.recipes;
  let requirePlanApproval = flags.requirePlanApproval ?? defaults.requirePlanApproval;
  let requireNetworkApproval = flags.requireNetworkApproval ?? defaults.requireNetworkApproval;
  let requireVerifyApproval = flags.requireVerifyApproval ?? defaults.requireVerifyApproval;
  let executionProfile = flags.executionProfile ?? defaults.executionProfile;
  let strictUnsafeConfirm = flags.strictUnsafeConfirm ?? defaults.strictUnsafeConfirm;
  const isInteractive = process.stdin.isTTY && !flags.yes;

  if (
    !process.stdin.isTTY &&
    !flags.yes &&
    (!flags.workflow ||
      flags.hooks === undefined ||
      flags.requirePlanApproval === undefined ||
      flags.requireNetworkApproval === undefined ||
      flags.requireVerifyApproval === undefined)
  ) {
    throw usageError({
      spec: initSpec,
      command: "init",
      message:
        "Non-interactive init requires --yes or explicit values for: --workflow, --hooks, --require-plan-approval, --require-network-approval, --require-verify-approval.",
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
    process.stdout.write(
      renderInitSection(
        "Workflow",
        "Choose how branches/backends/approvals should be initialized for this repository.",
      ),
    );
    ide = flags.ide ?? defaults.ide;
    if (!flags.workflow) {
      const choice = await askChoice("Workflow mode", ["direct", "branch_pr"], workflow);
      workflow = choice === "branch_pr" ? "branch_pr" : "direct";
    }
    if (!flags.backend) {
      const choice = await askChoice("Task backend", ["local", "redmine"], backend);
      backend = choice === "redmine" ? "redmine" : "local";
    }
    if (flags.hooks === undefined) {
      hooks = await askYesNo("Install managed git hooks now?", hooks);
    }
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
        "Approvals",
        "Control whether plan/network/verification actions require explicit approval by default.",
      ),
    );
    if (flags.requirePlanApproval === undefined) {
      requirePlanApproval = await askYesNo(
        "Require plan approval before work starts?",
        requirePlanApproval,
      );
    }
    if (flags.requireNetworkApproval === undefined) {
      requireNetworkApproval = await askYesNo(
        "Require explicit approval for network actions?",
        requireNetworkApproval,
      );
    }
    if (flags.requireVerifyApproval === undefined) {
      requireVerifyApproval = await askYesNo(
        "Require explicit approval before recording verification?",
        requireVerifyApproval,
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
      const answer = await askInput("Install optional recipes (comma separated, or none): ");
      recipes = answer
        ? answer
            .split(",")
            .map((item) => item.trim())
            .filter(Boolean)
        : [];
    }
  }

  if (flags.yes) {
    ide = flags.ide ?? defaults.ide;
    workflow = flags.workflow ?? defaults.workflow;
    backend = flags.backend ?? defaults.backend;
    hooks = flags.hooks ?? defaults.hooks;
    recipes = flags.recipes ?? defaults.recipes;
    requirePlanApproval = flags.requirePlanApproval ?? defaults.requirePlanApproval;
    requireNetworkApproval = flags.requireNetworkApproval ?? defaults.requireNetworkApproval;
    requireVerifyApproval = flags.requireVerifyApproval ?? defaults.requireVerifyApproval;
    executionProfile = flags.executionProfile ?? defaults.executionProfile;
    strictUnsafeConfirm = flags.strictUnsafeConfirm ?? defaults.strictUnsafeConfirm;
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
    await handleInitConflicts({
      gitRoot: resolved.gitRoot,
      conflicts,
      backup: flags.backup === true,
      force: flags.force === true,
    });

    await ensureAgentplaneDirs(resolved.agentplaneDir, backend);
    const execution = buildInitExecutionProfile(executionProfile, { strictUnsafeConfirm });
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
      configPathAbs: configPath,
      backendPathAbs: backendPath,
    });

    await ensureInitGitignore({
      gitRoot: resolved.gitRoot,
      includeAgentPromptFiles: flags.gitignoreAgents === true,
    });
    installPaths.push(".gitignore");

    if (flags.gitignoreAgents) {
      await setPinnedBaseBranch({
        cwd: resolved.gitRoot,
        rootOverride: resolved.gitRoot,
        value: initBaseBranch,
      });
    }

    if (hooks) {
      await cmdHooksInstall({ cwd: opts.cwd, rootOverride: opts.rootOverride, quiet: true });
    }

    const ideRes = await maybeSyncIde({
      cwd: opts.cwd,
      rootOverride: opts.rootOverride,
      ide,
      gitRoot: resolved.gitRoot,
    });
    installPaths.push(...ideRes.installPaths);

    maybeInstallBundledRecipes(recipes);

    if (!flags.gitignoreAgents) {
      await ensureInitCommit({
        gitRoot: resolved.gitRoot,
        baseBranch: initBaseBranch,
        installPaths,
        version: getVersion(),
        skipHooks: hooks,
      });
    }

    process.stdout.write(`${path.relative(resolved.gitRoot, resolved.agentplaneDir)}\n`);
    return 0;
  } catch (err) {
    if (err instanceof CliError) throw err;
    throw mapCoreError(err, { command: "init", root: opts.rootOverride ?? null });
  }
}
