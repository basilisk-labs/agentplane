Task: `202605240656-1AMYBB`
Title: Harden direct-mode hook publication recovery
Canonical task record: `.agentplane/tasks/202605240656-1AMYBB/README.md`

## Summary

Harden direct-mode hook publication recovery

Fix GitHub issue #4119 by decomposing direct-mode hook publication friction into runtime/script diagnostics and a taskless deploy-fix recovery path that does not require --no-verify.

## Scope

- In scope: Fix GitHub issue #4119 by decomposing direct-mode hook publication friction into runtime/script diagnostics and a taskless deploy-fix recovery path that does not require --no-verify.
- Out of scope: unrelated refactors not required for "Harden direct-mode hook publication recovery".

## Verification

- State: ok
- Note:

```text
Command: independent review of diff and recorded checks; Result: pass; Evidence: task adds
constrained deploy-fix evidence route, optional-script skip parity in repository pre-push helper,
and focused hook tests covering acceptance and rejection paths. Scope: quality review for PR #4126
before hosted checks complete.
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-24T06:58:58.479Z
- Branch: task/202605240656-1AMYBB/harden-direct-mode-hook-publication-recovery
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../src/cli/run-cli.core.hooks.hook-run.test.ts    | 58 ++++++++++++++
 ...un-cli.core.hooks.pre-push-task-binding.test.ts | 47 +++++++++++
 .../src/commands/hooks/run.commit-msg.ts           |  1 +
 .../agentplane/src/commands/hooks/run.pre-push.ts  | 12 +++
 packages/agentplane/src/policy/model.ts            |  1 +
 .../src/policy/rules/task-bound-mutation.ts        | 16 +++-
 scripts/checks/run-pre-push-hook.mjs               | 92 +++++++++++++++++-----
 7 files changed, 207 insertions(+), 20 deletions(-)
```

</details>
