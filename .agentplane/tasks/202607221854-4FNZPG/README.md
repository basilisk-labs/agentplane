---
id: "202607221854-4FNZPG"
title: "Validate the 0.6.24-to-0.7 migration and installed-package matrix"
status: "DOING"
priority: "high"
owner: "TESTER"
revision: 19
origin:
  system: "manual"
depends_on:
  - "202607221908-PWFH5K"
  - "202607311707-DRYTNK"
tags:
  - "migration"
  - "milestone-rc2"
  - "quality"
  - "release"
  - "v0.7"
task_kind: "code"
mutation_scope: "code"
blueprint_request: "quality.regression"
verify:
  - "bun run package:install-smoke"
  - "bun run release:e2e:local"
  - "bun run release:prepublish:heavy"
plan_approval:
  state: "approved"
  updated_at: "2026-08-01T19:30:50.539Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-08-01T21:52:38.950Z"
  updated_by: "TESTER"
  note: "Installed migration matrix, package smoke, full release:prepublish, workflow/significant coverage, and release-critical gates pass on implementation c958ab897b9a81d619be4adfdb4bfbaf4ba446ab. Exact-SHA local release E2E remains mandatory after publishing the final PR head because its canonical GitHub release-ready artifact cannot exist before publication."
  attempts: 0
quality_review:
  state: "pass"
  provenance: "human_supplied"
  updated_at: "2026-08-01T21:54:18.155Z"
  updated_by: "HUMAN"
  note: "The reviewed implementation satisfies the RF-29 migration and installed-package quality contract: it adds a bounded eight-scenario matrix to the existing tarball smoke, preserves both workflow modes and active-task truth, and changes no production runtime semantics."
  evaluated_sha: "cec72a74caf380d60fc084dbd837ae43b1eea970"
  blueprint_digest: "fabd487d8ca435562d6cfde629217767447547ba76bd35113f55f42785af8224"
  evidence_refs:
    - ".agentplane/tasks/202607221854-4FNZPG/quality/20260801-215417607-recovery-context/evaluator-work-order.json"
    - ".agentplane/tasks/202607221854-4FNZPG/quality/20260801-215417607-recovery-context/quality-report.json"
    - ".agentplane/tasks/202607221854-4FNZPG/quality/20260801-215417607-recovery-context/evaluator-prompt.md"
    - ".agentplane/tasks/202607221854-4FNZPG/quality/20260801-215417607-recovery-context/evaluator-opinion.md"
    - ".agentplane/tasks/202607221854-4FNZPG/README.md"
    - ".agentplane/tasks/202607221854-4FNZPG/quality/20260801-215417607-recovery-context/evaluator-diff.patch"
    - ".agentplane/tasks/202607221854-4FNZPG/quality/20260801-215417607-recovery-context/evaluator-observed-checks.json"
    - ".agentplane/tasks/202607221854-4FNZPG/quality/20260801-215417607-recovery-context/evaluator-blueprint.json"
    - ".agentplane/policy/dod.code.md"
    - ".agentplane/policy/dod.core.md"
    - ".agentplane/policy/security.must.md"
    - ".agentplane/policy/workflow.branch_pr.md"
    - "scripts/lib/installed-migration-matrix.mjs"
    - "packages/agentplane/src/commands/release/installed-migration-matrix-script.test.ts"
    - "scripts/release/check-local-tarball-install-smoke.mjs"
    - ".agentplane/tasks/202607221854-4FNZPG/verification/20260801215238950-c1c13360d98dfed4.json"
  findings:
    - "Coverage is fail-closed for fresh repositories, WORKFLOW v1/v2, task README v2/v3, and active upgrades from both v0.6.24 and v0.6.26 in direct and branch_pr modes."
    - "Dry-run non-mutation, idempotent upgrade, exact workflow rollback, worktree resume uniqueness, typed task route, runner, evaluator, package, and full release gates are asserted with deterministic local fixtures."
    - "The auxiliary test-only fixture changes align dormant tests with already-enforced projection identity, evaluator policy, scoped side-effect authority, and git-common-dir persistence contracts; they do not weaken production behavior."
commit:
  hash: "c958ab897b9a81d619be4adfdb4bfbaf4ba446ab"
  message: "🧪 4FNZPG release: align authority persistence fixture"
