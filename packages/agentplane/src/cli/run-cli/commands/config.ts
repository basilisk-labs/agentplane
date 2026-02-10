import path from "node:path";

import { saveConfig, setByDottedKey } from "@agentplaneorg/core";

import { mapCoreError } from "../../error-map.js";
import { usageError } from "../../spec/errors.js";
import { CliError } from "../../../shared/errors.js";
import type { CommandHandler, CommandSpec } from "../../spec/spec.js";
import type { RunDeps } from "../command-catalog.js";

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
  try {
    const loaded = await opts.deps.getLoadedConfig("config show");
    process.stdout.write(`${JSON.stringify(loaded.raw, null, 2)}\n`);
    return 0;
  } catch (err) {
    if (err instanceof CliError) throw err;
    throw mapCoreError(err, { command: "config show", root: opts.rootOverride ?? null });
  }
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
  try {
    const resolved = await opts.deps.getResolvedProject("config set");
    const loaded = await opts.deps.getLoadedConfig("config set");
    const raw = { ...loaded.raw };
    setByDottedKey(raw, opts.key, opts.value);
    await saveConfig(resolved.agentplaneDir, raw);
    process.stdout.write(
      `${path.relative(resolved.gitRoot, path.join(resolved.agentplaneDir, "config.json"))}\n`,
    );
    return 0;
  } catch (err) {
    if (err instanceof CliError) throw err;
    throw mapCoreError(err, {
      command: "config set",
      key: opts.key,
      root: opts.rootOverride ?? null,
    });
  }
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
  try {
    const loaded = await opts.deps.getLoadedConfig("mode get");
    process.stdout.write(`${loaded.config.workflow_mode}\n`);
    return 0;
  } catch (err) {
    if (err instanceof CliError) throw err;
    throw mapCoreError(err, { command: "mode get", root: opts.rootOverride ?? null });
  }
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
  try {
    const resolved = await opts.deps.getResolvedProject("mode set");
    const loaded = await opts.deps.getLoadedConfig("mode set");
    const raw = { ...loaded.raw };
    setByDottedKey(raw, "workflow_mode", opts.mode);
    await saveConfig(resolved.agentplaneDir, raw);
    process.stdout.write(`${opts.mode}\n`);
    return 0;
  } catch (err) {
    if (err instanceof CliError) throw err;
    throw mapCoreError(err, {
      command: "mode set",
      root: opts.rootOverride ?? null,
      mode: opts.mode,
    });
  }
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
