import { mkdir, readdir, readFile } from "node:fs/promises";
import path from "node:path";

import { writeTextIfChanged } from "../../../shared/write-if-changed.js";
import { resolvePolicyGatewayForRepo } from "../../../shared/policy-gateway.js";
import { isRecord } from "../../../shared/guards.js";
import {
  loadDirectSubcommandNames,
  parseGroupCommand,
  throwGroupCommandUsage,
  type GroupCommandParsed,
} from "../../group-command.js";
import { createCliEmitter } from "../../output.js";
import { renderRole, type RoleProfileGuide } from "../../command-guide.js";
import type { CommandHandler, CommandSpec } from "../../spec/spec.js";
import { usageError } from "../../spec/errors.js";
import type { RunDeps } from "../command-catalog/kernel.js";

import {
  PLATFORM_IDS,
  PLATFORM_INTEGRATIONS,
  type PlatformId,
  type PlatformIntegration,
  type PlatformRenderContext,
  type PlatformSurfaceKind,
} from "./platform-registry.js";
import { wrapCommand } from "./wrap-command.js";

const output = createCliEmitter();

type PlatformSyncParsed = {
  platforms: PlatformId[];
  dryRun: boolean;
};

type PlatformExplainParsed = {
  platform: PlatformId;
};

function isPlatformId(value: string): value is PlatformId {
  return (PLATFORM_IDS as readonly string[]).includes(value);
}

function parsePlatformIds(rawValue: unknown): PlatformId[] {
  const rawItems = Array.isArray(rawValue)
    ? rawValue.flatMap((item) => String(item).split(","))
    : typeof rawValue === "string"
      ? rawValue.split(",")
      : [];
  const values = rawItems.map((item) => item.trim().toLowerCase()).filter(Boolean);
  if (values.length === 0 || values.includes("all")) return [...PLATFORM_IDS];

  const invalid = values.find((value) => !isPlatformId(value));
  if (invalid) {
    throw usageError({
      message: `Unknown platform: ${invalid} (expected one of: ${PLATFORM_IDS.join(", ")}, all)`,
    });
  }
  return [...new Set(values as PlatformId[])];
}

export const platformSpec: CommandSpec<GroupCommandParsed> = {
  id: ["platform"],
  group: "Platform",
  summary: "Agent platform instruction-surface integration commands.",
  synopsis: ["agentplane platform <subcommand> [options]"],
  args: [{ name: "subcommand", required: false, variadic: true, valueHint: "<subcommand>" }],
  parse: (raw) => parseGroupCommand(raw, "subcommand"),
};

export const platformListSpec: CommandSpec<Record<string, never>> = {
  id: ["platform", "list"],
  group: "Platform",
  summary: "List supported platform instruction-surface integrations.",
  parse: () => ({}),
};

export const platformExplainSpec: CommandSpec<PlatformExplainParsed> = {
  id: ["platform", "explain"],
  group: "Platform",
  summary: "Explain one platform integration surface.",
  args: [{ name: "platform", required: true, valueHint: "<platform>" }],
  parse: (raw) => ({ platform: parsePlatformIds(raw.args.platform)[0] ?? "codex" }),
};

export const platformDoctorSpec: CommandSpec<PlatformExplainParsed> = {
  id: ["platform", "doctor"],
  group: "Platform",
  summary: "Print verification guidance for one platform integration surface.",
  args: [{ name: "platform", required: true, valueHint: "<platform>" }],
  parse: (raw) => ({ platform: parsePlatformIds(raw.args.platform)[0] ?? "codex" }),
};

export const platformSyncSpec: CommandSpec<PlatformSyncParsed> = {
  id: ["platform", "sync"],
  group: "Platform",
  summary: "Generate platform-specific instruction files from AgentPlane policy.",
  options: [
    {
      kind: "string",
      name: "platform",
      valueHint: `<${PLATFORM_IDS.join("|")}|all>`,
      repeatable: true,
      description: "Platform to sync. Repeat or pass comma-separated values. Default: all.",
      coerce: (raw) => raw.trim().toLowerCase(),
    },
    {
      kind: "boolean",
      name: "dry-run",
      default: false,
      description: "Print planned platform targets without writing files.",
    },
  ],
  examples: [
    { cmd: "agentplane platform list", why: "Show supported instruction surfaces." },
    { cmd: "agentplane platform sync", why: "Generate all platform projections." },
    {
      cmd: "agentplane platform sync --platform cursor --platform cline",
      why: "Generate Cursor and Cline rules only.",
    },
  ],
  parse: (raw) => ({
    platforms: parsePlatformIds(raw.opts.platform),
    dryRun: raw.opts["dry-run"] === true,
  }),
};

