---
id: "202604191200-507P6G"
title: "Upgrade release workflows off deprecated Node 20 actions"
result_summary: "Merged via PR #481."
status: "DONE"
priority: "high"
owner: "CODER"
revision: 5
origin:
  system: "manual"
depends_on: []
tags:
  - "ci"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-04-19T12:37:11.380Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-04-19T13:19:02.721Z"
  updated_by: "CODER"
  note: "Updated release-related GitHub workflow action majors off the deprecated Node 20-based set, aligned the release workflow contract tests to the new refs, and re-ran workflow contract plus workflow lint checks."
commit:
  hash: "9d593f12eeb91bd6a5c136387f1ea928ee30d700"
  message: "ci: Upgrade release workflows off deprecated Node 20 actions (507P6G) (#481)"
comments:
  -
    author: "CODER"
    body: "Start: upgrade release-related GitHub Actions off deprecated Node 20-based majors, keep workflow contracts aligned, and validate that publish/release routes still match the new action set."
  -
    author: "INTEGRATOR"
    body: "Verified: PR #481 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
events:
  -
    type: "status"
    at: "2026-04-19T12:37:11.635Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: upgrade release-related GitHub Actions off deprecated Node 20-based majors, keep workflow contracts aligned, and validate that publish/release routes still match the new action set."
  -
    type: "verify"
    at: "2026-04-19T13:19:02.721Z"
    author: "CODER"
    state: "ok"
    note: "Updated release-related GitHub workflow action majors off the deprecated Node 20-based set, aligned the release workflow contract tests to the new refs, and re-ran workflow contract plus workflow lint checks."
  -
    type: "status"
    at: "2026-04-19T14:06:24.749Z"
    author: "INTEGRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: PR #481 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
doc_version: 3
doc_updated_at: "2026-04-19T14:06:24.755Z"
doc_updated_by: "INTEGRATOR"
description: "Move GitHub Actions used by Core CI, Docs CI, and Publish to npm onto Node 24-compatible action versions before the runner deprecation becomes a hard release blocker."
sections:
  Summary: |-
    Upgrade release workflows off deprecated Node 20 actions
    
    Move GitHub Actions used by Core CI, Docs CI, and Publish to npm onto Node 24-compatible action versions before the runner deprecation becomes a hard release blocker.
  Scope: |-
    - In scope: Move GitHub Actions used by Core CI, Docs CI, and Publish to npm onto Node 24-compatible action versions before the runner deprecation becomes a hard release blocker.
    - Out of scope: unrelated refactors not required for "Upgrade release workflows off deprecated Node 20 actions".
  Plan: |-
    1. Implement the change for "Upgrade release workflows off deprecated Node 20 actions".
    2. Run required checks and capture verification evidence.
    3. Finalize task findings and finish with traceable commit metadata.
  Verify Steps: |-
    1. Review the requested outcome for "Upgrade release workflows off deprecated Node 20 actions". Expected: the visible result matches ## Summary and stays inside approved scope.
    2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
    3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-19T13:19:02.721Z — VERIFY — ok
    
    By: CODER
    
    Note: Updated release-related GitHub workflow action majors off the deprecated Node 20-based set, aligned the release workflow contract tests to the new refs, and re-ran workflow contract plus workflow lint checks.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-19T12:37:11.643Z, excerpt_hash=sha256:3a169f249328ecb5ad95e3a8fe40c623568d9c4bb4d4b5b960cacb326e139311
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Upgrade release workflows off deprecated Node 20 actions

Move GitHub Actions used by Core CI, Docs CI, and Publish to npm onto Node 24-compatible action versions before the runner deprecation becomes a hard release blocker.

## Scope

- In scope: Move GitHub Actions used by Core CI, Docs CI, and Publish to npm onto Node 24-compatible action versions before the runner deprecation becomes a hard release blocker.
- Out of scope: unrelated refactors not required for "Upgrade release workflows off deprecated Node 20 actions".

## Plan

1. Implement the change for "Upgrade release workflows off deprecated Node 20 actions".
2. Run required checks and capture verification evidence.
3. Finalize task findings and finish with traceable commit metadata.

## Verify Steps

1. Review the requested outcome for "Upgrade release workflows off deprecated Node 20 actions". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-19T13:19:02.721Z — VERIFY — ok

By: CODER

Note: Updated release-related GitHub workflow action majors off the deprecated Node 20-based set, aligned the release workflow contract tests to the new refs, and re-ran workflow contract plus workflow lint checks.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-19T12:37:11.643Z, excerpt_hash=sha256:3a169f249328ecb5ad95e3a8fe40c623568d9c4bb4d4b5b960cacb326e139311

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
