---
id: "202602021417-JADQ0P"
title: "Migrate legacy .agent-plane data to .agentplane and remove python artifacts"
status: "TODO"
priority: "med"
owner: "ORCHESTRATOR"
depends_on: []
tags: ["ops"]
verify: []
commit: null
comments: []
doc_version: 2
doc_updated_at: "2026-02-02T14:24:23.188Z"
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
