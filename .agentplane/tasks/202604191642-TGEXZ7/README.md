---
id: "202604191642-TGEXZ7"
title: "Baseline knip and remove easy dead exports"
result_summary: "Added knip warn-only baseline guard; removed legacy testing shims; fixed stale test import paths; removed unused testkit dependency."
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
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-04-20T15:31:07.343Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-04-20T15:38:19.070Z"
  updated_by: "CODER"
  note: "Implemented knip warn-only guard and baseline cleanup. Verification passed: bun run knip:check; bunx vitest run packages/agentplane/src/commands/pr/integrate/internal/finalize.test.ts packages/agentplane/src/commands/pr/integrate/internal/merge.test.ts packages/agentplane/src/commands/pr/integrate/internal/worktree.test.ts --reporter dot; bun run test:project -- testkit --reporter dot; bun run format:check; bun run lint:core; bun run build."
commit:
  hash: "f8999d3ed111e17695dd07ed9d9a249ee1bec848"
  message: "🔎 TGEXZ7 tooling: add knip warn-only baseline"
comments:
  -
    author: "CODER"
    body: "Start: Adding knip warn-only dead-code detection with scoped configuration and CI visibility."
  -
    author: "CODER"
    body: "Verified: knip warn-only guard is configured, CI-visible, documented, and easy cleanup was applied."
events:
  -
    type: "status"
    at: "2026-04-20T15:31:09.493Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Adding knip warn-only dead-code detection with scoped configuration and CI visibility."
  -
    type: "verify"
    at: "2026-04-20T15:38:19.070Z"
    author: "CODER"
    state: "ok"
    note: "Implemented knip warn-only guard and baseline cleanup. Verification passed: bun run knip:check; bunx vitest run packages/agentplane/src/commands/pr/integrate/internal/finalize.test.ts packages/agentplane/src/commands/pr/integrate/internal/merge.test.ts packages/agentplane/src/commands/pr/integrate/internal/worktree.test.ts --reporter dot; bun run test:project -- testkit --reporter dot; bun run format:check; bun run lint:core; bun run build."
  -
    type: "status"
    at: "2026-04-20T15:38:33.939Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: knip warn-only guard is configured, CI-visible, documented, and easy cleanup was applied."
doc_version: 3
doc_updated_at: "2026-04-20T15:38:33.940Z"
doc_updated_by: "CODER"
description: "Epic K, I′, and J′. Add knip in warn-only mode, baseline its report, and remove low-risk dead exports."
sections:
  Summary: |-
    Baseline knip and remove easy dead exports
    
    Epic K, I′, and J′. Add knip in warn-only mode, baseline its report, and remove low-risk dead exports.
  Scope: |-
    - In scope: Epic K, I′, and J′. Add knip in warn-only mode, baseline its report, and remove low-risk dead exports.
    - Out of scope: unrelated refactors not required for "Baseline knip and remove easy dead exports".
  Plan: "Add knip as a dev-only dead-code detector in warn-only mode. Create a root knip config scoped to current workspace packages and scripts, add package scripts that generate a report without failing CI yet, wire the warn-only check into CI/release guard after architecture checks, document the command/status, and remove only obviously unused exports if knip identifies low-risk deletions. Verification: knip warn-only command completes, format/lint/build pass, and any intentionally retained findings are documented as baseline debt."
  Verify Steps: |-
    1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
    3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-20T15:38:19.070Z — VERIFY — ok
    
    By: CODER
    
    Note: Implemented knip warn-only guard and baseline cleanup. Verification passed: bun run knip:check; bunx vitest run packages/agentplane/src/commands/pr/integrate/internal/finalize.test.ts packages/agentplane/src/commands/pr/integrate/internal/merge.test.ts packages/agentplane/src/commands/pr/integrate/internal/worktree.test.ts --reporter dot; bun run test:project -- testkit --reporter dot; bun run format:check; bun run lint:core; bun run build.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-20T15:31:09.514Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Baseline knip and remove easy dead exports

Epic K, I′, and J′. Add knip in warn-only mode, baseline its report, and remove low-risk dead exports.

## Scope

- In scope: Epic K, I′, and J′. Add knip in warn-only mode, baseline its report, and remove low-risk dead exports.
- Out of scope: unrelated refactors not required for "Baseline knip and remove easy dead exports".

## Plan

Add knip as a dev-only dead-code detector in warn-only mode. Create a root knip config scoped to current workspace packages and scripts, add package scripts that generate a report without failing CI yet, wire the warn-only check into CI/release guard after architecture checks, document the command/status, and remove only obviously unused exports if knip identifies low-risk deletions. Verification: knip warn-only command completes, format/lint/build pass, and any intentionally retained findings are documented as baseline debt.

## Verify Steps

1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-20T15:38:19.070Z — VERIFY — ok

By: CODER

Note: Implemented knip warn-only guard and baseline cleanup. Verification passed: bun run knip:check; bunx vitest run packages/agentplane/src/commands/pr/integrate/internal/finalize.test.ts packages/agentplane/src/commands/pr/integrate/internal/merge.test.ts packages/agentplane/src/commands/pr/integrate/internal/worktree.test.ts --reporter dot; bun run test:project -- testkit --reporter dot; bun run format:check; bun run lint:core; bun run build.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-20T15:31:09.514Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
