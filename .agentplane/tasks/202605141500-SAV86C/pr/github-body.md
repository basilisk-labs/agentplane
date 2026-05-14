Task: `202605141500-SAV86C`
Title: Allow initial install commit through pre-push
Canonical task record: `.agentplane/tasks/202605141500-SAV86C/README.md`

## Summary

Allow initial install commit through pre-push

Fix the task-bound pre-push audit so the AgentPlane-managed initial install commit created by agentplane init can be pushed, then audit adjacent bootstrap/hook exceptions for similar contract gaps.

## Scope

- In scope: Fix the task-bound pre-push audit so the AgentPlane-managed initial install commit created by agentplane init can be pushed, then audit adjacent bootstrap/hook exceptions for similar contract gaps.
- Out of scope: unrelated refactors not required for "Allow initial install commit through pre-push".

## Verification

- State: ok
- Note:

```text
Implemented a narrow managed initial install commit exception in both pre-push implementations and
added regression coverage proving fresh install commits pass while install-like subjects touching
src remain blocked. Checks passed: pre-push task-binding Vitest 7/7, runtime-shim Vitest 5/5,
Prettier check, ESLint on touched files, typecheck after bootstrap, and policy routing. Audit
finding: context init uses synthetic CTX1NT bootstrap commit and may have a similar first-push edge;
it needs a separate focused reproduction because the temp hook simulation was dominated by
package-script resolution noise.
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-14T15:24:28.289Z
- Branch: task/202605141500-SAV86C/init-install-prepush
- Head: f8e9d536b1b5

```text
 ...un-cli.core.hooks.pre-push-task-binding.test.ts | 45 ++++++++++++++++++++++
 .../agentplane/src/commands/hooks/run.pre-push.ts  | 31 +++++++++++++++
 scripts/checks/run-pre-push-hook.mjs               | 31 +++++++++++++++
 3 files changed, 107 insertions(+)
```

</details>
