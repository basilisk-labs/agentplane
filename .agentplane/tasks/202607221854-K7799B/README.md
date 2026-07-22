---
id: "202607221854-K7799B"
title: "Close all AgentPlane 0.7 architecture guard violations"
status: "TODO"
priority: "high"
owner: "CODER"
revision: 5
origin:
  system: "manual"
depends_on:
  - "202607221846-9XC1H0"
  - "202607221848-VC4VVS"
  - "202607221850-9C9WBP"
  - "202607221850-DRWR0V"
  - "202607221852-71SCSW"
  - "202607221854-87892M"
  - "202607221854-PGPR3J"
  - "202607221854-SDPFN0"
tags:
  - "architecture"
  - "guard"
  - "milestone-rc2"
  - "quality"
  - "refactor"
  - "rf-27"
  - "v0.7"
  - "wave-internals"
task_kind: "code"
mutation_scope: "code"
blueprint_request: "quality.regression"
verify:
  - "bun run arch:check"
  - "bun run ci:contract"
  - "bun run guards:check"
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
doc_updated_at: "2026-07-22T18:54:31.784Z"
doc_updated_by: "PLANNER"
description: "RF-27b: reduce the trust/architecture baseline to zero for automatic verdicts, agent-owned observations, untyped durable boundaries, shell orchestration, duplicate task views, undeclared capabilities, and direct OS/Git/network imports in migrated use cases."
sections:
  Summary: |-
    Close all AgentPlane 0.7 architecture guard violations

    RF-27b: reduce the trust/architecture baseline to zero for automatic verdicts, agent-owned observations, untyped durable boundaries, shell orchestration, duplicate task views, undeclared capabilities, and direct OS/Git/network imports in migrated use cases.
  Scope: |-
    - In scope: eliminate every v0.7 ratchet baseline entry, tighten dependency rules, ensure new use cases use ports, remove compatibility code whose window ends at 0.7, and document any intentionally retained public v1 reader separately from violations.
    - Out of scope: hiding unresolved violations by broad exclusions or resetting the baseline upward.
  Plan: |-
    1. Re-run every architecture/trust rule and assign each remaining violation to its owning migrated slice.
    2. Remove violations or replace them with explicit versioned compatibility adapters that satisfy the rule.
    3. Tighten dependency/import rules for new use cases and command sessions.
    4. Reduce the machine baseline to zero and prohibit recreation.
    5. Run full architecture, contract, lifecycle, schema, and type gates.
  Verify Steps: |-
    1. Run the trust-boundary checker and architecture guards. Expected: zero baseline violations and zero suppressions added for v0.7 paths.
    2. Search production for automatic verdicts, agent-writable observed fields, internal shell orchestration, unsafe durable casts, duplicate TaskData projections, and undeclared direct OS/Git/network imports. Expected: none remain.
    3. Exercise supported compatibility readers. Expected: they are versioned, tested adapters and cannot violate authority/provenance.
    4. Run guards, arch check, contract CI, lifecycle invariants, schemas, and typecheck.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert the guard-closing changes together with any dependent contract removal.
    - Never restore the violation baseline without explicit scope re-approval and a named follow-up owner.
    - Re-run the full architecture and contract lane.
  Findings: ""
id_source: "generated"
---
## Summary

Close all AgentPlane 0.7 architecture guard violations

RF-27b: reduce the trust/architecture baseline to zero for automatic verdicts, agent-owned observations, untyped durable boundaries, shell orchestration, duplicate task views, undeclared capabilities, and direct OS/Git/network imports in migrated use cases.

## Scope

- In scope: eliminate every v0.7 ratchet baseline entry, tighten dependency rules, ensure new use cases use ports, remove compatibility code whose window ends at 0.7, and document any intentionally retained public v1 reader separately from violations.
- Out of scope: hiding unresolved violations by broad exclusions or resetting the baseline upward.

## Plan

1. Re-run every architecture/trust rule and assign each remaining violation to its owning migrated slice.
2. Remove violations or replace them with explicit versioned compatibility adapters that satisfy the rule.
3. Tighten dependency/import rules for new use cases and command sessions.
4. Reduce the machine baseline to zero and prohibit recreation.
5. Run full architecture, contract, lifecycle, schema, and type gates.

## Verify Steps

1. Run the trust-boundary checker and architecture guards. Expected: zero baseline violations and zero suppressions added for v0.7 paths.
2. Search production for automatic verdicts, agent-writable observed fields, internal shell orchestration, unsafe durable casts, duplicate TaskData projections, and undeclared direct OS/Git/network imports. Expected: none remain.
3. Exercise supported compatibility readers. Expected: they are versioned, tested adapters and cannot violate authority/provenance.
4. Run guards, arch check, contract CI, lifecycle invariants, schemas, and typecheck.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert the guard-closing changes together with any dependent contract removal.
- Never restore the violation baseline without explicit scope re-approval and a named follow-up owner.
- Re-run the full architecture and contract lane.

## Findings
