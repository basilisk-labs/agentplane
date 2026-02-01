---
id: "202602011810-HJSYDT"
title: "Remove external file references from docs"
status: "TODO"
priority: "med"
owner: "DOCS"
depends_on: []
tags: ["docs"]
doc_version: 2
doc_updated_at: "2026-02-01T18:12:30+00:00"
doc_updated_by: "agentctl"
description: "Make documentation self-contained by removing references to repo files like ROADMAP.md and AGENTS.md; replace with inline guidance or internal docs links; keep only external product/project links."
---
## Summary

Removed references to external repo files so docs are self-contained and only link to internal docs or product resources.

## Scope

Remove references to external repo files (e.g., ROADMAP.md, AGENTS.md, packages/spec paths) and replace them with self-contained wording across user/developer docs.

## Risks

May remove helpful navigation hints; ensure remaining links still point to internal docs and keep meaning intact.

## Verify Steps

Search docs for ROADMAP.md/AGENTS.md/packages/spec references; review key pages for clarity after removal.

## Rollback Plan

Revert the doc edits to restore external file references.

