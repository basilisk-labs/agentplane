Task: `202610142302-3PJHSP`
Title: Recover interrupted integration intent for completed canonical Task (issue6152)
Canonical task record: `.agentplane/tasks/202610142302-3PJHSP/README.md`

## Summary

Recover interrupted integration intent for completed canonical Task (issue6152)

Fix issue6152: canonical COMPLETED Task must have evidence-bound public integration.run_next not_applied reconciliation after proven interrupted own handoff, without fake implementation_rework or Task downgrade. Reuse existing --workflow-recovery schema, original identity/current fingerprint/operator evidence, supervisor lease/CAS and queue mutex. Reconciliation does not merge or replay. Preserve completed Task/WorkItems/accepted outputs/final evidence and original intent history. Release ONLY exact original own queue claim under explicit matching operator evidence; fail closed unknown or live writer, other queue owner, source/head/base/provider drift, stale fingerprint/journal or ambiguous merge. Journal resolution must become durable before queue release; crash between writes must retain fail-closed claim, and exact same evidence can finish only bookkeeping without duplicate effect. Do not clear claim then attempt journal CAS. Keep legacy rework gates unchanged. Separate fresh admission is required before any later integration worker. Extend nearest existing tests for canonical positive/history preservation, rejection safety, no provider writes/replay, and queue-release failure/idempotent recovery. Planning ONLY now; no implementation until ROOT reviews exact Plan/authority. No changes to BF/AP current tasks, queues, runtime or tools.

## Scope

- In scope: Fix issue6152: canonical COMPLETED Task must have evidence-bound public integration.run_next not_applied reconciliation after proven interrupted own handoff, without fake implementation_rework or Task downgrade. Reuse existing --workflow-recovery schema, original identity/current fingerprint/operator evidence, supervisor lease/CAS and queue mutex. Reconciliation does not merge or replay. Preserve completed Task/WorkItems/accepted outputs/final evidence and original intent history. Release ONLY exact original own queue claim under explicit matching operator evidence; fail closed unknown or live writer, other queue owner, source/head/base/provider drift, stale fingerprint/journal or ambiguous merge. Journal resolution must become durable before queue release; crash between writes must retain fail-closed claim, and exact same evidence can finish only bookkeeping without duplicate effect. Do not clear claim then attempt journal CAS. Keep legacy rework gates unchanged. Separate fresh admission is required before any later integration worker. Extend nearest existing tests for canonical positive/history preservation, rejection safety, no provider writes/replay, and queue-release failure/idempotent recovery. Planning ONLY now; no implementation until ROOT reviews exact Plan/authority. No changes to BF/AP current tasks, queues, runtime or tools.
- Out of scope: unrelated refactors not required for "Recover interrupted integration intent for completed canonical Task (issue6152)".

## Verification

- State: ok
- Note: Verified: canonical Task Kernel final checks passed.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-10-15T00:16:46.532Z
- Branch: task/202610142302-3PJHSP/recover-interrupted-integration-intent-for-compl
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../src/commands/task/advance.command.ts           |  23 +-
 .../task/external-agent-workflow-recovery.ts       | 226 ++++++++-
 .../commands/task/roadmap-common-recovery.test.ts  | 506 ++++++++++++++++++++-
 .../task/roadmap-integration-parity.test.ts        |  79 ++++
 4 files changed, 808 insertions(+), 26 deletions(-)
```

</details>
