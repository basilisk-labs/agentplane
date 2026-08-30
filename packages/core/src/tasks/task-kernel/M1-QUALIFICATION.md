# M1 kernel qualification receipt

- Task: `202608292032-1K47B8`.
- Current WorkItem: `qualify-current-m1-contract`.
- Output: `m1-current-qualification-receipt`.
- Current plan digest: `sha256:c5237eeab87dd5383649ba7fea824a6d05807e4cad894affc5898ff43037c27a`.

## Current qualification

The current source preserves the isolated kernel and the verification-child
subprocess fix. Qualification found and corrected authority defects in the kernel:

1. Scope comparison rejected neither traversal segments nor ambiguous separators.
2. Expiry subset comparison used text order instead of timestamp instants.
3. The reducer accepted expired authority and invalid supplied timestamps.
4. Delegated authority could substitute the original user-decision evidence.
5. WorkItem commands were accepted for cancelled or non-active Tasks and without
   a current approved plan. Runtime definitions now match the current plan.
6. Claim readiness ignored required input manifests. Materialization, graph input
   validation, implicit input-cycle detection, readiness refresh, and claim checks
   now require valid upstream outputs.
7. The completion reducer disagreed with the eligibility predicate when WorkItem
   validation was missing or stale. Both paths now use the same eligibility rule.
8. Effect observation and supersession could leave a Task stuck in uncertainty;
   reconciliation could resume while other effects remained uncertain. All three
   operations now derive Task recovery state from the remaining effects.
9. Terminal Tasks accepted new mutations. They now reject new commands while
   preserving replay of an existing mutation receipt.
10. Effect preparation ignored effect authority and Task execution phase. It now
    requires an exact matching external-effect grant and an active execution phase.
11. Approval now binds to the USER actor, root USER provenance, and exact decision evidence.
12. WorkItem and effect execution requirements now enforce scope, effects, capabilities,
    and resources against the grant and actor capabilities.
13. Final validation requires completed required work and a complete validation identity.
14. Typed amendments update canonical plan content and history at a safe boundary.
    They preserve unchanged completed work, reject authority expansion or weakened
    completion/dependency requirements, and reset only eligible changed pending work.
15. Canonical digest keys use fixed code-unit ordering instead of locale-sensitive comparison.

New regression tests reproduced these defects before the fixes. After correction,
the focused kernel and subprocess suite passes 73 tests across four files.
The kernel still uses only deterministic inputs; it does not read wall-clock time,
the filesystem, environment, Git, providers, or compatibility projections.

Current source SHA-256 identities:

| Path                                                                 | SHA-256                                                            |
| -------------------------------------------------------------------- | ------------------------------------------------------------------ |
| `packages/core/src/tasks/task-kernel/model.ts`                       | `d93dd610744ab995f216e6521440e55e9a6de5b582d4afb3917ca2fd960975e8` |
| `packages/core/src/tasks/task-kernel/kernel.ts`                      | `37d85ef4a2106d28f6976cf145c223f3562d8b20ffd8167732d075198a34c643` |
| `packages/core/src/tasks/task-kernel/invariants.ts`                  | `8ba0bc58c9cc3d624fffd721a4a4eafec803476bca23cca4cf38341b30f201f2` |
| `packages/core/src/tasks/task-kernel/index.ts`                       | `3f69df84a74372f3a28d16a5816414e6abd69980368d0fe74b0d038de0429c10` |
| `packages/agentplane/src/commands/shared/pr-meta/verify-log.ts`      | `84025fe05b1220f35fa2282246a83b3948a0baf08ea57475bcab3735a187b47a` |
| `packages/agentplane/src/commands/shared/pr-meta/verify-log.test.ts` | `074a3321f71e777650700938c9e7e140355d2c78204c022164094826e0955757` |

The supervisor assigns the exact implementation commit when it accepts this
qualification WorkItem or its subsequent evaluator rework. The current commit identity and fresh check results are recorded in the
task's `supervision/implementation-evidence.json` and `supervision/declared-checks.json`.
The source hashes above identify the code qualified by this receipt without a
self-referential commit hash. Full supervisor verification and evaluator acceptance
remain mandatory before delivery; focused results alone do not establish completion.

## Historical evidence

Historical implementation `e381232abf9f5dd613ec048c592a0b4e9ccecdb2` passed the
previous local checks at immutable evidence commit
`4f71923961a191e78f4119fabb6746b79f301c76`.
The kernel source tree at that implementation was
`1752301a80c2988aa9e4d4d9245fb824df8748ae`.
These identities describe the earlier source, before the authority corrections above.
They do not qualify the new code.

Read the following artifacts from that exact historical commit:

| Artifact                                                                         | SHA-256                                                            |
| -------------------------------------------------------------------------------- | ------------------------------------------------------------------ |
| `.agentplane/tasks/202608292032-1K47B8/supervision/declared-checks.json`         | `84868a3dbaff87f16cda2e8f09840e22c19ffe2e5f8e0cede0191b783beff679` |
| `.agentplane/tasks/202608292032-1K47B8/supervision/implementation-evidence.json` | `2cacba31f5ed4447548e727509bfee092d51852cb032f621ddd1c113af80f4c5` |

Those historical checks passed architecture validation, model tests, verification
subprocess tests, and full local CI. The earlier environment WorkItem was completed
at that time, but repeated plan approval subsequently reset its runtime record.
This receipt does not describe that historical completion as current task state.
The current qualification WorkItem obtains fresh supervisor evidence under its own
approved plan instead of restoring old runtime fields by hand.

## Delivery boundary

AgentPlane must persist fresh checks, obtain evaluator acceptance, publish and
verify the exact PR head, merge, and observe Task Hosted Close before M2 starts.
This receipt neither asserts hosted delivery nor authorizes release publication.
