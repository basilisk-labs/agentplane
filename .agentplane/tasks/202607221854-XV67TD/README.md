---
id: "202607221854-XV67TD"
title: "Prepare and publish AgentPlane 0.7.0"
result_summary: "pre-merge closure"
status: "DONE"
priority: "high"
owner: "INTEGRATOR"
revision: 13
origin:
  system: "manual"
depends_on:
  - "202607221908-83Y4AF"
tags:
  - "final"
  - "publish"
  - "release"
  - "v0.7"
task_kind: "release"
mutation_scope: "release"
risk_flags:
  - "external_system"
  - "merge"
  - "network"
  - "publish"
blueprint_request: "release.strict"
verify:
  - "ap doctor"
  - "bun run release:postpublish:audit"
  - "bun run release:prepublish"
  - "bun run release:smoke:published"
plan_approval:
  state: "approved"
  updated_at: "2026-08-02T06:25:27.001Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-08-02T08:02:14.241Z"
  updated_by: "TESTER"
  note: "Fresh typed pre-merge evidence passed at 8338ecabd7cf; exact-SHA publication and postpublish checks remain pending by release design."
  attempts: 0
quality_review:
  state: "pass"
  provenance: "evaluator_supplied"
  updated_at: "2026-08-02T08:03:23.930Z"
  updated_by: "EVALUATOR"
  note: "EVALUATOR returned pass with 1 typed finding(s)."
  evaluated_sha: "8338ecabd7cf0d16f30c135c4c5a1258bc21936c"
  blueprint_digest: "0ef0f1e3df4e10da3b921bca013da9fd289d8b7e1c0c5c3df150396bb9764b38"
  evidence_refs:
    - ".agentplane/tasks/202607221854-XV67TD/quality/20260802-080239365-recovery-context/evaluator-work-order.json"
    - ".agentplane/tasks/202607221854-XV67TD/quality/20260802-080239365-recovery-context/quality-report.json"
    - ".agentplane/tasks/202607221854-XV67TD/quality/20260802-080239365-recovery-context/evaluator-prompt.md"
    - ".agentplane/tasks/202607221854-XV67TD/quality/20260802-080239365-recovery-context/evaluator-opinion.md"
    - ".agentplane/tasks/202607221854-XV67TD/quality/20260802-080239365-recovery-context/evaluator-result.json"
    - ".agentplane/tasks/202607221854-XV67TD/README.md"
    - ".agentplane/tasks/202607221854-XV67TD/quality/20260802-080239365-recovery-context/evaluator-diff.patch"
    - ".agentplane/tasks/202607221854-XV67TD/quality/20260802-080239365-recovery-context/evaluator-observed-checks.json"
    - ".agentplane/tasks/202607221854-XV67TD/verification/20260802080214241-8c93d70756a4d19a.json"
    - ".agentplane/tasks/202607221854-XV67TD/quality/20260802-080239365-recovery-context/evaluator-blueprint.json"
    - ".agentplane/policy/dod.code.md"
    - ".agentplane/policy/dod.core.md"
    - ".agentplane/policy/security.must.md"
    - ".agentplane/policy/workflow.release.md"
  findings:
    - "Post-publication acceptance remains intentionally pending and must not be inferred from the pre-merge verification result."
commit:
  hash: "8338ecabd7cf0d16f30c135c4c5a1258bc21936c"
  message: "🧪 XV67TD release: make delta proof state-independent"
comments:
  -
    author: "INTEGRATOR"
    body: "Start: continue branch_pr task in the dedicated task worktree."
  -
    author: "CODER"
    body: "Implementation: prepared the v0.7.0 release candidate, assimilated the published v0.6.25/v0.6.26 maintenance fixes, froze the exact compatibility delta, and made the release delta proof independent of the current manifest version. Verification: bun run release:prepublish passed at 8338ecabd7cf0d16f30c135c4c5a1258bc21936c."
  -
    author: "INTEGRATOR"
    body: "Verified: pre-merge closure packet is ready for the task PR."
