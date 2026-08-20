---
title: "ADR 0016: Serialized Direct Integration"
description: "Direct task execution is parallel; mutation of the base branch is serialized."
---

## Status

Accepted on 2026-08-20.

## Context

Isolated worktrees remove execution-time contamination but do not make concurrent writes to the
base branch safe. Direct tasks still need deterministic ordering, conflict handling, and proof that
the implementation being integrated is the implementation that was verified.

## Decision

Completed direct execution produces an integration candidate containing task id, implementation
commit, frozen base, verified input digest, path-neutral workspace id, and creation time. The
integration queue is the single writer to the base branch.

For each candidate the queue:

1. compares the current base with the frozen candidate base;
2. refuses semantic conflicts as `semantic_conflict_rework_required`;
3. integrates one candidate at a time;
4. verifies that changed content still matches the verified implementation;
5. invalidates proof as `verification_implementation_changed` when it does not;
6. completes closeout before releasing the next candidate.

Silent conflict merges and heuristic proof reuse are rejected.

## Consequences

Task execution can scale horizontally while integration remains deterministic. Queue records make
ordering and proof reuse auditable. A conflict returns the task to rework instead of partially
changing the base branch.

## Migration and rollback

Legacy branch-pr queue entries remain readable. New direct entries add trace fields without
changing their semantic identity. Rollback may stop accepting new direct candidates, but must drain
or preserve existing entries and must not bypass serialized base mutation.

## Related decisions

- [ADR 0014](./0014-task-execution-authority.md)
- [ADR 0015](./0015-task-workspace-isolation.md)
- [Task execution authority developer rules](../developer/task-execution-authority.mdx)
