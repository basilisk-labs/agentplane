---
id: "202602020428-H5RPJK"
title: "Refactor Node CLI for modularity and maintainability"
status: "DONE"
priority: "high"
owner: "ORCHESTRATOR"
depends_on: []
tags: ["refactor", "nodejs", "cli"]
verify: []
commit: { hash: "a4c01b7ba474d06c44b21d1073dc41238daffb18", message: "♻️ H5RPJK refactor cli helpers: extract fs/prompts/bundled recipes" }
comments:
  - { author: "ORCHESTRATOR", body: "verified: ran bun run test:cli:core, bun run test:cli:recipes, and bun run test:cli:scenario." }
doc_version: 2
doc_updated_at: "2026-02-02T04:28:55+00:00"
doc_updated_by: "agentctl"
description: "Audit Node.js CLI codebase and refactor into clearer modules with stable public CLI behavior for npm global install. Ensure init/AGENTS generation remains correct."
---
## Summary

Refactor the Node.js CLI code into clearer modules while preserving CLI behavior and npm packaging requirements.

## Scope

- Audit current CLI entrypoints and shared utilities.
- Propose and implement a modular package layout (commands, services, io, domain).
- Incrementally refactor with tests to preserve behavior.
- Keep CLI public surface stable for npm global install.
- Re-verify init AGENTS/agents generation stays aligned.

## Risks

- Large refactor could introduce behavior drift in CLI edge cases.
- Potential increase in test runtime during transition.

## Verify Steps

- bun run test:cli:core
- bun run test:cli:recipes
- bun run test:cli:scenario

## Rollback Plan

- Revert refactor commits and restore prior module layout if tests fail.
- Re-run CLI tests to confirm baseline behavior.
