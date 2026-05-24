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
Command: review-thread fix for PR #4126 discussion_r3294046432; Result: pass; Evidence: MJS and
installed TypeScript pre-push paths now return empty scripts only when package.json is absent, and
fail when existing package.json cannot be parsed. Command: bun run --filter=agentplane build;
Result: pass; Evidence: agentplane bundle built successfully after the HookFailure return fix.
Command: bunx vitest run packages/agentplane/src/cli/run-cli.core.hooks.runtime-shim.test.ts
packages/agentplane/src/cli/run-cli.core.hooks.pre-push-task-binding.test.ts --hookTimeout 60000
--testTimeout 60000; Result: pass; Evidence: 2 files passed, 19 tests passed. Command: bun run
hotspots:check; Result: pass; Evidence: hotspot threshold and oversized-test baseline OK. Command:
bunx prettier --check changed review-fix files; Result: pass. Command: node
.agentplane/policy/check-routing.mjs; Result: pass.
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-24T06:58:58.479Z
- Branch: task/202605240656-1AMYBB/harden-direct-mode-hook-publication-recovery
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../src/cli/run-cli.core.hooks.deploy-fix.test.ts  | 72 +++++++++++++++++
 ...un-cli.core.hooks.pre-push-task-binding.test.ts | 47 +++++++++++
 .../src/commands/hooks/run.commit-msg.ts           |  1 +
 .../agentplane/src/commands/hooks/run.pre-push.ts  | 64 +++++++--------
 packages/agentplane/src/policy/model.ts            |  1 +
 .../src/policy/rules/task-bound-mutation.ts        | 16 +++-
 scripts/checks/run-pre-push-hook.mjs               | 92 +++++++++++++++++-----
 7 files changed, 238 insertions(+), 55 deletions(-)
```

</details>
