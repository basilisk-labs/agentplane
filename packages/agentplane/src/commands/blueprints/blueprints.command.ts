import { resolveProject } from "@agentplaneorg/core/project";

import {
  loadDirectSubcommandNames,
  parseGroupCommand,
  throwGroupCommandUsage,
  type GroupCommandParsed,
} from "../../cli/group-command.js";
import type { CommandHandler, CommandSpec } from "../../cli/spec/spec.js";

import {
  cachedIndexPath,
  findEntry,
  installBlueprint,
  loadBlueprintManifest,
  loadCatalog,
  loadPackManifest,
  refreshCatalog,
  writeTrustConfig,
  type CatalogKind,
  type InstalledBlueprint,
} from "./catalog.js";

export type BlueprintsCatalogParsed = GroupCommandParsed;

export type BlueprintsCatalogRefreshParsed = {
  index: string;
  json: boolean;
};

export type BlueprintsCatalogListParsed = {
  json: boolean;
};

export type BlueprintsCatalogInfoParsed = {
  id: string;
  kind?: CatalogKind;
  json: boolean;
};

export type BlueprintsInstallParsed = {
  id: string;
  kind?: CatalogKind;
  index?: string;
  refresh: boolean;
  activate: boolean;
  json: boolean;
};

export const blueprintsSpec: CommandSpec<BlueprintsCatalogParsed> = {
  id: ["blueprints"],
  group: "Blueprints",
  summary: "Manage external blueprint catalogs and installs.",
  synopsis: ["agentplane blueprints <subcommand> [options]"],
  args: [{ name: "cmd", required: false, variadic: true, valueHint: "<cmd>" }],
  parse: (raw) => parseGroupCommand(raw),
};

export const blueprintsCatalogSpec: CommandSpec<BlueprintsCatalogParsed> = {
  id: ["blueprints", "catalog"],
  group: "Blueprints",
  summary: "Manage the cached external blueprint catalog index.",
  args: [{ name: "cmd", required: false, variadic: true, valueHint: "<cmd>" }],
  parse: (raw) => parseGroupCommand(raw),
};

export const blueprintsCatalogRefreshSpec: CommandSpec<BlueprintsCatalogRefreshParsed> = {
  id: ["blueprints", "catalog", "refresh"],
  group: "Blueprints",
  summary: "Refresh the cached external blueprint catalog index.",
  options: [
    {
      kind: "string",
      name: "index",
      valueHint: "<path|url>",
      required: true,
      description: "Catalog index path or URL.",
    },
    { kind: "boolean", name: "json", default: false, description: "Emit JSON." },
  ],
  parse: (raw) => ({ index: String(raw.opts.index), json: raw.opts.json === true }),
};

export const blueprintsCatalogListSpec: CommandSpec<BlueprintsCatalogListParsed> = {
  id: ["blueprints", "catalog", "list"],
  group: "Blueprints",
  summary: "List cached external blueprint catalog entries.",
  options: [{ kind: "boolean", name: "json", default: false, description: "Emit JSON." }],
  parse: (raw) => ({ json: raw.opts.json === true }),
};

export const blueprintsCatalogInfoSpec: CommandSpec<BlueprintsCatalogInfoParsed> = {
  id: ["blueprints", "catalog", "info"],
  group: "Blueprints",
  summary: "Show cached external blueprint or pack metadata.",
  args: [{ name: "id", required: true, valueHint: "<id>" }],
  options: [
    {
      kind: "string",
      name: "kind",
      valueHint: "<blueprint|pack>",
      choices: ["blueprint", "pack"],
      description: "Disambiguate catalog id kind.",
    },
    { kind: "boolean", name: "json", default: false, description: "Emit JSON." },
  ],
  parse: (raw) => ({
    id: String(raw.args.id),
    kind: raw.opts.kind as CatalogKind | undefined,
    json: raw.opts.json === true,
  }),
};

export const blueprintsInstallSpec: CommandSpec<BlueprintsInstallParsed> = {
  id: ["blueprints", "install"],
  group: "Blueprints",
  summary: "Install an external blueprint or blueprint pack into the current project.",
  args: [{ name: "id", required: true, valueHint: "<blueprint-or-pack-id>" }],
  options: [
    {
      kind: "string",
      name: "kind",
      valueHint: "<blueprint|pack>",
      choices: ["blueprint", "pack"],
      description: "Disambiguate catalog id kind.",
    },
    {
      kind: "string",
      name: "index",
      valueHint: "<path|url>",
      description: "Refresh from this catalog index before installing.",
    },
    {
      kind: "boolean",
      name: "refresh",
      default: false,
      description: "Refresh the cached catalog before installing.",
    },
    {
      kind: "boolean",
      name: "activate",
      default: false,
      description: "Explicitly add installed route blueprint ids to the project trust allowlist.",
    },
    { kind: "boolean", name: "json", default: false, description: "Emit JSON." },
  ],
  parse: (raw) => ({
    id: String(raw.args.id),
    kind: raw.opts.kind as CatalogKind | undefined,
    index: typeof raw.opts.index === "string" ? raw.opts.index : undefined,
    refresh: raw.opts.refresh === true,
    activate: raw.opts.activate === true,
    json: raw.opts.json === true,
  }),
};

