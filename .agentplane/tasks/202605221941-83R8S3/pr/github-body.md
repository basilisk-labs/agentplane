Task: `202605221941-83R8S3`
Title: Classify amended task-branch pre-push scope from base
Canonical task record: `.agentplane/tasks/202605221941-83R8S3/README.md`

## Summary

Classify amended task-branch pre-push scope from base

Prevent pre-push local CI from misclassifying amended or force-pushed task branches as docs-only when the branch still contains code changes by selecting changed files against the task branch base/merge-base instead of only remoteSha..localSha.

## Scope

- In scope: Prevent pre-push local CI from misclassifying amended or force-pushed task branches as docs-only when the branch still contains code changes by selecting changed files against the task branch base/merge-base instead of only remoteSha..localSha.
- Out of scope: unrelated refactors not required for "Classify amended task-branch pre-push scope from base".

## Verification

- State: ok
- Note:

```text
Reworked regression tests to avoid process.chdir in worker threads; focused selection test, eslint,
and typecheck pass locally.
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-22T19:44:05.424Z
- Branch: task/202605221941-83R8S3/task-branch-prepush-base-scope
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../agentplane/src/cli/local-ci-selection.test.ts  | 77 ++++++++++++++++++++++
 scripts/lib/pre-push-scope.mjs                     | 40 ++++++++++-
 2 files changed, 115 insertions(+), 2 deletions(-)
```

</details>
