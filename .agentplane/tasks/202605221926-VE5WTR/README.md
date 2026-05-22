---
id: "202605221926-VE5WTR"
title: "Bound local CI targeted test process duration"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 6
origin:
  system: "manual"
depends_on: []
tags:
  - "ci"
  - "code"
  - "workflow"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-22T19:26:24.876Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-22T19:31:44.772Z"
  updated_by: "EVALUATOR"
  note: "Reviewed one-commit branch after PR artifact refresh; local focused checks passed and PR diff contains the intended run-local-ci timeout guard."
  attempts: 0
quality_review:
  state: "pass"
  updated_at: "2026-05-22T19:31:44.772Z"
  updated_by: "EVALUATOR"
  note: "Reviewed one-commit branch after PR artifact refresh; local focused checks passed and PR diff contains the intended run-local-ci timeout guard."
  evaluated_sha: "71ed752f93ed4820406508f87c2703e4b0291be9"
  blueprint_digest: "66eb194094c56e60bfbf0ad69546c66de0e100ece0e6556dbcfff0433a4bb5c6"
  evidence_refs:
    - ".agentplane/tasks/202605221926-VE5WTR/README.md"
    - "/Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605221926-VE5WTR-local-ci-vitest-timeout/.agentplane/tasks/202605221926-VE5WTR/blueprint/resolved-snapshot.json"
  findings: []
commit: null
comments:
  -
    author: "CODER"
    body: "Start: adding suite-level timeout supervision around local CI Vitest invocations after pre-push exposed a hung targeted PR suite."
events:
  -
    type: "status"
    at: "2026-05-22T19:26:34.397Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: adding suite-level timeout supervision around local CI Vitest invocations after pre-push exposed a hung targeted PR suite."
  -
    type: "verify"
    at: "2026-05-22T19:29:50.989Z"
    author: "CODER"
    state: "ok"
    note: "Bound run-local-ci Vitest subprocesses with AGENTPLANE_LOCAL_VITEST_SUITE_TIMEOUT_MS and verified focused local CI checks."
  -
    type: "verify"
    at: "2026-05-22T19:31:44.772Z"
    author: "EVALUATOR"
    state: "ok"
    note: "Reviewed one-commit branch after PR artifact refresh; local focused checks passed and PR diff contains the intended run-local-ci timeout guard."
doc_version: 3
doc_updated_at: "2026-05-22T19:31:44.787Z"
doc_updated_by: "CODER"
description: "Prevent local pre-push and run-local-ci targeted Vitest suites from hanging indefinitely by adding a bounded process timeout and actionable diagnostics for suite-level stalls."
sections:
  Summary: |-
    Bound local CI targeted test process duration

    Prevent local pre-push and run-local-ci targeted Vitest suites from hanging indefinitely by adding a bounded process timeout and actionable diagnostics for suite-level stalls.
  Scope: |-
    - In scope: Prevent local pre-push and run-local-ci targeted Vitest suites from hanging indefinitely by adding a bounded process timeout and actionable diagnostics for suite-level stalls.
    - Out of scope: unrelated refactors not required for "Bound local CI targeted test process duration".
  Plan: "Add suite-level timeout supervision to scripts/checks/run-local-ci.mjs Vitest invocations so a hung targeted suite exits with a clear diagnostic instead of blocking pre-push indefinitely. Cover timeout argument construction or process invocation behavior with focused tests, then verify local CI selection still routes normally."
  Verify Steps: |-
    PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.

    1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
    3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-22T19:29:50.989Z — VERIFY — ok

    By: CODER

    Note: Bound run-local-ci Vitest subprocesses with AGENTPLANE_LOCAL_VITEST_SUITE_TIMEOUT_MS and verified focused local CI checks.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-22T19:26:34.397Z, excerpt_hash=sha256:4067e6c0d2671944bbb825f93b0ba7363aab826f8b2f3d8fbcbd2a2e4f1204c6

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605221926-VE5WTR-local-ci-vitest-timeout/.agentplane/tasks/202605221926-VE5WTR/blueprint/resolved-snapshot.json
    - old_digest: 66eb194094c56e60bfbf0ad69546c66de0e100ece0e6556dbcfff0433a4bb5c6
    - current_digest: 66eb194094c56e60bfbf0ad69546c66de0e100ece0e6556dbcfff0433a4bb5c6
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605221926-VE5WTR

    ### 2026-05-22T19:31:44.772Z — VERIFY — ok

    By: EVALUATOR

    Note: Reviewed one-commit branch after PR artifact refresh; local focused checks passed and PR diff contains the intended run-local-ci timeout guard.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-22T19:29:51.005Z, excerpt_hash=sha256:4067e6c0d2671944bbb825f93b0ba7363aab826f8b2f3d8fbcbd2a2e4f1204c6

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605221926-VE5WTR-local-ci-vitest-timeout/.agentplane/tasks/202605221926-VE5WTR/blueprint/resolved-snapshot.json
    - old_digest: 66eb194094c56e60bfbf0ad69546c66de0e100ece0e6556dbcfff0433a4bb5c6
    - current_digest: 66eb194094c56e60bfbf0ad69546c66de0e100ece0e6556dbcfff0433a4bb5c6
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605221926-VE5WTR

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    - Observation: Local pre-push previously reached Unit tests (targeted:pr) and left the Vitest process running for minutes without output; --testTimeout only bounds individual tests/hooks, not a wedged subprocess.
      Impact: A hung targeted suite could block pushes and slow PR publication indefinitely.
      Resolution: Added suite-level execFileSync timeout for run-local-ci Vitest invocations, with an actionable stderr diagnostic and env override.

    - Observation: Branch diff is one implementation commit with scripts/checks/run-local-ci.mjs timeout supervision and release CI contract coverage.
      Impact: The task branch now has current verification evidence after PR artifact generation.
      Resolution: Proceed to hosted PR checks and integration.
