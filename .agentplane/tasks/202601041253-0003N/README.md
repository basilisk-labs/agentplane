---
id: "202601041253-0003N"
title: "Remove legacy workspace directory"
status: "DONE"
priority: "normal"
owner: "DOCS"
depends_on:
  - "202601041253-0003K"
tags:
  - "workflow"
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
  hash: "25a6c054b1b513003186c6b337437547c6fb4a79"
  message: "Legacy completion (backfill)"
comments: []
doc_version: 2
doc_updated_at: "2026-01-24T18:16:17+00:00"
doc_updated_by: "agentctl"
description: "Delete .agent-plane/workspace after migration to .agent-plane/tasks and update references."
dirty: false
---
# 202601041253-0003N: Remove legacy workspace directory

## Summary

- Remove the legacy `.agent-plane/workspace/` directory after migration.
- Update references that still point to `workspace`.

## Goal

- Fully retire the old workspace layout and prevent future use.

## Scope

- Delete `.agent-plane/workspace/`.
- Update any remaining references in docs and prompts.

## Risks

- Legacy artifacts might be lost; ensure migration is complete first.

## Verify Steps

- `rg -n \"workspace\" .agent-plane docs README.md`

## Rollback Plan

- Restore `.agent-plane/workspace/` from git history if needed.

## Changes Summary

- Removed `.agent-plane/workspace/` from the repo.
- Updated references to `.agent-plane/tasks/` in agent prompts, docs, and scripts.

## Plan


## Verification
