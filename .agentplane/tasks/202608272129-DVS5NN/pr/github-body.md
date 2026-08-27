Task: `202608272129-DVS5NN`
Title: Resolve protected integration handoffs from their owning checkout
Canonical task record: `.agentplane/tasks/202608272129-DVS5NN/README.md`

## Summary

Resolve protected integration handoffs from their owning checkout

Repair the reproduced protected-integration handoff reader/owner mismatch on main db908ae90dd32609c6d12454fe87166a08e6ec4e. The focused integration diagnostic has 12 passing and 3 failing tests; run-cli.core.pr-conflict-rework.test.ts:842 fails because the expected legacy adoption route is unavailable. Confirm the exact route and cause before changing behavior. The integration writer persists the handoff on the base checkout, while task route hydration redirects readers to the task worktree. Real task handoff show from a worktree also failed to find the base-owned INTEGRATOR artifact. Cover one complete scenario: persisted protected-base handoff, task-worktree route/show/resume reads, explicit legacy adoption where applicable, repeat read/recovery, and the next transition. Use existing task execution ownership and base resolution. Reject wrong task, branch, head, base, PR identity, malformed or ambiguous evidence. Preserve direct and worktree-local handoff behavior. Keep read-only probes non-mutating. Do not copy or rewrite lifecycle artifacts, introduce a new state store, relax authority or exact-identity guards, change required CI, alter release/Core order, or implement AP-CORE-013. Scope the smallest necessary shared handoff reader, route/PR-flow consumers, and regression tests through a structured plan. The other two diagnostic failures, incident verification target and provider-neutral error wording, are separate causes and are out of scope. Run focused positive/negative/replay tests and full mandatory CI. The user authorized autonomous refactoring and supported exact operator approvals; release publication remains separate.

## Scope

- In scope: Repair the reproduced protected-integration handoff reader/owner mismatch on main db908ae90dd32609c6d12454fe87166a08e6ec4e. The focused integration diagnostic has 12 passing and 3 failing tests; run-cli.core.pr-conflict-rework.test.ts:842 fails because the expected legacy adoption route is unavailable. Confirm the exact route and cause before changing behavior. The integration writer persists the handoff on the base checkout, while task route hydration redirects readers to the task worktree. Real task handoff show from a worktree also failed to find the base-owned INTEGRATOR artifact. Cover one complete scenario: persisted protected-base handoff, task-worktree route/show/resume reads, explicit legacy adoption where applicable, repeat read/recovery, and the next transition. Use existing task execution ownership and base resolution. Reject wrong task, branch, head, base, PR identity, malformed or ambiguous evidence. Preserve direct and worktree-local handoff behavior. Keep read-only probes non-mutating. Do not copy or rewrite lifecycle artifacts, introduce a new state store, relax authority or exact-identity guards, change required CI, alter release/Core order, or implement AP-CORE-013. Scope the smallest necessary shared handoff reader, route/PR-flow consumers, and regression tests through a structured plan. The other two diagnostic failures, incident verification target and provider-neutral error wording, are separate causes and are out of scope. Run focused positive/negative/replay tests and full mandatory CI. The user authorized autonomous refactoring and supported exact operator approvals; release publication remains separate.
- Out of scope: unrelated refactors not required for "Resolve protected integration handoffs from their owning checkout".

## Verification

- State: ok
- Note: Verified: CLI-owned checks passed before independent EVALUATOR review.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-08-27T21:37:59.785Z
- Branch: task/202608272129-DVS5NN/resolve-protected-integration-handoffs-from-thei
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../cli/run-cli.core.pr-conflict-rework.test.ts    |   4 +-
 .../src/cli/run-cli.core.task-handoff.test.ts      |  86 +++++++++++
 packages/agentplane/src/commands/pr/flow-status.ts |  12 +-
 .../commands/shared/task-handoff-reader.test.ts    | 160 +++++++++++++++++++++
 .../src/commands/shared/task-handoff-reader.ts     |  77 ++++++++++
 .../src/commands/task/handoff-show.command.ts      |  36 ++++-
 .../agentplane/src/commands/task/handoff.shared.ts |  27 ++--
 7 files changed, 378 insertions(+), 24 deletions(-)
```

</details>
