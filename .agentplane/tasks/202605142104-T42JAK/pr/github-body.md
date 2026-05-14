Task: `202605142104-T42JAK`
Title: Clean up blog typography
Canonical task record: `.agentplane/tasks/202605142104-T42JAK/README.md`

## Summary

Clean up blog typography

Hide redundant team author presentation on blog pages and refine the blog typography surface without changing post metadata.

## Scope

- In scope: Hide redundant team author presentation on blog pages and refine the blog typography surface without changing post metadata.
- Out of scope: unrelated refactors not required for "Clean up blog typography".

## Verification

- State: ok
- Note: Verified blog author UI removal, homepage local menu removal, card order swap, typecheck, and production build.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-14T21:19:02.853Z
- Branch: task/202605142104-T42JAK/clean-blog-typography
- Head: 757b3ddfd882

```text
 .../blueprint/resolved-snapshot.json               | 527 +++++++++++++++++++++
 website/src/css/custom.css                         |  83 +++-
 website/src/data/homepage-content.ts               |  24 +-
 website/src/pages/_home.module.css                 |  67 +--
 website/src/pages/blog/index.module.css            |  60 ++-
 website/src/pages/index.tsx                        |  18 -
 .../theme/BlogPostItem/Header/Authors/index.tsx    |   3 +
 7 files changed, 655 insertions(+), 127 deletions(-)
```

</details>
