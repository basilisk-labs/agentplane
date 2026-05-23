Task: `202605231749-X9B9NE`
Title: Tune homepage for Product Hunt readiness
Canonical task record: `.agentplane/tasks/202605231749-X9B9NE/README.md`

## Summary

Tune homepage for Product Hunt readiness

Update the homepage messaging and structure for Product Hunt readiness: use audit-trails positioning, make the primary CTA more launch-oriented, add a concrete before/after evidence story, keep language agent-agnostic, and avoid Product Hunt launch kit assets for now.

## Scope

- In scope: Update the homepage messaging and structure for Product Hunt readiness: use audit-trails positioning, make the primary CTA more launch-oriented, add a concrete before/after evidence story, keep language agent-agnostic, and avoid Product Hunt launch kit assets for now.
- Out of scope: unrelated refactors not required for "Tune homepage for Product Hunt readiness".

## Verification

- State: ok
- Note:

```text
Evaluation passed for approved site-only scope. Confirmed requested headline, agent-agnostic
wording, quickstart-first CTA, before/after evidence story, generated llms-full freshness, docs site
build, design-language check, changed-file formatting, policy routing, doctor, and desktop/mobile
screenshots. Product Hunt launch kit assets intentionally not added.
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-23T17:52:23.901Z
- Branch: task/202605231749-X9B9NE/ph-homepage-readiness
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 docs/compare.mdx                     | 30 ++++++-------
 docs/listing.md                      | 10 ++---
 docs/showcase.mdx                    | 15 +++----
 docs/workflow-guides/index.mdx       | 15 +++----
 website/docusaurus.config.ts         |  8 ++--
 website/src/data/homepage-content.ts | 65 +++++++++++++++++++---------
 website/src/pages/_home.module.css   | 64 ++++++++++++++++++++++++++--
 website/src/pages/index.tsx          | 82 ++++++++++++++++++++++++++----------
 website/static/llms-full.txt         | 30 ++++++-------
 9 files changed, 220 insertions(+), 99 deletions(-)
```

</details>
