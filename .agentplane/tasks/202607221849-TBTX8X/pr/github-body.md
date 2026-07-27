Task: `202607221849-TBTX8X`
Title: Prepare and apply typed evaluator results
Canonical task record: `.agentplane/tasks/202607221849-TBTX8X/README.md`

## Summary

Prepare and apply typed evaluator results

RF-12a/RF-25a: split evaluator into typed prepare and apply use cases over frozen task revision, evaluated SHA, actual diff, observed checks, acceptance, policy, blueprint, and knowledge evidence.

## Scope

- In scope: EvaluatorWorkOrder preparation, existing EvaluatorSgrResult validation, typed in-process prepare/apply results, read-only authority, frozen evidence, staleness rejection, finding evidence refs, and compatibility recording facade.
- Out of scope: launching/calibrating the EVALUATOR model episode, which is the next task.

## Verification

- State: pending
- Note: Not recorded yet.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-07-27T12:46:00.307Z
- Branch: task/202607221849-TBTX8X/prepare-and-apply-typed-evaluator-results
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 ...-cli.critical.agent-efficiency-baseline.test.ts |   7 +-
 .../src/cli/run-cli/command-catalog/project.ts     |   4 +
 .../evaluator/evaluator-quality-artifacts.ts       |  33 +-
 .../commands/evaluator/evaluator-review-apply.ts   | 211 ++++++++
 .../commands/evaluator/evaluator-review-usecase.ts | 558 +++++++++++++++++++++
 .../evaluator/evaluator-run.command.test.ts        | 169 ++++++-
 .../src/commands/evaluator/evaluator.command.ts    | 396 ++++++++-------
 .../src/commands/evaluator/evaluator.spec.ts       |  97 +++-
 .../baselines/v0.7-compatibility-candidate.json    | 149 +++++-
 .../check-compatibility-contract-baseline.mjs      |  85 ++++
 10 files changed, 1503 insertions(+), 206 deletions(-)
```

</details>
