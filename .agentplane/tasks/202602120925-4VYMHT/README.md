---
id: "202602120925-4VYMHT"
title: "P0: unify CLI errors with next_action hints"
result_summary: "error guidance now includes deterministic next_action"
risk_level: "low"
status: "DONE"
priority: "high"
owner: "CODER"
depends_on:
  - "202602120925-ZVAM62"
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
  updated_at: "2026-02-12T09:32:31.383Z"
  updated_by: "TESTER"
  note: "Added structured next_action guidance for text and JSON error modes; updated stable error JSON schema tests and run-cli coverage."
commit:
  hash: "f3959ad1e1d6fd5599db509d91464a11ef3d7bbc"
  message: "🛠️ 4VYMHT code: add deterministic error next_actions"
comments:
  -
    author: "CODER"
    body: "Start: add structured next_action metadata and deterministic hints for CLI errors in text and JSON modes."
  -
    author: "CODER"
    body: "Verified: CLI errors now provide a single deterministic next_action with reason/reasonCode in both stderr and --json-errors outputs, reducing agent command guessing."
events:
  -
    type: "status"
    at: "2026-02-12T09:30:03.271Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: add structured next_action metadata and deterministic hints for CLI errors in text and JSON modes."
  -
    type: "verify"
    at: "2026-02-12T09:32:31.383Z"
    author: "TESTER"
    state: "ok"
    note: "Added structured next_action guidance for text and JSON error modes; updated stable error JSON schema tests and run-cli coverage."
  -
    type: "status"
    at: "2026-02-12T09:32:31.593Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: CLI errors now provide a single deterministic next_action with reason/reasonCode in both stderr and --json-errors outputs, reducing agent command guessing."
doc_version: 2
doc_updated_at: "2026-02-12T09:32:31.593Z"
doc_updated_by: "CODER"
description: "Add structured next_action metadata for E_USAGE/E_POLICY/E_VALIDATION and render guidance in text/json-errors."
id_source: "generated"
---
## Summary


## Scope


## Plan


## Risks


## Verification

### Plan

### Results

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-02-12T09:32:31.383Z — VERIFY — ok

By: TESTER

Note: Added structured next_action guidance for text and JSON error modes; updated stable error JSON schema tests and run-cli coverage.

VerifyStepsRef: doc_version=2, doc_updated_at=2026-02-12T09:30:03.271Z, excerpt_hash=sha256:3047df713c62ca0721f423b6b33a3a2f07d60df0be1cde38ad1a932f31c0b274

<!-- END VERIFICATION RESULTS -->

## Rollback Plan


## Verify Steps

1. bunx vitest run packages/agentplane/src/cli/run-cli.core.errors.test.ts --hookTimeout 60000 --testTimeout 60000
2. bunx vitest run packages/agentplane/src/cli/run-cli.core.branch-meta.test.ts --hookTimeout 60000 --testTimeout 60000
3. bunx eslint packages/agentplane/src/shared/errors.ts packages/agentplane/src/cli/run-cli.ts packages/agentplane/src/cli/run-cli.core.errors.test.ts
