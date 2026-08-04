---
id: "202608040215-0Z0C92"
title: "Add exact candidate RF-04 pilot mode"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 8
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "provider-qualification"
  - "v0.7.1"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-08-04T02:15:53.533Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-08-04T02:24:01.852Z"
  updated_by: "TESTER"
  note: "Candidate RF-04 pilot verified: focused 7/7 and critical CLI 82/82 passed; qualification contract 21/21, typecheck, lint, format, routing, public help, fail-closed modes, and no-artifact cleanup all passed without provider execution."
  attempts: 0
commit:
  hash: "3ceafe0ab6891606d29c98a8d7530b27e6124036"
  message: "🧩 0Z0C92 code: add exact candidate RF-04 pilot"
comments:
  -
    author: "CODER"
    body: "Start: continue branch_pr task in the dedicated task worktree."
  -
    author: "CODER"
    body: "Implementation committed: exact candidate --pilot now runs only direct/run-01, validates canonical evidence, rejects mutating mode combinations, and publishes no artifacts."
events:
  -
    type: "status"
    at: "2026-08-04T02:16:21.609Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: continue branch_pr task in the dedicated task worktree."
  -
    type: "status"
    at: "2026-08-04T02:23:33.636Z"
    author: "CODER"
    from: "DOING"
    to: "DOING"
    note: "Implementation committed: exact candidate --pilot now runs only direct/run-01, validates canonical evidence, rejects mutating mode combinations, and publishes no artifacts."
  -
    type: "verify"
    at: "2026-08-04T02:24:01.852Z"
    author: "TESTER"
    state: "ok"
    note: "Candidate RF-04 pilot verified: focused 7/7 and critical CLI 82/82 passed; qualification contract 21/21, typecheck, lint, format, routing, public help, fail-closed modes, and no-artifact cleanup all passed without provider execution."
doc_version: 3
doc_updated_at: "2026-08-04T02:24:02.682Z"
doc_updated_by: "CODER"
description: "Add a non-persisting one-run pilot to the v0.7.1 candidate provider capture so the pinned Codex runtime and exact candidate harness can be validated before the no-retry 50-run generation; cover precondition failures and prove no artifacts are published."
sections:
  Summary: |-
    Add exact candidate RF-04 pilot mode

    Add a non-persisting one-run pilot to the v0.7.1 candidate provider capture so the pinned Codex runtime and exact candidate harness can be validated before the no-retry 50-run generation; cover precondition failures and prove no artifacts are published.
  Scope: |-
    - In scope: Add a non-persisting one-run pilot to the v0.7.1 candidate provider capture so the pinned Codex runtime and exact candidate harness can be validated before the no-retry 50-run generation; cover precondition failures and prove no artifacts are published.
    - Out of scope: unrelated refactors not required for "Add exact candidate RF-04 pilot mode".
  Plan: |-
    1. Extend the v0.7.1 candidate capture CLI with an explicit --pilot mode that selects only direct/run-01, validates the exact candidate subject and pinned Codex version, and never publishes candidate cache artifacts.
    2. Reuse the existing candidate driver, environment, envelope, and evidence validators so the pilot exercises the same runtime boundary as the 50-run gate.
    3. Add focused tests for one-run selection, success telemetry, cleanup after failure, refusal to combine pilot with check/runtime-bridge/replace, and unchanged full-capture behavior.
    4. Run focused RF-04 hardening tests, qualification contract, formatting, lint, typecheck, and critical CLI checks; preserve the failed historical-pilot diagnosis in task Findings.
  Verify Steps: |-
    1. Run the focused RF-04 candidate tests. Expected: --pilot selects only direct/run-01, validates one canonical envelope/evidence pair, reports exact subject/runtime/token telemetry, and leaves no candidate publication or failure artifact.
    2. Exercise invalid mode combinations. Expected: --pilot fails closed with --check, --runtime-bridge, or --replace, while the existing 10-scenario x 5-run capture contract remains unchanged.
    3. Run the v0.7.1 qualification contract, scoped lint/format/typecheck, critical CLI candidate chunk, and policy routing check. Expected: all pass and the provider driver is not invoked by tests.
    4. Inspect git diff and task Findings. Expected: only candidate pilot harness, focused tests, and task evidence changed; the failed historical-pilot mismatch is preserved and no provider retry is claimed.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-08-04T02:24:01.852Z — VERIFY — ok

    By: TESTER

    Note: Candidate RF-04 pilot verified: focused 7/7 and critical CLI 82/82 passed; qualification contract 21/21, typecheck, lint, format, routing, public help, fail-closed modes, and no-artifact cleanup all passed without provider execution.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-04T02:23:33.636Z, excerpt_hash=sha256:742eca801261ed5e10d8330a049c88abbf36b6a54294dc0977298017e40240ca

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/v07-packet-fix-control-20260730/.agentplane/worktrees/202608040215-0Z0C92-add-exact-candidate-rf-04-pilot-mode/.agentplane/tasks/202608040215-0Z0C92/blueprint/resolved-snapshot.json
    - old_digest: 04b5f37577050a6ede3a073b45ff64e15feab20963b8852439de720c1dd590ed
    - current_digest: 04b5f37577050a6ede3a073b45ff64e15feab20963b8852439de720c1dd590ed
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202608040215-0Z0C92

    DecisionContextRef:
    - operator_action: stop
    - can_execute_now: false
    - safe_command: none
    - diagnostic_command: agentplane task verify-show 202608040215-0Z0C92
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
    - Observation: The documented historical replay pilot resolves its Codex version from the frozen 0.145.0 constant and has no --codex-version flag; the v0.7.1 candidate gate pins 0.146.0 but its capture CLI lacks --pilot.
      Impact: The pre-gate pilot fails CODEX_VERSION_MISMATCH before a provider episode and cannot validate the exact candidate harness, so the no-retry 50-run generation must remain stopped.
      Resolution: Add an explicit non-persisting candidate --pilot path that reuses the exact candidate driver, version contract, evidence validation, and cleanup boundary.
      Promotion: incident-candidate
      Fixability: repo-fixable

    - Observation: The exact candidate pilot now selects only direct/run-01 and validates the same subject, Codex version, harness digest, canonical envelope, and evidence bundle as the full generation.
      Impact: A provider preflight can validate the actual v0.7.1 candidate boundary without touching the frozen 0.145.0 historical replay or publishing partial evidence.
      Resolution: Accept commit 3ceafe0ab; retain the previous CODEX_VERSION_MISMATCH as failed historical-pilot evidence and use the new candidate --pilot only on a newly frozen candidate SHA.
