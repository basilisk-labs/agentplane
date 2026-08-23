Task: `202608222117-HQ5AA4`
Title: Migrate blocked-result CLI fixture to structured task plan
Canonical task record: `.agentplane/tasks/202608222117-HQ5AA4/README.md`

## Summary

Migrate blocked-result CLI fixture to structured task plan

Repair the proven task-centric regression in packages/agentplane/src/cli/run-cli.core.task-advance.blocked-result.test.ts: prepareBlockedResultTask seeds and approves only legacy plan text, so task advance re-enters PLANNER and all nine blocked-result cases fail before exercising their intended behavior. Change only this test fixture to install a schema-valid baseline-bound TaskPlanProposal before approval. Do not change production lifecycle, scope-extension semantics, context behavior, release behavior, or Knowledge Assimilation.

## Scope

- In scope: Repair the proven task-centric regression in packages/agentplane/src/cli/run-cli.core.task-advance.blocked-result.test.ts: prepareBlockedResultTask seeds and approves only legacy plan text, so task advance re-enters PLANNER and all nine blocked-result cases fail before exercising their intended behavior. Change only this test fixture to install a schema-valid baseline-bound TaskPlanProposal before approval. Do not change production lifecycle, scope-extension semantics, context behavior, release behavior, or Knowledge Assimilation.
- Out of scope: unrelated refactors not required for "Migrate blocked-result CLI fixture to structured task plan".

## Verification

- State: pending
- Note: Not recorded yet.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-08-22T21:19:32.900Z
- Branch: task/202608222117-HQ5AA4/migrate-blocked-result-cli-fixture-to-structured
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 ...un-cli.core.task-advance.blocked-result.test.ts | 214 +++++++++++++++++++--
 1 file changed, 194 insertions(+), 20 deletions(-)
```

</details>
