Task: `202610071048-M8PX0X`
Title: Give native release CI verification its bounded release timeout
Canonical task record: `.agentplane/tasks/202610071048-M8PX0X/README.md`

## Summary

Give native release CI verification its bounded release timeout

Release 0.7.13 candidate qualification reached release:ci-check extras after contract, clone and package installation passed, but native direct verification killed its parent at the default 30-minute deadline. The bounded release suite needs the existing 150-minute release budget. Add only release:ci-check to the script-specific timeout map, matching release:prepublish. Preserve all commands, assertions, default timeout for unrelated scripts, and explicit timeout_ms precedence. Add focused tests of the actual verifier invocation for the declared command, a shorter explicit timeout, and unrelated command default. Do not bypass checks, import manual PASS evidence, increase global timeouts, or change process lifecycle behavior. Native evaluator, full verification and branch PR integration required; candidate is requalified afterward.

## Scope

- In scope: Release 0.7.13 candidate qualification reached release:ci-check extras after contract, clone and package installation passed, but native direct verification killed its parent at the default 30-minute deadline. The bounded release suite needs the existing 150-minute release budget. Add only release:ci-check to the script-specific timeout map, matching release:prepublish. Preserve all commands, assertions, default timeout for unrelated scripts, and explicit timeout_ms precedence. Add focused tests of the actual verifier invocation for the declared command, a shorter explicit timeout, and unrelated command default. Do not bypass checks, import manual PASS evidence, increase global timeouts, or change process lifecycle behavior. Native evaluator, full verification and branch PR integration required; candidate is requalified afterward.
- Out of scope: unrelated refactors not required for "Give native release CI verification its bounded release timeout".

## Verification

- State: pending
- Note: Not recorded yet.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-10-07T11:05:04.537Z
- Branch: task/202610071048-M8PX0X/give-native-release-ci-verification-its-bounded
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../direct-task-verification.qualification.test.ts | 36 ++++++++++++++++++++++
 .../src/commands/task/direct-task-verification.ts  |  1 +
 2 files changed, 37 insertions(+)
```

</details>
