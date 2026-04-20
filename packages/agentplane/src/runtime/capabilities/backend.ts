import type { TaskBackendCapabilities } from "../../backends/task-backend.js";

import { createCapabilityRegistry } from "./registry.js";
import type { AgentplaneCapabilityEntry, AgentplaneCapabilityRegistry } from "./model.js";

const BOOLEAN_CAPABILITY_FIELDS = [
  {
    field: "reads_from_projection_by_default",
    summary: "Reads task data from the projection by default",
  },
  {
    field: "writes_task_readmes",
    summary: "Writes task README documents through the backend",
  },
  {
    field: "supports_task_revisions",
    summary: "Supports backend task revisions",
  },
  {
    field: "supports_revision_guarded_writes",
    summary: "Supports revision-guarded writes",
  },
  {
    field: "may_access_network_on_read",
    summary: "May access the network while reading tasks",
  },
  {
    field: "may_access_network_on_write",
    summary: "May access the network while writing tasks",
  },
  {
    field: "supports_projection_refresh",
    summary: "Supports projection refresh",
  },
  {
    field: "supports_push_sync",
    summary: "Supports push synchronization",
  },
  {
    field: "supports_snapshot_export",
    summary: "Supports projection or task snapshot export",
  },
] as const satisfies readonly {
  field: keyof Pick<
    TaskBackendCapabilities,
    | "reads_from_projection_by_default"
    | "writes_task_readmes"
    | "supports_task_revisions"
    | "supports_revision_guarded_writes"
    | "may_access_network_on_read"
    | "may_access_network_on_write"
    | "supports_projection_refresh"
    | "supports_push_sync"
    | "supports_snapshot_export"
  >;
  summary: string;
}[];

const VALUE_CAPABILITY_FIELDS = [
  { field: "canonical_source", summary: "Canonical task source mode" },
  { field: "projection", summary: "Projection storage mode" },
  { field: "projection_read_mode", summary: "Projection read mode" },
] as const satisfies readonly {
  field: keyof Pick<
    TaskBackendCapabilities,
    "canonical_source" | "projection" | "projection_read_mode"
  >;
  summary: string;
}[];

function source(backendId: string) {
  return {
    id: "backend" as const,
    detail: backendId,
  };
}

function fieldId(backendId: string, field: string): string {
  return `backend.${backendId}.${field}`;
}

export function resolveTaskBackendCapabilityRegistry(opts: {
  backend_id: string;
  capabilities: TaskBackendCapabilities | null | undefined;
}): AgentplaneCapabilityRegistry {
  if (!opts.capabilities) {
    return createCapabilityRegistry([
      {
        id: fieldId(opts.backend_id, "capabilities"),
        kind: "backend_field",
        availability: "unavailable",
        source: source(opts.backend_id),
        summary: "Declared task backend capabilities",
        reason: "The task backend did not expose a capability descriptor.",
        metadata: { backend_id: opts.backend_id },
      },
    ]);
  }

  const entries: AgentplaneCapabilityEntry[] = [];

  for (const field of VALUE_CAPABILITY_FIELDS) {
    const value = opts.capabilities[field.field];
    entries.push({
      id: fieldId(opts.backend_id, field.field),
      kind: "backend_field",
      availability: value === undefined ? "unavailable" : "available",
      source: source(opts.backend_id),
      summary: field.summary,
      value,
      ...(value === undefined
        ? {
            reason: "The task backend omitted this capability field.",
          }
        : {}),
      metadata: { backend_id: opts.backend_id, field: field.field },
    });
  }

  for (const field of BOOLEAN_CAPABILITY_FIELDS) {
    const value = opts.capabilities[field.field];
    entries.push({
      id: fieldId(opts.backend_id, field.field),
      kind: "backend_field",
      availability: value ? "available" : "unavailable",
      source: source(opts.backend_id),
      summary: field.summary,
      value,
      ...(value
        ? {}
        : {
            reason: "The task backend declares this feature unavailable.",
          }),
      metadata: { backend_id: opts.backend_id, field: field.field },
    });
  }

  return createCapabilityRegistry(entries);
}
