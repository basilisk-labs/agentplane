## Summary

Resolve docs site homepage preview split

Eliminate the parallel homepage implementation by either promoting the rich home-preview surface to the public root page or removing the dormant preview route and its data/CSS if it is no longer intended.

## Scope

- In scope: Eliminate the parallel homepage implementation by either promoting the rich home-preview surface to the public root page or removing the dormant preview route and its data/CSS if it is no longer intended.
- Out of scope: unrelated refactors not required for "Resolve docs site homepage preview split".

## Verification

- State: ok
- Note: Verified: docs site typecheck, production build, design-language check, and git diff whitespace check passed after promoting the rich home-preview implementation to the root page and removing the separate /home-preview route.
- Full verification checklist lives in local review.md.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-04-30T20:14:51.391Z
- Branch: task/202604301956-E94KR6/resolve-home-preview-split
- Head: 4f93ee3db2c0

```text
 website/src/data/homepage-content.ts               |  12 +-
 .../{home-preview.module.css => _home.module.css}  |   0
 website/src/pages/home-preview.tsx                 | 337 --------------------
 website/src/pages/index.module.css                 | 126 --------
 website/src/pages/index.tsx                        | 351 +++++++++++++++++++--
 5 files changed, 331 insertions(+), 495 deletions(-)
```

</details>
