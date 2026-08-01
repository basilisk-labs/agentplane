---
id: "202607221854-SDPFN0"
title: "Complete CommandSession capability migration"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 14
origin:
  system: "manual"
depends_on:
  - "202607221908-TZTE5V"
  - "202607221908-2NDXVB"
  - "202607221908-YD5J89"
  - "202607221908-RC1DX8"
  - "202607221908-7WV0A7"
tags:
  - "cli"
  - "command-session"
  - "migration"
  - "milestone-rc2"
  - "refactor"
  - "rf-24"
  - "v0.7"
  - "wave-internals"
task_kind: "code"
mutation_scope: "code"
blueprint_request: "code.branch_pr"
verify:
  - "bun run arch:check"
  - "bun run ci:contract"
  - "bun run guards:check"
  - "bun run test:critical"
plan_approval:
  state: "approved"
  updated_at: "2026-08-01T12:46:46.058Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-08-01T13:23:37.323Z"
  updated_by: "TESTER"
  note: "PASS at implementation d89988611fbd: all five dependency slices are DONE; explicit capability catalog and typed loaders verified; coarse CommandNeeds metadata absent; ci:contract, arch:check, guards:check, typecheck, critical CLI (77 tests), full agentplane suite (3206 tests), and focused catalog/session tests (34 tests) passed."
  attempts: 0
commit:
  hash: "d89988611fbdd3efaba3c9054d122104e6717a2b"
  message: "♻️ SDPFN0 task: complete CommandSession capability migration"
comments:
  -
    author: "CODER"
    body: "Start: continue branch_pr task in the dedicated task worktree."
  -
    author: "CODER"
    body: "Implementation committed and locally verified: CommandNeeds compatibility metadata removed, all catalog entries use explicit capabilities, and command catalog modules remain below the hotspot threshold."
events:
  -
    type: "status"
    at: "2026-08-01T12:47:37.404Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: continue branch_pr task in the dedicated task worktree."
  -
    type: "status"
    at: "2026-08-01T13:22:41.038Z"
    author: "CODER"
    from: "DOING"
    to: "DOING"
    note: "Implementation committed and locally verified: CommandNeeds compatibility metadata removed, all catalog entries use explicit capabilities, and command catalog modules remain below the hotspot threshold."
  -
    type: "verify"
    at: "2026-08-01T13:23:37.323Z"
    author: "TESTER"
    state: "ok"
    note: "PASS at implementation d89988611fbd: all five dependency slices are DONE; explicit capability catalog and typed loaders verified; coarse CommandNeeds metadata absent; ci:contract, arch:check, guards:check, typecheck, critical CLI (77 tests), full agentplane suite (3206 tests), and focused catalog/session tests (34 tests) passed."
doc_version: 3
doc_updated_at: "2026-08-01T13:23:38.133Z"
doc_updated_by: "CODER"
description: "RF-24b fan-in: integrate the five independently verified command-family vertical slices, remove the coarse CommandNeeds compatibility layer, and prove every catalog entry has minimal typed capabilities."
sections:
  Summary: |-
    Complete CommandSession capability migration

    Integrate the five independently verified command-family vertical slices, remove the coarse CommandNeeds compatibility layer after zero consumers remain, and prove catalog-wide minimal capability and lazy preparation invariants.
  Scope: |-
    - In scope: integrate the separately verified project/config/help/docs, task/lifecycle/route, context/evaluator, runner/Hermes, and provider/release/ops capability slices; remove the coarse CommandNeeds adapter after zero consumers; validate catalog-wide requirement visibility and lazy preparation profiles.
    - Out of scope: implementing family-specific migrations inside this fan-in task.
  Plan: |-
    1. Confirm all five command-family slice tasks are DONE and based on compatible shared capability contracts.
    2. Integrate their catalog/session changes and resolve only cross-family type or registry conflicts.
    3. Remove the coarse CommandNeeds compatibility adapter when zero production consumers remain.
    4. Run catalog-wide capability, laziness, command snapshot, architecture, and preparation-profile checks.
    5. Record any residual compatibility adapter as a release blocker rather than widening this task.
  Verify Steps: |-
    1. Resolve this task's dependency closure. Expected: all five command-family vertical slices are DONE with independent verification.
    2. Inspect every command catalog entry and handler session type. Expected: granular requirements are explicit and no handler receives undeclared task/Git/provider capabilities.
    3. Search for active coarse CommandNeeds consumers and duplicate loader requirement metadata. Expected: none remain.
    4. Run command/help/JSON snapshots, preparation profiles, `bun run arch:check`, `bun run guards:check`, `bun run ci:contract`, and typecheck.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-08-01T13:23:37.323Z — VERIFY — ok

    By: TESTER

    Note: PASS at implementation d89988611fbd: all five dependency slices are DONE; explicit capability catalog and typed loaders verified; coarse CommandNeeds metadata absent; ci:contract, arch:check, guards:check, typecheck, critical CLI (77 tests), full agentplane suite (3206 tests), and focused catalog/session tests (34 tests) passed.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-01T13:22:41.038Z, excerpt_hash=sha256:8950afda9b85681264c0d254928c271ef6b37c584a02cf54252d1d22b1895326

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/v07-packet-fix-control-20260730/.agentplane/worktrees/202607221854-SDPFN0-complete-commandsession-capability-migration/.agentplane/tasks/202607221854-SDPFN0/blueprint/resolved-snapshot.json
    - old_digest: 06e4268a4cabba53cb9fddff0e6ada3a5298134a5f80219a92c0349d4fbc0c62
    - current_digest: 06e4268a4cabba53cb9fddff0e6ada3a5298134a5f80219a92c0349d4fbc0c62
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202607221854-SDPFN0

    DecisionContextRef:
    - operator_action: stop
    - can_execute_now: false
    - safe_command: none
    - diagnostic_command: agentplane task verify-show 202607221854-SDPFN0
    - source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: false
    - repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
    - risks: none

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert the fan-in integration commit while leaving independently merged family slices intact.
    - Restore only the explicit coarse compatibility adapter if cross-family integration fails; do not revert family results wholesale.
    - Re-run catalog snapshots, architecture checks, and each family verification before retry.
  Findings: |-
    - Observation: Command catalog no longer exposes needs or compatibility metadata; conditional task normalize and Codex plugin install select minimal session profiles.
      Impact: CLI preparation is capability-authoritative and avoids unnecessary provider, Git, task, project, or config context for migrated commands.
      Resolution: Accepted. Residual risk is limited to hosted CI and evaluator semantic review.
