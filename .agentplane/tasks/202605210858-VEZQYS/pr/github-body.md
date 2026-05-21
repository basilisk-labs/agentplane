Task: `202605210858-VEZQYS`
Title: Harden Obsidian context wiki links and source notes
Canonical task record: `.agentplane/tasks/202605210858-VEZQYS/README.md`

## Summary

Harden Obsidian context wiki links and source notes

Fix case-sensitive Obsidian cross-link breakage during context assimilation, add automatic Obsidian-friendly context wiki elements, and support numeric source note references that resolve to raw-data links at the end of generated pages.

## Scope

- In scope: Fix case-sensitive Obsidian cross-link breakage during context assimilation, add automatic Obsidian-friendly context wiki elements, and support numeric source note references that resolve to raw-data links at the end of generated pages.
- Out of scope: unrelated refactors not required for "Harden Obsidian context wiki links and source notes".

## Verification

- State: ok
- Note:

```text
EVALUATOR quality gate passed for current commit d01c0d36 after addressing PR review comments on
index-page wikilinks and flow-style aliases.
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-21T09:49:30.266Z
- Branch: task/202605210858-VEZQYS/obsidian-context-links
- Head: d01c0d364358

```text
 .../blueprint/resolved-snapshot.json               | 572 +++++++++++++++++++++
 .github/workflows/ci.yml                           |   5 +
 docs/user/local-context.mdx                        |  17 +-
 .../src/blueprints/context-maximum-assimilation.ts |  20 +-
 .../src/commands/context/init-wiki-policy.ts       |   9 +-
 .../agentplane/src/commands/context/init-wiki.ts   |   8 +-
 packages/agentplane/src/commands/context/init.ts   |  19 +-
 .../src/commands/context/release-readiness.test.ts |  18 +-
 .../commands/context/wiki.obsidian.unit.test.ts    | 180 +++++++
 packages/agentplane/src/commands/context/wiki.ts   | 140 ++++-
 packages/agentplane/src/context/ingest-task.ts     |  13 +-
 11 files changed, 971 insertions(+), 30 deletions(-)
```

</details>
