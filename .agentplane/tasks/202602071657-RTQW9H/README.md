---
id: "202602071657-RTQW9H"
title: "Docs: Update command guide/help/AGENTS for 2-step verify + spike flow"
status: "DONE"
priority: "high"
owner: "DOCS"
depends_on:
  - "202602071657-8QZ0S3"
tags:
  - "docs"
  - "workflow"
  - "help"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-02-07T18:15:03.496Z"
  updated_by: "ORCHESTRATOR"
  note: "OK"
verification:
  state: "ok"
  updated_at: "2026-02-07T18:23:30.053Z"
  updated_by: "DOCS"
  note: "Docs updated; tests/lint passed"
commit:
  hash: "547c7f7682fbccc4c02851516711ee0e294585b3"
  message: "✅ RTQW9H docs: update help/guide for Verify Steps + spike flow"
comments:
  -
    author: "DOCS"
    body: "Start: update help/command guide/AGENTS docs for two-stage verification and spike->implementation workflow."
  -
    author: "DOCS"
    body: "Verified: Updated CLI help/command guide/AGENTS for Verify Steps vs Verification + spike derive/verify-show; bun run test:fast and bun run lint passed."
doc_version: 2
doc_updated_at: "2026-02-07T18:23:42.440Z"
doc_updated_by: "DOCS"
description: "Document Verify Steps vs Verification, new gates, and spike->implementation derive workflow."
---
## Summary

Update CLI help/command guide/AGENTS for two-stage verification (Verify Steps -> Verification) and spike -> implementation flow.

## Scope

- packages/agentplane/src/cli/help.ts
- packages/agentplane/src/cli/command-guide.ts
- AGENTS.md

## Plan

1) Update command guide/help to reflect two-stage verification: Verify Steps (ex-ante) + Verification (ex-post, appended by verify).
2) Document new gates and config switches.
3) Document spike tag convention + derive and verify-show commands.
4) Run bun run test:fast.

## Risks

- Docs drift from implemented CLI behavior.
- Help/guide omissions could mislead workflow.

## Verify Steps

### Scope
Update only help/guide/policy docs for two-stage verification and spike workflow.

### Checks
1) Help lists: task plan, task verify-show, task derive.
2) Command guide explains: Verify Steps (ex-ante) vs Verification (append-only, ex-post).
3) AGENTS policy documents the same semantics and spike derive convention.

### Evidence / Commands
- bun run test:fast
- bun run lint

### Pass criteria
- Tests and lint exit 0.
- Doc text mentions the new commands and semantics.

## Verification

### Plan

### Results

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-02-07T18:23:30.053Z — VERIFY — ok

By: DOCS

Note: Docs updated; tests/lint passed

VerifyStepsRef: doc_version=2, doc_updated_at=2026-02-07T18:21:42.307Z, excerpt_hash=sha256:cc1d929f4af07c13cb321039de0ef16355f81d68c598f5d5a97895daa306b54d

Details:

bun run test:fast (pass); bun run lint (pass)

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

Revert the docs commit for this task.
