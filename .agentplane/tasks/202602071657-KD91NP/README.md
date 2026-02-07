---
id: "202602071657-KD91NP"
title: "Docs: Define spike tag convention"
status: "DOING"
priority: "med"
owner: "DOCS"
depends_on:
  - "202602071657-365ZPK"
tags:
  - "docs"
  - "workflow"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-02-07T17:40:15.345Z"
  updated_by: "ORCHESTRATOR"
  note: "OK"
verification:
  state: "ok"
  updated_at: "2026-02-07T17:40:46.543Z"
  updated_by: "DOCS"
  note: "Documented tag=spike convention and expected outputs; bun run test:fast."
commit: null
comments:
  -
    author: "DOCS"
    body: "Start: document spike tag convention for research tasks without schema changes."
doc_version: 2
doc_updated_at: "2026-02-07T17:40:46.545Z"
doc_updated_by: "DOCS"
description: "Adopt tag=spike as task kind convention without schema changes."
---
## Summary


## Scope


## Plan

1) Document tag=spike as the convention for research-only tasks (no schema changes).
2) Clarify that implementation tasks should depend on the spike where appropriate.
3) Run bun run test:fast.

## Risks


## Verification

### Plan

### Results

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-02-07T17:40:46.543Z — VERIFY — ok

By: DOCS

Note: Documented tag=spike convention and expected outputs; bun run test:fast.

<!-- END VERIFICATION RESULTS -->

## Rollback Plan