comments:
  -
    author: "TESTER"
    body: "Start: continue branch_pr task in the dedicated task worktree."
  -
    author: "CODER"
    body: "Implementation recorded: installed-tarball migration matrix covers fresh installs, active upgrades from v0.6.24 and v0.6.26 in direct and branch_pr, task README v2/v3, and exact WORKFLOW v1 rollback; current main is merged for final release verification."
  -
    author: "CODER"
    body: "Implementation refreshed after the full release gate found and focused checks cleared seven lint-only findings in the installed migration matrix."
  -
    author: "CODER"
    body: "Implementation rework completed: merged task 202608012034-W6F4DM from current main so the heavy artifact gate can process repositories with more than 1 MiB of tracked-path output; rerun the complete release matrix against this implementation head."
  -
    author: "CODER"
    body: "Implementation rework extended: the full release suite exposed a stale cloud preflight fixture that could no longer reach its intended HTTP 502 path after projection-identity hardening. The fixture now binds the expected identity; the focused 18-test file and lint/format checks pass."
  -
    author: "CODER"
    body: "Implementation rework extended: removed stale cloud-only identity expectations from generic redmine backend sync fixtures. The shared sync contract remains generic while the existing cloud-specific tests continue to cover explicit identity transitions; the affected chunk passes 22/22."
  -
    author: "CODER"
    body: "Implementation rework extended: refreshed dormant release-suite fixtures for required evaluator policy evidence, a valid main diff base, and scoped authority before pre-merge closure. The affected direct closeout, quality routing, and task-complete files pass 13/13."
  -
    author: "CODER"
    body: "Implementation rework extended: updated the branch_pr authority fixture to assert the current out-of-band git-common-dir persistence contract. Granting scoped authority no longer mutates the task branch, and the authorized pr.open operation is still restored; the focused file passes 3/3."
events:
  -
    type: "status"
    at: "2026-08-01T19:31:50.730Z"
    author: "TESTER"
    from: "TODO"
    to: "DOING"
    note: "Start: continue branch_pr task in the dedicated task worktree."
  -
    type: "status"
    at: "2026-08-01T20:24:53.056Z"
    author: "CODER"
    from: "DOING"
    to: "DOING"
    note: "Implementation recorded: installed-tarball migration matrix covers fresh installs, active upgrades from v0.6.24 and v0.6.26 in direct and branch_pr, task README v2/v3, and exact WORKFLOW v1 rollback; current main is merged for final release verification."
  -
    type: "status"
    at: "2026-08-01T20:29:23.836Z"
    author: "CODER"
    from: "DOING"
    to: "DOING"
    note: "Implementation refreshed after the full release gate found and focused checks cleared seven lint-only findings in the installed migration matrix."
  -
    type: "verify"
    at: "2026-08-01T20:52:46.199Z"
    author: "TESTER"
    state: "needs_rework"
    note: "Heavy prepublish gate is not yet reproducibly green on the recorded implementation head."
  -
    type: "status"
    at: "2026-08-01T20:54:33.077Z"
    author: "CODER"
    from: "DOING"
    to: "DOING"
    note: "Implementation rework completed: merged task 202608012034-W6F4DM from current main so the heavy artifact gate can process repositories with more than 1 MiB of tracked-path output; rerun the complete release matrix against this implementation head."
  -
    type: "status"
    at: "2026-08-01T21:01:45.965Z"
    author: "CODER"
    from: "DOING"
    to: "DOING"
    note: "Implementation rework extended: the full release suite exposed a stale cloud preflight fixture that could no longer reach its intended HTTP 502 path after projection-identity hardening. The fixture now binds the expected identity; the focused 18-test file and lint/format checks pass."
  -
    type: "status"
    at: "2026-08-01T21:07:14.953Z"
    author: "CODER"
    from: "DOING"
    to: "DOING"
    note: "Implementation rework extended: removed stale cloud-only identity expectations from generic redmine backend sync fixtures. The shared sync contract remains generic while the existing cloud-specific tests continue to cover explicit identity transitions; the affected chunk passes 22/22."
  -
    type: "status"
    at: "2026-08-01T21:22:30.246Z"
    author: "CODER"
    from: "DOING"
    to: "DOING"
    note: "Implementation rework extended: refreshed dormant release-suite fixtures for required evaluator policy evidence, a valid main diff base, and scoped authority before pre-merge closure. The affected direct closeout, quality routing, and task-complete files pass 13/13."
  -
    type: "status"
    at: "2026-08-01T21:24:32.052Z"
    author: "CODER"
    from: "DOING"
    to: "DOING"
    note: "Implementation rework extended: updated the branch_pr authority fixture to assert the current out-of-band git-common-dir persistence contract. Granting scoped authority no longer mutates the task branch, and the authorized pr.open operation is still restored; the focused file passes 3/3."
  -
    type: "verify"
    at: "2026-08-01T21:52:38.950Z"
    author: "TESTER"
    state: "ok"
    note: "Installed migration matrix, package smoke, full release:prepublish, workflow/significant coverage, and release-critical gates pass on implementation c958ab897b9a81d619be4adfdb4bfbaf4ba446ab. Exact-SHA local release E2E remains mandatory after publishing the final PR head because its canonical GitHub release-ready artifact cannot exist before publication."
