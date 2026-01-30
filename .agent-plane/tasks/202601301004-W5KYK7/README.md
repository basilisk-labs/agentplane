---
id: "202601301004-W5KYK7"
title: "Node CLI parity: workflow/support commands"
status: "DONE"
priority: "med"
owner: "ORCHESTRATOR"
depends_on: ["202601300958-HRNHRH"]
tags: ["nodejs", "cli", "parity", "workflow"]
commit: { hash: "90fbdc8c6776805798173e8abc181006d9469e3e", message: "W5KYK7 add workflow/support parity commands" }
comments:
  - { author: "ORCHESTRATOR", body: "Start: parity for workflow/support commands." }
  - { author: "ORCHESTRATOR", body: "verified: bun run test | details: packages/agentplane/src/run-cli.test.ts" }
doc_version: 2
doc_updated_at: "2026-01-30T11:34:05+00:00"
doc_updated_by: "agentctl"
description: "Add Node CLI coverage for agentctl workflow/support commands (ready, role, agents, sync alias, branch status/remove, integrate flags like --run-verify/--base/--dry-run)."
---
## Summary

Add workflow/support command parity (ready, role, agents, sync alias, branch status/remove) and update help/tests.

## Scope

Implement ready/role/agents commands, add sync alias, add branch status/remove commands, update CLI parsing/usage/help, and add run-cli tests.

## Risks

Potential behavior drift if ready/role outputs differ from agentctl expectations or if branch remove safety checks are too strict.

## Verify Steps

bun run test -- packages/agentplane/src/run-cli.test.ts

## Rollback Plan

git revert <commit>

