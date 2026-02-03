---
id: "202601131749-TM6X6S"
title: "Switch tasks backend to local"
status: "DONE"
priority: "normal"
owner: "ORCHESTRATOR"
depends_on: []
tags: ["tasks"]
verify: []
commit: { hash: "57bea995c00b60ad744af0215db1b368883c7b06", message: "✅ 9PQ5D2 verified: formatting-only change in .agent-plane/config.json | details: task docs updated; no tests run." }
comments:
  - { author: "ORCHESTRATOR", body: "verified: config already set to local backend | details: task was a no-op, no tests run." }
doc_version: 2
doc_updated_at: "2026-02-03T12:08:49.710Z"
doc_updated_by: "agentplane"
description: "Restore the tasks backend setting to use the local backend config so agentctl operates on local tasks again."
---
## Summary

Set tasks_backend.config_path to the local backend config so agentctl uses local task storage.


## Context

Requested to switch the task backend settings back to local.


## Scope

Updated tasks_backend.config_path in .agent-plane/config.json to point at .agent-plane/backends/local/backend.json.


## Risks

Low risk: only the backend selection changed. Risk is that workflows expecting the Redmine backend will now read/write local tasks instead.


## Verify Steps

python .agent-plane/agentctl.py config show


## Rollback Plan

Run: python .agent-plane/agentctl.py config set tasks_backend.config_path .agent-plane/backends/redmine/backend.json


## Notes

Initial task creation timed out while the backend was set to Redmine; after switching to local, task creation succeeded.
