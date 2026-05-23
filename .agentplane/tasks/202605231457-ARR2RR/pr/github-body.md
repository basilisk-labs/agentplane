Task: `202605231457-ARR2RR`
Title: Refactor public docs IA and harden docs site navigation checks
Canonical task record: `.agentplane/tasks/202605231457-ARR2RR/README.md`

## Summary

Refactor public docs IA and harden docs site navigation checks

Restructure the public documentation around user-facing journeys and agent-facing context usage, add a dedicated Context section with mode guidance, simplify docs site verification, and add a browser-level smoke check that catches broken Docusaurus client navigation.

## Scope

- In scope: Restructure the public documentation around user-facing journeys and agent-facing context usage, add a dedicated Context section with mode guidance, simplify docs site verification, and add a browser-level smoke check that catches broken Docusaurus client navigation.
- Out of scope: unrelated refactors not required for "Refactor public docs IA and harden docs site navigation checks".

## Verification

- State: ok
- Note:

```text
Evaluator review: PR #4098 has one commit, GitHub checks are green, outdated package.json review
thread resolved, docs build now runs navigation smoke through Docusaurus postBuild, and
local/browser evidence is recorded in DOCS verification.
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-23T14:57:40.263Z
- Branch: task/202605231457-ARR2RR/docs-ia-context-navigation
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 docs/concepts/context-engineering.mdx              |   3 +
 docs/context/agent-guide.mdx                       |  64 ++++++++++
 docs/context/files.mdx                             |  50 ++++++++
 docs/context/index.mdx                             |  50 ++++++++
 docs/context/ingest.mdx                            |  52 ++++++++
 docs/context/modes.mdx                             |  80 ++++++++++++
 docs/context/quickstart.mdx                        |  61 ++++++++++
 docs/context/review.mdx                            |  38 ++++++
 docs/context/troubleshooting.mdx                   |  43 +++++++
 docs/index.mdx                                     |  38 +++---
 docs/user/local-context.mdx                        |   9 ++
 .../commands/release/ci-workflow-contract.test.ts  |   3 +-
 scripts/checks/check-agent-onboarding-scenario.mjs |   7 +-
 scripts/checks/check-docs-ia.mjs                   |   3 +-
 website/docusaurus.config.ts                       |  11 ++
 website/scripts/check-navigation.mjs               | 135 +++++++++++++++++++++
 website/scripts/site-smoke.mjs                     |   3 +
 website/sidebars.ts                                |  20 ++-
 website/static/img/social/docs/context.png         | Bin 0 -> 39194 bytes
 .../static/img/social/docs/context/agent-guide.png | Bin 0 -> 53542 bytes
 website/static/img/social/docs/context/files.png   | Bin 0 -> 47210 bytes
 website/static/img/social/docs/context/ingest.png  | Bin 0 -> 49744 bytes
 website/static/img/social/docs/context/modes.png   | Bin 0 -> 48886 bytes
 .../static/img/social/docs/context/quickstart.png  | Bin 0 -> 46750 bytes
 website/static/img/social/docs/context/review.png  | Bin 0 -> 49496 bytes
 .../img/social/docs/context/troubleshooting.png    | Bin 0 -> 50675 bytes
 website/static/img/social/manifest.json            |  64 ++++++++++
 27 files changed, 712 insertions(+), 22 deletions(-)
```

</details>
