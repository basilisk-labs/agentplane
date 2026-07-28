Task: `202607281655-YMPY8Y`
Title: Authorize replacement evaluator episodes after terminal failure
Canonical task record: `.agentplane/tasks/202607281655-YMPY8Y/README.md`

## Summary

Authorize replacement evaluator episodes after terminal failure

Allow an explicitly authorized replacement evaluator episode after a terminal operation_failed journal without reopening or mutating the failed operation. Preserve durable history, usage, and effect-in-doubt fail-closed behavior so a pre-provider failure does not permanently block an independent semantic review.

## Scope

- In scope: Allow an explicitly authorized replacement evaluator episode after a terminal operation_failed journal without reopening or mutating the failed operation. Preserve durable history, usage, and effect-in-doubt fail-closed behavior so a pre-provider failure does not permanently block an independent semantic review.
- Out of scope: unrelated refactors not required for "Authorize replacement evaluator episodes after terminal failure".

## Verification

- State: ok
- Note:

```text
Rework verification passed: 19 focused supervisor/evaluator tests, typecheck, changed-format, policy
routing, and diff check. Task metadata now freezes these commands; the real replacement provider
episode for 202607221850-8HBF4J remains an explicit post-integration proof.
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-07-28T16:57:08.231Z
- Branch: task/202607281655-YMPY8Y/authorize-replacement-evaluator-episodes-after-t
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../evaluator/evaluator-execute-supervisor.ts      |  66 ++++-
 .../evaluator/evaluator-execute.command.test.ts    | 320 ++++++++++++++++++++-
 .../src/commands/evaluator/evaluator.command.ts    |   1 +
 .../src/commands/evaluator/evaluator.spec.ts       |   9 +
 .../shared/supervisor-execution-episode.ts         | 133 +++++++--
 .../runner/supervisor-execution-episode.test.ts    | 128 +++++++++
 .../src/runner/supervisor-execution-episode.ts     | 102 ++++++-
 packages/core/src/schemas/index.ts                 |   1 +
 8 files changed, 723 insertions(+), 37 deletions(-)
```

</details>
