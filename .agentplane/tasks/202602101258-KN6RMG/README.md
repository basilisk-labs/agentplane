---
id: "202602101258-KN6RMG"
title: "T7: Memoize resolveProject/loadConfig via RunDeps"
result_summary: "Memoized project/config deps for lightweight CLI commands"
risk_level: "low"
status: "DONE"
priority: "high"
owner: "CODER"
depends_on:
  - "202602101258-PND66F"
tags:
  - "code"
  - "cli"
  - "perf"
verify: []
plan_approval:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
verification:
  state: "ok"
  updated_at: "2026-02-10T14:05:56.267Z"
  updated_by: "CODER"
  note: "lint OK; run-cli help contract test suite OK"
commit:
  hash: "73d4eaf6dffadea38ec9a5fcc21c69adac35e767"
  message: "🚧 KN6RMG cli: memoize project/config deps"
comments:
  -
    author: "CODER"
    body: "Start: memoize resolveProject/loadConfig via RunDeps and refactor lightweight CLI commands to use deps."
  -
    author: "CODER"
    body: "Verified: lint passes and cli help/registry contract tests pass; lightweight commands now reuse memoized project/config resolution."
events:
  -
    type: "status"
    at: "2026-02-10T14:04:07.942Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: memoize resolveProject/loadConfig via RunDeps and refactor lightweight CLI commands to use deps."
  -
    type: "verify"
    at: "2026-02-10T14:05:56.267Z"
    author: "CODER"
    state: "ok"
    note: "lint OK; run-cli help contract test suite OK"
  -
    type: "status"
    at: "2026-02-10T14:06:53.816Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: lint passes and cli help/registry contract tests pass; lightweight commands now reuse memoized project/config resolution."
doc_version: 2
doc_updated_at: "2026-02-10T14:06:53.816Z"
doc_updated_by: "CODER"
description: "Add memo deps for resolved project and loaded config; refactor light commands (config/agents/ide) to use deps; keep help fast."
id_source: "generated"
---
## Summary


## Scope


## Plan


## Risks


## Verify Steps

### Scope\n- CLI run deps and lightweight commands (config, agents, ide).\n\n### Checks\n- Lint\n- Targeted CLI registry/help contract tests\n\n### Evidence / Commands\n- bun run lint\n- bun run test:agentplane packages/agentplane/src/cli/run-cli.core.help-contract.test.ts\n\n### Pass criteria\n- Lint passes.\n- Tests pass.

## Verification

### Plan

### Results

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-02-10T14:05:56.267Z — VERIFY — ok

By: CODER

Note: lint OK; run-cli help contract test suite OK

VerifyStepsRef: doc_version=2, doc_updated_at=2026-02-10T14:04:07.942Z, excerpt_hash=sha256:8431009325fb698a4ff62ad712f11b00fa85ee25db3daa2edb63b49a77847802

<!-- END VERIFICATION RESULTS -->

## Rollback Plan
