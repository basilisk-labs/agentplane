---
id: "202603241541-EGMWZ2"
title: "Add structured evidence fields to task-facing runner outcomes"
result_summary: "Structured runner evidence fields now persist across result normalization, task state, and README runner history without leaking assistant prose."
status: "DONE"
priority: "med"
owner: "CODER"
revision: 8
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
  state: "ok"
  updated_at: "2026-03-24T16:29:40.581Z"
  updated_by: "CODER"
  note: "Checks passed: bunx vitest run packages/agentplane/src/runner/result-manifest.test.ts packages/agentplane/src/runner/adapters/custom.test.ts packages/agentplane/src/cli/run-cli.core.tasks.query.test.ts -t \"task run executes the configured custom runner adapter\"; bun run --filter=agentplane build. Confirmed evidence survives manifest normalization, persists in runner state/frontmatter, and renders as machine-only task-facing lines."
commit:
  hash: "56fb85cacdd6d5fe3958137858cd1c9b7d5b728f"
  message: "✅ EGMWZ2 code: done"
comments:
  -
    author: "CODER"
    body: "Start: implement structured runner evidence fields, sanitize task-facing rendering, and add regression coverage."
  -
    author: "CODER"
    body: "Verified: structured runner evidence now survives manifest normalization, persists into runner/task history, and renders as machine-only task-facing fields."
events:
  -
    type: "status"
    at: "2026-03-24T16:20:05.012Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: implement structured runner evidence fields, sanitize task-facing rendering, and add regression coverage."
  -
    type: "verify"
    at: "2026-03-24T16:29:40.581Z"
    author: "CODER"
    state: "ok"
    note: "Checks passed: bunx vitest run packages/agentplane/src/runner/result-manifest.test.ts packages/agentplane/src/runner/adapters/custom.test.ts packages/agentplane/src/cli/run-cli.core.tasks.query.test.ts -t \"task run executes the configured custom runner adapter\"; bun run --filter=agentplane build. Confirmed evidence survives manifest normalization, persists in runner state/frontmatter, and renders as machine-only task-facing lines."
  -
    type: "status"
    at: "2026-03-24T16:29:58.797Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: structured runner evidence now survives manifest normalization, persists into runner/task history, and renders as machine-only task-facing fields."
doc_version: 3
doc_updated_at: "2026-03-24T16:29:58.798Z"
doc_updated_by: "CODER"
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
    #### 2026-03-24T16:29:40.581Z — VERIFY — ok
    
    By: CODER
    
    Note: Checks passed: bunx vitest run packages/agentplane/src/runner/result-manifest.test.ts packages/agentplane/src/runner/adapters/custom.test.ts packages/agentplane/src/cli/run-cli.core.tasks.query.test.ts -t "task run executes the configured custom runner adapter"; bun run --filter=agentplane build. Confirmed evidence survives manifest normalization, persists in runner state/frontmatter, and renders as machine-only task-facing lines.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-24T16:26:58.286Z, excerpt_hash=sha256:85a40459250cc2b15a9570e2a01ede2687ca368382a9482d75f0dfa78c2adc71
    
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
#### 2026-03-24T16:29:40.581Z — VERIFY — ok

By: CODER

Note: Checks passed: bunx vitest run packages/agentplane/src/runner/result-manifest.test.ts packages/agentplane/src/runner/adapters/custom.test.ts packages/agentplane/src/cli/run-cli.core.tasks.query.test.ts -t "task run executes the configured custom runner adapter"; bun run --filter=agentplane build. Confirmed evidence survives manifest normalization, persists in runner state/frontmatter, and renders as machine-only task-facing lines.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-24T16:26:58.286Z, excerpt_hash=sha256:85a40459250cc2b15a9570e2a01ede2687ca368382a9482d75f0dfa78c2adc71

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
