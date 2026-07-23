---
id: "202607221846-ZAENM6"
title: "Add trust-boundary architecture ratchets"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 9
origin:
  system: "manual"
depends_on:
  - "202607221846-SXJ75T"
tags:
  - "architecture"
  - "guard"
  - "milestone-alpha1"
  - "refactor"
  - "rf-27"
  - "v0.7"
  - "wave-trust"
task_kind: "code"
mutation_scope: "code"
blueprint_request: "code.branch_pr"
verify:
  - "bun run ci:contract"
  - "bun run guards:check"
  - "bun run test:critical"
plan_approval:
  state: "approved"
  updated_at: "2026-07-22T21:26:45.488Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-07-23T00:17:11.288Z"
  updated_by: "CODER"
  note: "Local contract passed on aa9f3987d: trust checker accepted exactly 63 reviewed violations (37/4/10/1/4/7); accumulated regression matrix 17/17; independent bounded audit VERIFY_OK; ESLint, TypeScript, guards, routing, hotspot, dependency architecture, Prettier and diff checks passed."
  attempts: 0
quality_review:
  state: "pass"
  updated_at: "2026-07-23T00:17:38.325Z"
  updated_by: "EVALUATOR"
  note: "Quality review passed."
  evaluated_sha: "aa9f3987d364854d3960d7c9a55afc19b8c6224a"
  blueprint_digest: "7d20d7a390d13b10443643e53f39c63dcdae67537533a9f1aec40a2695ad1d56"
  evidence_refs:
    - ".agentplane/tasks/202607221846-ZAENM6/README.md"
    - ".agentplane/tasks/202607221846-ZAENM6/quality/20260723-001738325-recovery-context/quality-report.json"
    - ".agentplane/tasks/202607221846-ZAENM6/quality/20260723-001738325-recovery-context/evaluator-prompt.md"
    - ".agentplane/tasks/202607221846-ZAENM6/quality/20260723-001738325-recovery-context/evaluator-opinion.md"
    - ".agentplane/tasks/202607221846-ZAENM6/blueprint/resolved-snapshot.json"
  findings:
    - "No blocking findings."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: implement trust-boundary architecture ratchets from the approved alpha.1 plan."
events:
  -
    type: "status"
    at: "2026-07-22T21:28:08.834Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: implement trust-boundary architecture ratchets from the approved alpha.1 plan."
  -
    type: "verify"
    at: "2026-07-23T00:17:11.288Z"
    author: "CODER"
    state: "ok"
    note: "Local contract passed on aa9f3987d: trust checker accepted exactly 63 reviewed violations (37/4/10/1/4/7); accumulated regression matrix 17/17; independent bounded audit VERIFY_OK; ESLint, TypeScript, guards, routing, hotspot, dependency architecture, Prettier and diff checks passed."
doc_version: 3
doc_updated_at: "2026-07-23T00:17:11.504Z"
doc_updated_by: "CODER"
description: "RF-27a: baseline and prohibit new automatic semantic verdicts, agent-writable observed fields, implicit danger sandboxes, untyped durable boundaries, shell-string orchestration, and duplicate runner task representations."
sections:
  Summary: |-
    Add trust-boundary architecture ratchets

    RF-27a: baseline and prohibit new automatic semantic verdicts, agent-writable observed fields, implicit danger sandboxes, untyped durable boundaries, shell-string orchestration, and duplicate runner task representations.
  Scope: |-
    - In scope: a baseline-plus-ratchet checker, machine-readable known-violation inventory, focused checker tests, and CI integration for the v0.7 trust invariants.
    - Out of scope: failing the build for every legacy violation before its owning RF slice is migrated.
  Plan: |-
    1. Define precise syntax- and schema-aware checks for each approved trust invariant.
    2. Record only current legacy violations with stable identifiers and owners.
    3. Fail on new violations and on baseline growth while allowing baseline reduction.
    4. Add focused positive and negative checker fixtures.
    5. Integrate the ratchet into the existing guard/contract lane.
  Verify Steps: |-
    1. Run the checker against current main. Expected: only reviewed baseline entries are accepted and each entry maps to an RF owner.
    2. Add one synthetic violation per invariant in test fixtures. Expected: every new violation fails with an actionable path and rule id.
    3. Remove a baseline fixture entry. Expected: the checker requires the baseline to shrink rather than silently restoring it.
    4. Run `bun run guards:check`, `bun run test:critical`, and `bun run ci:contract`. Expected: the ratchet is enforced by the normal contract lane.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-07-23T00:17:11.288Z — VERIFY — ok

    By: CODER

    Note: Local contract passed on aa9f3987d: trust checker accepted exactly 63 reviewed violations (37/4/10/1/4/7); accumulated regression matrix 17/17; independent bounded audit VERIFY_OK; ESLint, TypeScript, guards, routing, hotspot, dependency architecture, Prettier and diff checks passed.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-22T21:28:08.834Z, excerpt_hash=sha256:5c7a0d9f6ef4bc6a19bb25db9755babf473fc39c587f60598a8c582e2f3a8cf2

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/base-main-for-XS41ZV/.agentplane/worktrees/202607221846-ZAENM6-add-trust-boundary-architecture-ratchets/.agentplane/tasks/202607221846-ZAENM6/blueprint/resolved-snapshot.json
    - old_digest: 7d20d7a390d13b10443643e53f39c63dcdae67537533a9f1aec40a2695ad1d56
    - current_digest: 7d20d7a390d13b10443643e53f39c63dcdae67537533a9f1aec40a2695ad1d56
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202607221846-ZAENM6

    DecisionContextRef:
    - operator_action: run_exact_argv
    - can_execute_now: true
    - safe_command: agentplane pr update 202607221846-ZAENM6
    - diagnostic_command: agentplane pr check 202607221846-ZAENM6
    - source_of_truth: route=task_next_action diagnostic=pr_check remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: false
    - repeat_stop_condition: if PR check passes but next-action still requests PR artifact update, verify live PR state before rerunning mutation
    - risks: pr_artifact_freshness_loop, git_hook_side_effect

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert the task implementation commit(s) without changing unrelated task state.
    - Restore the previous persisted contract or schema version where applicable.
    - Re-run the task-specific checks and record any data requiring explicit migration repair.
  Findings: |-
    - Observation: The canonical critical-cli route reaches two existing init tests whose harness invokes bun directly; Bun is not installed in this local environment. The same failures were reproduced on clean main and are unrelated to ZAENM6.
      Impact: Local Node-based trust-boundary evidence is complete, but Bun-dependent critical coverage must be confirmed by hosted CI before integration.
      Resolution: Keep verification local-only and require the hosted Bun lanes plus PR verification before merge.
