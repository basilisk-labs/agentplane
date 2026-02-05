---
id: "202601290714-QE3NNN"
title: "AP-035: apply recipe assets/agents/scenarios"
status: "DONE"
priority: "med"
owner: "CODER"
depends_on: ["202601290714-GGRDKD"]
tags: ["roadmap", "nodejs", "recipes"]
verify: []
commit: { hash: "d7452c06dbd2bddae01a9452f5babca7bb059aac", message: "✨ QE3NNN apply recipe install" }
comments:
  - { author: "ORCHESTRATOR", body: "Start: implement recipe apply for agents/assets/scenarios with deterministic conflict handling." }
  - { author: "ORCHESTRATOR", body: "verified: manual review | details: tests not run (suggest bun test packages/agentplane/src/run-cli.test.ts)." }
doc_version: 2
doc_updated_at: "2026-02-03T12:09:18.123Z"
doc_updated_by: "agentplane"
description: "Apply installed recipes to project: copy agents, register scenarios, store assets, and handle name conflicts deterministically."
---
## Summary

Apply recipe agents/scenarios during install, with deterministic conflict handling and docs/tests updates.

## Scope

- Apply recipe agents into .agentplane/agents with namespacing\n- Add --on-conflict handling for install (fail/rename/overwrite)\n- Register recipe scenarios metadata\n- Update CLI help/docs and tests

## Risks

- Existing recipes without valid agent files will now fail install\n- Scenario registry format may need adjustments in AP-036

## Verify Steps

- bun test packages/agentplane/src/run-cli.test.ts

## Rollback Plan

- Revert the AP-035 commits to restore prior recipe install behavior
