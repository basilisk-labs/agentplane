---
id: "202601290713-1F7F6S"
title: "AP-027: conflict-safe init (force/backup/conflicts)"
status: "DONE"
priority: "high"
owner: "CODER"
depends_on: ["202601290713-51T41E"]
tags: ["roadmap", "nodejs", "init"]
verify: []
commit: { hash: "cfaba4a6da06359749d41beccd03d80171b6f1da", message: "feat: 1F7F6S conflict-safe init" }
comments:
  - { author: "CODER", body: "Start: implement conflict-safe init flags (--force/--backup) and conflict handling." }
  - { author: "CODER", body: "verified: bun run ci:agentplane (2026-01-29). | details: Scope: conflict-safe init with --force/--backup and tests." }
doc_version: 2
doc_updated_at: "2026-01-29T09:25:46+00:00"
doc_updated_by: "agentctl"
description: "Add init conflict handling: default no-overwrite, --force overwrite, --backup with timestamp, and explicit conflict listing."
---
## Summary

Add conflict-safe init handling: detect conflicts, list them, and support --force/--backup overwrite behavior.

## Scope

- Extend init flags with --force and --backup and update usage/help text.\n- Detect init file/dir conflicts and list them before writing.\n- Implement overwrite (force) and timestamped backups (backup) with tests.

## Risks

- Force mode can overwrite user files if invoked in a dirty workspace.\n- Backup naming collisions could hide earlier backups; suffixing with a random token mitigates this.

## Verify Steps

- 2026-01-29: bun run ci:agentplane (pass)

## Rollback Plan

- Revert the task commit(s) and restore previous init behavior.
