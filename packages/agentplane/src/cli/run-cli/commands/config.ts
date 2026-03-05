import path from "node:path";

import { buildExecutionProfile, saveConfig, setByDottedKey } from "@agentplaneorg/core";

import { usageError } from "../../spec/errors.js";
import type { CommandHandler, CommandSpec } from "../../spec/spec.js";
import type { RunDeps } from "../command-catalog.js";
import { wrapCommand } from "./wrap-command.js";

type ConfigShowParsed = Record<string, never>;

export const configShowSpec: CommandSpec<ConfigShowParsed> = {
  id: ["config", "show"],
  group: "Config",
  summary: "Print resolved config JSON.",
  examples: [{ cmd: "agentplane config show", why: "Show the active config." }],
  parse: () => ({}),
};

async function cmdConfigShow(opts: {
  cwd: string;
  rootOverride?: string;
  deps: RunDeps;
}): Promise<number> {
  return wrapCommand({ command: "config show", rootOverride: opts.rootOverride }, async () => {
    const loaded = await opts.deps.getLoadedConfig("config show");
    process.stdout.write(`${JSON.stringify(loaded.raw, null, 2)}\n`);
    return 0;
  });
}

export function makeRunConfigShowHandler(deps: RunDeps): CommandHandler<ConfigShowParsed> {
  return (ctx) => cmdConfigShow({ cwd: ctx.cwd, rootOverride: ctx.rootOverride, deps });
}

type ConfigSetParsed = { key: string; value: string };

export const configSetSpec: CommandSpec<ConfigSetParsed> = {
  id: ["config", "set"],
  group: "Config",
  summary: "Update project config (dotted keys).",
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
};

async function cmdConfigSet(opts: {
  cwd: string;
  rootOverride?: string;
  key: string;
  value: string;
  deps: RunDeps;
}): Promise<number> {
  return wrapCommand(
    {
      command: "config set",
      rootOverride: opts.rootOverride,
      context: { key: opts.key },
    },
    async () => {
      const resolved = await opts.deps.getResolvedProject("config set");
      const loaded = await opts.deps.getLoadedConfig("config set");
      const raw = { ...loaded.raw };
      setByDottedKey(raw, opts.key, opts.value);
      await saveConfig(resolved.agentplaneDir, raw);
      process.stdout.write(
        `${path.relative(resolved.gitRoot, path.join(resolved.agentplaneDir, "config.json"))}\n`,
      );
      return 0;
    },
  );
}

export function makeRunConfigSetHandler(deps: RunDeps): CommandHandler<ConfigSetParsed> {
  return (ctx, p) =>
    cmdConfigSet({
      cwd: ctx.cwd,
      rootOverride: ctx.rootOverride,
      key: p.key,
      value: p.value,
      deps,
    });
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
  deps: RunDeps;
}): Promise<number> {
  return wrapCommand({ command: "mode get", rootOverride: opts.rootOverride }, async () => {
    const loaded = await opts.deps.getLoadedConfig("mode get");
    process.stdout.write(`${loaded.config.workflow_mode}\n`);
    return 0;
  });
}

export function makeRunModeGetHandler(deps: RunDeps): CommandHandler<ModeGetParsed> {
  return (ctx) => cmdModeGet({ cwd: ctx.cwd, rootOverride: ctx.rootOverride, deps });
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
  deps: RunDeps;
}): Promise<number> {
  return wrapCommand(
    {
      command: "mode set",
      rootOverride: opts.rootOverride,
      context: { mode: opts.mode },
    },
    async () => {
      const resolved = await opts.deps.getResolvedProject("mode set");
      const loaded = await opts.deps.getLoadedConfig("mode set");
      const raw = { ...loaded.raw };
      setByDottedKey(raw, "workflow_mode", opts.mode);
      await saveConfig(resolved.agentplaneDir, raw);
      process.stdout.write(`${opts.mode}\n`);
      return 0;
    },
  );
}

export function makeRunModeSetHandler(deps: RunDeps): CommandHandler<ModeSetParsed> {
  return (ctx, p) =>
    cmdModeSet({
      cwd: ctx.cwd,
      rootOverride: ctx.rootOverride,
      mode: p.mode as "direct" | "branch_pr",
      deps,
    });
}

type ProfileSetParsed = { profile: string };

type ProfilePreset = {
  requirePlan: boolean;
  requireNetwork: boolean;
  requireVerify: boolean;
  executionProfile: "conservative" | "balanced" | "aggressive";
  strictUnsafeConfirm: boolean;
};

const PROFILE_PRESETS: Record<"light" | "normal" | "full-harness", ProfilePreset> = {
  light: {
    requirePlan: false,
    requireNetwork: false,
    requireVerify: false,
    executionProfile: "aggressive",
    strictUnsafeConfirm: false,
  },
  normal: {
    requirePlan: true,
    requireNetwork: true,
    requireVerify: true,
    executionProfile: "balanced",
    strictUnsafeConfirm: false,
  },
  "full-harness": {
    requirePlan: true,
    requireNetwork: true,
    requireVerify: true,
    executionProfile: "conservative",
    strictUnsafeConfirm: true,
  },
};

function normalizeProfile(value: string): "light" | "normal" | "full-harness" | null {
  const normalized = value.trim().toLowerCase();
  if (normalized === "light" || normalized === "vibecoder") return "light";
  if (normalized === "normal" || normalized === "manager") return "normal";
  if (normalized === "full-harness" || normalized === "developer" || normalized === "enterprise") {
    return "full-harness";
  }
  return null;
}

export const profileSetSpec: CommandSpec<ProfileSetParsed> = {
  id: ["profile", "set"],
  group: "Config",
  summary: "Apply setup profile presets to config.",
  args: [{ name: "profile", required: true, valueHint: "<light|normal|full-harness>" }],
  examples: [
    { cmd: "agentplane profile set light", why: "Apply flexible defaults." },
    { cmd: "agentplane profile set normal", why: "Apply balanced defaults." },
    { cmd: "agentplane profile set full-harness", why: "Apply strict defaults." },
  ],
  parse: (raw) => ({ profile: String(raw.args.profile ?? "") }),
  validate: (p) => {
    if (!normalizeProfile(p.profile)) {
      throw usageError({
        spec: profileSetSpec,
        command: "profile set",
        message: `Invalid value for profile: ${p.profile} (expected: light|normal|full-harness)`,
      });
    }
  },
};

async function cmdProfileSet(opts: {
  cwd: string;
  rootOverride?: string;
  profile: "light" | "normal" | "full-harness";
  deps: RunDeps;
}): Promise<number> {
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
      const preset = PROFILE_PRESETS[opts.profile];
      const execution = buildExecutionProfile(preset.executionProfile, {
        strictUnsafeConfirm: preset.strictUnsafeConfirm,
      });

      setByDottedKey(raw, "agents.approvals.require_plan", String(preset.requirePlan));
      setByDottedKey(raw, "agents.approvals.require_network", String(preset.requireNetwork));
      setByDottedKey(raw, "agents.approvals.require_verify", String(preset.requireVerify));
      setByDottedKey(raw, "execution", JSON.stringify(execution));

      await saveConfig(resolved.agentplaneDir, raw);
      process.stdout.write(`${opts.profile}\n`);
      return 0;
    },
  );
}

export function makeRunProfileSetHandler(deps: RunDeps): CommandHandler<ProfileSetParsed> {
  return (ctx, p) =>
    cmdProfileSet({
      cwd: ctx.cwd,
      rootOverride: ctx.rootOverride,
      profile: normalizeProfile(p.profile)!,
      deps,
    });
}
