---
id: "202604170852-ZE2GGY"
title: "Remove top-level scenario CLI domain"
status: "DOING"
priority: "med"
owner: "CODER"
revision: 5
origin:
  system: "manual"
depends_on: []
tags:
  - "recipes"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-04-17T08:53:13.371Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-04-17T09:03:44.665Z"
  updated_by: "CODER"
  note: "Removed the top-level scenario CLI namespace; scenario commands now live under recipes scenario, and help/runtime prompts were updated to match."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: remove the standalone scenario CLI domain and keep scenario execution reachable only through recipe-owned paths."
events:
  -
    type: "status"
    at: "2026-04-17T08:53:54.128Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: remove the standalone scenario CLI domain and keep scenario execution reachable only through recipe-owned paths."
  -
    type: "verify"
    at: "2026-04-17T09:03:44.665Z"
    author: "CODER"
    state: "ok"
    note: "Removed the top-level scenario CLI namespace; scenario commands now live under recipes scenario, and help/runtime prompts were updated to match."
doc_version: 3
doc_updated_at: "2026-04-17T09:03:44.689Z"
doc_updated_by: "CODER"
description: "Remove the standalone scenario command surface and route recipe scenarios through recipe-owned assets instead of a framework-level domain."
sections:
  Summary: |-
    Remove top-level scenario CLI domain
    
    Remove the standalone scenario command surface and route recipe scenarios through recipe-owned assets instead of a framework-level domain.
  Scope: |-
    - In scope: Remove the standalone scenario command surface and route recipe scenarios through recipe-owned assets instead of a framework-level domain.
    - Out of scope: unrelated refactors not required for "Remove top-level scenario CLI domain".
  Plan: "1. Remove the top-level scenario command catalog and related standalone CLI handlers. 2. Keep recipe scenario execution reachable through recipe-owned flows only. 3. Update built-in prompts/help/tests to stop advertising scenario as a framework domain. 4. Verify CLI routing and scenario-backed runner flows still work through the remaining recipe paths."
  Verify Steps: |-
    1. Review the requested outcome for "Remove top-level scenario CLI domain". Expected: the visible result matches ## Summary and stays inside approved scope.
    2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
    3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-17T09:03:44.665Z — VERIFY — ok
    
    By: CODER
    
    Note: Removed the top-level scenario CLI namespace; scenario commands now live under recipes scenario, and help/runtime prompts were updated to match.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-17T08:53:54.156Z, excerpt_hash=sha256:76be04f0472fa5a457b6553fa0dbca78c00a6496bc911ff3283b428743a8d326
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    - Observation: Public CLI/help drift was the main residual risk; moving command IDs without updating prompt/help text would leave a split public surface.
      Impact: Users and agent prompts would keep advertising an obsolete top-level command path even after command resolution moved.
      Resolution: Re-namespaced command specs, updated embedded prompt text, refreshed help snapshots, and passed the focused scenario/help suites.
id_source: "generated"
---
## Summary

Remove top-level scenario CLI domain

Remove the standalone scenario command surface and route recipe scenarios through recipe-owned assets instead of a framework-level domain.

## Scope

- In scope: Remove the standalone scenario command surface and route recipe scenarios through recipe-owned assets instead of a framework-level domain.
- Out of scope: unrelated refactors not required for "Remove top-level scenario CLI domain".

## Plan

1. Remove the top-level scenario command catalog and related standalone CLI handlers. 2. Keep recipe scenario execution reachable through recipe-owned flows only. 3. Update built-in prompts/help/tests to stop advertising scenario as a framework domain. 4. Verify CLI routing and scenario-backed runner flows still work through the remaining recipe paths.

## Verify Steps

1. Review the requested outcome for "Remove top-level scenario CLI domain". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-17T09:03:44.665Z — VERIFY — ok

By: CODER

Note: Removed the top-level scenario CLI namespace; scenario commands now live under recipes scenario, and help/runtime prompts were updated to match.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-17T08:53:54.156Z, excerpt_hash=sha256:76be04f0472fa5a457b6553fa0dbca78c00a6496bc911ff3283b428743a8d326

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- Observation: Public CLI/help drift was the main residual risk; moving command IDs without updating prompt/help text would leave a split public surface.
  Impact: Users and agent prompts would keep advertising an obsolete top-level command path even after command resolution moved.
  Resolution: Re-namespaced command specs, updated embedded prompt text, refreshed help snapshots, and passed the focused scenario/help suites.
