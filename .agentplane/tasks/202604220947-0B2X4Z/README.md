---
id: "202604220947-0B2X4Z"
title: "Integrate current local branches into main"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 4
origin:
  system: "manual"
depends_on: []
tags:
  - "integration"
  - "release-readiness"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-04-22T09:47:44.903Z"
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
    body: "Start: audit all local branches, merge the current optimization branch into main, classify stale no-op branches, verify main, and push the integrated base before release."
events:
  -
    type: "status"
    at: "2026-04-22T09:47:52.176Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: audit all local branches, merge the current optimization branch into main, classify stale no-op branches, verify main, and push the integrated base before release."
doc_version: 3
doc_updated_at: "2026-04-22T09:47:52.182Z"
doc_updated_by: "CODER"
description: "Audit all local branches, merge the current optimization branch into main, classify stale/no-op branches, and verify main before release."
sections:
  Summary: |-
    Integrate current local branches into main
    
    Audit all local branches, merge the current optimization branch into main, classify stale/no-op branches, and verify main before release.
  Scope: |-
    - In scope: Audit all local branches, merge the current optimization branch into main, classify stale/no-op branches, and verify main before release.
    - Out of scope: unrelated refactors not required for "Integrate current local branches into main".
  Plan: |-
    1. Confirm local branch ahead/behind state and classify stale/no-op branches.
    2. Switch to main and merge codex/optimization-roadmap-tasks.
    3. Preserve current main release version state and do not merge stale v0.3.16 publication bump over newer v0.3.17 history.
    4. Run integration verification: branch status, task list summary, ci:local:fast, arch checks, knip, cold-start guard, git diff --check.
    5. Push main after verification.
  Verify Steps: |-
    1. Review the requested outcome for "Integrate current local branches into main". Expected: the visible result matches ## Summary and stays inside approved scope.
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

Integrate current local branches into main

Audit all local branches, merge the current optimization branch into main, classify stale/no-op branches, and verify main before release.

## Scope

- In scope: Audit all local branches, merge the current optimization branch into main, classify stale/no-op branches, and verify main before release.
- Out of scope: unrelated refactors not required for "Integrate current local branches into main".

## Plan

1. Confirm local branch ahead/behind state and classify stale/no-op branches.
2. Switch to main and merge codex/optimization-roadmap-tasks.
3. Preserve current main release version state and do not merge stale v0.3.16 publication bump over newer v0.3.17 history.
4. Run integration verification: branch status, task list summary, ci:local:fast, arch checks, knip, cold-start guard, git diff --check.
5. Push main after verification.

## Verify Steps

1. Review the requested outcome for "Integrate current local branches into main". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
