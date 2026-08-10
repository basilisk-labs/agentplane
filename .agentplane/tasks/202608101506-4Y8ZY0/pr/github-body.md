Task: `202608101506-4Y8ZY0`
Title: Accept safe shell-free Bun test checks in supervised verification
Canonical task record: `.agentplane/tasks/202608101506-4Y8ZY0/README.md`

## Summary

Accept safe shell-free Bun test checks in supervised verification

The supervisor currently accepts only three-token bun run scripts and rejects valid repository checks such as bun test packages/agentplane/src/cli/run-cli.core.task-advance.test.ts. Reuse the existing shell-free argv parser, accept bounded Bun run and test invocations without invoking a shell, preserve fixed policy checks and evidence capture, and prove that task advance no longer creates false implementation-rework cycles for valid Bun tests.

## Scope

- In scope: The supervisor currently accepts only three-token bun run scripts and rejects valid repository checks such as bun test packages/agentplane/src/cli/run-cli.core.task-advance.test.ts. Reuse the existing shell-free argv parser, accept bounded Bun run and test invocations without invoking a shell, preserve fixed policy checks and evidence capture, and prove that task advance no longer creates false implementation-rework cycles for valid Bun tests.
- Out of scope: unrelated refactors not required for "Accept safe shell-free Bun test checks in supervised verification".

## Verification

- State: needs_rework
- Note:

```text
Rework: Declared check failed: bun test
packages/agentplane/src/commands/task/direct-task-verification.test.ts
packages/agentplane/src/cli/run-cli.core.task-advance.test.ts
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-08-10T15:35:05.028Z
- Branch: task/202608101506-4Y8ZY0/accept-safe-shell-free-bun-test-checks-in-superv
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../src/cli/run-cli.core.task-advance.test.ts      |  8 +-
 .../src/commands/shared/pr-meta/verify-log.ts      | 30 +++----
 .../commands/task/direct-task-verification.test.ts | 91 ++++++++++++++++++++--
 .../src/commands/task/direct-task-verification.ts  | 47 ++++++++---
 4 files changed, 144 insertions(+), 32 deletions(-)
```

</details>
