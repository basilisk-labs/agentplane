---
id: "202602120734-K6QAX2"
title: "Docs IA: restructure and canonical mapping"
status: "DOING"
priority: "high"
owner: "DOCS"
depends_on: []
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
    body: "Start: restructure docs IA with a canonical ownership map, clear section boundaries, and synchronized navigation metadata."
events:
  -
    type: "status"
    at: "2026-02-12T07:40:20.231Z"
    author: "DOCS"
    from: "TODO"
    to: "DOING"
    note: "Start: restructure docs IA with a canonical ownership map, clear section boundaries, and synchronized navigation metadata."
doc_version: 2
doc_updated_at: "2026-02-12T07:40:20.231Z"
doc_updated_by: "DOCS"
description: "Audit docs tree, map each page to source code ownership, eliminate drift/duplication, and define final information architecture, navigation, and section responsibilities."
id_source: "generated"
---
## Summary


## Scope


## Plan


## Risks


## Verification


## Rollback Plan


## Verify Steps

1. Validate docs navigation consistency across docs/index.mdx, docs/docs.json, and docs/README.md.
2. Ensure IA mapping references existing paths and current CLI/code modules.
3. Run markdown/docs sanity check by rendering link targets mentally and with ripgrep path checks.
Expected: one canonical IA page exists, nav references it, and no stale/duplicate section ownership remains.
