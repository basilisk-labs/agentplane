---
id: "202603241541-1STFT8"
title: "Add JSON output mode for task run show"
result_summary: "task run show is now scriptable: --json emits a stable machine-readable inspection payload without regressing the existing text interface."
status: "DONE"
priority: "med"
owner: "CODER"
revision: 6
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "runner"
  - "cli"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-24T16:09:46.306Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-03-24T16:11:37.645Z"
  updated_by: "CODER"
  note: "Verified: task run show now supports a stable --json payload alongside the existing text output, and the focused CLI regression plus agentplane build passed."
commit:
  hash: "a7e8ef31ba4136352de838609c81890b61ab78bc"
  message: "✅ 1STFT8 code: done"
comments:
  -
    author: "CODER"
    body: "Start: add a stable JSON output mode for task run show without changing the existing human-readable inspection output."
  -
    author: "CODER"
    body: "Verified: task run show now exposes a stable --json inspection payload with run selection, paths, state, result, and event metadata while preserving the existing human-readable default output."
events:
  -
    type: "status"
    at: "2026-03-24T16:09:46.972Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: add a stable JSON output mode for task run show without changing the existing human-readable inspection output."
  -
    type: "verify"
    at: "2026-03-24T16:11:37.645Z"
    author: "CODER"
    state: "ok"
    note: "Verified: task run show now supports a stable --json payload alongside the existing text output, and the focused CLI regression plus agentplane build passed."
  -
    type: "status"
    at: "2026-03-24T16:11:49.333Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: task run show now exposes a stable --json inspection payload with run selection, paths, state, result, and event metadata while preserving the existing human-readable default output."
doc_version: 3
doc_updated_at: "2026-03-24T16:11:49.333Z"
doc_updated_by: "CODER"
description: "Expose a machine-readable JSON surface for task run show so runner inspections can be scripted without parsing human text output."
sections:
  Summary: |-
    Add JSON output mode for task run show
    
    Expose a machine-readable JSON surface for task run show so runner inspections can be scripted without parsing human text output.
  Scope: |-
    - In scope: Expose a machine-readable JSON surface for task run show so runner inspections can be scripted without parsing human text output.
    - Out of scope: unrelated refactors not required for "Add JSON output mode for task run show".
  Plan: |-
    1. Implement the change for "Add JSON output mode for task run show".
    2. Run required checks and capture verification evidence.
    3. Finalize task findings and finish with traceable commit metadata.
  Verify Steps: |-
    1. Run bunx vitest run packages/agentplane/src/cli/run-cli.core.tasks.query.test.ts. Expected: task run show still prints text by default and emits parseable structured JSON with --json.
    2. Run bun run --filter=agentplane build. Expected: spec and command changes compile cleanly.
    3. Inspect a sample task run show --json payload. Expected: it includes run selection, paths, state, result, and event metadata without requiring text parsing.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    #### 2026-03-24T16:11:37.645Z — VERIFY — ok
    
    By: CODER
    
    Note: Verified: task run show now supports a stable --json payload alongside the existing text output, and the focused CLI regression plus agentplane build passed.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-24T16:09:46.975Z, excerpt_hash=sha256:65a9e65961cbe864489c3d26ac6fe55c8067d9145a759e11f0d61e5f56c13174
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Add JSON output mode for task run show

Expose a machine-readable JSON surface for task run show so runner inspections can be scripted without parsing human text output.

## Scope

- In scope: Expose a machine-readable JSON surface for task run show so runner inspections can be scripted without parsing human text output.
- Out of scope: unrelated refactors not required for "Add JSON output mode for task run show".

## Plan

1. Implement the change for "Add JSON output mode for task run show".
2. Run required checks and capture verification evidence.
3. Finalize task findings and finish with traceable commit metadata.

## Verify Steps

1. Run bunx vitest run packages/agentplane/src/cli/run-cli.core.tasks.query.test.ts. Expected: task run show still prints text by default and emits parseable structured JSON with --json.
2. Run bun run --filter=agentplane build. Expected: spec and command changes compile cleanly.
3. Inspect a sample task run show --json payload. Expected: it includes run selection, paths, state, result, and event metadata without requiring text parsing.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-03-24T16:11:37.645Z — VERIFY — ok

By: CODER

Note: Verified: task run show now supports a stable --json payload alongside the existing text output, and the focused CLI regression plus agentplane build passed.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-24T16:09:46.975Z, excerpt_hash=sha256:65a9e65961cbe864489c3d26ac6fe55c8067d9145a759e11f0d61e5f56c13174

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
