import { parseDocument, stringify } from "yaml";

import { isRecord } from "../../shared/guards.js";

export const WIKI_MODALITIES = [
  "factual_claim",
  "observation",
  "assumption",
  "hypothesis",
  "decision",
  "policy",
  "preference",
  "requirement",
  "risk",
  "capability",
  "definition",
  "workflow",
  "deprecation",
] as const;

export type WikiModality = (typeof WIKI_MODALITIES)[number];

export type ParsedWikiFrontmatter = {
  raw: string | null;
  root: Record<string, unknown> | null;
  context: Record<string, unknown> | null;
  errors: string[];
};

export function extractWikiFrontmatter(text: string): string | null {
  const normalized = text.replaceAll("\r\n", "\n");
  if (!normalized.startsWith("---\n")) return null;
  const end = normalized.indexOf("\n---", 4);
  if (end === -1) return null;
  return normalized.slice(4, end).trim();
}

export function parseWikiFrontmatter(rel: string, text: string): ParsedWikiFrontmatter {
  const raw = extractWikiFrontmatter(text);
  if (!raw) return { raw: null, root: null, context: null, errors: [] };

  const document = parseDocument(raw, { prettyErrors: true });
  if (document.errors.length > 0) {
    return {
      raw,
      root: null,
      context: null,
      errors: document.errors.map((error) => `${rel}: invalid YAML frontmatter: ${error.message}`),
    };
  }

  const value = document.toJS() as unknown;
  if (!isRecord(value)) {
    return {
      raw,
      root: null,
      context: null,
      errors: [`${rel}: YAML frontmatter must be a mapping`],
    };
  }
  return {
    raw,
    root: value,
    context: isRecord(value.agentplane_context) ? value.agentplane_context : null,
    errors: [],
  };
}

function sourceRef(value: string): { path: string; ref: string; label: string } {
  return {
    path: value,
    ref: value,
    label: value.includes("#") ? (value.split("#")[0] ?? value) : value,
  };
}

export function renderWikiFrontmatter(opts: {
  canonicalId: string;
  title: string;
  modality: WikiModality;
  status: string;
  visibility: string;
  sourceRefs: string[];
  claims?: string[];
  graphEntities?: string[];
  graphEdges?: string[];
  conflicts?: string[];
  aliases?: string[];
  tags?: string[];
  updatedBy: string;
  noGraphRefReason?: string;
  existingRoot?: Record<string, unknown> | null;
}): string {
  const existingContext = isRecord(opts.existingRoot?.agentplane_context)
    ? opts.existingRoot.agentplane_context
    : {};
  const agentplaneContext: Record<string, unknown> = {
    ...existingContext,
    schema_version: 1,
    artifact_type: "wiki_page",
    canonical_id: opts.canonicalId,
    title: opts.title,
    modality: opts.modality,
    epistemic_status: opts.status,
    visibility: opts.visibility,
    source_refs: opts.sourceRefs.map((value) => sourceRef(value)),
    claims: opts.claims ?? [],
    graph_refs: { entities: opts.graphEntities ?? [], edges: opts.graphEdges ?? [] },
    conflicts: opts.conflicts ?? [],
    updated_by: opts.updatedBy,
  };
  if (opts.noGraphRefReason && (opts.graphEntities?.length ?? 0) === 0) {
    agentplaneContext.no_graph_ref_reason = opts.noGraphRefReason;
  } else {
    delete agentplaneContext.no_graph_ref_reason;
  }
  const existingAliases = Array.isArray(opts.existingRoot?.aliases)
    ? opts.existingRoot.aliases.filter((value): value is string => typeof value === "string")
    : [];
  const existingTags = Array.isArray(opts.existingRoot?.tags)
    ? opts.existingRoot.tags.filter((value): value is string => typeof value === "string")
    : [];
  const yaml = stringify(
    {
      ...opts.existingRoot,
      aliases: [...new Set([opts.title, ...(opts.aliases ?? []), ...existingAliases])],
      tags: [...new Set([...(opts.tags ?? ["agentplane/context"]), ...existingTags])],
      cssclasses: Array.isArray(opts.existingRoot?.cssclasses)
        ? opts.existingRoot.cssclasses
        : ["agentplane-context"],
      agentplane_context: agentplaneContext,
    },
    { lineWidth: 0 },
  ).trimEnd();
  return `---\n${yaml}\n---`;
}
