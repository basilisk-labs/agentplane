---
id: "202608021232-53WJMN"
title: "Audit GitHub issues and pull requests for v0.7.1"
status: "DOING"
priority: "high"
owner: "REVIEWER"
revision: 4
origin:
  system: "manual"
depends_on: []
tags:
  - "github-audit"
  - "v0.7.1"
task_kind: "release"
mutation_scope: "release"
risk_flags:
  - "external_system"
  - "network"
blueprint_request: "release.strict"
verify:
  - "gh issue list --state open --limit 200"
  - "gh pr list --state open --limit 200"
plan_approval:
  state: "approved"
  updated_at: "2026-08-03T12:38:50.187Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
  attempts: 0
commit: null
comments:
  -
    author: "REVIEWER"
    body: "Start: continue branch_pr task in the dedicated task worktree."
events:
  -
    type: "status"
    at: "2026-08-03T12:39:16.295Z"
    author: "REVIEWER"
    from: "TODO"
    to: "DOING"
    note: "Start: continue branch_pr task in the dedicated task worktree."
doc_version: 3
doc_updated_at: "2026-08-03T12:39:16.295Z"
doc_updated_by: "REVIEWER"
description: "Triage all open GitHub issues and pull requests against the exact main candidate, reproduce release-relevant reports, implement or create bounded follow-up tasks for confirmed blockers, close or disposition stale duplicates with evidence, and preserve hosted truth for the release decision."
sections:
  Summary: |-
    Audit GitHub issues and pull requests for v0.7.1

    Triage all open GitHub issues and pull requests against the exact main candidate, reproduce release-relevant reports, implement or create bounded follow-up tasks for confirmed blockers, close or disposition stale duplicates with evidence, and preserve hosted truth for the release decision.
  Scope: |-
    - In scope: Triage all open GitHub issues and pull requests against the exact main candidate, reproduce release-relevant reports, implement or create bounded follow-up tasks for confirmed blockers, close or disposition stale duplicates with evidence, and preserve hosted truth for the release decision.
    - Out of scope: unrelated refactors not required for "Audit GitHub issues and pull requests for v0.7.1".
  Plan: "Audit GitHub truth against current main acf9af541: reproduce issues #4663 and #4641 with isolated fixtures and focused current-main tests; classify every open PR by hosted state, unique commits, conflict/check status, release relevance, and whether main already supersedes it; close or disposition only items with direct evidence; create bounded code follow-up tasks for confirmed release-relevant defects instead of editing implementation in this REVIEWER task; record all commands, results, residual risks, and release recommendations in the task artifact; finish only when the open issue/PR inventory is refreshed and every item has an explicit disposition."
  Verify Steps: |-
    PLANNER fallback scaffold for "Audit GitHub issues and pull requests for v0.7.1". Replace with task-specific acceptance checks when PLANNER context is available.

    1. Review the requested outcome for "Audit GitHub issues and pull requests for v0.7.1". Expected: the visible result matches ## Summary and stays inside approved scope.
    2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
    3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
extensions:
  workflow_route_baseline:
    start_head_sha: "acf9af541b44c6b7af8dd8c680927b1b0b736382"
    version: 1
id_source: "generated"
---
## Summary

Audit GitHub issues and pull requests for v0.7.1

Triage all open GitHub issues and pull requests against the exact main candidate, reproduce release-relevant reports, implement or create bounded follow-up tasks for confirmed blockers, close or disposition stale duplicates with evidence, and preserve hosted truth for the release decision.

## Scope

- In scope: Triage all open GitHub issues and pull requests against the exact main candidate, reproduce release-relevant reports, implement or create bounded follow-up tasks for confirmed blockers, close or disposition stale duplicates with evidence, and preserve hosted truth for the release decision.
- Out of scope: unrelated refactors not required for "Audit GitHub issues and pull requests for v0.7.1".

## Plan

Audit GitHub truth against current main acf9af541: reproduce issues #4663 and #4641 with isolated fixtures and focused current-main tests; classify every open PR by hosted state, unique commits, conflict/check status, release relevance, and whether main already supersedes it; close or disposition only items with direct evidence; create bounded code follow-up tasks for confirmed release-relevant defects instead of editing implementation in this REVIEWER task; record all commands, results, residual risks, and release recommendations in the task artifact; finish only when the open issue/PR inventory is refreshed and every item has an explicit disposition.

## Verify Steps

PLANNER fallback scaffold for "Audit GitHub issues and pull requests for v0.7.1". Replace with task-specific acceptance checks when PLANNER context is available.

1. Review the requested outcome for "Audit GitHub issues and pull requests for v0.7.1". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
