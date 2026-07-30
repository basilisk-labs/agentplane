---
id: "202607300112-48RH1X"
title: "Authorize deterministic RF-04 qualification rebuild evidence"
result_summary: "pre-merge closure"
status: "DONE"
priority: "high"
owner: "CODER"
revision: 9
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "qualification"
  - "rf04"
  - "safety"
  - "v0.7"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-07-30T01:13:01.324Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-07-30T01:28:59.008Z"
  updated_by: "TESTER"
  note: "Qualification rebuild evidence is restricted to the deterministic task-local path and preserves the RF-04 non-publication gate."
  attempts: 0
quality_review:
  state: "pass"
  provenance: "evaluator_supplied"
  updated_at: "2026-07-30T01:29:27.580Z"
  updated_by: "EVALUATOR"
  note: "EVALUATOR returned pass with 1 typed finding(s)."
  evaluated_sha: "f94ad71e8b08d3d18fa96c6736749b389159a893"
  blueprint_digest: "cd229775433a4bf34e184eb432e61a17b186818d35181c97c338d8225c87bd82"
  evidence_refs:
    - ".agentplane/tasks/202607300112-48RH1X/quality/20260730-012927431-recovery-context/evaluator-work-order.json"
    - ".agentplane/tasks/202607300112-48RH1X/quality/20260730-012927431-recovery-context/quality-report.json"
    - ".agentplane/tasks/202607300112-48RH1X/quality/20260730-012927431-recovery-context/evaluator-prompt.md"
    - ".agentplane/tasks/202607300112-48RH1X/quality/20260730-012927431-recovery-context/evaluator-opinion.md"
    - ".agentplane/tasks/202607300112-48RH1X/quality/20260730-012927431-recovery-context/evaluator-result.json"
    - ".agentplane/tasks/202607300112-48RH1X/README.md"
    - ".agentplane/tasks/202607300112-48RH1X/quality/20260730-012927431-recovery-context/evaluator-diff.patch"
    - ".agentplane/tasks/202607300112-48RH1X/quality/20260730-012927431-recovery-context/evaluator-observed-checks.json"
    - ".agentplane/tasks/202607300112-48RH1X/verification/20260730012859008-8773f55dfa661da7.json"
    - ".agentplane/tasks/202607300112-48RH1X/quality/20260730-012927431-recovery-context/evaluator-blueprint.json"
    - ".agentplane/policy/dod.code.md"
    - ".agentplane/policy/dod.core.md"
    - ".agentplane/policy/security.must.md"
    - ".agentplane/policy/workflow.branch_pr.md"
  findings:
    - "Frozen historical replay is projected from immutable envelopes, evidence, and baseline harness; current driver and dependency drift remains excluded from qualification-only projection."
commit:
  hash: "d8b93f77c2cbf3fcb08564a3e13452c5d7773565"
  message: "🔗 48RH1X task: record qualification rebuild PR"
comments:
  -
    author: "CODER"
    body: "Start: implement the constrained deterministic RF-04 qualification rebuild target in the dedicated task worktree."
  -
    author: "CODER"
    body: "Verified: pre-merge closure packet is ready for the task PR."
events:
  -
    type: "status"
    at: "2026-07-30T01:13:16.030Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: implement the constrained deterministic RF-04 qualification rebuild target in the dedicated task worktree."
  -
    type: "verify"
    at: "2026-07-30T01:28:59.008Z"
    author: "TESTER"
    state: "ok"
    note: "Qualification rebuild evidence is restricted to the deterministic task-local path and preserves the RF-04 non-publication gate."
  -
    type: "status"
    at: "2026-07-30T01:30:38.549Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: pre-merge closure packet is ready for the task PR."
