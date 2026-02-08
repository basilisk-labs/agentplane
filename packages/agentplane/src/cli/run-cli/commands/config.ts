import path from "node:path";

import { loadConfig, resolveProject, saveConfig, setByDottedKey } from "@agentplaneorg/core";

import { mapCoreError } from "../../error-map.js";
import { usageError } from "../../spec/errors.js";
import type { CommandHandler, CommandSpec } from "../../spec/spec.js";

type ConfigShowParsed = Record<string, never>;

export const configShowSpec: CommandSpec<ConfigShowParsed> = {
  id: ["config", "show"],
  group: "Config",
  summary: "Print resolved config JSON.",
  examples: [{ cmd: "agentplane config show", why: "Show the active config." }],
  parse: () => ({}),
};

async function cmdConfigShow(opts: { cwd: string; rootOverride?: string }): Promise<number> {
  try {
    const resolved = await resolveProject({
      cwd: opts.cwd,
      rootOverride: opts.rootOverride ?? null,
    });
    const loaded = await loadConfig(resolved.agentplaneDir);
    process.stdout.write(`${JSON.stringify(loaded.raw, null, 2)}\n`);
    return 0;
  } catch (err) {
    throw mapCoreError(err, { command: "config show", root: opts.rootOverride ?? null });
  }
}

export const runConfigShow: CommandHandler<ConfigShowParsed> = (ctx) =>
  cmdConfigShow({ cwd: ctx.cwd, rootOverride: ctx.rootOverride });

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
}): Promise<number> {
  try {
    const resolved = await resolveProject({
      cwd: opts.cwd,
      rootOverride: opts.rootOverride ?? null,
    });
    const loaded = await loadConfig(resolved.agentplaneDir);
    const raw = { ...loaded.raw };
    setByDottedKey(raw, opts.key, opts.value);
    await saveConfig(resolved.agentplaneDir, raw);
    process.stdout.write(
      `${path.relative(resolved.gitRoot, path.join(resolved.agentplaneDir, "config.json"))}\n`,
    );
    return 0;
  } catch (err) {
    throw mapCoreError(err, {
      command: "config set",
      key: opts.key,
      root: opts.rootOverride ?? null,
    });
  }
}

export const runConfigSet: CommandHandler<ConfigSetParsed> = (ctx, p) =>
  cmdConfigSet({ cwd: ctx.cwd, rootOverride: ctx.rootOverride, key: p.key, value: p.value });

type ModeGetParsed = Record<string, never>;

export const modeGetSpec: CommandSpec<ModeGetParsed> = {
  id: ["mode", "get"],
  group: "Config",
  summary: "Print workflow mode.",
  examples: [{ cmd: "agentplane mode get", why: "Print workflow_mode (direct|branch_pr)." }],
  parse: () => ({}),
};

async function cmdModeGet(opts: { cwd: string; rootOverride?: string }): Promise<number> {
  try {
    const resolved = await resolveProject({
      cwd: opts.cwd,
      rootOverride: opts.rootOverride ?? null,
    });
    const loaded = await loadConfig(resolved.agentplaneDir);
    process.stdout.write(`${loaded.config.workflow_mode}\n`);
    return 0;
  } catch (err) {
    throw mapCoreError(err, { command: "mode get", root: opts.rootOverride ?? null });
  }
}

export const runModeGet: CommandHandler<ModeGetParsed> = (ctx) =>
  cmdModeGet({ cwd: ctx.cwd, rootOverride: ctx.rootOverride });

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
}): Promise<number> {
  try {
    const resolved = await resolveProject({
      cwd: opts.cwd,
      rootOverride: opts.rootOverride ?? null,
    });
    const loaded = await loadConfig(resolved.agentplaneDir);
    const raw = { ...loaded.raw };
    setByDottedKey(raw, "workflow_mode", opts.mode);
    await saveConfig(resolved.agentplaneDir, raw);
    process.stdout.write(`${opts.mode}\n`);
    return 0;
  } catch (err) {
    throw mapCoreError(err, {
      command: "mode set",
      root: opts.rootOverride ?? null,
      mode: opts.mode,
    });
  }
}

export const runModeSet: CommandHandler<ModeSetParsed> = (ctx, p) =>
  cmdModeSet({
    cwd: ctx.cwd,
    rootOverride: ctx.rootOverride,
    mode: p.mode as "direct" | "branch_pr",
  });
