---
title: "ADR 0015: Task Workspace Isolation"
description: "Automated task execution uses isolated workspaces independently from lifecycle route."
---

## Status

Accepted on 2026-08-20.

## Context

The old direct route implicitly meant writing in the current checkout. That coupled lifecycle
policy to physical execution and allowed parallel agents to observe or overwrite each other's
uncommitted state.

## Decision

Execution route and workspace strategy are independent:

1. `direct` means no PR gate;
2. `branch_pr` means integration through a PR gate;
3. automated execution defaults to an isolated worktree for both routes;
4. `base_checkout` requires an exclusive single-writer lease.

`WorkspaceAllocationContext` records the task, strategy, path, branch, frozen base, and lease.
Per-task leases prevent duplicate execution, finish during an active run, and cleanup of a live
workspace.

Semantic identities exclude absolute workspace paths. Cleanup requires a released lease, a clean
worktree, persisted evidence and closeout for unique work, and proof that no unpublished commit
would be lost.

## Consequences

Parallel agents can execute tasks without cross-task filesystem contamination. The same task cannot
be allocated twice, and relocation to another machine or worktree does not invalidate verification.
Workspace cleanup is intentionally conservative and may require explicit recovery evidence.

## Migration and rollback

Existing base-checkout work remains readable. New automated allocations choose isolated worktrees.
A controlled rollback can disable new allocation call sites, but must retain single-writer locking
and safe cleanup checks; restoring shared writable execution is not permitted.

## Related decisions

- [ADR 0014](./0014-task-execution-authority.md)
- [ADR 0016](./0016-serialized-direct-integration.md)
- [Task execution authority developer rules](../developer/task-execution-authority.mdx)
