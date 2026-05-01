---
id: "202605011918-JW3M0Z"
title: "Standardize release PR titles and messages"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 5
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "release"
  - "workflow"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-01T19:18:27.774Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-01T19:24:48.053Z"
  updated_by: "CODER"
  note: "Passed targeted PR-title, hosted-close, release-evidence, workflow-contract, lint, routing, bootstrap, and doctor checks."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: standardize branch_pr, hosted-close, and release-evidence PR titles with one readable task format."
events:
  -
    type: "status"
    at: "2026-05-01T19:18:47.792Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: standardize branch_pr, hosted-close, and release-evidence PR titles with one readable task format."
  -
    type: "verify"
    at: "2026-05-01T19:24:48.053Z"
    author: "CODER"
    state: "ok"
    note: "Passed targeted PR-title, hosted-close, release-evidence, workflow-contract, lint, routing, bootstrap, and doctor checks."
doc_version: 3
doc_updated_at: "2026-05-01T19:24:48.060Z"
doc_updated_by: "CODER"
description: "Make branch_pr and hosted-close PR titles/messages use one readable canonical format before publishing v0.4.1."
sections:
  Summary: |-
    Standardize release PR titles and messages
    
    Make branch_pr and hosted-close PR titles/messages use one readable canonical format before publishing v0.4.1.
  Scope: |-
    - In scope: Make branch_pr and hosted-close PR titles/messages use one readable canonical format before publishing v0.4.1.
    - Out of scope: unrelated refactors not required for "Standardize release PR titles and messages".
  Plan: |-
    1. Inspect PR title generation for branch_pr PRs, hosted-close PRs, and release evidence PRs.
    2. Add a shared readable PR title/message formatter that produces one canonical shape for task PRs and close PRs.
    3. Update command scripts/workflow helpers and tests/contracts that assert titles.
    4. Run targeted PR/hosted-close tests plus workflow checks, lint, policy routing, and doctor.
    5. Open/merge this task via branch_pr, then reassess release readiness before publishing v0.4.1.
  Verify Steps: |-
    1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
    3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-01T19:24:48.053Z — VERIFY — ok
    
    By: CODER
    
    Note: Passed targeted PR-title, hosted-close, release-evidence, workflow-contract, lint, routing, bootstrap, and doctor checks.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-01T19:18:47.792Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    - Observation: PR titles now use canonical task/task-close/task-evidence prefixes with full task ids, and generated PR bodies use Source/Scope sections.
      Impact: Release and closure PRs are easier to scan and no longer mix suffix-only, emoji-only, and scoped-title formats.
      Resolution: Updated task PR, hosted close PR, hosted workflow closure, and release evidence PR generators plus regression tests.
      Promotion: incident-candidate
      Fixability: external
id_source: "generated"
---
## Summary

Standardize release PR titles and messages

Make branch_pr and hosted-close PR titles/messages use one readable canonical format before publishing v0.4.1.

## Scope

- In scope: Make branch_pr and hosted-close PR titles/messages use one readable canonical format before publishing v0.4.1.
- Out of scope: unrelated refactors not required for "Standardize release PR titles and messages".

## Plan

1. Inspect PR title generation for branch_pr PRs, hosted-close PRs, and release evidence PRs.
2. Add a shared readable PR title/message formatter that produces one canonical shape for task PRs and close PRs.
3. Update command scripts/workflow helpers and tests/contracts that assert titles.
4. Run targeted PR/hosted-close tests plus workflow checks, lint, policy routing, and doctor.
5. Open/merge this task via branch_pr, then reassess release readiness before publishing v0.4.1.

## Verify Steps

1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-01T19:24:48.053Z — VERIFY — ok

By: CODER

Note: Passed targeted PR-title, hosted-close, release-evidence, workflow-contract, lint, routing, bootstrap, and doctor checks.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-01T19:18:47.792Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- Observation: PR titles now use canonical task/task-close/task-evidence prefixes with full task ids, and generated PR bodies use Source/Scope sections.
  Impact: Release and closure PRs are easier to scan and no longer mix suffix-only, emoji-only, and scoped-title formats.
  Resolution: Updated task PR, hosted close PR, hosted workflow closure, and release evidence PR generators plus regression tests.
  Promotion: incident-candidate
  Fixability: external
