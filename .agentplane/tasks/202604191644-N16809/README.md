---
id: "202604191644-N16809"
title: "Split PR flow PR mega-test by scenario families"
result_summary: "Replaced the 4264-line PR-flow PR mega-test with four scenario files, each below 2000 LoC, plus shared test support."
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
  - "tests"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-04-20T16:40:07.530Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-04-20T16:46:28.752Z"
  updated_by: "CODER"
  note: "Command: agentplane task verify-show 202604191644-N16809; Result: pass; Evidence: verification contract reviewed. Command: wc -l packages/agentplane/src/cli/run-cli.core.pr-flow.pr-*.test.ts; Result: pass; Evidence: largest split file is 1712 LoC, below 2000. Command: bunx vitest run packages/agentplane/src/cli/run-cli.core.pr-flow.pr-open.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.pr-lifecycle.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.pr-notes-verify.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.pr-validation.test.ts --reporter dot; Result: pass; Evidence: 4 files, 57 tests passed. Command: bun run lint:core; Result: pass. Command: bun run format:check; Result: pass. Command: bun run typecheck; Result: pass."
commit:
  hash: "7b5c21d3d9129fd910ab58061f3835e21be0248f"
  message: "🧪 N16809 test: split PR flow scenarios"
comments:
  -
    author: "CODER"
    body: "Start: Splitting the PR-flow PR mega-test into scenario-focused files without behavior changes."
  -
    author: "CODER"
    body: "Verified: PR-flow PR mega-test was split into scenario families and all focused checks passed."
events:
  -
    type: "status"
    at: "2026-04-20T16:40:11.818Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Splitting the PR-flow PR mega-test into scenario-focused files without behavior changes."
  -
    type: "verify"
    at: "2026-04-20T16:46:28.752Z"
    author: "CODER"
    state: "ok"
    note: "Command: agentplane task verify-show 202604191644-N16809; Result: pass; Evidence: verification contract reviewed. Command: wc -l packages/agentplane/src/cli/run-cli.core.pr-flow.pr-*.test.ts; Result: pass; Evidence: largest split file is 1712 LoC, below 2000. Command: bunx vitest run packages/agentplane/src/cli/run-cli.core.pr-flow.pr-open.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.pr-lifecycle.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.pr-notes-verify.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.pr-validation.test.ts --reporter dot; Result: pass; Evidence: 4 files, 57 tests passed. Command: bun run lint:core; Result: pass. Command: bun run format:check; Result: pass. Command: bun run typecheck; Result: pass."
  -
    type: "status"
    at: "2026-04-20T16:46:44.590Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: PR-flow PR mega-test was split into scenario families and all focused checks passed."
doc_version: 3
doc_updated_at: "2026-04-20T16:46:44.590Z"
doc_updated_by: "CODER"
description: "Epic L. Break run-cli.core.pr-flow.pr.test.ts into scenario-focused files under the current coverage contract."
sections:
  Summary: |-
    Split PR flow PR mega-test by scenario families
    
    Epic L. Break run-cli.core.pr-flow.pr.test.ts into scenario-focused files under the current coverage contract.
  Scope: |-
    - In scope: Epic L. Break run-cli.core.pr-flow.pr.test.ts into scenario-focused files under the current coverage contract.
    - Out of scope: unrelated refactors not required for "Split PR flow PR mega-test by scenario families".
  Plan: "Split packages/agentplane/src/cli/run-cli.core.pr-flow.pr.test.ts into scenario-family test files without changing assertions. Extract shared imports/helpers into a non-test support module, move the original tests into pr-open, lifecycle, notes/verify, and validation/hydration groups, then delete the mega-test. Verification: agentplane task verify-show; wc -l confirms no resulting PR-flow PR test file exceeds 2000 LoC; bun run test:project -- cli-core --runInBand for the affected CLI project or focused new files if project flag support differs; bun run lint:core; bun run format:check."
  Verify Steps: |-
    1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
    3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-20T16:46:28.752Z — VERIFY — ok
    
    By: CODER
    
    Note: Command: agentplane task verify-show 202604191644-N16809; Result: pass; Evidence: verification contract reviewed. Command: wc -l packages/agentplane/src/cli/run-cli.core.pr-flow.pr-*.test.ts; Result: pass; Evidence: largest split file is 1712 LoC, below 2000. Command: bunx vitest run packages/agentplane/src/cli/run-cli.core.pr-flow.pr-open.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.pr-lifecycle.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.pr-notes-verify.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.pr-validation.test.ts --reporter dot; Result: pass; Evidence: 4 files, 57 tests passed. Command: bun run lint:core; Result: pass. Command: bun run format:check; Result: pass. Command: bun run typecheck; Result: pass.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-20T16:40:11.824Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Split PR flow PR mega-test by scenario families

Epic L. Break run-cli.core.pr-flow.pr.test.ts into scenario-focused files under the current coverage contract.

## Scope

- In scope: Epic L. Break run-cli.core.pr-flow.pr.test.ts into scenario-focused files under the current coverage contract.
- Out of scope: unrelated refactors not required for "Split PR flow PR mega-test by scenario families".

## Plan

Split packages/agentplane/src/cli/run-cli.core.pr-flow.pr.test.ts into scenario-family test files without changing assertions. Extract shared imports/helpers into a non-test support module, move the original tests into pr-open, lifecycle, notes/verify, and validation/hydration groups, then delete the mega-test. Verification: agentplane task verify-show; wc -l confirms no resulting PR-flow PR test file exceeds 2000 LoC; bun run test:project -- cli-core --runInBand for the affected CLI project or focused new files if project flag support differs; bun run lint:core; bun run format:check.

## Verify Steps

1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-20T16:46:28.752Z — VERIFY — ok

By: CODER

Note: Command: agentplane task verify-show 202604191644-N16809; Result: pass; Evidence: verification contract reviewed. Command: wc -l packages/agentplane/src/cli/run-cli.core.pr-flow.pr-*.test.ts; Result: pass; Evidence: largest split file is 1712 LoC, below 2000. Command: bunx vitest run packages/agentplane/src/cli/run-cli.core.pr-flow.pr-open.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.pr-lifecycle.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.pr-notes-verify.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.pr-validation.test.ts --reporter dot; Result: pass; Evidence: 4 files, 57 tests passed. Command: bun run lint:core; Result: pass. Command: bun run format:check; Result: pass. Command: bun run typecheck; Result: pass.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-20T16:40:11.824Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