doc_version: 3
doc_updated_at: "2026-08-01T21:52:39.850Z"
doc_updated_by: "CODER"
description: "Run the final compatibility matrix for new repositories, 0.6.24 direct/branch_pr repositories, WORKFLOW v1/v2, task docs v2/v3, active tasks, runner results, package exports, Node support, and installed tarballs."
sections:
  Summary: |-
    Validate the 0.6.24-to-0.7 migration and installed-package matrix

    Run the final compatibility matrix for new repositories, 0.6.24 direct/branch_pr repositories, WORKFLOW v1/v2, task docs v2/v3, active tasks, runner results, package exports, Node support, and installed tarballs.
  Scope: |-
    - In scope: automated migration fixtures/matrix, dry-run/rollback/idempotency, active-task preservation, direct/branch_pr route parity, Workflow/task/result schema versions, installed task brief/next-action/workflow doctor/runner smoke, package exports, Node engines, and exact failure diagnostics.
    - Out of scope: changing product architecture after rc; defects become bounded release blockers/follow-up tasks.
  Plan: |-
    1. Build clean and 0.6.24 fixture repositories covering both workflows, schema versions, task doc versions, and active lifecycle phases.
    2. Run upgrade/migration dry-run, apply, repeat, rollback, and resume.
    3. Exercise installed tarball commands and runner/evaluator result paths.
    4. Run supported Node/package/export matrices.
    5. Record exact blockers and require fixes before release readiness.
  Verify Steps: |-
    1. Migrate every matrix fixture. Expected: no task, authority, context, Git, or workflow truth is lost; second apply is a no-op and rollback is exact where supported.
    2. Resume active direct and branch_pr tasks. Expected: route/work order/fingerprint remain coherent and no duplicate worktree/PR/task is created.
    3. Install local tarballs into clean fixtures. Expected: task brief/next-action JSON, workflow migration/doctor, runner result, and evaluator paths work outside the monorepo.
    4. Run package export and supported Node matrices. Expected: declarations match executable support.
    5. Run local release E2E, install smoke, and heavy prepublish gates.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-08-01T20:52:46.199Z — VERIFY — needs_rework

    By: TESTER

    Note: Heavy prepublish gate is not yet reproducibly green on the recorded implementation head.
    Attempts: 1

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-01T20:29:23.836Z, excerpt_hash=sha256:fd40926159d3fb06f3680eacdb96bce2bcacb99dcb43b1acbad15346ff97d4d3

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/v07-packet-fix-control-20260730/.agentplane/worktrees/202607221854-4FNZPG-validate-the-0-6-24-to-0-7-migration-and-install/.agentplane/tasks/202607221854-4FNZPG/blueprint/resolved-snapshot.json
    - old_digest: fabd487d8ca435562d6cfde629217767447547ba76bd35113f55f42785af8224
    - current_digest: fabd487d8ca435562d6cfde629217767447547ba76bd35113f55f42785af8224
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202607221854-4FNZPG

    DecisionContextRef:
    - operator_action: stop
    - can_execute_now: false
    - safe_command: none
    - diagnostic_command: agentplane task verify-show 202607221854-4FNZPG
    - source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: false
    - repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
    - risks: none

    ### 2026-08-01T21:52:38.950Z — VERIFY — ok

    By: TESTER

    Note: Installed migration matrix, package smoke, full release:prepublish, workflow/significant coverage, and release-critical gates pass on implementation c958ab897b9a81d619be4adfdb4bfbaf4ba446ab. Exact-SHA local release E2E remains mandatory after publishing the final PR head because its canonical GitHub release-ready artifact cannot exist before publication.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-01T21:51:22.605Z, excerpt_hash=sha256:fd40926159d3fb06f3680eacdb96bce2bcacb99dcb43b1acbad15346ff97d4d3

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/v07-packet-fix-control-20260730/.agentplane/worktrees/202607221854-4FNZPG-validate-the-0-6-24-to-0-7-migration-and-install/.agentplane/tasks/202607221854-4FNZPG/blueprint/resolved-snapshot.json
    - old_digest: fabd487d8ca435562d6cfde629217767447547ba76bd35113f55f42785af8224
    - current_digest: fabd487d8ca435562d6cfde629217767447547ba76bd35113f55f42785af8224
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202607221854-4FNZPG

    DecisionContextRef:
    - operator_action: stop
    - can_execute_now: false
    - safe_command: none
    - diagnostic_command: none
    - source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: false
    - repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
    - risks: none

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert only migration test/harness changes; do not roll back user fixture data in place.
    - Restore fixtures from version-controlled snapshots and rerun the previous release smoke.
    - Any product migration defect remains a release blocker with a separate repair task.
  Findings: |-
    - Observation: bun run release:prepublish reached artifacts:check and failed with spawnSync git ENOBUFS because the branch does not include the independently verified large-repository buffer fix from task 202608012034-W6F4DM.
      Impact: RF-29 cannot claim full release verification until current main is assimilated and the complete gate is rerun.
      Resolution: Merge current main into the RF-29 task branch, refresh the implementation record, and rerun the full migration/install/release verification matrix.

    - Observation: The installed-package matrix passed eight tarball scenarios: fresh direct/branch_pr, active v0.6.24 upgrades, active v0.6.26 upgrades, and exact WORKFLOW v1 rollback in both workflow modes. The complete release:prepublish gate also passed on implementation c958ab897b9a81d619be4adfdb4bfbaf4ba446ab.
      Impact: Migration and installed-package behavior is proven across both supported starting release lines and workflow modes; task, authority, context, Git, workflow, runner, evaluator, package, and release-critical contracts remain coherent.
      Resolution: Keep the matrix in package:install-smoke and require release:prepublish for RC closure; the dormant fixture drift found by the full gate was aligned with current projection identity, evaluator policy, scoped authority, and git-common-dir persistence contracts.

    - Observation: Eight installed-tarball migration scenarios and the complete 99-chunk release suite pass reproducibly; earlier failures were deterministic stale-fixture drift, not product regressions or flakes.
      Impact: RF-29 is locally release-qualified across fresh, v0.6.24, and v0.6.26 repositories in direct and branch_pr modes.
      Resolution: Publish the final verification/evaluator head, wait for its successful Core CI release-ready artifact, then run release:e2e:local --skip-prepublish against that exact SHA before integration.
