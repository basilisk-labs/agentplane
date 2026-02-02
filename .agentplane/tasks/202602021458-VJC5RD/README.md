---
id: "202602021458-VJC5RD"
title: "Commit migration to .agentplane layout"
status: "DONE"
priority: "med"
owner: "ORCHESTRATOR"
depends_on: []
tags: ["ops"]
verify: []
commit: { hash: "1ebcf79f3873a57a7ba9e5c54b0534d0c0f4d7da", message: "♻️ VJC5RD migrate to .agentplane layout and add publish environment" }
comments:
  - { author: "ORCHESTRATOR", body: "Start: commit migration changes for new .agentplane layout; scope is all current repo changes; risk is bundling unintended diffs, will review git status groups before commit." }
  - { author: "ORCHESTRATOR", body: "Verified: bun run format; pre-commit hooks (format/lint/test-fast) ran during commit attempts; no full test run for this migration commit." }
  - { author: "ORCHESTRATOR", body: "Verified: bun run format; pre-commit hooks (format/lint/test-fast) ran during migration commit attempts; no full test run for this migration commit." }
  - { author: "ORCHESTRATOR", body: "Verified: bun run format; pre-commit hooks (format/lint/test-fast) ran during migration commit attempts; no full test run for this migration commit." }
  - { author: "ORCHESTRATOR", body: "Verified: bun run format; pre-commit hooks (format/lint/test-fast) ran during migration commit attempts; no full test run for this migration commit." }
  - { author: "ORCHESTRATOR", body: "Verified: bun run format; pre-commit hooks (format/lint/test-fast) ran during migration commit attempts; no full test run for this migration commit." }
  - { author: "ORCHESTRATOR", body: "Verified: bun run format; pre-commit hooks (format/lint/test-fast) ran during migration commit attempts; no full test run for this migration commit." }
  - { author: "ORCHESTRATOR", body: "Verified: finalize migration task after lint cleanup." }
doc_version: 2
doc_updated_at: "2026-02-02T15:19:06.694Z"
doc_updated_by: "agentplane"
description: "Commit all current changes for the migration to the new .agentplane-based framework layout."
id_source: "generated"
---
## Summary

## Scope

## Risks

## Verify Steps

## Rollback Plan

## Summary

Commit the migration to the new .agentplane layout, including removal of legacy .agent-plane artifacts and the publish workflow environment binding.

## Scope

Include all current tracked migration changes, remove legacy .agent-plane files, and add environment: npm to the publish workflow.

## Risks

Large migration commit could include unintended diffs; review git status groups and use a single revert if needed.

## Verify Steps

pre-commit hooks during commit (format/lint/test-fast)

## Rollback Plan

Revert the migration commit to restore pre-migration layout.

## Summary

Commit the migration to the new .agentplane layout, including removal of legacy .agent-plane artifacts and the publish workflow environment binding.

## Scope

Include all current tracked migration changes, remove legacy .agent-plane files, and add environment: npm to the publish workflow.

## Risks

Large migration commit could include unintended diffs; review git status groups and use a single revert if needed.

## Verify Steps

pre-commit hooks during commit (format/lint/test-fast)

## Rollback Plan

Revert the migration commit to restore pre-migration layout.
