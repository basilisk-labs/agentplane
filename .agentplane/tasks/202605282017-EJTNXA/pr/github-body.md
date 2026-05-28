Task: `202605282017-EJTNXA`
Title: Evaluator command decomposition
Canonical task record: `.agentplane/tasks/202605282017-EJTNXA/README.md`

## Summary

Evaluator command decomposition

Decompose packages/agentplane/src/commands/evaluator/evaluator.command.ts into focused evaluator command modules without changing evaluator CLI behavior. Extract option parsing/report construction/persistence helpers so quality-review evidence remains easier for agents to inspect and future evaluator changes touch smaller files.

## Scope

- In scope: Decompose packages/agentplane/src/commands/evaluator/evaluator.command.ts into focused evaluator command modules without changing evaluator CLI behavior. Extract option parsing/report construction/persistence helpers so quality-review evidence remains easier for agents to inspect and future evaluator changes touch smaller files.
- Out of scope: unrelated refactors not required for "Evaluator command decomposition".

## Verification

- State: ok
- Note:

```text
Evaluator command decomposition verified: evaluator.command.ts reduced from 455 to 365 lines,
quality artifact rendering/helpers extracted, evaluator run focused tests passed, typecheck passed,
lint:core passed, format:changed passed, hotspot threshold check passed.
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-28T20:18:18.862Z
- Branch: task/202605282017-EJTNXA/evaluator-command-decomposition
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
No changes detected.
```

</details>
