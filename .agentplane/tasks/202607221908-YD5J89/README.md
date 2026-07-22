---
id: "202607221908-YD5J89"
title: "Migrate context and evaluator command boundaries"
status: "TODO"
priority: "high"
owner: "CODER"
revision: 5
origin:
  system: "manual"
depends_on:
  - "202607221849-8YYZ9X"
  - "202607221850-8HBF4J"
  - "202607221854-RW8CJF"
tags:
  - "milestone-rc2"
  - "refactor"
  - "rf-24"
  - "rf-25"
  - "v0.7"
  - "vertical-slice"
  - "wave-internals"
task_kind: "code"
mutation_scope: "code"
blueprint_request: "quality.regression"
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
doc_updated_at: "2026-07-22T19:08:18.132Z"
doc_updated_by: "PLANNER"
description: "RF-24/RF-25 vertical slice: give context/evaluator operations granular knowledge/backend/Git/policy capabilities and typed in-process results/renderers."
sections:
  Summary: |-
    Migrate context and evaluator command boundaries

    RF-24/RF-25 vertical slice: give context/evaluator operations granular knowledge/backend/Git/policy capabilities and typed in-process results/renderers.
  Scope: |-
    - In scope: context search/show/ingest/reindex/wiki/graph/doctor and evaluator prepare/apply/run compatibility commands, typed use cases, granular capabilities, output renderers, and elimination of subprocess/stdout orchestration in this family.
    - Out of scope: runner/Hermes, general task lifecycle, or provider/release commands.
  Plan: |-
    1. Declare exact context/evaluator capability sets and ports.
    2. Reuse typed supervisor, journal, retrieval, and evaluator use cases.
    3. Separate CLI parsing/rendering from result application.
    4. Remove direct OS/Git/network access and internal command subprocesses.
    5. Run context/evaluator schema, fixture, rendering, and capability tests.
  Verify Steps: |-
    1. Invoke migrated context/evaluator use cases in-process. Expected: typed results and no stdout capture/subprocess.
    2. Run human/JSON snapshots and schema fixtures. Expected: approved compatibility plus explicit v0.7 versions.
    3. Attempt mutation from read-only evaluator or undeclared context capability. Expected: typed denial.
    4. Run context/evaluator tests, schemas, guards, and typecheck.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert this family through explicit typed compatibility adapters without deleting context data or evaluation evidence.
    - Preserve journals and schema versions.
    - Re-run context integrity and evaluator staleness tests.
  Findings: ""
id_source: "generated"
---
## Summary

Migrate context and evaluator command boundaries

RF-24/RF-25 vertical slice: give context/evaluator operations granular knowledge/backend/Git/policy capabilities and typed in-process results/renderers.

## Scope

- In scope: context search/show/ingest/reindex/wiki/graph/doctor and evaluator prepare/apply/run compatibility commands, typed use cases, granular capabilities, output renderers, and elimination of subprocess/stdout orchestration in this family.
- Out of scope: runner/Hermes, general task lifecycle, or provider/release commands.

## Plan

1. Declare exact context/evaluator capability sets and ports.
2. Reuse typed supervisor, journal, retrieval, and evaluator use cases.
3. Separate CLI parsing/rendering from result application.
4. Remove direct OS/Git/network access and internal command subprocesses.
5. Run context/evaluator schema, fixture, rendering, and capability tests.

## Verify Steps

1. Invoke migrated context/evaluator use cases in-process. Expected: typed results and no stdout capture/subprocess.
2. Run human/JSON snapshots and schema fixtures. Expected: approved compatibility plus explicit v0.7 versions.
3. Attempt mutation from read-only evaluator or undeclared context capability. Expected: typed denial.
4. Run context/evaluator tests, schemas, guards, and typecheck.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert this family through explicit typed compatibility adapters without deleting context data or evaluation evidence.
- Preserve journals and schema versions.
- Re-run context integrity and evaluator staleness tests.

## Findings
