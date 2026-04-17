---
id: "202604171502-3MXKG6"
title: "Decompose runner prompt and adapter hotspots"
result_summary: "Merged via PR #406."
status: "DONE"
priority: "high"
owner: "CODER"
revision: 6
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "refactor"
  - "runner"
verify:
  - "bun run typecheck"
  - "bunx vitest run packages/agentplane/src/runner/context/base-prompts.test.ts packages/agentplane/src/runner/adapters/custom.test.ts packages/agentplane/src/runner/adapters/codex.test.ts --hookTimeout 60000 --testTimeout 60000"
plan_approval:
  state: "approved"
  updated_at: "2026-04-17T18:37:26.964Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-04-17T18:43:55.123Z"
  updated_by: "CODER"
  note: "Verified: split runner prompt assembly into shared base-source, overlay, and recipe collectors; extracted shared adapter runtime helpers for custom and codex; bun run typecheck passed; runner prompt/custom/codex adapter tests passed."
commit:
  hash: "e4814169aa38e22baf48c81fceab2b9417869fb8"
  message: "refactor/runner: Decompose runner prompt and adapter hotspots (3MXKG6) (#406)"
comments:
  -
    author: "CODER"
    body: "Start: split runner prompt assembly and adapter hotspots into smaller modules with shared primitives while preserving runner behavior under the declared adapter and prompt tests."
  -
    author: "INTEGRATOR"
    body: "Verified: PR #406 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
events:
  -
    type: "status"
    at: "2026-04-17T18:37:54.485Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: split runner prompt assembly and adapter hotspots into smaller modules with shared primitives while preserving runner behavior under the declared adapter and prompt tests."
  -
    type: "verify"
    at: "2026-04-17T18:43:55.123Z"
    author: "CODER"
    state: "ok"
    note: "Verified: split runner prompt assembly into shared base-source, overlay, and recipe collectors; extracted shared adapter runtime helpers for custom and codex; bun run typecheck passed; runner prompt/custom/codex adapter tests passed."
  -
    type: "status"
    at: "2026-04-17T19:00:44.592Z"
    author: "INTEGRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: PR #406 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
doc_version: 3
doc_updated_at: "2026-04-17T19:00:44.597Z"
doc_updated_by: "INTEGRATOR"
description: "Split runner/context/base-prompts.ts and the custom plus codex adapters into smaller modules with shared adapter primitives while preserving runner behavior."
sections:
  Summary: |-
    Decompose runner prompt and adapter hotspots
    
    Split runner/context/base-prompts.ts and the custom plus codex adapters into smaller modules with shared adapter primitives while preserving runner behavior.
  Scope: |-
    - In scope: Split runner/context/base-prompts.ts and the custom plus codex adapters into smaller modules with shared adapter primitives while preserving runner behavior.
    - Out of scope: unrelated refactors not required for "Decompose runner prompt and adapter hotspots".
  Plan: |-
    1. Split prompt-building responsibilities out of runner/context/base-prompts.ts.
    2. Extract shared adapter primitives from runner/adapters/custom.ts and runner/adapters/codex.ts without widening runner contracts.
    3. Re-run runner prompt and adapter tests plus typecheck.
  Verify Steps: |-
    1. Run `bunx vitest run packages/agentplane/src/runner/context/base-prompts.test.ts packages/agentplane/src/runner/adapters/custom.test.ts packages/agentplane/src/runner/adapters/codex.test.ts --hookTimeout 60000 --testTimeout 60000`. Expected: it succeeds and confirms the requested outcome for this task.
    2. Run `bun run typecheck`. Expected: it succeeds and confirms the requested outcome for this task.
    3. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    4. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-17T18:43:55.123Z — VERIFY — ok
    
    By: CODER
    
    Note: Verified: split runner prompt assembly into shared base-source, overlay, and recipe collectors; extracted shared adapter runtime helpers for custom and codex; bun run typecheck passed; runner prompt/custom/codex adapter tests passed.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-17T18:37:54.499Z, excerpt_hash=sha256:9d5a6b528fe78cc079511afde551a4c919f3ad0d8562f2511561730afea3a27b
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Decompose runner prompt and adapter hotspots

Split runner/context/base-prompts.ts and the custom plus codex adapters into smaller modules with shared adapter primitives while preserving runner behavior.

## Scope

- In scope: Split runner/context/base-prompts.ts and the custom plus codex adapters into smaller modules with shared adapter primitives while preserving runner behavior.
- Out of scope: unrelated refactors not required for "Decompose runner prompt and adapter hotspots".

## Plan

1. Split prompt-building responsibilities out of runner/context/base-prompts.ts.
2. Extract shared adapter primitives from runner/adapters/custom.ts and runner/adapters/codex.ts without widening runner contracts.
3. Re-run runner prompt and adapter tests plus typecheck.

## Verify Steps

1. Run `bunx vitest run packages/agentplane/src/runner/context/base-prompts.test.ts packages/agentplane/src/runner/adapters/custom.test.ts packages/agentplane/src/runner/adapters/codex.test.ts --hookTimeout 60000 --testTimeout 60000`. Expected: it succeeds and confirms the requested outcome for this task.
2. Run `bun run typecheck`. Expected: it succeeds and confirms the requested outcome for this task.
3. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
4. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-17T18:43:55.123Z — VERIFY — ok

By: CODER

Note: Verified: split runner prompt assembly into shared base-source, overlay, and recipe collectors; extracted shared adapter runtime helpers for custom and codex; bun run typecheck passed; runner prompt/custom/codex adapter tests passed.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-17T18:37:54.499Z, excerpt_hash=sha256:9d5a6b528fe78cc079511afde551a4c919f3ad0d8562f2511561730afea3a27b

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
