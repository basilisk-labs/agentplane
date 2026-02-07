---
id: "202602071847-P7YDP0"
title: "Policy: restore reasoning bullets in AGENTS templates"
status: "DONE"
priority: "med"
owner: "DOCS"
depends_on: []
tags:
  - "docs"
  - "policy"
  - "agents"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-02-07T18:48:19.832Z"
  updated_by: "USER"
  note: "OK"
verification:
  state: "ok"
  updated_at: "2026-02-07T18:49:13.872Z"
  updated_by: "DOCS"
  note: "Reasoning bullets restored"
commit:
  hash: "7aa95c867696d6493faa74aa3656d86b33c1bdee"
  message: "✅ P7YDP0 policy: restore explicit reasoning bullets"
comments:
  -
    author: "DOCS"
    body: "Start: restore explicit reasoning bullets in AGENTS docs while keeping expanded OUTPUT CONTRACTS section."
  -
    author: "DOCS"
    body: "Verified: Restored explicit reasoning bullets in AGENTS.md and packages/agentplane/assets/AGENTS.md while keeping OUTPUT CONTRACTS; bun run test:fast and bun run lint passed."
doc_version: 2
doc_updated_at: "2026-02-07T18:49:18.732Z"
doc_updated_by: "DOCS"
description: "Bring AGENTS.md and packages/agentplane/assets/AGENTS.md back to the expanded reasoning guidance while preserving the explicit reasoning bullets section."
---
## Summary

Restore the explicit reasoning bullets section in AGENTS policy docs while keeping the expanded OUTPUT CONTRACTS section.

## Scope


## Plan

1) Ensure AGENTS.md and packages/agentplane/assets/AGENTS.md include the explicit reasoning bullets (Plan/Assumptions/Decisions/Trade-offs/Verification criteria/Inference trace).\n2) Keep OUTPUT CONTRACTS section intact.\n3) Run bun run test:fast and bun run lint.

## Risks


## Verify Steps

<!-- TODO: FILL VERIFY STEPS -->

### Scope

### Checks

### Evidence / Commands

### Pass criteria

## Verification

### Plan

### Results

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-02-07T18:49:13.872Z — VERIFY — ok

By: DOCS

Note: Reasoning bullets restored

VerifyStepsRef: doc_version=2, doc_updated_at=2026-02-07T18:48:24.983Z, excerpt_hash=sha256:2efb66c1b9c8307de67b5b4db3a8c5a993803b2b5e90338efe45457a7124187e

Details:

bun run test:fast (pass); bun run lint (pass)

<!-- END VERIFICATION RESULTS -->

## Rollback Plan
