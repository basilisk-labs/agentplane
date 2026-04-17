import {
  loadDirectSubcommandNames,
  parseGroupCommand,
  throwGroupCommandUsage,
  type GroupCommandParsed,
} from "../../group-command.js";
import { createCliEmitter } from "../../output.js";
import type { CommandHandler, CommandSpec } from "../../spec/spec.js";
import {
  installBundledCodexPlugin,
  resolveCodexInstallRoot,
  type CodexPluginInstallScope,
} from "../../../commands/codex/plugin-install.js";
import type { RunDeps } from "../command-catalog.js";

import { wrapCommand } from "./wrap-command.js";

const output = createCliEmitter();

export type CodexPluginInstallParsed = {
  scope: CodexPluginInstallScope;
};

export const codexSpec: CommandSpec<GroupCommandParsed> = {
  id: ["codex"],
  group: "Codex",
  summary: "Codex integration commands.",
  synopsis: ["agentplane codex <subcommand> [options]"],
  args: [{ name: "subcommand", required: false, variadic: true, valueHint: "<subcommand>" }],
  parse: (raw) => parseGroupCommand(raw, "subcommand"),
};

export const codexPluginSpec: CommandSpec<GroupCommandParsed> = {
  id: ["codex", "plugin"],
  group: "Codex",
  summary: "Install and inspect bundled Codex plugin integrations.",
  synopsis: ["agentplane codex plugin <subcommand> [options]"],
  args: [{ name: "subcommand", required: false, variadic: true, valueHint: "<subcommand>" }],
  parse: (raw) => parseGroupCommand(raw, "subcommand"),
};

export const codexPluginInstallSpec: CommandSpec<CodexPluginInstallParsed> = {
  id: ["codex", "plugin", "install"],
  group: "Codex",
  summary: "Install the bundled AgentPlane plugin into a local Codex marketplace.",
  options: [
    {
      kind: "string",
      name: "scope",
      valueHint: "<user|repo>",
      choices: ["user", "repo"],
      default: "user",
      description: "Install to the user home marketplace or the current repository marketplace.",
    },
  ],
  examples: [
    {
      cmd: "agentplane codex plugin install",
      why: "Install AgentPlane into the user-local Codex marketplace under ~/.agents/plugins.",
    },
    {
      cmd: "agentplane codex plugin install --scope repo",
      why: "Install AgentPlane into the current repository marketplace for local testing.",
    },
  ],
  notes: [
    "User scope writes `~/plugins/agentplane` plus `~/.agents/plugins/marketplace.json` by default.",
    "Repo scope writes `<repo>/plugins/agentplane` plus `<repo>/.agents/plugins/marketplace.json`.",
    "OpenAI's public self-serve Plugin Directory is not available yet; local marketplaces are the supported route today.",
  ],
  parse: (raw) => ({
    scope: (raw.opts.scope as CodexPluginInstallScope | undefined) ?? "user",
  }),
};

export const runCodex: CommandHandler<GroupCommandParsed> = async (_ctx, p) => {
  throwGroupCommandUsage({
    spec: codexSpec,
    cmd: p.cmd,
    subcommands: await loadDirectSubcommandNames(["codex"]),
    command: "codex",
    missingMessage: "Missing Codex subcommand.",
    unknownMessage: (subcommand) => `Unknown Codex subcommand: ${subcommand}.`,
  });
};

export const runCodexPlugin: CommandHandler<GroupCommandParsed> = async (_ctx, p) => {
  throwGroupCommandUsage({
    spec: codexPluginSpec,
    cmd: p.cmd,
    subcommands: await loadDirectSubcommandNames(["codex", "plugin"]),
    command: "codex plugin",
    missingMessage: "Missing Codex plugin subcommand.",
    unknownMessage: (subcommand) => `Unknown Codex plugin subcommand: ${subcommand}.`,
  });
};

export function makeRunCodexPluginInstallHandler(
  deps: RunDeps,
): CommandHandler<CodexPluginInstallParsed> {
  return async (ctx, p) =>
    wrapCommand({ command: "codex plugin install", rootOverride: ctx.rootOverride }, async () => {
      const resolvedProject =
        p.scope === "repo" ? await deps.getResolvedProject("codex plugin install") : null;
      const installRoot =
        p.scope === "repo"
          ? resolveCodexInstallRoot({
              scope: "repo",
              repoRoot: resolvedProject?.gitRoot,
            })
          : resolveCodexInstallRoot({ scope: "user" });
      const result = await installBundledCodexPlugin({
        scope: p.scope,
        installRoot,
      });

      output.report(
        [
          { label: "Scope", value: result.scope },
          { label: "Install root", value: result.installRoot },
          { label: "Plugin root", value: result.pluginRoot },
          { label: "Manifest", value: result.manifestPath },
          { label: "Marketplace", value: result.marketplacePath },
        ],
        { header: "Installed Codex plugin" },
      );
      output.line(
        p.scope === "repo"
          ? "Next: open Codex in this repository and install AgentPlane from the repo marketplace."
          : "Next: open Codex, open Plugins, and install AgentPlane from the local marketplace.",
      );
      return 0;
    });
}
