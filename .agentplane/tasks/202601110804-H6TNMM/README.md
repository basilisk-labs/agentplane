---
id: "202601110804-H6TNMM"
title: "Remove legacy compatibility and backfill commit metadata"
status: "DONE"
priority: "normal"
owner: "REDMINE"
depends_on: []
tags: ["git", "workflow"]
verify: []
commit: { hash: "22de83cff2560324e36b4904e559141b1bef206b", message: "✅ H6TNMM backfill commit metadata export" }
comments:
  - { author: "CODER", body: "Verified: task lint passes after commit backfill; legacy branch parsing removed per request." }
doc_version: 2
doc_updated_at: "2026-02-03T12:08:37.536Z"
doc_updated_by: "agentplane"
description: "Drop old T-### compatibility from agentctl/clean.sh and backfill commit metadata on DONE tasks to keep lint clean."
dirty: false
id_source: "custom"
---
## Summary

Remove legacy T-### compatibility and task reid helpers, align branch/worktree parsing with timestamp IDs, and backfill commit metadata so lint passes.


## Context

We no longer need legacy T-### branches or task reid; branch_pr mode should only accept timestamp IDs. Lint was failing because early DONE tasks lacked commit metadata; backfill required.


## Scope

- Remove legacy branch parsing and task reid logic from agentctl; rely on timestamp IDs only.
- Simplify clean.sh scrubbing to stop rewriting examples to T-###.
- Backfill commit metadata for all DONE tasks and regenerate tasks.json so lint passes.


## Risks

- Removing legacy parsing could block users still on old T-### branches (not expected per request).
- Bulk backfill touches many README files; git history noise.


## Verify Steps

- python .agent-plane/agentctl.py task lint


## Rollback Plan

- Revert agentctl/clean.sh and tasks README backfill commits.


## Notes

- Owner warnings for 'AUTOMATION' remain; acceptable as lint warnings.
