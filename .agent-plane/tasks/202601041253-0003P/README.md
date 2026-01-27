---
id: "202601041253-0003P"
title: "Update clean.sh for new structure"
status: "DONE"
priority: "normal"
owner: "CODER"
depends_on: []
tags: ["cleanup"]
verify: null
commit: { hash: "04fdd37dca3c7541e1d957e263b473547c94d6ad", message: "Legacy completion (backfill)" }
comments: []
doc_version: 2
doc_updated_at: "2026-01-24T18:16:17+00:00"
doc_updated_by: "agentctl"
description: "Update clean.sh to remove non-framework artifacts under the new tasks layout while preserving framework data."
dirty: false
id_source: "custom"
---
# 202601041253-0003P: Update clean.sh for new structure

## Summary

- Refresh `clean.sh` to align with the new tasks directory layout.
- Reset `.agent-plane/tasks/` contents during cleanup while preserving the folder itself.
- Recreate an empty `.agent-plane/tasks.json` snapshot after cleanup using Python 3.

## Goal

- Ensure cleanup removes non-framework artifacts but keeps the local tasks backend structure consistent.

## Scope

- Update `clean.sh` cleanup behavior for `.agent-plane/tasks/`.
- Keep snapshot regeneration logic in place for `.agent-plane/tasks.json`.

## Risks

- Cleanup will delete local task data under `.agent-plane/tasks/` unless preserved externally.

## Verify Steps

- `bash -n clean.sh`

## Rollback Plan

- `git checkout -- clean.sh`

## Changes Summary (auto)

<!-- BEGIN AUTO SUMMARY -->
- `clean.sh`: reset local tasks directory during cleanup and regenerate snapshot with Python 3.
<!-- END AUTO SUMMARY -->

