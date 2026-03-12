---
id: "202603120848-GF4R69"
title: "Replace path-only task verify output with status summary"
status: "DOING"
priority: "med"
owner: "CODER"
depends_on: []
tags:
  - "code"
  - "cli"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-12T08:51:34.710Z"
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
    body: "Start: replace bare README-path output from task verify with a short status summary while preserving quiet mode and verification writes."
events:
  -
    type: "status"
    at: "2026-03-12T09:05:23.210Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: replace bare README-path output from task verify with a short status summary while preserving quiet mode and verification writes."
doc_version: 3
doc_updated_at: "2026-03-12T09:05:23.210Z"
doc_updated_by: "CODER"
description: "Change task verify success output from a bare README path to a concise status-oriented summary so agents can interpret verification results without guessing."
id_source: "generated"
---
## Summary

Replace path-only task verify output with status summary

Change task verify success output from a bare README path to a concise status-oriented summary so agents can interpret verification results without guessing.

## Scope

- In scope: Change task verify success output from a bare README path to a concise status-oriented summary so agents can interpret verification results without guessing.
- Out of scope: unrelated refactors not required for "Replace path-only task verify output with status summary".

## Plan

1. Replace bare README-path output from task verify with a concise status-oriented success summary. 2. Preserve quiet-mode behavior and README writes. 3. Add focused unit and lifecycle regressions so verification output stays interpretable.

## Verify Steps

1. Run `bun x vitest run packages/agentplane/src/commands/task/verify-record.unit.test.ts packages/agentplane/src/cli/run-cli.core.lifecycle.test.ts --hookTimeout 60000 --testTimeout 60000`. Expected: verify output tests pass for both ok and rework paths.
2. Run `agentplane verify <task-id> --ok --by CODER --note ...` in a test fixture. Expected: stdout reports the task id and verification state in a status-oriented line rather than only printing a README path.
3. Confirm quiet mode still suppresses output. Expected: no extra stdout noise when `--quiet` is set.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
