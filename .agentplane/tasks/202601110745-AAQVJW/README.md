---
id: "202601110745-AAQVJW"
title: "Fix branch_pr ID parsing and clean.sh scrub"
status: "DONE"
priority: "normal"
owner: "CODER"
depends_on: []
tags: ["agentctl", "branch_pr", "cleanup"]
verify: []
commit: { hash: "88e82c4af90d4611745387fb2de4147147c57943", message: "✨ AAQVJW fix branch_pr id parsing and clean scrub" }
comments:
  - { author: "CODER", body: "Verified: python -m py_compile .agent-plane/agentctl.py .agent-plane/backends/local/backend.py .agent-plane/backends/redmine/backend.py; branch_pr regex now accepts timestamp task IDs; clean.sh scrub examples updated to timestamp format." }
doc_version: 2
doc_updated_at: "2026-01-24T18:16:17+00:00"
doc_updated_by: "agentctl"
description: "Accept timestamp task IDs in branch parsing/PR flows and update clean.sh/docs hints to avoid legacy T-### examples."
---
## Summary

Accept timestamp task IDs in branch parsing/PR flows and keep clean.sh/docs hints off the legacy T-### format.

## Context

Branch/PR helpers still parse only legacy task branches (`task/T-###/<slug>`), and clean.sh rewrites examples to T-123 even though the framework now uses timestamp-based task IDs. This blocks branch_pr mode and produces stale docs after cleanup.

## Scope

- Update task-branch parsing to accept timestamp IDs while preserving legacy T-### support.
- Refresh CLI hints to reference `<task-id>` instead of `<T-###>`.
- Modernize clean.sh scrub replacements so examples stay on timestamp IDs.

## Risks

- Broader regex may allow unexpected branch names if patterns are too loose.
- clean.sh scrub logic could still drop needed instructions if replacements are incorrect.

## Verify Steps

- python -m py_compile .agent-plane/agentctl.py .agent-plane/backends/local/backend.py .agent-plane/backends/redmine/backend.py

## Rollback Plan

- Revert the branch parsing and clean.sh changes.

## Notes

- Keep legacy T-### task branches working for old repositories; timestamp IDs are the primary path.
