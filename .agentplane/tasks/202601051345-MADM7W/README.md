---
id: "202601051345-MADM7W"
title: "Suffix-only commit policy, cleanup, and English-only text"
status: "DONE"
priority: "normal"
owner: "CODER"
depends_on: []
tags: ["workflow", "cleanup", "policy"]
verify: []
commit: { hash: "c9a25a5a7d02119017ef6fff74de6d1d63d29b7e", message: "🧹 MADM7W suffix-only commit policy" }
comments: []
doc_version: 2
doc_updated_at: "2026-01-24T18:16:17+00:00"
doc_updated_by: "agentctl"
description: "Enforce suffix-only task IDs in commit subjects, remove non-English text from tracked files, update clean.sh to purge non-framework files, and refresh docs and snapshots."
---
## Summary

- Enforce suffix-only task IDs in commit subjects and update docs.
- Remove non-English text from tracked files and refresh snapshots.
- Tighten clean.sh cleanup to remove non-framework files.

## Scope

- Update commit subject matching and related docs to require suffix-only IDs.
- Normalize priorities and remove Cyrillic text from tracked files.
- Adjust clean.sh cleanup targets and keep it Python 3 only.

## Risks

- Bulk text normalization touches many task README files and the tasks snapshot.
- Stricter commit checks might reject previously acceptable commit subjects.

## Verify Steps

- `python3 .agent-plane/agentctl.py task list --quiet`
- `python3 .agent-plane/agentctl.py task export --out .agent-plane/tasks.json`

## Rollback Plan

- Revert the commit and re-export tasks.json from the prior state.
