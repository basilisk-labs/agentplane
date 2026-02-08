import { mkdir, rm } from "node:fs/promises";
import path from "node:path";

import {
  atomicWriteFile,
  defaultConfig,
  findGitRoot,
  resolveProject,
  saveConfig,
  setByDottedKey,
} from "@agentplaneorg/core";

import type { WorkflowMode } from "../../../agents/agents-template.js";
import {
  filterAgentsByWorkflow,
  loadAgentTemplates,
  loadAgentsTemplate,
} from "../../../agents/agents-template.js";
import { mapCoreError } from "../../error-map.js";
import { backupPath, fileExists, getPathKind } from "../../fs-utils.js";
import { promptChoice, promptInput, promptYesNo } from "../../prompts.js";
import { infoMessage, invalidValueForFlag } from "../../output.js";
import {
  listBundledRecipes,
  renderBundledRecipesHint,
  validateBundledRecipesSelection,
} from "../../recipes-bundled.js";
import { usageError } from "../../../cli2/errors.js";
import type { CommandHandler, CommandSpec } from "../../../cli2/spec.js";
import { CliError } from "../../../shared/errors.js";
import { writeJsonStableIfChanged } from "../../../shared/write-if-changed.js";
import { getVersion } from "../../../meta/version.js";
import {
  cmdHooksInstall,
  ensureInitCommit,
  gitInitRepo,
  promptInitBaseBranch,
  resolveInitBaseBranch,
} from "../../../commands/workflow.js";

import { cmdIdeSync } from "./ide.js";