id_source: "generated"
---
## Summary

Add trust-boundary architecture ratchets

RF-27a: baseline and prohibit new automatic semantic verdicts, agent-writable observed fields, implicit danger sandboxes, untyped durable boundaries, shell-string orchestration, and duplicate runner task representations.

## Scope

- In scope: a baseline-plus-ratchet checker, machine-readable known-violation inventory, focused checker tests, and CI integration for the v0.7 trust invariants.
- Out of scope: failing the build for every legacy violation before its owning RF slice is migrated.

## Plan

1. Define precise syntax- and schema-aware checks for each approved trust invariant.
2. Record only current legacy violations with stable identifiers and owners.
3. Fail on new violations and on baseline growth while allowing baseline reduction.
4. Add focused positive and negative checker fixtures.
5. Integrate the ratchet into the existing guard/contract lane.

## Verify Steps

1. Run the checker against current main. Expected: only reviewed baseline entries are accepted and each entry maps to an RF owner.
2. Add one synthetic violation per invariant in test fixtures. Expected: every new violation fails with an actionable path and rule id.
3. Remove a baseline fixture entry. Expected: the checker requires the baseline to shrink rather than silently restoring it.
4. Run `bun run guards:check`, `bun run test:critical`, and `bun run ci:contract`. Expected: the ratchet is enforced by the normal contract lane.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-07-23T00:17:11.288Z — VERIFY — ok

By: CODER

Note: Local contract passed on aa9f3987d: trust checker accepted exactly 63 reviewed violations (37/4/10/1/4/7); accumulated regression matrix 17/17; independent bounded audit VERIFY_OK; ESLint, TypeScript, guards, routing, hotspot, dependency architecture, Prettier and diff checks passed.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-22T21:28:08.834Z, excerpt_hash=sha256:5c7a0d9f6ef4bc6a19bb25db9755babf473fc39c587f60598a8c582e2f3a8cf2

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/base-main-for-XS41ZV/.agentplane/worktrees/202607221846-ZAENM6-add-trust-boundary-architecture-ratchets/.agentplane/tasks/202607221846-ZAENM6/blueprint/resolved-snapshot.json
- old_digest: 7d20d7a390d13b10443643e53f39c63dcdae67537533a9f1aec40a2695ad1d56
- current_digest: 7d20d7a390d13b10443643e53f39c63dcdae67537533a9f1aec40a2695ad1d56
- route_changed: no
- safe_command: agentplane blueprint snapshot 202607221846-ZAENM6

DecisionContextRef:
- operator_action: run_exact_argv
- can_execute_now: true
- safe_command: agentplane pr update 202607221846-ZAENM6
- diagnostic_command: agentplane pr check 202607221846-ZAENM6
- source_of_truth: route=task_next_action diagnostic=pr_check remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: false
- repeat_stop_condition: if PR check passes but next-action still requests PR artifact update, verify live PR state before rerunning mutation
- risks: pr_artifact_freshness_loop, git_hook_side_effect

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert the task implementation commit(s) without changing unrelated task state.
- Restore the previous persisted contract or schema version where applicable.
- Re-run the task-specific checks and record any data requiring explicit migration repair.

## Findings

- Observation: The canonical critical-cli route reaches two existing init tests whose harness invokes bun directly; Bun is not installed in this local environment. The same failures were reproduced on clean main and are unrelated to ZAENM6.
  Impact: Local Node-based trust-boundary evidence is complete, but Bun-dependent critical coverage must be confirmed by hosted CI before integration.
  Resolution: Keep verification local-only and require the hosted Bun lanes plus PR verification before merge.
