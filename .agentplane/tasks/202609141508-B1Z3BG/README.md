---
id: "202609141508-B1Z3BG"
title: "Release AgentPlane v0.6.29"
status: "TODO"
priority: "high"
owner: "CODER"
revision: 4
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "release"
task_kind: "release"
mutation_scope: "release"
blueprint_request: "release.strict"
verify:
  - "bun run release:prepublish"
  - "git diff --check"
  - "node .agentplane/policy/check-routing.mjs"
plan_approval:
  state: "approved"
  updated_at: "2026-09-14T15:08:01.013Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
  attempts: 0
commit: null
comments: []
events: []
doc_version: 3
doc_updated_at: "2026-09-14T15:09:02.126Z"
doc_updated_by: "PLANNER"
description: "Prepare, review, merge, and publish the next 0.6 patch release from the merged maintenance fixes, with exact-SHA release evidence and post-publish install verification."
sections:
  Summary: |-
    Release AgentPlane v0.6.29

    Prepare, review, merge, and publish the next 0.6 patch release from the merged maintenance fixes, with exact-SHA release evidence and post-publish install verification.
  Scope: |-
    - In scope: Prepare, review, merge, and publish the next 0.6 patch release from the merged maintenance fixes, with exact-SHA release evidence and post-publish install verification.
    - Out of scope: unrelated refactors not required for "Release AgentPlane v0.6.29".
  Plan: |-
    1. Generate the v0.6.29 patch release plan from v0.6.28.
    2. Write complete release notes for the audited 0.6 fixes.
    3. Prepare and push the branch_pr release candidate.
    4. Require local prepublish and hosted CI on the exact candidate head.
    5. Merge to the pinned 0.6 maintenance branch and dispatch Publish to npm for the exact merged SHA.
    6. Verify GitHub release, tag, npm packages, installed CLI, and maintenance branch convergence.
  Verify Steps: |-
    1. Run bun run release:prepublish. Expected: all fast and heavy release checks pass for v0.6.29.
    2. Run bun run release:parity and node .agentplane/policy/check-routing.mjs. Expected: package versions and policy routing are consistent.
    3. Run git diff --check and confirm docs/releases/v0.6.29.md covers every entry from the frozen release plan. Expected: no whitespace errors or omitted changes.
    4. Confirm the release candidate PR targets codex/release-v0.6.27-reclaim-fix and all hosted checks pass on the exact candidate head.
    5. After merge, dispatch Publish to npm for the exact merged release SHA. Expected: workflow succeeds without tag or SHA drift.
    6. Verify tag v0.6.29, the GitHub release, npm versions for agentplane, @agentplaneorg/core, and @agentplaneorg/recipes, both CLI entrypoints, and origin/codex/release-v0.6.27-reclaim-fix convergence.
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

Release AgentPlane v0.6.29

Prepare, review, merge, and publish the next 0.6 patch release from the merged maintenance fixes, with exact-SHA release evidence and post-publish install verification.

## Scope

- In scope: Prepare, review, merge, and publish the next 0.6 patch release from the merged maintenance fixes, with exact-SHA release evidence and post-publish install verification.
- Out of scope: unrelated refactors not required for "Release AgentPlane v0.6.29".

## Plan

1. Generate the v0.6.29 patch release plan from v0.6.28.
2. Write complete release notes for the audited 0.6 fixes.
3. Prepare and push the branch_pr release candidate.
4. Require local prepublish and hosted CI on the exact candidate head.
5. Merge to the pinned 0.6 maintenance branch and dispatch Publish to npm for the exact merged SHA.
6. Verify GitHub release, tag, npm packages, installed CLI, and maintenance branch convergence.

## Verify Steps

1. Run bun run release:prepublish. Expected: all fast and heavy release checks pass for v0.6.29.
2. Run bun run release:parity and node .agentplane/policy/check-routing.mjs. Expected: package versions and policy routing are consistent.
3. Run git diff --check and confirm docs/releases/v0.6.29.md covers every entry from the frozen release plan. Expected: no whitespace errors or omitted changes.
4. Confirm the release candidate PR targets codex/release-v0.6.27-reclaim-fix and all hosted checks pass on the exact candidate head.
5. After merge, dispatch Publish to npm for the exact merged release SHA. Expected: workflow succeeds without tag or SHA drift.
6. Verify tag v0.6.29, the GitHub release, npm versions for agentplane, @agentplaneorg/core, and @agentplaneorg/recipes, both CLI entrypoints, and origin/codex/release-v0.6.27-reclaim-fix convergence.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
