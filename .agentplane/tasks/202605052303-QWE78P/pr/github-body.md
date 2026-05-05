Task: `202605052303-QWE78P`
Title: Validate blueprint plan policy budgets

## Summary

Validate blueprint plan policy budgets

Add validation that materialized blueprint plans do not report policy modules outside the selected blueprint contract or exceed context budget, without executing blueprint states.

## Scope

- In scope: Add validation that materialized blueprint plans do not report policy modules outside the selected blueprint contract or exceed context budget, without executing blueprint states.
- Out of scope: unrelated refactors not required for "Validate blueprint plan policy budgets".

## Verification

- State: ok
- Note: Implemented and tested blueprint plan policy budget validation.
- Full verification checklist lives in local review.md.

## Handoff Notes

- 2026-05-05T23:13:27Z CODER: Batch scope includes dependent tasks 202605052303-N37XQ0, 202605052303-FXGCNC, and 202605052303-1CEGJD. The PR covers blueprint plan policy budget validation, plan state transition validation, task-local blueprint snapshots, and project-local blueprint JSON validation.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-05T23:13:44.651Z
- Branch: task/202605052303-QWE78P/blueprint-plan-validation
- Head: 3212ba2b0830

```text
 .agentplane/tasks/202605052303-1CEGJD/README.md    | 129 +++++++++++++++++
 .agentplane/tasks/202605052303-FXGCNC/README.md    | 129 +++++++++++++++++
 .agentplane/tasks/202605052303-N37XQ0/README.md    | 129 +++++++++++++++++
 docs/user/cli-reference.generated.mdx              |  23 +++
 packages/agentplane/src/blueprints/index.ts        |   8 +-
 packages/agentplane/src/blueprints/model.ts        |  23 ++-
 packages/agentplane/src/blueprints/plan.ts         |  15 +-
 .../agentplane/src/blueprints/validate.test.ts     | 113 ++++++++++++++-
 packages/agentplane/src/blueprints/validate.ts     | 157 +++++++++++++++++++++
 .../src/cli/run-cli.core.blueprint.test.ts         |  70 +++++++++
 .../run-cli.core.tasks.query-run-prepare.test.ts   |  12 ++
 .../src/cli/run-cli/command-catalog/project.ts     |   3 +
 .../src/cli/run-cli/command-loaders/project.ts     |   2 +
 .../src/commands/blueprint/blueprint.command.ts    |  94 ++++++++++++
 .../agentplane/src/runner/usecases/task-run.ts     |  16 +++
 15 files changed, 919 insertions(+), 4 deletions(-)
```

</details>