export const runBlueprints: CommandHandler<BlueprintsCatalogParsed> = async (_ctx, p) => {
  throwGroupCommandUsage({
    spec: blueprintsSpec,
    cmd: p.cmd,
    subcommands: await loadDirectSubcommandNames(["blueprints"]),
    command: "blueprints",
    missingMessage: "Missing blueprints subcommand.",
    unknownMessage: (subcommand) => `Unknown blueprints subcommand: ${subcommand}.`,
  });
};

export const runBlueprintsCatalog: CommandHandler<BlueprintsCatalogParsed> = async (_ctx, p) => {
  throwGroupCommandUsage({
    spec: blueprintsCatalogSpec,
    cmd: p.cmd,
    subcommands: await loadDirectSubcommandNames(["blueprints", "catalog"]),
    command: "blueprints catalog",
    missingMessage: "Missing blueprints catalog subcommand.",
    unknownMessage: (subcommand) => `Unknown blueprints catalog subcommand: ${subcommand}.`,
  });
};

export const runBlueprintsCatalogRefresh: CommandHandler<BlueprintsCatalogRefreshParsed> = async (
  ctx,
  p,
) => {
  const catalog = await refreshCatalog({ cwd: ctx.cwd, source: p.index });
  const output = {
    catalog_id: catalog.index.catalog_id,
    blueprints: catalog.index.blueprints.length,
    packs: catalog.index.packs.length,
    cache_path: cachedIndexPath(),
    source: catalog.source,
  };
  if (p.json) process.stdout.write(`${JSON.stringify(output, null, 2)}\n`);
  else
    process.stdout.write(
      `Blueprint catalog refreshed: ${output.blueprints} blueprints, ${output.packs} packs\n`,
    );
  return 0;
};

export const runBlueprintsCatalogList: CommandHandler<BlueprintsCatalogListParsed> = async (
  ctx,
  p,
) => {
  const catalog = await loadCatalog({ cwd: ctx.cwd });
  const output = {
    catalog_id: catalog.index.catalog_id,
    source: catalog.source,
    blueprints: catalog.index.blueprints,
    packs: catalog.index.packs,
  };
  if (p.json) process.stdout.write(`${JSON.stringify(output, null, 2)}\n`);
  else {
    for (const entry of catalog.index.blueprints) process.stdout.write(`blueprint ${entry.id}\n`);
    for (const entry of catalog.index.packs) process.stdout.write(`pack ${entry.id}\n`);
  }
  return 0;
};

export const runBlueprintsCatalogInfo: CommandHandler<BlueprintsCatalogInfoParsed> = async (
  ctx,
  p,
) => {
  const catalog = await loadCatalog({ cwd: ctx.cwd });
  const found = findEntry(catalog.index, p.id, p.kind);
  const loaded =
    found.kind === "blueprint"
      ? await loadBlueprintManifest({ catalogSource: catalog.source, entry: found.entry })
      : await loadPackManifest({ catalogSource: catalog.source, entry: found.entry });
  const output = { kind: found.kind, manifest: loaded.manifest };
  if (p.json) process.stdout.write(`${JSON.stringify(output, null, 2)}\n`);
  else
    process.stdout.write(
      `${found.kind} ${loaded.manifest.id}@${loaded.manifest.version}: ${loaded.manifest.summary}\n`,
    );
  return 0;
};

export const runBlueprintsInstall: CommandHandler<BlueprintsInstallParsed> = async (ctx, p) => {
  const resolved = await resolveProject({ cwd: ctx.cwd, rootOverride: ctx.rootOverride ?? null });
  const catalog = await loadCatalog({ cwd: ctx.cwd, index: p.index, refresh: p.refresh });
  const found = findEntry(catalog.index, p.id, p.kind);
  const installed: Awaited<ReturnType<typeof installBlueprint>>[] = [];
  if (found.kind === "blueprint") {
    installed.push(
      await installBlueprint({
        projectRoot: resolved.gitRoot,
        catalogSource: catalog.source,
        entry: found.entry,
      }),
    );
  } else {
    const pack = await loadPackManifest({ catalogSource: catalog.source, entry: found.entry });
    for (const packEntry of pack.manifest.blueprints) {
      const blueprintEntry = findEntry(catalog.index, packEntry.id, "blueprint").entry;
      installed.push(
        await installBlueprint({
          projectRoot: resolved.gitRoot,
          catalogSource: catalog.source,
          entry: blueprintEntry,
        }),
      );
    }
  }
  const allowedIds = installed.flatMap((entry) => entry.recommendedAllowedIds);
  if (p.activate) await writeTrustConfig({ projectRoot: resolved.gitRoot, allowedIds });
  const output = {
    target: p.id,
    kind: found.kind,
    activated: p.activate,
    installed,
    allowed_ids: p.activate ? [...new Set(allowedIds)].toSorted() : [],
  };
  if (p.json) process.stdout.write(`${JSON.stringify(output, null, 2)}\n`);
  else {
    for (const entry of installed) {
      process.stdout.write(
        `Installed blueprint ${entry.catalogId} -> ${entry.blueprintId} (${entry.projectPath})\n`,
      );
    }
    if (p.activate) process.stdout.write(`Activated: ${output.allowed_ids.join(", ")}\n`);
    else
      process.stdout.write(
        "Activation skipped. Re-run with --activate to update the trust allowlist.\n",
      );
  }
  return 0;
};
