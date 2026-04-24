---
id: "202604241136-H753HG"
title: "v0.3 freeze A3: whitelist agentplane package files"
status: "TODO"
priority: "high"
owner: "CODER"
revision: 1
origin:
  system: "manual"
depends_on:
  - "202604241136-CKSK2S"
tags:
  - "build"
  - "release"
  - "v0.3"
verify:
  - "npm pack --dry-run"
  - "npm pack --dry-run --ignore-scripts"
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
doc_updated_at: "2026-04-24T11:36:24.558Z"
doc_updated_by: "CODER"
description: "Tighten packages/agentplane package files so the npm tarball contains only required bin, dist, assets, README, and LICENSE artifacts."
sections:
  Summary: |-
    v0.3 freeze A3: whitelist agentplane package files
    
    Tighten packages/agentplane package files so the npm tarball contains only required bin, dist, assets, README, and LICENSE artifacts.
  Scope: |-
    - In scope: Tighten packages/agentplane package files so the npm tarball contains only required bin, dist, assets, README, and LICENSE artifacts.
    - Out of scope: unrelated refactors not required for "v0.3 freeze A3: whitelist agentplane package files".
  Plan: |-
    1. Implement the change for "v0.3 freeze A3: whitelist agentplane package files".
    2. Run required checks and capture verification evidence.
    3. Finalize task findings and finish with traceable commit metadata.
  Verify Steps: |-
    1. Review the requested outcome for "v0.3 freeze A3: whitelist agentplane package files". Expected: the visible result matches ## Summary and stays inside approved scope.
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

v0.3 freeze A3: whitelist agentplane package files

Tighten packages/agentplane package files so the npm tarball contains only required bin, dist, assets, README, and LICENSE artifacts.

## Scope

- In scope: Tighten packages/agentplane package files so the npm tarball contains only required bin, dist, assets, README, and LICENSE artifacts.
- Out of scope: unrelated refactors not required for "v0.3 freeze A3: whitelist agentplane package files".

## Plan

1. Implement the change for "v0.3 freeze A3: whitelist agentplane package files".
2. Run required checks and capture verification evidence.
3. Finalize task findings and finish with traceable commit metadata.

## Verify Steps

1. Review the requested outcome for "v0.3 freeze A3: whitelist agentplane package files". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