export const runPlatform: CommandHandler<GroupCommandParsed> = async (_ctx, p) => {
  throwGroupCommandUsage({
    spec: platformSpec,
    cmd: p.cmd,
    subcommands: await loadDirectSubcommandNames(["platform"]),
    command: "platform",
    missingMessage: "Missing platform subcommand.",
    unknownMessage: (subcommand) => `Unknown platform subcommand: ${subcommand}.`,
  });
};

export const runPlatformList: CommandHandler<Record<string, never>> = (ctx) => {
  const rows = PLATFORM_IDS.map((id) => toPlatformSummary(PLATFORM_INTEGRATIONS[id]));
  if (ctx.outputMode === "json") {
    output.json({ platforms: rows });
  } else {
    output.lines(rows.map((row) => `${row.id}\t${row.surfaces.join(",")}\t${row.summary}`));
  }
  return Promise.resolve(0);
};

export const runPlatformExplain: CommandHandler<PlatformExplainParsed> = (ctx, parsed) => {
  const platform = PLATFORM_INTEGRATIONS[parsed.platform];
  if (ctx.outputMode === "json") {
    output.json(toPlatformDetail(platform));
  } else {
    output.report(
      [
        { label: "Platform", value: platform.label },
        { label: "ID", value: platform.id },
        { label: "Summary", value: platform.summary },
        { label: "Surfaces", value: platform.surfaces.join(", ") },
        { label: "Native sources", value: platform.nativeSources.join(", ") },
        {
          label: "Generated targets",
          value: platform.projections.map((p) => p.path).join(", ") || "none",
        },
        { label: "External adapter", value: platform.externalAdapter?.repository ?? "none" },
      ],
      { header: "Platform integration" },
    );
  }
  return Promise.resolve(0);
};

export const runPlatformDoctor: CommandHandler<PlatformExplainParsed> = (ctx, parsed) => {
  const platform = PLATFORM_INTEGRATIONS[parsed.platform];
  if (ctx.outputMode === "json") {
    output.json({ platform: platform.id, hint: platform.doctorHint });
  } else {
    output.line(`${platform.id}: ${platform.doctorHint}`);
  }
  return Promise.resolve(0);
};

export function makeRunPlatformSyncHandler(deps: RunDeps): CommandHandler<PlatformSyncParsed> {
  return async (ctx, parsed) =>
    wrapCommand({ command: "platform sync", rootOverride: ctx.rootOverride }, async () => {
      const result = await syncPlatforms({
        cwd: ctx.cwd,
        rootOverride: ctx.rootOverride,
        platforms: parsed.platforms,
        dryRun: parsed.dryRun,
        deps,
      });
      if (ctx.outputMode === "json") {
        output.json(result);
      } else {
        for (const item of result.targets) {
          output.line(`${item.status}\t${item.platform}\t${item.path}`);
        }
        for (const item of result.external_adapters) {
          output.line(`external\t${item.platform}\t${item.repository}`);
        }
      }
      return 0;
    });
}

export async function syncPlatforms(opts: {
  cwd: string;
  rootOverride?: string;
  platforms: PlatformId[];
  dryRun: boolean;
  commandName?: string;
  deps: RunDeps;
}): Promise<{
  source: string;
  dry_run: boolean;
  platforms: PlatformId[];
  targets: {
    platform: PlatformId;
    path: string;
    description: string;
    status: "planned" | "written";
  }[];
  native_sources: { platform: PlatformId; sources: string[] }[];
  external_adapters: { platform: PlatformId; repository: string; note: string }[];
}> {
  const resolved = await opts.deps.getResolvedProject("platform sync");
  const gateway = await resolvePolicyGatewayForRepo({
    gitRoot: resolved.gitRoot,
    fallbackFlavor: "codex",
  });
  const sourceText = await readFile(gateway.absPath, "utf8");
  const roleGuideText = await renderInstalledRoleGuides(resolved.agentplaneDir);
  const renderContext: PlatformRenderContext = {
    command: opts.commandName ?? "platform sync",
    sourceFileName: gateway.fileName,
    sourceText,
    roleGuideText,
  };

  const targets: {
    platform: PlatformId;
    path: string;
    description: string;
    status: "planned" | "written";
  }[] = [];
  const native_sources: { platform: PlatformId; sources: string[] }[] = [];
  const external_adapters: { platform: PlatformId; repository: string; note: string }[] = [];

  for (const platformId of opts.platforms) {
    const platform = PLATFORM_INTEGRATIONS[platformId];
    native_sources.push({ platform: platform.id, sources: platform.nativeSources });
    if (platform.externalAdapter) {
      external_adapters.push({
        platform: platform.id,
        repository: platform.externalAdapter.repository,
        note: platform.externalAdapter.note,
      });
    }
    for (const projection of platform.projections) {
      const absPath = path.join(resolved.gitRoot, projection.path);
      if (!opts.dryRun) {
        await mkdir(path.dirname(absPath), { recursive: true });
        await writeTextIfChanged(absPath, projection.render(renderContext));
      }
      targets.push({
        platform: platform.id,
        path: projection.path,
        description: projection.description,
        status: opts.dryRun ? "planned" : "written",
      });
    }
  }

  return {
    source: gateway.fileName,
    dry_run: opts.dryRun,
    platforms: opts.platforms,
    targets,
    native_sources,
    external_adapters,
  };
}

