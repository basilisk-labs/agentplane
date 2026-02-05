---
id: "202601301259-8D6XRX"
title: "Add quickstart command to Node CLI"
status: "DONE"
priority: "high"
owner: "ORCHESTRATOR"
depends_on: []
tags: ["nodejs", "cli", "parity"]
verify: []
commit: { hash: "1568fedc06f93518c2ccc14245622e7ae2f27665", message: "✨ 8D6XRX add quickstart command" }
comments:
  - { author: "ORCHESTRATOR", body: "Start: add agentplane quickstart command with help/test updates." }
  - { author: "ORCHESTRATOR", body: "verified: ran bun run test -- packages/agentplane/src/run-cli.test.ts | details: quickstart output and help updated." }
doc_version: 2
doc_updated_at: "2026-02-03T12:09:29.888Z"
doc_updated_by: "agentplane"
description: "Add agentplane quickstart to mirror agentctl quickstart output and update help/tests."
---
## Summary

- Add agentplane quickstart command mirroring agentctl quickstart output.\n- Update help output and tests.

## Scope

- Implement quickstart command in run-cli.\n- Add help entry and a unit test.\n- Keep output compatible with agentctl quickstart.

## Risks

- Output differences could confuse users comparing Python vs Node quickstart.\n- Help text must stay in sync with command behavior.

## Verify Steps

- bun run test -- packages/agentplane/src/run-cli.test.ts

## Rollback Plan

- Revert quickstart changes in run-cli and help/test updates.
