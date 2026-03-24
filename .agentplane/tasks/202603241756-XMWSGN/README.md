---
id: "202603241756-XMWSGN"
title: "Expose custom runner enforcement mode in dry-run and docs"
status: "DOING"
priority: "med"
owner: "CODER"
revision: 6
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "runner"
  - "custom"
  - "cli"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-24T17:56:31.289Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
commit: null
comments:
  -
    author: "CODER"
    body: "Start: inspect the current dry-run and documentation surface for custom runner wrapper enforcement, then expose the effective enforcement mode and supported sandbox semantics in the user-facing output without widening the runner contract."
events:
  -
    type: "status"
    at: "2026-03-24T17:56:34.078Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: inspect the current dry-run and documentation surface for custom runner wrapper enforcement, then expose the effective enforcement mode and supported sandbox semantics in the user-facing output without widening the runner contract."
doc_version: 3
doc_updated_at: "2026-03-24T18:07:45.104Z"
doc_updated_by: "CODER"
description: "Show the effective custom-runner enforcement mode in runner dry-run output and document the wrapper-mode contract, supported sandbox semantics, and inspection workflow."
sections:
  Summary: |-
    Expose custom runner enforcement mode in dry-run and docs
    
    Show the effective custom-runner enforcement mode in runner dry-run output and document the wrapper-mode contract, supported sandbox semantics, and inspection workflow.
  Scope: |-
    - In scope: Show the effective custom-runner enforcement mode in runner dry-run output and document the wrapper-mode contract, supported sandbox semantics, and inspection workflow.
    - Out of scope: unrelated refactors not required for "Expose custom runner enforcement mode in dry-run and docs".
  Plan: |-
    1. Inspect the current task/scenario dry-run output and runner docs to identify where custom wrapper enforcement is still implicit or missing.
    2. Update the dry-run/runtime reporting so custom runner executions surface the effective enforcement mode, capability level, and supported sandbox semantics.
    3. Document the new wrapper-mode contract and verify the updated CLI/docs surface with targeted tests and generated reference checks.
  Verify Steps: |-
    1. Run bunx vitest run packages/agentplane/src/cli/run-cli.core.tasks.query.test.ts packages/agentplane/src/cli/run-cli.scenario.test.ts. Expected: dry-run and scenario output cover the updated enforcement surface without regressions.
    2. Run bun run --filter=agentplane build. Expected: the agentplane package builds cleanly after the reporting/docs changes.
    3. Inspect the updated CLI/docs surface for the custom wrapper mode. Expected: dry-run output and documentation clearly state the enforcement mode, capability level, and supported sandbox semantics.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: "- task run show now falls back to prepared_metadata.adapter_capabilities when older or minimized bundles do not surface adapter capabilities directly, so the user-facing inspection output stays stable across persisted runs."
id_source: "generated"
---
## Summary

Expose custom runner enforcement mode in dry-run and docs

Show the effective custom-runner enforcement mode in runner dry-run output and document the wrapper-mode contract, supported sandbox semantics, and inspection workflow.

## Scope

- In scope: Show the effective custom-runner enforcement mode in runner dry-run output and document the wrapper-mode contract, supported sandbox semantics, and inspection workflow.
- Out of scope: unrelated refactors not required for "Expose custom runner enforcement mode in dry-run and docs".

## Plan

1. Inspect the current task/scenario dry-run output and runner docs to identify where custom wrapper enforcement is still implicit or missing.
2. Update the dry-run/runtime reporting so custom runner executions surface the effective enforcement mode, capability level, and supported sandbox semantics.
3. Document the new wrapper-mode contract and verify the updated CLI/docs surface with targeted tests and generated reference checks.

## Verify Steps

1. Run bunx vitest run packages/agentplane/src/cli/run-cli.core.tasks.query.test.ts packages/agentplane/src/cli/run-cli.scenario.test.ts. Expected: dry-run and scenario output cover the updated enforcement surface without regressions.
2. Run bun run --filter=agentplane build. Expected: the agentplane package builds cleanly after the reporting/docs changes.
3. Inspect the updated CLI/docs surface for the custom wrapper mode. Expected: dry-run output and documentation clearly state the enforcement mode, capability level, and supported sandbox semantics.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- task run show now falls back to prepared_metadata.adapter_capabilities when older or minimized bundles do not surface adapter capabilities directly, so the user-facing inspection output stays stable across persisted runs.
