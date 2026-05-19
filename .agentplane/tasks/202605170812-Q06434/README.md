---
id: "202605170812-Q06434"
title: "Fix CodeQL upgrade source URL validation"
result_summary: "Closed as included in merged CodeQL remediation PR #3793."
status: "DONE"
priority: "high"
owner: "CODER"
revision: 9
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "security"
  - "upgrade"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-17T08:14:38.026Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-19T06:17:31.523Z"
  updated_by: "EVALUATOR"
  note: "EVALUATOR quality gate passed: current main contains CodeQL remediation PR #3793 and GitHub code-scanning currently reports 0 open alerts; this update only reconciles stale DOING state."
  attempts: 0
quality_review:
  state: "pass"
  updated_at: "2026-05-19T06:17:31.523Z"
  updated_by: "EVALUATOR"
  note: "EVALUATOR quality gate passed: current main contains CodeQL remediation PR #3793 and GitHub code-scanning currently reports 0 open alerts; this update only reconciles stale DOING state."
  evaluated_sha: "e5e1eeeba01807a4a4c4b03282d22ca208130d4d"
  blueprint_digest: "dec75de2cbf067148f60ea4b3d172c38dfd68e5db93e0991cd5714e96796ef11"
  evidence_refs:
    - ".agentplane/tasks/202605170812-Q06434/README.md"
    - "/Users/densmirnov/Github/agentplane/.agentplane/tasks/202605170812-Q06434/blueprint/resolved-snapshot.json"
  findings: []
commit:
  hash: "e5e1eeeba01807a4a4c4b03282d22ca208130d4d"
  message: "Merge pull request #3919 from basilisk-labs/task-close/202605181816-3W350X/94be1f5afed7"
comments:
  -
    author: "CODER"
    body: "Start: replacing substring GitHub source validation with parsed URL host validation and focused upgrade-source tests for the approved CodeQL remediation batch."
  -
    author: "INTEGRATOR"
    body: "Verified: stale DOING cleanup only; CodeQL remediation was included in merged PR #3793 on current main, and live GitHub code-scanning open alerts count is 0."
events:
  -
    type: "status"
    at: "2026-05-17T08:27:10.371Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: replacing substring GitHub source validation with parsed URL host validation and focused upgrade-source tests for the approved CodeQL remediation batch."
  -
    type: "verify"
    at: "2026-05-17T08:48:27.465Z"
    author: "CODER"
    state: "ok"
    note: "Local verification passed for upgrade source URL validation: host validation now parses URL and requires https://github.com; hostile github.com-in-path/subdomain cases are rejected. Focused tests, exact-file ESLint, agentplane typecheck, and policy routing passed. GitHub Code scanning alert #18 remains open until this branch is published and CodeQL reruns."
  -
    type: "verify"
    at: "2026-05-19T06:17:30.752Z"
    author: "CODER"
    state: "ok"
    note: "Verified: stale DOING cleanup only; CodeQL remediation is already included in merged PR #3793 on current main, and live GitHub code-scanning open alerts count is 0."
  -
    type: "verify"
    at: "2026-05-19T06:17:31.523Z"
    author: "EVALUATOR"
    state: "ok"
    note: "EVALUATOR quality gate passed: current main contains CodeQL remediation PR #3793 and GitHub code-scanning currently reports 0 open alerts; this update only reconciles stale DOING state."
  -
    type: "status"
    at: "2026-05-19T06:17:32.124Z"
    author: "INTEGRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: stale DOING cleanup only; CodeQL remediation was included in merged PR #3793 on current main, and live GitHub code-scanning open alerts count is 0."
doc_version: 3
doc_updated_at: "2026-05-19T06:17:32.125Z"
doc_updated_by: "INTEGRATOR"
description: "Replace substring GitHub URL validation with parsed host validation for CodeQL alert #18."
sections:
  Summary: |-
    Fix CodeQL upgrade source URL validation

    Replace substring GitHub URL validation with parsed host validation for CodeQL alert #18.
  Scope: |-
    - In scope: Replace substring GitHub URL validation with parsed host validation for CodeQL alert #18.
    - Out of scope: unrelated refactors not required for "Fix CodeQL upgrade source URL validation".
  Plan: "Scope: fix CodeQL alert #18 by replacing substring GitHub URL validation with parsed URL host validation in upgrade source handling. Coordinate implementation in the primary batch worktree owned by 202605170811-8DPCYD."
  Verify Steps: |-
    - Add or update focused tests for normalizeFrameworkSourceForUpgrade/parseGitHubRepo behavior.
    - Verify valid https://github.com/owner/repo(.git) URLs still normalize correctly.
    - Verify hostile URLs containing github.com outside the hostname are rejected.
    - Re-query Code scanning alert #18 after GitHub CodeQL runs and record closed or pending status.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-17T08:48:27.465Z — VERIFY — ok

    By: CODER

    Note: Local verification passed for upgrade source URL validation: host validation now parses URL and requires https://github.com; hostile github.com-in-path/subdomain cases are rejected. Focused tests, exact-file ESLint, agentplane typecheck, and policy routing passed. GitHub Code scanning alert #18 remains open until this branch is published and CodeQL reruns.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-17T08:27:10.371Z, excerpt_hash=sha256:366af10f34a07a7ada91af06ad50358d7cd7c14f4e278f6d51fcfa091a38dc3f

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605170811-8DPCYD-codeql-security-fixes/.agentplane/tasks/202605170812-Q06434/blueprint/resolved-snapshot.json
    - old_digest: b1025ce6b668d01758d4e1421b84d287a4f81df3c467025a12c60e1f45305ac5
    - current_digest: b1025ce6b668d01758d4e1421b84d287a4f81df3c467025a12c60e1f45305ac5
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605170812-Q06434

    ### 2026-05-19T06:17:30.752Z — VERIFY — ok

    By: CODER

    Note: Verified: stale DOING cleanup only; CodeQL remediation is already included in merged PR #3793 on current main, and live GitHub code-scanning open alerts count is 0.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-17T08:48:27.513Z, excerpt_hash=sha256:366af10f34a07a7ada91af06ad50358d7cd7c14f4e278f6d51fcfa091a38dc3f

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/tasks/202605170812-Q06434/blueprint/resolved-snapshot.json
    - old_digest: dec75de2cbf067148f60ea4b3d172c38dfd68e5db93e0991cd5714e96796ef11
    - current_digest: dec75de2cbf067148f60ea4b3d172c38dfd68e5db93e0991cd5714e96796ef11
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605170812-Q06434

    ### 2026-05-19T06:17:31.523Z — VERIFY — ok

    By: EVALUATOR

    Note: EVALUATOR quality gate passed: current main contains CodeQL remediation PR #3793 and GitHub code-scanning currently reports 0 open alerts; this update only reconciles stale DOING state.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-19T06:17:30.767Z, excerpt_hash=sha256:366af10f34a07a7ada91af06ad50358d7cd7c14f4e278f6d51fcfa091a38dc3f

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/tasks/202605170812-Q06434/blueprint/resolved-snapshot.json
    - old_digest: dec75de2cbf067148f60ea4b3d172c38dfd68e5db93e0991cd5714e96796ef11
    - current_digest: dec75de2cbf067148f60ea4b3d172c38dfd68e5db93e0991cd5714e96796ef11
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605170812-Q06434

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    - Observation: GitHub Code scanning still reports alert #18 on main.
      Impact: External alert closure is pending hosted CodeQL analysis, not a local test failure.
      Resolution: Publish PR and re-query code scanning after GitHub CodeQL completes.
