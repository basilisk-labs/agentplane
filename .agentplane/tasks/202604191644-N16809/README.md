---
id: "202604191644-N16809"
title: "Split PR flow PR mega-test by scenario families"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 4
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
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
commit: null
comments:
  -
    author: "CODER"
    body: "Start: Splitting the PR-flow PR mega-test into scenario-focused files without behavior changes."
events:
  -
    type: "status"
    at: "2026-04-20T16:40:11.818Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Splitting the PR-flow PR mega-test into scenario-focused files without behavior changes."
doc_version: 3
doc_updated_at: "2026-04-20T16:40:11.824Z"
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
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
