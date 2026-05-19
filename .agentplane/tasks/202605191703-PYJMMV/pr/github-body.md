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
Fresh integration quality review passed for current PR head 5ee85ec2a after merging origin/main.
Evidence: hosted PR checks all green; local merge-state checks passed; maximum-assimilation
source-shaped wiki, Obsidian wikilink, granularity, provenance, coverage, raw-deletion resilience,
and leakage guardrails remain covered by implementation and tests.
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-19T18:23:46.422Z
- Branch: task/202605191703-PYJMMV/max-assimilation-obsidian
- Head: 5ee85ec2abcf

```text
 .agentplane/agents/EVALUATOR.json                  |   2 +-
 .../blueprint/resolved-snapshot.json               | 574 +++++++++++++++++++++
 docs/user/local-context.mdx                        |  18 +
 packages/agentplane/assets/agents/EVALUATOR.json   |   2 +-
 packages/agentplane/src/blueprints/builtins.ts     |   3 +-
 .../agentplane/src/blueprints/validate.test.ts     |   1 +
 packages/agentplane/src/commands/context/init.ts   |  13 +
 .../src/commands/context/release-readiness.test.ts |  87 +++-
 packages/agentplane/src/context/ingest-task.ts     |  23 +-
 packages/agentplane/src/context/ingest.ts          |  12 +-
 .../src/shared/builtin-assets.generated.ts         |  10 +-
 11 files changed, 709 insertions(+), 36 deletions(-)
```

</details>
