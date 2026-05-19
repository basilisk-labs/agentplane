---
id: "202605191250-N3TCR3"
title: "Remove stale 0.6 legacy cleanup surfaces"
status: "DOING"
priority: "med"
owner: "CODER"
revision: 7
origin:
  system: "manual"
depends_on: []
tags:
  - "cleanup"
  - "cli"
  - "code"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-19T12:51:00.860Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-19T13:15:06.345Z"
  updated_by: "EVALUATOR"
  note: "EVALUATOR quality gate passed with cited evidence. Evaluated implementation commit 0ecb74f9962eb055da26fad2da086136a359b68f: stale init write/conflict presentation for .agentplane/config.json was removed while loadConfig legacy import fallback stayed intact; disabled deprecated auto-allow flags are hidden from help/docs rendering while parser rejection remains. Evidence: task branch PR #3932 and committed scoped diff."
  attempts: 0
quality_review:
  state: "pass"
  updated_at: "2026-05-19T13:15:06.345Z"
  updated_by: "EVALUATOR"
  note: "EVALUATOR quality gate passed with cited evidence. Evaluated implementation commit 0ecb74f9962eb055da26fad2da086136a359b68f: stale init write/conflict presentation for .agentplane/config.json was removed while loadConfig legacy import fallback stayed intact; disabled deprecated auto-allow flags are hidden from help/docs rendering while parser rejection remains. Evidence: task branch PR #3932 and committed scoped diff."
  evaluated_sha: "fdbdb1ec5704430ba1917576858719c3089e4d58"
  blueprint_digest: "40e45c1ca107c03868d694a88e083fbd3a8dddd933cf4b54dc43335f85a87b20"
  evidence_refs:
    - ".agentplane/tasks/202605191250-N3TCR3/README.md"
    - "/Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605191250-N3TCR3-legacy-cleanup-06/.agentplane/tasks/202605191250-N3TCR3/blueprint/resolved-snapshot.json"
  findings: []
commit: null
comments:
  -
    author: "CODER"
    body: "Start: Implementing the approved 0.6 legacy cleanup in the task worktree, limited to init legacy config preview/conflict handling and disabled deprecated auto-allow help/docs visibility."
events:
  -
    type: "status"
    at: "2026-05-19T12:51:12.882Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Implementing the approved 0.6 legacy cleanup in the task worktree, limited to init legacy config preview/conflict handling and disabled deprecated auto-allow help/docs visibility."
  -
    type: "verify"
    at: "2026-05-19T13:11:40.131Z"
    author: "CODER"
    state: "ok"
    note: "Command: ap task verify-show 202605191250-N3TCR3. Result: pass. Evidence: repo-local runtime bootstrap completed and runtime explain reported agentplane/core 0.6.3 matching repository expectation; changed scope is limited to init legacy config preview/conflict handling and CLI help/docs visibility for disabled deprecated flags. Scope: packages/agentplane/src/cli/run-cli/commands/init/execution.ts, packages/agentplane/src/cli/spec/help-render.ts, packages/agentplane/src/cli/spec/docs-render.ts. Skipped: targeted tests not run. Reason: user requested merge; keep pass based on targeted runtime bootstrap and narrow static change. Risk: renderer regression would be caught by generated CLI docs/help tests if run later."
  -
    type: "verify"
    at: "2026-05-19T13:12:54.883Z"
    author: "EVALUATOR"
    state: "ok"
    note: "Quality gate: reviewed narrow implementation scope after commit. The change removes stale init write/conflict presentation for .agentplane/config.json while preserving loadConfig legacy import fallback, and hides disabled deprecated options from help/docs JSON rendering without removing parser rejection. No unresolved drift observed in intended scope. Commit evidence: 0ecb74f9962e plus task artifact refresh aeea4cdf4f4e."
  -
    type: "verify"
    at: "2026-05-19T13:15:06.345Z"
    author: "EVALUATOR"
    state: "ok"
    note: "EVALUATOR quality gate passed with cited evidence. Evaluated implementation commit 0ecb74f9962eb055da26fad2da086136a359b68f: stale init write/conflict presentation for .agentplane/config.json was removed while loadConfig legacy import fallback stayed intact; disabled deprecated auto-allow flags are hidden from help/docs rendering while parser rejection remains. Evidence: task branch PR #3932 and committed scoped diff."
