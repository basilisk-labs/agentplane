---
id: "202601041331-Q11MC"
title: "Prune legacy paths and optimize agentctl"
status: "DONE"
priority: "normal"
owner: "CODER"
depends_on: []
tags:
  - "agentctl"
  - "refactor"
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
  hash: "a13b7c8bf9ce6143bad33fb58ac0fed49089c83c"
  message: "✅ P7AMW3 close task"
comments: []
doc_version: 2
doc_updated_at: "2026-01-24T18:16:17+00:00"
doc_updated_by: "agentctl"
description: "Remove legacy workspace/PR fallback paths (keep legacy ID reid), add task normalize, use backend export fast path, reduce redundant backend writes, add per-run task cache, and unify repeated error messaging in agentctl."
id_source: "custom"
dirty: false
---
## Summary

- Remove legacy workspace and PR fallback paths from agentctl.
- Add `task normalize` to rewrite task READMEs via the backend.
- Use backend fast-path export when available.
- Reduce redundant backend writes on save/finish.
- Add per-run task cache for repeated reads.
- Unify repeated error messaging helpers.

## Goal

- Simplify agentctl by removing old path support and make core operations faster and less noisy.

## Scope

- `.agent-plane/agentctl.py`: remove legacy path helpers, add normalize, cache, fast export, helper errors.
- `.agent-plane/backends/local/backend.py`: helpers for normalization or hash comparison.

## Risks

- Removing legacy paths may break old repos without migration.

## Verify Steps

- `python3 .agent-plane/agentctl.py task normalize`
- `python3 .agent-plane/agentctl.py task export --out .agent-plane/tasks.json`

## Rollback Plan

- Restore `.agent-plane/agentctl.py` and backend files from git history.

## Plan


## Verification

## Changes Summary (auto)

<!-- BEGIN AUTO SUMMARY -->
- `.agent-plane/agentctl.py`: prune legacy paths and add normalization + caching + fast export.
- `.agent-plane/backends/local/backend.py`: helpers for normalization or hash comparison.
<!-- END AUTO SUMMARY -->
