---
id: "202601041253-0003R"
title: "Migrate legacy task IDs to new format"
status: "DONE"
priority: "normal"
owner: "CODER"
depends_on: []
tags: ["tasks", "refactor"]
verify: []
commit: { hash: "f84ae1546f3077d674c659dce3ce9bf690160894", message: "Legacy completion (backfill)" }
comments:
  - { author: "INTEGRATOR", body: "Verified: python3 .agent-plane/agentctl.py task list --quiet; ids migrated." }
doc_version: 2
doc_updated_at: "2026-02-03T12:08:32.705Z"
doc_updated_by: "agentplane"
description: "Re-ID existing tasks to the new timestamp + short ID format while preserving order and dependencies."
dirty: false
---
# 202601041253-0003R: Migrate legacy task IDs to new format

## Summary

- Added `task reid` to migrate legacy `T-###` folders into the new timestamp+suffix ID format.
- Updated docs and prompts to use `<task-id>` placeholders instead of legacy numbering.
- Rewrote task folders/IDs and exported the updated `.agent-plane/tasks.json` snapshot.


## Goal

- Transition the repository to the new task ID scheme while keeping dependencies and ordering intact.


## Scope

- `.agent-plane/agentctl.py`: implement `task reid` for the local backend and update user-facing examples.
- `.agent-plane/tasks/`: rename task directories, update frontmatter and headings.
- `.agent-plane/tasks.json`: export the new snapshot after migration.


## Risks

- Task IDs change permanently; external references to legacy `T-###` IDs will be stale.


## Verify Steps

- `python3 .agent-plane/agentctl.py task list --quiet`
- `python3 .agent-plane/agentctl.py task show 202601041253-0003R`


## Rollback Plan

- Restore `.agent-plane/tasks/` and `.agent-plane/tasks.json` from git history.


## Changes Summary (auto)

<!-- BEGIN AUTO SUMMARY -->
- `.agent-plane/agentctl.py`: add task re-id command and update help text examples.
- `.agent-plane/tasks/`: rename legacy task folders to new IDs and refresh frontmatter headings.
- `.agent-plane/tasks.json`: export snapshot after re-identification.
- `AGENTS.md`: replace legacy task id examples with `<task-id>` placeholders.
- `.agent-plane/agentctl.md`: update quickstart examples for new task ids.
- `.agent-plane/agents/*.json`: swap legacy task id paths to `<task-id>` placeholders.
<!-- END AUTO SUMMARY -->

## Changes Summary (auto)

<!-- BEGIN AUTO SUMMARY -->
- `.agent-plane/agentctl.py`: add task re-id command and update help text examples.
- `.agent-plane/tasks/`: rename legacy task folders to new IDs and refresh frontmatter headings.
- `.agent-plane/tasks.json`: export snapshot after re-identification.
- `AGENTS.md`: replace legacy task id examples with `<task-id>` placeholders.
- `.agent-plane/agentctl.md`: update quickstart examples for new task ids.
- `.agent-plane/agents/*.json`: swap legacy task id paths to `<task-id>` placeholders.
<!-- END AUTO SUMMARY -->
