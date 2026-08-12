import path from "node:path";

import { saveConfig, setByDottedKey } from "@agentplaneorg/core/config";

import { createCliEmitter } from "../../output.js";
import { usageError } from "../../spec/errors.js";
import type { CommandHandler, CommandSpec } from "../../spec/spec.js";
import { ensureActionApproved } from "../../../commands/shared/approval-requirements.js";
import { buildCanonicalExecutionPolicy } from "../../../runtime/execution-profile/index.js";
import type { CommandSessionResolvers } from "../command-catalog/kernel.js";
import { wrapCommand } from "./wrap-command.js";

const output = createCliEmitter();

type ConfigCommandDeps = Pick<CommandSessionResolvers, "getResolvedProject" | "getLoadedConfig">;

export type ConfigShowResult = {
  config: Awaited<ReturnType<CommandSessionResolvers["getLoadedConfig"]>>["config"];
};
export type ConfigWriteResult = { value: string; workflowPath: string };

type ConfigShowParsed = Record<string, never>;

export const configShowSpec: CommandSpec<ConfigShowParsed> = {
  id: ["config", "show"],
  group: "Config",
  summary: "Print resolved WORKFLOW-backed config JSON.",
  examples: [{ cmd: "agentplane config show", why: "Show the active WORKFLOW config." }],
  parse: () => ({}),
};

async function cmdConfigShow(opts: {
  cwd: string;
  rootOverride?: string;
  deps: Pick<ConfigCommandDeps, "getLoadedConfig">;
}): Promise<ConfigShowResult> {
  return wrapCommand({ command: "config show", rootOverride: opts.rootOverride }, async () => {
    const loaded = await opts.deps.getLoadedConfig("config show");
    return { config: loaded.config };
  });
}

export function makeRunConfigShowHandler(
  deps: Pick<ConfigCommandDeps, "getLoadedConfig">,
): CommandHandler<ConfigShowParsed> {
  return async (ctx) => {
    const result = await cmdConfigShow({ cwd: ctx.cwd, rootOverride: ctx.rootOverride, deps });
    output.json(result.config);
    return 0;
  };
}

type ConfigSetParsed = { key: string; value: string };

export const configSetSpec: CommandSpec<ConfigSetParsed> = {
  id: ["config", "set"],
  group: "Config",
  summary: "Update WORKFLOW front matter config (dotted keys).",
  args: [
    { name: "key", required: true, valueHint: "<key>" },
    { name: "value", required: true, valueHint: "<value>" },
  ],
  examples: [
    { cmd: "agentplane config set workflow_mode direct", why: "Set workflow mode." },
    {
      cmd: 'agentplane config set tasks.verify.required_tags \'["code","backend"]\'',
      why: "Set a JSON list value (pass JSON as a string).",
    },
  ],
  parse: (raw) => ({ key: String(raw.args.key ?? ""), value: String(raw.args.value ?? "") }),
  validate: (parsed) => {
    if (parsed.key === "execution" || parsed.key.startsWith("execution.")) {
      throw usageError({
        spec: configSetSpec,
        command: "config set",
        message:
          "Execution policy is fixed. Configure workflow, runner, integrations, or explicit approvals instead.",
      });
    }
  },
};

async function cmdConfigSet(opts: {
  cwd: string;
  rootOverride?: string;
  key: string;
  value: string;
  deps: ConfigCommandDeps;
}): Promise<ConfigWriteResult> {
  return wrapCommand(
    {
      command: "config set",
      rootOverride: opts.rootOverride,
      context: { key: opts.key },
    },
    async () => {
      const resolved = await opts.deps.getResolvedProject("config set");
      const loaded = await opts.deps.getLoadedConfig("config set");
      await ensureActionApproved({
        action: "config_write",
        config: loaded.config,
        yes: false,
        reason: `config set ${opts.key}`,
      });
      const raw = { ...loaded.raw };
      setByDottedKey(raw, opts.key, opts.value);
      await saveConfig(resolved.agentplaneDir, raw);
      return {
        value: opts.value,
        workflowPath: path.relative(
          resolved.gitRoot,
          path.join(resolved.agentplaneDir, "WORKFLOW.md"),
        ),
      };
    },
  );
}

export function makeRunConfigSetHandler(deps: ConfigCommandDeps): CommandHandler<ConfigSetParsed> {
  return async (ctx, p) => {
    const result = await cmdConfigSet({
      cwd: ctx.cwd,
      rootOverride: ctx.rootOverride,
      key: p.key,
      value: p.value,
      deps,
    });
    output.line(result.workflowPath);
    return 0;
  };
}

type ModeGetParsed = Record<string, never>;

export const modeGetSpec: CommandSpec<ModeGetParsed> = {
  id: ["mode", "get"],
  group: "Config",
  summary: "Print workflow mode.",
  examples: [{ cmd: "agentplane mode get", why: "Print workflow_mode (direct|branch_pr)." }],
  parse: () => ({}),
};

async function cmdModeGet(opts: {
  cwd: string;
  rootOverride?: string;
  deps: ConfigCommandDeps;
}): Promise<{ mode: "direct" | "branch_pr" }> {
  return wrapCommand({ command: "mode get", rootOverride: opts.rootOverride }, async () => {
    const loaded = await opts.deps.getLoadedConfig("mode get");
    return { mode: loaded.config.workflow_mode };
  });
}

