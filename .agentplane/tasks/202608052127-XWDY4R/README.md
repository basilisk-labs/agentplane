---
id: "202608052127-XWDY4R"
title: "Keep release diagnostics on the current published target"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 9
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "regression"
  - "release"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-08-05T21:28:18.199Z"
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
    at: "2026-08-05T21:28:48.106Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: continue branch_pr task in the dedicated task worktree."
doc_version: 3
doc_updated_at: "2026-08-05T21:28:48.106Z"
doc_updated_by: "CODER"
description: "Prevent release next-action from mixing the current package/tag target with stale local release-plan SHA and hosted evidence; add regression coverage, merge the fix, and publish the verified v0.7.4 patch release."
sections:
  Summary: |-
    Keep release diagnostics on the current published target

    Prevent release next-action from mixing the current package/tag target with stale local release-plan SHA and hosted evidence; add regression coverage, merge the fix, and publish the verified v0.7.4 patch release.
  Scope: "In scope: scripts/release next-action and recovery evidence selection, focused tests, release notes/version artifacts required for v0.7.4, and exact-SHA publication evidence. Out of scope: task/context/runtime semantics, dependency upgrades, historical release data deletion, and unrelated open tasks."
  Plan: "1. Reproduce the stale-plan contamination with a fixture where package/tag truth is 0.7.3 but the newest local plan targets 0.7.0. 2. Change release next-action selection so stale recovery evidence cannot populate the current target release SHA or hosted truth; preserve recovery findings as explicitly historical diagnostics. 3. Add focused positive and negative regression tests for current, stale, missing, and already-published evidence. 4. Run formatting, typecheck, focused release tests, contract and critical suites, doctor, routing validation, and release prepublish. 5. Merge through the protected-main PR route. 6. Create and publish v0.7.4 from the exact merged SHA, then verify npm, tag, GitHub Release, clean install, postpublish audit, and terminal task evidence."
  Verify Steps: "1. Run the focused release next-action and recovery test suites. Expected: current target, tag, releaseSha, hosted evidence, and action remain internally consistent when the latest local plan is stale; historical recovery findings remain labelled and cannot override current truth. 2. Run bun run typecheck, formatting/lint on touched files, bun run ci:contract, bun run test:critical, agentplane doctor, and node .agentplane/policy/check-routing.mjs. Expected: all checks pass with no contract or routing regression. 3. Run bun run release:prepublish. Expected: release CI, workflow coverage, significant coverage, release-critical tests, migration and packed-install checks pass. 4. After merge, publish v0.7.4 from the exact merged SHA and run the postpublish audit plus a clean npm install of all three packages. Expected: npm latest, tag, GitHub Release, assets, installed CLI version, and evidence PR all match the same SHA/version."
  Verification: "Pending implementation and exact command evidence."
  Rollback Plan: "Before publication, revert the task PR. After publication, never reuse the npm version or move the tag; fix any release-only regression in a new patch version while preserving published evidence."
  Findings: "Observed during v0.7.3 final acceptance: release next-action selected current target version 0.7.3 but populated releaseSha and hosted evidence from a stale v0.7.0 local plan. The top-level action remained safe because registry truth won, but machine-output identity was internally inconsistent."
extensions:
  workflow_route_baseline:
    start_head_sha: "944dc6eefcd5ea79c33af066caf1078f881e371a"
    version: 1
id_source: "generated"
---
## Summary

Keep release diagnostics on the current published target

Prevent release next-action from mixing the current package/tag target with stale local release-plan SHA and hosted evidence; add regression coverage, merge the fix, and publish the verified v0.7.4 patch release.

## Scope

In scope: scripts/release next-action and recovery evidence selection, focused tests, release notes/version artifacts required for v0.7.4, and exact-SHA publication evidence. Out of scope: task/context/runtime semantics, dependency upgrades, historical release data deletion, and unrelated open tasks.

## Plan

1. Reproduce the stale-plan contamination with a fixture where package/tag truth is 0.7.3 but the newest local plan targets 0.7.0. 2. Change release next-action selection so stale recovery evidence cannot populate the current target release SHA or hosted truth; preserve recovery findings as explicitly historical diagnostics. 3. Add focused positive and negative regression tests for current, stale, missing, and already-published evidence. 4. Run formatting, typecheck, focused release tests, contract and critical suites, doctor, routing validation, and release prepublish. 5. Merge through the protected-main PR route. 6. Create and publish v0.7.4 from the exact merged SHA, then verify npm, tag, GitHub Release, clean install, postpublish audit, and terminal task evidence.

## Verify Steps

1. Run the focused release next-action and recovery test suites. Expected: current target, tag, releaseSha, hosted evidence, and action remain internally consistent when the latest local plan is stale; historical recovery findings remain labelled and cannot override current truth. 2. Run bun run typecheck, formatting/lint on touched files, bun run ci:contract, bun run test:critical, agentplane doctor, and node .agentplane/policy/check-routing.mjs. Expected: all checks pass with no contract or routing regression. 3. Run bun run release:prepublish. Expected: release CI, workflow coverage, significant coverage, release-critical tests, migration and packed-install checks pass. 4. After merge, publish v0.7.4 from the exact merged SHA and run the postpublish audit plus a clean npm install of all three packages. Expected: npm latest, tag, GitHub Release, assets, installed CLI version, and evidence PR all match the same SHA/version.

## Verification

Pending implementation and exact command evidence.

## Rollback Plan

Before publication, revert the task PR. After publication, never reuse the npm version or move the tag; fix any release-only regression in a new patch version while preserving published evidence.

## Findings

Observed during v0.7.3 final acceptance: release next-action selected current target version 0.7.3 but populated releaseSha and hosted evidence from a stale v0.7.0 local plan. The top-level action remained safe because registry truth won, but machine-output identity was internally inconsistent.
