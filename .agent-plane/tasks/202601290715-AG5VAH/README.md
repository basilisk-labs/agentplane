---
id: "202601290715-AG5VAH"
title: "AP-040: .env contract (autoload/priority/no-override)"
status: "DOING"
priority: "high"
owner: "REDMINE"
depends_on: ["202601270756-V6CK4Q", "202601290715-46R6VZ"]
tags: ["roadmap", "nodejs", "backend", "config"]
verify: ["bun run ci"]
comments:
  - { author: "ORCHESTRATOR", body: "Start: implementing .env contract (autoload/priority/no-override), update tests/docs, then verify via coverage." }
doc_version: 2
doc_updated_at: "2026-01-30T07:26:14+00:00"
doc_updated_by: "agentctl"
description: "Implement .env autoloading with priority rules and no override, and document required Redmine env keys."
---
## Summary

Implement shared .env loader, autoload it for CLI commands, and document Redmine env key precedence.

## Scope

- Add shared .env parser/loader and wire it into CLI startup and Redmine backend.
- Update docs/.env.example to list required keys and precedence.
- Add CLI test for autoload + no-override behavior.

## Risks

- Autoloading .env may surprise tools that previously relied on manual export; docs updated accordingly.
- Unreadable .env still throws for commands that resolve a repo.

## Verify Steps

bun run ci

## Rollback Plan

Revert .env loader/autoload changes and restore docs to previous environment-handling notes.

