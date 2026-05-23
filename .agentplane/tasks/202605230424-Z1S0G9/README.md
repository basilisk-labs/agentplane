---
id: "202605230424-Z1S0G9"
title: "Make PR artifacts head-independent"
result_summary: "Merged via PR #4073."
status: "DONE"
priority: "med"
owner: "CODER"
revision: 7
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "tasks"
  - "workflow"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-23T04:24:45.616Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-23T04:44:36.698Z"
  updated_by: "CODER"
  note: "Verified: addressed protected-base integrate review by resolving OPEN PR identity live from branch state. Focused PR-flow/integrate tests passed (27 tests); typecheck, lint, format, hotspots, knip, and task-scope checks passed."
  attempts: 0
commit:
  hash: "fc69c5ad1acc5749aa037d97d526b8740d5a0de8"
  message: "Merge pull request #4073 from basilisk-labs/task/202605230424-Z1S0G9/head-independent-pr-artifacts"
comments:
  -
    author: "CODER"
    body: "Start: Implement head-independent branch_pr artifact freshness so one-commit PRs do not become stale from tracked PR artifact head churn."
  -
    author: "INTEGRATOR"
    body: "Verified: PR #4073 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
events:
  -
    type: "status"
    at: "2026-05-23T04:25:05.041Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Implement head-independent branch_pr artifact freshness so one-commit PRs do not become stale from tracked PR artifact head churn."
  -
    type: "verify"
    at: "2026-05-23T04:32:34.497Z"
    author: "CODER"
    state: "ok"
    note: "Verified: implemented head-independent OPEN PR identity handling. Focused PR-flow tests passed (13 tests); typecheck, lint, format, hotspots, knip, and task-scope checks passed."
  -
    type: "verify"
    at: "2026-05-23T04:44:36.698Z"
    author: "CODER"
    state: "ok"
    note: "Verified: addressed protected-base integrate review by resolving OPEN PR identity live from branch state. Focused PR-flow/integrate tests passed (27 tests); typecheck, lint, format, hotspots, knip, and task-scope checks passed."
  -
    type: "status"
    at: "2026-05-23T04:49:08.626Z"
    author: "INTEGRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: PR #4073 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
doc_version: 3
doc_updated_at: "2026-05-23T04:49:08.631Z"
doc_updated_by: "INTEGRATOR"
description: "Replace self-referential PR artifact freshness with a stable tree or runtime-state contract so branch_pr tasks can keep a one-commit implementation PR without stale head churn after artifact refresh, amend, or hosted close."
sections:
  Summary: |-
    Make PR artifacts head-independent

    Replace self-referential PR artifact freshness with a stable tree or runtime-state contract so branch_pr tasks can keep a one-commit implementation PR without stale head churn after artifact refresh, amend, or hosted close.
  Scope: |-
    - In scope: Replace self-referential PR artifact freshness with a stable tree or runtime-state contract so branch_pr tasks can keep a one-commit implementation PR without stale head churn after artifact refresh, amend, or hosted close.
    - Out of scope: unrelated refactors not required for "Make PR artifacts head-independent".
  Plan: "Implement a true head-independent PR artifact freshness contract for branch_pr. Identify where pr update/check/open writes and validates head_sha or verify digest, replace self-referential tracked artifact freshness with stable computed state (tree digest or live branch head outside the tracked artifact), preserve one implementation commit after amend/repack flows, and cover stale-artifact/direct-mode regressions with tests."
  Verify Steps: |-
    PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.

    1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
    3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-23T04:32:34.497Z — VERIFY — ok

    By: CODER

    Note: Verified: implemented head-independent OPEN PR identity handling. Focused PR-flow tests passed (13 tests); typecheck, lint, format, hotspots, knip, and task-scope checks passed.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-23T04:25:05.041Z, excerpt_hash=sha256:4067e6c0d2671944bbb825f93b0ba7363aab826f8b2f3d8fbcbd2a2e4f1204c6

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605230424-Z1S0G9-head-independent-pr-artifacts/.agentplane/tasks/202605230424-Z1S0G9/blueprint/resolved-snapshot.json
    - old_digest: 378f00f4f9bce5a7e1e0baa8de678ceacd42d8427b461c29e57907c8a0fb2245
    - current_digest: 378f00f4f9bce5a7e1e0baa8de678ceacd42d8427b461c29e57907c8a0fb2245
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605230424-Z1S0G9

    ### 2026-05-23T04:44:36.698Z — VERIFY — ok

    By: CODER

    Note: Verified: addressed protected-base integrate review by resolving OPEN PR identity live from branch state. Focused PR-flow/integrate tests passed (27 tests); typecheck, lint, format, hotspots, knip, and task-scope checks passed.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-23T04:32:34.524Z, excerpt_hash=sha256:4067e6c0d2671944bbb825f93b0ba7363aab826f8b2f3d8fbcbd2a2e4f1204c6

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605230424-Z1S0G9-head-independent-pr-artifacts/.agentplane/tasks/202605230424-Z1S0G9/blueprint/resolved-snapshot.json
    - old_digest: 378f00f4f9bce5a7e1e0baa8de678ceacd42d8427b461c29e57907c8a0fb2245
    - current_digest: 378f00f4f9bce5a7e1e0baa8de678ceacd42d8427b461c29e57907c8a0fb2245
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605230424-Z1S0G9

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    - Observation: Tracked pr/meta.json no longer persists OPEN pr_number/pr_url/status from live GitHub lookup/create; pr check resolves the live PR by branch when metadata lacks a PR number.
      Impact: branch_pr PR packets stop churning tracked metadata after remote PR creation or open-state hydration, reducing artifact-only commits and preserving one-commit task PRs.
      Resolution: Persist only MERGED observed PR identity; keep OPEN identity in external provider state and compute it live for review-thread gates.

    - Observation: Protected-base integrate no longer depends solely on tracked pr_number/pr_url; when metadata lacks OPEN identity it looks up the GitHub PR by task branch and base.
      Impact: The head-independent artifact model remains compatible with GitHub merge routing on protected bases.
      Resolution: Added live branch PR lookup in integrate and unit coverage for metadata-free protected-base PR targeting.
