---
id: "202605030733-BHD4S4"
title: "Enforce English PR artifacts language"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 4
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
  updated_at: "2026-05-03T07:33:30.552Z"
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
    body: "Start: porting the English PR artifact language validation from the stale cli-artifacts branch onto current main with current release state preserved."
events:
  -
    type: "status"
    at: "2026-05-03T07:33:40.003Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: porting the English PR artifact language validation from the stale cli-artifacts branch onto current main with current release state preserved."
doc_version: 3
doc_updated_at: "2026-05-03T07:33:40.003Z"
doc_updated_by: "CODER"
description: "Port the artifacts_language configuration and PR artifact language validation from the stale cli-artifacts branch onto current main, preserving current v0.4.2 release state."
sections:
  Summary: |-
    Enforce English PR artifacts language
    
    Port the artifacts_language configuration and PR artifact language validation from the stale cli-artifacts branch onto current main, preserving current v0.4.2 release state.
  Scope: |-
    - In scope: Port the artifacts_language configuration and PR artifact language validation from the stale cli-artifacts branch onto current main, preserving current v0.4.2 release state.
    - Out of scope: unrelated refactors not required for "Enforce English PR artifacts language".
  Plan: "Plan: port only the useful artifacts_language=en configuration and PR artifact language validation from codex/cli-artifacts-language-validation onto current main; exclude stale release-format-only noise unless still required by conflicts; verify with targeted PR artifact tests, config schema checks, policy routing, recipes inventory, release candidate gate, hosted PR checks, and homepage/raw recipes spot check; merge via branch_pr; cleanup stale trust-recipes and cli-artifacts branches after merge."
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

Enforce English PR artifacts language

Port the artifacts_language configuration and PR artifact language validation from the stale cli-artifacts branch onto current main, preserving current v0.4.2 release state.

## Scope

- In scope: Port the artifacts_language configuration and PR artifact language validation from the stale cli-artifacts branch onto current main, preserving current v0.4.2 release state.
- Out of scope: unrelated refactors not required for "Enforce English PR artifacts language".

## Plan

Plan: port only the useful artifacts_language=en configuration and PR artifact language validation from codex/cli-artifacts-language-validation onto current main; exclude stale release-format-only noise unless still required by conflicts; verify with targeted PR artifact tests, config schema checks, policy routing, recipes inventory, release candidate gate, hosted PR checks, and homepage/raw recipes spot check; merge via branch_pr; cleanup stale trust-recipes and cli-artifacts branches after merge.

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