events:
  -
    type: "status"
    at: "2026-08-02T06:25:59.743Z"
    author: "INTEGRATOR"
    from: "TODO"
    to: "DOING"
    note: "Start: continue branch_pr task in the dedicated task worktree."
  -
    type: "status"
    at: "2026-08-02T07:57:31.803Z"
    author: "CODER"
    from: "DOING"
    to: "DOING"
    note: "Implementation: prepared the v0.7.0 release candidate, assimilated the published v0.6.25/v0.6.26 maintenance fixes, froze the exact compatibility delta, and made the release delta proof independent of the current manifest version. Verification: bun run release:prepublish passed at 8338ecabd7cf0d16f30c135c4c5a1258bc21936c."
  -
    type: "verify"
    at: "2026-08-02T07:59:16.907Z"
    author: "TESTER"
    state: "ok"
    note: "Pre-merge v0.7.0 candidate verification passed at 8338ecabd7cf; hosted publication and postpublish audit remain pending by release design."
  -
    type: "verify"
    at: "2026-08-02T08:02:14.241Z"
    author: "TESTER"
    state: "ok"
    note: "Fresh typed pre-merge evidence passed at 8338ecabd7cf; exact-SHA publication and postpublish checks remain pending by release design."
  -
    type: "status"
    at: "2026-08-02T08:04:11.872Z"
    author: "INTEGRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: pre-merge closure packet is ready for the task PR."