id_source: "generated"
---
## Summary

Fix CodeQL upgrade source URL validation

Replace substring GitHub URL validation with parsed host validation for CodeQL alert #18.

## Scope

- In scope: Replace substring GitHub URL validation with parsed host validation for CodeQL alert #18.
- Out of scope: unrelated refactors not required for "Fix CodeQL upgrade source URL validation".

## Plan

Scope: fix CodeQL alert #18 by replacing substring GitHub URL validation with parsed URL host validation in upgrade source handling. Coordinate implementation in the primary batch worktree owned by 202605170811-8DPCYD.

## Verify Steps

- Add or update focused tests for normalizeFrameworkSourceForUpgrade/parseGitHubRepo behavior.
- Verify valid https://github.com/owner/repo(.git) URLs still normalize correctly.
- Verify hostile URLs containing github.com outside the hostname are rejected.
- Re-query Code scanning alert #18 after GitHub CodeQL runs and record closed or pending status.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-17T08:48:27.465Z — VERIFY — ok

By: CODER

Note: Local verification passed for upgrade source URL validation: host validation now parses URL and requires https://github.com; hostile github.com-in-path/subdomain cases are rejected. Focused tests, exact-file ESLint, agentplane typecheck, and policy routing passed. GitHub Code scanning alert #18 remains open until this branch is published and CodeQL reruns.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-17T08:27:10.371Z, excerpt_hash=sha256:366af10f34a07a7ada91af06ad50358d7cd7c14f4e278f6d51fcfa091a38dc3f

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605170811-8DPCYD-codeql-security-fixes/.agentplane/tasks/202605170812-Q06434/blueprint/resolved-snapshot.json
- old_digest: b1025ce6b668d01758d4e1421b84d287a4f81df3c467025a12c60e1f45305ac5
- current_digest: b1025ce6b668d01758d4e1421b84d287a4f81df3c467025a12c60e1f45305ac5
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605170812-Q06434

### 2026-05-19T06:17:30.752Z — VERIFY — ok

By: CODER

Note: Verified: stale DOING cleanup only; CodeQL remediation is already included in merged PR #3793 on current main, and live GitHub code-scanning open alerts count is 0.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-17T08:48:27.513Z, excerpt_hash=sha256:366af10f34a07a7ada91af06ad50358d7cd7c14f4e278f6d51fcfa091a38dc3f

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/tasks/202605170812-Q06434/blueprint/resolved-snapshot.json
- old_digest: dec75de2cbf067148f60ea4b3d172c38dfd68e5db93e0991cd5714e96796ef11
- current_digest: dec75de2cbf067148f60ea4b3d172c38dfd68e5db93e0991cd5714e96796ef11
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605170812-Q06434

### 2026-05-19T06:17:31.523Z — VERIFY — ok

By: EVALUATOR

Note: EVALUATOR quality gate passed: current main contains CodeQL remediation PR #3793 and GitHub code-scanning currently reports 0 open alerts; this update only reconciles stale DOING state.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-19T06:17:30.767Z, excerpt_hash=sha256:366af10f34a07a7ada91af06ad50358d7cd7c14f4e278f6d51fcfa091a38dc3f

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/tasks/202605170812-Q06434/blueprint/resolved-snapshot.json
- old_digest: dec75de2cbf067148f60ea4b3d172c38dfd68e5db93e0991cd5714e96796ef11
- current_digest: dec75de2cbf067148f60ea4b3d172c38dfd68e5db93e0991cd5714e96796ef11
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605170812-Q06434

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- Observation: GitHub Code scanning still reports alert #18 on main.
  Impact: External alert closure is pending hosted CodeQL analysis, not a local test failure.
  Resolution: Publish PR and re-query code scanning after GitHub CodeQL completes.
