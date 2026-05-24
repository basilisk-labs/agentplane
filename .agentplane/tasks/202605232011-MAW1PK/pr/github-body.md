Task: `202605232011-MAW1PK`
Title: Implement executable evaluator quality review
Canonical task record: `.agentplane/tasks/202605232011-MAW1PK/README.md`

## Summary

Implement executable evaluator quality review

Implement executable evaluator quality review

## Scope

- In scope: Implement executable evaluator quality review.
- Out of scope: unrelated refactors not required for "Implement executable evaluator quality review".

## Verification

- State: ok
- Note:

```text
Implemented executable evaluator run command, stricter quality-review gate, docs, and focused tests.
Checks passed: format:changed, focused bun tests, typecheck, docs:cli:check, policy routing,
framework bootstrap/help.
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-23T20:12:53.032Z
- Branch: task/202605232011-MAW1PK/evaluator-quality-review
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 docs/user/cli-reference.generated.mdx              |  32 +++
 docs/user/commands.mdx                             |  13 +-
 .../src/cli/run-cli/command-catalog/project.ts     |   2 +
 .../evaluator/evaluator-run.command.test.ts        |  53 ++++
 .../src/commands/evaluator/evaluator.command.ts    | 281 ++++++++++++++++++++-
 .../src/commands/evaluator/evaluator.spec.ts       | 139 +++++++++-
 .../commands/pr/integrate/internal/prepare.test.ts |   7 +-
 .../commands/task/finish.close-tail.unit.test.ts   |   4 +-
 .../src/commands/task/finish.state.unit.test.ts    |   4 +-
 .../commands/task/finish.validation.unit.test.ts   |   7 +-
 .../src/commands/task/quality-review-gate.ts       |  30 ++-
 .../commands/task/quality-review-gate.unit.test.ts |  55 +++-
 12 files changed, 606 insertions(+), 21 deletions(-)
```

</details>