type InitFlags = {
  ide?: "codex" | "cursor" | "windsurf";
  workflow?: "direct" | "branch_pr";
  backend?: "local" | "redmine";
  hooks?: boolean;
  requirePlanApproval?: boolean;
  requireNetworkApproval?: boolean;
  requireVerifyApproval?: boolean;
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
    "Creates .agentplane/ config, backend stubs, and agent templates. In interactive mode it prompts for missing inputs; use --yes for non-interactive mode.",
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
      recipes: recipesRaw === undefined ? undefined : parseRecipesSelectionForInit(recipesRaw),
      force: raw.opts.force === true,
      backup: raw.opts.backup === true,
      yes: raw.opts.yes === true,
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
  } = {
    ide: "codex",
    workflow: "direct",
    backend: "local",
    hooks: false,
    recipes: [],
    requirePlanApproval: true,
    requireNetworkApproval: true,
    requireVerifyApproval: true,
  };
  let ide: InitIde = flags.ide ?? defaults.ide;
  let workflow: WorkflowMode = flags.workflow ?? defaults.workflow;
  let backend: NonNullable<InitFlags["backend"]> = flags.backend ?? defaults.backend;
  let hooks = flags.hooks ?? defaults.hooks;
  let recipes = flags.recipes ?? defaults.recipes;
  let requirePlanApproval = flags.requirePlanApproval ?? defaults.requirePlanApproval;
  let requireNetworkApproval = flags.requireNetworkApproval ?? defaults.requireNetworkApproval;
  let requireVerifyApproval = flags.requireVerifyApproval ?? defaults.requireVerifyApproval;
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
    ide = flags.ide ?? defaults.ide;
    if (!flags.workflow) {
      const choice = await promptChoice("Select workflow mode", ["direct", "branch_pr"], workflow);
      workflow = choice === "branch_pr" ? "branch_pr" : "direct";
    }
    if (!flags.backend) {
      const choice = await promptChoice("Select task backend", ["local", "redmine"], backend);
      backend = choice === "redmine" ? "redmine" : "local";
    }
    if (flags.hooks === undefined) {
      hooks = await promptYesNo("Install git hooks?", hooks);
    }
    if (flags.requirePlanApproval === undefined) {
      requirePlanApproval = await promptYesNo("Require plan approval?", requirePlanApproval);
    }
    if (flags.requireNetworkApproval === undefined) {
      requireNetworkApproval = await promptYesNo(
        "Require explicit approval for network access?",
        requireNetworkApproval,
      );
    }
    if (flags.requireVerifyApproval === undefined) {
      requireVerifyApproval = await promptYesNo(
        "Require explicit approval for verification?",
        requireVerifyApproval,
      );
    }
    if (!flags.recipes) {
      process.stdout.write(`${renderBundledRecipesHint()}\n`);
      const answer = await promptInput("Install optional recipes (comma separated, or none): ");
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
  }

  validateBundledRecipesSelection(recipes);

  try {
    const initRoot = path.resolve(opts.rootOverride ?? opts.cwd);
    const existingGitRoot = await findGitRoot(initRoot);
    const gitRootExisted = Boolean(existingGitRoot);
    let gitRoot = existingGitRoot;
    const baseBranchFallback = "main";
    if (!gitRoot) {
      await gitInitRepo(initRoot, baseBranchFallback);
      gitRoot = initRoot;
    }

    const resolved = await resolveProject({
      cwd: gitRoot,
      rootOverride: gitRoot,
    });
    let initBaseBranch = await resolveInitBaseBranch(resolved.gitRoot, baseBranchFallback);
    if (isInteractive && workflow === "branch_pr" && gitRootExisted) {
      initBaseBranch = await promptInitBaseBranch({
        gitRoot: resolved.gitRoot,
        fallback: initBaseBranch,
      });
    }
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
      path.join(resolved.agentplaneDir, "backends", "local"),
      path.join(resolved.agentplaneDir, "backends", "redmine"),
    ];
    const initFiles = [configPath, localBackendPath, redmineBackendPath];
    const conflicts: string[] = [];

    for (const dir of initDirs) {
      const kind = await getPathKind(dir);
      if (kind && kind !== "dir") conflicts.push(dir);
    }
    for (const filePath of initFiles) {
      if (await fileExists(filePath)) conflicts.push(filePath);
    }

    if (conflicts.length > 0) {
      if (flags.backup) {
        for (const conflict of conflicts) {
          await backupPath(conflict);
        }
      } else if (flags.force) {
        for (const conflict of conflicts) {
          await rm(conflict, { recursive: true, force: true });
        }
      } else {
        const rendered = conflicts
          .map((conflict) => `- ${path.relative(resolved.gitRoot, conflict)}`)
          .join("\n");
        throw new CliError({
          exitCode: 5,
          code: "E_IO",
          message:
            `Init conflicts detected:\n${rendered}\n` +
            "Re-run with --force to overwrite or --backup to preserve existing files.",
        });
      }
    }

    await mkdir(resolved.agentplaneDir, { recursive: true });
    await mkdir(path.join(resolved.agentplaneDir, "tasks"), { recursive: true });
    await mkdir(path.join(resolved.agentplaneDir, "agents"), { recursive: true });
    await mkdir(path.join(resolved.agentplaneDir, "cache"), { recursive: true });
    await mkdir(path.join(resolved.agentplaneDir, "backends", "local"), { recursive: true });
    await mkdir(path.join(resolved.agentplaneDir, "backends", "redmine"), { recursive: true });

    const rawConfig = defaultConfig() as unknown as Record<string, unknown>;
    setByDottedKey(rawConfig, "workflow_mode", workflow);
    setByDottedKey(
      rawConfig,
      "tasks_backend.config_path",
      path.relative(resolved.gitRoot, backendPath),
    );
    setByDottedKey(rawConfig, "agents.approvals.require_plan", String(requirePlanApproval));
    setByDottedKey(rawConfig, "agents.approvals.require_network", String(requireNetworkApproval));
    setByDottedKey(rawConfig, "agents.approvals.require_verify", String(requireVerifyApproval));
    await saveConfig(resolved.agentplaneDir, rawConfig);

    const localBackendPayload = {
      id: "local",
      version: 1,
      module: "backend.py",
      class: "LocalBackend",
      settings: { dir: ".agentplane/tasks" },
    };
    const redmineBackendPayload = {
      id: "redmine",
      version: 1,
      module: "backend.py",
      class: "RedmineBackend",
      settings: {
        url: "https://redmine.example",
        api_key: "replace-me",
        project_id: "replace-me",
        owner_agent: "REDMINE",
        custom_fields: { task_id: 1 },
      },
    };
    await writeJsonStableIfChanged(localBackendPath, localBackendPayload);
    await writeJsonStableIfChanged(redmineBackendPath, redmineBackendPayload);

    const agentsPath = path.join(resolved.gitRoot, "AGENTS.md");
    const installPaths: string[] = [
      path.relative(resolved.gitRoot, configPath),
      path.relative(resolved.gitRoot, backendPath),
    ];
    let wroteAgents = false;
    if (!(await fileExists(agentsPath))) {
      const template = await loadAgentsTemplate();
      const filtered = filterAgentsByWorkflow(template, workflow);
      await atomicWriteFile(agentsPath, filtered, "utf8");
      wroteAgents = true;
    }
    if (wroteAgents) {
      installPaths.push(path.relative(resolved.gitRoot, agentsPath));
    }

    const agentTemplates = await loadAgentTemplates();
    for (const agent of agentTemplates) {
      const targetPath = path.join(resolved.agentplaneDir, "agents", agent.fileName);
      if (await fileExists(targetPath)) continue;
      await atomicWriteFile(targetPath, agent.contents, "utf8");
      installPaths.push(path.relative(resolved.gitRoot, targetPath));
    }

    if (hooks) {
      await cmdHooksInstall({ cwd: opts.cwd, rootOverride: opts.rootOverride, quiet: true });
    }

    if (ide !== "codex") {
      await cmdIdeSync({ cwd: opts.cwd, rootOverride: opts.rootOverride, ide });
      const cursorPath = path.join(resolved.gitRoot, ".cursor", "rules", "agentplane.mdc");
      const windsurfPath = path.join(resolved.gitRoot, ".windsurf", "rules", "agentplane.md");
      if (ide === "cursor" && (await fileExists(cursorPath))) {
        installPaths.push(path.relative(resolved.gitRoot, cursorPath));
      }
      if (ide === "windsurf" && (await fileExists(windsurfPath))) {
        installPaths.push(path.relative(resolved.gitRoot, windsurfPath));
      }
    }

    if (recipes.length > 0) {
      if (listBundledRecipes().length === 0) {
        process.stdout.write(`${infoMessage("bundled recipes are empty; nothing to install")}\n`);
      } else {
        process.stdout.write(
          `${infoMessage("bundled recipe install is not implemented; skipping")}\n`,
        );
      }
    }

    await ensureInitCommit({
      gitRoot: resolved.gitRoot,
      baseBranch: initBaseBranch,
      installPaths,
      version: getVersion(),
      skipHooks: hooks,
    });

    process.stdout.write(`${path.relative(resolved.gitRoot, resolved.agentplaneDir)}\n`);
    return 0;
  } catch (err) {
    if (err instanceof CliError) throw err;
    throw mapCoreError(err, { command: "init", root: opts.rootOverride ?? null });
  }
}
