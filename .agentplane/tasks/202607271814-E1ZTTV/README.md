---
id: "202607271814-E1ZTTV"
title: "Stabilize concurrent recovery-lease reads"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 6
origin:
  system: "manual"
depends_on: []
tags:
  - "reliability"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-07-27T18:14:43.269Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
  attempts: 0
commit:
  hash: "2fa8ca98733263e3e3a688afff63e5f3385d4ead"
  message: "🐛 E1ZTTV reliability: stabilize concurrent recovery-lease reads"
comments:
  -
    author: "CODER"
    body: "Start: isolate and stabilize concurrent recovery-lease observation without weakening file-integrity checks."
  -
    author: "CODER"
    body: "Implementation committed: bounded recovery-lease read retries, deterministic collision coverage, and resilient runner test waits passed the full fast CI."
events:
  -
    type: "status"
    at: "2026-07-27T18:15:07.754Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: isolate and stabilize concurrent recovery-lease observation without weakening file-integrity checks."
  -
    type: "status"
    at: "2026-07-27T18:55:11.055Z"
    author: "CODER"
    from: "DOING"
    to: "DOING"
    note: "Implementation committed: bounded recovery-lease read retries, deterministic collision coverage, and resilient runner test waits passed the full fast CI."
doc_version: 3
doc_updated_at: "2026-07-27T18:55:11.055Z"
doc_updated_by: "CODER"
description: "Prevent transient read-stability races from failing concurrent runner effect-resolution and active-claim retry flows; preserve strict file-integrity checks and verify repeatability."
sections:
  Summary: |-
    Stabilize concurrent recovery-lease reads

    Prevent transient read-stability races from failing concurrent runner effect-resolution and active-claim retry flows; preserve strict file-integrity checks and verify repeatability.
  Scope: |-
    - In scope: Prevent transient read-stability races from failing concurrent runner effect-resolution and active-claim retry flows; preserve strict file-integrity checks and verify repeatability.
    - Out of scope: unrelated refactors not required for "Stabilize concurrent recovery-lease reads".
  Plan: "1. Inspect the recovery-lease read and retirement protocol plus both failing concurrent tests. 2. Add the smallest bounded retry or contention classification that never accepts an unstable file and preserves identity/boundary validation. 3. Add deterministic tests for a transient concurrent replacement/read collision. 4. Run focused runner tests repeatedly, static/type/lint gates, then publish a narrow PR and require hosted checks before integrating RF-12b."
  Verify Steps: |-
    PLANNER fallback scaffold for "Stabilize concurrent recovery-lease reads". Replace with task-specific acceptance checks when PLANNER context is available.

    1. Review the requested outcome for "Stabilize concurrent recovery-lease reads". Expected: the visible result matches ## Summary and stays inside approved scope.
    2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
    3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
extensions:
  agentplane.side_effect_authority:
    audit:
      -
        actor: "USER"
        at: "2026-07-27T18:15:21.246Z"
        authorityDigest: "sha256:54f3328549fb80154a5277c336aaed98a5fc8d8407afd1a82e9e7cf564666d60"
        digest: "sha256:e25f64c54ef3b320d9883d9db2ff7972fc02367e7a44839d048c9953e5b222f4"
        operationDigest: "sha256:d799f8b60a25c7603ce63d3cfc965d4e67b591fc5766ad361b65d1b9a2f8dac0"
        operationId: "pr.open"
        outcome: "approved"
        policyRule: "workflow.external_reversible"
        previousDigest: null
        schemaVersion: 1
        sequence: 1
        stateFingerprintDigest: "sha256:145801b6eeda9c522f4c9f62edb640063c6bfa52f801531bff1493c2087a93cd"
    grants:
      -
        actor: "USER"
        digest: "sha256:54f3328549fb80154a5277c336aaed98a5fc8d8407afd1a82e9e7cf564666d60"
        expiresAt: "2026-07-27T18:30:21.246Z"
        id: "authority-b2b36209-470d-44bd-8978-f7ca07ee47d9"
        issuedAt: "2026-07-27T18:15:21.246Z"
        kind: "side_effect_authority"
        operationDigest: "sha256:d799f8b60a25c7603ce63d3cfc965d4e67b591fc5766ad361b65d1b9a2f8dac0"
        operationId: "pr.open"
        policyRule: "workflow.external_reversible"
        schemaVersion: 1
        stateFingerprintDigest: "sha256:145801b6eeda9c522f4c9f62edb640063c6bfa52f801531bff1493c2087a93cd"
        stateScopeDigest: "sha256:5d044488cf62b25892931fe94449d6d9888d1033befb0f771a4c5d4a58756c4f"
    schemaVersion: 1
  workflow_route_baseline:
    start_head_sha: "8c863087669ef21c562e8c230e851bc94a12e8a4"
    version: 1
id_source: "generated"
---
## Summary

Stabilize concurrent recovery-lease reads

Prevent transient read-stability races from failing concurrent runner effect-resolution and active-claim retry flows; preserve strict file-integrity checks and verify repeatability.

## Scope

- In scope: Prevent transient read-stability races from failing concurrent runner effect-resolution and active-claim retry flows; preserve strict file-integrity checks and verify repeatability.
- Out of scope: unrelated refactors not required for "Stabilize concurrent recovery-lease reads".

## Plan

1. Inspect the recovery-lease read and retirement protocol plus both failing concurrent tests. 2. Add the smallest bounded retry or contention classification that never accepts an unstable file and preserves identity/boundary validation. 3. Add deterministic tests for a transient concurrent replacement/read collision. 4. Run focused runner tests repeatedly, static/type/lint gates, then publish a narrow PR and require hosted checks before integrating RF-12b.

## Verify Steps

PLANNER fallback scaffold for "Stabilize concurrent recovery-lease reads". Replace with task-specific acceptance checks when PLANNER context is available.

1. Review the requested outcome for "Stabilize concurrent recovery-lease reads". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