id_source: "generated"
---
## Summary

Bound local CI targeted test process duration

Prevent local pre-push and run-local-ci targeted Vitest suites from hanging indefinitely by adding a bounded process timeout and actionable diagnostics for suite-level stalls.

## Scope

- In scope: Prevent local pre-push and run-local-ci targeted Vitest suites from hanging indefinitely by adding a bounded process timeout and actionable diagnostics for suite-level stalls.
- Out of scope: unrelated refactors not required for "Bound local CI targeted test process duration".

## Plan

Add suite-level timeout supervision to scripts/checks/run-local-ci.mjs Vitest invocations so a hung targeted suite exits with a clear diagnostic instead of blocking pre-push indefinitely. Cover timeout argument construction or process invocation behavior with focused tests, then verify local CI selection still routes normally.

## Verify Steps

PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.

1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-22T19:29:50.989Z — VERIFY — ok

By: CODER

Note: Bound run-local-ci Vitest subprocesses with AGENTPLANE_LOCAL_VITEST_SUITE_TIMEOUT_MS and verified focused local CI checks.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-22T19:26:34.397Z, excerpt_hash=sha256:4067e6c0d2671944bbb825f93b0ba7363aab826f8b2f3d8fbcbd2a2e4f1204c6

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605221926-VE5WTR-local-ci-vitest-timeout/.agentplane/tasks/202605221926-VE5WTR/blueprint/resolved-snapshot.json
- old_digest: 66eb194094c56e60bfbf0ad69546c66de0e100ece0e6556dbcfff0433a4bb5c6
- current_digest: 66eb194094c56e60bfbf0ad69546c66de0e100ece0e6556dbcfff0433a4bb5c6
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605221926-VE5WTR

### 2026-05-22T19:31:44.772Z — VERIFY — ok

By: EVALUATOR

Note: Reviewed one-commit branch after PR artifact refresh; local focused checks passed and PR diff contains the intended run-local-ci timeout guard.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-22T19:29:51.005Z, excerpt_hash=sha256:4067e6c0d2671944bbb825f93b0ba7363aab826f8b2f3d8fbcbd2a2e4f1204c6

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605221926-VE5WTR-local-ci-vitest-timeout/.agentplane/tasks/202605221926-VE5WTR/blueprint/resolved-snapshot.json
- old_digest: 66eb194094c56e60bfbf0ad69546c66de0e100ece0e6556dbcfff0433a4bb5c6
- current_digest: 66eb194094c56e60bfbf0ad69546c66de0e100ece0e6556dbcfff0433a4bb5c6
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605221926-VE5WTR

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- Observation: Local pre-push previously reached Unit tests (targeted:pr) and left the Vitest process running for minutes without output; --testTimeout only bounds individual tests/hooks, not a wedged subprocess.
  Impact: A hung targeted suite could block pushes and slow PR publication indefinitely.
  Resolution: Added suite-level execFileSync timeout for run-local-ci Vitest invocations, with an actionable stderr diagnostic and env override.

- Observation: Branch diff is one implementation commit with scripts/checks/run-local-ci.mjs timeout supervision and release CI contract coverage.
  Impact: The task branch now has current verification evidence after PR artifact generation.
  Resolution: Proceed to hosted PR checks and integration.
