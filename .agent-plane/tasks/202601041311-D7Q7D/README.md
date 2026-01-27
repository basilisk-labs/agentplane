---
id: "202601041311-D7Q7D"
title: "Fix frontmatter parsing and commit id rules"
status: "DONE"
priority: "normal"
owner: "CODER"
depends_on: []
tags: ["git", "workflow"]
verify: null
commit: { hash: "ea9ed7a50d1789d452abb61c00987e0925c76ecb", message: "Legacy completion (backfill)" }
comments: []
doc_version: 2
doc_updated_at: "2026-01-24T18:16:17+00:00"
doc_updated_by: "agentctl"
description: "Fix local backend frontmatter parsing to prevent over-escaped strings, normalize existing task files, and allow short commit id suffixes in commit subject checks/docs."
dirty: false
id_source: "custom"
---
# 202601041311-D7Q7D: Fix frontmatter parsing and commit id rules

## Summary

- Fix frontmatter parsing to avoid double-escaped strings in task metadata.
- Normalize existing task READMEs after parsing changes.
- Allow commit subjects to reference the short task id suffix.

## Goal

- Make task storage stable and human-readable while keeping commit checks aligned with shorter IDs.

## Scope

- `.agent-plane/backends/local/backend.py`: parse JSON-quoted scalars to avoid re-escaping.
- `.agent-plane/agentctl.py`: accept task-id suffix in commit subject checks.
- Normalize existing task files in `.agent-plane/tasks/`.

## Risks

- Normalization rewrites task READMEs; ensure no content loss before commit.

## Verify Steps

- `python3 .agent-plane/agentctl.py task list --quiet`

## Rollback Plan

- Restore `.agent-plane/backends/local/backend.py` and task READMEs from git history.

## Changes Summary (auto)

<!-- BEGIN AUTO SUMMARY -->
- `.agent-plane/backends/local/backend.py`: decode JSON-quoted scalars to avoid double-escaped strings.
- `.agent-plane/agentctl.py`: accept task-id suffix in commit subject checks.
- `AGENTS.md`: clarify commit messages may use the id suffix.
- `.agent-plane/agentctl.md`: document suffix usage in commit subjects.
<!-- END AUTO SUMMARY -->

