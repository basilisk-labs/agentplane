---
id: "202603241541-EGMWZ2"
title: "Add structured evidence fields to task-facing runner outcomes"
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
  - "tasks"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-24T16:19:41.773Z"
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
    body: "Start: implement structured runner evidence fields, sanitize task-facing rendering, and add regression coverage."
events:
  -
    type: "status"
    at: "2026-03-24T16:20:05.012Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: implement structured runner evidence fields, sanitize task-facing rendering, and add regression coverage."
doc_version: 3
doc_updated_at: "2026-03-24T16:26:58.286Z"
doc_updated_by: "ORCHESTRATOR"
description: "Extend sanitized runner projection and history with machine evidence such as changed paths, files changed count, tests run, and evidence paths without leaking assistant prose back into task docs."
sections:
  Summary: |-
    Add structured evidence fields to task-facing runner outcomes
    
    Extend sanitized runner projection and history with machine evidence such as changed paths, files changed count, tests run, and evidence paths without leaking assistant prose back into task docs.
  Scope: |-
    - In scope: Extend sanitized runner projection and history with machine evidence such as changed paths, files changed count, tests run, and evidence paths without leaking assistant prose back into task docs.
    - Out of scope: unrelated refactors not required for "Add structured evidence fields to task-facing runner outcomes".
  Plan: |-
    1. Extend runner result and task-state contracts with structured evidence fields for evidence paths, changed paths, file counts, tests run, and verification candidates.
    2. Render the sanitized evidence block in task-facing runner history without reintroducing assistant prose into README projections.
    3. Add adapter and CLI regressions that prove evidence survives normalization and remains machine-only in task-facing output.
  Verify Steps: |-
    1. Run `bunx vitest run packages/agentplane/src/runner/result-manifest.test.ts packages/agentplane/src/runner/adapters/custom.test.ts packages/agentplane/src/cli/run-cli.core.tasks.query.test.ts -t "task run executes the configured custom runner adapter"`. Expected: normalized runner results preserve machine evidence fields from the custom manifest and task-facing output remains sanitized.
    2. Run `bun run --filter=agentplane build`. Expected: the agentplane package builds successfully after the runner evidence contract changes.
    3. Inspect the updated runner outcome rendering in the task-facing projection. Expected: evidence fields are shown as machine data and no assistant prose is copied into README history.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Add structured evidence fields to task-facing runner outcomes

Extend sanitized runner projection and history with machine evidence such as changed paths, files changed count, tests run, and evidence paths without leaking assistant prose back into task docs.

## Scope

- In scope: Extend sanitized runner projection and history with machine evidence such as changed paths, files changed count, tests run, and evidence paths without leaking assistant prose back into task docs.
- Out of scope: unrelated refactors not required for "Add structured evidence fields to task-facing runner outcomes".

## Plan

1. Extend runner result and task-state contracts with structured evidence fields for evidence paths, changed paths, file counts, tests run, and verification candidates.
2. Render the sanitized evidence block in task-facing runner history without reintroducing assistant prose into README projections.
3. Add adapter and CLI regressions that prove evidence survives normalization and remains machine-only in task-facing output.

## Verify Steps

1. Run `bunx vitest run packages/agentplane/src/runner/result-manifest.test.ts packages/agentplane/src/runner/adapters/custom.test.ts packages/agentplane/src/cli/run-cli.core.tasks.query.test.ts -t "task run executes the configured custom runner adapter"`. Expected: normalized runner results preserve machine evidence fields from the custom manifest and task-facing output remains sanitized.
2. Run `bun run --filter=agentplane build`. Expected: the agentplane package builds successfully after the runner evidence contract changes.
3. Inspect the updated runner outcome rendering in the task-facing projection. Expected: evidence fields are shown as machine data and no assistant prose is copied into README history.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
