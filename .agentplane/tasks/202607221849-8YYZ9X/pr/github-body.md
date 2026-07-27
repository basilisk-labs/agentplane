Task: `202607221849-8YYZ9X`
Title: Execute and calibrate EVALUATOR episodes
Canonical task record: `.agentplane/tasks/202607221849-8YYZ9X/README.md`

## Summary

Execute and calibrate EVALUATOR episodes

RF-12b: launch a read-only EVALUATOR against the prepared work order, apply its typed result, turn rework into the next semantic episode, and calibrate human escalation on golden scenarios.

## Scope

- In scope: evaluator adapter invocation, result application, rework/blocked/human-review transitions, evidence-linked findings, stale-result rejection, no-write enforcement, calibration fixtures, and human escalation policy.
- Out of scope: a general benchmarking product; full evaluation-platform work remains outside the 0.7 task-level safety primitive.

## Verification

- State: needs_rework
- Note:

```text
Focused calibration, compatibility, type, lint, build, and critical CLI checks pass; the real
read-only Codex episode failed before a typed response.
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-07-27T16:23:01.398Z
- Branch: task/202607221849-8YYZ9X/execute-and-calibrate-evaluator-episodes
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .agentplane/agents/EVALUATOR.json                  |   8 +-
 docs/user/cli-reference.generated.mdx              |  16 +
 docs/user/commands.mdx                             |  20 +-
 docs/user/task-lifecycle.mdx                       |   8 +-
 packages/agentplane/assets/AGENTS.md               |   4 +-
 packages/agentplane/assets/agents/EVALUATOR.json   |   8 +-
 .../src/cli/run-cli/command-catalog/project.ts     |   2 +
 .../evaluator-episode.calibration.test.ts          | 378 +++++++++++++++++++++
 .../src/commands/evaluator/evaluator-episode.ts    | 368 ++++++++++++++++++++
 .../evaluator/evaluator-quality-artifacts.ts       |   5 +-
 .../commands/evaluator/evaluator-review-apply.ts   |  58 ++++
 .../commands/evaluator/evaluator-review-usecase.ts |   4 +-
 .../src/commands/evaluator/evaluator.command.ts    |  46 +++
 .../src/commands/evaluator/evaluator.spec.ts       |  45 ++-
 .../src/runtime/sgr/contract-evaluator-routing.ts  |  10 +-
 .../agentplane/src/runtime/sgr/contract-types.ts   |   2 +-
 .../src/shared/builtin-assets.generated.ts         |   8 +-
 .../baselines/v0.7-compatibility-candidate.json    | 130 +++++--
 .../check-compatibility-contract-baseline.mjs      | 103 +++++-
 19 files changed, 1153 insertions(+), 70 deletions(-)
```

</details>
