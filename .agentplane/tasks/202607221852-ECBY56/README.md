---
id: "202607221852-ECBY56"
title: "Expose phase-scoped run tool APIs"
status: "TODO"
priority: "high"
owner: "CODER"
revision: 5
origin:
  system: "manual"
depends_on:
  - "202607221908-0JP0ZZ"
tags:
  - "authority"
  - "milestone-rc1"
  - "refactor"
  - "rf-23"
  - "runner"
  - "tools"
  - "v0.7"
  - "wave-authority"
task_kind: "code"
mutation_scope: "code"
blueprint_request: "code.branch_pr"
verify:
  - "bun run guards:check"
  - "bun run schemas:check"
  - "bun run test:critical"
  - "bun run typecheck"
plan_approval:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
verification:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
  attempts: 0
commit: null
comments: []
events: []
doc_version: 3
doc_updated_at: "2026-07-22T18:52:28.734Z"
doc_updated_by: "PLANNER"
description: "RF-23: provide run-bound report_result, report_blocker, request_knowledge, and read-only knowledge tools while keeping lifecycle operations exclusively under supervisor authority."
sections:
  Summary: |-
    Expose phase-scoped run tool APIs

    RF-23: provide run-bound report_result, report_blocker, request_knowledge, and read-only knowledge tools while keeping lifecycle operations exclusively under supervisor authority.
  Scope: |-
    - In scope: phase/run token, tool schema and capability map, result/blocker/knowledge APIs, role-specific repository tool allowlists, typed denial, adapter capability negotiation, audit, expiry/revocation, and global-help non-reliance.
    - Out of scope: treating tool visibility as the only security boundary.
  Plan: |-
    1. Define run-bound identity, phase, role, fingerprint, capability, expiry, and authority claims.
    2. Expose only the approved semantic/reporting/knowledge operations for each phase.
    3. Validate every call server-side and route lifecycle operations to the supervisor only.
    4. Report adapter enforcement gaps truthfully.
    5. Add token tamper, expiry, cross-run, wrong-role, denied-lifecycle, and capability-downgrade tests.
  Verify Steps: |-
    1. Invoke each allowed tool with a valid phase token. Expected: typed response, receipt/audit linkage, and no lifecycle authority leak.
    2. Call lifecycle or wrong-role tools, or tamper/expire/reuse a token. Expected: typed denial before effects.
    3. Use an adapter lacking a requested tool/enforcement feature. Expected: capability map and work order state the limitation.
    4. Hide global CLI help from the episode. Expected: the supported run API remains complete and secure.
    5. Run schema/tool/guard/type tests.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert the bounded retrieval or authority slice and restore the previous projection version or compatibility adapter.
    - Preserve durable context data and use the documented full-rebuild/repair path rather than deleting it.
    - Re-run equivalence, recall, lifecycle, and type checks.
  Findings: ""
id_source: "generated"
---
## Summary

Expose phase-scoped run tool APIs

RF-23: provide run-bound report_result, report_blocker, request_knowledge, and read-only knowledge tools while keeping lifecycle operations exclusively under supervisor authority.

## Scope

- In scope: phase/run token, tool schema and capability map, result/blocker/knowledge APIs, role-specific repository tool allowlists, typed denial, adapter capability negotiation, audit, expiry/revocation, and global-help non-reliance.
- Out of scope: treating tool visibility as the only security boundary.

## Plan

1. Define run-bound identity, phase, role, fingerprint, capability, expiry, and authority claims.
2. Expose only the approved semantic/reporting/knowledge operations for each phase.
3. Validate every call server-side and route lifecycle operations to the supervisor only.
4. Report adapter enforcement gaps truthfully.
5. Add token tamper, expiry, cross-run, wrong-role, denied-lifecycle, and capability-downgrade tests.

## Verify Steps

1. Invoke each allowed tool with a valid phase token. Expected: typed response, receipt/audit linkage, and no lifecycle authority leak.
2. Call lifecycle or wrong-role tools, or tamper/expire/reuse a token. Expected: typed denial before effects.
3. Use an adapter lacking a requested tool/enforcement feature. Expected: capability map and work order state the limitation.
4. Hide global CLI help from the episode. Expected: the supported run API remains complete and secure.
5. Run schema/tool/guard/type tests.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert the bounded retrieval or authority slice and restore the previous projection version or compatibility adapter.
- Preserve durable context data and use the documented full-rebuild/repair path rather than deleting it.
- Re-run equivalence, recall, lifecycle, and type checks.

## Findings
