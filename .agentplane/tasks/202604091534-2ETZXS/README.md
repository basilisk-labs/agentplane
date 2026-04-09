---
id: "202604091534-2ETZXS"
title: "Sanitize gh env for hosted merge sync lookups"
result_summary: "Closed as duplicate of 202604091534-QQH4QA."
risk_level: "low"
breaking: false
status: "DONE"
priority: "high"
owner: "CODER"
revision: 6
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "github"
  - "workflow"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-04-09T15:35:35.041Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-04-09T15:41:18.240Z"
  updated_by: "CODER"
  note: |-
    Command: bun x vitest run packages/agentplane/src/commands/task/hosted-merge-sync.test.ts
    Result: pass
    Evidence: 7/7 hosted-merge-sync tests passed, including sanitized gh env coverage for merged PR lookups.
    Scope: hosted merge reconciliation GitHub transport contract.
    
    Command: bun x eslint packages/agentplane/src/commands/task/hosted-merge-sync.ts packages/agentplane/src/commands/task/hosted-merge-sync.test.ts
    Result: pass
    Evidence: eslint exited 0.
    Scope: hosted merge sync implementation and regression tests.
commit: null
comments:
  -
    author: "CODER"
    body: "Start: align hosted merge sync gh lookups with the sanitized GitHub env contract so branch_pr reconcile stops failing on auth drift inside normalize."
  -
    author: "CODER"
    body: |-
      Verified: 202604091534-2ETZXS is a bookkeeping duplicate of 202604091534-QQH4QA (Sanitize hosted-merge-sync gh lookups); no code/config changes are expected in this task and closure is recorded as no-op.
      
      Reason: Superseded by 202604091534-QQH4QA merged in PR #198; no remaining code delta versus main.
events:
  -
    type: "status"
    at: "2026-04-09T15:35:35.512Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: align hosted merge sync gh lookups with the sanitized GitHub env contract so branch_pr reconcile stops failing on auth drift inside normalize."
  -
    type: "verify"
    at: "2026-04-09T15:41:18.240Z"
    author: "CODER"
    state: "ok"
    note: |-
      Command: bun x vitest run packages/agentplane/src/commands/task/hosted-merge-sync.test.ts
      Result: pass
      Evidence: 7/7 hosted-merge-sync tests passed, including sanitized gh env coverage for merged PR lookups.
      Scope: hosted merge reconciliation GitHub transport contract.
      
      Command: bun x eslint packages/agentplane/src/commands/task/hosted-merge-sync.ts packages/agentplane/src/commands/task/hosted-merge-sync.test.ts
      Result: pass
      Evidence: eslint exited 0.
      Scope: hosted merge sync implementation and regression tests.
  -
    type: "status"
    at: "2026-04-09T17:07:33.662Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: |-
      Verified: 202604091534-2ETZXS is a bookkeeping duplicate of 202604091534-QQH4QA (Sanitize hosted-merge-sync gh lookups); no code/config changes are expected in this task and closure is recorded as no-op.
      
      Reason: Superseded by 202604091534-QQH4QA merged in PR #198; no remaining code delta versus main.
doc_version: 3
doc_updated_at: "2026-04-09T17:07:33.662Z"
doc_updated_by: "CODER"
description: "Make hosted merge reconciliation use the same sanitized gh environment contract as other GitHub helpers so sync-hosted-merges does not fail with child-process auth drift while direct gh commands still work."
sections:
  Summary: |-
    Sanitize gh env for hosted merge sync lookups
    
    Make hosted merge reconciliation use the same sanitized gh environment contract as other GitHub helpers so sync-hosted-merges does not fail with child-process auth drift while direct gh commands still work.
  Scope: |-
    - In scope: Make hosted merge reconciliation use the same sanitized gh environment contract as other GitHub helpers so sync-hosted-merges does not fail with child-process auth drift while direct gh commands still work.
    - Out of scope: unrelated refactors not required for "Sanitize gh env for hosted merge sync lookups".
  Plan: "1. Reproduce hosted-merge-sync gh lookup behavior and align its gh invocation env with the existing sanitized GitHub helper contract. 2. Add focused regression coverage for the sanitized env path and any fallback behavior. 3. Run targeted tests/lint and capture verification evidence."
  Verify Steps: |-
    1. Reproduce the hosted merge lookup path with a `gh` subprocess environment that includes unrelated git overrides. Expected: hosted merge sync still resolves the merged PR instead of surfacing a child-process auth/config failure.
    2. Run focused hosted-merge-sync tests. Expected: sanitized `gh` env coverage passes and existing local/hosted reconcile behavior remains intact.
    3. Run targeted lint/tests for touched helpers. Expected: no regressions in GitHub transport or branch_pr reconciliation paths.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-09T15:41:18.240Z — VERIFY — ok
    
    By: CODER
    
    Note: Command: bun x vitest run packages/agentplane/src/commands/task/hosted-merge-sync.test.ts
    Result: pass
    Evidence: 7/7 hosted-merge-sync tests passed, including sanitized gh env coverage for merged PR lookups.
    Scope: hosted merge reconciliation GitHub transport contract.
    
    Command: bun x eslint packages/agentplane/src/commands/task/hosted-merge-sync.ts packages/agentplane/src/commands/task/hosted-merge-sync.test.ts
    Result: pass
    Evidence: eslint exited 0.
    Scope: hosted merge sync implementation and regression tests.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-09T15:35:35.522Z, excerpt_hash=sha256:eaef183cc31adeed762f23f4d7d9a202e702661203d2cf75b005103ec8f7b289
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Sanitize gh env for hosted merge sync lookups

Make hosted merge reconciliation use the same sanitized gh environment contract as other GitHub helpers so sync-hosted-merges does not fail with child-process auth drift while direct gh commands still work.

## Scope

- In scope: Make hosted merge reconciliation use the same sanitized gh environment contract as other GitHub helpers so sync-hosted-merges does not fail with child-process auth drift while direct gh commands still work.
- Out of scope: unrelated refactors not required for "Sanitize gh env for hosted merge sync lookups".

## Plan

1. Reproduce hosted-merge-sync gh lookup behavior and align its gh invocation env with the existing sanitized GitHub helper contract. 2. Add focused regression coverage for the sanitized env path and any fallback behavior. 3. Run targeted tests/lint and capture verification evidence.

## Verify Steps

1. Reproduce the hosted merge lookup path with a `gh` subprocess environment that includes unrelated git overrides. Expected: hosted merge sync still resolves the merged PR instead of surfacing a child-process auth/config failure.
2. Run focused hosted-merge-sync tests. Expected: sanitized `gh` env coverage passes and existing local/hosted reconcile behavior remains intact.
3. Run targeted lint/tests for touched helpers. Expected: no regressions in GitHub transport or branch_pr reconciliation paths.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-09T15:41:18.240Z — VERIFY — ok

By: CODER

Note: Command: bun x vitest run packages/agentplane/src/commands/task/hosted-merge-sync.test.ts
Result: pass
Evidence: 7/7 hosted-merge-sync tests passed, including sanitized gh env coverage for merged PR lookups.
Scope: hosted merge reconciliation GitHub transport contract.

Command: bun x eslint packages/agentplane/src/commands/task/hosted-merge-sync.ts packages/agentplane/src/commands/task/hosted-merge-sync.test.ts
Result: pass
Evidence: eslint exited 0.
Scope: hosted merge sync implementation and regression tests.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-09T15:35:35.522Z, excerpt_hash=sha256:eaef183cc31adeed762f23f4d7d9a202e702661203d2cf75b005103ec8f7b289

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