doc_version: 3
doc_updated_at: "2026-07-30T01:30:38.550Z"
doc_updated_by: "CODER"
description: "Repair the RF-04 replay capture safety contract so a qualification packet can rebuild frozen envelopes into its exact task-local evidence file without a provider driver, retry, replacement capture, or mutable baseline write. Keep all non-qualification capture targets restricted."
sections:
  Summary: |-
    Authorize deterministic RF-04 qualification rebuild evidence

    Repair the RF-04 replay capture safety contract so a qualification packet can rebuild frozen envelopes into its exact task-local evidence file without a provider driver, retry, replacement capture, or mutable baseline write. Keep all non-qualification capture targets restricted.
  Scope: |-
    - In scope: Repair the RF-04 replay capture safety contract so a qualification packet can rebuild frozen envelopes into its exact task-local evidence file without a provider driver, retry, replacement capture, or mutable baseline write. Keep all non-qualification capture targets restricted.
    - Out of scope: unrelated refactors not required for "Authorize deterministic RF-04 qualification rebuild evidence".
  Plan: |-
    1. Define one explicit qualification-rebuild target derived from a validated task ID and fixed evidence filename; retain canonical-only targets for every other RF-04 mode.
    2. Reject conflicting --output, provider --driver, --replace, and --pilot combinations for this deterministic rebuild path.
    3. Route qualification-packet RF-04 rebuilding through the new constrained contract and retain exact frozen-measurement comparison.
    4. Add focused tests for allowed task-local rebuild, traversal/foreign path rejection, and no-driver/no-replacement invariants.
    5. Run focused tests, RF-04 safety tests, qualification packet tests, ci:contract, and a real local packet-build probe with no provider invocation.
  Verify Steps: |-
    1. Focused RF-04 safety and capture-script tests prove that only the exact .agentplane/tasks/<task-id>/evidence/rf04-current-rebuild.v1.json target is accepted for qualification rebuilds.
    2. Focused qualification-packet tests prove the packet emits that evidence path and rejects divergent frozen measurements.
    3. Tests prove qualification rebuild rejects --driver, --replace, --pilot, conflicting --output, malformed task IDs, and path traversal.
    4. `bun run ci:contract` passes.
    5. A real local `ap task verify ok` packet-build probe reaches the RF-04 candidate gate without provider driver/retry/replacement execution; beta.1 remains blocked if candidate verdict is fail.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-07-30T01:28:59.008Z — VERIFY — ok

    By: TESTER

    Note: Qualification rebuild evidence is restricted to the deterministic task-local path and preserves the RF-04 non-publication gate.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-30T01:27:45.804Z, excerpt_hash=sha256:5f3bdd034f32f4706503baa8737cbe68323b0a26c124ff555846c4d54eef18e2

    Details:

    Command: bun run --cwd packages/agentplane test src/cli/run-cli.critical.agent-efficiency-replay-hardening.test.ts src/commands/evaluator/evaluator-qualification-packet.test.ts; bun run ci:contract; bun -e buildQualificationRf04Comparison probe
    Result: pass
    Evidence: 6 focused tests passed; ci:contract passed; deterministic rebuild matched the 50-run frozen baseline and the packet builder returned candidate verdict fail, decision do_not_publish, with two latency failure IDs
    Scope: qualification-only replay projection, task-local output safety, no-driver/no-replace controls, and RF-04 candidate gate

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/v07-packet-fix-control-20260730/.agentplane/worktrees/202607300112-48RH1X-authorize-deterministic-rf-04-qualification-rebu/.agentplane/tasks/202607300112-48RH1X/blueprint/resolved-snapshot.json
    - old_digest: cd229775433a4bf34e184eb432e61a17b186818d35181c97c338d8225c87bd82
    - current_digest: cd229775433a4bf34e184eb432e61a17b186818d35181c97c338d8225c87bd82
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202607300112-48RH1X

    DecisionContextRef:
    - operator_action: provider_action
    - can_execute_now: false
    - safe_command: none
    - diagnostic_command: none
    - source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: false
    - repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
    - risks: none

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    - Observation: The qualification rebuild must project immutable historical envelope and evidence bytes, not compare them with post-capture local driver or dependency bytes.
      Impact: Current workspace evolution otherwise makes a valid frozen replay artifact impossible to rebuild and blocks the beta.1 packet before its candidate gate.
      Resolution: Qualification mode accepts only a fixed task-local output, preserves no-driver/no-replace controls, and reconstructs using the frozen baseline harness after envelope consistency checks.
extensions:
  implementation_commit:
    hash: "f94ad71e8b08d3d18fa96c6736749b389159a893"
    message: "🛡️ 48RH1X task: constrain RF-04 qualification rebuild evidence"
  workflow_route_baseline:
    start_head_sha: "dd7d77beb33517ce7e208935925fa58ce66d4029"
    version: 1
