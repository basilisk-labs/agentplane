---
id: "202603120848-GF4R69"
title: "Replace path-only task verify output with status summary"
result_summary: "verify now reports a status-oriented summary instead of a bare README path while quiet mode stays silent"
status: "DONE"
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
  state: "ok"
  updated_at: "2026-03-12T09:10:04.664Z"
  updated_by: "CODER"
  note: "Verified: bun x vitest run packages/agentplane/src/commands/task/verify-record.unit.test.ts packages/agentplane/src/cli/run-cli.core.lifecycle.test.ts --hookTimeout 60000 --testTimeout 60000"
commit:
  hash: "1019b9f9e47736e3b54f721ae63ee21390bdd95e"
  message: "✨ GF4R69 cli: summarize verify output"
comments:
  -
    author: "CODER"
    body: "Start: replace bare README-path output from task verify with a short status summary while preserving quiet mode and verification writes."
  -
    author: "CODER"
    body: "Verified: bun x vitest run packages/agentplane/src/commands/task/verify-record.unit.test.ts packages/agentplane/src/cli/run-cli.core.lifecycle.test.ts --hookTimeout 60000 --testTimeout 60000"
events:
  -
    type: "status"
    at: "2026-03-12T09:05:23.210Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: replace bare README-path output from task verify with a short status summary while preserving quiet mode and verification writes."
  -
    type: "verify"
    at: "2026-03-12T09:10:04.664Z"
    author: "CODER"
    state: "ok"
    note: "Verified: bun x vitest run packages/agentplane/src/commands/task/verify-record.unit.test.ts packages/agentplane/src/cli/run-cli.core.lifecycle.test.ts --hookTimeout 60000 --testTimeout 60000"
  -
    type: "status"
    at: "2026-03-12T09:10:15.048Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: bun x vitest run packages/agentplane/src/commands/task/verify-record.unit.test.ts packages/agentplane/src/cli/run-cli.core.lifecycle.test.ts --hookTimeout 60000 --testTimeout 60000"
doc_version: 3
doc_updated_at: "2026-03-12T09:10:15.048Z"
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
#### 2026-03-12T09:10:04.664Z — VERIFY — ok

By: CODER

Note: Verified: bun x vitest run packages/agentplane/src/commands/task/verify-record.unit.test.ts packages/agentplane/src/cli/run-cli.core.lifecycle.test.ts --hookTimeout 60000 --testTimeout 60000

VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-12T09:05:23.210Z, excerpt_hash=sha256:9990e0519d0fdaa96587d967db6caa50358880bb9d8b98285a2954369fb2c57b

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
