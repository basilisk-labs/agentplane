---
id: "202602040624-1KE2BN"
title: "Remove external Codex worktrees"
status: "DOING"
priority: "med"
owner: "ORCHESTRATOR"
depends_on: []
tags: ["cleanup"]
verify: []
commit: null
comments:
  - { author: "ORCHESTRATOR", body: "Start: audit external Codex worktrees for agentplane, remove them, and prune git worktree metadata." }
doc_version: 2
doc_updated_at: "2026-02-04T06:24:49.198Z"
doc_updated_by: "ORCHESTRATOR"
description: "Identify and remove external Codex worktrees under ~/.codex/worktrees for agentplane; prune git worktree metadata."
id_source: "generated"
---
## Summary

Removed external Codex worktrees for agentplane under `~/.codex/worktrees` and pruned git worktree metadata.

## Scope

Identified external worktrees, removed the directories, and ran `git worktree prune`.

## Risks

If any external worktree was still needed, it was removed; no changes were made to repo contents.

## Verify Steps

1. Run `git worktree list` and confirm only the main repo remains.
2. Confirm `~/.codex/worktrees` has no `agentplane` worktrees.

## Rollback Plan

Recreate the external worktree via `git worktree add` if required.
