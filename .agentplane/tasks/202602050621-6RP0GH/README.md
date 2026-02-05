---
id: "202602050621-6RP0GH"
title: "AP-030b: Extract recipes/upgrade commands"
status: "DONE"
priority: "high"
owner: "CODER"
depends_on: []
tags: ["roadmap", "refactor", "cli"]
verify: []
commit: { hash: "47d800b000b6a881ebcee39e119fa61a90bc1b20", message: "✨ 6RP0GH extract recipes and upgrade modules" }
comments:
  - { author: "CODER", body: "Start: extract recipes and upgrade commands into commands/ modules." }
  - { author: "CODER", body: "Verified: bun run test:cli:unit; bun run test:cli:scenario; pre-commit hooks (format, lint, test-fast) via agentplane commit." }
doc_version: 2
doc_updated_at: "2026-02-05T07:00:11.876Z"
doc_updated_by: "CODER"
description: "Move recipes and upgrade command implementations into commands/ modules."
id_source: "generated"
---
## Summary

Extract recipes and upgrade command implementations into commands/ modules.

Extracted upgrade/recipes/scenario command logic into dedicated modules, added CLI error mapping helper, and introduced unit tests for new modules.

## Scope

Move recipes and upgrade command logic out of run-cli.ts into commands/ modules with shared helpers.

- Added  and  for command logic.\n- Added  and .\n- Updated  to delegate to new modules.\n- Added unit tests: , .\n- Updated  to export shared archive helpers.

- Added packages/agentplane/src/commands/recipes.ts and packages/agentplane/src/commands/upgrade.ts for command logic.
- Added packages/agentplane/src/cli/checksum.ts and packages/agentplane/src/cli/error-map.ts.
- Updated packages/agentplane/src/run-cli.ts to delegate to new modules.
- Added unit tests: packages/agentplane/src/commands/recipes.test.ts and packages/agentplane/src/cli/error-map.test.ts.
- Updated packages/agentplane/src/cli/archive.ts to export shared archive helpers.

## Risks

Risk: refactor changes behavior; mitigate with recipes and upgrade test coverage.

- Regression in upgrade/recipes/scenario command behavior due to refactor.\n- Error mapping differences for upgrade edge cases if parsing changes.

## Verify Steps

Run run-cli.recipes.test.ts and upgrade-related tests; ensure pre-commit hooks pass.

- bun run test:cli:unit
- bun run test:cli:scenario

## Rollback Plan

Revert the recipes/upgrade extraction commits to return to run-cli.ts implementation.

Revert the AP-030b commit(s) and restore previous run-cli command implementations.
