---
id: "202601301004-QCQWCN"
title: "Node CLI parity: task subcommands"
status: "DOING"
priority: "high"
owner: "ORCHESTRATOR"
depends_on: ["202601300958-HRNHRH"]
tags: ["nodejs", "cli", "parity", "tasks"]
comments:
  - { author: "ORCHESTRATOR", body: "Start: Implement Node CLI task subcommands parity with agentctl." }
doc_version: 2
doc_updated_at: "2026-01-30T10:30:33+00:00"
doc_updated_by: "agentctl"
description: "Implement missing task operations in Node CLI to match agentctl (add/update/scrub/next/search/scaffold/normalize/migrate/comment/set-status + doc show)."
---
## Summary

Added Node CLI parity for task subcommands (add/update/scrub/next/search/scaffold/normalize/migrate/comment/set-status) and task doc show.

## Scope

Updated task command handling and helpers in node CLI, extended help output, and added tests for new task operations.

## Risks

Parity behaviors may still diverge in edge cases (status transitions or backend-specific nuances).

## Verify Steps

Not run (not requested).

## Rollback Plan

Revert the commit for this task.

