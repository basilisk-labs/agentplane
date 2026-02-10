---
id: "202602101802-G506XM"
title: "Docs final: consistency, style, and cross-linking"
status: "DOING"
priority: "high"
owner: "DOCS"
depends_on:
  - "202602101802-TSVKN2"
tags:
  - "docs"
verify: []
plan_approval:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
verification:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
commit: null
comments:
  -
    author: "DOCS"
    body: "Start: Final editorial pass across docs for terminology consistency, cross-links, and removal of stale statements."
events:
  -
    type: "status"
    at: "2026-02-10T18:37:03.449Z"
    author: "DOCS"
    from: "TODO"
    to: "DOING"
    note: "Start: Final editorial pass across docs for terminology consistency, cross-links, and removal of stale statements."
doc_version: 2
doc_updated_at: "2026-02-10T18:38:21.585Z"
doc_updated_by: "DOCS"
description: "Final editorial pass: terminology consistency, cross-links, nav ordering, and remove stale statements."
id_source: "generated"
---
## Summary

Final editorial pass: ensure terminology consistency, reduce ambiguity, and improve cross-links across docs after recent workflow updates.

## Scope

In-scope: docs/user/tasks-and-backends.mdx, docs/user/backends.mdx (and any cross-linking or terminology notes needed).

## Plan

1. Scan docs for terminology collisions and ambiguous aliases.
2. Add concise notes to reduce confusion (for example: sync alias vs backend sync).
3. Run format check.

## Risks

Risk: small wording changes introduce new drift. Mitigation: keep edits scoped to ambiguity reduction and verify via `rg` searches.

## Verify Steps

- Confirm the docs explicitly mention the `agentplane sync` alias and the preferred `agentplane backend sync` form.
- Confirm formatting checks pass (`bun run format:check`).

## Verification

### Plan

### Results

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

Revert the commits for this task to restore prior wording.
