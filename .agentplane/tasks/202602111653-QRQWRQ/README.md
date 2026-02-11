---
id: "202602111653-QRQWRQ"
title: "T2: Cover guard/impl/allow branch paths"
result_summary: "Added allow.ts branch tests for clean checks, allowlist staging branches, and GitContext delegation path."
risk_level: "low"
status: "DONE"
priority: "med"
owner: "TESTER"
depends_on: []
tags:
  - "testing"
  - "cli"
  - "coverage"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-02-11T17:00:17.774Z"
  updated_by: "ORCHESTRATOR"
  note: "Plan approved."
verification:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
commit:
  hash: "cdedfb0b486be3d379a815588319d643fdc6a601"
  message: "✅ QRQWRQ tests: cover guard allow helper branches"
comments:
  -
    author: "TESTER"
    body: "Start: add branch-coverage tests for guard allow helper functions."
  -
    author: "TESTER"
    body: "Verified: bunx vitest run packages/agentplane/src/commands/guard/impl/allow.test.ts packages/agentplane/src/commands/guard/impl/comment-commit.test.ts; bunx vitest run packages/agentplane/src/commands/guard/impl/allow.test.ts packages/agentplane/src/commands/guard/impl/comment-commit.test.ts packages/agentplane/src/cli/run-cli.core.guard.test.ts --coverage --coverage.reporter=text --coverage.include='packages/agentplane/src/commands/guard/**'; bun run --filter=@agentplaneorg/core build; bun run --filter=agentplane build."
events:
  -
    type: "status"
    at: "2026-02-11T17:00:17.974Z"
    author: "TESTER"
    from: "TODO"
    to: "DOING"
    note: "Start: add branch-coverage tests for guard allow helper functions."
  -
    type: "status"
    at: "2026-02-11T17:02:17.456Z"
    author: "TESTER"
    from: "DOING"
    to: "DONE"
    note: "Verified: bunx vitest run packages/agentplane/src/commands/guard/impl/allow.test.ts packages/agentplane/src/commands/guard/impl/comment-commit.test.ts; bunx vitest run packages/agentplane/src/commands/guard/impl/allow.test.ts packages/agentplane/src/commands/guard/impl/comment-commit.test.ts packages/agentplane/src/cli/run-cli.core.guard.test.ts --coverage --coverage.reporter=text --coverage.include='packages/agentplane/src/commands/guard/**'; bun run --filter=@agentplaneorg/core build; bun run --filter=agentplane build."
doc_version: 2
doc_updated_at: "2026-02-11T17:02:17.456Z"
doc_updated_by: "TESTER"
description: "Add tests for ensureGitClean and stageAllowlist failure/success branches to improve branch coverage in guard allow helpers."
id_source: "generated"
---
## Summary

Increase branch coverage in guard allow helpers by testing staged/unstaged clean checks and allowlist staging branches.

## Scope

In scope: tests for packages/agentplane/src/commands/guard/impl/allow.ts. Out of scope: changes in policy/commit command behavior.

## Plan

1) Add unit tests for suggestAllowPrefixes and stageAllowlist branches. 2) Cover ensureGitClean staged/unstaged/error paths and gitStatusChangedPaths integration branch. 3) Run tests and focused coverage.

## Risks

Risk: tests overfit internal error text. Mitigation: assert key code/message fragments and deterministic side effects (stage calls).

## Verification


## Rollback Plan

Remove allow.ts tests and re-run guard suites to restore baseline.

## Verify Steps

- bunx vitest run packages/agentplane/src/commands/guard/impl/allow.test.ts packages/agentplane/src/commands/guard/impl/comment-commit.test.ts\n- bunx vitest run packages/agentplane/src/commands/guard/impl/allow.test.ts packages/agentplane/src/commands/guard/impl/comment-commit.test.ts packages/agentplane/src/cli/run-cli.core.guard.test.ts --coverage --coverage.reporter=text --coverage.include='packages/agentplane/src/commands/guard/**'\n- bun run --filter=@agentplaneorg/core build\n- bun run --filter=agentplane build
