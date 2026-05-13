---
id: "202605130950-F4JE2H"
title: "Stabilize recent GitHub CI failure modes"
result_summary: "Merged via PR #3621."
status: "DONE"
priority: "high"
owner: "CODER"
revision: 1
origin:
  system: "manual"
depends_on: []
tags:
  - "ci"
  - "code"
  - "tests"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-13T09:50:44.361Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-13T10:01:36.578Z"
  updated_by: "CODER"
  note: "Verified: CI failure stabilization covers detached GitHub check waiting, sqlite EPIPE handling, and CI gate noise with focused tests, fast suite, critical suite, lint, typecheck, Knip, workflow lint, policy routing, and doctor."
  attempts: 0
commit:
  hash: "424c521495e4d470fd26f20d10cc16603846e767"
  message: "Merge PR #3621: stabilize CI failure modes"
comments:
  -
    author: "CODER"
    body: "Start: Implement the approved CI stability fixes in the dedicated task worktree, keeping changes scoped to wait-remote-pr-checks tests, sqlite child-process error handling, and CI gate labeling/runtime adjustments."
  -
    author: "INTEGRATOR"
    body: "Verified: PR #3621 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
events:
  -
    type: "status"
    at: "2026-05-13T09:51:03.474Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Implement the approved CI stability fixes in the dedicated task worktree, keeping changes scoped to wait-remote-pr-checks tests, sqlite child-process error handling, and CI gate labeling/runtime adjustments."
  -
    type: "verify"
    at: "2026-05-13T10:01:36.578Z"
    author: "CODER"
    state: "ok"
    note: "Verified: CI failure stabilization covers detached GitHub check waiting, sqlite EPIPE handling, and CI gate noise with focused tests, fast suite, critical suite, lint, typecheck, Knip, workflow lint, policy routing, and doctor."
  -
    type: "status"
    at: "2026-05-13T10:08:31.940Z"
    author: "INTEGRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: PR #3621 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
doc_version: 3
doc_updated_at: "2026-05-13T10:08:31.940Z"
doc_updated_by: "INTEGRATOR"
description: "Make recent GitHub Actions failures less likely by hermeticizing wait-remote-pr-checks tests, handling sqlite stdin pipe errors, and reducing CI gate noise without weakening code quality."
sections:
  Summary: |-
    Stabilize recent GitHub CI failure modes
    
    Make recent GitHub Actions failures less likely by hermeticizing wait-remote-pr-checks tests, handling sqlite stdin pipe errors, and reducing CI gate noise without weakening code quality.
  Scope: |-
    - In scope: Make recent GitHub Actions failures less likely by hermeticizing wait-remote-pr-checks tests, handling sqlite stdin pipe errors, and reducing CI gate noise without weakening code quality.
    - Out of scope: unrelated refactors not required for "Stabilize recent GitHub CI failure modes".
  Plan: "Implement CI stability fixes from the GitHub Actions failure analysis: (1) make wait-remote-pr-checks script tests independent of pull_request-only env by explicitly setting/default-clearing branch env in test harness, (2) handle sqlite3 stdin pipe errors without unhandled Vitest exceptions, (3) adjust Core CI labels/Windows steps so blocking gates are explicit and redundant formatting does not slow platform checks. Verify with focused tests, format/knip/CI checks, policy routing, and doctor."
  Verify Steps: |-
    1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
    3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-13T10:01:36.578Z — VERIFY — ok
    
    By: CODER
    
    Note: Verified: CI failure stabilization covers detached GitHub check waiting, sqlite EPIPE handling, and CI gate noise with focused tests, fast suite, critical suite, lint, typecheck, Knip, workflow lint, policy routing, and doctor.
    Attempts: 0
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-13T09:51:03.474Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7
    
    Details:
    
    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605130950-F4JE2H-ci-failure-stability/.agentplane/tasks/202605130950-F4JE2H/blueprint/resolved-snapshot.json
    - old_digest: 3875b88ff7f26963a1b83280f84f03107cb642b50a1f3c52cd1229d9f38d67e1
    - current_digest: 3875b88ff7f26963a1b83280f84f03107cb642b50a1f3c52cd1229d9f38d67e1
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605130950-F4JE2H
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    - Observation: Recent GitHub failures were reproduced as three concrete failure classes: detached push checkout without explicit PR target, sqlite3 stdin EPIPE during context projection, and duplicate/noisy Windows formatting gate.
      Impact: Detached checkout now fails with an explicit action instead of hidden branch inference; sqlite stdin write failures become handled promise rejections; CI keeps formatting coverage on Linux while removing duplicate Windows format noise and making Knip's blocking role explicit.
      Resolution: Added targeted regression tests, hardened sqlite child-process handling, clarified wait-remote-checks test env, and adjusted workflow checks without removing the primary quality gates.
id_source: "generated"
---
## Summary

Stabilize recent GitHub CI failure modes

Make recent GitHub Actions failures less likely by hermeticizing wait-remote-pr-checks tests, handling sqlite stdin pipe errors, and reducing CI gate noise without weakening code quality.

## Scope

- In scope: Make recent GitHub Actions failures less likely by hermeticizing wait-remote-pr-checks tests, handling sqlite stdin pipe errors, and reducing CI gate noise without weakening code quality.
- Out of scope: unrelated refactors not required for "Stabilize recent GitHub CI failure modes".

## Plan

Implement CI stability fixes from the GitHub Actions failure analysis: (1) make wait-remote-pr-checks script tests independent of pull_request-only env by explicitly setting/default-clearing branch env in test harness, (2) handle sqlite3 stdin pipe errors without unhandled Vitest exceptions, (3) adjust Core CI labels/Windows steps so blocking gates are explicit and redundant formatting does not slow platform checks. Verify with focused tests, format/knip/CI checks, policy routing, and doctor.

## Verify Steps

1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-13T10:01:36.578Z — VERIFY — ok

By: CODER

Note: Verified: CI failure stabilization covers detached GitHub check waiting, sqlite EPIPE handling, and CI gate noise with focused tests, fast suite, critical suite, lint, typecheck, Knip, workflow lint, policy routing, and doctor.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-13T09:51:03.474Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605130950-F4JE2H-ci-failure-stability/.agentplane/tasks/202605130950-F4JE2H/blueprint/resolved-snapshot.json
- old_digest: 3875b88ff7f26963a1b83280f84f03107cb642b50a1f3c52cd1229d9f38d67e1
- current_digest: 3875b88ff7f26963a1b83280f84f03107cb642b50a1f3c52cd1229d9f38d67e1
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605130950-F4JE2H

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- Observation: Recent GitHub failures were reproduced as three concrete failure classes: detached push checkout without explicit PR target, sqlite3 stdin EPIPE during context projection, and duplicate/noisy Windows formatting gate.
  Impact: Detached checkout now fails with an explicit action instead of hidden branch inference; sqlite stdin write failures become handled promise rejections; CI keeps formatting coverage on Linux while removing duplicate Windows format noise and making Knip's blocking role explicit.
  Resolution: Added targeted regression tests, hardened sqlite child-process handling, clarified wait-remote-checks test env, and adjusted workflow checks without removing the primary quality gates.
