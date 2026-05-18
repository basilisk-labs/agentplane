---
id: "202605181205-TFMY22"
title: "Fix feedback opt-in and direct finish recovery issues"
result_summary: "Merged via PR #3892."
status: "DONE"
priority: "high"
owner: "CODER"
revision: 6
origin:
  system: "manual"
depends_on: []
tags:
  - "bug"
  - "code"
  - "diagnostics"
  - "workflow"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-18T12:05:31.498Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-18T12:15:26.551Z"
  updated_by: "CODER"
  note: "Implemented one-shot feedback issue opt-in and direct close-commit preflight hardening. Checks passed: focused insights/error tests, finish validation Vitest, typecheck, docs:cli:check, format:changed, lint:core, task scope, policy routing."
  attempts: 0
commit:
  hash: "a0ef80ca70d5e0264eece4c66892474fb0e0f4f2"
  message: "Merge pull request #3892 from basilisk-labs/task/202605181205-TFMY22/fix-feedback-finish-recovery"
comments:
  -
    author: "CODER"
    body: "Start: Implement code fixes for GitHub issues #3872 and #3873: feedback issue publication must support explicit one-shot opt-in without workflow drift, and direct-mode finish/git staging blockers must surface deterministic recovery diagnostics."
  -
    author: "INTEGRATOR"
    body: "Verified: PR #3892 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
events:
  -
    type: "status"
    at: "2026-05-18T12:05:54.145Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Implement code fixes for GitHub issues #3872 and #3873: feedback issue publication must support explicit one-shot opt-in without workflow drift, and direct-mode finish/git staging blockers must surface deterministic recovery diagnostics."
  -
    type: "verify"
    at: "2026-05-18T12:15:26.551Z"
    author: "CODER"
    state: "ok"
    note: "Implemented one-shot feedback issue opt-in and direct close-commit preflight hardening. Checks passed: focused insights/error tests, finish validation Vitest, typecheck, docs:cli:check, format:changed, lint:core, task scope, policy routing."
  -
    type: "status"
    at: "2026-05-18T12:50:46.215Z"
    author: "INTEGRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: PR #3892 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
doc_version: 3
doc_updated_at: "2026-05-18T12:50:46.220Z"
doc_updated_by: "INTEGRATOR"
description: "Fix GitHub issues #3872 and #3873 without runner scope: make feedback issue publication safe without mutating workflow config in-session, and harden direct-mode finish/git staging diagnostics/recovery around dirty index and staged state."
sections:
  Summary: |-
    Fix feedback opt-in and direct finish recovery issues

    Fix GitHub issues #3872 and #3873 without runner scope: make feedback issue publication safe without mutating workflow config in-session, and harden direct-mode finish/git staging diagnostics/recovery around dirty index and staged state.
  Scope: |-
    - In scope: Fix GitHub issues #3872 and #3873 without runner scope: make feedback issue publication safe without mutating workflow config in-session, and harden direct-mode finish/git staging diagnostics/recovery around dirty index and staged state.
    - Out of scope: unrelated refactors not required for "Fix feedback opt-in and direct finish recovery issues".
  Plan: |-
    1. Reproduce/inspect #3872 feedback opt-in path and #3873 direct finish/git staging path from current code and tests.
    2. Implement narrow CLI/runtime fixes: feedback issue publication must allow explicit one-shot publication without editing workflow config, and direct finish/git blockers must produce deterministic diagnostics/recovery without corrupting task state.
    3. Add focused tests for feedback opt-in override/offline behavior and direct finish dirty/staged/lock recovery diagnostics.
    4. Run targeted Vitest, lint/typecheck/docs freshness as needed, publish PR, wait for GitHub checks, merge to main, close #3872/#3873 only after merged proof.
  Verify Steps: |-
    PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.

    1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
    3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-18T12:15:26.551Z — VERIFY — ok

    By: CODER

    Note: Implemented one-shot feedback issue opt-in and direct close-commit preflight hardening. Checks passed: focused insights/error tests, finish validation Vitest, typecheck, docs:cli:check, format:changed, lint:core, task scope, policy routing.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-18T12:05:54.145Z, excerpt_hash=sha256:4067e6c0d2671944bbb825f93b0ba7363aab826f8b2f3d8fbcbd2a2e4f1204c6

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605181205-TFMY22-fix-feedback-finish-recovery/.agentplane/tasks/202605181205-TFMY22/blueprint/resolved-snapshot.json
    - old_digest: 56ac4fb9dd78574e2bcdd05567c8a53b4a57f099e0ddeff97ae63980bfd9dc13
    - current_digest: 56ac4fb9dd78574e2bcdd05567c8a53b4a57f099e0ddeff97ae63980bfd9dc13
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605181205-TFMY22

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Fix feedback opt-in and direct finish recovery issues

Fix GitHub issues #3872 and #3873 without runner scope: make feedback issue publication safe without mutating workflow config in-session, and harden direct-mode finish/git staging diagnostics/recovery around dirty index and staged state.

## Scope

- In scope: Fix GitHub issues #3872 and #3873 without runner scope: make feedback issue publication safe without mutating workflow config in-session, and harden direct-mode finish/git staging diagnostics/recovery around dirty index and staged state.
- Out of scope: unrelated refactors not required for "Fix feedback opt-in and direct finish recovery issues".

## Plan

1. Reproduce/inspect #3872 feedback opt-in path and #3873 direct finish/git staging path from current code and tests.
2. Implement narrow CLI/runtime fixes: feedback issue publication must allow explicit one-shot publication without editing workflow config, and direct finish/git blockers must produce deterministic diagnostics/recovery without corrupting task state.
3. Add focused tests for feedback opt-in override/offline behavior and direct finish dirty/staged/lock recovery diagnostics.
4. Run targeted Vitest, lint/typecheck/docs freshness as needed, publish PR, wait for GitHub checks, merge to main, close #3872/#3873 only after merged proof.

## Verify Steps

PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.

1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-18T12:15:26.551Z — VERIFY — ok

By: CODER

Note: Implemented one-shot feedback issue opt-in and direct close-commit preflight hardening. Checks passed: focused insights/error tests, finish validation Vitest, typecheck, docs:cli:check, format:changed, lint:core, task scope, policy routing.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-18T12:05:54.145Z, excerpt_hash=sha256:4067e6c0d2671944bbb825f93b0ba7363aab826f8b2f3d8fbcbd2a2e4f1204c6

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605181205-TFMY22-fix-feedback-finish-recovery/.agentplane/tasks/202605181205-TFMY22/blueprint/resolved-snapshot.json
- old_digest: 56ac4fb9dd78574e2bcdd05567c8a53b4a57f099e0ddeff97ae63980bfd9dc13
- current_digest: 56ac4fb9dd78574e2bcdd05567c8a53b4a57f099e0ddeff97ae63980bfd9dc13
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605181205-TFMY22

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
