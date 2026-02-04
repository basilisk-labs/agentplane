---
id: "202602040624-1KE2BN"
title: "Remove external Codex worktrees"
status: "DONE"
priority: "med"
owner: "ORCHESTRATOR"
depends_on: []
tags: ["cleanup"]
verify: []
commit: { hash: "7608b88f2f1c38d06c75ee62b76d221b822c9347", message: "📝 1KE2BN fill task README sections" }
comments:
  - { author: "ORCHESTRATOR", body: "Start: audit external Codex worktrees for agentplane, remove them, and prune git worktree metadata." }
  - { author: "ORCHESTRATOR", body: "Verified: external Codex worktrees removed and git worktree metadata pruned." }
doc_version: 2
doc_updated_at: "2026-02-04T06:29:05.515Z"
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
