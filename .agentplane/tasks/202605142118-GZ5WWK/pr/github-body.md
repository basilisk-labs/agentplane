Task: `202605142118-GZ5WWK`
Title: Clarify wiki glossary and cross-link guidance
Canonical task record: `.agentplane/tasks/202605142118-GZ5WWK/README.md`

## Summary

Clarify wiki glossary and cross-link guidance

Update AgentPlane local context prompts so CURATOR and generated wiki agent notes prefer useful Markdown cross-links, keep glossary as a thin index over wiki/graph, and preserve adaptive wiki structure after first analysis.

## Scope

- In scope: Update AgentPlane local context prompts so CURATOR and generated wiki agent notes prefer useful Markdown cross-links, keep glossary as a thin index over wiki/graph, and preserve adaptive wiki structure after first analysis.
- Out of scope: unrelated refactors not required for "Clarify wiki glossary and cross-link guidance".

## Verification

- State: pending
- Note: Not recorded yet.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-14T21:21:50.140Z
- Branch: task/202605142118-GZ5WWK/wiki-glossary-cross-links
- Head: aee5aceeee0e

```text
 docs/user/local-context.mdx                                 | 10 ++++++++++
 packages/agentplane/assets/agents/CURATOR.json              |  4 ++--
 packages/agentplane/src/commands/context/init.ts            |  3 +++
 packages/agentplane/src/context/harvest-tasks-extraction.ts |  6 ++++++
 4 files changed, 21 insertions(+), 2 deletions(-)
```

</details>
