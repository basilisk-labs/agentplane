---
id: "202608082119-P6SHBN"
title: "Publish AgentPlane 0.7.5 from merged qualified candidate"
status: "DOING"
priority: "high"
owner: "INTEGRATOR"
revision: 5
origin:
  system: "manual"
depends_on: []
tags:
  - "post-merge"
  - "release"
  - "v0.7.5"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-08-08T21:20:25.170Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
  attempts: 0
execution_route:
  frozen: true
  reason_codes:
    - "repository_branch_pr_floor"
  repository_mode: "branch_pr"
  requested_mode: "repository"
  schema_version: 1
  selected_mode: "branch_pr"
commit: null
comments:
  -
    author: "INTEGRATOR"
    body: "Start: continue branch_pr task in the dedicated task worktree."
events:
  -
    type: "status"
    at: "2026-08-08T21:21:22.918Z"
    author: "INTEGRATOR"
    from: "TODO"
    to: "DOING"
    note: "Start: continue branch_pr task in the dedicated task worktree."
doc_version: 3
doc_updated_at: "2026-08-08T21:21:22.918Z"
doc_updated_by: "INTEGRATOR"
description: "Prepare the protected-main release candidate after PR #4798, run the canonical release gates, merge the release PR, dispatch GitHub-only publication for the exact release SHA, and verify GitHub Release plus all public npm packages."
sections:
  Summary: |-
    Publish AgentPlane 0.7.5 from merged qualified candidate

    Prepare the protected-main release candidate after PR #4798, run the canonical release gates, merge the release PR, dispatch GitHub-only publication for the exact release SHA, and verify GitHub Release plus all public npm packages.
  Scope: |-
    - In scope: Prepare the protected-main release candidate after PR #4798, run the canonical release gates, merge the release PR, dispatch GitHub-only publication for the exact release SHA, and verify GitHub Release plus all public npm packages.
    - Out of scope: unrelated refactors not required for "Publish AgentPlane 0.7.5 from merged qualified candidate".
  Plan: |-
    1. Confirm origin/main contains merged PR #4798 and the release incident gate is clear.
    2. Generate the canonical patch release plan and require target version 0.7.5; prepare English release notes and a protected-main release candidate branch only.
    3. Run release parity and the full release:prepublish gate on the exact candidate SHA.
    4. Push the candidate, open a PR, require stable hosted checks and no unresolved review threads, then merge through the protected-main lane.
    5. Dispatch GitHub-only publication for the exact merged release SHA and verify the release-ready artifact, tag, GitHub Release, publish-result, and all public npm packages.
    6. Record exact-SHA evidence and finish the task; stop on version drift, dirty tracked state, failed gate, missing release artifact, or registry mismatch.
  Verify Steps: |-
    1. `bun run release:incidents:check` passes before release planning.
    2. The canonical release plan targets exactly `0.7.5`; all three public packages and both CLI dependency pins equal `0.7.5`, and `docs/releases/v0.7.5.md` satisfies release-note validation.
    3. `bun run release:parity` and `bun run release:prepublish` pass on the exact release-candidate SHA.
    4. The release PR has no unresolved review threads and all required GitHub checks pass on its exact head SHA; merged `main` contains that SHA.
    5. `Publish release` succeeds for the exact merged release SHA and emits the canonical `publish-result`; tag and GitHub Release `v0.7.5` exist.
    6. `node scripts/release/check-published-packages.mjs` confirms `agentplane`, `@agentplaneorg/core`, and `@agentplaneorg/recipes` at `0.7.5`.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
extensions:
  workflow_route_baseline:
    start_head_sha: "5c04e19b294d7467300df3843dde031ecf43671d"
    version: 1
id_source: "generated"
---
## Summary

Publish AgentPlane 0.7.5 from merged qualified candidate

Prepare the protected-main release candidate after PR #4798, run the canonical release gates, merge the release PR, dispatch GitHub-only publication for the exact release SHA, and verify GitHub Release plus all public npm packages.

## Scope

- In scope: Prepare the protected-main release candidate after PR #4798, run the canonical release gates, merge the release PR, dispatch GitHub-only publication for the exact release SHA, and verify GitHub Release plus all public npm packages.
- Out of scope: unrelated refactors not required for "Publish AgentPlane 0.7.5 from merged qualified candidate".

## Plan

1. Confirm origin/main contains merged PR #4798 and the release incident gate is clear.
2. Generate the canonical patch release plan and require target version 0.7.5; prepare English release notes and a protected-main release candidate branch only.
3. Run release parity and the full release:prepublish gate on the exact candidate SHA.
4. Push the candidate, open a PR, require stable hosted checks and no unresolved review threads, then merge through the protected-main lane.
5. Dispatch GitHub-only publication for the exact merged release SHA and verify the release-ready artifact, tag, GitHub Release, publish-result, and all public npm packages.
6. Record exact-SHA evidence and finish the task; stop on version drift, dirty tracked state, failed gate, missing release artifact, or registry mismatch.

## Verify Steps

1. `bun run release:incidents:check` passes before release planning.
2. The canonical release plan targets exactly `0.7.5`; all three public packages and both CLI dependency pins equal `0.7.5`, and `docs/releases/v0.7.5.md` satisfies release-note validation.
3. `bun run release:parity` and `bun run release:prepublish` pass on the exact release-candidate SHA.
4. The release PR has no unresolved review threads and all required GitHub checks pass on its exact head SHA; merged `main` contains that SHA.
5. `Publish release` succeeds for the exact merged release SHA and emits the canonical `publish-result`; tag and GitHub Release `v0.7.5` exist.
6. `node scripts/release/check-published-packages.mjs` confirms `agentplane`, `@agentplaneorg/core`, and `@agentplaneorg/recipes` at `0.7.5`.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
