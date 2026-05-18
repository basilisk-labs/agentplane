import type { CommandHandler, CommandSpec } from "../../../spec/spec.js";
import { usageError } from "../../../spec/errors.js";

import { cmdInit } from "./orchestrate.js";
import { normalizeSetupProfile } from "./presets.js";
import {
  parseBlueprintsSelectionForInit,
  parseBooleanValueForInit,
  parseDirectCloseDirtyPolicyForInit,
  parseRecipesSelectionForInit,
} from "./parsers.js";
import type { InitFlags, InitParsed } from "./model.js";

export const initSpec: CommandSpec<InitParsed> = {
  id: ["init"],
  group: "Setup",
  summary: "Initialize agentplane project files under .agentplane/.",
  description:
    "Creates .agentplane/ config, backend stubs, and agent templates in the target directory. If the target directory is not a git repository, it initializes one and (by default) writes an initial install commit. Use --gitignore-agents to keep agent templates local (gitignored) and skip the install commit. In interactive mode it prompts for missing inputs; use --yes for non-interactive mode.",
  options: [
    {
      kind: "string",
      name: "init-mode",
      valueHint: "<quick|guided|advanced|ci>",
      choices: ["quick", "guided", "advanced", "ci"],
      coerce: (raw) => raw.trim().toLowerCase(),
      description:
        "User-facing init route. TTY defaults to guided; --yes defaults to ci for automation.",
    },
    {
      kind: "boolean",
      name: "quick",
      default: false,
      description: "Alias for --init-mode quick.",
    },
    {
      kind: "boolean",
      name: "advanced",
      default: false,
      description: "Alias for --init-mode advanced.",
    },
    {
      kind: "string",
      name: "tool",
      valueHint: "<codex|claude|cursor|windsurf|multiple|manual>",
      choices: ["codex", "claude", "cursor", "windsurf", "multiple", "manual"],
      coerce: (raw) => raw.trim().toLowerCase(),
      description:
        "AI surface that should read project instructions. Granular --policy-gateway/--ide flags override this mapping.",
    },
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
      name: "direct-close-dirty-policy",
      valueHint: "<allow-other-task-readmes|strict>",
      choices: ["allow-other-task-readmes", "strict"],
      description:
        "Direct-mode close behavior when tracked dirt exists outside the active task: allow only other active task READMEs, or block on any unrelated tracked change.",
    },
    {
      kind: "string",
      name: "backend",
      valueHint: "<local|redmine|cloud>",
      choices: ["local", "redmine", "cloud"],
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
      name: "feedback-github-issues",
      valueHint: "<true|false>",
      description:
        "Opt in to AgentPlane GitHub issue prompts for internal AgentPlane errors (default: false).",
    },
    {
      kind: "string",
      name: "feedback-anonymous-cloud",
      valueHint: "<true|false>",
      description:
        "Allow anonymous AgentPlane Cloud issue intake fallback when GitHub issue publishing is unavailable (default: false).",
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
      description: "Optional cached recipes to vendor during init (comma-separated), or 'none'.",
    },
    {
      kind: "string",
      name: "blueprints",
      valueHint: "<none|id1,pack:id2,...>",
      description:
        "Optional cached blueprint catalog entries to install and activate during init (comma-separated), or 'none'. Prefix with blueprint: or pack: to disambiguate.",
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
      name: "no-input",
      default: false,
      description: "Alias for --yes; run init without prompts using defaults for missing flags.",
    },
    {
      kind: "boolean",
      name: "non-interactive",
      default: false,
      description: "Alias for --yes; run init without prompts using defaults for missing flags.",
    },
    {
      kind: "boolean",
      name: "dry-run",
      default: false,
      description:
        "Build and print the init plan without writing files, initializing git, or handling conflicts.",
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
      cmd: "agentplane init --workflow direct --direct-close-dirty-policy allow-other-task-readmes --backend local --hooks true --require-network-approval true --yes",
      why: "Non-interactive setup with the tolerant direct close policy plus an explicit network-approval override.",
    },
    {
      cmd: "agentplane init --workflow direct --direct-close-dirty-policy strict --yes",
      why: "Initialize direct mode with strict close-tail blocking on any unrelated tracked dirt.",
    },
    {
      cmd: "agentplane init --feedback-github-issues true --yes",
      why: "Opt in to GitHub issue prompts for internal AgentPlane errors.",
    },
    {
      cmd: "agentplane init --force --yes",
      why: "Re-initialize, overwriting conflicts (non-interactive).",
    },
    {
      cmd: "agentplane init --yes --gitignore-agents",
      why: "Initialize without committing and keep agent prompts/templates local (gitignored).",
    },
    {
      cmd: "agentplane init --dry-run --yes --output json",
      why: "Print a machine-readable init plan without writing files.",
    },
    {
      cmd: "agentplane init --quick --tool cursor",
      why: "Use the quick first-run route and install AGENTS.md plus Cursor rules.",
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
    const feedbackGithubIssuesRaw = raw.opts["feedback-github-issues"] as string | undefined;
    const feedbackAnonymousCloudRaw = raw.opts["feedback-anonymous-cloud"] as string | undefined;
    const recipesRaw = raw.opts.recipes as string | undefined;
    const blueprintsRaw = raw.opts.blueprints as string | undefined;

    const initModeFlag =
      raw.opts.quick === true
        ? "quick"
        : raw.opts.advanced === true
          ? "advanced"
          : (raw.opts["init-mode"] as InitFlags["initMode"]);

    return {
      initMode: initModeFlag,
      tool: raw.opts.tool as InitFlags["tool"],
      setupProfile: normalizeSetupProfile(raw.opts["setup-profile"] as string | undefined),
      policyGateway: raw.opts["policy-gateway"] as InitFlags["policyGateway"],
      ide: raw.opts.ide as InitFlags["ide"],
      workflow: raw.opts.workflow as InitFlags["workflow"],
      directCloseDirtyPolicy:
        (raw.opts["direct-close-dirty-policy"] as string | undefined) === undefined
          ? undefined
          : parseDirectCloseDirtyPolicyForInit(
              initSpec,
              "--direct-close-dirty-policy",
              String(raw.opts["direct-close-dirty-policy"]),
            ),
      backend: raw.opts.backend as InitFlags["backend"],
      hooks:
        hooksRaw === undefined
          ? undefined
          : parseBooleanValueForInit(initSpec, "--hooks", hooksRaw),
      requirePlanApproval:
        requirePlanRaw === undefined
          ? undefined
          : parseBooleanValueForInit(initSpec, "--require-plan-approval", requirePlanRaw),
      requireNetworkApproval:
        requireNetworkRaw === undefined
          ? undefined
          : parseBooleanValueForInit(initSpec, "--require-network-approval", requireNetworkRaw),
      requireVerifyApproval:
        requireVerifyRaw === undefined
          ? undefined
          : parseBooleanValueForInit(initSpec, "--require-verify-approval", requireVerifyRaw),
      feedbackGithubIssues:
        feedbackGithubIssuesRaw === undefined
          ? undefined
          : parseBooleanValueForInit(initSpec, "--feedback-github-issues", feedbackGithubIssuesRaw),
      feedbackAnonymousCloud:
        feedbackAnonymousCloudRaw === undefined
          ? undefined
          : parseBooleanValueForInit(
              initSpec,
              "--feedback-anonymous-cloud",
              feedbackAnonymousCloudRaw,
            ),
      executionProfile: raw.opts["execution-profile"] as InitFlags["executionProfile"],
      strictUnsafeConfirm:
        (raw.opts["strict-unsafe-confirm"] as string | undefined) === undefined
          ? undefined
          : parseBooleanValueForInit(
              initSpec,
              "--strict-unsafe-confirm",
              String(raw.opts["strict-unsafe-confirm"]),
            ),
      recipes: recipesRaw === undefined ? undefined : parseRecipesSelectionForInit(recipesRaw),
      blueprints:
        blueprintsRaw === undefined ? undefined : parseBlueprintsSelectionForInit(blueprintsRaw),
      force: raw.opts.force === true,
      backup: raw.opts.backup === true,
      yes:
        raw.opts.yes === true ||
        raw.opts["no-input"] === true ||
        raw.opts["non-interactive"] === true,
      dryRun: raw.opts["dry-run"] === true,
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
    if (p.initMode === "quick" && p.setupProfile === "full-harness") {
      throw usageError({
        spec: initSpec,
        command: "init",
        message: "--init-mode quick cannot be combined with --setup-profile full-harness.",
      });
    }
  },
};

export const runInit: CommandHandler<InitParsed> = (ctx, flags) =>
  cmdInit({
    cwd: ctx.cwd,
    rootOverride: ctx.rootOverride,
    outputMode: ctx.outputMode ?? "text",
    flags,
    spec: initSpec,
  });
