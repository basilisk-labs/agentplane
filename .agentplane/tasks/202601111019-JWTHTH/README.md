---
id: "202601111019-JWTHTH"
title: "Redmine sync batching/backoff"
status: "DONE"
priority: "normal"
owner: "CODER"
depends_on: []
tags:
  - "redmine"
  - "sync"
verify: []
plan_approval:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
verification:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
commit:
  hash: "3a95b500f57d6dce289ac269f2f525c47ea96ca5"
  message: "✨ JWTHTH add redmine sync batching/backoff and return to local backend"
comments:
  -
    author: "CODER"
    body: "Verified: python -m py_compile .agent-plane/agentctl.py .agent-plane/backends/redmine/backend.py; redmine backend now batches writes with pauses (write_tasks, sync push, migrate); config returned to local backend."
doc_version: 2
doc_updated_at: "2026-02-03T12:08:39.290Z"
doc_updated_by: "agentplane"
description: "Add batch-friendly sync/migration with pauses to avoid Redmine timeouts; restore local backend after tests."
id_source: "custom"
dirty: false
---
## Summary

Add batch-friendly Redmine sync/migration with pauses to avoid API timeouts, then switch back to local backend.

## Context

- Full migration to Redmine timed out; need batching and pauses for write-heavy ops (migrate/sync push).
- Agents should keep using agentctl without backend-specific knowledge; rate limiting should be transparent.
- After testing, switch config back to the local backend.

## Scope

- Add batch size + pause settings to Redmine backend and apply them to write-heavy flows (write_tasks, sync push, migrate).
- Prefer backend write_tasks when migrating; fall back to single writes otherwise.
- Keep defaults conservative so existing users aren’t surprised.
- Restore .agent-plane/config.json to the local backend after testing.

## Risks

- Overly aggressive pauses slow sync; overly small batches may still time out on slow Redmine deployments.
- Using backend.write_tasks could mask per-task failures if Redmine responds inconsistently.

## Verify Steps

- python -m py_compile .agent-plane/agentctl.py .agent-plane/backends/redmine/backend.py
- python .agent-plane/agentctl.py task migrate --source .agent-plane/tasks-export-small.json --quiet (optional smoke)
- python .agent-plane/agentctl.py sync redmine --direction push --yes --quiet (optional when Redmine reachable)

## Rollback Plan

- Revert redmine/backend.py and .agent-plane/config.json to previous versions.
- Remove any partially migrated issues from the Redmine sandbox if needed.

## Plan


## Verification
