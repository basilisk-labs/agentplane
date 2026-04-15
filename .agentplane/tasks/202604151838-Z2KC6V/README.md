---
id: "202604151838-Z2KC6V"
title: "Prefer artifact-bearing recovery run over artifact-missing direct Core CI run"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 5
origin:
  system: "manual"
depends_on: []
tags:
  - "release"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-04-15T18:40:06.140Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-04-15T18:42:51.968Z"
  updated_by: "CODER"
  note: "Targeted resolver regression tests passed; live exact-sha resolution now selects recovery run 24464054933 with artifact release-ready-ceaa8754... instead of stopping at direct artifact-missing run 24402404778."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: update release-ready resolver fallback to continue past artifact-missing direct success runs and prefer later exact artifact-bearing recovery runs for canonical publish."
events:
  -
    type: "status"
    at: "2026-04-15T18:40:37.912Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: update release-ready resolver fallback to continue past artifact-missing direct success runs and prefer later exact artifact-bearing recovery runs for canonical publish."
  -
    type: "verify"
    at: "2026-04-15T18:42:51.968Z"
    author: "CODER"
    state: "ok"
    note: "Targeted resolver regression tests passed; live exact-sha resolution now selects recovery run 24464054933 with artifact release-ready-ceaa8754... instead of stopping at direct artifact-missing run 24402404778."
doc_version: 3
doc_updated_at: "2026-04-15T18:42:51.987Z"
doc_updated_by: "CODER"
description: "When resolving release-ready source for a canonical release SHA, continue past a successful direct Core CI run that lacks release-ready artifacts and prefer a later successful recovery run that actually carries the exact release-ready artifact."
sections:
  Summary: |-
    Prefer artifact-bearing recovery run over artifact-missing direct Core CI run
    
    When resolving release-ready source for a canonical release SHA, continue past a successful direct Core CI run that lacks release-ready artifacts and prefer a later successful recovery run that actually carries the exact release-ready artifact.
  Scope: |-
    - In scope: When resolving release-ready source for a canonical release SHA, continue past a successful direct Core CI run that lacks release-ready artifacts and prefer a later successful recovery run that actually carries the exact release-ready artifact.
    - Out of scope: unrelated refactors not required for "Prefer artifact-bearing recovery run over artifact-missing direct Core CI run".
  Plan: |-
    1. Update release-ready resolver fallback so artifact-missing direct success runs do not terminate exact-SHA lookup. -> verify: targeted resolver regression test covers direct-run-missing-artifact plus later recovery alias artifact.
    2. Keep the change surgical in resolver selection logic only. -> verify: existing exact/generic artifact tests still pass.
    3. Re-run publish workflow for canonical 0.3.12 release path after merge. -> verify: publish detect resolves ceaa8754 artifact-bearing run and 0.3.12 reaches tag/npm.
  Verify Steps: |-
    1. Review the requested outcome for "Prefer artifact-bearing recovery run over artifact-missing direct Core CI run". Expected: the visible result matches ## Summary and stays inside approved scope.
    2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
    3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-15T18:42:51.968Z — VERIFY — ok
    
    By: CODER
    
    Note: Targeted resolver regression tests passed; live exact-sha resolution now selects recovery run 24464054933 with artifact release-ready-ceaa8754... instead of stopping at direct artifact-missing run 24402404778.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-15T18:40:37.922Z, excerpt_hash=sha256:fc28c8a70402f7ee600e1a8854856086d5ca2284d9717c7a8e047a16a8fe6537
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Prefer artifact-bearing recovery run over artifact-missing direct Core CI run

When resolving release-ready source for a canonical release SHA, continue past a successful direct Core CI run that lacks release-ready artifacts and prefer a later successful recovery run that actually carries the exact release-ready artifact.

## Scope

- In scope: When resolving release-ready source for a canonical release SHA, continue past a successful direct Core CI run that lacks release-ready artifacts and prefer a later successful recovery run that actually carries the exact release-ready artifact.
- Out of scope: unrelated refactors not required for "Prefer artifact-bearing recovery run over artifact-missing direct Core CI run".

## Plan

1. Update release-ready resolver fallback so artifact-missing direct success runs do not terminate exact-SHA lookup. -> verify: targeted resolver regression test covers direct-run-missing-artifact plus later recovery alias artifact.
2. Keep the change surgical in resolver selection logic only. -> verify: existing exact/generic artifact tests still pass.
3. Re-run publish workflow for canonical 0.3.12 release path after merge. -> verify: publish detect resolves ceaa8754 artifact-bearing run and 0.3.12 reaches tag/npm.

## Verify Steps

1. Review the requested outcome for "Prefer artifact-bearing recovery run over artifact-missing direct Core CI run". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-15T18:42:51.968Z — VERIFY — ok

By: CODER

Note: Targeted resolver regression tests passed; live exact-sha resolution now selects recovery run 24464054933 with artifact release-ready-ceaa8754... instead of stopping at direct artifact-missing run 24402404778.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-15T18:40:37.922Z, excerpt_hash=sha256:fc28c8a70402f7ee600e1a8854856086d5ca2284d9717c7a8e047a16a8fe6537

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