export function makeRunModeGetHandler(deps: ConfigCommandDeps): CommandHandler<ModeGetParsed> {
  return async (ctx) => {
    const result = await cmdModeGet({ cwd: ctx.cwd, rootOverride: ctx.rootOverride, deps });
    output.line(result.mode);
    return 0;
  };
}

type ModeSetParsed = { mode: string };

export const modeSetSpec: CommandSpec<ModeSetParsed> = {
  id: ["mode", "set"],
  group: "Config",
  summary: "Set workflow mode.",
  args: [{ name: "mode", required: true, valueHint: "<direct|branch_pr>" }],
  examples: [{ cmd: "agentplane mode set branch_pr", why: "Switch to branch_pr mode." }],
  parse: (raw) => ({ mode: String(raw.args.mode ?? "") }),
  validate: (p) => {
    if (p.mode !== "direct" && p.mode !== "branch_pr") {
      throw usageError({
        spec: modeSetSpec,
        command: "mode set",
        message: `Invalid value for mode: ${p.mode} (expected: direct|branch_pr)`,
      });
    }
  },
};

async function cmdModeSet(opts: {
  cwd: string;
  rootOverride?: string;
  mode: "direct" | "branch_pr";
  deps: ConfigCommandDeps;
}): Promise<ConfigWriteResult> {
  return wrapCommand(
    {
      command: "mode set",
      rootOverride: opts.rootOverride,
      context: { mode: opts.mode },
    },
    async () => {
      const resolved = await opts.deps.getResolvedProject("mode set");
      const loaded = await opts.deps.getLoadedConfig("mode set");
      await ensureActionApproved({
        action: "config_write",
        config: loaded.config,
        yes: false,
        reason: `mode set ${opts.mode}`,
      });
      const raw = { ...loaded.raw };
      setByDottedKey(raw, "workflow_mode", opts.mode);
      await saveConfig(resolved.agentplaneDir, raw);
      return {
        value: opts.mode,
        workflowPath: path.relative(
          resolved.gitRoot,
          path.join(resolved.agentplaneDir, "WORKFLOW.md"),
        ),
      };
    },
  );
}

export function makeRunModeSetHandler(deps: ConfigCommandDeps): CommandHandler<ModeSetParsed> {
  return async (ctx, p) => {
    const result = await cmdModeSet({
      cwd: ctx.cwd,
      rootOverride: ctx.rootOverride,
      mode: p.mode as "direct" | "branch_pr",
      deps,
    });
    output.line(result.value);
    return 0;
  };
}

type ProfileSetParsed = { profile: string };

function normalizeProfile(value: string): "standard" | null {
  const normalized = value.trim().toLowerCase();
  if (
    normalized === "standard" ||
    normalized === "light" ||
    normalized === "normal" ||
    normalized === "full-harness" ||
    normalized === "vibecoder" ||
    normalized === "manager" ||
    normalized === "developer" ||
    normalized === "enterprise"
  )
    return "standard";
  return null;
}

export const profileSetSpec: CommandSpec<ProfileSetParsed> = {
  id: ["profile", "set"],
  group: "Config",
  summary: "Apply the canonical AgentPlane process policy.",
  args: [{ name: "profile", required: true, valueHint: "<standard>" }],
  examples: [
    { cmd: "agentplane profile set standard", why: "Restore the canonical process policy." },
  ],
  parse: (raw) => ({ profile: String(raw.args.profile ?? "") }),
  validate: (p) => {
    if (!normalizeProfile(p.profile)) {
      throw usageError({
        spec: profileSetSpec,
        command: "profile set",
        message: `Invalid value for profile: ${p.profile} (expected: standard)`,
      });
    }
  },
};

async function cmdProfileSet(opts: {
  cwd: string;
  rootOverride?: string;
  profile: "standard";
  deps: ConfigCommandDeps;
}): Promise<ConfigWriteResult> {
  return wrapCommand(
    {
      command: "profile set",
      rootOverride: opts.rootOverride,
      context: { profile: opts.profile },
    },
    async () => {
      const resolved = await opts.deps.getResolvedProject("profile set");
      const loaded = await opts.deps.getLoadedConfig("profile set");
      const raw = { ...loaded.raw };
      const execution = buildCanonicalExecutionPolicy();

      setByDottedKey(raw, "execution", JSON.stringify(execution));

      await saveConfig(resolved.agentplaneDir, raw);
      return {
        value: opts.profile,
        workflowPath: path.relative(
          resolved.gitRoot,
          path.join(resolved.agentplaneDir, "WORKFLOW.md"),
        ),
      };
    },
  );
}

export function makeRunProfileSetHandler(
  deps: ConfigCommandDeps,
): CommandHandler<ProfileSetParsed> {
  return async (ctx, p) => {
    const requestedProfile = p.profile.trim().toLowerCase();
    const result = await cmdProfileSet({
      cwd: ctx.cwd,
      rootOverride: ctx.rootOverride,
      profile: normalizeProfile(p.profile)!,
      deps,
    });
    if (requestedProfile !== "standard") {
      output.warn(
        `Profile "${p.profile}" is a compatibility alias; AgentPlane applied the fixed standard policy.`,
      );
    }
    output.line(result.value);
    return 0;
  };
}
