---
id: "202602081822-PG7MMN"
title: "CLI: introduce command-catalog single source of truth"
status: "DOING"
priority: "med"
owner: "CODER"
depends_on:
  - "202602081822-3EPPNF"
tags:
  - "cli"
  - "code"
  - "refactor"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-02-08T18:37:16.212Z"
  updated_by: "ORCHESTRATOR"
  note: "OK: move to catalog-driven registration; keep help handler last."
verification:
  state: "ok"
  updated_at: "2026-02-08T18:42:58.836Z"
  updated_by: "TESTER"
  note: "bun run lint; bun run test:cli:core; bun run typecheck"
commit: null
comments:
  -
    author: "CODER"
    body: "Start: Create a command catalog and refactor help/run registries to be derived from it, eliminating duplicated command lists."
events:
  -
    type: "status"
    at: "2026-02-08T18:37:20.849Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Create a command catalog and refactor help/run registries to be derived from it, eliminating duplicated command lists."
  -
    type: "verify"
    at: "2026-02-08T18:42:58.836Z"
    author: "TESTER"
    state: "ok"
    note: "bun run lint; bun run test:cli:core; bun run typecheck"
doc_version: 2
doc_updated_at: "2026-02-08T18:42:58.838Z"
doc_updated_by: "TESTER"
description: "Add command-catalog.ts and refactor buildRegistry/buildHelpFastRegistry to derive registrations from it."
id_source: "generated"
---
## Summary

Introduce a single command catalog as the source of truth and derive both help-fast and run registries from it (removes manual duplicated lists).

## Scope

- packages/agentplane/src/cli/run-cli/command-catalog.ts (new)\n- packages/agentplane/src/cli/run-cli/registry.ts (refactor to use catalog)

## Plan

1) Create command-catalog.ts exporting COMMANDS entries (spec + handler factory).\n2) Refactor buildHelpFastRegistry/buildRegistry to iterate COMMANDS and register specs/handlers.\n3) Keep behavior identical; ensure help handler registration remains last and uses the registry instance.\n4) Run bun run lint; bun run test:cli:core; bun run typecheck.

## Risks

- Risk: missing a command in the catalog would drop it from help/run. Mitigation: existing contract tests (help JSON contract, registry equality) will catch.

## Verification

(pending)

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-02-08T18:42:58.836Z — VERIFY — ok

By: TESTER

Note: bun run lint; bun run test:cli:core; bun run typecheck

VerifyStepsRef: doc_version=2, doc_updated_at=2026-02-08T18:37:20.849Z, excerpt_hash=sha256:5978a5b589cb2cb1f16cd374f446179c9fec4fe021cfb77c67791767b46c942c

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

Revert the commit to restore manual lists if catalog refactor causes regressions.

## Verify Steps

- bun run lint\n- bun run test:cli:core\n- bun run typecheck\nPass criteria: all pass; registry equality test remains green.

## Notes

### Approvals / Overrides\n- 2026-02-08: no overrides.
