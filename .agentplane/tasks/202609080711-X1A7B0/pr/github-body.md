Task: `202609080711-X1A7B0`
Title: Remove ap task run from standard route recommendations and release AgentPlane v0.6.28
Canonical task record: `.agentplane/tasks/202609080711-X1A7B0/README.md`

## Summary

Remove `ap task run` from standard route recommendations and release AgentPlane v0.6.28.

On the v0.6.27 maintenance base, preserve `ap task next-action <task-id> --explain` as the route oracle and remove only recommendations that direct the current coding agent to `ap task run`. The agent performs the task itself. Keep `ap task run` available for explicit managed-runner or compatibility use. Open the PR against `codex/release-v0.6.27-reclaim-fix`.

## Scope

- In scope: remove `ap task run` from normal route recommendations while preserving `ap task next-action <task-id> --explain`; keep the command implementation available for explicit managed-runner or compatibility use; update focused tests and release surfaces for v0.6.28; open the PR against `codex/release-v0.6.27-reclaim-fix`.
- Out of scope: removing the `task run` command, replacing `task next-action`, backporting the 0.7 `task advance` protocol, unrelated refactors, merge, tag creation, npm publication.

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
