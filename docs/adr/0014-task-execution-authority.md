---
title: "ADR 0014: Task Execution Authority"
description: "Repository workflow mode is policy; each task's resolved execution route is lifecycle authority."
---

## Status

Accepted on 2026-08-20.

## Context

Lifecycle commands previously read repository `workflow_mode` as if it described every task. That
is incorrect when a direct repository contains a task escalated to `branch_pr` because of risk,
effects, or uncertainty. Mutating a command context to impersonate a task route made verification,
evaluation, and finish sensitive to call order.

## Decision

Repository `workflow_mode` is a default policy and safety floor. `TaskExecutionContext` is the
runtime source of truth for one task lifecycle. It freezes:

1. requested and selected route;
2. repository policy mode;
3. route source and reason codes;
4. task set and authoritative task source;
5. base ref and base SHA.

Lifecycle commands load a `TaskCommandContext` before choosing task behavior. They do not mutate
`CommandContext.config` and do not read `ctx.config.workflow_mode` for task semantics.

`auto` is the default request. The old persisted `repository` request is readable only through
migration normalization. A repository configured as `branch_pr` remains a floor; high-risk effects
and material uncertainty can raise a direct request to `branch_pr`.

## Consequences

Verification, quality review, evaluator diff, PR behavior, finish, and close-tail share the same
selected route and frozen base. A branch task inside a direct repository no longer changes meaning
between commands. New lifecycle code must accept execution authority explicitly.

## Migration and rollback

Old tasks are normalized at read time and retain their audit data. Verification records before v4
remain readable for audit but cannot qualify a new lifecycle; a fresh v4 record is required.

Rollback means reverting the code change, not rewriting persisted tasks. Reintroducing config
mutation or treating repository mode as per-task authority is not a supported compatibility path.

## Related decisions

- [ADR 0015](./0015-task-workspace-isolation.md)
- [ADR 0016](./0016-serialized-direct-integration.md)
- [Task execution authority developer rules](../developer/task-execution-authority.mdx)
