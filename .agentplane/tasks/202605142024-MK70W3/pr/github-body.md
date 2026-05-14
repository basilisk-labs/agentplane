Task: `202605142024-MK70W3`
Title: Refresh homepage navigation and Basilisk-style feature sections (issue #3767)
Canonical task record: `.agentplane/tasks/202605142024-MK70W3/README.md`

## Summary

Refresh homepage navigation and Basilisk-style feature sections (issue #3767)

Update AgentPlane website navbar and homepage to expose Recipes, Blueprints, ACR, Blog, Docs, and Context, using basilisk-labs.com as the visual reference and adding docs-linked presentation sections for each surface. GitHub issue: https://github.com/basilisk-labs/agentplane/issues/3767

## Scope

- In scope: Update AgentPlane website navbar and homepage to expose Recipes, Blueprints, ACR, Blog, Docs, and Context, using basilisk-labs.com as the visual reference and adding docs-linked presentation sections for each surface. GitHub issue: https://github.com/basilisk-labs/agentplane/issues/3767.
- Out of scope: unrelated refactors not required for "Refresh homepage navigation and Basilisk-style feature sections (issue #3767)".

## Verification

- State: ok
- Note:

```text
Implemented issue #3767: navbar exposes Recipes, Blueprints, ACR, Blog, Docs, and Context; homepage
uses a Basilisk-style bento presentation with one docs-linked feature section per menu surface;
local checks and browser smoke passed.
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-14T20:45:31.739Z
- Branch: task/202605142024-MK70W3/homepage-feature-nav
- Head: ce2a4ef8570b

```text
 .../blueprint/resolved-snapshot.json               |  528 ++++++++++
 website/docusaurus.config.ts                       |   36 +-
 website/src/data/homepage-content.ts               |   80 +-
 website/src/pages/_home.module.css                 | 1080 +++++++-------------
 website/src/pages/index.tsx                        |  952 ++++-------------
 website/src/theme/Root.tsx                         |   47 -
 6 files changed, 1186 insertions(+), 1537 deletions(-)
```

</details>
