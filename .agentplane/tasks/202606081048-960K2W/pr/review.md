# PR Review

Created: 2026-06-08T10:50:02.700Z

## Task

- Task: `202606081048-960K2W`
- Title: Release AgentPlane 0.6.19
- Status: DOING
- Branch: `task/202606081048-960K2W/release-agentplane-0-6-19`
- Canonical task record: `.agentplane/tasks/202606081048-960K2W/README.md`

## Verification

- State: ok
- Note: Release candidate v0.6.19 prepared and checked locally and on GitHub PR #4489.
- Canonical workflow state lives in the task README.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<!-- BEGIN AUTO SUMMARY -->
<details>
<summary>Raw evidence</summary>

- Updated: 2026-06-08T10:50:02.700Z
- Branch: task/202606081048-960K2W/release-agentplane-0-6-19
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .agentplane/WORKFLOW.md                            |   2 +-
 .agentplane/tasks/202606080911-EGNZRP/README.md    |  23 +++++--
 .agentplane/tasks/202606080911-EGNZRP/pr/meta.json |   8 ++-
 docs/assets/header.svg                             |   4 +-
 docs/assets/readme-headers/adr.svg                 |   4 +-
 docs/assets/readme-headers/agentplane-cli.svg      |   4 +-
 docs/assets/readme-headers/agentplane.svg          |   4 +-
 docs/assets/readme-headers/core.svg                |   4 +-
 docs/assets/readme-headers/docs.svg                |   4 +-
 docs/assets/readme-headers/humanizer.svg           |   4 +-
 docs/assets/readme-headers/recipes.svg             |   4 +-
 docs/assets/readme-headers/releases.svg            |   4 +-
 docs/assets/readme-headers/schemas.svg             |   4 +-
 docs/assets/readme-headers/scripts.svg             |   4 +-
 docs/assets/readme-headers/skills.svg              |   4 +-
 docs/assets/readme-headers/spec.svg                |   4 +-
 docs/assets/readme-headers/testkit.svg             |   4 +-
 docs/reference/generated-reference.mdx             |   6 +-
 docs/releases/v0.6.19.md                           |  70 +++++++++++++++++++++
 packages/agentplane/package.json                   |   6 +-
 packages/core/package.json                         |   2 +-
 packages/recipes/package.json                      |   2 +-
 packages/recipes/src/index.ts                      |   2 +-
 packages/spec/examples/acr.json                    |   4 +-
 packages/testkit/package.json                      |   2 +-
 .../static/img/social/docs/releases/v0.6.19.png    | Bin 0 -> 54420 bytes
 website/static/img/social/manifest.json            |   8 +++
 website/static/llms-full.txt                       |  43 ++++++++++---
 28 files changed, 178 insertions(+), 56 deletions(-)
```

</details>
<!-- END AUTO SUMMARY -->
