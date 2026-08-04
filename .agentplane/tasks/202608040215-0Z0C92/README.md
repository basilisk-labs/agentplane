---
id: "202608040215-0Z0C92"
title: "Add exact candidate RF-04 pilot mode"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 6
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
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
  attempts: 0
commit: null
comments:
  -
    author: "CODER"
    body: "Start: continue branch_pr task in the dedicated task worktree."
events:
  -
    type: "status"
    at: "2026-08-04T02:16:21.609Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: continue branch_pr task in the dedicated task worktree."
doc_version: 3
doc_updated_at: "2026-08-04T02:18:07.979Z"
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
