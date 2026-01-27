---
id: "202601041253-0003S"
title: "agentctl: preserve frontmatter on scaffold overwrite"
status: "DONE"
priority: "normal"
owner: "CODER"
depends_on: []
tags: ["agentctl"]
verify: null
commit: { hash: "e571744e288fc0f63599967eae460d290d4c97ef", message: "Legacy completion (backfill)" }
comments: []
doc_version: 2
doc_updated_at: "2026-01-24T18:16:17+00:00"
doc_updated_by: "agentctl"
description: "Keep the frontmatter block intact when overwriting task README scaffolds."
dirty: false
id_source: "custom"
---
# 202601041253-0003S: agentctl: preserve frontmatter on scaffold overwrite

## Summary

- Preserve frontmatter when `task scaffold --overwrite` rewrites task READMEs.

## Goal

- Avoid losing the frontmatter block in `.agent-plane/tasks/<task-id>/README.md` during overwrite scaffolds.

## Scope

- Update `agentctl` scaffold to retain existing frontmatter and reapply the template body.

## Risks

- Edge-case frontmatter parsing might miss malformed headers.

## Verify Steps

- `python3 .agent-plane/agentctl.py task scaffold 202601041253-0003S --overwrite`
- Confirm the frontmatter block remains at the top of `.agent-plane/tasks/202601041253-0003S/README.md`.

## Rollback Plan

- Revert the scaffold changes in `.agent-plane/agentctl.py`.

## Changes Summary (auto)

<!-- BEGIN AUTO SUMMARY -->
- `.agent-plane/agentctl.py`: preserve frontmatter when overwriting task scaffolds.
<!-- END AUTO SUMMARY -->

