---
id: "202602081506-JYTFF2"
title: "Close commit: enforce message contract with tests"
status: "DONE"
priority: "high"
owner: "ORCHESTRATOR"
depends_on:
  - "202602081506-R18Y1Q"
tags:
  - "testing"
  - "cli"
  - "code"
verify:
  - "bun run test:full"
plan_approval:
  state: "approved"
  updated_at: "2026-02-08T15:07:24.617Z"
  updated_by: "ORCHESTRATOR"
  note: "OK"
verification:
  state: "ok"
  updated_at: "2026-02-08T15:44:44.712Z"
  updated_by: "ORCHESTRATOR"
  note: "Verified: bun run test:full. Added unit tests for close message builder and CLI test asserting commit --close stages only README and produces policy-compliant subject/body."
commit:
  hash: "d84e59bc9b509bc76f02a18680a78651288456f0"
  message: "✨ JYTFF2 testing: enforce close commit contract"
comments:
  -
    author: "ORCHESTRATOR"
    body: "Start: implement unit and CLI tests that enforce the commit --close subject/body contract and determinism."
  -
    author: "ORCHESTRATOR"
    body: "Verified: bun run test:full; close-message unit tests assert deterministic subject/body and key files filtering, and CLI tests assert commit --close stages only the task README."
doc_version: 2
doc_updated_at: "2026-02-08T15:44:55.187Z"
doc_updated_by: "ORCHESTRATOR"
description: "Add unit and CLI-level tests that enforce the close message contract (subject/body shape, deterministic ordering, key files selection) and guard against drift."
id_source: "generated"
---
## Summary

(See title/description.)

## Scope

(See description.)

## Plan

(See task README Plan section.)

## Risks

- Regressions in CLI behavior or tests due to contract changes.

## Verification

### Plan

### Results

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-02-08T15:44:44.712Z — VERIFY — ok

By: ORCHESTRATOR

Note: Verified: bun run test:full. Added unit tests for close message builder and CLI test asserting commit --close stages only README and produces policy-compliant subject/body.

VerifyStepsRef: doc_version=2, doc_updated_at=2026-02-08T15:44:35.668Z, excerpt_hash=sha256:038bac0b0b980d7c080d23225688919396635d853ec4ee986557ad3e9311c2d5

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert the implementation commit and re-run bun run test:full.

## Verify Steps

### Scope
- Unit tests for close message builder contract.
- CLI tests for `agentplane commit <task-id> --close` invariants.

### Checks
- bun run typecheck
- bun run lint
- bun run test:full

### Pass criteria
- All checks pass.
- Tests enforce subject/body shape and deterministic key files selection.
