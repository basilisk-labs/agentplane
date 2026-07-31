---
id: "202607311143-YT435C"
title: "Release AgentPlane v0.6.26"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 6
origin:
  system: "manual"
depends_on: []
tags:
  - "maintenance"
  - "release"
task_kind: "release"
mutation_scope: "release"
risk_flags:
  - "external_system"
  - "merge"
  - "network"
  - "publish"
blueprint_request: "release.strict"
verify:
  - "bun run release:prepublish"
  - "bun test packages/agentplane/src/cli/run-cli.core.route-decision.direct-closeout.test.ts packages/agentplane/src/cli/run-cli.core.route-decision.quality.test.ts"
  - "node scripts/check-release-incidents.mjs"
  - "node scripts/release/check-task-registry-ready.mjs --allow-active-release-task"
plan_approval:
  state: "approved"
  updated_at: "2026-07-31T11:43:48.615Z"
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
    body: "Start: prepare and publish v0.6.26 exclusively from the v0.6.24 maintenance branch, with exact-SHA hosted verification and no main integration."
events:
  -
    type: "status"
    at: "2026-07-31T11:44:30.701Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: prepare and publish v0.6.26 exclusively from the v0.6.24 maintenance branch, with exact-SHA hosted verification and no main integration."
doc_version: 3
doc_updated_at: "2026-07-31T12:48:58.554Z"
doc_updated_by: "CODER"
description: "Prepare and publish v0.6.26 exclusively from codex/fix-v0.6.24-closeout-route, including release notes for the routing fixes, version parity, full release gates, exact-SHA hosted CI, npm publication, GitHub Release verification, and proof that main does not contain the maintenance release."
sections:
  Summary: |-
    Release AgentPlane v0.6.26

    Prepare and publish v0.6.26 exclusively from codex/fix-v0.6.24-closeout-route, including release notes for the routing fixes, version parity, full release gates, exact-SHA hosted CI, npm publication, GitHub Release verification, and proof that main does not contain the maintenance release.
  Scope: |-
    - In scope: Prepare and publish v0.6.26 exclusively from codex/fix-v0.6.24-closeout-route, including release notes for the routing fixes, version parity, full release gates, exact-SHA hosted CI, npm publication, GitHub Release verification, and proof that main does not contain the maintenance release.
    - Out of scope: unrelated refactors not required for "Release AgentPlane v0.6.26".
  Plan: "1. Freeze v0.6.26 from maintenance head e14cbbee only and verify incidents/task registry are release-ready. 2. Generate release plan and human-readable notes covering the direct-workflow loop, safe terminal stop, untracked task persistence, task-begin handoff, and fresh pre-merge closure invariant. 3. Create the release candidate with version parity, run full release:prepublish plus focused routing checks, and obtain evaluator/pre-merge closure evidence. 4. Merge the candidate only into codex/fix-v0.6.24-closeout-route after hosted checks. 5. Dispatch Publish to npm for the exact release SHA and verify npm gitHead, tag, GitHub Release, maintenance ancestry, and exclusion from main."
  Verify Steps: |-
    1. Run bun run release:prepublish. Expected: all 82 isolated release groups, workflow tests, significant coverage, release-critical tests, parity, notes, pack, and frozen-install checks pass.
    2. Run bun test packages/agentplane/src/cli/run-cli.core.route-decision.direct-closeout.test.ts packages/agentplane/src/cli/run-cli.core.route-decision.quality.test.ts. Expected: the reported direct loop and analogous stale-closeout regressions pass.
    3. Run node scripts/check-release-incidents.mjs and node scripts/release/check-task-registry-ready.mjs --allow-active-release-task. Expected: no active incidents or blocking task-registry drift.
    4. Verify hosted checks for the candidate PR, publish exact merged SHA, and confirm tag/GitHub Release/npm gitHead all equal the release commit while git merge-base --is-ancestor <release-sha> origin/main fails.
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

Release AgentPlane v0.6.26

Prepare and publish v0.6.26 exclusively from codex/fix-v0.6.24-closeout-route, including release notes for the routing fixes, version parity, full release gates, exact-SHA hosted CI, npm publication, GitHub Release verification, and proof that main does not contain the maintenance release.

## Scope

- In scope: Prepare and publish v0.6.26 exclusively from codex/fix-v0.6.24-closeout-route, including release notes for the routing fixes, version parity, full release gates, exact-SHA hosted CI, npm publication, GitHub Release verification, and proof that main does not contain the maintenance release.
- Out of scope: unrelated refactors not required for "Release AgentPlane v0.6.26".

## Plan

1. Freeze v0.6.26 from maintenance head e14cbbee only and verify incidents/task registry are release-ready. 2. Generate release plan and human-readable notes covering the direct-workflow loop, safe terminal stop, untracked task persistence, task-begin handoff, and fresh pre-merge closure invariant. 3. Create the release candidate with version parity, run full release:prepublish plus focused routing checks, and obtain evaluator/pre-merge closure evidence. 4. Merge the candidate only into codex/fix-v0.6.24-closeout-route after hosted checks. 5. Dispatch Publish to npm for the exact release SHA and verify npm gitHead, tag, GitHub Release, maintenance ancestry, and exclusion from main.

## Verify Steps

1. Run bun run release:prepublish. Expected: all 82 isolated release groups, workflow tests, significant coverage, release-critical tests, parity, notes, pack, and frozen-install checks pass.
2. Run bun test packages/agentplane/src/cli/run-cli.core.route-decision.direct-closeout.test.ts packages/agentplane/src/cli/run-cli.core.route-decision.quality.test.ts. Expected: the reported direct loop and analogous stale-closeout regressions pass.
3. Run node scripts/check-release-incidents.mjs and node scripts/release/check-task-registry-ready.mjs --allow-active-release-task. Expected: no active incidents or blocking task-registry drift.
4. Verify hosted checks for the candidate PR, publish exact merged SHA, and confirm tag/GitHub Release/npm gitHead all equal the release commit while git merge-base --is-ancestor <release-sha> origin/main fails.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
