---
id: "202602081822-3EPPNF"
title: "CLI: forbid duplicate command ids in CommandRegistry"
status: "DOING"
priority: "med"
owner: "CODER"
depends_on:
  - "202602081821-Z447HN"
tags:
  - "cli"
  - "code"
  - "refactor"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-02-08T18:33:41.301Z"
  updated_by: "ORCHESTRATOR"
  note: "OK: add duplicate-id guard + unit test; adjust any conflicting callers if found."
verification:
  state: "ok"
  updated_at: "2026-02-08T18:34:51.820Z"
  updated_by: "TESTER"
  note: "bun run lint; bun run test:agentplane; bun run typecheck"
commit: null
comments:
  -
    author: "CODER"
    body: "Start: Add duplicate-id guard to CommandRegistry.register and a unit test to prevent ambiguous routing/behavior."
events:
  -
    type: "status"
    at: "2026-02-08T18:33:47.478Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Add duplicate-id guard to CommandRegistry.register and a unit test to prevent ambiguous routing/behavior."
  -
    type: "verify"
    at: "2026-02-08T18:34:51.820Z"
    author: "TESTER"
    state: "ok"
    note: "bun run lint; bun run test:agentplane; bun run typecheck"
doc_version: 2
doc_updated_at: "2026-02-08T18:34:51.822Z"
doc_updated_by: "TESTER"
description: "Add runtime guard in CommandRegistry.register() to reject duplicate spec.id; add unit test."
id_source: "generated"
---
## Summary

Add runtime guard in CommandRegistry.register() to reject duplicate command ids early (instead of silently picking a winner at match time); add unit test.

## Scope

- packages/agentplane/src/cli/spec/registry.ts\n- packages/agentplane/src/cli/spec/registry.test.ts (new)

## Plan

1) Update CommandRegistry to track registered id strings and throw CliError(E_INTERNAL) on duplicates.\n2) Add unit test ensuring duplicate registration throws.\n3) Run bun run lint; bun run test:agentplane; bun run typecheck.

## Risks

- Risk: some tests/tools may intentionally register duplicates today. Mitigation: if discovered, fix callers to ensure unique ids.

## Verification

(pending)

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-02-08T18:34:51.820Z — VERIFY — ok

By: TESTER

Note: bun run lint; bun run test:agentplane; bun run typecheck

VerifyStepsRef: doc_version=2, doc_updated_at=2026-02-08T18:33:47.478Z, excerpt_hash=sha256:9f210e10d3f7f9ba4601225f4b895a95972a3dd003d4a592c5284b6037c69f2c

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

Revert the commit if a caller relies on duplicate ids; update those call sites instead of keeping duplicates.

## Verify Steps

- bun run lint\n- bun run test:agentplane\n- bun run typecheck\nPass criteria: all pass; duplicate register throws deterministically.

## Notes

### Approvals / Overrides\n- 2026-02-08: no overrides.