id_source: "generated"
---
## Summary

Authorize deterministic RF-04 qualification rebuild evidence

Repair the RF-04 replay capture safety contract so a qualification packet can rebuild frozen envelopes into its exact task-local evidence file without a provider driver, retry, replacement capture, or mutable baseline write. Keep all non-qualification capture targets restricted.

## Scope

- In scope: Repair the RF-04 replay capture safety contract so a qualification packet can rebuild frozen envelopes into its exact task-local evidence file without a provider driver, retry, replacement capture, or mutable baseline write. Keep all non-qualification capture targets restricted.
- Out of scope: unrelated refactors not required for "Authorize deterministic RF-04 qualification rebuild evidence".

## Plan

1. Define one explicit qualification-rebuild target derived from a validated task ID and fixed evidence filename; retain canonical-only targets for every other RF-04 mode.
2. Reject conflicting --output, provider --driver, --replace, and --pilot combinations for this deterministic rebuild path.
3. Route qualification-packet RF-04 rebuilding through the new constrained contract and retain exact frozen-measurement comparison.
4. Add focused tests for allowed task-local rebuild, traversal/foreign path rejection, and no-driver/no-replacement invariants.
5. Run focused tests, RF-04 safety tests, qualification packet tests, ci:contract, and a real local packet-build probe with no provider invocation.

## Verify Steps

1. Focused RF-04 safety and capture-script tests prove that only the exact .agentplane/tasks/<task-id>/evidence/rf04-current-rebuild.v1.json target is accepted for qualification rebuilds.
2. Focused qualification-packet tests prove the packet emits that evidence path and rejects divergent frozen measurements.
3. Tests prove qualification rebuild rejects --driver, --replace, --pilot, conflicting --output, malformed task IDs, and path traversal.
4. `bun run ci:contract` passes.
5. A real local `ap task verify ok` packet-build probe reaches the RF-04 candidate gate without provider driver/retry/replacement execution; beta.1 remains blocked if candidate verdict is fail.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-07-30T01:28:59.008Z — VERIFY — ok

By: TESTER

Note: Qualification rebuild evidence is restricted to the deterministic task-local path and preserves the RF-04 non-publication gate.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-30T01:27:45.804Z, excerpt_hash=sha256:5f3bdd034f32f4706503baa8737cbe68323b0a26c124ff555846c4d54eef18e2

Details:

Command: bun run --cwd packages/agentplane test src/cli/run-cli.critical.agent-efficiency-replay-hardening.test.ts src/commands/evaluator/evaluator-qualification-packet.test.ts; bun run ci:contract; bun -e buildQualificationRf04Comparison probe
Result: pass
Evidence: 6 focused tests passed; ci:contract passed; deterministic rebuild matched the 50-run frozen baseline and the packet builder returned candidate verdict fail, decision do_not_publish, with two latency failure IDs
Scope: qualification-only replay projection, task-local output safety, no-driver/no-replace controls, and RF-04 candidate gate

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/v07-packet-fix-control-20260730/.agentplane/worktrees/202607300112-48RH1X-authorize-deterministic-rf-04-qualification-rebu/.agentplane/tasks/202607300112-48RH1X/blueprint/resolved-snapshot.json
- old_digest: cd229775433a4bf34e184eb432e61a17b186818d35181c97c338d8225c87bd82
- current_digest: cd229775433a4bf34e184eb432e61a17b186818d35181c97c338d8225c87bd82
- route_changed: no
- safe_command: agentplane blueprint snapshot 202607300112-48RH1X

DecisionContextRef:
- operator_action: provider_action
- can_execute_now: false
- safe_command: none
- diagnostic_command: none
- source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: false
- repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
- risks: none

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- Observation: The qualification rebuild must project immutable historical envelope and evidence bytes, not compare them with post-capture local driver or dependency bytes.
  Impact: Current workspace evolution otherwise makes a valid frozen replay artifact impossible to rebuild and blocks the beta.1 packet before its candidate gate.
  Resolution: Qualification mode accepts only a fixed task-local output, preserves no-driver/no-replace controls, and reconstructs using the frozen baseline harness after envelope consistency checks.