extensions:
  workflow_route_baseline:
    start_head_sha: "3055393dc99d5f1a781cb642502ceaa05d86f0a9"
    version: 1
id_source: "generated"
---
## Summary

Add exact candidate RF-04 pilot mode

Add a non-persisting one-run pilot to the v0.7.1 candidate provider capture so the pinned Codex runtime and exact candidate harness can be validated before the no-retry 50-run generation; cover precondition failures and prove no artifacts are published.

## Scope

- In scope: Add a non-persisting one-run pilot to the v0.7.1 candidate provider capture so the pinned Codex runtime and exact candidate harness can be validated before the no-retry 50-run generation; cover precondition failures and prove no artifacts are published.
- Out of scope: unrelated refactors not required for "Add exact candidate RF-04 pilot mode".

## Plan

1. Extend the v0.7.1 candidate capture CLI with an explicit --pilot mode that selects only direct/run-01, validates the exact candidate subject and pinned Codex version, and never publishes candidate cache artifacts.
2. Reuse the existing candidate driver, environment, envelope, and evidence validators so the pilot exercises the same runtime boundary as the 50-run gate.
3. Add focused tests for one-run selection, success telemetry, cleanup after failure, refusal to combine pilot with check/runtime-bridge/replace, and unchanged full-capture behavior.
4. Run focused RF-04 hardening tests, qualification contract, formatting, lint, typecheck, and critical CLI checks; preserve the failed historical-pilot diagnosis in task Findings.

## Verify Steps

1. Run the focused RF-04 candidate tests. Expected: --pilot selects only direct/run-01, validates one canonical envelope/evidence pair, reports exact subject/runtime/token telemetry, and leaves no candidate publication or failure artifact.
2. Exercise invalid mode combinations. Expected: --pilot fails closed with --check, --runtime-bridge, or --replace, while the existing 10-scenario x 5-run capture contract remains unchanged.
3. Run the v0.7.1 qualification contract, scoped lint/format/typecheck, critical CLI candidate chunk, and policy routing check. Expected: all pass and the provider driver is not invoked by tests.
4. Inspect git diff and task Findings. Expected: only candidate pilot harness, focused tests, and task evidence changed; the failed historical-pilot mismatch is preserved and no provider retry is claimed.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-08-04T02:24:01.852Z — VERIFY — ok

By: TESTER

Note: Candidate RF-04 pilot verified: focused 7/7 and critical CLI 82/82 passed; qualification contract 21/21, typecheck, lint, format, routing, public help, fail-closed modes, and no-artifact cleanup all passed without provider execution.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-04T02:23:33.636Z, excerpt_hash=sha256:742eca801261ed5e10d8330a049c88abbf36b6a54294dc0977298017e40240ca

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/v07-packet-fix-control-20260730/.agentplane/worktrees/202608040215-0Z0C92-add-exact-candidate-rf-04-pilot-mode/.agentplane/tasks/202608040215-0Z0C92/blueprint/resolved-snapshot.json
- old_digest: 04b5f37577050a6ede3a073b45ff64e15feab20963b8852439de720c1dd590ed
- current_digest: 04b5f37577050a6ede3a073b45ff64e15feab20963b8852439de720c1dd590ed
- route_changed: no
- safe_command: agentplane blueprint snapshot 202608040215-0Z0C92

DecisionContextRef:
- operator_action: stop
- can_execute_now: false
- safe_command: none
- diagnostic_command: agentplane task verify-show 202608040215-0Z0C92
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

- Observation: The documented historical replay pilot resolves its Codex version from the frozen 0.145.0 constant and has no --codex-version flag; the v0.7.1 candidate gate pins 0.146.0 but its capture CLI lacks --pilot.
  Impact: The pre-gate pilot fails CODEX_VERSION_MISMATCH before a provider episode and cannot validate the exact candidate harness, so the no-retry 50-run generation must remain stopped.
  Resolution: Add an explicit non-persisting candidate --pilot path that reuses the exact candidate driver, version contract, evidence validation, and cleanup boundary.
  Promotion: incident-candidate
  Fixability: repo-fixable

- Observation: The exact candidate pilot now selects only direct/run-01 and validates the same subject, Codex version, harness digest, canonical envelope, and evidence bundle as the full generation.
  Impact: A provider preflight can validate the actual v0.7.1 candidate boundary without touching the frozen 0.145.0 historical replay or publishing partial evidence.
  Resolution: Accept commit 3ceafe0ab; retain the previous CODEX_VERSION_MISMATCH as failed historical-pilot evidence and use the new candidate --pilot only on a newly frozen candidate SHA.
