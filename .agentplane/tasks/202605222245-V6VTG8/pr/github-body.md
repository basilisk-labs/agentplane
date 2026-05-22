Task: `202605222245-V6VTG8`
Title: Narrow pre-push PR-flow test selection for small integrate changes
Canonical task record: `.agentplane/tasks/202605222245-V6VTG8/README.md`

## Summary

Narrow pre-push PR-flow test selection for small integrate changes

A small protected-base integrate transport change triggered the pre-push fast CI targeted pr selector to run the broad pr-flow Vitest bucket and hang for more than ten minutes. Tighten changed-file routing so focused integrate internals and cmd tests do not fan out to unrelated PR lifecycle suites, or add a bounded timeout/reporting guard for that selector.

## Scope

- In scope: A small protected-base integrate transport change triggered the pre-push fast CI targeted pr selector to run the broad pr-flow Vitest bucket and hang for more than ten minutes. Tighten changed-file routing so focused integrate internals and cmd tests do not fan out to unrelated PR lifecycle suites, or add a bounded timeout/reporting guard for that selector.
- Out of scope: unrelated refactors not required for "Narrow pre-push PR-flow test selection for small integrate changes".

## Verification

- State: ok
- Note:

```text
Evaluator check: pre-push routing is narrowed by path-specific PR integrate bucket while generic PR
paths still keep the existing pr bucket; regression coverage asserts pr-flow suites are excluded for
integrate internals.
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-22T22:48:31.426Z
- Branch: task/202605222245-V6VTG8/narrow-pr-integrate-ci-selection
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../agentplane/src/cli/local-ci-selection.test.ts  | 23 ++++++++++++++++++++++
 scripts/lib/local-ci-selection.d.ts                |  2 ++
 scripts/lib/local-ci-selection.mjs                 | 23 ++++++++++++++++++++++
 scripts/lib/test-route-registry.mjs                | 10 ++++++++++
 4 files changed, 58 insertions(+)
```

</details>
