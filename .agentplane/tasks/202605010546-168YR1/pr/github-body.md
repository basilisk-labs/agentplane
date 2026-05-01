## Summary

Refresh launch landing and acquisition docs

Update the public landing page, README, and user-facing docs so AgentPlane is positioned as a Git-native workflow layer for auditable coding-agent work, with focused CTAs, demo flow, recipes, FAQ, and concise quickstart.

## Scope

- In scope: `website/src/pages/index.tsx`, `website/src/pages/_home.module.css`, `website/src/data/homepage-content.ts`, `website/docusaurus.config.ts`, `website/sidebars.ts`, `website/src/css/custom.css` when needed for navigation/landing styling.
- In scope: `README.md`, `docs/index.mdx`, `docs/user/overview.mdx`, `docs/user/setup.mdx`, `docs/user/workflow.mdx`, `docs/user/website-ia.mdx`, and `docs/recipes/**` for acquisition docs and concrete recipe pages.
- In scope: generated website docs artifacts only if `docs:site:generate` requires them.
- Out of scope: CLI/runtime behavior changes, release/publish flow changes, hosted deployment, external analytics, new third-party service integrations, and unrelated docs refactors.

## Verification

- State: ok
- Note: Pre-push format blocker resolved before branch publish.
- Full verification checklist lives in local review.md.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-01T06:42:28.197Z
- Branch: task/202605010546-168YR1/launch-landing-docs
- Head: 84c7fd8d93a3

```text
 DESIGN.md                               | 1075 +++++++++++--------------------
 README.md                               |  194 +++---
 docs/index.mdx                          |   14 +-
 docs/recipes/aider.mdx                  |   51 ++
 docs/recipes/branch-pr.mdx              |   57 ++
 docs/recipes/claude-code.mdx            |   49 ++
 docs/recipes/codex.mdx                  |   46 ++
 docs/recipes/cursor.mdx                 |   45 ++
 docs/recipes/github-actions.mdx         |   51 ++
 docs/recipes/index.mdx                  |   50 ++
 docs/user/overview.mdx                  |   61 +-
 docs/user/setup.mdx                     |   22 +-
 docs/user/website-ia.mdx                |   39 +-
 docs/user/workflow.mdx                  |   16 +-
 website/docusaurus.config.ts            |   47 +-
 website/sidebars.ts                     |   13 +
 website/src/css/custom.css              |  105 ++-
 website/src/data/homepage-content.ts    |  409 ++++++------
 website/src/pages/_home.module.css      |  849 +++++++++++-------------
 website/src/pages/blog/index.module.css |   64 +-
 website/src/pages/blog/index.tsx        |  164 ++---
 website/src/pages/index.tsx             |  461 ++++++-------
 22 files changed, 1935 insertions(+), 1947 deletions(-)
```

</details>
