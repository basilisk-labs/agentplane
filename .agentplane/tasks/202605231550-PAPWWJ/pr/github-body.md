Task: `202605231550-PAPWWJ`
Title: Improve docs usability and agent-agnostic workflow guides
Canonical task record: `.agentplane/tasks/202605231550-PAPWWJ/README.md`

## Summary

Improve docs usability and agent-agnostic workflow guides

Update website design contract and docs so links are visibly usable, user guides minimize direct CLI command burden, and model-specific workflow guide pages are consolidated into one agent-agnostic guide.

## Scope

- In scope: Update website design contract and docs so links are visibly usable, user guides minimize direct CLI command burden, and model-specific workflow guide pages are consolidated into one agent-agnostic guide.
- Out of scope: unrelated refactors not required for "Improve docs usability and agent-agnostic workflow guides".

## Verification

- State: ok
- Note:

```text
EVALUATOR quality gate passed after CSS review fix: the unresolved review finding was valid, the
orphan declaration was removed, docs site and formatting checks pass, and the UX/documentation scope
remains intact.
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-23T15:50:33.747Z
- Branch: task/202605231550-PAPWWJ/docs-usability-agent-guides
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../documentation-information-architecture.mdx     |   6 +-
 docs/index.mdx                                     |  28 ++---
 docs/recipes/index.mdx                             |   4 +-
 docs/start/quickstart.mdx                          |  53 +++++-----
 docs/user/overview.mdx                             |  31 +++---
 docs/user/workflow.mdx                             |   5 +-
 docs/workflow-guides/aider.mdx                     |  53 ++--------
 docs/workflow-guides/branch-pr.mdx                 |  84 ++++++++-------
 docs/workflow-guides/claude-code.mdx               |  79 ++------------
 docs/workflow-guides/codex.mdx                     |  73 ++-----------
 docs/workflow-guides/cursor.mdx                    |  47 ++-------
 docs/workflow-guides/github-actions.mdx            |  65 ++++--------
 docs/workflow-guides/index.mdx                     | 115 ++++++++++++++++-----
 marketing                                          |   2 +-
 scripts/checks/check-agent-onboarding-scenario.mjs |  28 +++++
 website/scripts/check-navigation.mjs               |   5 +
 website/scripts/site-smoke.mjs                     |  12 +++
 website/sidebars.ts                                |   5 +-
 website/src/css/custom.css                         |  73 ++++++++++++-
 website/src/data/homepage-content.ts               |  14 +--
 website/src/pages/index.tsx                        |   2 +-
 website/static/img/social/docs/workflow-guides.png | Bin 47032 -> 50994 bytes
 .../img/social/docs/workflow-guides/aider.png      | Bin 48920 -> 51054 bytes
 .../img/social/docs/workflow-guides/branch-pr.png  | Bin 54481 -> 49439 bytes
 .../social/docs/workflow-guides/claude-code.png    | Bin 56863 -> 53178 bytes
 .../img/social/docs/workflow-guides/codex.png      | Bin 53968 -> 52337 bytes
 .../img/social/docs/workflow-guides/cursor.png     | Bin 49766 -> 51558 bytes
 .../social/docs/workflow-guides/github-actions.png | Bin 52755 -> 51384 bytes
 website/static/img/social/manifest.json            |  28 ++---
 website/static/llms-full.txt                       |  38 ++++---
 website/static/llms.txt                            |   3 +-
 31 files changed, 407 insertions(+), 446 deletions(-)
```

</details>
