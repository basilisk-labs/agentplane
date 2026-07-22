---
id: "202607221854-PGPR3J"
title: "Complete typed use-case and CLI rendering boundaries"
status: "TODO"
priority: "high"
owner: "CODER"
revision: 5
origin:
  system: "manual"
depends_on:
  - "202607221850-8HBF4J"
  - "202607221850-R7WS01"
  - "202607221852-71SCSW"
  - "202607221854-SDPFN0"
tags:
  - "cli"
  - "milestone-rc2"
  - "refactor"
  - "rendering"
  - "rf-25"
  - "use-case"
  - "v0.7"
  - "wave-internals"
task_kind: "code"
mutation_scope: "code"
blueprint_request: "code.branch_pr"
verify:
  - "bun run ci:contract"
  - "bun run guards:check"
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
doc_updated_at: "2026-07-22T18:54:23.295Z"
doc_updated_by: "PLANNER"
description: "RF-25e: finish migrating remaining operations to typed in-process results and centralized human/plain/JSON renderers so supervisors never execute AgentPlane subprocesses or parse rendered output."
sections:
  Summary: |-
    Complete typed use-case and CLI rendering boundaries

    RF-25e: finish migrating remaining operations to typed in-process results and centralized human/plain/JSON renderers so supervisors never execute AgentPlane subprocesses or parse rendered output.
  Scope: |-
    - In scope: remaining task/lifecycle/context/evaluator/runner/Hermes/release use cases, result/error unions, output/exit renderers, stdio isolation, compatibility snapshots, and removal of internal subprocess/stdout parsing.
    - Out of scope: eliminating CLI rendering for human users.
  Plan: |-
    1. Inventory remaining business logic coupled to stdout/stderr/process exit.
    2. Extract typed results/errors and keep rendering in the CLI adapter.
    3. Replace internal subprocess or rendered-output parsing with in-process ports.
    4. Centralize casing, error, guidance, and exit mapping.
    5. Ratchet forbidden stdout orchestration and run compatibility snapshots.
  Verify Steps: |-
    1. Trace all supervisor operations. Expected: no AgentPlane subprocess invocation, stdout capture, or shell-string parse remains.
    2. Invoke each migrated use case directly and render human/plain/JSON outputs. Expected: typed results are reusable and snapshots match approved contracts.
    3. Exercise structured errors and remediation. Expected: one renderer maps them consistently to output and exit code.
    4. Run critical tests, guards, contract CI, and typecheck.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert one result/renderer vertical slice while preserving the shared typed contracts.
    - Restore only explicit compatibility adapters; do not reintroduce untracked subprocess parsing.
    - Re-run snapshots and supervisor parity tests.
  Findings: ""
id_source: "generated"
---
## Summary

Complete typed use-case and CLI rendering boundaries

RF-25e: finish migrating remaining operations to typed in-process results and centralized human/plain/JSON renderers so supervisors never execute AgentPlane subprocesses or parse rendered output.

## Scope

- In scope: remaining task/lifecycle/context/evaluator/runner/Hermes/release use cases, result/error unions, output/exit renderers, stdio isolation, compatibility snapshots, and removal of internal subprocess/stdout parsing.
- Out of scope: eliminating CLI rendering for human users.

## Plan

1. Inventory remaining business logic coupled to stdout/stderr/process exit.
2. Extract typed results/errors and keep rendering in the CLI adapter.
3. Replace internal subprocess or rendered-output parsing with in-process ports.
4. Centralize casing, error, guidance, and exit mapping.
5. Ratchet forbidden stdout orchestration and run compatibility snapshots.

## Verify Steps

1. Trace all supervisor operations. Expected: no AgentPlane subprocess invocation, stdout capture, or shell-string parse remains.
2. Invoke each migrated use case directly and render human/plain/JSON outputs. Expected: typed results are reusable and snapshots match approved contracts.
3. Exercise structured errors and remediation. Expected: one renderer maps them consistently to output and exit code.
4. Run critical tests, guards, contract CI, and typecheck.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert one result/renderer vertical slice while preserving the shared typed contracts.
- Restore only explicit compatibility adapters; do not reintroduce untracked subprocess parsing.
- Re-run snapshots and supervisor parity tests.

## Findings
