---
id: "202604241136-ZE24F8"
title: "v0.3 freeze B3: prune orphaned init UI exports"
status: "TODO"
priority: "med"
owner: "CODER"
revision: 1
origin:
  system: "manual"
depends_on:
  - "202604241136-RTDFZS"
tags:
  - "cleanup"
  - "init"
  - "v0.3"
verify:
  - "bun run knip"
  - "rg -n 'previewConflicts|renderInitV2ConflictPreview' packages/agentplane/src/cli/run-cli/commands/init"
plan_approval:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
verification:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
comments: []
events: []
doc_version: 3
doc_updated_at: "2026-04-24T11:36:36.386Z"
doc_updated_by: "CODER"
description: "Remove unused init conflict-preview exports after the single init path lands and ratchet unused-export baseline where applicable."
sections:
  Summary: |-
    v0.3 freeze B3: prune orphaned init UI exports
    
    Remove unused init conflict-preview exports after the single init path lands and ratchet unused-export baseline where applicable.
  Scope: |-
    - In scope: Remove unused init conflict-preview exports after the single init path lands and ratchet unused-export baseline where applicable.
    - Out of scope: unrelated refactors not required for "v0.3 freeze B3: prune orphaned init UI exports".
  Plan: |-
    1. Implement the change for "v0.3 freeze B3: prune orphaned init UI exports".
    2. Run required checks and capture verification evidence.
    3. Finalize task findings and finish with traceable commit metadata.
  Verify Steps: |-
    1. Review the requested outcome for "v0.3 freeze B3: prune orphaned init UI exports". Expected: the visible result matches ## Summary and stays inside approved scope.
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

v0.3 freeze B3: prune orphaned init UI exports

Remove unused init conflict-preview exports after the single init path lands and ratchet unused-export baseline where applicable.

## Scope

- In scope: Remove unused init conflict-preview exports after the single init path lands and ratchet unused-export baseline where applicable.
- Out of scope: unrelated refactors not required for "v0.3 freeze B3: prune orphaned init UI exports".

## Plan

1. Implement the change for "v0.3 freeze B3: prune orphaned init UI exports".
2. Run required checks and capture verification evidence.
3. Finalize task findings and finish with traceable commit metadata.

## Verify Steps

1. Review the requested outcome for "v0.3 freeze B3: prune orphaned init UI exports". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