doc_version: 3
doc_updated_at: "2026-08-02T08:04:11.872Z"
doc_updated_by: "INTEGRATOR"
description: "Integrate the fully verified RF-00 through RF-27 program, run exact release gates on the final main SHA, publish all packages and GitHub release, audit hosted evidence, and confirm post-publish compatibility."
sections:
  Summary: |-
    Prepare and publish AgentPlane 0.7.0

    Integrate the fully verified RF-00 through RF-27 program, run exact release gates on the final main SHA, publish all packages and GitHub release, audit hosted evidence, and confirm post-publish compatibility.
  Scope: |-
    - In scope: final integration queue, version 0.7.0 bump, release notes, prepublish gates, exact-SHA GitHub workflow publication, npm/GitHub/package audit, installed smoke, hosted-close evidence, and final clean main readback.
    - Out of scope: new feature/refactor scope after rc; any regression requires a separately approved release-blocker task.
  Plan: |-
    1. Confirm every required task dependency is DONE and no v0.7 architecture or migration blocker remains.
    2. Freeze the release SHA and run full prepublish, migration, installed-tarball, docs, architecture, and lifecycle gates.
    3. Bump all versioned packages/contracts to 0.7.0 and prepare reviewed release notes.
    4. Publish through the protected GitHub release workflow with explicit network/publish/merge authority.
    5. Audit npm packages, GitHub tag/release/workflow evidence, installed smoke, hosted close, final main SHA, and clean state.
  Verify Steps: |-
    1. Run `bun run release:prepublish` on the exact candidate SHA. Expected: all contract, test, coverage, package, docs, migration, architecture, and release gates pass with no skip.
    2. Publish through the authorized workflow. Expected: package versions, provenance, tag, GitHub Release, and workflow SHA are identical.
    3. Run `bun run release:postpublish:audit` and `bun run release:smoke:published`. Expected: every public distribution surface and installed 0.7 flow passes.
    4. Read back npm metadata, GitHub release/workflow, merged task PRs, hosted close, `origin/main`, and local main. Expected: complete traceable evidence and no version/SHA drift.
    5. Run `ap doctor` and final tracked/untracked status. Expected: no release-blocking warning or unintended artifact.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-08-02T07:59:16.907Z — VERIFY — ok

    By: TESTER

    Note: Pre-merge v0.7.0 candidate verification passed at 8338ecabd7cf; hosted publication and postpublish audit remain pending by release design.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-02T07:57:31.803Z, excerpt_hash=sha256:ee7bb88825c6d5e7d50bd918e72b3c83e0d65178f8129aca1f3d08348dae12c8

    Details:

    Command:
    bun run release:prepublish
    Result: pass
    Evidence:
    exit_code=0 at implementation SHA 8338ecabd7cf0d16f30c135c4c5a1258bc21936c; release-ci-base 99/99 chunks passed; workflow coverage 50/50; significant coverage 204/204; release-critical 16/16; compatibility candidate approved in release_version mode; RF-04 replay 50 runs and 70/70 outcomes; local tarball migration matrix 8/8.
    Scope:
    Exact pre-merge v0.7.0 release candidate, all local contract, test, coverage, package, docs, migration, architecture, and release gates without skips.

    Command:
    bun test packages/agentplane/src/cli/run-cli.critical.agent-efficiency-baseline.test.ts
    Result: pass
    Evidence:
    9 tests passed, including exact 0.6.24 to 0.7.0 manifest reconstruction from both pre-version and already-versioned worktrees.
    Scope:
    Regression proof for the release compatibility delta test fixed in 8338ecabd7cf0d16f30c135c4c5a1258bc21936c.

    Command:
    ap doctor
    Result: pass
    Evidence:
    doctor OK; errors=0; four warnings are pre-existing historical task-projection findings and do not block the v0.7 candidate.
    Scope:
    Current task worktree and repo-local 0.7.0 runtime.

    Command:
    git status --short --untracked-files=all
    Result: pass
    Evidence:
    Only the expected current task README lifecycle record is modified after CODER handoff; no unintended product, release, or generated artifact remains.
    Scope:
    Task worktree after verification.

    Publication status:
    Verify Steps 2-4 are intentionally pending and are not asserted by this record. They require the candidate to merge to protected main and the authorized Publish to npm workflow to run against the exact merged SHA; postpublish audit and published smoke will be recorded from hosted evidence.

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/v07-packet-fix-control-20260730/.agentplane/worktrees/202607221854-XV67TD-prepare-and-publish-agentplane-0-7-0/.agentplane/tasks/202607221854-XV67TD/blueprint/resolved-snapshot.json
    - old_digest: 0ef0f1e3df4e10da3b921bca013da9fd289d8b7e1c0c5c3df150396bb9764b38
    - current_digest: 0ef0f1e3df4e10da3b921bca013da9fd289d8b7e1c0c5c3df150396bb9764b38
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202607221854-XV67TD

    DecisionContextRef:
    - operator_action: stop
    - can_execute_now: false
    - safe_command: none
    - diagnostic_command: agentplane task verify-show 202607221854-XV67TD
    - source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: false
    - repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
    - risks: none

    ### 2026-08-02T08:02:14.241Z — VERIFY — ok

    By: TESTER

    Note: Fresh typed pre-merge evidence passed at 8338ecabd7cf; exact-SHA publication and postpublish checks remain pending by release design.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-02T07:59:17.691Z, excerpt_hash=sha256:ee7bb88825c6d5e7d50bd918e72b3c83e0d65178f8129aca1f3d08348dae12c8

    Details:

    Command: bun run release:prepublish
    Result: pass
    Evidence: exit_code=0 at implementation SHA 8338ecabd7cf0d16f30c135c4c5a1258bc21936c; release-ci-base=99/99 chunks; workflow coverage=50/50; significant coverage=204/204; release-critical=16/16; compatibility=approved release_version; RF-04 replay=50 runs and 70/70 outcomes; local tarball migration=8/8
    Scope: Exact pre-merge v0.7.0 release candidate; all local contract, test, coverage, package, docs, migration, architecture, and release gates without skips

    Command: bun test packages/agentplane/src/cli/run-cli.critical.agent-efficiency-baseline.test.ts
    Result: pass
    Evidence: 9/9 tests passed, including exact 0.6.24 to 0.7.0 manifest reconstruction
    Scope: Compatibility-delta regression on both pre-version and already-versioned worktrees at 8338ecabd7cf0d16f30c135c4c5a1258bc21936c

    Command: ap doctor
    Result: pass
    Evidence: doctor OK; errors=0; warnings=4, all pre-existing historical task-projection findings and none release-blocking
    Scope: Current task worktree and repo-local AgentPlane 0.7.0 runtime

    Command: git status --short --untracked-files=all
    Result: pass
    Evidence: Only current task lifecycle, verification, PR metadata, and evaluator artifacts are present; no unintended product, release, or generated artifact changes
    Scope: Task worktree after deterministic pre-merge verification

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/v07-packet-fix-control-20260730/.agentplane/worktrees/202607221854-XV67TD-prepare-and-publish-agentplane-0-7-0/.agentplane/tasks/202607221854-XV67TD/blueprint/resolved-snapshot.json
    - old_digest: 0ef0f1e3df4e10da3b921bca013da9fd289d8b7e1c0c5c3df150396bb9764b38
    - current_digest: 0ef0f1e3df4e10da3b921bca013da9fd289d8b7e1c0c5c3df150396bb9764b38
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202607221854-XV67TD

    DecisionContextRef:
    - operator_action: stop
    - can_execute_now: false
    - safe_command: none
    - diagnostic_command: agentplane task verify-show 202607221854-XV67TD
    - source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: false
    - repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
    - risks: none

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Before publication, abort the candidate and revert the version/release commit through a new approved task branch.
    - After any package is public, do not overwrite it; stop, record exact partial-publication evidence, and follow the release recovery path with a new patch version.
    - Preserve all hosted evidence and never rewrite published tags or package versions.
  Findings: ""
