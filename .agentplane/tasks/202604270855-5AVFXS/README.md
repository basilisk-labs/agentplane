---
id: "202604270855-5AVFXS"
title: "Consolidate freshness and sync script helpers"
result_summary: "Merged via PR #555."
status: "DONE"
priority: "med"
owner: "CODER"
revision: 6
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "tooling"
verify:
  - "bun run agents:check"
  - "bun run docs:scripts:check"
  - "bun run schemas:check"
plan_approval:
  state: "approved"
  updated_at: "2026-04-27T08:56:48.964Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-04-28T07:01:01.247Z"
  updated_by: "CODER"
  note: "Command: bun run docs:scripts:check; Result: pass. Command: bun run schemas:check; Result: pass. Command: bun run agents:check; Result: pass. Command: git diff --check; Result: pass. Scope: scripts README check/generate now reuses shared generated text artifact helpers; existing schema and agent sync checks remain green."
commit:
  hash: "f16cb9b918cf288903049609fa0d93996cbbfca2"
  message: "Merge pull request #555 from basilisk-labs/task/202604270855-5AVFXS/freshness-sync-helpers"
comments:
  -
    author: "CODER"
    body: "Start: consolidate the scripts README freshness check onto shared generated-artifact helper primitives while preserving schema and agent sync checks."
  -
    author: "INTEGRATOR"
    body: "Verified: PR #555 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
events:
  -
    type: "status"
    at: "2026-04-28T07:00:09.715Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: consolidate the scripts README freshness check onto shared generated-artifact helper primitives while preserving schema and agent sync checks."
  -
    type: "verify"
    at: "2026-04-28T07:01:01.247Z"
    author: "CODER"
    state: "ok"
    note: "Command: bun run docs:scripts:check; Result: pass. Command: bun run schemas:check; Result: pass. Command: bun run agents:check; Result: pass. Command: git diff --check; Result: pass. Scope: scripts README check/generate now reuses shared generated text artifact helpers; existing schema and agent sync checks remain green."
  -
    type: "status"
    at: "2026-04-28T07:02:58.050Z"
    author: "INTEGRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: PR #555 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
doc_version: 3
doc_updated_at: "2026-04-28T07:02:58.056Z"
doc_updated_by: "INTEGRATOR"
description: "Create shared helper primitives for generated artifact freshness checks and mirror sync scripts so docs, schema, recipe inventory, and agent template checks reuse one compare/generate/report pattern."
sections:
  Summary: |-
    Consolidate freshness and sync script helpers
    
    Create shared helper primitives for generated artifact freshness checks and mirror sync scripts so docs, schema, recipe inventory, and agent template checks reuse one compare/generate/report pattern.
  Scope: |-
    - In scope: Create shared helper primitives for generated artifact freshness checks and mirror sync scripts so docs, schema, recipe inventory, and agent template checks reuse one compare/generate/report pattern.
    - Out of scope: unrelated refactors not required for "Consolidate freshness and sync script helpers".
  Plan: "1. Inventory generated-doc freshness and mirror sync scripts with the same generate-compare-report pattern. 2. Create a shared helper for temp generation, stable compare, and concise drift reporting. 3. Migrate one docs freshness check and one sync/check script as representatives. 4. Preserve command output and failure behavior. 5. Verify docs/scripts, schemas, and agents checks."
  Verify Steps: |-
    1. Run `bun run docs:scripts:check`. Expected: it succeeds and confirms the requested outcome for this task.
    2. Run `bun run schemas:check`. Expected: it succeeds and confirms the requested outcome for this task.
    3. Run `bun run agents:check`. Expected: it succeeds and confirms the requested outcome for this task.
    4. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    5. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-28T07:01:01.247Z — VERIFY — ok
    
    By: CODER
    
    Note: Command: bun run docs:scripts:check; Result: pass. Command: bun run schemas:check; Result: pass. Command: bun run agents:check; Result: pass. Command: git diff --check; Result: pass. Scope: scripts README check/generate now reuses shared generated text artifact helpers; existing schema and agent sync checks remain green.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-28T07:00:09.715Z, excerpt_hash=sha256:59e2ed2130d7ef987e397f46b88533f6e442f1eb465d816f2e3feb0c0eff9397
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Consolidate freshness and sync script helpers

Create shared helper primitives for generated artifact freshness checks and mirror sync scripts so docs, schema, recipe inventory, and agent template checks reuse one compare/generate/report pattern.

## Scope

- In scope: Create shared helper primitives for generated artifact freshness checks and mirror sync scripts so docs, schema, recipe inventory, and agent template checks reuse one compare/generate/report pattern.
- Out of scope: unrelated refactors not required for "Consolidate freshness and sync script helpers".

## Plan

1. Inventory generated-doc freshness and mirror sync scripts with the same generate-compare-report pattern. 2. Create a shared helper for temp generation, stable compare, and concise drift reporting. 3. Migrate one docs freshness check and one sync/check script as representatives. 4. Preserve command output and failure behavior. 5. Verify docs/scripts, schemas, and agents checks.

## Verify Steps

1. Run `bun run docs:scripts:check`. Expected: it succeeds and confirms the requested outcome for this task.
2. Run `bun run schemas:check`. Expected: it succeeds and confirms the requested outcome for this task.
3. Run `bun run agents:check`. Expected: it succeeds and confirms the requested outcome for this task.
4. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
5. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-28T07:01:01.247Z — VERIFY — ok

By: CODER

Note: Command: bun run docs:scripts:check; Result: pass. Command: bun run schemas:check; Result: pass. Command: bun run agents:check; Result: pass. Command: git diff --check; Result: pass. Scope: scripts README check/generate now reuses shared generated text artifact helpers; existing schema and agent sync checks remain green.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-28T07:00:09.715Z, excerpt_hash=sha256:59e2ed2130d7ef987e397f46b88533f6e442f1eb465d816f2e3feb0c0eff9397

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
