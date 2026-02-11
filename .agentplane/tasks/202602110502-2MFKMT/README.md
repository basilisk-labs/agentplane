---
id: "202602110502-2MFKMT"
title: "T1: Enforce canonical agent ID = profile filename"
result_summary: "Canonical agent-id enforcement with mismatch diagnostics"
status: "DONE"
priority: "high"
owner: "CODER"
depends_on:
  - "202602110502-EE38Y0"
tags:
  - "cli"
  - "code"
  - "quality"
verify: []
plan_approval:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
verification:
  state: "ok"
  updated_at: "2026-02-11T05:25:17.647Z"
  updated_by: "TESTER"
  note: "Verified: canonical id handling, mismatch reporting, and CLI tests pass with full build/lint/test:fast."
commit:
  hash: "7f1520daa4db4086f23a3c800fa848227f5ed75a"
  message: "🚧 2MFKMT cli: enforce canonical agent ids from filenames"
comments:
  -
    author: "CODER"
    body: "Start: enforce canonical id-from-filename in agents and add mismatch validation."
  -
    author: "CODER"
    body: "Verified: agents now canonicalize IDs from filenames and fail on raw id drift."
events:
  -
    type: "status"
    at: "2026-02-11T05:23:18.554Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: enforce canonical id-from-filename in agents and add mismatch validation."
  -
    type: "verify"
    at: "2026-02-11T05:25:17.647Z"
    author: "TESTER"
    state: "ok"
    note: "Verified: canonical id handling, mismatch reporting, and CLI tests pass with full build/lint/test:fast."
  -
    type: "status"
    at: "2026-02-11T05:25:17.795Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: agents now canonicalize IDs from filenames and fail on raw id drift."
doc_version: 2
doc_updated_at: "2026-02-11T05:25:17.795Z"
doc_updated_by: "CODER"
description: "In agents command, compute canonical ID from filename, detect filename-vs-json.id mismatch, surface strict failure/warning, and show raw.id only when drift exists."
id_source: "generated"
---
## Summary

Enforce canonical agent id based on filename in agentplane agents; detect filename-vs-json id mismatches and report them deterministically.

## Scope

In scope: packages/agentplane/src/cli/run-cli/commands/core.ts (agents and profile-read validation) and related unit tests. Out of scope: agent profile schema redesign.

## Plan

1) Canonicalize id from filename in agents list output. 2) Validate optional raw json id against canonical filename id and fail with E_USAGE on mismatch. 3) Keep role/profile behavior intact and add/update tests.

## Risks

Risk: stricter validation may fail existing mismatched local profiles. Mitigation: clear error messages naming filename/canonical/raw ids.

## Verification

### Plan

### Results

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-02-11T05:25:17.647Z — VERIFY — ok

By: TESTER

Note: Verified: canonical id handling, mismatch reporting, and CLI tests pass with full build/lint/test:fast.

VerifyStepsRef: doc_version=2, doc_updated_at=2026-02-11T05:23:18.554Z, excerpt_hash=sha256:c585dd3ffddbea24a0bbb0ba0acbf36472130f2f4a9fb33e1dd86c4de64cfefe

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

Revert the task commit to restore previous agent id listing behavior.

## Verify Steps

- bun run --filter=@agentplaneorg/core build
- bun run --filter=agentplane build
- bun run lint
- bunx vitest run packages/agentplane/src/cli/run-cli/commands/core.unit.test.ts packages/agentplane/src/cli/run-cli.core.test.ts
- bun run test:fast
