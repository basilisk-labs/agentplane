---
id: "202604181607-MR97GJ"
title: "Recover v0.3.14 publish and fix release-ready gating"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 4
origin:
  system: "manual"
depends_on: []
tags:
  - "release"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-04-18T16:07:38.862Z"
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
    body: "Start: recover the exact v0.3.14 publication from merged SHA 2568c8cffc5363f691985c954f3850e6949696ce, then patch CI/publish routing so release merges that include release notes and task artifacts still emit release-ready artifacts and auto-publish."
events:
  -
    type: "status"
    at: "2026-04-18T16:07:48.962Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: recover the exact v0.3.14 publication from merged SHA 2568c8cffc5363f691985c954f3850e6949696ce, then patch CI/publish routing so release merges that include release notes and task artifacts still emit release-ready artifacts and auto-publish."
doc_version: 3
doc_updated_at: "2026-04-18T16:07:48.972Z"
doc_updated_by: "CODER"
description: "Recover the exact v0.3.14 release publication from merged SHA 2568c8cffc5363f691985c954f3850e6949696ce, then fix Core CI/publish workflow routing so release merges that include release notes and task artifacts still produce a release-ready artifact and auto-publish without manual recovery."
sections:
  Summary: |-
    Recover v0.3.14 publish and fix release-ready gating
    
    Recover the exact v0.3.14 release publication from merged SHA 2568c8cffc5363f691985c954f3850e6949696ce, then fix Core CI/publish workflow routing so release merges that include release notes and task artifacts still produce a release-ready artifact and auto-publish without manual recovery.
  Scope: |-
    - In scope: Recover the exact v0.3.14 release publication from merged SHA 2568c8cffc5363f691985c954f3850e6949696ce, then fix Core CI/publish workflow routing so release merges that include release notes and task artifacts still produce a release-ready artifact and auto-publish without manual recovery.
    - Out of scope: unrelated refactors not required for "Recover v0.3.14 publish and fix release-ready gating".
  Plan: "Recovery plan: 1) manually dispatch Core CI for exact SHA 2568c8cffc5363f691985c954f3850e6949696ce to generate the release-ready artifact for v0.3.14; 2) manually dispatch Publish to npm for the same exact SHA and verify npm serves agentplane, @agentplaneorg/core, and @agentplaneorg/recipes at 0.3.14; 3) add a code fix so release-only merges still produce release-ready/publish routing automatically, with regression tests; 4) merge that fix through branch_pr and verify cleanup plus a real install smoke path."
  Verify Steps: |-
    1. Review the requested outcome for "Recover v0.3.14 publish and fix release-ready gating". Expected: the visible result matches ## Summary and stays inside approved scope.
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

Recover v0.3.14 publish and fix release-ready gating

Recover the exact v0.3.14 release publication from merged SHA 2568c8cffc5363f691985c954f3850e6949696ce, then fix Core CI/publish workflow routing so release merges that include release notes and task artifacts still produce a release-ready artifact and auto-publish without manual recovery.

## Scope

- In scope: Recover the exact v0.3.14 release publication from merged SHA 2568c8cffc5363f691985c954f3850e6949696ce, then fix Core CI/publish workflow routing so release merges that include release notes and task artifacts still produce a release-ready artifact and auto-publish without manual recovery.
- Out of scope: unrelated refactors not required for "Recover v0.3.14 publish and fix release-ready gating".

## Plan

Recovery plan: 1) manually dispatch Core CI for exact SHA 2568c8cffc5363f691985c954f3850e6949696ce to generate the release-ready artifact for v0.3.14; 2) manually dispatch Publish to npm for the same exact SHA and verify npm serves agentplane, @agentplaneorg/core, and @agentplaneorg/recipes at 0.3.14; 3) add a code fix so release-only merges still produce release-ready/publish routing automatically, with regression tests; 4) merge that fix through branch_pr and verify cleanup plus a real install smoke path.

## Verify Steps

1. Review the requested outcome for "Recover v0.3.14 publish and fix release-ready gating". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
