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

- Updated: 2026-09-08T12:53:14.312Z
- Branch: task/202609080711-X1A7B0/remove-ap-task-run-from-standard-route-recommend
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .agentplane/WORKFLOW.md                            |   3 +-
 .agentplane/workflows/last-known-good.md           |   4 ++-
 docs/assets/header.svg                             |   4 +--
 docs/assets/readme-headers/adr.svg                 |   4 +--
 docs/assets/readme-headers/agentplane-cli.svg      |   4 +--
 docs/assets/readme-headers/agentplane.svg          |   4 +--
 docs/assets/readme-headers/core.svg                |   4 +--
 docs/assets/readme-headers/docs.svg                |   4 +--
 docs/assets/readme-headers/humanizer.svg           |   4 +--
 docs/assets/readme-headers/recipes.svg             |   4 +--
 docs/assets/readme-headers/releases.svg            |   4 +--
 docs/assets/readme-headers/schemas.svg             |   4 +--
 docs/assets/readme-headers/scripts.svg             |   4 +--
 docs/assets/readme-headers/skills.svg              |   4 +--
 docs/assets/readme-headers/spec.svg                |   4 +--
 docs/assets/readme-headers/testkit.svg             |   4 +--
 docs/reference/generated-reference.mdx             |   6 ++--
 docs/releases/v0.6.28.md                           |  34 +++++++++++++++++++++
 packages/agentplane/package.json                   |   6 ++--
 ...cli.core.route-decision.direct-closeout.test.ts |  26 ++++++++--------
 .../commands/shared/route-decision-next-action.ts  |  10 +++---
 .../agentplane/src/commands/task/task.command.ts   |   4 +--
 packages/core/package.json                         |   2 +-
 packages/recipes/package.json                      |   2 +-
 packages/recipes/src/index.ts                      |   2 +-
 packages/spec/examples/acr.json                    |   4 +--
 packages/testkit/package.json                      |   2 +-
 .../static/img/social/docs/releases/v0.6.28.png    | Bin 0 -> 54193 bytes
 website/static/img/social/manifest.json            |   8 +++++
 29 files changed, 108 insertions(+), 61 deletions(-)
```

</details>
