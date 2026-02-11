---
id: "202602111631-Y53PKW"
title: "T6: Extract shared ANSI utils and remove duplication"
result_summary: "ANSI helpers are centralized in a shared module and reused by init UI/tests."
risk_level: "low"
status: "DONE"
priority: "low"
owner: "CODER"
depends_on: []
tags:
  - "cli"
  - "refactor"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-02-11T16:49:26.058Z"
  updated_by: "ORCHESTRATOR"
  note: "Plan approved."
verification:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
commit:
  hash: "8f794348f4afb4436552af672d048d1ccdb58ecb"
  message: "✅ Y53PKW cli: extract shared ansi utils for init UI"
comments:
  -
    author: "CODER"
    body: "Start: extract shared ansi helpers and wire init UI/tests to them."
  -
    author: "CODER"
    body: "Verified: bunx vitest run packages/agentplane/src/cli/shared/ansi.test.ts packages/agentplane/src/cli/run-cli/commands/init/ui.test.ts; bun run --filter=@agentplaneorg/core build; bun run --filter=agentplane build."
events:
  -
    type: "status"
    at: "2026-02-11T16:49:26.257Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: extract shared ansi helpers and wire init UI/tests to them."
  -
    type: "status"
    at: "2026-02-11T16:50:05.834Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: bunx vitest run packages/agentplane/src/cli/shared/ansi.test.ts packages/agentplane/src/cli/run-cli/commands/init/ui.test.ts; bun run --filter=@agentplaneorg/core build; bun run --filter=agentplane build."
doc_version: 2
doc_updated_at: "2026-02-11T16:50:05.834Z"
doc_updated_by: "CODER"
description: "Move stripAnsi/visible-length logic to shared CLI util module and reuse across init UI/tests to reduce duplication and drift."
id_source: "generated"
---
## Summary

Extract ANSI string helpers into a shared CLI module and reuse them in init UI rendering and tests to remove duplication.

## Scope

In scope: packages/agentplane/src/cli/shared/ansi.ts and init UI/test imports. Out of scope: UI wording and rendering design changes.

## Plan

1) Add shared ansi utilities (stripAnsi, visibleLen). 2) Replace duplicated local implementations in init ui and ui tests. 3) Add focused ansi util tests.

## Risks

Risk: changed ANSI stripping semantics can affect box width calculations. Mitigation: keep parser behavior equivalent and assert alignment test still passes.

## Verification


## Rollback Plan

Revert shared ansi module and restore previous local helper implementations in init UI files.

## Verify Steps

- bunx vitest run packages/agentplane/src/cli/shared/ansi.test.ts packages/agentplane/src/cli/run-cli/commands/init/ui.test.ts\n- bun run --filter=@agentplaneorg/core build\n- bun run --filter=agentplane build
