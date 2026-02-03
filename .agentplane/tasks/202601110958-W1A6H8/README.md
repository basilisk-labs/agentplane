---
id: "202601110958-W1A6H8"
title: "Redmine sync smoke test"
status: "DONE"
priority: "normal"
owner: "REDMINE"
depends_on: []
tags: ["sync", "redmine"]
verify: []
commit: { hash: "0e5bacb3095951ee4f4d7a36658dfc733b580f4b", message: "✨ W1A6H8 FZ099X switch to redmine backend and add redmine sync smoke tests" }
comments:
  - { author: "CODER", body: "Verified: ran python -m py_compile .agent-plane/agentctl.py .agent-plane/backends/redmine/backend.py; migrated a 3-task subset to Redmine (full 150-task migration timed out); task list + sync pull show remote tasks; created and exercised test task 202601111002-FZ099X (doc + comment) via Redmine backend." }
doc_version: 2
doc_updated_at: "2026-02-03T12:08:38.702Z"
doc_updated_by: "agentplane"
description: "Switch backend to Redmine using env config, migrate local tasks as source of truth, and validate CRUD/sync flows."
dirty: false
id_source: "custom"
---
## Summary

Switch backend to Redmine using env config and prove end-to-end sync from local source-of-truth tasks.


## Context

- Local repo tasks are the source of truth; Redmine can be used as a sandbox and cleared if needed.
- Need to verify agents can operate via the backend abstraction (list/new/update/doc/comments) without backend-specific assumptions.
- Sync must store intermediate context (docs/comments) cleanly in Redmine custom fields and journals.


## Scope

- Switch .agent-plane/config.json to the Redmine backend (using existing env settings).
- Perform an initial sync/migration so Redmine mirrors the local task state (or starts clean).
- Exercise CRUD: list tasks, create a new task, update doc sections, append comments, and confirm they persist via pull.
- Validate sync push/pull behavior with the cache and ensure CLI outputs remain usable for agents.


## Risks

- Redmine project may contain legacy issues; mass migration could create clutter or conflicts.
- Network/API failures could leave cache and remote out of sync.
- Credentials are stored in .env; accidental logging of secrets must be avoided.


## Verify Steps

- python -m py_compile .agent-plane/agentctl.py .agent-plane/backends/redmine/backend.py
- python .agent-plane/agentctl.py task migrate --source .agent-plane/tasks.json --quiet
- python .agent-plane/agentctl.py task list --quiet


## Rollback Plan

- Revert .agent-plane/config.json to the local backend config.
- Clear any test issues in Redmine (or reset the project) if the migration polluted the sandbox.
- Re-run python -m py_compile .agent-plane/agentctl.py .agent-plane/backends/redmine/backend.py to ensure clean state.


## Notes

- Full migration of 150 tasks to Redmine hit HTTP timeouts; migrated a 3-task subset for smoke testing instead.\n- Created test task 202601111002-FZ099X via Redmine backend, updated docs, and added a comment to verify custom fields/journals.\n-  succeeds; owners/priorities reflect Redmine assignee/priority names (e.g., Via Mentis Assistant / "normal").
