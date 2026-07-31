---
id: "202607311143-YT435C"
title: "Release AgentPlane v0.6.26"
result_summary: "pre-merge closure"
status: "DONE"
priority: "high"
owner: "CODER"
revision: 23
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
  state: "ok"
  updated_at: "2026-07-31T13:30:56.028Z"
  updated_by: "CODER"
  note: "v0.6.26 HEAD a913b333 passed full release:prepublish (82/82 release-ci-base, workflow 34/34, significant 204/204, release-critical 16/16), focused routing 9/9, targeted verify/output 30/30, typecheck, lint, and fast release checks; verification subprocesses now strip ap-only presentation env."
  attempts: 0
quality_review:
  state: "pass"
  updated_at: "2026-07-31T13:31:07.524Z"
  updated_by: "EVALUATOR"
  note: "v0.6.26 maintenance candidate is release-ready after eliminating direct routing loops, stale closeout routes, untracked task loss, and integration-lane environment leakage."
  evaluated_sha: "a913b33383db5f5b7c167da51c4ba69cda14cd64"
  blueprint_digest: "3b71052486bce178c3afb3ef2a0ba0ec42a4e7839daf10bea73ea49b344640a4"
  evidence_refs:
    - ".agentplane/tasks/202607311143-YT435C/README.md"
    - ".agentplane/tasks/202607311143-YT435C/quality/20260731-133107524-recovery-context/quality-report.json"
    - ".agentplane/tasks/202607311143-YT435C/quality/20260731-133107524-recovery-context/evaluator-prompt.md"
    - ".agentplane/tasks/202607311143-YT435C/quality/20260731-133107524-recovery-context/evaluator-opinion.md"
    - ".agentplane/tasks/202607311143-YT435C/blueprint/resolved-snapshot.json"
    - "packages/agentplane/src/commands/shared/pr-meta/verify-log.ts"
    - "packages/agentplane/src/commands/shared/pr-meta.test.ts"
    - "packages/agentplane/src/cli/run-cli.core.route-decision.direct-closeout.test.ts"
    - "packages/agentplane/src/cli/run-cli.core.route-decision.quality.test.ts"
  findings:
    - "Verification subprocesses are isolated from ap-only presentation variables; exact regression and the full release matrix pass on a913b333."
commit:
  hash: "511f717166e9a47ab72b6b3e69f92f53a6894b0d"
  message: "✅ YT435C release: record final verification"
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
  -
    author: "CODER"
    body: "Verified: pre-merge closure packet is ready for the task PR."
  -
    author: "CODER"
    body: "Rework: regenerate bun.lock for v0.6.26 and prove frozen-install publication readiness."
  -
    author: "CODER"
    body: "Rework: isolate integration verification subprocesses from AgentPlane presentation-mode environment."
  -
    author: "CODER"
    body: "Verified: pre-merge closure packet is ready for the task PR."
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
  -
    type: "verify"
    at: "2026-07-31T12:53:43.538Z"
    author: "CODER"
    state: "ok"
    note: "Hosted format failure resolved; format:check, final fast prepublish, focused routing 9/9, incidents, and registry checks pass on v0.6.26 state."
  -
    type: "status"
    at: "2026-07-31T12:54:04.068Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: pre-merge closure packet is ready for the task PR."
  -
    type: "verify"
    at: "2026-07-31T13:00:37.465Z"
    author: "CODER"
    state: "needs_rework"
    note: "PR review found bun.lock still contains 0.6.25 workspace versions after the 0.6.26 candidate bump."
  -
    type: "status"
    at: "2026-07-31T13:00:38.671Z"
    author: "CODER"
    from: "DOING"
    to: "DOING"
    note: "Rework: regenerate bun.lock for v0.6.26 and prove frozen-install publication readiness."
  -
    type: "verify"
    at: "2026-07-31T13:01:47.330Z"
    author: "CODER"
    state: "ok"
    note: "PR review thread resolved with exact workflow evidence: Bun 1.3.6 force install produced no bun.lock diff and frozen install exited 0 on the v0.6.26 candidate."
  -
    type: "verify"
    at: "2026-07-31T13:12:53.437Z"
    author: "CODER"
    state: "needs_rework"
    note: "Integration-only full prepublish inherited AGENTPLANE_CLI_ALIAS=ap, switching child tests into agent presentation mode and failing output expectations."
  -
    type: "status"
    at: "2026-07-31T13:12:54.825Z"
    author: "CODER"
    from: "DOING"
    to: "DOING"
    note: "Rework: isolate integration verification subprocesses from AgentPlane presentation-mode environment."
  -
    type: "verify"
    at: "2026-07-31T13:30:56.028Z"
    author: "CODER"
    state: "ok"
    note: "v0.6.26 HEAD a913b333 passed full release:prepublish (82/82 release-ci-base, workflow 34/34, significant 204/204, release-critical 16/16), focused routing 9/9, targeted verify/output 30/30, typecheck, lint, and fast release checks; verification subprocesses now strip ap-only presentation env."
  -
    type: "status"
    at: "2026-07-31T13:31:27.889Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: pre-merge closure packet is ready for the task PR."
