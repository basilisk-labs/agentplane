---
id: "202605031908-75KN06"
title: "T08: Promote ACR in CLI package README"
status: "TODO"
priority: "high"
owner: "DOCS"
revision: 3
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
commit: null
comments: []
events: []
doc_version: 3
doc_updated_at: "2026-05-03T19:08:36.015Z"
doc_updated_by: "PLANNER"
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
