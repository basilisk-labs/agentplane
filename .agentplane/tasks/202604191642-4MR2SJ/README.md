---
id: "202604191642-4MR2SJ"
title: "Add dependency cruiser checks for architecture rules"
result_summary: "Added dependency-cruiser architecture boundary checks with fail-on-new enforcement for package boundaries, unresolved imports, and new cycles."
status: "DONE"
priority: "med"
owner: "CODER"
revision: 6
origin:
  system: "manual"
depends_on: []
tags:
  - "architecture"
  - "code"
  - "tooling"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-04-20T15:20:17.083Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-04-20T15:30:27.584Z"
  updated_by: "CODER"
  note: "Verification passed: bun run arch:check; bun run format:check; bun run lint:core; bun run build; node scripts/check-workflow-command-contract.mjs. arch:check reports no new dependency violations and keeps 49 existing cycle violations in the committed baseline."
commit:
  hash: "05ebc46719ed316ecfc0f4e09fe5c7355349b2a9"
  message: "🏗️ 4MR2SJ arch: add dependency-cruiser guard"
comments:
  -
    author: "CODER"
    body: "Start: Adding dependency-cruiser boundary enforcement with a pragmatic initial ruleset and canonical script integration."
  -
    author: "CODER"
    body: "Verified: dependency-cruiser guard added with committed baseline for existing cycles, CI/prepublish/release gates wired to arch:check, docs updated, and validation passed."
events:
  -
    type: "status"
    at: "2026-04-20T15:20:19.160Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Adding dependency-cruiser boundary enforcement with a pragmatic initial ruleset and canonical script integration."
  -
    type: "verify"
    at: "2026-04-20T15:30:27.584Z"
    author: "CODER"
    state: "ok"
    note: "Verification passed: bun run arch:check; bun run format:check; bun run lint:core; bun run build; node scripts/check-workflow-command-contract.mjs. arch:check reports no new dependency violations and keeps 49 existing cycle violations in the committed baseline."
  -
    type: "status"
    at: "2026-04-20T15:30:41.954Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: dependency-cruiser guard added with committed baseline for existing cycles, CI/prepublish/release gates wired to arch:check, docs updated, and validation passed."
doc_version: 3
doc_updated_at: "2026-04-20T15:30:41.955Z"
doc_updated_by: "CODER"
description: "Epic K and J′. Add dependency-cruiser enforcement for package boundaries and cycles."
sections:
  Summary: |-
    Add dependency cruiser checks for architecture rules
    
    Epic K and J′. Add dependency-cruiser enforcement for package boundaries and cycles.
  Scope: |-
    - In scope: Epic K and J′. Add dependency-cruiser enforcement for package boundaries and cycles.
    - Out of scope: unrelated refactors not required for "Add dependency cruiser checks for architecture rules".
  Plan: "Add dependency-cruiser as a dev-only architecture guard. Create a root depcruise config covering packages/**/src with initial rules for circular dependencies, forbidden package direction imports, and agentplane/internal boundary imports. Add package scripts for local check and CI guard, wire the guard into release:ci-check, document the command, and verify with depcruise plus existing format/lint/build checks. Keep the first rule set pragmatic: fail on clear boundary violations and avoid broad noisy rules that require unrelated refactors."
  Verify Steps: |-
    1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
    3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-20T15:30:27.584Z — VERIFY — ok
    
    By: CODER
    
    Note: Verification passed: bun run arch:check; bun run format:check; bun run lint:core; bun run build; node scripts/check-workflow-command-contract.mjs. arch:check reports no new dependency violations and keeps 49 existing cycle violations in the committed baseline.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-20T15:20:19.185Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Add dependency cruiser checks for architecture rules

Epic K and J′. Add dependency-cruiser enforcement for package boundaries and cycles.

## Scope

- In scope: Epic K and J′. Add dependency-cruiser enforcement for package boundaries and cycles.
- Out of scope: unrelated refactors not required for "Add dependency cruiser checks for architecture rules".

## Plan

Add dependency-cruiser as a dev-only architecture guard. Create a root depcruise config covering packages/**/src with initial rules for circular dependencies, forbidden package direction imports, and agentplane/internal boundary imports. Add package scripts for local check and CI guard, wire the guard into release:ci-check, document the command, and verify with depcruise plus existing format/lint/build checks. Keep the first rule set pragmatic: fail on clear boundary violations and avoid broad noisy rules that require unrelated refactors.

## Verify Steps

1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-20T15:30:27.584Z — VERIFY — ok

By: CODER

Note: Verification passed: bun run arch:check; bun run format:check; bun run lint:core; bun run build; node scripts/check-workflow-command-contract.mjs. arch:check reports no new dependency violations and keeps 49 existing cycle violations in the committed baseline.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-20T15:20:19.185Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