doc_version: 3
doc_updated_at: "2026-07-31T13:31:27.890Z"
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

    ### 2026-07-31T12:53:43.538Z — VERIFY — ok

    By: CODER

    Note: Hosted format failure resolved; format:check, final fast prepublish, focused routing 9/9, incidents, and registry checks pass on v0.6.26 state.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-31T12:52:29.767Z, excerpt_hash=sha256:046024067e5a449b591650df464194a6167bb9acffc20b84002d49f5dcf5ec03

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

    ### 2026-07-31T13:00:37.465Z — VERIFY — needs_rework

    By: CODER

    Note: PR review found bun.lock still contains 0.6.25 workspace versions after the 0.6.26 candidate bump.
    Attempts: 1

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-31T12:54:04.069Z, excerpt_hash=sha256:046024067e5a449b591650df464194a6167bb9acffc20b84002d49f5dcf5ec03

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

    ### 2026-07-31T13:01:47.330Z — VERIFY — ok

    By: CODER

    Note: PR review thread resolved with exact workflow evidence: Bun 1.3.6 force install produced no bun.lock diff and frozen install exited 0 on the v0.6.26 candidate.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-31T13:00:38.671Z, excerpt_hash=sha256:046024067e5a449b591650df464194a6167bb9acffc20b84002d49f5dcf5ec03

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

    ### 2026-07-31T13:12:53.437Z — VERIFY — needs_rework

    By: CODER

    Note: Integration-only full prepublish inherited AGENTPLANE_CLI_ALIAS=ap, switching child tests into agent presentation mode and failing output expectations.
    Attempts: 1

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-31T13:01:47.432Z, excerpt_hash=sha256:046024067e5a449b591650df464194a6167bb9acffc20b84002d49f5dcf5ec03

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

    ### 2026-07-31T13:30:56.028Z — VERIFY — ok

    By: CODER

    Note: v0.6.26 HEAD a913b333 passed full release:prepublish (82/82 release-ci-base, workflow 34/34, significant 204/204, release-critical 16/16), focused routing 9/9, targeted verify/output 30/30, typecheck, lint, and fast release checks; verification subprocesses now strip ap-only presentation env.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-31T13:12:54.825Z, excerpt_hash=sha256:046024067e5a449b591650df464194a6167bb9acffc20b84002d49f5dcf5ec03

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

    - Observation: Generated ACR example now matches repository formatting.
      Impact: Hosted verify-contract can validate the exact candidate payload.
      Resolution: Formatted the generated JSON and retained all release gates.

    - Observation: release candidate updated package manifests but did not regenerate the Bun lockfile.
      Impact: Frozen-install publish workflows could reject the exact release candidate.
      Resolution: Regenerate bun.lock, prove frozen install, rerun release gates, and resolve the review thread.

    - Observation: Bun workspace lock metadata remains stable across workspace package version-only changes.
      Impact: The publish workflows' pinned frozen install accepts the exact candidate; no synthetic lockfile edit is needed.
      Resolution: Recorded reproducible command evidence and resolved the false-positive review thread.

    - Observation: runShellCommand forwards the AgentPlane launcher presentation environment into arbitrary verification subprocesses.
      Impact: Verification behavior differs between direct execution and integration, producing false failures for valid suites.
      Resolution: Sanitize AgentPlane presentation-mode variables at the verification process boundary and add a focused regression.

    - Observation: Integration-only release verification inherited AGENTPLANE_CLI_ALIAS and AGENTPLANE_AGENT_MODE from the ap launcher.
      Impact: Child CLI output tests ran in agent presentation mode and failed despite the candidate passing outside the integration lane.
      Resolution: runShellCommand now removes both launcher-only variables before starting verification subprocesses, with a regression assertion on the child environment.
