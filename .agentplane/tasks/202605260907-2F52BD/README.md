---
id: "202605260907-2F52BD"
title: "Prepare v0.6.10 patch release"
result_summary: "Merged via PR #4163."
status: "DONE"
priority: "high"
owner: "CODER"
revision: 8
origin:
  system: "manual"
depends_on: []
tags:
  - "publish"
  - "release"
task_kind: "release"
mutation_scope: "release"
risk_flags:
  - "external_system"
  - "merge"
  - "publish"
blueprint_request: "release.strict"
verify:
  - "ap doctor"
  - "bun run release:parity"
  - "bun run release:prepublish"
  - "gh release view v0.6.10"
  - "git fetch --tags --prune origin"
  - "git ls-remote --tags origin v0.6.10"
  - "node .agentplane/policy/check-routing.mjs"
  - "npm view agentplane version && npm view @agentplaneorg/core version && npm view @agentplaneorg/recipes version"
plan_approval:
  state: "approved"
  updated_at: "2026-05-26T09:07:13.303Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-26T14:45:27.428Z"
  updated_by: "CODER"
  note: "Release candidate v0.6.10 prepared on branch_pr route. Local release candidate gate passed: release:prepublish:fast, release:ci-check, release-ci-base 67/67, workflow coverage, significant coverage, and release-critical 4/4. PR #4163 opened for head fbaa7d73; GitHub checks are in progress."
  attempts: 0
quality_review:
  state: "pass"
  updated_at: "2026-05-26T14:45:34.025Z"
  updated_by: "EVALUATOR"
  note: "Release candidate v0.6.10 passed local release gates and is ready for GitHub CI/integration."
  evaluated_sha: "fbaa7d73e7f657f3d6322847e082f2054064b83d"
  blueprint_digest: "5d5bc22511b5a1d429be1f25eb1a763374103eabf2d31766877163c815494fa9"
  evidence_refs:
    - ".agentplane/tasks/202605260907-2F52BD/README.md"
    - ".agentplane/tasks/202605260907-2F52BD/quality/20260526-144534025-recovery-context/quality-report.json"
    - ".agentplane/tasks/202605260907-2F52BD/quality/20260526-144534025-recovery-context/evaluator-prompt.md"
    - ".agentplane/tasks/202605260907-2F52BD/quality/20260526-144534025-recovery-context/evaluator-opinion.md"
    - ".agentplane/tasks/202605260907-2F52BD/blueprint/resolved-snapshot.json"
    - ".agentplane/.release/apply/2026-05-26T14-35-06-343Z.json"
    - ".agentplane/tasks/202605260907-2F52BD/pr/meta.json"
  findings:
    - "No unresolved local findings after tag conflict resolution, candidate preparation, full release-ci-base, coverage suites, and release-critical smoke."
commit:
  hash: "cf6c036188c7234a32700a0e272f4d359ce065d5"
  message: "✅ 2F52BD release: record candidate verification"
comments:
  -
    author: "CODER"
    body: "Start: Preparing v0.6.10 patch release from a dedicated branch_pr worktree after approved plan; first step is resolving local-only stale v0.3.8 tag drift, then preparing the release candidate and hosted publish path."
  -
    author: "INTEGRATOR"
    body: "Verified: PR #4163 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
events:
  -
    type: "status"
    at: "2026-05-26T09:07:45.654Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Preparing v0.6.10 patch release from a dedicated branch_pr worktree after approved plan; first step is resolving local-only stale v0.3.8 tag drift, then preparing the release candidate and hosted publish path."
  -
    type: "verify"
    at: "2026-05-26T14:45:27.428Z"
    author: "CODER"
    state: "ok"
    note: "Release candidate v0.6.10 prepared on branch_pr route. Local release candidate gate passed: release:prepublish:fast, release:ci-check, release-ci-base 67/67, workflow coverage, significant coverage, and release-critical 4/4. PR #4163 opened for head fbaa7d73; GitHub checks are in progress."
  -
    type: "status"
    at: "2026-05-26T14:51:52.099Z"
    author: "INTEGRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: PR #4163 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
