---
id: "202602101258-9HHSVV"
title: "T11: Extend spec/run split to lifecycle commands"
result_summary: "Split lifecycle commands into spec-only + lazy runtime"
risk_level: "low"
status: "DONE"
priority: "high"
owner: "CODER"
depends_on:
  - "202602101258-H5P2AR"
tags:
  - "code"
  - "cli"
  - "perf"
  - "refactor"
verify: []
plan_approval:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
verification:
  state: "ok"
  updated_at: "2026-02-10T14:45:41.870Z"
  updated_by: "CODER"
  note: "lint OK; run-cli lifecycle test suite OK; start/block/verify/finish now split into spec-only + lazy runtime modules"
commit:
  hash: "b9e0818386364a1f2d57a3f40ca5bf88899e0e96"
  message: "🚧 9HHSVV cli: split spec/run for lifecycle commands"
comments:
  -
    author: "CODER"
    body: "Start: split spec/run for lifecycle commands (start/block/verify/finish) so command catalog stays spec-only."
  -
    author: "CODER"
    body: "Verified: start/block/verify/finish specs are now spec-only and their runtime handlers are lazy-loaded; lint and CLI lifecycle test suite pass."
events:
  -
    type: "status"
    at: "2026-02-10T14:40:09.475Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: split spec/run for lifecycle commands (start/block/verify/finish) so command catalog stays spec-only."
  -
    type: "verify"
    at: "2026-02-10T14:45:41.870Z"
    author: "CODER"
    state: "ok"
    note: "lint OK; run-cli lifecycle test suite OK; start/block/verify/finish now split into spec-only + lazy runtime modules"
  -
    type: "status"
    at: "2026-02-10T14:46:50.360Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: start/block/verify/finish specs are now spec-only and their runtime handlers are lazy-loaded; lint and CLI lifecycle test suite pass."
doc_version: 2
doc_updated_at: "2026-02-10T14:46:50.360Z"
doc_updated_by: "CODER"
description: "Split start/block/verify/finish/commit into spec+run; update command catalog; run critical lifecycle tests."
id_source: "generated"
---
## Summary


## Scope


## Plan


## Risks


## Verify Steps

### Scope\n- Split spec vs runtime handler for lifecycle commands: start, block, verify, finish (commit already uses commit.spec.ts).\n- Ensure command catalog imports specs only and lazy-loads runtime handlers via entry.load().\n\n### Checks\n- Lint\n- Lifecycle contract tests\n\n### Evidence / Commands\n- bun run lint\n- bun run test:agentplane packages/agentplane/src/cli/run-cli.core.lifecycle.test.ts\n\n### Pass criteria\n- Lint passes.\n- Lifecycle tests pass.\n- command-catalog imports start/block/verify/finish specs from spec-only modules.

## Verification

### Plan

### Results

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-02-10T14:45:41.870Z — VERIFY — ok

By: CODER

Note: lint OK; run-cli lifecycle test suite OK; start/block/verify/finish now split into spec-only + lazy runtime modules

VerifyStepsRef: doc_version=2, doc_updated_at=2026-02-10T14:40:09.475Z, excerpt_hash=sha256:471feac0211638d28b664809617d5687396004662f895ad78cc4b57080cc148d

<!-- END VERIFICATION RESULTS -->

## Rollback Plan
