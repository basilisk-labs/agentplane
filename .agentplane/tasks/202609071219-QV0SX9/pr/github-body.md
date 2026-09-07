Task: `202609071219-QV0SX9`
Title: Use simple technical English in task prompts and remove redundant prompt context
Canonical task record: `.agentplane/tasks/202609071219-QV0SX9/README.md`

## Summary

Use simple technical English in task prompts and remove redundant prompt context

Deliver the existing simple technical English rules to external-agent and managed-runner episodes. Align the PLANNER profile with one user Task and internal WorkItems. Rewrite framework-owned instructions as explicit single-action sentences. Remove repeated prompt instructions and replace verbose result examples with concise schema-valid examples for every supported status. Preserve authority, protected paths, stop rules, typed schemas, exact user input, identifiers, evidence, approval gates, and all outcome branches. Add focused regression tests for both prompt routes, semantic coverage, example validity, and prompt-size reduction. Do not change release versions or publish. Measure rendered prompt size; do not claim token savings without a tokenizer measurement.

## Scope

- In scope: Deliver the existing simple technical English rules to external-agent and managed-runner episodes. Align the PLANNER profile with one user Task and internal WorkItems. Rewrite framework-owned instructions as explicit single-action sentences. Remove repeated prompt instructions and replace verbose result examples with concise schema-valid examples for every supported status. Preserve authority, protected paths, stop rules, typed schemas, exact user input, identifiers, evidence, approval gates, and all outcome branches. Add focused regression tests for both prompt routes, semantic coverage, example validity, and prompt-size reduction. Do not change release versions or publish. Measure rendered prompt size; do not claim token savings without a tokenizer measurement.
- Out of scope: unrelated refactors not required for "Use simple technical English in task prompts and remove redundant prompt context".

## Verification

- State: ok
- Note: Verified: CLI-owned checks passed before independent EVALUATOR review.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-09-07T13:38:41.751Z
- Branch: task/202609071219-QV0SX9/use-simple-technical-english-in-task-prompts-and
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .agentplane/agents/PLANNER.json                    | 21 ++++-----
 packages/agentplane/assets/agents/PLANNER.json     | 21 ++++-----
 .../agentplane/src/agents/agents-template.test.ts  | 27 ++++++++++-
 .../src/commands/task/agent-action-packet.test.ts  | 52 +++++++++++++++++++++
 .../src/commands/task/agent-action-packet.ts       | 21 +++++----
 .../src/runner/context/base-prompts.test.ts        | 23 +++++++++-
 .../runner/context/semantic-prompt-projection.ts   | 11 +++++
 .../task-run-bootstrap.result-examples.test.ts     | 29 ++++++++++++
 .../src/runner/usecases/task-run-bootstrap.ts      | 53 +++++++++++++++++++---
 9 files changed, 218 insertions(+), 40 deletions(-)
```

</details>