doc_version: 3
doc_updated_at: "2026-05-26T14:51:52.105Z"
doc_updated_by: "INTEGRATOR"
description: "Resolve local stale tag preflight drift, prepare the next patch release candidate for v0.6.10, publish it through the branch_pr release route, and record release evidence."
sections:
  Summary: |-
    Prepare v0.6.10 patch release

    Resolve local stale tag preflight drift, prepare the next patch release candidate for v0.6.10, publish it through the branch_pr release route, and record release evidence.
  Scope: |-
    - In scope: Resolve local stale tag preflight drift, prepare the next patch release candidate for v0.6.10, publish it through the branch_pr release route, and record release evidence.
    - Out of scope: unrelated refactors not required for "Prepare v0.6.10 patch release".
  Plan: "Release plan: version=v0.6.10, tag=v0.6.10, route=branch_pr release candidate. Scope: first resolve the local-only stale v0.3.8 tag conflict by deleting the local tag ref and fetching origin/v0.3.8 without modifying the remote; then generate a patch release plan, prepare and push the v0.6.10 release candidate branch, open/update the task PR, wait for hosted checks, merge through the protected GitHub PR route, dispatch the hosted Publish release workflow for the merged release commit SHA, verify npm/GitHub tag/GitHub Release evidence, and finish the task with close-tail evidence. Checks: release prepublish/parity, policy routing, doctor, npm version readback, origin tag readback, GitHub release readback."
  Verify Steps: |-
    1. Resolve the stale local tag preflight drift. Expected: local refs/tags/v0.3.8 matches origin/v0.3.8 and git fetch --tags --prune origin exits 0.
    2. Generate a patch release plan for v0.6.10. Expected: version.json records prevTag=v0.6.9, nextTag=v0.6.10, bump=patch, baseSha at the current release base.
    3. Write docs/releases/v0.6.10.md from the release plan. Expected: English release notes follow docs/releases/TEMPLATE.md, contain no Cyrillic, and include at least one concrete bullet for every listed change.
    4. Prepare and push the branch_pr release candidate. Expected: package versions and release artifacts are bumped to 0.6.10, candidate branch is pushed, and no release tag is created locally as the publication tag.
    5. Run release checks. Expected: release prepublish/parity, policy routing, doctor, and registry availability checks pass or any blocker is recorded with exact failure evidence.
    6. Open/update the task PR and merge through the protected branch_pr route. Expected: hosted checks are stable green, the task PR merges to main, and the merge commit SHA is recorded.
    7. Dispatch hosted Publish release for the merged release commit SHA. Expected: npm publishes agentplane, @agentplaneorg/core, and @agentplaneorg/recipes at 0.6.10; origin has tag v0.6.10; GitHub Release v0.6.10 exists.
    8. Record verification and finish evidence. Expected: ap verify and ap finish capture command evidence, release result, residual risks, and close-tail state.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-26T14:45:27.428Z — VERIFY — ok

    By: CODER

    Note: Release candidate v0.6.10 prepared on branch_pr route. Local release candidate gate passed: release:prepublish:fast, release:ci-check, release-ci-base 67/67, workflow coverage, significant coverage, and release-critical 4/4. PR #4163 opened for head fbaa7d73; GitHub checks are in progress.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-26T09:09:46.705Z, excerpt_hash=sha256:771356f4eaffb67491b5b2a0f9796f53f324a3924ad95f01c66469f694b9123d

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605260907-2F52BD-prepare-v0-6-10-patch-release/.agentplane/tasks/202605260907-2F52BD/blueprint/resolved-snapshot.json
    - old_digest: 5d5bc22511b5a1d429be1f25eb1a763374103eabf2d31766877163c815494fa9
    - current_digest: 5d5bc22511b5a1d429be1f25eb1a763374103eabf2d31766877163c815494fa9
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605260907-2F52BD

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Prepare v0.6.10 patch release

Resolve local stale tag preflight drift, prepare the next patch release candidate for v0.6.10, publish it through the branch_pr release route, and record release evidence.

## Scope

- In scope: Resolve local stale tag preflight drift, prepare the next patch release candidate for v0.6.10, publish it through the branch_pr release route, and record release evidence.
- Out of scope: unrelated refactors not required for "Prepare v0.6.10 patch release".

## Plan

Release plan: version=v0.6.10, tag=v0.6.10, route=branch_pr release candidate. Scope: first resolve the local-only stale v0.3.8 tag conflict by deleting the local tag ref and fetching origin/v0.3.8 without modifying the remote; then generate a patch release plan, prepare and push the v0.6.10 release candidate branch, open/update the task PR, wait for hosted checks, merge through the protected GitHub PR route, dispatch the hosted Publish release workflow for the merged release commit SHA, verify npm/GitHub tag/GitHub Release evidence, and finish the task with close-tail evidence. Checks: release prepublish/parity, policy routing, doctor, npm version readback, origin tag readback, GitHub release readback.

## Verify Steps

1. Resolve the stale local tag preflight drift. Expected: local refs/tags/v0.3.8 matches origin/v0.3.8 and git fetch --tags --prune origin exits 0.
2. Generate a patch release plan for v0.6.10. Expected: version.json records prevTag=v0.6.9, nextTag=v0.6.10, bump=patch, baseSha at the current release base.
3. Write docs/releases/v0.6.10.md from the release plan. Expected: English release notes follow docs/releases/TEMPLATE.md, contain no Cyrillic, and include at least one concrete bullet for every listed change.
4. Prepare and push the branch_pr release candidate. Expected: package versions and release artifacts are bumped to 0.6.10, candidate branch is pushed, and no release tag is created locally as the publication tag.
5. Run release checks. Expected: release prepublish/parity, policy routing, doctor, and registry availability checks pass or any blocker is recorded with exact failure evidence.
6. Open/update the task PR and merge through the protected branch_pr route. Expected: hosted checks are stable green, the task PR merges to main, and the merge commit SHA is recorded.
7. Dispatch hosted Publish release for the merged release commit SHA. Expected: npm publishes agentplane, @agentplaneorg/core, and @agentplaneorg/recipes at 0.6.10; origin has tag v0.6.10; GitHub Release v0.6.10 exists.
8. Record verification and finish evidence. Expected: ap verify and ap finish capture command evidence, release result, residual risks, and close-tail state.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-26T14:45:27.428Z — VERIFY — ok

By: CODER

Note: Release candidate v0.6.10 prepared on branch_pr route. Local release candidate gate passed: release:prepublish:fast, release:ci-check, release-ci-base 67/67, workflow coverage, significant coverage, and release-critical 4/4. PR #4163 opened for head fbaa7d73; GitHub checks are in progress.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-26T09:09:46.705Z, excerpt_hash=sha256:771356f4eaffb67491b5b2a0f9796f53f324a3924ad95f01c66469f694b9123d

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605260907-2F52BD-prepare-v0-6-10-patch-release/.agentplane/tasks/202605260907-2F52BD/blueprint/resolved-snapshot.json
- old_digest: 5d5bc22511b5a1d429be1f25eb1a763374103eabf2d31766877163c815494fa9
- current_digest: 5d5bc22511b5a1d429be1f25eb1a763374103eabf2d31766877163c815494fa9
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605260907-2F52BD

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
