---
id: "202603231550-WYG9N5"
title: "Make finish commit gating atomic before task closure"
result_summary: "Made finish preflight atomic before task closure."
status: "DONE"
priority: "high"
owner: "CODER"
revision: 7
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "cli"
  - "workflow"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-23T15:50:47.364Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-03-23T15:56:43.772Z"
  updated_by: "CODER"
  note: "Verified finish preflight atomicity with finish.unit tests, source builds, and doctor."
commit:
  hash: "4c70bb7acada23d04da9a73c52313f1c4e70524a"
  message: "✅ WYG9N5 code: done"
comments:
  -
    author: "CODER"
    body: "Start: refactor finish into a preflight-plus-persist flow so confirm-gated comment commits cannot leave task state half-applied."
  -
    author: "CODER"
    body: "Verified: moved finish policy gating ahead of any DONE mutation, switched comment-driven finish to commit before persist, and kept local-store validation anchored to current task state during preflight."
events:
  -
    type: "status"
    at: "2026-03-23T15:50:48.073Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: refactor finish into a preflight-plus-persist flow so confirm-gated comment commits cannot leave task state half-applied."
  -
    type: "verify"
    at: "2026-03-23T15:56:43.772Z"
    author: "CODER"
    state: "ok"
    note: "Verified finish preflight atomicity with finish.unit tests, source builds, and doctor."
  -
    type: "status"
    at: "2026-03-23T15:58:08.008Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: moved finish policy gating ahead of any DONE mutation, switched comment-driven finish to commit before persist, and kept local-store validation anchored to current task state during preflight."
doc_version: 3
doc_updated_at: "2026-03-23T15:58:08.009Z"
doc_updated_by: "CODER"
description: "Refactor finish so policy and commit preflight happen before any DONE mutation, and record the real implementation commit only after a successful comment-driven commit."
sections:
  Summary: |-
    Make finish commit gating atomic before task closure
    
    Refactor finish so policy and commit preflight happen before any DONE mutation, and record the real implementation commit only after a successful comment-driven commit.
  Scope: |-
    - In scope: Refactor finish so policy and commit preflight happen before any DONE mutation, and record the real implementation commit only after a successful comment-driven commit.
    - Out of scope: unrelated refactors not required for "Make finish commit gating atomic before task closure".
  Plan: |-
    1. Implement the change for "Make finish commit gating atomic before task closure".
    2. Run required checks and capture verification evidence.
    3. Finalize task findings and finish with traceable commit metadata.
  Verify Steps: |-
    1. Run `bunx vitest run packages/agentplane/src/commands/task/finish.unit.test.ts`. Expected: finish enforces commit/status policy before mutating task state and records the real comment-driven commit hash on success.
    2. Run `bun run --filter=@agentplaneorg/core build && bun run --filter=agentplane build`. Expected: the finish/task command code builds cleanly from source.
    3. Run `AGENTPLANE_DEV_ALLOW_STALE_DIST=1 agentplane doctor`. Expected: no new finish-related workflow integrity findings are introduced.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    #### 2026-03-23T15:56:43.772Z — VERIFY — ok
    
    By: CODER
    
    Note: Verified finish preflight atomicity with finish.unit tests, source builds, and doctor.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-23T15:50:48.074Z, excerpt_hash=sha256:420d50eb31d10aaae91c905d06031c975a900ce64b2e506970425bf109bd927b
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Make finish commit gating atomic before task closure

Refactor finish so policy and commit preflight happen before any DONE mutation, and record the real implementation commit only after a successful comment-driven commit.

## Scope

- In scope: Refactor finish so policy and commit preflight happen before any DONE mutation, and record the real implementation commit only after a successful comment-driven commit.
- Out of scope: unrelated refactors not required for "Make finish commit gating atomic before task closure".

## Plan

1. Implement the change for "Make finish commit gating atomic before task closure".
2. Run required checks and capture verification evidence.
3. Finalize task findings and finish with traceable commit metadata.

## Verify Steps

1. Run `bunx vitest run packages/agentplane/src/commands/task/finish.unit.test.ts`. Expected: finish enforces commit/status policy before mutating task state and records the real comment-driven commit hash on success.
2. Run `bun run --filter=@agentplaneorg/core build && bun run --filter=agentplane build`. Expected: the finish/task command code builds cleanly from source.
3. Run `AGENTPLANE_DEV_ALLOW_STALE_DIST=1 agentplane doctor`. Expected: no new finish-related workflow integrity findings are introduced.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-03-23T15:56:43.772Z — VERIFY — ok

By: CODER

Note: Verified finish preflight atomicity with finish.unit tests, source builds, and doctor.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-23T15:50:48.074Z, excerpt_hash=sha256:420d50eb31d10aaae91c905d06031c975a900ce64b2e506970425bf109bd927b

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
