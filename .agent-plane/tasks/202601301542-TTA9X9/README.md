---
id: "202601301542-TTA9X9"
title: "Generate quickstart/role guide from CLI help"
status: "DONE"
priority: "high"
owner: "ORCHESTRATOR"
depends_on: []
tags: ["nodejs", "cli", "docs"]
commit: { hash: "879a170f0148dd2949c89aeeca5fe4d5231a0395", message: "✨ TTA9X9 generate quickstart from CLI help" }
comments:
  - { author: "ORCHESTRATOR", body: "Start: switch quickstart/role to CLI-generated help output." }
  - { author: "ORCHESTRATOR", body: "verified: ran bun run test -- packages/agentplane/src/run-cli.test.ts | details: quickstart/role now use CLI help output." }
doc_version: 2
doc_updated_at: "2026-01-30T15:43:18+00:00"
doc_updated_by: "agentctl"
description: "Remove dependency on .agentplane/agentctl.md and generate quickstart/role guidance from current CLI help."
---
## Summary

- Remove agentctl.md dependency in Node CLI.\n- Generate quickstart/role guidance from current CLI help.

## Scope

- Update quickstart and role commands to use renderHelp output.\n- Remove role guide parsing from agentctl.md.\n- Adjust tests and help text as needed.

## Risks

- Behavior change could break workflows relying on agentctl.md role guide.\n- Help output must stay accurate to avoid confusing guidance.

## Verify Steps

- bun run test -- packages/agentplane/src/run-cli.test.ts

## Rollback Plan

- Revert quickstart/role changes and restore agentctl.md parsing if needed.

