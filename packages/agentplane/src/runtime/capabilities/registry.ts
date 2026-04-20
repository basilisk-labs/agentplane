import type {
  AgentplaneCapabilityEntry,
  AgentplaneCapabilityFilter,
  AgentplaneCapabilityRegistry,
} from "./model.js";

function sortStrings(values: readonly string[] | undefined): string[] | undefined {
  if (!values || values.length === 0) return undefined;
  return [...values].filter((value) => value.trim().length > 0).toSorted();
}

function normalizeEntry(entry: AgentplaneCapabilityEntry): AgentplaneCapabilityEntry {
  const id = entry.id.trim();
  const supportedValues = sortStrings(entry.supported_values);
  const blockedBy = sortStrings(entry.blocked_by);
  if (!id) {
    throw new Error("Capability entries require a non-empty id");
  }
  return {
    id,
    kind: entry.kind,
    availability: entry.availability,
    source: {
      id: entry.source.id,
      detail: entry.source.detail,
    },
    ...(entry.summary ? { summary: entry.summary } : {}),
    ...(Object.hasOwn(entry, "value") ? { value: entry.value } : {}),
    ...(supportedValues ? { supported_values: supportedValues } : {}),
    ...(entry.reason ? { reason: entry.reason } : {}),
    ...(blockedBy ? { blocked_by: blockedBy } : {}),
    ...(entry.metadata ? { metadata: structuredClone(entry.metadata) } : {}),
  };
}

function entrySignature(entry: AgentplaneCapabilityEntry): string {
  return JSON.stringify(entry);
}

function compareEntries(left: AgentplaneCapabilityEntry, right: AgentplaneCapabilityEntry): number {
  return (
    left.id.localeCompare(right.id) ||
    left.kind.localeCompare(right.kind) ||
    left.availability.localeCompare(right.availability) ||
    left.source.id.localeCompare(right.source.id) ||
    left.source.detail.localeCompare(right.source.detail)
  );
}

export function createCapabilityRegistry(
  entries: readonly AgentplaneCapabilityEntry[] = [],
): AgentplaneCapabilityRegistry {
  const seen = new Set<string>();
  const normalized: AgentplaneCapabilityEntry[] = [];

  for (const entry of entries) {
    const candidate = normalizeEntry(entry);
    const signature = entrySignature(candidate);
    if (seen.has(signature)) continue;
    seen.add(signature);
    normalized.push(candidate);
  }

  normalized.sort(compareEntries);
  return { entries: normalized };
}

export function mergeCapabilityRegistries(
  ...registries: readonly (AgentplaneCapabilityRegistry | null | undefined)[]
): AgentplaneCapabilityRegistry {
  return createCapabilityRegistry(registries.flatMap((registry) => registry?.entries ?? []));
}

export function listCapabilities(
  registry: AgentplaneCapabilityRegistry,
  filter?: AgentplaneCapabilityFilter,
): AgentplaneCapabilityEntry[] {
  return registry.entries.filter((entry) => {
    if (filter?.availability && entry.availability !== filter.availability) return false;
    if (filter?.kind && entry.kind !== filter.kind) return false;
    if (filter?.source_id && entry.source.id !== filter.source_id) return false;
    return true;
  });
}

export function getCapabilityEntries(
  registry: AgentplaneCapabilityRegistry,
  id: string,
): AgentplaneCapabilityEntry[] {
  return registry.entries.filter((entry) => entry.id === id);
}