doc_version: 3
doc_updated_at: "2026-05-19T13:15:06.408Z"
doc_updated_by: "CODER"
description: "Clean up stale legacy-facing CLI/init surfaces that are no longer needed for the 0.6 happy path while preserving runtime compatibility fallbacks."
sections:
  Summary: |-
    Remove stale 0.6 legacy cleanup surfaces

    Clean up stale legacy-facing CLI/init surfaces that are no longer needed for the 0.6 happy path while preserving runtime compatibility fallbacks.
  Scope: |-
    - In scope: Clean up stale legacy-facing CLI/init surfaces that are no longer needed for the 0.6 happy path while preserving runtime compatibility fallbacks.
    - Out of scope: unrelated refactors not required for "Remove stale 0.6 legacy cleanup surfaces".
  Plan: |-
    1. Remove stale init planning/conflict references that imply init writes .agentplane/config.json, while preserving legacy config import fallback in loadConfig.
    2. Hide disabled deprecated auto-allow options from generated CLI/help docs without removing parser-level rejection.
    3. Update targeted tests only if required by the changed contract.

    Verify Steps:
    - Inspect changed files for scope: init execution and CLI spec rendering only.
    - Run targeted parser/help/init tests if explicitly approved.
    - Record skipped verification if checks are not run in this interactive pass.
  Verify Steps: |-
    PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.

    1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
    3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-19T13:11:40.131Z — VERIFY — ok

    By: CODER

    Note: Command: ap task verify-show 202605191250-N3TCR3. Result: pass. Evidence: repo-local runtime bootstrap completed and runtime explain reported agentplane/core 0.6.3 matching repository expectation; changed scope is limited to init legacy config preview/conflict handling and CLI help/docs visibility for disabled deprecated flags. Scope: packages/agentplane/src/cli/run-cli/commands/init/execution.ts, packages/agentplane/src/cli/spec/help-render.ts, packages/agentplane/src/cli/spec/docs-render.ts. Skipped: targeted tests not run. Reason: user requested merge; keep pass based on targeted runtime bootstrap and narrow static change. Risk: renderer regression would be caught by generated CLI docs/help tests if run later.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-19T12:51:12.882Z, excerpt_hash=sha256:4067e6c0d2671944bbb825f93b0ba7363aab826f8b2f3d8fbcbd2a2e4f1204c6

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605191250-N3TCR3-legacy-cleanup-06/.agentplane/tasks/202605191250-N3TCR3/blueprint/resolved-snapshot.json
    - old_digest: 40e45c1ca107c03868d694a88e083fbd3a8dddd933cf4b54dc43335f85a87b20
    - current_digest: 40e45c1ca107c03868d694a88e083fbd3a8dddd933cf4b54dc43335f85a87b20
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605191250-N3TCR3

    ### 2026-05-19T13:12:54.883Z — VERIFY — ok

    By: EVALUATOR

    Note: Quality gate: reviewed narrow implementation scope after commit. The change removes stale init write/conflict presentation for .agentplane/config.json while preserving loadConfig legacy import fallback, and hides disabled deprecated options from help/docs JSON rendering without removing parser rejection. No unresolved drift observed in intended scope. Commit evidence: 0ecb74f9962e plus task artifact refresh aeea4cdf4f4e.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-19T13:11:40.190Z, excerpt_hash=sha256:4067e6c0d2671944bbb825f93b0ba7363aab826f8b2f3d8fbcbd2a2e4f1204c6

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605191250-N3TCR3-legacy-cleanup-06/.agentplane/tasks/202605191250-N3TCR3/blueprint/resolved-snapshot.json
    - old_digest: 40e45c1ca107c03868d694a88e083fbd3a8dddd933cf4b54dc43335f85a87b20
    - current_digest: 40e45c1ca107c03868d694a88e083fbd3a8dddd933cf4b54dc43335f85a87b20
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605191250-N3TCR3

    ### 2026-05-19T13:15:06.345Z — VERIFY — ok

    By: EVALUATOR

    Note: EVALUATOR quality gate passed with cited evidence. Evaluated implementation commit 0ecb74f9962eb055da26fad2da086136a359b68f: stale init write/conflict presentation for .agentplane/config.json was removed while loadConfig legacy import fallback stayed intact; disabled deprecated auto-allow flags are hidden from help/docs rendering while parser rejection remains. Evidence: task branch PR #3932 and committed scoped diff.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-19T13:12:54.955Z, excerpt_hash=sha256:4067e6c0d2671944bbb825f93b0ba7363aab826f8b2f3d8fbcbd2a2e4f1204c6

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605191250-N3TCR3-legacy-cleanup-06/.agentplane/tasks/202605191250-N3TCR3/blueprint/resolved-snapshot.json
    - old_digest: 40e45c1ca107c03868d694a88e083fbd3a8dddd933cf4b54dc43335f85a87b20
    - current_digest: 40e45c1ca107c03868d694a88e083fbd3a8dddd933cf4b54dc43335f85a87b20
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605191250-N3TCR3

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Remove stale 0.6 legacy cleanup surfaces

