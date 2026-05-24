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

```bash
ap task verify-show 202605240656-1AMYBB; Result: pass; Evidence: task-specific Verify Steps are \
  present and blueprint snapshot is current. Scope: task verification contract. Command: bunx vitest \
  run packages/agentplane/src/cli/run-cli.core.hooks.hook-run.test.ts \
  packages/agentplane/src/cli/run-cli.core.hooks.pre-push-task-binding.test.ts --hookTimeout 60000 \
  --testTimeout 60000; Result: pass; Evidence: 2 files passed, 38 tests passed. Scope: \
  commit-msg/pre-push hook behavior. Command: bunx prettier --check changed hook/policy/test files; \
  Result: pass; Evidence: All matched files use Prettier code style. Scope: changed files. Command: \
  node .agentplane/policy/check-routing.mjs; Result: pass; Evidence: policy routing OK. Scope: \
  gateway policy routing. Command: ap doctor; Result: pass; Evidence: doctor OK with warnings=2 for \
  pre-existing branch_pr reconciliation on 202605230451-N5F0HY. Scope: repo runtime/workflow health.
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
