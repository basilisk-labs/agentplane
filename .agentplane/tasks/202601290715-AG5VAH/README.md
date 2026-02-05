---
id: "202601290715-AG5VAH"
title: "AP-040: .env contract (autoload/priority/no-override)"
status: "DONE"
priority: "high"
owner: "REDMINE"
depends_on: ["202601270756-V6CK4Q", "202601290715-46R6VZ"]
tags: ["roadmap", "nodejs", "backend", "config"]
verify: ["bun run ci"]
commit: { hash: "86fc69e3fd22a2aa7685d96117b37ddc38dd5205", message: "✨ AG5VAH implement .env autoload contract" }
comments:
  - { author: "ORCHESTRATOR", body: "Start: implementing .env contract (autoload/priority/no-override), update tests/docs, then verify via coverage." }
  - { author: "REDMINE", body: "verified: ran bun run ci on 2026-01-30 | details: all checks passed (format, typecheck, lint, coverage)." }
  - { author: "REDMINE", body: "verified: ran bun run ci on 2026-01-30 | details: all checks passed (format, typecheck, lint, coverage)." }
doc_version: 2
doc_updated_at: "2026-02-03T12:09:20.445Z"
doc_updated_by: "agentplane"
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
