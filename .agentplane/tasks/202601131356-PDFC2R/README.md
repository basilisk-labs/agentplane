---
id: "202601131356-PDFC2R"
title: "Validate Redmine backend sync against local backend"
status: "DONE"
priority: "normal"
owner: "ORCHESTRATOR"
depends_on: []
tags: ["redmine", "sync"]
verify: []
commit: { hash: "64f25223740a60e5b3284888c3dc3ef980d41f42", message: "✨ PDFC2R validate redmine sync" }
comments:
  - { author: "ORCHESTRATOR", body: "Start: validate Redmine backend sync against local backend using sandbox Redmine." }
  - { author: "ORCHESTRATOR", body: "verified: ran Redmine sync validation steps (local export count 317, redmine pull count 4, sync push showed no dirty tasks) and restored local backend config." }
  - { author: "ORCHESTRATOR", body: "verified: ran Redmine sync validation steps (local export count 317, redmine pull count 4, sync push showed no dirty tasks) and restored local backend config." }
doc_version: 2
doc_updated_at: "2026-01-30T09:27:32+00:00"
doc_updated_by: "agentctl"
description: "Analyze backend state, switch to Redmine, test connector + sync, compare data volume with local truth, and assess whether local task storage can be safely disabled."
---
# 202601131356-PDFC2R: Validate Redmine backend sync against local backend

## Summary

Validated Redmine backend connectivity and sync in sandbox: pull works, push reports no dirty tasks, and Redmine-backed export shows 4 tasks vs 317 local.

## Context

Sandbox Redmine is reachable via VPN and .env credentials. Redmine backend uses cached tasks under .agent-plane/tasks and only includes issues with task_id custom field.

## Scope

- Capture local task count from local backend export.
- Switch backend to Redmine and verify task list.
- Run Redmine sync pull/push and export.
- Compare Redmine task count to local snapshot.
- Restore local backend config and export.

## Risks

- Redmine only surfaces issues with task_id custom field, so counts may differ from local backend.
- Switching backend temporarily changes tasks.json; always restore local export after validation.

## Verify Steps

python .agent-plane/agentctl.py config set tasks_backend.config_path .agent-plane/backends/local/backend.json
python .agent-plane/agentctl.py task export
python - <<'PY'\nimport json\nprint(len(json.load(open('.agent-plane/tasks.json'))['tasks']))\nPY
python .agent-plane/agentctl.py config set tasks_backend.config_path .agent-plane/backends/redmine/backend.json
python .agent-plane/agentctl.py task list
python .agent-plane/agentctl.py sync redmine --direction pull --conflict diff
python .agent-plane/agentctl.py sync redmine --direction push --yes
python .agent-plane/agentctl.py task export
python - <<'PY'\nimport json\nprint(len(json.load(open('.agent-plane/tasks.json'))['tasks']))\nPY
python .agent-plane/agentctl.py config set tasks_backend.config_path .agent-plane/backends/local/backend.json
python .agent-plane/agentctl.py task export

## Rollback Plan

Revert the task README updates; local backend config and tasks.json already restored.

## Notes

Observations:\n- Local backend export contains 317 tasks.\n- Redmine backend task list returned 4 tasks in sandbox.\n- sync pull: ✅ pulled 4 task(s).\n- sync push: ℹ️ no dirty tasks to push.\n\nAssessment: Redmine backend sync works, but data volume differs because only issues with task_id custom field are surfaced. Local task storage should remain enabled unless Redmine becomes the single canonical backend for all tasks.

## Changes Summary (auto)

<!-- BEGIN AUTO SUMMARY -->
- (no file changes)
<!-- END AUTO SUMMARY -->
