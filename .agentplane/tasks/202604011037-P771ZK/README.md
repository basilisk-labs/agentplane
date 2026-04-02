---
id: "202604011037-P771ZK"
title: "Fix v0.3.8 release-prepublish blockers"
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
  updated_at: "2026-04-01T10:37:28.645Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-04-02T15:08:34.974Z"
  updated_by: "CODER"
  note: "Command: bun run build && bunx vitest run packages/agentplane/src/cli/stale-dist-policy.test.ts packages/agentplane/src/cli/stale-dist-readonly.test.ts packages/agentplane/src/cli/measure-cli-cold-path-script.test.ts --reporter=verbose. Result: pass. Evidence: build passed; 3 files, 12 tests green; preflight stale-dist regression covered. Scope: release-prepublish blocker around preflight cold-path behavior."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: reproduce the failing release gates, fix the regressions blocking v0.3.8, rerun prepublish, and only then continue with publication."
events:
  -
    type: "status"
    at: "2026-04-01T10:37:30.496Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: reproduce the failing release gates, fix the regressions blocking v0.3.8, rerun prepublish, and only then continue with publication."
  -
    type: "verify"
    at: "2026-04-02T15:08:34.974Z"
    author: "CODER"
    state: "ok"
    note: "Command: bun run build && bunx vitest run packages/agentplane/src/cli/stale-dist-policy.test.ts packages/agentplane/src/cli/stale-dist-readonly.test.ts packages/agentplane/src/cli/measure-cli-cold-path-script.test.ts --reporter=verbose. Result: pass. Evidence: build passed; 3 files, 12 tests green; preflight stale-dist regression covered. Scope: release-prepublish blocker around preflight cold-path behavior."
doc_version: 3
doc_updated_at: "2026-04-02T15:08:34.978Z"
doc_updated_by: "CODER"
description: "Investigate and fix the failing release-prepublish tests and runtime regressions blocking the v0.3.8 patch release, then re-run release gates and publish."
sections:
  Summary: |-
    Fix v0.3.8 release-prepublish blockers
    
    Investigate and fix the failing release-prepublish tests and runtime regressions blocking the v0.3.8 patch release, then re-run release gates and publish.
  Scope: |-
    - In scope: Investigate and fix the failing release-prepublish tests and runtime regressions blocking the v0.3.8 patch release, then re-run release gates and publish.
    - Out of scope: unrelated refactors not required for "Fix v0.3.8 release-prepublish blockers".
  Plan: "1. Reproduce the current release-prepublish blockers with focused failing tests. 2. Fix the regressions in the smallest safe set of code changes while keeping the release notes and release target at v0.3.8. 3. Re-run targeted suites, then rerun release:prepublish, and only if green continue with release apply --push and post-publish verification."
  Verify Steps: |-
    <!-- TODO: REPLACE WITH TASK-SPECIFIC ACCEPTANCE STEPS -->
    
    1. <Action>. Expected: <observable result>.
    2. <Action>. Expected: <observable result>.
    3. <Action>. Expected: <observable result>.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-02T15:08:34.974Z — VERIFY — ok
    
    By: CODER
    
    Note: Command: bun run build && bunx vitest run packages/agentplane/src/cli/stale-dist-policy.test.ts packages/agentplane/src/cli/stale-dist-readonly.test.ts packages/agentplane/src/cli/measure-cli-cold-path-script.test.ts --reporter=verbose. Result: pass. Evidence: build passed; 3 files, 12 tests green; preflight stale-dist regression covered. Scope: release-prepublish blocker around preflight cold-path behavior.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-01T10:37:30.515Z, excerpt_hash=sha256:5d419a099ca6ed7132cf75ede098e500ba03c9ec835a77f962f63f83b789e100
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Fix v0.3.8 release-prepublish blockers

Investigate and fix the failing release-prepublish tests and runtime regressions blocking the v0.3.8 patch release, then re-run release gates and publish.

## Scope

- In scope: Investigate and fix the failing release-prepublish tests and runtime regressions blocking the v0.3.8 patch release, then re-run release gates and publish.
- Out of scope: unrelated refactors not required for "Fix v0.3.8 release-prepublish blockers".

## Plan

1. Reproduce the current release-prepublish blockers with focused failing tests. 2. Fix the regressions in the smallest safe set of code changes while keeping the release notes and release target at v0.3.8. 3. Re-run targeted suites, then rerun release:prepublish, and only if green continue with release apply --push and post-publish verification.

## Verify Steps

<!-- TODO: REPLACE WITH TASK-SPECIFIC ACCEPTANCE STEPS -->

1. <Action>. Expected: <observable result>.
2. <Action>. Expected: <observable result>.
3. <Action>. Expected: <observable result>.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-02T15:08:34.974Z — VERIFY — ok

By: CODER

Note: Command: bun run build && bunx vitest run packages/agentplane/src/cli/stale-dist-policy.test.ts packages/agentplane/src/cli/stale-dist-readonly.test.ts packages/agentplane/src/cli/measure-cli-cold-path-script.test.ts --reporter=verbose. Result: pass. Evidence: build passed; 3 files, 12 tests green; preflight stale-dist regression covered. Scope: release-prepublish blocker around preflight cold-path behavior.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-01T10:37:30.515Z, excerpt_hash=sha256:5d419a099ca6ed7132cf75ede098e500ba03c9ec835a77f962f63f83b789e100

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
