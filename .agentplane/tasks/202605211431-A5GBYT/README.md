---
id: "202605211431-A5GBYT"
title: "Release AgentPlane v0.6.5"
status: "DOING"
priority: "high"
owner: "INTEGRATOR"
revision: 6
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "quality"
  - "release"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-21T14:31:45.080Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-21T17:24:41.295Z"
  updated_by: "EVALUATOR"
  note: "Evaluator release gate passed: local release prepublish completed, release-ci-base rerouted heavy CLI tests and passed, hosted PR #4007 checks are green, and branch is clean for integration."
  attempts: 0
quality_review:
  state: "pass"
  updated_at: "2026-05-21T17:24:41.295Z"
  updated_by: "EVALUATOR"
  note: "Evaluator release gate passed: local release prepublish completed, release-ci-base rerouted heavy CLI tests and passed, hosted PR #4007 checks are green, and branch is clean for integration."
  evaluated_sha: "86a0b16dd9aabf95b144f9ca0913663d623ece28"
  blueprint_digest: "596a8dd64715acb0f243c8b716b1f17832bb54c0a45854dc87e404971d840c33"
  evidence_refs:
    - ".agentplane/tasks/202605211431-A5GBYT/README.md"
    - "/Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605211431-A5GBYT-release-v0-6-5/.agentplane/tasks/202605211431-A5GBYT/blueprint/resolved-snapshot.json"
  findings: []
commit: null
comments:
  -
    author: "INTEGRATOR"
    body: "Start: Release v0.6.5 from current main after confirming clean base, empty incident registry, task registry readiness, npm/GitHub v0.6.4 publication, and no open GitHub PRs."
events:
  -
    type: "status"
    at: "2026-05-21T14:32:18.064Z"
    author: "INTEGRATOR"
    from: "TODO"
    to: "DOING"
    note: "Start: Release v0.6.5 from current main after confirming clean base, empty incident registry, task registry readiness, npm/GitHub v0.6.4 publication, and no open GitHub PRs."
  -
    type: "verify"
    at: "2026-05-21T17:24:31.111Z"
    author: "INTEGRATOR"
    state: "ok"
    note: "Release candidate v0.6.5 passed local release:prepublish via ap release candidate --push --yes; hosted PR #4007 checks are green and mergeStateStatus is CLEAN at head 63b0b14d4513bc8c6cafce1b443ede2d24c39e32."
  -
    type: "verify"
    at: "2026-05-21T17:24:41.295Z"
    author: "EVALUATOR"
    state: "ok"
    note: "Evaluator release gate passed: local release prepublish completed, release-ci-base rerouted heavy CLI tests and passed, hosted PR #4007 checks are green, and branch is clean for integration."
doc_version: 3
doc_updated_at: "2026-05-21T17:24:41.313Z"
doc_updated_by: "INTEGRATOR"
description: "Prepare, verify, publish, and record evidence for the next patch release after v0.6.4."
sections:
  Summary: |-
    Release AgentPlane v0.6.5

    Prepare, verify, publish, and record evidence for the next patch release after v0.6.4.
  Scope: |-
    - In scope: Prepare, verify, publish, and record evidence for the next patch release after v0.6.4.
    - Out of scope: unrelated refactors not required for "Release AgentPlane v0.6.5".
  Plan: "Release plan: version=0.6.5, tag=v0.6.5, scope=next patch release from current main 4b6cdb0d78be2955e0b5c73551016edd7da86c52 after v0.6.4. Steps: confirm clean base, generate branch_pr release plan/candidate, update release notes and version surfaces, run release prepublish gates, open and merge the candidate PR through branch_pr, dispatch hosted Publish to npm for the merged release commit, then verify npm, GitHub release, remote tag, and distribution artifacts. Stop if active incidents appear, release target changes, checks fail, or publication evidence cannot be verified."
  Verify Steps: |-
    1. Run `bun run release:tasks:check`. Expected: task registry is release-ready with no open blocking task state.
    2. Run `bun run spec:examples:check`. Expected: all spec examples, including runner-handoff.json, validate against generated schemas.
    3. Run `ap release candidate --push --yes`. Expected: release fast and heavy prepublish gates pass, the v0.6.5 candidate commit is created, and the task branch is pushed.
    4. Run `ap pr open 202605211431-A5GBYT --branch task/202605211431-A5GBYT/release-v0-6-5 --author INTEGRATOR`. Expected: GitHub PR is linked with current artifacts.
    5. Run hosted PR checks and integration route. Expected: release candidate merges to main through branch_pr without bypassing protected-base workflow.
    6. Dispatch hosted `Publish to npm` for the merged release commit. Expected: npm packages, remote tag, GitHub Release, and distribution surfaces publish as v0.6.5.
    7. Run postpublish readbacks: `npm view agentplane version`, `git ls-remote --tags origin v0.6.5`, `gh release view v0.6.5`, and release smoke/audit scripts. Expected: all external release surfaces report v0.6.5.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-21T17:24:31.111Z — VERIFY — ok

    By: INTEGRATOR

    Note: Release candidate v0.6.5 passed local release:prepublish via ap release candidate --push --yes; hosted PR #4007 checks are green and mergeStateStatus is CLEAN at head 63b0b14d4513bc8c6cafce1b443ede2d24c39e32.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-21T14:32:18.064Z, excerpt_hash=sha256:131d2c0951d0a89e69dce20f983762cb4d8bed3c1aa01be541b1bd6f0b61ebd8

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605211431-A5GBYT-release-v0-6-5/.agentplane/tasks/202605211431-A5GBYT/blueprint/resolved-snapshot.json
    - old_digest: 596a8dd64715acb0f243c8b716b1f17832bb54c0a45854dc87e404971d840c33
    - current_digest: 596a8dd64715acb0f243c8b716b1f17832bb54c0a45854dc87e404971d840c33
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605211431-A5GBYT

    ### 2026-05-21T17:24:41.295Z — VERIFY — ok

    By: EVALUATOR

    Note: Evaluator release gate passed: local release prepublish completed, release-ci-base rerouted heavy CLI tests and passed, hosted PR #4007 checks are green, and branch is clean for integration.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-21T17:24:31.133Z, excerpt_hash=sha256:131d2c0951d0a89e69dce20f983762cb4d8bed3c1aa01be541b1bd6f0b61ebd8

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605211431-A5GBYT-release-v0-6-5/.agentplane/tasks/202605211431-A5GBYT/blueprint/resolved-snapshot.json
    - old_digest: 596a8dd64715acb0f243c8b716b1f17832bb54c0a45854dc87e404971d840c33
    - current_digest: 596a8dd64715acb0f243c8b716b1f17832bb54c0a45854dc87e404971d840c33
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605211431-A5GBYT

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Release AgentPlane v0.6.5

