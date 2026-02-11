---
id: "202602101258-H5P2AR"
title: "T10: Real lazy loading for hot task commands (spec/run split)"
result_summary: "Split hot task commands into spec-only + lazy runtime"
risk_level: "low"
status: "DONE"
priority: "high"
owner: "CODER"
depends_on:
  - "202602101258-KN6RMG"
  - "202602101258-87TTSB"
  - "202602101258-KPCVMK"
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
  updated_at: "2026-02-10T14:29:32.568Z"
  updated_by: "CODER"
  note: "lint OK; help snap + task routing test suites OK; task list/next/search/show now split into spec-only and lazy-loaded runtime modules"
commit:
  hash: "4bab2dfc7f3e40c7f818239b905368d1e7b7ac18"
  message: "🚧 H5P2AR cli: split spec/run for hot task commands"
comments:
  -
    author: "CODER"
    body: "Start: split spec/run for hot task commands (list/next/search/show) to make lazy loading real."
  -
    author: "CODER"
    body: "Verified: task list/next/search/show specs are now spec-only and their runtime handlers are lazy-loaded; lint and CLI help/tasks test suites pass."
events:
  -
    type: "status"
    at: "2026-02-10T14:24:44.219Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: split spec/run for hot task commands (list/next/search/show) to make lazy loading real."
  -
    type: "verify"
    at: "2026-02-10T14:29:32.568Z"
    author: "CODER"
    state: "ok"
    note: "lint OK; help snap + task routing test suites OK; task list/next/search/show now split into spec-only and lazy-loaded runtime modules"
  -
    type: "status"
    at: "2026-02-10T14:30:41.788Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: task list/next/search/show specs are now spec-only and their runtime handlers are lazy-loaded; lint and CLI help/tasks test suites pass."
doc_version: 2
doc_updated_at: "2026-02-10T14:30:41.788Z"
doc_updated_by: "CODER"
description: "Split spec from run for task list/next/search/show; update command catalog entry.load to import run modules."
id_source: "generated"
---
## Summary


## Scope


## Plan


## Risks


## Verify Steps

### Scope\n- Split spec vs runtime handler for hot task commands: task list/next/search/show.\n- Ensure command catalog imports specs only; runtime handlers are lazy-loaded via entry.load().\n\n### Checks\n- Lint\n- CLI help snap and task routing smoke\n\n### Evidence / Commands\n- bun run lint\n- bun run test:agentplane packages/agentplane/src/cli/run-cli.core.help-snap.test.ts\n- bun run test:agentplane packages/agentplane/src/cli/run-cli.core.tasks.test.ts\n\n### Pass criteria\n- Lint passes.\n- Tests pass.\n- command-catalog imports only spec modules for these commands (no usecase imports on help path).

## Verification

### Plan

### Results

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-02-10T14:29:32.568Z — VERIFY — ok

By: CODER

Note: lint OK; help snap + task routing test suites OK; task list/next/search/show now split into spec-only and lazy-loaded runtime modules

VerifyStepsRef: doc_version=2, doc_updated_at=2026-02-10T14:24:44.219Z, excerpt_hash=sha256:8dce569f0cdccf36ff17bd398b2f947e54304ddf77a2418645f2e6229a60efea

<!-- END VERIFICATION RESULTS -->

## Rollback Plan
