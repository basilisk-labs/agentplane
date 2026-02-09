import type { CommandHandler, CommandSpec } from "../cli/spec/spec.js";
import { usageError } from "../cli/spec/errors.js";
import { cmdUpgradeParsed, type UpgradeFlags } from "./upgrade.js";

export type UpgradeParsed = UpgradeFlags;

export const upgradeSpec: CommandSpec<UpgradeParsed> = {
  id: ["upgrade"],
  group: "Setup",
  summary: "Upgrade the local agentplane framework bundle in the repo.",
  description:
    "Upgrades the local agentplane framework bundle in the repo using a strict manifest of managed files. By default, upgrade generates an agent-assisted plan from the locally installed agentplane package assets (no network) and does not modify files. Use --auto to apply changes. Use --remote to fetch a GitHub release bundle; network access is gated by config approvals.",
  options: [
    {
      kind: "boolean",
      name: "agent",
      default: false,
      description:
        "Generate an agent-assisted upgrade plan (no files are modified). This is the default mode.",
    },
    {
      kind: "boolean",
      name: "auto",
      default: false,
      description: "Apply the upgrade automatically (writes managed files).",
    },
    {
      kind: "boolean",
      name: "remote",
      default: false,
      description: "Fetch the framework bundle from GitHub releases (requires network approvals).",
    },
    {
      kind: "boolean",
      name: "allow-tarball",
      default: false,
      description:
        "Allow falling back to a GitHub repo tarball when release assets are missing (no checksum verification).",
    },
    {
      kind: "string",
      name: "tag",
      valueHint: "<tag>",
      description: "GitHub release tag (defaults to latest).",
    },
    {
      kind: "string",
      name: "source",
      valueHint: "<repo-url>",
      description: "Override GitHub repo source URL (defaults to config.framework.source).",
    },
    {
      kind: "string",
      name: "bundle",
      valueHint: "<path|url>",
      description: "Use a local path or URL for the upgrade bundle archive.",
    },
    {
      kind: "string",
      name: "checksum",
      valueHint: "<path|url>",
      description: "Use a local path or URL for the bundle checksum file (required with --bundle).",
    },
    {
      kind: "string",
      name: "asset",
      valueHint: "<name>",
      description: "Override the GitHub release asset name for the bundle.",
    },
    {
      kind: "string",
      name: "checksum-asset",
      valueHint: "<name>",
      description: "Override the GitHub release asset name for the checksum file.",
    },
    {
      kind: "boolean",
      name: "dry-run",
      default: false,
      description: "Report changes without modifying files.",
    },
    {
      kind: "boolean",
      name: "no-backup",
      default: false,
      description: "Disable backups (default is to create backups).",
    },
    {
      kind: "boolean",
      name: "yes",
      default: false,
      description: "Auto-approve network access prompts (subject to config approvals).",
    },
  ],
  validateRaw: (raw) => {
    if (raw.opts.agent === true && raw.opts.auto === true) {
      throw usageError({
        spec: upgradeSpec,
        command: "upgrade",
        message: "Options --agent and --auto are mutually exclusive.",
      });
    }
  },
  examples: [
    {
      cmd: "agentplane upgrade",
      why: "Generate an agent-assisted plan using locally installed assets (no network).",
    },
    {
      cmd: "agentplane upgrade --auto",
      why: "Apply the upgrade automatically (writes managed files).",
    },
    {
      cmd: "agentplane upgrade --remote --tag v0.1.9 --dry-run",
      why: "Preview changes for a specific GitHub release tag (no writes).",
    },
    {
      cmd: "agentplane upgrade --bundle ./agentplane-upgrade.tar.gz --checksum ./agentplane-upgrade.tar.gz.sha256",
      why: "Upgrade from local bundle files (no network).",
    },
  ],
  parse: (raw) => {
    const noBackup = raw.opts["no-backup"] === true;
    return {
      mode: raw.opts.auto === true ? "auto" : "agent",
      remote: raw.opts.remote === true,
      allowTarball: raw.opts["allow-tarball"] === true,
      source: raw.opts.source as string | undefined,
      tag: raw.opts.tag as string | undefined,
      bundle: raw.opts.bundle as string | undefined,
      checksum: raw.opts.checksum as string | undefined,
      asset: raw.opts.asset as string | undefined,
      checksumAsset: raw.opts["checksum-asset"] as string | undefined,
      dryRun: raw.opts["dry-run"] === true,
      backup: !noBackup,
      yes: raw.opts.yes === true,
    };
  },
  validate: (p) => {
    const hasBundle = Boolean(p.bundle);
    const hasChecksum = Boolean(p.checksum);
    if (hasBundle !== hasChecksum) {
      throw usageError({
        spec: upgradeSpec,
        command: "upgrade",
        message: "Options --bundle and --checksum must be provided together (or omitted together).",
      });
    }

    const hasRemoteHints =
      Boolean(p.source) || Boolean(p.tag) || Boolean(p.asset) || Boolean(p.checksumAsset);
    if (!p.remote && hasRemoteHints && !hasBundle) {
      throw usageError({
        spec: upgradeSpec,
        command: "upgrade",
        message:
          "Remote upgrade options (--tag/--source/--asset/--checksum-asset) require --remote.",
      });
    }
  },
};

export const runUpgrade: CommandHandler<UpgradeParsed> = (ctx, flags) =>
  cmdUpgradeParsed({ cwd: ctx.cwd, rootOverride: ctx.rootOverride, flags });
