---
id: "202605031908-75KN06"
title: "T08: Promote ACR in CLI package README"
status: "DONE"
priority: "high"
owner: "DOCS"
revision: 5
origin:
  system: "manual"
depends_on:
  - "202605031908-1D4BT9"
tags:
  - "docs"
  - "package"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-03T19:08:36.463Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
commit:
  hash: "02579b80b963154c24d2a3fbd1e36b697bde978e"
  message: "🚧 E70TF7 task: Launch public-surface ACR task graph [202605031908-E70TF7]"
comments:
  -
    author: "INTEGRATOR"
    body: "Verified: implemented through merged PR #853; release finalization closes the leaf backlog against merge commit 02579b80 after hosted checks passed."
events:
  -
    type: "status"
    at: "2026-05-03T21:03:54.904Z"
    author: "INTEGRATOR"
    from: "TODO"
    to: "DONE"
    note: "Verified: implemented through merged PR #853; release finalization closes the leaf backlog against merge commit 02579b80 after hosted checks passed."
doc_version: 3
doc_updated_at: "2026-05-03T21:03:54.904Z"
doc_updated_by: "INTEGRATOR"
description: "Mirror the ACR explanation in packages/agentplane/README.md and expose acr help in command footer."
sections:
  Summary: |-
    T08: Promote ACR in CLI package README

    Mirror the ACR explanation in packages/agentplane/README.md and expose acr help in command footer.
  Scope: |-
    - In scope: Mirror the ACR explanation in packages/agentplane/README.md and expose acr help in command footer.
    - Out of scope: unrelated refactors not required for "T08: Promote ACR in CLI package README".
  Plan: "Add package-scoped ACR copy and useful command reference, then verify package README contains Agent Change Record and acr --help."
  Verify Steps: |-
    1. Review the requested outcome for "T08: Promote ACR in CLI package README". Expected: the visible result matches ## Summary and stays inside approved scope.
    2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
    3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.
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

T08: Promote ACR in CLI package README

Mirror the ACR explanation in packages/agentplane/README.md and expose acr help in command footer.

## Scope

- In scope: Mirror the ACR explanation in packages/agentplane/README.md and expose acr help in command footer.
- Out of scope: unrelated refactors not required for "T08: Promote ACR in CLI package README".

## Plan

Add package-scoped ACR copy and useful command reference, then verify package README contains Agent Change Record and acr --help.

## Verify Steps

1. Review the requested outcome for "T08: Promote ACR in CLI package README". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
