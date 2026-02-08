import type { CommandHandler, CommandSpec } from "../cli/spec/spec.js";
import { usageError } from "../cli/spec/errors.js";
import { cmdUpgradeParsed, type UpgradeFlags } from "./upgrade.js";

export type UpgradeParsed = UpgradeFlags;

export const upgradeSpec: CommandSpec<UpgradeParsed> = {
  id: ["upgrade"],
  group: "Setup",
  summary: "Upgrade the local agentplane framework bundle in the repo.",
  description:
    "Downloads (or reads) an upgrade bundle, verifies checksum, and applies allowed files into the repo. Network access is gated by config approvals; use --yes when allowed.",
  options: [
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
  examples: [
    {
      cmd: "agentplane upgrade",
      why: "Upgrade to the latest release using config.framework.source.",
    },
    {
      cmd: "agentplane upgrade --tag v0.1.9 --dry-run",
      why: "Preview changes for a specific release tag.",
    },
    {
      cmd: "agentplane upgrade --bundle ./agentplane-upgrade.tar.gz --checksum ./agentplane-upgrade.tar.gz.sha256",
      why: "Upgrade from local bundle files (no network).",
    },
  ],
  parse: (raw) => {
    const noBackup = raw.opts["no-backup"] === true;
    return {
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
  },
};

export const runUpgrade: CommandHandler<UpgradeParsed> = (ctx, flags) =>
  cmdUpgradeParsed({ cwd: ctx.cwd, rootOverride: ctx.rootOverride, flags });
