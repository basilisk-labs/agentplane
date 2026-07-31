---
id: "202607311143-YT435C"
title: "Release AgentPlane v0.6.26"
result_summary: "pre-merge closure"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 11
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
  state: "needs_rework"
  updated_at: "2026-07-31T12:52:28.002Z"
  updated_by: "CODER"
  note: "Hosted verify-contract found the generated v0.6.26 ACR example was not formatted after candidate version mutation."
  attempts: 1
quality_review:
  state: "pass"
  updated_at: "2026-07-31T12:49:41.515Z"
  updated_by: "EVALUATOR"
  note: "v0.6.26 maintenance candidate is release-ready after full and final-state gates."
  evaluated_sha: "f4a967d3f4a54062d1f002ef3b8e49e33743f669"
  blueprint_digest: "3b71052486bce178c3afb3ef2a0ba0ec42a4e7839daf10bea73ea49b344640a4"
  evidence_refs:
    - ".agentplane/tasks/202607311143-YT435C/README.md"
    - ".agentplane/tasks/202607311143-YT435C/quality/20260731-124941515-recovery-context/quality-report.json"
    - ".agentplane/tasks/202607311143-YT435C/quality/20260731-124941515-recovery-context/evaluator-prompt.md"
    - ".agentplane/tasks/202607311143-YT435C/quality/20260731-124941515-recovery-context/evaluator-opinion.md"
    - ".agentplane/tasks/202607311143-YT435C/blueprint/resolved-snapshot.json"
    - "docs/releases/v0.6.26.md"
    - "packages/agentplane/src/cli/run-cli.core.route-decision.direct-closeout.test.ts"
    - "packages/agentplane/src/cli/run-cli.core.route-decision.quality.test.ts"
    - ".agentplane/workflows/last-known-good.md"
  findings:
    - "The direct pending/no-runner route transitions to task run and terminal runner state stops for verification evidence."
    - "Untracked canonical task artifacts are persisted before execution without staging unrelated untracked files."
    - "Pre-merge closure freshness is bound to implementation HEAD and stale markers route through PR refresh to a new closure."
    - "Full release prepublish, final fast prepublish, focused regressions, incidents, registry, parity, pack, and install-smoke checks pass."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: prepare and publish v0.6.26 exclusively from the v0.6.24 maintenance branch, with exact-SHA hosted verification and no main integration."
  -
    author: "CODER"
    body: "Verified: pre-merge closure packet is ready for the task PR."
  -
    author: "CODER"
    body: "Rework: format the generated v0.6.26 ACR example and rerun candidate gates."
events:
  -
    type: "status"
    at: "2026-07-31T11:44:30.701Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: prepare and publish v0.6.26 exclusively from the v0.6.24 maintenance branch, with exact-SHA hosted verification and no main integration."
  -
    type: "verify"
    at: "2026-07-31T12:49:40.314Z"
    author: "CODER"
    state: "ok"
    note: "v0.6.26 maintenance candidate passed full release prepublish: 82/82 isolated groups, workflow 34/34, significant 204/204, release-critical 16/16; final-state fast prepublish, focused routing 9/9, incident clearance, and task-registry readiness also pass."
  -
    type: "status"
    at: "2026-07-31T12:50:14.226Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: pre-merge closure packet is ready for the task PR."
  -
    type: "verify"
    at: "2026-07-31T12:52:28.002Z"
    author: "CODER"
    state: "needs_rework"
    note: "Hosted verify-contract found the generated v0.6.26 ACR example was not formatted after candidate version mutation."
  -
    type: "status"
    at: "2026-07-31T12:52:29.767Z"
    author: "CODER"
    from: "DOING"
    to: "DOING"
    note: "Rework: format the generated v0.6.26 ACR example and rerun candidate gates."
