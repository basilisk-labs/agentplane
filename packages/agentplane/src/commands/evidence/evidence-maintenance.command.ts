import type { LoadedConfig } from "@agentplaneorg/core/config";
import type { ResolvedProject } from "@agentplaneorg/core/project";

import type { CommandHandler, CommandSpec } from "../../cli/spec/spec.js";
import type { CommandContext } from "../shared/task-backend.js";
import { buildEvidenceInventory, type EvidenceInventory } from "./evidence-inventory.js";
import {
  compactEvidenceObjects,
  garbageCollectEvidenceObjects,
  type EvidenceMaintenanceResult,
} from "./evidence-maintenance.js";

export type EvidenceStatsParsed = { json: boolean };
export type EvidenceMaintenanceParsed = {
  apply: boolean;
  yes: boolean;
  json: boolean;
};

type EvidenceProjectDeps = {
  getResolvedProject: (command: string) => Promise<ResolvedProject>;
  getLoadedConfig: (command: string) => Promise<LoadedConfig>;
  getMutationContext?: (command: string) => Promise<CommandContext>;
};

export const evidenceStatsSpec: CommandSpec<EvidenceStatsParsed> = {
  id: ["evidence", "stats"],
  group: "Evidence",
  summary: "Inspect tracked evidence and content-addressed object retention.",
  options: [
    { kind: "boolean", name: "json", default: false, description: "Emit machine-readable result." },
  ],
  examples: [
    {
      cmd: "agentplane evidence stats --json",
      why: "Inspect reachability, pins, age, and disk use.",
    },
  ],
  notes: [
    "Read-only. Retention defaults come from `.agentplane/evidence-retention.json` when present.",
  ],
  parse: (raw) => ({ json: raw.opts.json === true }),
};

function maintenanceOptions() {
  return [
    {
      kind: "boolean" as const,
      name: "apply",
      default: false,
      description: "Apply the planned local maintenance. Default is dry-run.",
    },
    {
      kind: "boolean" as const,
      name: "yes",
      default: false,
      description: "Confirm an apply operation. Required with --apply.",
    },
    {
      kind: "boolean" as const,
      name: "json",
      default: false,
      description: "Emit machine-readable result.",
    },
  ];
}

export const evidenceCompactSpec: CommandSpec<EvidenceMaintenanceParsed> = {
  id: ["evidence", "compact"],
  group: "Evidence",
  summary: "Deduplicate verified evidence objects without rewriting manifests.",
  options: maintenanceOptions(),
  examples: [
    { cmd: "agentplane evidence compact --json", why: "Preview safe hard-link deduplication." },
    { cmd: "agentplane evidence compact --apply --yes", why: "Apply the verified plan." },
  ],
  notes: ["Apply requires a clean repository and refuses corrupt objects or missing references."],
  parse: (raw) => ({
    apply: raw.opts.apply === true,
    yes: raw.opts.yes === true,
    json: raw.opts.json === true,
  }),
};

export const evidenceGcSpec: CommandSpec<EvidenceMaintenanceParsed> = {
  id: ["evidence", "gc"],
  group: "Evidence",
  summary: "Remove only expired, unreferenced, unpinned evidence objects.",
  options: maintenanceOptions(),
  examples: [
    { cmd: "agentplane evidence gc --json", why: "Preview collectible objects." },
    { cmd: "agentplane evidence gc --apply --yes", why: "Apply the verified retention plan." },
  ],
  notes: [
    "Reachable objects, active-task evidence, current failures, and release evidence are never collectible.",
  ],
  parse: (raw) => ({
    apply: raw.opts.apply === true,
    yes: raw.opts.yes === true,
    json: raw.opts.json === true,
  }),
};

function machineJson(value: EvidenceInventory | EvidenceMaintenanceResult): string {
  return `${JSON.stringify(
    value,
    (key: string, nested: unknown): unknown =>
      key === "absolute_path" || key === "inode_key" ? undefined : nested,
    2,
  )}\n`;
}

function renderInventory(inventory: EvidenceInventory): string {
  const summary = inventory.summary;
  return (
    `evidence stats: tracked=${summary.tracked_evidence_files} files/${summary.tracked_evidence_bytes} bytes ` +
    `objects=${summary.object_count}/${summary.logical_bytes} bytes allocated=${summary.allocated_bytes}\n` +
    `reachability: reachable=${summary.reachable_objects} pinned=${summary.pinned_objects} ` +
    `expired=${summary.expired_objects} collectible=${summary.collectible_objects}/${summary.collectible_bytes} bytes\n` +
    `integrity: corrupt=${summary.corrupt_objects} missing_references=${summary.missing_references} ` +
    `duplicates=${summary.duplicate_objects}/${summary.duplicate_bytes} bytes\n` +
    `policy: ${inventory.policy_path} success=${inventory.policy.objects.keep_success_days}d ` +
    `failure=${inventory.policy.objects.keep_failure_days}d release_pins=${inventory.policy.objects.pin_release_evidence}\n`
  );
}

export function makeRunEvidenceStatsHandler(
  deps: EvidenceProjectDeps,
): CommandHandler<EvidenceStatsParsed> {
  return async (_ctx, parsed) => {
    const [project, loaded] = await Promise.all([
      deps.getResolvedProject("evidence stats"),
      deps.getLoadedConfig("evidence stats"),
    ]);
    const inventory = await buildEvidenceInventory({
      root: project.gitRoot,
      workflowDir: loaded.config.paths.workflow_dir,
    });
    process.stdout.write(parsed.json ? machineJson(inventory) : renderInventory(inventory));
    return 0;
  };
}

function makeMaintenanceHandler(
  operation: "compact" | "gc",
  deps: EvidenceProjectDeps,
): CommandHandler<EvidenceMaintenanceParsed> {
  return async (_ctx, parsed) => {
    const [project, loaded] = await Promise.all([
      deps.getResolvedProject(`evidence ${operation}`),
      deps.getLoadedConfig(`evidence ${operation}`),
    ]);
    if (parsed.apply) await deps.getMutationContext?.(`evidence ${operation}`);
    const run = operation === "compact" ? compactEvidenceObjects : garbageCollectEvidenceObjects;
    const result = await run({
      root: project.gitRoot,
      workflowDir: loaded.config.paths.workflow_dir,
      apply: parsed.apply,
      yes: parsed.yes,
    });
    if (parsed.json) {
      process.stdout.write(machineJson(result));
      return 0;
    }
    process.stdout.write(
      `${operation === "compact" ? "evidence compact" : "evidence gc"}: ` +
        `${parsed.apply ? "applied" : "dry-run"} candidates=${result.candidates.length} ` +
        `changed=${result.changed_objects} reclaimed=${result.reclaimed_bytes} bytes\n` +
        renderInventory(result.inventory),
    );
    return 0;
  };
}

export function makeRunEvidenceCompactHandler(
  deps: EvidenceProjectDeps,
): CommandHandler<EvidenceMaintenanceParsed> {
  return makeMaintenanceHandler("compact", deps);
}

export function makeRunEvidenceGcHandler(
  deps: EvidenceProjectDeps,
): CommandHandler<EvidenceMaintenanceParsed> {
  return makeMaintenanceHandler("gc", deps);
}