id_source: "generated"
---
## Summary

Make PR artifacts head-independent

Replace self-referential PR artifact freshness with a stable tree or runtime-state contract so branch_pr tasks can keep a one-commit implementation PR without stale head churn after artifact refresh, amend, or hosted close.

## Scope

- In scope: Replace self-referential PR artifact freshness with a stable tree or runtime-state contract so branch_pr tasks can keep a one-commit implementation PR without stale head churn after artifact refresh, amend, or hosted close.
- Out of scope: unrelated refactors not required for "Make PR artifacts head-independent".

## Plan

Implement a true head-independent PR artifact freshness contract for branch_pr. Identify where pr update/check/open writes and validates head_sha or verify digest, replace self-referential tracked artifact freshness with stable computed state (tree digest or live branch head outside the tracked artifact), preserve one implementation commit after amend/repack flows, and cover stale-artifact/direct-mode regressions with tests.

## Verify Steps

PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.

1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-23T04:32:34.497Z — VERIFY — ok

By: CODER

Note: Verified: implemented head-independent OPEN PR identity handling. Focused PR-flow tests passed (13 tests); typecheck, lint, format, hotspots, knip, and task-scope checks passed.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-23T04:25:05.041Z, excerpt_hash=sha256:4067e6c0d2671944bbb825f93b0ba7363aab826f8b2f3d8fbcbd2a2e4f1204c6

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605230424-Z1S0G9-head-independent-pr-artifacts/.agentplane/tasks/202605230424-Z1S0G9/blueprint/resolved-snapshot.json
- old_digest: 378f00f4f9bce5a7e1e0baa8de678ceacd42d8427b461c29e57907c8a0fb2245
- current_digest: 378f00f4f9bce5a7e1e0baa8de678ceacd42d8427b461c29e57907c8a0fb2245
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605230424-Z1S0G9

### 2026-05-23T04:44:36.698Z — VERIFY — ok

By: CODER

Note: Verified: addressed protected-base integrate review by resolving OPEN PR identity live from branch state. Focused PR-flow/integrate tests passed (27 tests); typecheck, lint, format, hotspots, knip, and task-scope checks passed.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-23T04:32:34.524Z, excerpt_hash=sha256:4067e6c0d2671944bbb825f93b0ba7363aab826f8b2f3d8fbcbd2a2e4f1204c6

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605230424-Z1S0G9-head-independent-pr-artifacts/.agentplane/tasks/202605230424-Z1S0G9/blueprint/resolved-snapshot.json
- old_digest: 378f00f4f9bce5a7e1e0baa8de678ceacd42d8427b461c29e57907c8a0fb2245
- current_digest: 378f00f4f9bce5a7e1e0baa8de678ceacd42d8427b461c29e57907c8a0fb2245
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605230424-Z1S0G9

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- Observation: Tracked pr/meta.json no longer persists OPEN pr_number/pr_url/status from live GitHub lookup/create; pr check resolves the live PR by branch when metadata lacks a PR number.
  Impact: branch_pr PR packets stop churning tracked metadata after remote PR creation or open-state hydration, reducing artifact-only commits and preserving one-commit task PRs.
  Resolution: Persist only MERGED observed PR identity; keep OPEN identity in external provider state and compute it live for review-thread gates.

- Observation: Protected-base integrate no longer depends solely on tracked pr_number/pr_url; when metadata lacks OPEN identity it looks up the GitHub PR by task branch and base.
  Impact: The head-independent artifact model remains compatible with GitHub merge routing on protected bases.
  Resolution: Added live branch PR lookup in integrate and unit coverage for metadata-free protected-base PR targeting.
