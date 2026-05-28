import { ValidationError } from "../../shared/errors.js";
import { isRecord } from "../../shared/guards.js";

export type CatalogKind = "blueprint" | "pack";

export type CatalogEntry = {
  id: string;
  path?: string;
  name?: string;
  summary?: string;
  version?: string;
  tags?: string[];
  activation?: {
    recommended_allowed_ids?: string[];
  };
  versions?: {
    version: string;
    url: string;
    sha256: string;
    min_agentplane_version?: string;
    tags?: string[];
  }[];
  blueprints?: {
    id: string;
    version?: string;
    required?: boolean;
  }[];
};

export type BlueprintCatalogIndex = {
  schema_version: 1;
  catalog_id: string;
  name: string;
  description?: string;
  blueprints: CatalogEntry[];
  packs: CatalogEntry[];
};

export type BlueprintCatalogSource = {
  schema_version: 1;
  source: string;
};

export type CatalogBlueprintManifest = {
  schema_version: 1;
  id: string;
  version: string;
  name: string;
  summary: string;
  definition: {
    id: string;
    path: string;
  };
  activation?: {
    recommended_allowed_ids?: string[];
  };
};

export type CatalogPackManifest = {
  schema_version: 1;
  id: string;
  version: string;
  name: string;
  summary: string;
  blueprints: {
    id: string;
    version?: string;
    required?: boolean;
  }[];
  activation?: {
    recommended_allowed_ids?: string[];
  };
};

export type InstalledBlueprint = {
  catalogId: string;
  blueprintId: string;
  projectPath: string;
  cachePath: string;
  recommendedAllowedIds: string[];
};

function parseCatalogEntry(raw: unknown, field: string): CatalogEntry {
  if (!isRecord(raw)) throw new ValidationError({ message: `${field} entry must be an object.` });
  const id = typeof raw.id === "string" ? raw.id.trim() : "";
  const entryPath = typeof raw.path === "string" ? raw.path.trim() : undefined;
  const versions = Array.isArray(raw.versions)
    ? raw.versions.map((version) => {
        if (!isRecord(version)) {
          throw new ValidationError({ message: `${field} versions entries must be objects.` });
        }
        const versionId = typeof version.version === "string" ? version.version.trim() : "";
        const url = typeof version.url === "string" ? version.url.trim() : "";
        const sha256 = typeof version.sha256 === "string" ? version.sha256.trim() : "";
        if (!versionId || !url || !sha256) {
          throw new ValidationError({
            message: `${field} versions entries must contain version, url, and sha256.`,
          });
        }
        return {
          version: versionId,
          url,
          sha256,
          min_agentplane_version:
            typeof version.min_agentplane_version === "string"
              ? version.min_agentplane_version
              : undefined,
          tags: Array.isArray(version.tags)
            ? version.tags.filter((tag): tag is string => typeof tag === "string")
            : undefined,
        };
      })
    : undefined;
  const blueprints = Array.isArray(raw.blueprints)
    ? raw.blueprints.map((entry) => {
        if (!isRecord(entry) || typeof entry.id !== "string" || !entry.id.trim()) {
          throw new ValidationError({ message: `${field} blueprint entries must contain id.` });
        }
        return {
          id: entry.id.trim(),
          version: typeof entry.version === "string" ? entry.version.trim() : undefined,
          required: entry.required === true,
        };
      })
    : undefined;
  if (!id || (!entryPath && !versions && !blueprints)) {
    throw new ValidationError({
      message: `${field} entry must contain id plus path, versions, or blueprints.`,
    });
  }
  return {
    id,
    path: entryPath,
    name: typeof raw.name === "string" ? raw.name : undefined,
    summary: typeof raw.summary === "string" ? raw.summary : undefined,
    version: typeof raw.version === "string" ? raw.version : undefined,
    tags: Array.isArray(raw.tags)
      ? raw.tags.filter((tag): tag is string => typeof tag === "string")
      : undefined,
    activation: isRecord(raw.activation)
      ? {
          recommended_allowed_ids: Array.isArray(raw.activation.recommended_allowed_ids)
            ? raw.activation.recommended_allowed_ids.filter(
                (allowedId): allowedId is string => typeof allowedId === "string",
              )
            : undefined,
        }
      : undefined,
    versions,
    blueprints,
  };
}

