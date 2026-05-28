Task: `202605281745-F1A522`
Title: Respect ignored tasks.json in hooks
Canonical task record: `.agentplane/tasks/202605281745-F1A522/README.md`

## Summary

Respect ignored tasks.json in hooks

Fix Git hook task-protection behavior from GitHub issue #4188 so ignored .agentplane/tasks.json does not require AGENTPLANE_ALLOW_TASKS unless tracked or explicitly staged.

## Scope

- In scope: Fix Git hook task-protection behavior from GitHub issue #4188 so ignored .agentplane/tasks.json does not require AGENTPLANE_ALLOW_TASKS unless tracked or explicitly staged.
- Out of scope: unrelated refactors not required for "Respect ignored tasks.json in hooks".

## Verification

- State: ok
- Note:

```text
Verified issue #4188 hook behavior fix. Focused hook/protected-path tests passed; format:changed,
typecheck, policy routing, and doctor passed.
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-28T17:46:18.377Z
- Branch: task/202605281745-F1A522/respect-ignored-tasks-json-in-hooks
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../src/cli/run-cli.core.hooks.pre-commit.test.ts  | 56 ++++++++++++++++++++++
 .../agentplane/src/policy/rules/protected-paths.ts | 32 ++++++++++++-
 2 files changed, 87 insertions(+), 1 deletion(-)
```

</details>
