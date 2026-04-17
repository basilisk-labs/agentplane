---
id: "202604171502-A585MV"
title: "Decompose PR sync hotspot into explicit step modules"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 5
origin:
  system: "manual"
depends_on: []
tags:
  - "cli"
  - "code"
  - "refactor"
verify:
  - "bun run typecheck"
  - "bunx vitest run packages/agentplane/src/commands/pr/check.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.integrate.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.pr.test.ts --hookTimeout 60000 --testTimeout 60000"
plan_approval:
  state: "approved"
  updated_at: "2026-04-17T18:26:45.483Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-04-17T18:36:45.542Z"
  updated_by: "CODER"
  note: "Verified: split PR sync into explicit support, branch, open, and update step modules; bun run typecheck passed; targeted PR-flow tests passed (82 tests); task verify contract still points at removed packages/agentplane/src/commands/pr/check.test.ts, so equivalent current coverage came from run-cli.core.pr-flow.pr.test.ts and commands/pr/input-validation.test.ts."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: decompose the PR sync hotspot into explicit step modules, keep sync.ts as the coordinator, and preserve existing PR flow behavior under targeted tests."
events:
  -
    type: "status"
    at: "2026-04-17T18:27:13.237Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: decompose the PR sync hotspot into explicit step modules, keep sync.ts as the coordinator, and preserve existing PR flow behavior under targeted tests."
  -
    type: "verify"
    at: "2026-04-17T18:36:45.542Z"
    author: "CODER"
    state: "ok"
    note: "Verified: split PR sync into explicit support, branch, open, and update step modules; bun run typecheck passed; targeted PR-flow tests passed (82 tests); task verify contract still points at removed packages/agentplane/src/commands/pr/check.test.ts, so equivalent current coverage came from run-cli.core.pr-flow.pr.test.ts and commands/pr/input-validation.test.ts."
doc_version: 3
doc_updated_at: "2026-04-17T18:36:45.546Z"
doc_updated_by: "CODER"
description: "Split commands/pr/internal/sync.ts into step-focused modules so the orchestration path stays small and PR sync behavior remains stable."
sections:
  Summary: |-
    Decompose PR sync hotspot into explicit step modules
    
    Split commands/pr/internal/sync.ts into step-focused modules so the orchestration path stays small and PR sync behavior remains stable.
  Scope: |-
    - In scope: Split commands/pr/internal/sync.ts into step-focused modules so the orchestration path stays small and PR sync behavior remains stable.
    - Out of scope: unrelated refactors not required for "Decompose PR sync hotspot into explicit step modules".
  Plan: |-
    1. Split PR sync orchestration into explicit step modules around fetch, read, compute, and write phases.
    2. Keep sync.ts as a coordinator and reduce cross-cutting branching inside the main file.
    3. Re-run targeted PR flow tests and typecheck.
  Verify Steps: |-
    1. Run `bunx vitest run packages/agentplane/src/commands/pr/check.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.integrate.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.pr.test.ts --hookTimeout 60000 --testTimeout 60000`. Expected: it succeeds and confirms the requested outcome for this task.
    2. Run `bun run typecheck`. Expected: it succeeds and confirms the requested outcome for this task.
    3. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    4. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-17T18:36:45.542Z — VERIFY — ok
    
    By: CODER
    
    Note: Verified: split PR sync into explicit support, branch, open, and update step modules; bun run typecheck passed; targeted PR-flow tests passed (82 tests); task verify contract still points at removed packages/agentplane/src/commands/pr/check.test.ts, so equivalent current coverage came from run-cli.core.pr-flow.pr.test.ts and commands/pr/input-validation.test.ts.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-17T18:27:13.242Z, excerpt_hash=sha256:8ffa9206cd9b5637f33f44627072142dfbed13d0a73870f3a82199f4410b6af2
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Decompose PR sync hotspot into explicit step modules

Split commands/pr/internal/sync.ts into step-focused modules so the orchestration path stays small and PR sync behavior remains stable.

## Scope

- In scope: Split commands/pr/internal/sync.ts into step-focused modules so the orchestration path stays small and PR sync behavior remains stable.
- Out of scope: unrelated refactors not required for "Decompose PR sync hotspot into explicit step modules".

## Plan

1. Split PR sync orchestration into explicit step modules around fetch, read, compute, and write phases.
2. Keep sync.ts as a coordinator and reduce cross-cutting branching inside the main file.
3. Re-run targeted PR flow tests and typecheck.

## Verify Steps

1. Run `bunx vitest run packages/agentplane/src/commands/pr/check.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.integrate.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.pr.test.ts --hookTimeout 60000 --testTimeout 60000`. Expected: it succeeds and confirms the requested outcome for this task.
2. Run `bun run typecheck`. Expected: it succeeds and confirms the requested outcome for this task.
3. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
4. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-17T18:36:45.542Z — VERIFY — ok

By: CODER

Note: Verified: split PR sync into explicit support, branch, open, and update step modules; bun run typecheck passed; targeted PR-flow tests passed (82 tests); task verify contract still points at removed packages/agentplane/src/commands/pr/check.test.ts, so equivalent current coverage came from run-cli.core.pr-flow.pr.test.ts and commands/pr/input-validation.test.ts.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-17T18:27:13.242Z, excerpt_hash=sha256:8ffa9206cd9b5637f33f44627072142dfbed13d0a73870f3a82199f4410b6af2

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
