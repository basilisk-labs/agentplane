---
id: "202608082119-P6SHBN"
title: "Publish AgentPlane 0.7.5 from merged qualified candidate"
status: "DOING"
priority: "high"
owner: "INTEGRATOR"
revision: 9
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
  state: "ok"
  updated_at: "2026-08-08T22:06:01.450Z"
  updated_by: "TESTER"
  note: "Release candidate verification passed at 173f556bcb3bdb795c74d688d065ef7ddc9537d6. Local canonical prepublish, parity, version, notes, compatibility, migration, install, workflow, significant, and critical gates passed. All hosted PR checks on the same SHA passed. Exact merged-main validation and public registry checks remain downstream release gates."
  attempts: 0
execution_route:
  frozen: true
  reason_codes:
    - "repository_branch_pr_floor"
  repository_mode: "branch_pr"
  requested_mode: "repository"
  schema_version: 1
  selected_mode: "branch_pr"
commit:
  hash: "7761346d3f0f698e984e4893640d64c4959d5836"
  message: "🧪 P6SHBN release: reconstruct 0.7.5 compatibility surface"
comments:
  -
    author: "INTEGRATOR"
    body: "Start: continue branch_pr task in the dedicated task worktree."
  -
    author: "CODER"
    body: "Implementation: expanded the audited v0.7.5 release notes to satisfy the exact plan coverage gate."
  -
    author: "CODER"
    body: "Review fix: reconstructed the independent compatibility surface at 0.7.5 and updated expected digests; targeted critical test and compatibility baseline check pass."
events:
  -
    type: "status"
    at: "2026-08-08T21:21:22.918Z"
    author: "INTEGRATOR"
    from: "TODO"
    to: "DOING"
    note: "Start: continue branch_pr task in the dedicated task worktree."
  -
    type: "status"
    at: "2026-08-08T21:24:41.663Z"
    author: "CODER"
    from: "DOING"
    to: "DOING"
    note: "Implementation: expanded the audited v0.7.5 release notes to satisfy the exact plan coverage gate."
    commit: "f2cbaf77efb7ec0b3bad24f5146fef2b2d03d5fd"
  -
    type: "verify"
    at: "2026-08-08T22:04:16.876Z"
    author: "TESTER"
    state: "ok"
    note: "Local candidate verification passed at 173f556bcb3bdb795c74d688d065ef7ddc9537d6: release incidents clear; version and dependency parity are exactly 0.7.5; release notes validation passes with 520 bullets; release:prepublish passed 102/102 release-ci chunks, 8 migration scenarios, local tarball install, workflow 13 files/50 tests, significant 19/204, and release-critical 4/16. Hosted checks, exact merged-main validation, GitHub Release, and npm publication remain mandatory downstream gates."
  -
    type: "verify"
    at: "2026-08-08T22:06:01.450Z"
    author: "TESTER"
    state: "ok"
    note: "Release candidate verification passed at 173f556bcb3bdb795c74d688d065ef7ddc9537d6. Local canonical prepublish, parity, version, notes, compatibility, migration, install, workflow, significant, and critical gates passed. All hosted PR checks on the same SHA passed. Exact merged-main validation and public registry checks remain downstream release gates."
  -
    type: "status"
    at: "2026-08-08T22:07:37.735Z"
    author: "CODER"
    from: "DOING"
    to: "DOING"
    note: "Review fix: reconstructed the independent compatibility surface at 0.7.5 and updated expected digests; targeted critical test and compatibility baseline check pass."
    commit: "7761346d3f0f698e984e4893640d64c4959d5836"
doc_version: 3
doc_updated_at: "2026-08-08T22:07:37.735Z"
doc_updated_by: "CODER"
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
    ### 2026-08-08T22:04:16.876Z — VERIFY — ok

    By: TESTER

    Note: Local candidate verification passed at 173f556bcb3bdb795c74d688d065ef7ddc9537d6: release incidents clear; version and dependency parity are exactly 0.7.5; release notes validation passes with 520 bullets; release:prepublish passed 102/102 release-ci chunks, 8 migration scenarios, local tarball install, workflow 13 files/50 tests, significant 19/204, and release-critical 4/16. Hosted checks, exact merged-main validation, GitHub Release, and npm publication remain mandatory downstream gates.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-08T21:24:41.663Z, excerpt_hash=sha256:2cdcc3fcedc120041b7b775f20da1a8b2e378301549d87ec45e61a69337edf99

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/release-075-control.LxivIl/repo/.agentplane/worktrees/202608082119-P6SHBN-publish-agentplane-0-7-5-from-merged-qualified-c/.agentplane/tasks/202608082119-P6SHBN/blueprint/resolved-snapshot.json
    - old_digest: cf333249043ca09e55b4bd4bc27d7faf8612397b9947d6cac6d9e62786b5f977
    - current_digest: cf333249043ca09e55b4bd4bc27d7faf8612397b9947d6cac6d9e62786b5f977
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202608082119-P6SHBN

    DecisionContextRef:
    - operator_action: stop
    - can_execute_now: false
    - safe_command: none
    - diagnostic_command: agentplane task verify-show 202608082119-P6SHBN
    - source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: false
    - repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
    - risks: none

    ### 2026-08-08T22:06:01.450Z — VERIFY — ok

    By: TESTER

    Note: Release candidate verification passed at 173f556bcb3bdb795c74d688d065ef7ddc9537d6. Local canonical prepublish, parity, version, notes, compatibility, migration, install, workflow, significant, and critical gates passed. All hosted PR checks on the same SHA passed. Exact merged-main validation and public registry checks remain downstream release gates.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-08T22:04:17.786Z, excerpt_hash=sha256:2cdcc3fcedc120041b7b775f20da1a8b2e378301549d87ec45e61a69337edf99

    Details:

    Command: bun run release:prepublish
    Result: pass; 102 of 102 release-ci chunks, 8 migration scenarios, tarball install, workflow 50 tests, significant 204 tests, and release-critical 16 tests passed.
    Evidence: process exited 0 in the authoritative task worktree at 173f556bcb3bdb795c74d688d065ef7ddc9537d6.
    Scope: full local AgentPlane 0.7.5 release candidate gate.

    Command: gh pr checks 4806 --watch=false
    Result: pass; all required and informational hosted checks completed successfully or were intentionally skipped.
    Evidence: GitHub Actions runs 31279736460, 31279737719, 31279737720, 31279737726 at PR head 173f556bcb3bdb795c74d688d065ef7ddc9537d6.
    Scope: exact-SHA hosted pull request verification.

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/release-075-control.LxivIl/repo/.agentplane/worktrees/202608082119-P6SHBN-publish-agentplane-0-7-5-from-merged-qualified-c/.agentplane/tasks/202608082119-P6SHBN/blueprint/resolved-snapshot.json
    - old_digest: cf333249043ca09e55b4bd4bc27d7faf8612397b9947d6cac6d9e62786b5f977
    - current_digest: cf333249043ca09e55b4bd4bc27d7faf8612397b9947d6cac6d9e62786b5f977
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202608082119-P6SHBN

    DecisionContextRef:
    - operator_action: stop
    - can_execute_now: false
    - safe_command: none
    - diagnostic_command: agentplane task verify-show 202608082119-P6SHBN
    - source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: false
    - repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
    - risks: none

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
### 2026-08-08T22:04:16.876Z — VERIFY — ok