export function parseCatalogIndex(raw: unknown): BlueprintCatalogIndex {
  if (!isRecord(raw)) {
    throw new ValidationError({ message: "Blueprint catalog index must be an object." });
  }
  if (raw.schema_version !== 1) {
    throw new ValidationError({ message: "Blueprint catalog index schema_version must be 1." });
  }
  const catalogId = typeof raw.catalog_id === "string" ? raw.catalog_id.trim() : "";
  const name = typeof raw.name === "string" ? raw.name.trim() : "";
  if (!catalogId || !name) {
    throw new ValidationError({
      message: "Blueprint catalog index must contain catalog_id and name.",
    });
  }
  if (!Array.isArray(raw.blueprints)) {
    throw new ValidationError({ message: "Blueprint catalog index blueprints must be an array." });
  }
  if (!Array.isArray(raw.packs)) {
    throw new ValidationError({ message: "Blueprint catalog index packs must be an array." });
  }
  return {
    schema_version: 1,
    catalog_id: catalogId,
    name,
    description: typeof raw.description === "string" ? raw.description : undefined,
    blueprints: raw.blueprints.map((entry) => parseCatalogEntry(entry, "blueprints")),
    packs: raw.packs.map((entry) => parseCatalogEntry(entry, "packs")),
  };
}

export function parseCatalogSource(raw: unknown): BlueprintCatalogSource {
  if (!isRecord(raw) || raw.schema_version !== 1 || typeof raw.source !== "string") {
    throw new ValidationError({ message: "Blueprint catalog cache source is invalid." });
  }
  return { schema_version: 1, source: raw.source };
}

export function assertSafeCatalogPathSegment(value: string, label: string): void {
  if (
    !value ||
    value === "." ||
    value === ".." ||
    value.includes("..") ||
    value.includes("/") ||
    value.includes("\\")
  ) {
    throw new ValidationError({
      message: `${label} must be a safe path segment.`,
      context: { value },
    });
  }
}

export function parseBlueprintManifest(raw: unknown): CatalogBlueprintManifest {
  if (!isRecord(raw) || raw.schema_version !== 1) {
    throw new ValidationError({ message: "Catalog blueprint manifest schema_version must be 1." });
  }
  const definition = isRecord(raw.definition) ? raw.definition : {};
  const manifest = {
    schema_version: 1,
    id: typeof raw.id === "string" ? raw.id.trim() : "",
    version: typeof raw.version === "string" ? raw.version.trim() : "",
    name: typeof raw.name === "string" ? raw.name.trim() : "",
    summary: typeof raw.summary === "string" ? raw.summary.trim() : "",
    definition: {
      id: typeof definition.id === "string" ? definition.id.trim() : "",
      path: typeof definition.path === "string" ? definition.path.trim() : "",
    },
    activation: isRecord(raw.activation)
      ? {
          recommended_allowed_ids: Array.isArray(raw.activation.recommended_allowed_ids)
            ? raw.activation.recommended_allowed_ids.filter(
                (id): id is string => typeof id === "string",
              )
            : undefined,
        }
      : undefined,
  } satisfies CatalogBlueprintManifest;
  if (!manifest.id || !manifest.version || !manifest.definition.id || !manifest.definition.path) {
    throw new ValidationError({
      message:
        "Catalog blueprint manifest must contain id, version, definition.id, and definition.path.",
    });
  }
  return manifest;
}

export function parsePackManifest(raw: unknown): CatalogPackManifest {
  if (!isRecord(raw) || raw.schema_version !== 1) {
    throw new ValidationError({ message: "Blueprint pack manifest schema_version must be 1." });
  }
  if (!Array.isArray(raw.blueprints)) {
    throw new ValidationError({ message: "Blueprint pack manifest blueprints must be an array." });
  }
  const pack: CatalogPackManifest = {
    schema_version: 1,
    id: typeof raw.id === "string" ? raw.id.trim() : "",
    version: typeof raw.version === "string" ? raw.version.trim() : "",
    name: typeof raw.name === "string" ? raw.name.trim() : "",
    summary: typeof raw.summary === "string" ? raw.summary.trim() : "",
    blueprints: raw.blueprints.map((entry) => {
      if (!isRecord(entry) || typeof entry.id !== "string" || !entry.id.trim()) {
        throw new ValidationError({ message: "Blueprint pack entries must contain id." });
      }
      return {
        id: entry.id.trim(),
        version: typeof entry.version === "string" ? entry.version.trim() : undefined,
        required: entry.required === true,
      };
    }),
    activation: isRecord(raw.activation)
      ? {
          recommended_allowed_ids: Array.isArray(raw.activation.recommended_allowed_ids)
            ? raw.activation.recommended_allowed_ids.filter(
                (id): id is string => typeof id === "string",
              )
            : undefined,
        }
      : undefined,
  };
  if (!pack.id || !pack.version) {
    throw new ValidationError({ message: "Blueprint pack manifest must contain id and version." });
  }
  return pack;
}