extensions:
  implementation_commit:
    hash: "a913b33383db5f5b7c167da51c4ba69cda14cd64"
    message: "🐛 YT435C release: isolate verify process environment"
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

### 2026-07-31T12:53:43.538Z — VERIFY — ok

By: CODER

Note: Hosted format failure resolved; format:check, final fast prepublish, focused routing 9/9, incidents, and registry checks pass on v0.6.26 state.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-31T12:52:29.767Z, excerpt_hash=sha256:046024067e5a449b591650df464194a6167bb9acffc20b84002d49f5dcf5ec03

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

### 2026-07-31T13:00:37.465Z — VERIFY — needs_rework

By: CODER

Note: PR review found bun.lock still contains 0.6.25 workspace versions after the 0.6.26 candidate bump.
Attempts: 1

VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-31T12:54:04.069Z, excerpt_hash=sha256:046024067e5a449b591650df464194a6167bb9acffc20b84002d49f5dcf5ec03

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

### 2026-07-31T13:01:47.330Z — VERIFY — ok

By: CODER

Note: PR review thread resolved with exact workflow evidence: Bun 1.3.6 force install produced no bun.lock diff and frozen install exited 0 on the v0.6.26 candidate.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-31T13:00:38.671Z, excerpt_hash=sha256:046024067e5a449b591650df464194a6167bb9acffc20b84002d49f5dcf5ec03

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

### 2026-07-31T13:12:53.437Z — VERIFY — needs_rework

By: CODER

Note: Integration-only full prepublish inherited AGENTPLANE_CLI_ALIAS=ap, switching child tests into agent presentation mode and failing output expectations.
Attempts: 1

VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-31T13:01:47.432Z, excerpt_hash=sha256:046024067e5a449b591650df464194a6167bb9acffc20b84002d49f5dcf5ec03

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

### 2026-07-31T13:30:56.028Z — VERIFY — ok

By: CODER

Note: v0.6.26 HEAD a913b333 passed full release:prepublish (82/82 release-ci-base, workflow 34/34, significant 204/204, release-critical 16/16), focused routing 9/9, targeted verify/output 30/30, typecheck, lint, and fast release checks; verification subprocesses now strip ap-only presentation env.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-31T13:12:54.825Z, excerpt_hash=sha256:046024067e5a449b591650df464194a6167bb9acffc20b84002d49f5dcf5ec03

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

- Observation: Generated ACR example now matches repository formatting.
  Impact: Hosted verify-contract can validate the exact candidate payload.
  Resolution: Formatted the generated JSON and retained all release gates.

- Observation: release candidate updated package manifests but did not regenerate the Bun lockfile.
  Impact: Frozen-install publish workflows could reject the exact release candidate.
  Resolution: Regenerate bun.lock, prove frozen install, rerun release gates, and resolve the review thread.

- Observation: Bun workspace lock metadata remains stable across workspace package version-only changes.
  Impact: The publish workflows' pinned frozen install accepts the exact candidate; no synthetic lockfile edit is needed.
  Resolution: Recorded reproducible command evidence and resolved the false-positive review thread.

- Observation: runShellCommand forwards the AgentPlane launcher presentation environment into arbitrary verification subprocesses.
  Impact: Verification behavior differs between direct execution and integration, producing false failures for valid suites.
  Resolution: Sanitize AgentPlane presentation-mode variables at the verification process boundary and add a focused regression.

- Observation: Integration-only release verification inherited AGENTPLANE_CLI_ALIAS and AGENTPLANE_AGENT_MODE from the ap launcher.
  Impact: Child CLI output tests ran in agent presentation mode and failed despite the candidate passing outside the integration lane.
  Resolution: runShellCommand now removes both launcher-only variables before starting verification subprocesses, with a regression assertion on the child environment.