By: TESTER

Note: Local candidate verification passed at 173f556bcb3bdb795c74d688d065ef7ddc9537d6: release incidents clear; version and dependency parity are exactly 0.7.5; release notes validation passes with 520 bullets; release:prepublish passed 102/102 release-ci chunks, 8 migration scenarios, local tarball install, workflow 13 files/50 tests, significant 19/204, and release-critical 4/16. Hosted checks, exact merged-main validation, GitHub Release, and npm publication remain mandatory downstream gates.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-08T21:24:41.663Z, excerpt_hash=sha256:2cdcc3fcedc120041b7b775f20da1a8b2e378301549d87ec45e61a69337edf99

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/release-075-control.LxivIl/repo/.agentplane/worktrees/202608082119-P6SHBN-publish-agentplane-0-7-5-from-merged-qualified-c/.agentplane/tasks/202608082119-P6SHBN/blueprint/resolved-snapshot.json
- old_digest: cf333249043ca09e55b4bd4bc27d7faf8612397b9947d6cac6d9e62786b5f977
- current_digest: cf333249043ca09e55b4bd4bc27d7faf8612397b9947d6cac6d9e62786b5f977
- route_changed: no
- safe_command: agentplane blueprint snapshot 202608082119-P6SHBN

DecisionContextRef:
- operator_action: stop
- can_execute_now: false
- safe_command: none
- diagnostic_command: agentplane task verify-show 202608082119-P6SHBN
- source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: false
- repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
- risks: none

### 2026-08-08T22:06:01.450Z — VERIFY — ok

By: TESTER

Note: Release candidate verification passed at 173f556bcb3bdb795c74d688d065ef7ddc9537d6. Local canonical prepublish, parity, version, notes, compatibility, migration, install, workflow, significant, and critical gates passed. All hosted PR checks on the same SHA passed. Exact merged-main validation and public registry checks remain downstream release gates.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-08T22:04:17.786Z, excerpt_hash=sha256:2cdcc3fcedc120041b7b775f20da1a8b2e378301549d87ec45e61a69337edf99

Details:

Command: bun run release:prepublish
Result: pass; 102 of 102 release-ci chunks, 8 migration scenarios, tarball install, workflow 50 tests, significant 204 tests, and release-critical 16 tests passed.
Evidence: process exited 0 in the authoritative task worktree at 173f556bcb3bdb795c74d688d065ef7ddc9537d6.
Scope: full local AgentPlane 0.7.5 release candidate gate.

Command: gh pr checks 4806 --watch=false
Result: pass; all required and informational hosted checks completed successfully or were intentionally skipped.
Evidence: GitHub Actions runs 31279736460, 31279737719, 31279737720, 31279737726 at PR head 173f556bcb3bdb795c74d688d065ef7ddc9537d6.
Scope: exact-SHA hosted pull request verification.

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/release-075-control.LxivIl/repo/.agentplane/worktrees/202608082119-P6SHBN-publish-agentplane-0-7-5-from-merged-qualified-c/.agentplane/tasks/202608082119-P6SHBN/blueprint/resolved-snapshot.json
- old_digest: cf333249043ca09e55b4bd4bc27d7faf8612397b9947d6cac6d9e62786b5f977
- current_digest: cf333249043ca09e55b4bd4bc27d7faf8612397b9947d6cac6d9e62786b5f977
- route_changed: no
- safe_command: agentplane blueprint snapshot 202608082119-P6SHBN

DecisionContextRef:
- operator_action: stop
- can_execute_now: false
- safe_command: none
- diagnostic_command: agentplane task verify-show 202608082119-P6SHBN
- source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: false
- repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
- risks: none

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
