Task: `202608280529-59VB06`
Title: Recover stale evaluator exchanges without accepting obsolete verdicts
Canonical task record: `.agentplane/tasks/202608280529-59VB06/README.md`

## Summary

Recover stale evaluator exchanges without accepting obsolete verdicts

On integrated main 844eff36ba407436c26a3c63346b0dcc384ce2b5, continuation of DVS5NN PR #5862 is blocked by an issued quality_review exchange whose result is stale. The read-only evaluator prepared four task-owned evidence files while the legacy task was DONE, then exact result acceptance rejected the changed route fingerprint. Repeating task advance or task advance --replacement re-enters recoverPendingExternalAgentResult and rejects the same old result before replacement handling. The original result, frozen evidence and journal must remain intact. Reproduce the full sequence with real Git: evaluator issuance, preparation-owned artifacts, a genuine state change, stale result rejection, fresh packet recovery, retry and next transition. Separate framework-owned preparation changes from genuine task, plan, HEAD, provider or authority changes; do not weaken exact freshness or accept old verdicts for changed inputs. Use existing supervisor journal retirement and replacement mechanisms, with one owner and compare-and-swap guards. Preserve immutable historical results and required WorkItem completion. Prove ordinary evaluator acceptance, no-result and returned-result interruption recovery, repeated continuation, changed evidence rejection and no false DONE. Fix only the demonstrated bounded evaluator exchange/recovery cause. Do not modify task state or journals manually, create a new state store, bypass checks, change required CI, copy verdicts, or broaden release/Core architecture. DVS5NN and CFKR4P integration retain priority; CFKR4P full verification is running and must not be interrupted. This is a necessary authorized integration-path blocker, not new release scope. Release publication remains separately qualified. User has authorized all in-scope operations through release.

## Scope

- In scope: On integrated main 844eff36ba407436c26a3c63346b0dcc384ce2b5, continuation of DVS5NN PR #5862 is blocked by an issued quality_review exchange whose result is stale. The read-only evaluator prepared four task-owned evidence files while the legacy task was DONE, then exact result acceptance rejected the changed route fingerprint. Repeating task advance or task advance --replacement re-enters recoverPendingExternalAgentResult and rejects the same old result before replacement handling. The original result, frozen evidence and journal must remain intact. Reproduce the full sequence with real Git: evaluator issuance, preparation-owned artifacts, a genuine state change, stale result rejection, fresh packet recovery, retry and next transition. Separate framework-owned preparation changes from genuine task, plan, HEAD, provider or authority changes; do not weaken exact freshness or accept old verdicts for changed inputs. Use existing supervisor journal retirement and replacement mechanisms, with one owner and compare-and-swap guards. Preserve immutable historical results and required WorkItem completion. Prove ordinary evaluator acceptance, no-result and returned-result interruption recovery, repeated continuation, changed evidence rejection and no false DONE. Fix only the demonstrated bounded evaluator exchange/recovery cause. Do not modify task state or journals manually, create a new state store, bypass checks, change required CI, copy verdicts, or broaden release/Core architecture. DVS5NN and CFKR4P integration retain priority; CFKR4P full verification is running and must not be interrupted. This is a necessary authorized integration-path blocker, not new release scope. Release publication remains separately qualified. User has authorized all in-scope operations through release.
- Out of scope: unrelated refactors not required for "Recover stale evaluator exchanges without accepting obsolete verdicts".

## Verification

- State: pending
- Note: Not recorded yet.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-08-28T05:33:24.733Z
- Branch: task/202608280529-59VB06/recover-stale-evaluator-exchanges-without-accept
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 ...li.core.task-advance.evaluator-recovery.test.ts | 363 +++++++++++++++++++++
 .../task/external-agent-evaluator-recovery.test.ts |  48 +++
 .../task/external-agent-evaluator-recovery.ts      | 120 +++++++
 .../task/external-agent-supervisor-recovery.ts     |   8 +
 4 files changed, 539 insertions(+)
```

</details>
