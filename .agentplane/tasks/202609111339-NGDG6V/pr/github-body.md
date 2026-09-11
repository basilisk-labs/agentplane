Task: `202609111339-NGDG6V`
Title: Route direct verification rework to bounded repair instead of repeated verification for GitHub issue #4893
Canonical task record: `.agentplane/tasks/202609111339-NGDG6V/README.md`

## Summary

Route direct verification rework to bounded repair instead of repeated verification for GitHub issue #4893

GitHub issue #4893 remains relevant on current main. After agentplane verify <task-id> --rework, directStep can select direct verification again from the completed runner instead of granting a CODER repair episode, and task-document correction has no executable route. Add a direct-mode regression for verify --rework followed by task next-action/status, route repository-fixable findings to a semantic implementation or task-contract repair episode with safe_to_mutate=true, preserve evidence, and return to TESTER only after a new implementation or approved contract correction. Keep approval and task-centric provenance fail closed. Issue: https://github.com/basilisk-labs/agentplane/issues/4893

## Scope

- In scope: GitHub issue #4893 remains relevant on current main. After agentplane verify <task-id> --rework, directStep can select direct verification again from the completed runner instead of granting a CODER repair episode, and task-document correction has no executable route. Add a direct-mode regression for verify --rework followed by task next-action/status, route repository-fixable findings to a semantic implementation or task-contract repair episode with safe_to_mutate=true, preserve evidence, and return to TESTER only after a new implementation or approved contract correction. Keep approval and task-centric provenance fail closed. Issue: https://github.com/basilisk-labs/agentplane/issues/4893.
- Out of scope: unrelated refactors not required for "Route direct verification rework to bounded repair instead of repeated verification for GitHub issue #4893".

## Verification

- State: needs_rework
- Note: Rework: Declared check failed: bun run ci:local:full
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-09-11T15:35:52.577Z
- Branch: task/202609111339-NGDG6V/route-direct-verification-rework-to-bounded-repa
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 ...cli.core.route-decision.direct-closeout.test.ts | 213 ++++++++++++++++-----
 .../src/commands/shared/workflow-step-factory.ts   |  67 +++----
 2 files changed, 198 insertions(+), 82 deletions(-)
```

</details>
