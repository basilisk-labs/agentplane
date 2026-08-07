Task: `202608061742-G2ZA4T`
Title: Redesign init around safe defaults and progressive disclosure
Canonical task record: `.agentplane/tasks/202608061742-G2ZA4T/README.md`

## Summary

Redesign init around safe defaults and progressive disclosure

Replace the long upfront questionnaire with a short user-first init path that detects repository defaults, asks only decisions that materially change policy or workflow, provides an advanced configuration path, and prints a first-task next step.

## Scope

- In scope: Replace the long upfront questionnaire with a short user-first init path that detects repository defaults, asks only decisions that materially change policy or workflow, provides an advanced configuration path, and prints a first-task next step.
- Out of scope: unrelated refactors not required for "Redesign init around safe defaults and progressive disclosure".

## Verification

- State: ok
- Note:

```text
Progressive init is verified on the qualified user-first intake base with complete deterministic
evidence and a clean worktree.
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-08-06T23:24:02.615Z
- Branch: task/202608061742-G2ZA4T/redesign-init-around-safe-defaults-and-progressi
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 docs/user/cli-reference.generated.mdx              |   4 +-
 docs/user/setup.mdx                                |  53 ++++--
 .../src/cli/run-cli.core.init.interactive.test.ts  | 151 +++++++++++++---
 .../agentplane/src/cli/run-cli.core.init.test.ts   |  43 ++++-
 .../src/cli/run-cli/commands/init/answers.ts       | 194 ++++++++++++++++++---
 .../cli/run-cli/commands/init/execution.test.ts    |   1 +
 .../src/cli/run-cli/commands/init/execution.ts     |   4 +
 .../src/cli/run-cli/commands/init/init-plan.ts     |   7 +-
 .../src/cli/run-cli/commands/init/model.ts         |   1 +
 .../src/cli/run-cli/commands/init/modes.ts         |   9 +-
 .../src/cli/run-cli/commands/init/orchestrate.ts   |  24 ++-
 .../run-cli/commands/init/repository-defaults.ts   | 128 ++++++++++++++
 .../src/cli/run-cli/commands/init/spec.ts          |   7 +-
 .../cli/run-cli/commands/init/steps/contracts.ts   |   6 +-
 .../src/cli/run-cli/commands/init/steps/index.ts   |   2 +
 .../cli/run-cli/commands/init/steps/init-mode.ts   |  34 ++++
 .../commands/init/steps/prompt-steps.test.ts       |  32 +++-
 .../src/cli/run-cli/commands/init/steps/tool.ts    |  38 ++++
 .../cli/run-cli/commands/init/steps/workflow.ts    |   9 +-
 .../agentplane/src/cli/run-cli/commands/init/ui.ts |   9 +-
 20 files changed, 671 insertions(+), 85 deletions(-)
```

</details>
