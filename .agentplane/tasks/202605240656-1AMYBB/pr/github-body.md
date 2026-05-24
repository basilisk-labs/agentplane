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
Command: bunx vitest run packages/agentplane/src/cli/run-cli.core.hooks.deploy-fix.test.ts
packages/agentplane/src/cli/run-cli.core.hooks.hook-run.test.ts
packages/agentplane/src/cli/run-cli.core.hooks.pre-push-task-binding.test.ts --hookTimeout 60000
--testTimeout 60000; Result: pass; Evidence: 3 files passed, 38 tests passed. Scope: deploy-fix,
commit-msg, and pre-push hook behavior. Command: bun run hotspots:check; Result: pass; Evidence:
runtime hotspot threshold and oversized-test baseline OK after splitting deploy-fix tests. Scope:
size guard. Command: bunx prettier --check changed hook/policy/test files; Result: pass; Evidence:
Prettier accepted changed files. Scope: changed files. Command: node
.agentplane/policy/check-routing.mjs; Result: pass; Evidence: policy routing OK. Scope: gateway
routing. Command: ap doctor; Result: pass; Evidence: doctor OK with pre-existing branch_pr
reconciliation warnings unrelated to this task. Scope: runtime/workflow health.
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
