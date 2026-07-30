# Clone drift review

## Purpose

This task must not accept the beta.2 clone increase merely by refreshing the
baseline. The review classifies every newly reported clone pair and records
the source-level removal that preserves the affected output contract.

## Measurements

| Snapshot | Sources | Clones | Duplicated lines | Duplicated tokens |
| --- | ---: | ---: | ---: | ---: |
| Pre-beta.2 baseline (`8d8add355`) | 1253 | 90 | 1431 | 9976 |
| Beta.2 candidate before this repair | 1274 | 93 | 1462 | 10292 |
| This repair after source-level deduplication | 1274 | 90 | 1431 | 9977 |

The candidate added three clone groups, 31 duplicated lines, and 316 duplicated
tokens. The repair removes all three groups; clone count and duplicated lines
return to the pre-beta.2 level. The one-token difference is within an existing
remaining clone group after the canonical helper rename; it is not an accepted
new group and does not increase clone count or duplicated lines.

## Reviewed groups and disposition

1. `packages/agentplane/src/context/reindex-projection.ts` had two copies of
   the projection-window construction loop (16 lines, 139 tokens). They differed
   only by the literal row kind: `text-window` versus `json-window`. The shared
   `appendWindowRows` helper retains each caller's row kind, path reference,
   content hash, content type, source references, text fields, and byte count.
   Existing projection tests cover text and JSONL window output.
2. `packages/agentplane/src/context/sqlite.ts` had two copies of the common
   SQLite projection-row mapping (9 lines, 86 tokens), in read and search
   results. `projectionRowFields` now constructs only those shared fields.
   The read path retains `search_text` and `preview_text`; the search path
   retains `preview_text`, rank, and highlight. Existing SQLite tests cover
   both read and scoped FTS search output.
3. `packages/agentplane/src/runner/usecases/task-knowledge-request-scope.ts`
   and `task-knowledge-retrieval.ts` independently inferred a canonical
   knowledge kind from a reference (9 lines, 90 tokens). The retrieval path
   now calls `canonicalKnowledgeKind` from the request-scope module. The new
   focused test covers all five accepted kinds and malformed/unsupported refs.

## Verification

Run `bun run clone:check` to validate the regenerated baseline. Focused
projection, SQLite, request-scope, and task-knowledge request tests validate
the affected output contracts. Full type and contract verification remains a
separate gate before evaluator review.
