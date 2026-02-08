---
id: "202602081822-H19E93"
title: "CLI: split registry modules so help path stays light"
result_summary: "Split registry modules"
status: "DONE"
priority: "med"
owner: "CODER"
depends_on:
  - "202602081822-PG7MMN"
tags:
  - "cli"
  - "code"
  - "refactor"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-02-08T18:47:56.065Z"
  updated_by: "ORCHESTRATOR"
  note: "OK: split help/run registry modules; prefer dynamic import in help path."
verification:
  state: "ok"
  updated_at: "2026-02-08T18:50:08.450Z"
  updated_by: "TESTER"
  note: "bun run lint; bun run test:cli:core; bun run typecheck"
commit:
  hash: "db598e311b070688bfb61f5e9a9ec88d14c871b5"
  message: "✨ H19E93 cli: split help/run registry modules"
comments:
  -
    author: "CODER"
    body: "Start: Split help/run registries into separate modules so run-cli help path can avoid importing heavy run handlers."
  -
    author: "CODER"
    body: "Verified: Split registry into registry.help.ts and registry.run.ts and switched run-cli.ts to dynamic imports so help path avoids importing run registry; lint, cli core tests, and typecheck pass."
events:
  -
    type: "status"
    at: "2026-02-08T18:48:02.044Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Split help/run registries into separate modules so run-cli help path can avoid importing heavy run handlers."
  -
    type: "verify"
    at: "2026-02-08T18:50:08.450Z"
    author: "TESTER"
    state: "ok"
    note: "bun run lint; bun run test:cli:core; bun run typecheck"
  -
    type: "status"
    at: "2026-02-08T18:51:13.388Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: Split registry into registry.help.ts and registry.run.ts and switched run-cli.ts to dynamic imports so help path avoids importing run registry; lint, cli core tests, and typecheck pass."
doc_version: 2
doc_updated_at: "2026-02-08T18:51:13.388Z"
doc_updated_by: "CODER"
description: "Split registry.ts into registry.help.ts and registry.run.ts (or equivalent) so help fast does not statically import heavy handlers."
id_source: "generated"
---
## Summary

Split registry implementation so help path can import a lightweight module (help-only) without statically importing run handlers; prepare for true fast help.

## Scope

- packages/agentplane/src/cli/run-cli/registry.ts (split)\n- packages/agentplane/src/cli/run-cli.ts (update imports; ideally dynamic import for help module)\n- packages/agentplane/src/cli/run-cli/run-registry*.ts (new)

## Plan

1) Split registry.ts into registry.help.ts and registry.run.ts (or equivalent).\n2) Ensure run-cli.ts imports help registry only on help branch (prefer dynamic import).\n3) Keep current behavior and tests passing.\n4) Run bun run lint; bun run test:cli:core; bun run typecheck.

## Risks

- Risk: import cycles or ESM path issues (.js specifiers) when splitting. Mitigation: keep paths explicit and rely on existing test suite.

## Verification

(pending)

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-02-08T18:50:08.450Z — VERIFY — ok

By: TESTER

Note: bun run lint; bun run test:cli:core; bun run typecheck

VerifyStepsRef: doc_version=2, doc_updated_at=2026-02-08T18:48:02.044Z, excerpt_hash=sha256:caea0ec018315fa78c8cef732f8503ed9995fe58fa3f14e18d8e7686fed6c4f1

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

Revert to single registry.ts module if split causes ESM resolution regressions.

## Verify Steps

- bun run lint\n- bun run test:cli:core\n- bun run typecheck\nPass criteria: identical CLI behavior; help remains fast path.

## Notes

### Approvals / Overrides\n- 2026-02-08: no overrides.
