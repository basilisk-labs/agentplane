import path from "node:path";

import { STATUSES, type WikiStatus } from "../commands/context/wiki-page.js";
import { toPosix } from "./context-utils.js";
import type { ContextExtractionItem } from "./sgr-extraction.js";

const EPISTEMIC_RANK: Partial<Record<WikiStatus, number>> = {
  mention: 0,
  extracted_candidate: 1,
  assumption: 1,
  hypothesis: 1,
  sourced_claim: 2,
  corroborated_claim: 3,
  reviewed_claim: 4,
  accepted_team_knowledge: 5,
  canonical_org_knowledge: 6,
};

function unique(values: Iterable<string>): string[] {
  return [...new Set([...values].filter(Boolean))].toSorted();
}

function uniqueStable(values: Iterable<string>): string[] {
  return [...new Set([...values].filter(Boolean))];
}

function assertWikiPath(root: string, input: string): string {
  const rel = toPosix(input.trim());
  const abs = path.resolve(root, rel);
  const wikiRoot = path.resolve(root, "context/wiki");
  if (!rel.endsWith(".md") || (!abs.startsWith(`${wikiRoot}${path.sep}`) && abs !== wikiRoot)) {
    throw new Error(
      `Context wiki synthesis path must stay under context/wiki and end in .md: ${input}`,
    );
  }
  return toPosix(path.relative(root, abs));
}

function derivedPageStatus(items: ContextExtractionItem[]): WikiStatus {
  if (items.some((item) => item.status === "conflict" || item.kind === "contradiction")) {
    return "disputed";
  }
  if (items.some((item) => item.status === "stale" || item.validity === "deprecated")) {
    return "deprecated";
  }
  if (items.some((item) => item.status === "accepted")) return "sourced_claim";
  if (items.some((item) => item.status === "unresolved")) return "hypothesis";
  return "extracted_candidate";
}

export function resolvedWikiPageStatus(
  items: ContextExtractionItem[],
  conflicts: string[],
  existingStatus: unknown,
): WikiStatus {
  const derived = conflicts.length > 0 ? "disputed" : derivedPageStatus(items);
  if (typeof existingStatus !== "string" || !STATUSES.has(existingStatus as WikiStatus)) {
    return derived;
  }
  const existing = existingStatus as WikiStatus;
  const derivedRank = EPISTEMIC_RANK[derived];
  const existingRank = EPISTEMIC_RANK[existing];
  if (derivedRank !== undefined && existingRank !== undefined && existingRank > derivedRank) {
    return existing;
  }
  if (derivedRank !== undefined && existingRank === undefined) return existing;
  return derived;
}

type PageCreation = NonNullable<ContextExtractionItem["page_creation"]>;

export type WikiPageRow = {
  items: ContextExtractionItem[];
  page: PageCreation;
  rel: string;
};

function singleDeclaredValue(
  rows: { item: ContextExtractionItem; page: PageCreation }[],
  field: keyof PageCreation,
  rel: string,
): string {
  const values = unique(
    rows.map(({ page }) => {
      const value = page[field];
      return typeof value === "string" ? value.trim() : "";
    }),
  );
  if (values.length > 1) {
    throw new Error(
      `Duplicate page_creation items for ${rel} disagree on ${String(field)}: ${values.join(", ")}`,
    );
  }
  return values[0] ?? "";
}

export function mergeWikiPageRows(root: string, pageItems: ContextExtractionItem[]): WikiPageRow[] {
  const grouped = new Map<string, { item: ContextExtractionItem; page: PageCreation }[]>();
  for (const item of pageItems) {
    const page = item.page_creation;
    if (!page) throw new Error(`Missing page_creation payload for ${item.id}`);
    const rel = assertWikiPath(root, page.path);
    const rows = grouped.get(rel) ?? [];
    rows.push({ item, page });
    grouped.set(rel, rows);
  }

  return [...grouped.entries()]
    .toSorted(([left], [right]) => left.localeCompare(right))
    .map(([rel, unsortedRows]) => {
      const rows = unsortedRows.toSorted((left, right) =>
        left.item.id.localeCompare(right.item.id),
      );
      const primary = rows[0];
      if (!primary) throw new Error(`Missing page_creation row for ${rel}`);
      const pageType = singleDeclaredValue(rows, "page_type", rel);
      const familyId = singleDeclaredValue(rows, "family_id", rel);
      const decision = singleDeclaredValue(rows, "decision", rel);
      const title = singleDeclaredValue(rows, "title", rel);
      const visibility = singleDeclaredValue(rows, "visibility", rel);
      return {
        rel,
        items: rows.map(({ item }) => item),
        page: {
          ...primary.page,
          path: rel,
          page_type: pageType,
          family_id: familyId,
          decision,
          canonical_entity_ids: uniqueStable(
            rows.flatMap(({ page }) => page.canonical_entity_ids ?? []),
          ),
          ...(title ? { title } : {}),
          ...(visibility ? { visibility } : {}),
        },
      };
    });
}
