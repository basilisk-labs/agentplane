---
id: "202602101258-KPCVMK"
title: "T9: Shared parse/validate utils; dedupe toStringList"
result_summary: "Deduped CLI string list parsing utilities"
risk_level: "low"
status: "DONE"
priority: "med"
owner: "CODER"
depends_on:
  - "202602101258-87TTSB"
tags:
  - "code"
  - "cli"
  - "refactor"
verify: []
plan_approval:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
verification:
  state: "ok"
  updated_at: "2026-02-10T14:17:13.758Z"
  updated_by: "CODER"
  note: "lint OK; run-cli core tasks test suite OK; toStringList helper deduped via cli/spec/parse-utils"
commit:
  hash: "f37ec06fdf59e8ba6479ff611cd2da6a4b851974"
  message: "🚧 KPCVMK cli: dedupe parse string list utilities"
comments:
  -
    author: "CODER"
    body: "Start: introduce shared parse-utils and remove duplicated toStringList helpers across CLI commands."
  -
    author: "CODER"
    body: "Verified: introduced cli/spec/parse-utils and removed duplicated toStringList helpers across command modules; lint and task CLI test suite pass."
events:
  -
    type: "status"
    at: "2026-02-10T14:13:30.121Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: introduce shared parse-utils and remove duplicated toStringList helpers across CLI commands."
  -
    type: "verify"
    at: "2026-02-10T14:17:13.758Z"
    author: "CODER"
    state: "ok"
    note: "lint OK; run-cli core tasks test suite OK; toStringList helper deduped via cli/spec/parse-utils"
  -
    type: "status"
    at: "2026-02-10T14:18:25.887Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: introduced cli/spec/parse-utils and removed duplicated toStringList helpers across command modules; lint and task CLI test suite pass."
doc_version: 2
doc_updated_at: "2026-02-10T14:18:25.887Z"
doc_updated_by: "CODER"
description: "Add parse-utils module and replace duplicated toStringList helpers across commands; update tests/snapshots if needed."
id_source: "generated"
---
## Summary


## Scope


## Plan


## Risks


## Verify Steps

### Scope\n- Shared CLI parse/validate utilities and removal of duplicated toStringList helpers in command implementations.\n\n### Checks\n- Lint\n- Task command help/registry contract tests\n\n### Evidence / Commands\n- bun run lint\n- bun run test:agentplane packages/agentplane/src/cli/run-cli.core.tasks.test.ts\n\n### Pass criteria\n- Lint passes.\n- Tests pass.\n- No duplicated "function toStringList" remains in packages/agentplane/src/commands and cli command modules.

## Verification

### Plan

### Results

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-02-10T14:17:13.758Z — VERIFY — ok

By: CODER

Note: lint OK; run-cli core tasks test suite OK; toStringList helper deduped via cli/spec/parse-utils

VerifyStepsRef: doc_version=2, doc_updated_at=2026-02-10T14:13:30.121Z, excerpt_hash=sha256:9eaad19745a85a65a205d76f15488e6818fe26454b63919bb09ab915966f09aa

<!-- END VERIFICATION RESULTS -->

## Rollback Plan
