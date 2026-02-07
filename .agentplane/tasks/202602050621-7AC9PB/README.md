---
id: "202602050621-7AC9PB"
title: "AP-030c: Extract task/other namespaces"
status: "DONE"
priority: "high"
owner: "CODER"
depends_on: []
tags:
  - "roadmap"
  - "refactor"
  - "cli"
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
  hash: "547c3fc3827e97eeb07052f871306c348a5b202f"
  message: "✨ 7AC9PB extract workflow namespaces"
comments:
  -
    author: "CODER"
    body: "Start: extract task/work/pr/branch/guard/commit/hooks into commands/workflow.ts and backend sync into commands/backend.ts."
  -
    author: "CODER"
    body: "Verified: bun run lint; bun run test:cli:unit; bun run test:cli:scenario; pre-commit hooks (format, lint, test-fast) via agentplane commit."
doc_version: 2
doc_updated_at: "2026-02-05T07:36:52.301Z"
doc_updated_by: "CODER"
description: "Move task/work/pr/backend/branch/etc commands into commands/ modules and reduce run-cli.ts size."
id_source: "generated"
---
## Summary

Extract remaining namespaces (task/work/pr/backend/branch/etc) into commands/ modules.

Extracted workflow/task/guard/branch/hooks commands into commands/workflow.ts and backend sync into commands/backend.ts; moved backend error mapping into cli/error-map; updated run-cli routing and added unit tests.

## Scope

Move task/work/pr/backend/branch/guard/commit/hooks namespaces into commands/ modules; reduce run-cli.ts size.

Added commands modules: packages/agentplane/src/commands/workflow.ts and packages/agentplane/src/commands/backend.ts; updated packages/agentplane/src/run-cli.ts and packages/agentplane/src/cli/error-map.ts; added tests under packages/agentplane/src/commands and packages/agentplane/src/cli.

## Risks

Risk: command routing regressions; mitigate with run-cli core tests and pre-commit hooks.

Risk: CLI routing regressions after extraction. Mitigated by lint + run-cli core/scenario tests.

## Verify Steps

Run run-cli.core.test.ts and full pre-commit hooks; confirm CLI behavior unchanged.

bun run lint\nbun run test:cli:unit\nbun run test:cli:scenario

## Rollback Plan

Revert the namespace extraction commits to restore monolithic run-cli.ts.

Revert the AP-030c commit(s) to restore the monolithic run-cli implementation.

## Plan


## Verification
