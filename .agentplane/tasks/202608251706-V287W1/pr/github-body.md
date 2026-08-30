Task: `202608251706-V287W1`
Title: AP-RUNTIME-001 Make local execution runtime deterministic
Canonical task record: `.agentplane/tasks/202608251706-V287W1/README.md`

## Summary

AP-RUNTIME-001 Make local execution runtime deterministic

Observed symptom: verification can report `bun: command not found` even though Bun is installed and available on the host. The violated invariant is that verification of the same execution contract on the same repository state must not depend on the parent shell PATH.

Confirm the root cause across agents, Supervisor, verification, and recovery subprocess production paths; do not assume Supervisor is the sole owner. Implement one centralized executable resolver and normalized local runtime environment shared by those local paths by default. Explicit runtime profiles and task or execution overrides take precedence. Do not encode user-specific absolute paths or create per-agent PATH configuration as the default. Distinguish executable-resolution or environment failure from implementation or test failure; split a follow-up Task if typed classification requires a separate architectural change.

## Scope

- In scope: trace executable and environment propagation through the production launch paths for agents, Supervisor, verification, and recovery subprocesses; define and implement one shared local runtime resolver; preserve inherited host PATH entries while adding supported standard runtime locations deterministically; enforce precedence for explicit runtime profiles and task or execution overrides; emit enough structured evidence to distinguish resolution failure from implementation or test failure; add production-path regressions for reduced PATH and true executable absence.
- Required invariant: verification of one execution contract on one repository state does not change solely because AgentPlane was launched from a different parent shell PATH.
- Required regression: launch the production execution path with a deliberately reduced parent PATH and an isolated fixture home containing Bun in a supported standard location; prove the resolved Bun is executed.
- Required fail-closed regression: remove Bun from both PATH and every supported standard location; prove no unrelated executable is selected and the outcome is an explicit infrastructure or executable-resolution failure, not an implementation failure.
- Out of scope: user-specific absolute paths; per-agent PATHs as the default model; container or remote runtime unification; release 0.7.8 scope; redesign of the full verification-result taxonomy when it can be isolated as a follow-up Task.

## Verification

- State: ok
- Note:

```text
Verified: full local CI and 34 control tests passed after semantic conflict resolution at 26b69b0fe;
hosted integration remains pending.
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-08-30T03:41:12.713Z
- Branch: task/202608251706-V287W1/ap-runtime-001-make-local-execution-runtime-dete
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 docs/developer/harness-dev.mdx                     |  58 +++++++
 .../src/commands/shared/pr-meta/verify-log.test.ts |   9 +-
 .../src/commands/shared/pr-meta/verify-log.ts      |  19 ++-
 .../commands/task/direct-task-verification.test.ts |  27 ++++
 .../src/commands/task/direct-task-verification.ts  |  26 +++-
 .../src/runner/adapters/custom-security.test.ts    |  58 ++++++-
 packages/agentplane/src/runner/artifacts.ts        |   8 +
 .../agentplane/src/runner/execution-receipt.ts     |  17 ++-
 .../src/runner/process-supervision/result.ts       |  42 ++++++
 .../src/runner/process-supervision/run.ts          |  45 ++----
 .../src/runner/process-supervision/state.ts        |   3 +
 .../src/runner/runtime-env.integration.test.ts     | 166 +++++++++++++++++++++
 packages/agentplane/src/runner/types/state.ts      |   2 +
 packages/agentplane/src/shared/runtime-env.test.ts | 104 ++++++++++++-
 packages/agentplane/src/shared/runtime-env.ts      | 165 +++++++++++++++-----
 15 files changed, 653 insertions(+), 96 deletions(-)
```

</details>