extensions:
  workflow_route_baseline:
    start_head_sha: "395235931a6b78f8c0f1afb0060b136053e9c315"
    version: 1
id_source: "generated"
---
## Summary

Complete CommandSession capability migration

Integrate the five independently verified command-family vertical slices, remove the coarse CommandNeeds compatibility layer after zero consumers remain, and prove catalog-wide minimal capability and lazy preparation invariants.

## Scope

- In scope: integrate the separately verified project/config/help/docs, task/lifecycle/route, context/evaluator, runner/Hermes, and provider/release/ops capability slices; remove the coarse CommandNeeds adapter after zero consumers; validate catalog-wide requirement visibility and lazy preparation profiles.
- Out of scope: implementing family-specific migrations inside this fan-in task.

## Plan

1. Confirm all five command-family slice tasks are DONE and based on compatible shared capability contracts.
2. Integrate their catalog/session changes and resolve only cross-family type or registry conflicts.
3. Remove the coarse CommandNeeds compatibility adapter when zero production consumers remain.
4. Run catalog-wide capability, laziness, command snapshot, architecture, and preparation-profile checks.
5. Record any residual compatibility adapter as a release blocker rather than widening this task.

## Verify Steps

1. Resolve this task's dependency closure. Expected: all five command-family vertical slices are DONE with independent verification.
2. Inspect every command catalog entry and handler session type. Expected: granular requirements are explicit and no handler receives undeclared task/Git/provider capabilities.
3. Search for active coarse CommandNeeds consumers and duplicate loader requirement metadata. Expected: none remain.
4. Run command/help/JSON snapshots, preparation profiles, `bun run arch:check`, `bun run guards:check`, `bun run ci:contract`, and typecheck.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-08-01T13:23:37.323Z — VERIFY — ok

By: TESTER

Note: PASS at implementation d89988611fbd: all five dependency slices are DONE; explicit capability catalog and typed loaders verified; coarse CommandNeeds metadata absent; ci:contract, arch:check, guards:check, typecheck, critical CLI (77 tests), full agentplane suite (3206 tests), and focused catalog/session tests (34 tests) passed.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-01T13:22:41.038Z, excerpt_hash=sha256:8950afda9b85681264c0d254928c271ef6b37c584a02cf54252d1d22b1895326

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/v07-packet-fix-control-20260730/.agentplane/worktrees/202607221854-SDPFN0-complete-commandsession-capability-migration/.agentplane/tasks/202607221854-SDPFN0/blueprint/resolved-snapshot.json
- old_digest: 06e4268a4cabba53cb9fddff0e6ada3a5298134a5f80219a92c0349d4fbc0c62
- current_digest: 06e4268a4cabba53cb9fddff0e6ada3a5298134a5f80219a92c0349d4fbc0c62
- route_changed: no
- safe_command: agentplane blueprint snapshot 202607221854-SDPFN0

DecisionContextRef:
- operator_action: stop
- can_execute_now: false
- safe_command: none
- diagnostic_command: agentplane task verify-show 202607221854-SDPFN0
- source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: false
- repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
- risks: none

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert the fan-in integration commit while leaving independently merged family slices intact.
- Restore only the explicit coarse compatibility adapter if cross-family integration fails; do not revert family results wholesale.
- Re-run catalog snapshots, architecture checks, and each family verification before retry.

## Findings

- Observation: Command catalog no longer exposes needs or compatibility metadata; conditional task normalize and Codex plugin install select minimal session profiles.
  Impact: CLI preparation is capability-authoritative and avoids unnecessary provider, Git, task, project, or config context for migrated commands.
  Resolution: Accepted. Residual risk is limited to hosted CI and evaluator semantic review.
