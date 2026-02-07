---
id: "202601041253-0003Q"
title: "Fix GitHub sync scripts for snapshot backend"
status: "DONE"
priority: "normal"
owner: "CODER"
depends_on: []
tags:
  - "github"
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
  hash: "1939744c7df301f0a9b1533a7ff7025624d45a3c"
  message: "Legacy completion (backfill)"
comments: []
doc_version: 2
doc_updated_at: "2026-01-24T18:16:17+00:00"
doc_updated_by: "agentctl"
description: "Update .github sync scripts to treat tasks.json as a snapshot and export before syncing."
id_source: "custom"
dirty: false
---
# 202601041253-0003Q: Fix GitHub sync scripts for snapshot backend

## Summary

- Export a fresh tasks snapshot before syncing to GitHub.
- Update sync script text to clarify tasks.json is an exported snapshot.
- Expand workflow triggers to include backend/task changes.

## Goal

- Keep GitHub issues in sync with the backend by exporting `.agent-plane/tasks.json` on each sync.

## Scope

- `.github/workflows/sync-tasks.yml`: add export step and additional trigger paths.
- `.github/scripts/sync_tasks.py`: update source-of-truth messaging and snapshot guard.

## Risks

- Sync will fail if the backend export command errors in CI.

## Verify Steps

- `python3 -m py_compile .github/scripts/sync_tasks.py`

## Rollback Plan

- `git checkout -- .github/workflows/sync-tasks.yml .github/scripts/sync_tasks.py`

## Plan


## Verification

## Changes Summary (auto)

<!-- BEGIN AUTO SUMMARY -->
- `.github/workflows/sync-tasks.yml`: export snapshot before sync and watch backend/task paths.
- `.github/scripts/sync_tasks.py`: clarify snapshot source and require exported tasks.json.
<!-- END AUTO SUMMARY -->