extensions:
  workflow_route_baseline:
    start_head_sha: "1c4f6b2e3d5103e1f62c71c104c5c615061eb4b4"
    version: 1
id_source: "generated"
---
## Summary

Prepare and publish AgentPlane 0.7.0

Integrate the fully verified RF-00 through RF-27 program, run exact release gates on the final main SHA, publish all packages and GitHub release, audit hosted evidence, and confirm post-publish compatibility.

## Scope

- In scope: final integration queue, version 0.7.0 bump, release notes, prepublish gates, exact-SHA GitHub workflow publication, npm/GitHub/package audit, installed smoke, hosted-close evidence, and final clean main readback.
- Out of scope: new feature/refactor scope after rc; any regression requires a separately approved release-blocker task.

## Plan

1. Confirm every required task dependency is DONE and no v0.7 architecture or migration blocker remains.
2. Freeze the release SHA and run full prepublish, migration, installed-tarball, docs, architecture, and lifecycle gates.
3. Bump all versioned packages/contracts to 0.7.0 and prepare reviewed release notes.
4. Publish through the protected GitHub release workflow with explicit network/publish/merge authority.
5. Audit npm packages, GitHub tag/release/workflow evidence, installed smoke, hosted close, final main SHA, and clean state.

## Verify Steps

1. Run `bun run release:prepublish` on the exact candidate SHA. Expected: all contract, test, coverage, package, docs, migration, architecture, and release gates pass with no skip.
2. Publish through the authorized workflow. Expected: package versions, provenance, tag, GitHub Release, and workflow SHA are identical.
3. Run `bun run release:postpublish:audit` and `bun run release:smoke:published`. Expected: every public distribution surface and installed 0.7 flow passes.
4. Read back npm metadata, GitHub release/workflow, merged task PRs, hosted close, `origin/main`, and local main. Expected: complete traceable evidence and no version/SHA drift.
5. Run `ap doctor` and final tracked/untracked status. Expected: no release-blocking warning or unintended artifact.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-08-02T07:59:16.907Z — VERIFY — ok

By: TESTER

Note: Pre-merge v0.7.0 candidate verification passed at 8338ecabd7cf; hosted publication and postpublish audit remain pending by release design.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-02T07:57:31.803Z, excerpt_hash=sha256:ee7bb88825c6d5e7d50bd918e72b3c83e0d65178f8129aca1f3d08348dae12c8

Details:

Command:
bun run release:prepublish
Result: pass
Evidence:
exit_code=0 at implementation SHA 8338ecabd7cf0d16f30c135c4c5a1258bc21936c; release-ci-base 99/99 chunks passed; workflow coverage 50/50; significant coverage 204/204; release-critical 16/16; compatibility candidate approved in release_version mode; RF-04 replay 50 runs and 70/70 outcomes; local tarball migration matrix 8/8.
Scope:
Exact pre-merge v0.7.0 release candidate, all local contract, test, coverage, package, docs, migration, architecture, and release gates without skips.

Command:
bun test packages/agentplane/src/cli/run-cli.critical.agent-efficiency-baseline.test.ts
Result: pass
Evidence:
9 tests passed, including exact 0.6.24 to 0.7.0 manifest reconstruction from both pre-version and already-versioned worktrees.
Scope:
Regression proof for the release compatibility delta test fixed in 8338ecabd7cf0d16f30c135c4c5a1258bc21936c.

Command:
ap doctor
Result: pass
Evidence:
doctor OK; errors=0; four warnings are pre-existing historical task-projection findings and do not block the v0.7 candidate.
Scope:
Current task worktree and repo-local 0.7.0 runtime.

