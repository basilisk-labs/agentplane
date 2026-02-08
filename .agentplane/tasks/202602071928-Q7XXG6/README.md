---
id: "202602071928-Q7XXG6"
title: "CLI2-110: Remove legacy help + manual usage constants"
status: "DONE"
priority: "high"
owner: "ORCHESTRATOR"
depends_on:
  - "202602071928-BF06JJ"
tags:
  - "cli code"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-02-08T07:55:52.463Z"
  updated_by: "ORCHESTRATOR"
  note: "OK"
verification:
  state: "ok"
  updated_at: "2026-02-08T07:59:02.111Z"
  updated_by: "ORCHESTRATOR"
  note: "Ran: bun run typecheck; bun run test:cli:core. Removed legacy static help; --help now routes through cli2 help (including per-command help), and help.ts is deleted."
commit:
  hash: "a16f029b488c61c20d02ee9b2fafeeeebce8b6d1"
  message: "🚧 Q7XXG6 cli: remove legacy static help"
comments:
  -
    author: "ORCHESTRATOR"
    body: "Start: remove legacy static help and manual usage constants from CLI routing, making cli2 specs the single source of truth for help/usage."
  -
    author: "ORCHESTRATOR"
    body: "Verified: bun run typecheck; bun run test:cli:core. Removed legacy cli/help.ts and routed --help through cli2 help (including per-command help), keeping output deterministic."
doc_version: 2
doc_updated_at: "2026-02-08T08:00:15.193Z"
doc_updated_by: "ORCHESTRATOR"
description: "Delete legacy `cli/help.ts` and stop using `*_USAGE/*_USAGE_EXAMPLE` for E_USAGE."
---
## Summary

CLI2-110: Remove legacy help + manual usage constants

Delete legacy `cli/help.ts` and stop using `*_USAGE/*_USAGE_EXAMPLE` for E_USAGE.

## Scope

In scope:
- Add/adjust cli2 spec and wiring for this command.
- Remove any command-local argv parsing that duplicates spec.
- Update/extend CLI tests that cover this command.

Out of scope:
- Migrating unrelated commands.

## Plan

Scope: remove legacy static help implementation and eliminate manual *_USAGE/*_USAGE_EXAMPLE constants from CLI error paths, consolidating usage/help rendering via cli2 specs.\n\nPlan:\n1) Replace legacy top-level help rendering with cli2 registry help output.\n2) Remove packages/agentplane/src/cli/help.ts and any remaining imports.\n3) Remove or stop exporting manual usage constants that are no longer used by CLI routing.\n4) Update tests/snapshots as needed to reflect new help output.\n\nVerification: bun run typecheck; bun run test:cli:core.

## Risks

- Behavior drift during migration (flags/positional parsing) if spec does not match the current implementation.
- Test brittleness due to exact string expectations.

## Verify Steps

Run:\n- bun run typecheck\n- bun run test:cli:core\n\nPass criteria:\n- agentplane --help and agentplane help are consistent\n- no remaining imports of packages/agentplane/src/cli/help.ts\n- usage errors come from cli2 usageError (or equivalent) instead of manual *_USAGE constants.

## Verification

### Plan

### Results

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-02-08T07:59:02.111Z — VERIFY — ok

By: ORCHESTRATOR

Note: Ran: bun run typecheck; bun run test:cli:core. Removed legacy static help; --help now routes through cli2 help (including per-command help), and help.ts is deleted.

VerifyStepsRef: doc_version=2, doc_updated_at=2026-02-08T07:55:52.860Z, excerpt_hash=sha256:1d61ae9f860747e38550ba1715fa614551dab911af5982c190b1c474276f7f78

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

1. Revert the cli2 wiring/spec for this command.
2. Restore legacy parsing/dispatch for the command.
3. Re-run the targeted CLI tests.
