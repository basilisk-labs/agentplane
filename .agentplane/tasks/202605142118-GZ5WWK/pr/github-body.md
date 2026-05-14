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

- State: ok
- Note:

```text
Command: bunx prettier --check packages/agentplane/src/commands/context/init.ts
packages/agentplane/src/context/harvest-tasks-extraction.ts
packages/agentplane/assets/agents/CURATOR.json docs/user/local-context.mdx; bun test
packages/agentplane/src/cli/run-cli.core.init.test.ts
packages/agentplane/src/commands/context/harvest-tasks.test.ts; bunx eslint
packages/agentplane/src/commands/context/init.ts
packages/agentplane/src/context/harvest-tasks-extraction.ts; bun run docs:site:typecheck; node
.agentplane/policy/check-routing.mjs; ap doctor. Result: pass. Evidence: prettier passed, 39 focused
tests passed, eslint and docs typecheck passed, policy routing OK, doctor OK with pre-existing
branch_pr reconciliation warnings unrelated to this task. Scope: local context wiki prompt guidance,
CURATOR extraction prompt, CURATOR asset, and user local-context docs.
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-14T21:27:51.405Z
- Branch: task/202605142118-GZ5WWK/wiki-glossary-cross-links
- Head: d206bb5cf771

```text
 .agentplane/agents/CURATOR.json                    |   4 +-
 .../blueprint/resolved-snapshot.json               | 527 +++++++++++++++++++++
 docs/user/local-context.mdx                        |  10 +
 packages/agentplane/assets/agents/CURATOR.json     |   4 +-
 packages/agentplane/src/commands/context/init.ts   |   3 +
 .../src/context/harvest-tasks-extraction.ts        |   6 +
 6 files changed, 550 insertions(+), 4 deletions(-)
```

</details>