Command:
git status --short --untracked-files=all
Result: pass
Evidence:
Only the expected current task README lifecycle record is modified after CODER handoff; no unintended product, release, or generated artifact remains.
Scope:
Task worktree after verification.

Publication status:
Verify Steps 2-4 are intentionally pending and are not asserted by this record. They require the candidate to merge to protected main and the authorized Publish to npm workflow to run against the exact merged SHA; postpublish audit and published smoke will be recorded from hosted evidence.

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/v07-packet-fix-control-20260730/.agentplane/worktrees/202607221854-XV67TD-prepare-and-publish-agentplane-0-7-0/.agentplane/tasks/202607221854-XV67TD/blueprint/resolved-snapshot.json
- old_digest: 0ef0f1e3df4e10da3b921bca013da9fd289d8b7e1c0c5c3df150396bb9764b38
- current_digest: 0ef0f1e3df4e10da3b921bca013da9fd289d8b7e1c0c5c3df150396bb9764b38
- route_changed: no
- safe_command: agentplane blueprint snapshot 202607221854-XV67TD

DecisionContextRef:
- operator_action: stop
- can_execute_now: false
- safe_command: none
- diagnostic_command: agentplane task verify-show 202607221854-XV67TD
- source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: false
- repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
- risks: none

### 2026-08-02T08:02:14.241Z — VERIFY — ok

By: TESTER

Note: Fresh typed pre-merge evidence passed at 8338ecabd7cf; exact-SHA publication and postpublish checks remain pending by release design.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-02T07:59:17.691Z, excerpt_hash=sha256:ee7bb88825c6d5e7d50bd918e72b3c83e0d65178f8129aca1f3d08348dae12c8

Details:

Command: bun run release:prepublish
Result: pass
Evidence: exit_code=0 at implementation SHA 8338ecabd7cf0d16f30c135c4c5a1258bc21936c; release-ci-base=99/99 chunks; workflow coverage=50/50; significant coverage=204/204; release-critical=16/16; compatibility=approved release_version; RF-04 replay=50 runs and 70/70 outcomes; local tarball migration=8/8
Scope: Exact pre-merge v0.7.0 release candidate; all local contract, test, coverage, package, docs, migration, architecture, and release gates without skips

Command: bun test packages/agentplane/src/cli/run-cli.critical.agent-efficiency-baseline.test.ts
Result: pass
Evidence: 9/9 tests passed, including exact 0.6.24 to 0.7.0 manifest reconstruction
Scope: Compatibility-delta regression on both pre-version and already-versioned worktrees at 8338ecabd7cf0d16f30c135c4c5a1258bc21936c

Command: ap doctor
Result: pass
Evidence: doctor OK; errors=0; warnings=4, all pre-existing historical task-projection findings and none release-blocking
Scope: Current task worktree and repo-local AgentPlane 0.7.0 runtime

Command: git status --short --untracked-files=all
Result: pass
Evidence: Only current task lifecycle, verification, PR metadata, and evaluator artifacts are present; no unintended product, release, or generated artifact changes
Scope: Task worktree after deterministic pre-merge verification

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/v07-packet-fix-control-20260730/.agentplane/worktrees/202607221854-XV67TD-prepare-and-publish-agentplane-0-7-0/.agentplane/tasks/202607221854-XV67TD/blueprint/resolved-snapshot.json
- old_digest: 0ef0f1e3df4e10da3b921bca013da9fd289d8b7e1c0c5c3df150396bb9764b38
- current_digest: 0ef0f1e3df4e10da3b921bca013da9fd289d8b7e1c0c5c3df150396bb9764b38
- route_changed: no
- safe_command: agentplane blueprint snapshot 202607221854-XV67TD

DecisionContextRef:
- operator_action: stop
- can_execute_now: false
- safe_command: none
- diagnostic_command: agentplane task verify-show 202607221854-XV67TD
- source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: false
- repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
- risks: none

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Before publication, abort the candidate and revert the version/release commit through a new approved task branch.
- After any package is public, do not overwrite it; stop, record exact partial-publication evidence, and follow the release recovery path with a new patch version.
- Preserve all hosted evidence and never rewrite published tags or package versions.

## Findings
