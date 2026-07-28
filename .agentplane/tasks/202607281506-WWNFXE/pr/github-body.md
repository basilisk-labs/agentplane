Task: `202607281506-WWNFXE`
Title: Enforce non-empty EVALUATOR pass findings
Canonical task record: `.agentplane/tasks/202607281506-WWNFXE/README.md`

## Summary

Enforce non-empty EVALUATOR pass findings

Quality-gate follow-up: align the Codex output schema and strict evaluator SGR validation with the branch_pr requirement that a pass review contains at least one evidence-backed finding, so an empty pass cannot leave a task permanently quality-stale.

## Scope

- In scope: Quality-gate follow-up: align the Codex output schema and strict evaluator SGR validation with the branch_pr requirement that a pass review contains at least one evidence-backed finding, so an empty pass cannot leave a task permanently quality-stale.
- Out of scope: unrelated refactors not required for "Enforce non-empty EVALUATOR pass findings".

## Verification

- State: ok
- Note:

```text
Verified evaluator quality-gate consistency: every pass now carries an evidence-backed finding and
empty findings are rejected by both the provider schema and strict SGR validator. Checks passed:
focused evaluator/SGR suites (39), typecheck, format, routing validation.
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-07-28T15:07:14.580Z
- Branch: task/202607281506-WWNFXE/enforce-evaluator-pass-findings
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../evaluator-episode.calibration.test.ts          |  2 ++
 .../src/commands/evaluator/evaluator-episode.ts    |  1 +
 .../evaluator/evaluator-execute.command.test.ts    | 22 ++++++++--------
 .../src/runtime/sgr/contract-evaluator-routing.ts  |  4 +--
 .../agentplane/src/runtime/sgr/contracts.test.ts   | 29 ++++++++++++----------
 5 files changed, 32 insertions(+), 26 deletions(-)
```

</details>
