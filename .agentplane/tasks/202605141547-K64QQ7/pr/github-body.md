Task: `202605141547-K64QQ7`
Title: Allow context init bootstrap through pre-push
Canonical task record: `.agentplane/tasks/202605141547-K64QQ7/README.md`

## Summary

Allow context init bootstrap through pre-push

Fix task-bound pre-push auditing so the managed context init bootstrap commit can be pushed when it contains only AgentPlane context bootstrap files, and add regression coverage that non-context paths with the same subject remain blocked.

## Scope

- In scope: Fix task-bound pre-push auditing so the managed context init bootstrap commit can be pushed when it contains only AgentPlane context bootstrap files, and add regression coverage that non-context paths with the same subject remain blocked.
- Out of scope: unrelated refactors not required for "Allow context init bootstrap through pre-push".

## Verification

- State: ok
- Note:

```text
Implemented managed context bootstrap pre-push evidence for the exact CTX1NT context-init commit
shape, constrained to .agentplane/context/**, context/**, and .gitignore. Regression coverage passed
for accepted context bootstrap commits and rejected non-context paths. Checks passed: pre-push
task-binding Vitest 9/9, Prettier touched files, ESLint touched files, typecheck, and policy
routing.
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-14T15:51:45.574Z
- Branch: task/202605141547-K64QQ7/context-bootstrap-prepush
- Head: 226d4a0f7921

```text
 ...un-cli.core.hooks.pre-push-task-binding.test.ts | 55 ++++++++++++++++++++++
 .../agentplane/src/commands/hooks/run.pre-push.ts  | 25 ++++++++++
 scripts/checks/run-pre-push-hook.mjs               | 22 +++++++++
 3 files changed, 102 insertions(+)
```

</details>