doc_version: 3
doc_updated_at: "2026-07-31T12:52:29.767Z"
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
    ### 2026-07-31T12:49:40.314Z — VERIFY — ok

    By: CODER

    Note: v0.6.26 maintenance candidate passed full release prepublish: 82/82 isolated groups, workflow 34/34, significant 204/204, release-critical 16/16; final-state fast prepublish, focused routing 9/9, incident clearance, and task-registry readiness also pass.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-31T12:48:58.554Z, excerpt_hash=sha256:046024067e5a449b591650df464194a6167bb9acffc20b84002d49f5dcf5ec03

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/v0625-release.eugTda/repo/.agentplane/worktrees/202607311143-YT435C-release-v0-6-26/.agentplane/tasks/202607311143-YT435C/blueprint/resolved-snapshot.json
    - old_digest: 3b71052486bce178c3afb3ef2a0ba0ec42a4e7839daf10bea73ea49b344640a4
    - current_digest: 3b71052486bce178c3afb3ef2a0ba0ec42a4e7839daf10bea73ea49b344640a4
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202607311143-YT435C

    DecisionContextRef:
    - operator_action: run_exact_argv
    - can_execute_now: true
    - safe_command: agentplane pr open 202607311143-YT435C --author CODER
    - diagnostic_command: none
    - source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: true
    - repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
    - risks: git_hook_side_effect

    ### 2026-07-31T12:52:28.002Z — VERIFY — needs_rework

    By: CODER

    Note: Hosted verify-contract found the generated v0.6.26 ACR example was not formatted after candidate version mutation.
    Attempts: 1

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-31T12:50:14.226Z, excerpt_hash=sha256:046024067e5a449b591650df464194a6167bb9acffc20b84002d49f5dcf5ec03

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/v0625-release.eugTda/repo/.agentplane/worktrees/202607311143-YT435C-release-v0-6-26/.agentplane/tasks/202607311143-YT435C/blueprint/resolved-snapshot.json
    - old_digest: 3b71052486bce178c3afb3ef2a0ba0ec42a4e7839daf10bea73ea49b344640a4
    - current_digest: 3b71052486bce178c3afb3ef2a0ba0ec42a4e7839daf10bea73ea49b344640a4
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202607311143-YT435C

    DecisionContextRef:
    - operator_action: run_exact_argv
    - can_execute_now: true
    - safe_command: agentplane integrate queue enqueue 202607311143-YT435C --branch task/202607311143-YT435C/release-v0-6-26
    - diagnostic_command: agentplane pr check 202607311143-YT435C
    - source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: true
    - repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
    - risks: git_hook_side_effect

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    - Observation: The final candidate includes synchronized v0.6.26 workflow and generated documentation assets.
      Impact: Version parity and release artifacts are consistent on the maintenance-only candidate branch.
      Resolution: Publish only the exact merged maintenance SHA after hosted checks pass.

    - Observation: release candidate rewrote packages/spec/examples/acr.json after the pre-bump format gate.
      Impact: Hosted format:check blocks candidate integration.
      Resolution: Format the generated ACR example, rerun format and release checks, then record a fresh closure.
extensions:
  implementation_commit:
    hash: "f4a967d3f4a54062d1f002ef3b8e49e33743f669"
    message: "🔧 YT435C release: sync v0.6.26 artifacts"
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
### 2026-07-31T12:49:40.314Z — VERIFY — ok

By: CODER

Note: v0.6.26 maintenance candidate passed full release prepublish: 82/82 isolated groups, workflow 34/34, significant 204/204, release-critical 16/16; final-state fast prepublish, focused routing 9/9, incident clearance, and task-registry readiness also pass.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-31T12:48:58.554Z, excerpt_hash=sha256:046024067e5a449b591650df464194a6167bb9acffc20b84002d49f5dcf5ec03

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/v0625-release.eugTda/repo/.agentplane/worktrees/202607311143-YT435C-release-v0-6-26/.agentplane/tasks/202607311143-YT435C/blueprint/resolved-snapshot.json
- old_digest: 3b71052486bce178c3afb3ef2a0ba0ec42a4e7839daf10bea73ea49b344640a4
- current_digest: 3b71052486bce178c3afb3ef2a0ba0ec42a4e7839daf10bea73ea49b344640a4
- route_changed: no
- safe_command: agentplane blueprint snapshot 202607311143-YT435C

DecisionContextRef:
- operator_action: run_exact_argv
- can_execute_now: true
- safe_command: agentplane pr open 202607311143-YT435C --author CODER
- diagnostic_command: none
- source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: true
- repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
- risks: git_hook_side_effect

### 2026-07-31T12:52:28.002Z — VERIFY — needs_rework

By: CODER

Note: Hosted verify-contract found the generated v0.6.26 ACR example was not formatted after candidate version mutation.
Attempts: 1

VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-31T12:50:14.226Z, excerpt_hash=sha256:046024067e5a449b591650df464194a6167bb9acffc20b84002d49f5dcf5ec03

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/v0625-release.eugTda/repo/.agentplane/worktrees/202607311143-YT435C-release-v0-6-26/.agentplane/tasks/202607311143-YT435C/blueprint/resolved-snapshot.json
- old_digest: 3b71052486bce178c3afb3ef2a0ba0ec42a4e7839daf10bea73ea49b344640a4
- current_digest: 3b71052486bce178c3afb3ef2a0ba0ec42a4e7839daf10bea73ea49b344640a4
- route_changed: no
- safe_command: agentplane blueprint snapshot 202607311143-YT435C

DecisionContextRef:
- operator_action: run_exact_argv
- can_execute_now: true
- safe_command: agentplane integrate queue enqueue 202607311143-YT435C --branch task/202607311143-YT435C/release-v0-6-26
- diagnostic_command: agentplane pr check 202607311143-YT435C
- source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: true
- repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
- risks: git_hook_side_effect

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- Observation: The final candidate includes synchronized v0.6.26 workflow and generated documentation assets.
  Impact: Version parity and release artifacts are consistent on the maintenance-only candidate branch.
  Resolution: Publish only the exact merged maintenance SHA after hosted checks pass.

- Observation: release candidate rewrote packages/spec/examples/acr.json after the pre-bump format gate.
  Impact: Hosted format:check blocks candidate integration.
  Resolution: Format the generated ACR example, rerun format and release checks, then record a fresh closure.
