Task: `202605230049-AFT9YW`
Title: Narrow hosted close PR local CI route
Canonical task record: `.agentplane/tasks/202605230049-AFT9YW/README.md`

## Summary

Narrow hosted close PR local CI route

task hosted-close-pr source/test changes currently select full-fast pre-push even when the touched files map to the hosted close PR helper. Add a targeted local CI bucket for hosted-close-pr paths so agents run the hosted-close/hosted-close-pr focused suite instead of the full fast sweep.

## Scope

- In scope: task hosted-close-pr source/test changes currently select full-fast pre-push even when the touched files map to the hosted close PR helper. Add a targeted local CI bucket for hosted-close-pr paths so agents run the hosted-close/hosted-close-pr focused suite instead of the full fast sweep.
- Out of scope: unrelated refactors not required for "Narrow hosted close PR local CI route".

## Verification

- State: ok
- Note:

```text
Addressed PR review: hosted-close-pr bucket now matches only hosted-close-pr files, while non-PR
hosted-close command paths remain on the generic task route. Re-ran selector tests, route smoke,
lint, and format.
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-23T00:54:59.809Z
- Branch: task/202605230049-AFT9YW/hosted-close-pr-ci-route
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../agentplane/src/cli/local-ci-selection.test.ts  | 27 ++++++++++++++++++++++
 scripts/lib/local-ci-selection.d.ts                |  1 +
 scripts/lib/local-ci-selection.mjs                 | 26 +++++++++++++++++++++
 scripts/lib/test-route-registry.mjs                |  7 ++++++
 4 files changed, 61 insertions(+)
```

</details>
