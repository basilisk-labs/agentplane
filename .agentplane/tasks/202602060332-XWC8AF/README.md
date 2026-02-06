---
id: "202602060332-XWC8AF"
title: "AP-BR-01 Remove base_branch from config"
status: "DONE"
priority: "high"
owner: "CODER"
depends_on: []
tags: ["config"]
verify: []
commit: { hash: "01fb738a7780db1f8f3c140d0bc6de6455909a7d", message: "📝 S76RDP record task metadata" }
comments:
  - { author: "CODER", body: "Start: remove base_branch from config schema/types, add compat ignore warning, update tests/docs." }
  - { author: "CODER", body: "Verified: bun run test:core; bun run test:cli:core; bun run --filter=@agentplaneorg/core build; bun run --filter=agentplane build.\\nSummary: Implemented base-branch cleanup (remove base_branch, new base resolution/clear/explain), direct work start without worktree, task exports only via task export, docs/tests updates.\\nCommit: 01fb738a7780db1f8f3c140d0bc6de6455909a7d." }
  - { author: "CODER", body: "Commit update: 7a1d5d3d1ada80c2c1c1b136238e17e2d0bf60ea (main changes), 938f94545ae17e44868559cd779fa1a18d5a9b31 (task finish/export snapshots)." }
doc_version: 2
doc_updated_at: "2026-02-06T04:23:17.197Z"
doc_updated_by: "CODER"
description: "Remove base_branch from config schema/examples/types; ignore if present with warning for compatibility; ensure base comes only from git config/--base. Include tests and docs updates."
id_source: "generated"
---
## Summary

Removed base_branch from config schema/examples/types and ignore legacy values with a warning.

## Scope

Config schema/examples, config validation/sanitization, init config writing, and related tests.

## Risks

Legacy configs relying on base_branch may be surprised; warning added to surface ignored field.

## Verify Steps

bun run test:core; bun run test:cli:core.

## Verification

bun run test:core; bun run test:cli:core.

## Rollback Plan

Revert config schema/type changes and init/config handling updates; restore prior tests.