Prepare, verify, publish, and record evidence for the next patch release after v0.6.4.

## Scope

- In scope: Prepare, verify, publish, and record evidence for the next patch release after v0.6.4.
- Out of scope: unrelated refactors not required for "Release AgentPlane v0.6.5".

## Plan

Release plan: version=0.6.5, tag=v0.6.5, scope=next patch release from current main 4b6cdb0d78be2955e0b5c73551016edd7da86c52 after v0.6.4. Steps: confirm clean base, generate branch_pr release plan/candidate, update release notes and version surfaces, run release prepublish gates, open and merge the candidate PR through branch_pr, dispatch hosted Publish to npm for the merged release commit, then verify npm, GitHub release, remote tag, and distribution artifacts. Stop if active incidents appear, release target changes, checks fail, or publication evidence cannot be verified.

## Verify Steps

1. Run `bun run release:tasks:check`. Expected: task registry is release-ready with no open blocking task state.
2. Run `bun run spec:examples:check`. Expected: all spec examples, including runner-handoff.json, validate against generated schemas.
3. Run `ap release candidate --push --yes`. Expected: release fast and heavy prepublish gates pass, the v0.6.5 candidate commit is created, and the task branch is pushed.
4. Run `ap pr open 202605211431-A5GBYT --branch task/202605211431-A5GBYT/release-v0-6-5 --author INTEGRATOR`. Expected: GitHub PR is linked with current artifacts.
5. Run hosted PR checks and integration route. Expected: release candidate merges to main through branch_pr without bypassing protected-base workflow.
6. Dispatch hosted `Publish to npm` for the merged release commit. Expected: npm packages, remote tag, GitHub Release, and distribution surfaces publish as v0.6.5.
7. Run postpublish readbacks: `npm view agentplane version`, `git ls-remote --tags origin v0.6.5`, `gh release view v0.6.5`, and release smoke/audit scripts. Expected: all external release surfaces report v0.6.5.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-21T17:24:31.111Z — VERIFY — ok

By: INTEGRATOR

Note: Release candidate v0.6.5 passed local release:prepublish via ap release candidate --push --yes; hosted PR #4007 checks are green and mergeStateStatus is CLEAN at head 63b0b14d4513bc8c6cafce1b443ede2d24c39e32.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-21T14:32:18.064Z, excerpt_hash=sha256:131d2c0951d0a89e69dce20f983762cb4d8bed3c1aa01be541b1bd6f0b61ebd8

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605211431-A5GBYT-release-v0-6-5/.agentplane/tasks/202605211431-A5GBYT/blueprint/resolved-snapshot.json
- old_digest: 596a8dd64715acb0f243c8b716b1f17832bb54c0a45854dc87e404971d840c33
- current_digest: 596a8dd64715acb0f243c8b716b1f17832bb54c0a45854dc87e404971d840c33
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605211431-A5GBYT

### 2026-05-21T17:24:41.295Z — VERIFY — ok

By: EVALUATOR

Note: Evaluator release gate passed: local release prepublish completed, release-ci-base rerouted heavy CLI tests and passed, hosted PR #4007 checks are green, and branch is clean for integration.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-21T17:24:31.133Z, excerpt_hash=sha256:131d2c0951d0a89e69dce20f983762cb4d8bed3c1aa01be541b1bd6f0b61ebd8

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605211431-A5GBYT-release-v0-6-5/.agentplane/tasks/202605211431-A5GBYT/blueprint/resolved-snapshot.json
- old_digest: 596a8dd64715acb0f243c8b716b1f17832bb54c0a45854dc87e404971d840c33
- current_digest: 596a8dd64715acb0f243c8b716b1f17832bb54c0a45854dc87e404971d840c33
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605211431-A5GBYT

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
