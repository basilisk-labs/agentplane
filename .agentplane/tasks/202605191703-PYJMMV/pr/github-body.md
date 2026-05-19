Task: `202605191703-PYJMMV`
Title: Make maximum assimilation source-shaped and Obsidian-compatible
Canonical task record: `.agentplane/tasks/202605191703-PYJMMV/README.md`

## Summary

Make maximum assimilation source-shaped and Obsidian-compatible

Update maximum-assimilation context mode so first ingest does not create the fixed starter wiki scaffold, generated CURATOR prompts require source-shaped wiki topology and Obsidian-compatible wikilinks, and EVALUATOR checks quality for structure, granularity, cross-links, coverage, and raw-deletion resilience.

## Scope

- In scope: Update maximum-assimilation context mode so first ingest does not create the fixed starter wiki scaffold, generated CURATOR prompts require source-shaped wiki topology and Obsidian-compatible wikilinks, and EVALUATOR checks quality for structure, granularity, cross-links, coverage, and raw-deletion resilience.
- Out of scope: unrelated refactors not required for "Make maximum assimilation source-shaped and Obsidian-compatible".

## Verification

- State: ok
- Note:

```text
Final quality review passed. Maximum-assimilation behavior is source-shaped: first ingest skips the
fixed starter wiki scaffold, generated task contracts require topology decision, granular wiki
synthesis, Obsidian-compatible semantic wikilinks, raw-deletion resilience, and explicit EVALUATOR
review; medium/non-maximum scaffold behavior remains covered by tests.
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-19T17:28:46.796Z
- Branch: task/202605191703-PYJMMV/max-assimilation-obsidian
- Head: ca91c80c5dea

```text
 .agentplane/agents/EVALUATOR.json                  |   2 +-
 .../blueprint/resolved-snapshot.json               | 574 +++++++++++++++++++++
 docs/user/local-context.mdx                        |  18 +
 packages/agentplane/assets/agents/EVALUATOR.json   |   2 +-
 packages/agentplane/src/blueprints/builtins.ts     |  31 ++
 .../agentplane/src/blueprints/validate.test.ts     |   6 +
 packages/agentplane/src/commands/context/init.ts   |  17 +
 .../src/commands/context/release-readiness.test.ts |  81 ++-
 packages/agentplane/src/context/ingest-task.ts     |  23 +-
 packages/agentplane/src/context/ingest.ts          |  12 +-
 .../src/shared/builtin-assets.generated.ts         |  10 +-
 11 files changed, 759 insertions(+), 17 deletions(-)
```

</details>
