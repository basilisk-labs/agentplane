---
id: "202602081821-BGE8F0"
title: "CLI: jsonErrors prescan on global parse failure"
result_summary: "Fix jsonErrors mode on global parse failures"
status: "DONE"
priority: "high"
owner: "CODER"
depends_on: []
tags:
  - "cli"
  - "code"
  - "bugfix"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-02-08T18:23:28.877Z"
  updated_by: "ORCHESTRATOR"
  note: "OK: proceed; keep prescan scoped to pre-command globals and cover with regression test."
verification:
  state: "ok"
  updated_at: "2026-02-08T18:26:08.854Z"
  updated_by: "TESTER"
  note: "bun run test:cli:core; bun run typecheck"
commit:
  hash: "04179e1f9cfd6e6029f5136dd96d1dcc1fd0e66b"
  message: "✨ BGE8F0 cli: honor --json on global parse errors"
comments:
  -
    author: "CODER"
    body: "Start: Fix jsonErrors so --json is honored on global parse failures; add a core CLI regression test for --root missing value."
  -
    author: "CODER"
    body: "Verified: Added --json prescan so JSON error formatting applies even when global argv parsing fails; covered by run-cli.core test and typecheck."
events:
  -
    type: "status"
    at: "2026-02-08T18:24:15.080Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Fix jsonErrors so --json is honored on global parse failures; add a core CLI regression test for --root missing value."
  -
    type: "verify"
    at: "2026-02-08T18:26:08.854Z"
    author: "TESTER"
    state: "ok"
    note: "bun run test:cli:core; bun run typecheck"
  -
    type: "status"
    at: "2026-02-08T18:27:15.229Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: Added --json prescan so JSON error formatting applies even when global argv parsing fails; covered by run-cli.core test and typecheck."
doc_version: 2
doc_updated_at: "2026-02-08T18:27:15.229Z"
doc_updated_by: "CODER"
description: "Fix runCli so --json is honored even when parseGlobalArgs throws; add regression test for agentplane --json --root (missing value)."
id_source: "generated"
---
## Summary

Fix CLI so --json (JSON errors mode) is honored even when parseGlobalArgs throws before globals are returned; add regression test.

## Scope

- packages/agentplane/src/cli/run-cli.ts\n- packages/agentplane/src/cli/run-cli.core*.test.ts (new/updated test)\nOut of scope: any change to --json semantics beyond honoring it on global parse errors.

## Plan

1) Implement argv prescan for --json in global zone before parseGlobalArgs.\n2) Ensure the prescan does not interpret command-level --json (after first non-global token).\n3) Add regression test: agentplane --json --root (missing value) returns JSON error payload.\n4) Run bun run test:cli:core and bun run typecheck.

## Risks

- Risk: prescan may mis-detect --json when used as command option (e.g. help --json). Mitigation: prescan only before first command token (same scoping rule as today).\n- Risk: test becomes brittle vs JSON schema changes. Mitigation: assert key fields (code/exitCode) rather than full string.

## Verification

(pending)

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-02-08T18:26:08.854Z — VERIFY — ok

By: TESTER

Note: bun run test:cli:core; bun run typecheck

VerifyStepsRef: doc_version=2, doc_updated_at=2026-02-08T18:24:15.080Z, excerpt_hash=sha256:227a9adbdfbc84e9ea01b950f895614d4228f414362b9d5a0862dd8082556911

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

Revert the commit for this task; re-run bun run test:cli:core to confirm baseline behavior restored.

## Verify Steps

- bun run test:cli:core\n- bun run typecheck\nPass criteria: tests pass; new test fails on main before fix and passes after fix.

## Notes

### Approvals / Overrides\n- 2026-02-08: no overrides.\n\n### Implementation Notes\n- Use a lightweight argv prescan to set jsonErrors before parseGlobalArgs.\n- Add regression test for missing --root value with --json.
