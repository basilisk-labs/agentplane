---
id: "202602081822-B4YH3Y"
title: "CLI: pilot split spec/handler for heavy commands"
status: "DOING"
priority: "med"
owner: "CODER"
depends_on:
  - "202602081822-H19E93"
tags:
  - "cli"
  - "code"
  - "refactor"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-02-08T18:52:33.908Z"
  updated_by: "ORCHESTRATOR"
  note: "OK: pilot split for commit and task new; keep exports stable."
verification:
  state: "ok"
  updated_at: "2026-02-08T18:55:14.989Z"
  updated_by: "TESTER"
  note: "bun run lint; bun run test:cli:core; bun run typecheck"
commit: null
comments:
  -
    author: "CODER"
    body: "Start: Pilot split spec/handler for commit and task new; move specs into *.spec.ts and update catalog imports."
events:
  -
    type: "status"
    at: "2026-02-08T18:52:39.209Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Pilot split spec/handler for commit and task new; move specs into *.spec.ts and update catalog imports."
  -
    type: "verify"
    at: "2026-02-08T18:55:14.989Z"
    author: "TESTER"
    state: "ok"
    note: "bun run lint; bun run test:cli:core; bun run typecheck"
doc_version: 2
doc_updated_at: "2026-02-08T18:55:14.990Z"
doc_updated_by: "TESTER"
description: "Migrate 1–2 commands (commit, task new) to split spec-only modules and handler modules; ensure catalog imports only specs."
id_source: "generated"
---
## Summary

Pilot spec/handler split for heavy commands (commit and task new): move CommandSpec into *.spec.ts modules with no heavy imports; keep handlers in *.command.ts; update catalog imports.

## Scope

- packages/agentplane/src/commands/commit.spec.ts (new)\n- packages/agentplane/src/commands/commit.command.ts (refactor)\n- packages/agentplane/src/commands/task/new.spec.ts (new)\n- packages/agentplane/src/commands/task/new.command.ts (refactor)\n- packages/agentplane/src/cli/run-cli/command-catalog.ts (update imports)

## Plan

1) Split commit: move commitSpec + types into commit.spec.ts; keep makeRunCommitHandler in commit.command.ts.\n2) Split task new similarly.\n3) Update command-catalog.ts to import specs from *.spec.ts and handlers from *.command.ts.\n4) Run bun run lint; bun run test:cli:core; bun run typecheck.

## Risks

- Risk: circular imports / ESM specifier mistakes (.js) during split. Mitigation: keep exports stable and rely on cli core test suite.

## Verification

(pending)

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-02-08T18:55:14.989Z — VERIFY — ok

By: TESTER

Note: bun run lint; bun run test:cli:core; bun run typecheck

VerifyStepsRef: doc_version=2, doc_updated_at=2026-02-08T18:52:39.209Z, excerpt_hash=sha256:0fb26e19005d8b082bd49099cffa84a817e11766792f1d62aa4a84a57fe55e2e

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

Revert split and restore single-module exports if import graph breaks.

## Verify Steps

- bun run lint\n- bun run test:cli:core\n- bun run typecheck\nPass criteria: no behavior changes; CLI core tests remain green.

## Notes

### Approvals / Overrides\n- 2026-02-08: no overrides.