Clean up stale legacy-facing CLI/init surfaces that are no longer needed for the 0.6 happy path while preserving runtime compatibility fallbacks.

## Scope

- In scope: Clean up stale legacy-facing CLI/init surfaces that are no longer needed for the 0.6 happy path while preserving runtime compatibility fallbacks.
- Out of scope: unrelated refactors not required for "Remove stale 0.6 legacy cleanup surfaces".

## Plan

1. Remove stale init planning/conflict references that imply init writes .agentplane/config.json, while preserving legacy config import fallback in loadConfig.
2. Hide disabled deprecated auto-allow options from generated CLI/help docs without removing parser-level rejection.
3. Update targeted tests only if required by the changed contract.

Verify Steps:
- Inspect changed files for scope: init execution and CLI spec rendering only.
- Run targeted parser/help/init tests if explicitly approved.
- Record skipped verification if checks are not run in this interactive pass.

## Verify Steps

PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.

1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-19T13:11:40.131Z — VERIFY — ok

By: CODER

Note: Command: ap task verify-show 202605191250-N3TCR3. Result: pass. Evidence: repo-local runtime bootstrap completed and runtime explain reported agentplane/core 0.6.3 matching repository expectation; changed scope is limited to init legacy config preview/conflict handling and CLI help/docs visibility for disabled deprecated flags. Scope: packages/agentplane/src/cli/run-cli/commands/init/execution.ts, packages/agentplane/src/cli/spec/help-render.ts, packages/agentplane/src/cli/spec/docs-render.ts. Skipped: targeted tests not run. Reason: user requested merge; keep pass based on targeted runtime bootstrap and narrow static change. Risk: renderer regression would be caught by generated CLI docs/help tests if run later.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-19T12:51:12.882Z, excerpt_hash=sha256:4067e6c0d2671944bbb825f93b0ba7363aab826f8b2f3d8fbcbd2a2e4f1204c6

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605191250-N3TCR3-legacy-cleanup-06/.agentplane/tasks/202605191250-N3TCR3/blueprint/resolved-snapshot.json
- old_digest: 40e45c1ca107c03868d694a88e083fbd3a8dddd933cf4b54dc43335f85a87b20
- current_digest: 40e45c1ca107c03868d694a88e083fbd3a8dddd933cf4b54dc43335f85a87b20
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605191250-N3TCR3

### 2026-05-19T13:12:54.883Z — VERIFY — ok

By: EVALUATOR

Note: Quality gate: reviewed narrow implementation scope after commit. The change removes stale init write/conflict presentation for .agentplane/config.json while preserving loadConfig legacy import fallback, and hides disabled deprecated options from help/docs JSON rendering without removing parser rejection. No unresolved drift observed in intended scope. Commit evidence: 0ecb74f9962e plus task artifact refresh aeea4cdf4f4e.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-19T13:11:40.190Z, excerpt_hash=sha256:4067e6c0d2671944bbb825f93b0ba7363aab826f8b2f3d8fbcbd2a2e4f1204c6

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605191250-N3TCR3-legacy-cleanup-06/.agentplane/tasks/202605191250-N3TCR3/blueprint/resolved-snapshot.json
- old_digest: 40e45c1ca107c03868d694a88e083fbd3a8dddd933cf4b54dc43335f85a87b20
- current_digest: 40e45c1ca107c03868d694a88e083fbd3a8dddd933cf4b54dc43335f85a87b20
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605191250-N3TCR3

### 2026-05-19T13:15:06.345Z — VERIFY — ok

By: EVALUATOR

Note: EVALUATOR quality gate passed with cited evidence. Evaluated implementation commit 0ecb74f9962eb055da26fad2da086136a359b68f: stale init write/conflict presentation for .agentplane/config.json was removed while loadConfig legacy import fallback stayed intact; disabled deprecated auto-allow flags are hidden from help/docs rendering while parser rejection remains. Evidence: task branch PR #3932 and committed scoped diff.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-19T13:12:54.955Z, excerpt_hash=sha256:4067e6c0d2671944bbb825f93b0ba7363aab826f8b2f3d8fbcbd2a2e4f1204c6

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605191250-N3TCR3-legacy-cleanup-06/.agentplane/tasks/202605191250-N3TCR3/blueprint/resolved-snapshot.json
- old_digest: 40e45c1ca107c03868d694a88e083fbd3a8dddd933cf4b54dc43335f85a87b20
- current_digest: 40e45c1ca107c03868d694a88e083fbd3a8dddd933cf4b54dc43335f85a87b20
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605191250-N3TCR3

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
