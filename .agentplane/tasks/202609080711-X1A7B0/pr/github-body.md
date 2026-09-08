Task: `202609080711-X1A7B0`
Title: Remove ap task run from standard route recommendations and release AgentPlane v0.6.28
Canonical task record: `.agentplane/tasks/202609080711-X1A7B0/README.md`

## Summary

Remove ap task run from standard route recommendations and release AgentPlane v0.6.28

On the 0.6 maintenance line based on v0.6.27, remove recommendations that direct agents to ap task run. The standard agent route must require the external-agent task advance exchange so the agent performs bounded semantic episodes itself. Update canonical policy, generated projections, implementation and regression tests as required; prepare and publish v0.6.28 through a PR targeting 0.6.x without unrelated 0.7.x changes.

## Scope

- In scope: On the 0.6 maintenance line based on v0.6.27, remove recommendations that direct agents to ap task run. The standard agent route must require the external-agent task advance exchange so the agent performs bounded semantic episodes itself. Update canonical policy, generated projections, implementation and regression tests as required; prepare and publish v0.6.28 through a PR targeting 0.6.x without unrelated 0.7.x changes.
- Out of scope: unrelated refactors not required for "Remove ap task run from standard route recommendations and release AgentPlane v0.6.28".

## Verification

- State: pending
- Note: Not recorded yet.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-09-08T07:39:38.454Z
- Branch: task/202609080711-X1A7B0/remove-ap-task-run-from-standard-route-recommend
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .agentplane/WORKFLOW.md                            | 23 ++++++++++++++-
 .agentplane/workflows/last-known-good.md           | 24 ++++++++++++++-
 docs/reference/generated-reference.mdx             |  6 ++--
 docs/releases/v0.6.28.md                           | 34 ++++++++++++++++++++++
 packages/agentplane/package.json                   |  6 ++--
 ...cli.core.route-decision.direct-closeout.test.ts | 26 +++++++++--------
 .../commands/shared/route-decision-next-action.ts  | 10 +++----
 .../agentplane/src/commands/task/task.command.ts   |  4 +--
 packages/core/package.json                         |  2 +-
 packages/recipes/package.json                      |  2 +-
 packages/recipes/src/index.ts                      |  2 +-
 packages/spec/examples/acr.json                    | 22 ++++++++++----
 packages/testkit/package.json                      |  2 +-
 13 files changed, 126 insertions(+), 37 deletions(-)
```

</details>
