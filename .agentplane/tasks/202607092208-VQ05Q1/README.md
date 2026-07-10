---
id: "202607092208-VQ05Q1"
title: "Split context pipeline hotspots for v0.6.22"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 6
origin:
  system: "manual"
depends_on:
  - "202607092207-MS2B7B"
tags:
  - "code"
  - "context"
  - "patch-0.6.22"
  - "refactor"
task_kind: "code"
mutation_scope: "code"
blueprint_request: "code.branch_pr"
verify:
  - "bun run hotspots:check"
  - "bun run typecheck"
  - "bunx vitest run packages/agentplane/src/commands/context packages/agentplane/src/context"
plan_approval:
  state: "approved"
  updated_at: "2026-07-09T22:09:56.453Z"
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
    body: "Start: split context pipeline hotspots along existing domain boundaries while preserving CLI, artifact, graph, and extraction contracts."
events:
  -
    type: "status"
    at: "2026-07-10T15:55:48.087Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: split context pipeline hotspots along existing domain boundaries while preserving CLI, artifact, graph, and extraction contracts."
doc_version: 3
doc_updated_at: "2026-07-10T16:09:26.128Z"
doc_updated_by: "CODER"
description: "Decompose the oversized context dashboard, wiki reports, extraction writer, and maximum-assimilation validation modules along existing domain boundaries without changing CLI or artifact contracts."
sections:
  Summary: |-
    Split context pipeline hotspots for v0.6.22

    Decompose the oversized context dashboard, wiki reports, extraction writer, and maximum-assimilation validation modules along existing domain boundaries without changing CLI or artifact contracts.
  Scope: |-
    - In scope: Decompose the oversized context dashboard, wiki reports, extraction writer, and maximum-assimilation validation modules along existing domain boundaries without changing CLI or artifact contracts.
    - Out of scope: unrelated refactors not required for "Split context pipeline hotspots for v0.6.22".
  Plan: |-
    1. Re-measure the four context hotspots after the transactional writer task lands.
    2. Extract cohesive parsing, projection, report, and validation helpers without changing schemas or CLI output.
    3. Keep each production module below the configured hotspot warning where practical and never above the error threshold.
    4. Run focused context tests, hotspot checks, and typecheck.
  Verify Steps: |-
    1. Run `bunx vitest run packages/agentplane/src/commands/context packages/agentplane/src/context`; all context behavior and artifact-contract tests pass.
    2. Run `bun run hotspots:check`; touched context modules are removed from or materially reduced in the >400-line warning set, with none above 600 lines.
    3. Run `bun run typecheck`; it passes.
    4. Run `bun run ci:contract`; it passes.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    - Split dashboard HTTP facade, snapshot orchestration, wiki parsing/linking, and graph assembly into focused modules while preserving buildContextDashboardSnapshot and cmdContextDashboard exports.
    - Split wiki link analysis from generated report rendering; retained link-index, orphan-report, state, and Markdown report contracts.
    - Extracted extraction-quality derivation and ontology/topology validation into focused helpers without changing persisted row shapes or validation messages.
    - Hotspot warning count decreased from 18 to 14; all touched runtime modules are below 400 lines (largest: extraction-writer.ts at 366).
    - Verification passed: context Vitest 23 files/104 tests, hotspots:check, typecheck, ci:contract, and full test:fast.
id_source: "generated"
---
## Summary

Split context pipeline hotspots for v0.6.22

Decompose the oversized context dashboard, wiki reports, extraction writer, and maximum-assimilation validation modules along existing domain boundaries without changing CLI or artifact contracts.

## Scope

- In scope: Decompose the oversized context dashboard, wiki reports, extraction writer, and maximum-assimilation validation modules along existing domain boundaries without changing CLI or artifact contracts.
- Out of scope: unrelated refactors not required for "Split context pipeline hotspots for v0.6.22".

## Plan

1. Re-measure the four context hotspots after the transactional writer task lands.
2. Extract cohesive parsing, projection, report, and validation helpers without changing schemas or CLI output.
3. Keep each production module below the configured hotspot warning where practical and never above the error threshold.
4. Run focused context tests, hotspot checks, and typecheck.

## Verify Steps

1. Run `bunx vitest run packages/agentplane/src/commands/context packages/agentplane/src/context`; all context behavior and artifact-contract tests pass.
2. Run `bun run hotspots:check`; touched context modules are removed from or materially reduced in the >400-line warning set, with none above 600 lines.
3. Run `bun run typecheck`; it passes.
4. Run `bun run ci:contract`; it passes.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- Split dashboard HTTP facade, snapshot orchestration, wiki parsing/linking, and graph assembly into focused modules while preserving buildContextDashboardSnapshot and cmdContextDashboard exports.
- Split wiki link analysis from generated report rendering; retained link-index, orphan-report, state, and Markdown report contracts.
- Extracted extraction-quality derivation and ontology/topology validation into focused helpers without changing persisted row shapes or validation messages.
- Hotspot warning count decreased from 18 to 14; all touched runtime modules are below 400 lines (largest: extraction-writer.ts at 366).
- Verification passed: context Vitest 23 files/104 tests, hotspots:check, typecheck, ci:contract, and full test:fast.
