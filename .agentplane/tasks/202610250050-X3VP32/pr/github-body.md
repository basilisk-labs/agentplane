Task: `202610250050-X3VP32`
Title: Guard canonical local lifecycle against unresolved external-agent intent
Canonical task record: `.agentplane/tasks/202610250050-X3VP32/README.md`

## Summary

Guard canonical local lifecycle against unresolved external-agent intent

For release 0.7.13, carry forward the independently reviewed PR #6920 generic fail-closed read-only recovery patch and call the same strict recovery guard before canonical local lifecycle operation admission, including task.pre_merge_close. Retire only an exact drifted unanswered read-only observation through historical identity and exchange-first journal CAS, then require native replacement. Block every ineligible unresolved external-agent intent before local operation admission and execution, including unchanged, result-present, mutation-authorized, malformed and unrelated states. Preserve normal local operation behavior when no unresolved intent exists. Add zero-dispatch regressions. No Factory-specific adapter, manual journal edit, weakened verification or hotspot exception.

## Scope

- In scope: For release 0.7.13, carry forward the independently reviewed PR #6920 generic fail-closed read-only recovery patch and call the same strict recovery guard before canonical local lifecycle operation admission, including task.pre_merge_close. Retire only an exact drifted unanswered read-only observation through historical identity and exchange-first journal CAS, then require native replacement. Block every ineligible unresolved external-agent intent before local operation admission and execution, including unchanged, result-present, mutation-authorized, malformed and unrelated states. Preserve normal local operation behavior when no unresolved intent exists. Add zero-dispatch regressions. No Factory-specific adapter, manual journal edit, weakened verification or hotspot exception.
- Out of scope: unrelated refactors not required for "Guard canonical local lifecycle against unresolved external-agent intent".

## Verification

- State: ok
- Note: Verified: CLI-owned declared checks passed; independent EVALUATOR review is pending.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-10-25T18:29:52.301Z
- Branch: task/202610250050-X3VP32/guard-canonical-local-lifecycle-against-unresolv
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../kernel-provider-effect-coordinator.test.ts     | 32 ++++++++++++++++++++++
 .../task/kernel-provider-effect-coordinator.ts     | 11 ++++++++
 2 files changed, 43 insertions(+)
```

</details>
