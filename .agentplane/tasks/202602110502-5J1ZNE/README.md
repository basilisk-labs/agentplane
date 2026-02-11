---
id: "202602110502-5J1ZNE"
title: "T6: Split --json help flag from json-errors mode"
result_summary: "--json is no longer ambiguous; JSON errors now require --json-errors"
status: "DONE"
priority: "high"
owner: "CODER"
depends_on:
  - "202602110502-6Y3KR9"
tags:
  - "cli"
  - "code"
  - "ux"
verify: []
plan_approval:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
verification:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
commit:
  hash: "c50d4eb4dfded35ef989dbd3b0e7cf7f2318a9f0"
  message: "🛠 5J1ZNE cli: reserve --json for help and keep --json-errors global"
comments:
  -
    author: "CODER"
    body: "Start: separate help --json from global --json-errors semantics."
  -
    author: "CODER"
    body: "Verified: removed global --json alias for error mode, kept help --json behavior, and updated command guide plus CLI tests to reflect --json-errors as the only global JSON error flag."
events:
  -
    type: "status"
    at: "2026-02-11T05:11:00.098Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: separate help --json from global --json-errors semantics."
  -
    type: "status"
    at: "2026-02-11T05:12:12.199Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: removed global --json alias for error mode, kept help --json behavior, and updated command guide plus CLI tests to reflect --json-errors as the only global JSON error flag."
doc_version: 2
doc_updated_at: "2026-02-11T05:12:12.199Z"
doc_updated_by: "CODER"
description: "Keep help --json behavior, introduce --json-errors as canonical error flag, deprecate/remove ambiguous --json global error semantics, update guide/tests."
id_source: "generated"
---
## Summary

Remove ambiguity: `--json` remains a help-format flag, while JSON error output is controlled only by global `--json-errors`.

## Scope

In scope:
- `packages/agentplane/src/cli/run-cli.ts`
- `packages/agentplane/src/cli/command-guide.ts`
- run-cli core tests and snapshots affected by flag semantics

## Plan

1. Remove `--json` alias from global error flags.
2. Keep help command JSON mode unchanged.
3. Update quickstart/guide text and failing tests.
4. Run build/lint/test gates and commit.

## Risks

- Risk: compatibility break for scripts using global `--json`.
Mitigation: explicit tests/documentation clarify new contract (`--json-errors`).

## Verification


## Rollback Plan

Revert the task commit to restore legacy `--json` alias for JSON errors.

## Verify Steps

- `bun run --filter=@agentplaneorg/core build`
- `bun run --filter=agentplane build`
- `bun run lint`
- `bunx vitest run packages/agentplane/src/cli/run-cli.core.test.ts packages/agentplane/src/cli/command-guide.test.ts packages/agentplane/src/cli/run-cli.core.help-snap.test.ts`
- `bun run test:fast`
