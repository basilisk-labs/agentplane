---
id: "202602071657-XWFVMV"
title: "Spec: Preserve frontmatter.verify back-compat"
status: "DOING"
priority: "high"
owner: "ORCHESTRATOR"
depends_on: []
tags:
  - "docs"
  - "spec"
  - "workflow"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-02-07T17:07:29.011Z"
  updated_by: "ORCHESTRATOR"
  note: "OK"
verification:
  state: "ok"
  updated_at: "2026-02-07T17:07:57.504Z"
  updated_by: "ORCHESTRATOR"
  note: "Back-compat documented: frontmatter verify remains optional string[]; bun run test:fast."
commit: null
comments:
  -
    author: "ORCHESTRATOR"
    body: "Start: lock in back-compat for frontmatter.verify without making it required by the new verification model."
doc_version: 2
doc_updated_at: "2026-02-07T17:07:57.508Z"
doc_updated_by: "ORCHESTRATOR"
description: "Confirm frontmatter.verify: string[] semantics remain unchanged; new system must not require it."
---
## Summary


## Scope


## Plan

1) Document that frontmatter.verify remains string[] and optional for back-compat.
2) Clarify that the two-stage model relies on Verify Steps + Verification sections, not frontmatter.verify.
3) Run bun run test:fast.

## Risks


## Verification

### Plan

### Results

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-02-07T17:07:57.504Z — VERIFY — ok

By: ORCHESTRATOR

Note: Back-compat documented: frontmatter verify remains optional string[]; bun run test:fast.

<!-- END VERIFICATION RESULTS -->

## Rollback Plan
