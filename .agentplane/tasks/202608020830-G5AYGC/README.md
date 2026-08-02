---
id: "202608020830-G5AYGC"
title: "Disambiguate release evidence task selection"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 7
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "evidence"
  - "postrelease"
  - "v0.7"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-08-02T08:31:05.125Z"
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
    author: "CODER"
    body: "Start: continue branch_pr task in the dedicated task worktree."
events:
  -
    type: "status"
    at: "2026-08-02T08:31:33.718Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: continue branch_pr task in the dedicated task worktree."
doc_version: 3
doc_updated_at: "2026-08-02T08:40:44.827Z"
doc_updated_by: "CODER"
description: "Fix post-publish evidence discovery so code tasks tagged release are not treated as release tasks; add regression coverage and record the authoritative v0.7.0 publish result on task 202607221854-XV67TD."
sections:
  Summary: |-
    Disambiguate release evidence task selection

    Fix post-publish evidence discovery so code tasks tagged release are not treated as release tasks; add regression coverage and record the authoritative v0.7.0 publish result on task 202607221854-XV67TD.
  Scope: |-
    - In scope: make release evidence discovery require semantic release classification (`task_kind=release` or `mutation_scope=release`); add regression coverage for code tasks that merely carry a `release` tag; apply the authoritative publish-result from run 30739430330 to release task 202607221854-XV67TD.
    - Out of scope: republishing v0.7.0, moving its tag, changing release contents, or unrelated task-classification refactors.
  Plan: |-
    1. Reproduce the ambiguous release-task selection against the authoritative v0.7.0 publish result and isolate the classifier boundary.
    2. Tighten release-task discovery to semantic release kind/scope and add a regression fixture proving tag-only code tasks are excluded.
    3. Run focused tests and repository gates, then apply the exact hosted publish evidence to task 202607221854-XV67TD.
    4. Record independent verification and integrate the follow-up through the protected branch workflow.
  Verify Steps: |-
    1. Run `bun test packages/agentplane/src/commands/release/release-task-evidence-script.test.ts`. Expected: all tests pass, including a case where a DONE code task tagged `release` and `v0.7` is not selected as the release task.
    2. Run `bun scripts/release-task-evidence.mjs prepare --publish-result <authoritative-v0.7.0-result> --json`. Expected: it resolves exactly task `202607221854-XV67TD` with no ambiguity.
    3. Run `bun scripts/release-task-evidence.mjs apply --publish-result <authoritative-v0.7.0-result> --task-id 202607221854-XV67TD --json`, then inspect that task README. Expected: exact SHA, tag, workflow run, npm, GHCR, GitHub Release, and external distribution evidence are recorded without changing release state.
    4. Run `ap doctor` and `node .agentplane/policy/check-routing.mjs`. Expected: both repository gates pass.
    5. Review the diff against scope. Expected: no tag movement, republish, version change, or unrelated task mutation.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    - Observation: release-task-evidence treated any DONE task tagged release as a release task, so code task 202607221908-PWFH5K made v0.7.0 discovery ambiguous.
      Impact: The publish workflow skipped its optional task-evidence follow-up even though publish-result remained authoritative and all release channels succeeded.
      Resolution: Require semantic task_kind=release or mutation_scope=release, cover the tag-only code-task regression, preserve verification attempts, and record GHCR plus external distribution evidence.
      Promotion: incident-candidate
      Fixability: repo-fixable
extensions:
  workflow_route_baseline:
    start_head_sha: "9a8c2695c104897b26007a3dada75e37f562a840"
    version: 1
id_source: "generated"
---
## Summary

Disambiguate release evidence task selection

Fix post-publish evidence discovery so code tasks tagged release are not treated as release tasks; add regression coverage and record the authoritative v0.7.0 publish result on task 202607221854-XV67TD.

## Scope

- In scope: make release evidence discovery require semantic release classification (`task_kind=release` or `mutation_scope=release`); add regression coverage for code tasks that merely carry a `release` tag; apply the authoritative publish-result from run 30739430330 to release task 202607221854-XV67TD.
- Out of scope: republishing v0.7.0, moving its tag, changing release contents, or unrelated task-classification refactors.

## Plan

1. Reproduce the ambiguous release-task selection against the authoritative v0.7.0 publish result and isolate the classifier boundary.
2. Tighten release-task discovery to semantic release kind/scope and add a regression fixture proving tag-only code tasks are excluded.
3. Run focused tests and repository gates, then apply the exact hosted publish evidence to task 202607221854-XV67TD.
4. Record independent verification and integrate the follow-up through the protected branch workflow.

## Verify Steps

1. Run `bun test packages/agentplane/src/commands/release/release-task-evidence-script.test.ts`. Expected: all tests pass, including a case where a DONE code task tagged `release` and `v0.7` is not selected as the release task.
2. Run `bun scripts/release-task-evidence.mjs prepare --publish-result <authoritative-v0.7.0-result> --json`. Expected: it resolves exactly task `202607221854-XV67TD` with no ambiguity.
3. Run `bun scripts/release-task-evidence.mjs apply --publish-result <authoritative-v0.7.0-result> --task-id 202607221854-XV67TD --json`, then inspect that task README. Expected: exact SHA, tag, workflow run, npm, GHCR, GitHub Release, and external distribution evidence are recorded without changing release state.
4. Run `ap doctor` and `node .agentplane/policy/check-routing.mjs`. Expected: both repository gates pass.
5. Review the diff against scope. Expected: no tag movement, republish, version change, or unrelated task mutation.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- Observation: release-task-evidence treated any DONE task tagged release as a release task, so code task 202607221908-PWFH5K made v0.7.0 discovery ambiguous.
  Impact: The publish workflow skipped its optional task-evidence follow-up even though publish-result remained authoritative and all release channels succeeded.
  Resolution: Require semantic task_kind=release or mutation_scope=release, cover the tag-only code-task regression, preserve verification attempts, and record GHCR plus external distribution evidence.
  Promotion: incident-candidate
  Fixability: repo-fixable
