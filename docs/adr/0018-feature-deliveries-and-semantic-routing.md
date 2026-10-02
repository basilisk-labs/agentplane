---
title: "ADR 0018: Feature Deliveries and Semantic Routing"
description: "Separate task planning from delivery ownership and freeze a policy-validated execution route before implementation."
---

## Status

Accepted design on 2026-09-30. Implementation is pending.
This decision does not enable a new CLI command or change repository policy.

## Context

A task is a unit of intent and verification. A feature can contain several independently planned
tasks that must share one branch, worktree, and pull request. A task-per-branch default makes that
sequence expensive and makes intermediate task completion look like permission to integrate.
Existing umbrella PR metadata is a compatibility input, not a sufficient delivery registry.

The existing execution resolver already accepts semantic declarations and enforces a repository
`branch_pr` floor. Extend that contract instead of adding a competing mode-selection agent.

## Decision

Introduce a durable Delivery identity for a unit of integration. A Delivery owns its branch,
workspace allocation, base identity, provider PR, integration evidence, and cleanup. Independent
Tasks retain their own Plans, WorkItems, authority, and validation evidence.

The planning agent proposes `direct`, a new isolated delivery, or membership in an existing feature
delivery. The CLI validates the proposal against policy and existing ownership. The CLI freezes the
result before implementation and gives the executor a concrete route. A restart reuses that route.
An agent preference cannot lower a repository policy floor or authorize an external effect.

Keep three decisions separate:

1. Integration policy: `direct` has no PR gate; `branch_pr` has a PR gate.
2. Membership: one task or several tasks belong to a delivery.
3. Workspace allocation: execution uses isolation or an explicitly leased checkout.

Preserve ADR 0015 workspace isolation and ADR 0016 serialized integration. A shared feature worktree
has one writable task at a time. Multiple tasks can run consecutively without opening task branches.
Task validation does not integrate the delivery or clean up its worktree. Delivery integration
requires an explicit readiness decision and verification of the complete candidate.

Use the existing Task Kernel and application coordinator boundaries. Add typed delivery commands,
events, ownership constraints, and operation receipts. Do not introduce a second task state machine
or infer authoritative ownership by scanning generated Markdown or PR descriptions.

## Consequences

- Small compatible changes can use `direct` when repository policy permits it.
- A feature can accept another task before delivery readiness without recreating its workspace.
- Task completion and integration are separately visible and separately evidenced.
- Membership, lease acquisition, base updates, and route escalation require durable transitions.
- Shared feature branches trade parallel writable execution for lower delivery overhead.
- The first implementation retains existing audit artifacts. Artifact coalescing is a separate
  measured optimization and cannot weaken evidence or crash recovery.

## Migration and rollback

Import a single-task branch as a one-member delivery. Import an umbrella only when all members,
branch ownership, base, and provider identity agree. Ambiguous ownership blocks migration.
Preserve original records and a versioned migration receipt. Enable new delivery writes only after
replay and crash-recovery qualification. Rollback disables new admission and retains existing
bindings, leases, evidence, and unresolved operation receipts until they are safely reconciled.

## References

- [Task execution authority](./0014-task-execution-authority.md)
- [Workspace isolation](./0015-task-workspace-isolation.md)
- [Serialized direct integration](./0016-serialized-direct-integration.md)
- [Delivery specification](../developer/feature-deliveries.mdx)