export function makeRunIdePlatformSyncHandler(
  deps: RunDeps,
): CommandHandler<{ ide?: "cursor" | "windsurf" }> {
  return async (ctx, parsed) => {
    const platforms: PlatformId[] =
      parsed.ide === "cursor"
        ? ["cursor"]
        : parsed.ide === "windsurf"
          ? ["windsurf"]
          : ["cursor", "windsurf"];
    const result = await syncPlatforms({
      cwd: ctx.cwd,
      rootOverride: ctx.rootOverride,
      platforms,
      dryRun: false,
      commandName: "ide sync",
      deps,
    });
    for (const item of result.targets) {
      output.line(item.path);
    }
    return 0;
  };
}

function toPlatformSummary(platform: PlatformIntegration): {
  id: PlatformId;
  label: string;
  surfaces: PlatformSurfaceKind[];
  summary: string;
} {
  return {
    id: platform.id,
    label: platform.label,
    surfaces: platform.surfaces,
    summary: platform.summary,
  };
}

function toPlatformDetail(platform: PlatformIntegration): ReturnType<typeof toPlatformSummary> & {
  native_sources: string[];
  generated_targets: string[];
  external_adapter: PlatformIntegration["externalAdapter"] | null;
  doctor_hint: string;
} {
  return {
    ...toPlatformSummary(platform),
    native_sources: platform.nativeSources,
    generated_targets: platform.projections.map((projection) => projection.path),
    external_adapter: platform.externalAdapter ?? null,
    doctor_hint: platform.doctorHint,
  };
}

type IdeAgentProfile = {
  id?: string;
  role?: string;
  description?: string;
  inputs?: unknown;
  outputs?: unknown;
  permissions?: unknown;
  workflow?: unknown;
};

function toStringList(value: unknown): string[] {
  const items = Array.isArray(value) ? value : isRecord(value) ? Object.values(value) : [];
  return items
    .map((item) => {
      if (typeof item === "string") return item.trim();
      if (isRecord(item) && typeof item.text === "string") {
        return item.text.trim();
      }
      return "";
    })
    .filter(Boolean);
}

function toRoleProfileGuide(opts: {
  filename: string;
  roleId: string;
  profile: IdeAgentProfile;
}): RoleProfileGuide {
  return {
    filename: opts.filename,
    id: (typeof opts.profile.id === "string" ? opts.profile.id : "").trim() || opts.roleId,
    role: (typeof opts.profile.role === "string" ? opts.profile.role : "").trim(),
    description: (typeof opts.profile.description === "string"
      ? opts.profile.description
      : ""
    ).trim(),
    inputs: toStringList(opts.profile.inputs),
    outputs: toStringList(opts.profile.outputs),
    permissions: toStringList(opts.profile.permissions),
    workflow: toStringList(opts.profile.workflow),
  };
}

async function renderInstalledRoleGuides(agentplaneDir: string): Promise<string> {
  const agentsDir = path.join(agentplaneDir, "agents");
  let entries: string[] = [];
  try {
    const dirEntries = await readdir(agentsDir);
    entries = dirEntries.filter((entry) => entry.endsWith(".json")).toSorted();
  } catch {
    return "";
  }

  const guides: string[] = [];
  for (const entry of entries) {
    const roleId = entry.replace(/\.json$/i, "");
    const raw = JSON.parse(await readFile(path.join(agentsDir, entry), "utf8")) as IdeAgentProfile;
    const guide = renderRole(roleId, {
      profile: toRoleProfileGuide({
        filename: entry,
        roleId,
        profile: raw,
      }),
    });
    if (guide) guides.push(guide);
  }
  if (guides.length === 0) return "";
  return [
    "",
    "## Synced Role Activation",
    "",
    "- Use `agentplane role ORCHESTRATOR` while planning and approvals are active.",
    "- As soon as a task owner is known, switch to that owner role before owner-scoped execution.",
    "- Do not keep implementation or verification inside ORCHESTRATOR once the task owner is established.",
    "",
    ...guides,
  ].join("\n");
}