extensions:
  workflow_route_baseline:
    start_head_sha: "14185e94deadff666a1544413ba5ae728dcacdfb"
    version: 1
id_source: "generated"
---
## Summary

Validate the 0.6.24-to-0.7 migration and installed-package matrix

Run the final compatibility matrix for new repositories, 0.6.24 direct/branch_pr repositories, WORKFLOW v1/v2, task docs v2/v3, active tasks, runner results, package exports, Node support, and installed tarballs.

## Scope

- In scope: automated migration fixtures/matrix, dry-run/rollback/idempotency, active-task preservation, direct/branch_pr route parity, Workflow/task/result schema versions, installed task brief/next-action/workflow doctor/runner smoke, package exports, Node engines, and exact failure diagnostics.
- Out of scope: changing product architecture after rc; defects become bounded release blockers/follow-up tasks.

## Plan

1. Build clean and 0.6.24 fixture repositories covering both workflows, schema versions, task doc versions, and active lifecycle phases.
2. Run upgrade/migration dry-run, apply, repeat, rollback, and resume.
3. Exercise installed tarball commands and runner/evaluator result paths.
4. Run supported Node/package/export matrices.
5. Record exact blockers and require fixes before release readiness.

## Verify Steps

1. Migrate every matrix fixture. Expected: no task, authority, context, Git, or workflow truth is lost; second apply is a no-op and rollback is exact where supported.
2. Resume active direct and branch_pr tasks. Expected: route/work order/fingerprint remain coherent and no duplicate worktree/PR/task is created.
3. Install local tarballs into clean fixtures. Expected: task brief/next-action JSON, workflow migration/doctor, runner result, and evaluator paths work outside the monorepo.
4. Run package export and supported Node matrices. Expected: declarations match executable support.
5. Run local release E2E, install smoke, and heavy prepublish gates.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-08-01T20:52:46.199Z — VERIFY — needs_rework

