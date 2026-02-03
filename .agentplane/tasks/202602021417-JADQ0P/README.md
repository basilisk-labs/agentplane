---
id: "202602021417-JADQ0P"
title: "Migrate legacy .agent-plane data to .agentplane and remove python artifacts"
status: "DONE"
priority: "med"
owner: "ORCHESTRATOR"
depends_on: []
tags: ["ops"]
verify: []
commit: { hash: "35359daf1bcc5ede5838feed0e88a0c23e8f81ec", message: "🧪 4RQ156+JADQ0P align scenario test messages" }
comments:
  - { author: "INTEGRATOR", body: "Verified: bun run test:full; rg -n \"\\.agent-plane\" -S; rg -n \"agentctl\" docs README.md packages" }
doc_version: 2
doc_updated_at: "2026-02-03T08:26:07.938Z"
doc_updated_by: "agentplane"
description: "Move legacy task data from .agent-plane into .agentplane using Node CLI paths, remove python-era artifacts and references, and update configs/docs/tests accordingly."
id_source: "explicit"
---
## Summary

## Scope

## Risks

## Verify Steps

## Rollback Plan

## Summary

Migrated legacy task data into .agentplane using the Node CLI and removed python-era artifacts, configs, tests, and docs.

## Scope

Create .agentplane config/backend, migrate tasks.json into .agentplane/tasks, remove .agent-plane tree, delete agentctl fixtures/audits, and update docs/config/tests to be Node-only.

## Risks

Removing legacy artifacts may impact any scripts still depending on .agent-plane; task data should be verified in .agentplane before deleting backups.

## Verify Steps

node packages/agentplane/bin/agentplane.js task export\nrg -n "agentctl|\.agent-plane" -S .

## Rollback Plan

Restore .agent-plane and deleted audit/fixture files from version control; revert doc/config/test edits.
