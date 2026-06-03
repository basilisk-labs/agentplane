---
id: "202606031915-DKGH15"
title: "Refactor pre-merge closure metadata helpers"
status: "DOING"
priority: "med"
owner: "CODER"
revision: 5
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "release"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-06-03T19:15:14.652Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-06-03T19:21:17.368Z"
  updated_by: "CODER"
  note: "Focused checks passed: targeted Vitest suite (4 files, 38 tests), bun run typecheck, bun run format:changed, bun run hotspots:check, node .agentplane/policy/check-routing.mjs, and AGENTPLANE_DEV_AUTO_BOOTSTRAP=0 ap doctor. Doctor OK with only existing historical warnings for 202605221745-8BHZSX and 202606011809-VCQPP7. Automatic framework bootstrap could not complete locally because @agentplaneorg/core tsup/esbuild service stopped; core JS was restored via bunx tsc -b packages/core --force for doctor readback."
  attempts: 0
commit: null
comments:
  -
    author: "CODER"
    body: "Start: centralize pre-merge closure marker parsing and validate PR #4402 metadata normalization before patch release."
events:
  -
    type: "status"
    at: "2026-06-03T19:21:03.785Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: centralize pre-merge closure marker parsing and validate PR #4402 metadata normalization before patch release."
  -
    type: "verify"
    at: "2026-06-03T19:21:17.368Z"
    author: "CODER"
    state: "ok"
    note: "Focused checks passed: targeted Vitest suite (4 files, 38 tests), bun run typecheck, bun run format:changed, bun run hotspots:check, node .agentplane/policy/check-routing.mjs, and AGENTPLANE_DEV_AUTO_BOOTSTRAP=0 ap doctor. Doctor OK with only existing historical warnings for 202605221745-8BHZSX and 202606011809-VCQPP7. Automatic framework bootstrap could not complete locally because @agentplaneorg/core tsup/esbuild service stopped; core JS was restored via bunx tsc -b packages/core --force for doctor readback."
doc_version: 3
doc_updated_at: "2026-06-03T19:21:17.383Z"
doc_updated_by: "CODER"
description: "Small pre-release refactor: centralize pre-merge closure marker parsing/validation, preserve merged task metadata cleanup from PR #4402, verify release readiness, then publish the next patch release."
sections:
  Summary: |-
    Refactor pre-merge closure metadata helpers

    Small pre-release refactor: centralize pre-merge closure marker parsing/validation, preserve merged task metadata cleanup from PR #4402, verify release readiness, then publish the next patch release.
  Scope: |-
    - In scope: Small pre-release refactor: centralize pre-merge closure marker parsing/validation, preserve merged task metadata cleanup from PR #4402, verify release readiness, then publish the next patch release.
    - Out of scope: unrelated refactors not required for "Refactor pre-merge closure metadata helpers".
  Plan: |-
    1. Centralize pre-merge closure marker parsing/validation into a shared PR metadata helper and replace ad hoc marker checks.
    2. Preserve the merged metadata normalization for task 202606031744-7N0FHQ inside this branch so doctor stays clean after PR #4402.
    3. Run focused tests for pre-merge closure, route/doctor drift, typecheck, format, hotspot/routing checks, and ap doctor.
    4. Open and merge the refactor PR through branch_pr.
    5. Run release preflight, publish the next patch release, and verify the GitHub release/tag/package state.
  Verify Steps: |-
    PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.

    1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
    3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-06-03T19:21:17.368Z — VERIFY — ok

    By: CODER

    Note: Focused checks passed: targeted Vitest suite (4 files, 38 tests), bun run typecheck, bun run format:changed, bun run hotspots:check, node .agentplane/policy/check-routing.mjs, and AGENTPLANE_DEV_AUTO_BOOTSTRAP=0 ap doctor. Doctor OK with only existing historical warnings for 202605221745-8BHZSX and 202606011809-VCQPP7. Automatic framework bootstrap could not complete locally because @agentplaneorg/core tsup/esbuild service stopped; core JS was restored via bunx tsc -b packages/core --force for doctor readback.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-06-03T19:21:03.785Z, excerpt_hash=sha256:4067e6c0d2671944bbb825f93b0ba7363aab826f8b2f3d8fbcbd2a2e4f1204c6

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202606031915-DKGH15-pre-merge-closure-helper-refactor/.agentplane/tasks/202606031915-DKGH15/blueprint/resolved-snapshot.json
    - old_digest: e636e21fe82df23cb82634671d780151981cb4214da61219783e5c10a7c662fc
    - current_digest: e636e21fe82df23cb82634671d780151981cb4214da61219783e5c10a7c662fc
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202606031915-DKGH15

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    - Observation: Pre-merge closure marker parsing now lives in shared pr-meta helper and consumers use the same validation semantics.
      Impact: Reduces duplicate marker parsing across hosted-close, route decision, and hosted merge sync before the next patch release.
      Resolution: Proceed to PR publication and GitHub checks.
id_source: "generated"
---
## Summary

Refactor pre-merge closure metadata helpers

Small pre-release refactor: centralize pre-merge closure marker parsing/validation, preserve merged task metadata cleanup from PR #4402, verify release readiness, then publish the next patch release.

## Scope

- In scope: Small pre-release refactor: centralize pre-merge closure marker parsing/validation, preserve merged task metadata cleanup from PR #4402, verify release readiness, then publish the next patch release.
- Out of scope: unrelated refactors not required for "Refactor pre-merge closure metadata helpers".

## Plan

1. Centralize pre-merge closure marker parsing/validation into a shared PR metadata helper and replace ad hoc marker checks.
2. Preserve the merged metadata normalization for task 202606031744-7N0FHQ inside this branch so doctor stays clean after PR #4402.
3. Run focused tests for pre-merge closure, route/doctor drift, typecheck, format, hotspot/routing checks, and ap doctor.
4. Open and merge the refactor PR through branch_pr.
5. Run release preflight, publish the next patch release, and verify the GitHub release/tag/package state.

## Verify Steps

PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.

1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-06-03T19:21:17.368Z — VERIFY — ok

By: CODER

Note: Focused checks passed: targeted Vitest suite (4 files, 38 tests), bun run typecheck, bun run format:changed, bun run hotspots:check, node .agentplane/policy/check-routing.mjs, and AGENTPLANE_DEV_AUTO_BOOTSTRAP=0 ap doctor. Doctor OK with only existing historical warnings for 202605221745-8BHZSX and 202606011809-VCQPP7. Automatic framework bootstrap could not complete locally because @agentplaneorg/core tsup/esbuild service stopped; core JS was restored via bunx tsc -b packages/core --force for doctor readback.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-06-03T19:21:03.785Z, excerpt_hash=sha256:4067e6c0d2671944bbb825f93b0ba7363aab826f8b2f3d8fbcbd2a2e4f1204c6

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202606031915-DKGH15-pre-merge-closure-helper-refactor/.agentplane/tasks/202606031915-DKGH15/blueprint/resolved-snapshot.json
- old_digest: e636e21fe82df23cb82634671d780151981cb4214da61219783e5c10a7c662fc
- current_digest: e636e21fe82df23cb82634671d780151981cb4214da61219783e5c10a7c662fc
- route_changed: no
- safe_command: agentplane blueprint snapshot 202606031915-DKGH15

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- Observation: Pre-merge closure marker parsing now lives in shared pr-meta helper and consumers use the same validation semantics.
  Impact: Reduces duplicate marker parsing across hosted-close, route decision, and hosted merge sync before the next patch release.
  Resolution: Proceed to PR publication and GitHub checks.
