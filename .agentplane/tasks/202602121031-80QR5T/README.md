---
id: "202602121031-80QR5T"
title: "P1: finish --close-commit single-command lifecycle"
status: "DOING"
priority: "high"
owner: "CODER"
depends_on: []
tags:
  - "code"
verify: []
plan_approval:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
verification:
  state: "ok"
  updated_at: "2026-02-12T10:34:54.592Z"
  updated_by: "CODER"
  note: "Verified: finish unit and lifecycle tests pass for --close-commit path; help-snap tests pass; lint/build pass."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: add finish --close-commit to collapse finish and close-commit operations into one deterministic command path."
events:
  -
    type: "status"
    at: "2026-02-12T10:31:26.537Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: add finish --close-commit to collapse finish and close-commit operations into one deterministic command path."
  -
    type: "verify"
    at: "2026-02-12T10:34:54.592Z"
    author: "CODER"
    state: "ok"
    note: "Verified: finish unit and lifecycle tests pass for --close-commit path; help-snap tests pass; lint/build pass."
doc_version: 2
doc_updated_at: "2026-02-12T10:34:54.593Z"
doc_updated_by: "CODER"
description: "Add an atomic finish flag that performs finish and deterministic close commit in one command to reduce operator/agent command churn."
id_source: "generated"
---
## Summary


## Scope


## Plan

1. Extend finish CLI spec with --close-commit and optional close preflight flags.\n2. Reuse commit close path from guard layer after finish state update.\n3. Add regression tests for one-command finish+close workflow and failure cases.\n4. Update help/docs snippets where needed.

## Risks


## Verification

### Plan

### Results

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-02-12T10:34:54.592Z — VERIFY — ok

By: CODER

Note: Verified: finish unit and lifecycle tests pass for --close-commit path; help-snap tests pass; lint/build pass.

VerifyStepsRef: doc_version=2, doc_updated_at=2026-02-12T10:31:26.537Z, excerpt_hash=sha256:c7476e5fd2c59d0ab4ec2b9f65451c317bf634b8404a7c5fdd06a271c593ae08

<!-- END VERIFICATION RESULTS -->

## Rollback Plan


## Verify Steps

1. bunx vitest run packages/agentplane/src/commands/task/finish.unit.test.ts packages/agentplane/src/cli/run-cli.core.lifecycle.test.ts packages/agentplane/src/commands/guard/impl/commands.unit.test.ts\n2. bun run lint\n3. bun run --filter=agentplane build