By: TESTER

Note: Heavy prepublish gate is not yet reproducibly green on the recorded implementation head.
Attempts: 1

VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-01T20:29:23.836Z, excerpt_hash=sha256:fd40926159d3fb06f3680eacdb96bce2bcacb99dcb43b1acbad15346ff97d4d3

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/v07-packet-fix-control-20260730/.agentplane/worktrees/202607221854-4FNZPG-validate-the-0-6-24-to-0-7-migration-and-install/.agentplane/tasks/202607221854-4FNZPG/blueprint/resolved-snapshot.json
- old_digest: fabd487d8ca435562d6cfde629217767447547ba76bd35113f55f42785af8224
- current_digest: fabd487d8ca435562d6cfde629217767447547ba76bd35113f55f42785af8224
- route_changed: no
- safe_command: agentplane blueprint snapshot 202607221854-4FNZPG

DecisionContextRef:
- operator_action: stop
- can_execute_now: false
- safe_command: none
- diagnostic_command: agentplane task verify-show 202607221854-4FNZPG
- source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: false
- repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
- risks: none

### 2026-08-01T21:52:38.950Z — VERIFY — ok

By: TESTER

Note: Installed migration matrix, package smoke, full release:prepublish, workflow/significant coverage, and release-critical gates pass on implementation c958ab897b9a81d619be4adfdb4bfbaf4ba446ab. Exact-SHA local release E2E remains mandatory after publishing the final PR head because its canonical GitHub release-ready artifact cannot exist before publication.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-01T21:51:22.605Z, excerpt_hash=sha256:fd40926159d3fb06f3680eacdb96bce2bcacb99dcb43b1acbad15346ff97d4d3

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/v07-packet-fix-control-20260730/.agentplane/worktrees/202607221854-4FNZPG-validate-the-0-6-24-to-0-7-migration-and-install/.agentplane/tasks/202607221854-4FNZPG/blueprint/resolved-snapshot.json
- old_digest: fabd487d8ca435562d6cfde629217767447547ba76bd35113f55f42785af8224
- current_digest: fabd487d8ca435562d6cfde629217767447547ba76bd35113f55f42785af8224
- route_changed: no
- safe_command: agentplane blueprint snapshot 202607221854-4FNZPG

DecisionContextRef:
- operator_action: stop
- can_execute_now: false
- safe_command: none
- diagnostic_command: none
- source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: false
- repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
- risks: none

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert only migration test/harness changes; do not roll back user fixture data in place.
- Restore fixtures from version-controlled snapshots and rerun the previous release smoke.
- Any product migration defect remains a release blocker with a separate repair task.

## Findings

- Observation: bun run release:prepublish reached artifacts:check and failed with spawnSync git ENOBUFS because the branch does not include the independently verified large-repository buffer fix from task 202608012034-W6F4DM.
  Impact: RF-29 cannot claim full release verification until current main is assimilated and the complete gate is rerun.
  Resolution: Merge current main into the RF-29 task branch, refresh the implementation record, and rerun the full migration/install/release verification matrix.

- Observation: The installed-package matrix passed eight tarball scenarios: fresh direct/branch_pr, active v0.6.24 upgrades, active v0.6.26 upgrades, and exact WORKFLOW v1 rollback in both workflow modes. The complete release:prepublish gate also passed on implementation c958ab897b9a81d619be4adfdb4bfbaf4ba446ab.
  Impact: Migration and installed-package behavior is proven across both supported starting release lines and workflow modes; task, authority, context, Git, workflow, runner, evaluator, package, and release-critical contracts remain coherent.
  Resolution: Keep the matrix in package:install-smoke and require release:prepublish for RC closure; the dormant fixture drift found by the full gate was aligned with current projection identity, evaluator policy, scoped authority, and git-common-dir persistence contracts.

- Observation: Eight installed-tarball migration scenarios and the complete 99-chunk release suite pass reproducibly; earlier failures were deterministic stale-fixture drift, not product regressions or flakes.
  Impact: RF-29 is locally release-qualified across fresh, v0.6.24, and v0.6.26 repositories in direct and branch_pr modes.
  Resolution: Publish the final verification/evaluator head, wait for its successful Core CI release-ready artifact, then run release:e2e:local --skip-prepublish against that exact SHA before integration.
