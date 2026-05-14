Task: `202605141954-8DZF9S`
Title: Polish OSS website trust surface
Canonical task record: `.agentplane/tasks/202605141954-8DZF9S/README.md`

## Summary

Polish OSS website trust surface

Fix the public website OSS trust surface: command snippets, install CTA whitespace, Docusaurus edit links, future-dated blog guard, hero trust strip, footer open-source links, and comparison wording without a broad redesign.

## Scope

- In scope: Fix the public website OSS trust surface: command snippets, install CTA whitespace, Docusaurus edit links, future-dated blog guard, hero trust strip, footer open-source links, and comparison wording without a broad redesign.
- Out of scope: unrelated refactors not required for "Polish OSS website trust surface".

## Verification

- State: ok
- Note:

```text
Website OSS polish verified: content guard, typecheck, production build, routing check, doctor,
targeted script lint, and rendered HTML grep passed.
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-14T20:09:04.073Z
- Branch: task/202605141954-8DZF9S/oss-website-polish
- Head: 2f16f772151d

```text
 .../blueprint/resolved-snapshot.json               | 527 +++++++++++++++++++++
 docs/compare.mdx                                   |  29 +-
 docs/listing.md                                    |   4 +-
 ...agentplane-0-6-context-management-llm-wiki.mdx} |   0
 website/docusaurus.config.ts                       |  52 +-
 website/package.json                               |   3 +-
 website/scripts/check-site-content.mjs             |  53 +++
 website/src/data/homepage-content.ts               |  65 ++-
 website/src/pages/_home.module.css                 | 122 ++++-
 website/src/pages/index.tsx                        | 119 ++++-
 website/static/llms-full.txt                       |  35 +-
 11 files changed, 975 insertions(+), 34 deletions(-)
```

</details>
