Task: `202605141717-84A77P`
Title: Announce v0.6 context management
Canonical task record: `.agentplane/tasks/202605141717-84A77P/README.md`

## Summary

Announce v0.6 context management

Add public announcement, README and docs coverage, website navigation, homepage context block, and a v0.6 blog article connecting AgentPlane context management to Andrej Karpathy's LLM Wiki pattern.

## Scope

- In scope: Add public announcement, README and docs coverage, website navigation, homepage context block, and a v0.6 blog article connecting AgentPlane context management to Andrej Karpathy's LLM Wiki pattern.
- Out of scope: unrelated refactors not required for "Announce v0.6 context management".

## Verification

- State: ok
- Note:

```text
Docs/site verification passed for v0.6 context-management announcement. node
.agentplane/policy/check-routing.mjs: policy routing OK. agentplane doctor: OK with pre-existing
branch_pr drift warnings unrelated to this task. bun run docs:site:typecheck: pass after restoring
ignored website dependencies with bun install --ignore-scripts. bun run docs:site:build: pass;
remaining warnings are pre-existing blueprints tag/truncation warnings. git diff --check: pass.
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-14T17:24:29.117Z
- Branch: task/202605141717-84A77P/context-management-announcement
- Head: 25e785c43fe6

```text
 .../blueprint/resolved-snapshot.json               | 358 +++++++++++++++++++++
 README.md                                          |  30 ++
 docs/index.mdx                                     |   3 +
 docs/user/local-context.mdx                        |  26 ++
 docs/user/overview.mdx                             |   6 +-
 ...-agentplane-0-6-context-management-llm-wiki.mdx | 130 ++++++++
 website/blog/tags.yml                              |   5 +
 website/docusaurus.config.ts                       |   6 +
 website/src/data/homepage-content.ts               |  27 ++
 website/src/pages/index.tsx                        |  23 ++
 10 files changed, 613 insertions(+), 1 deletion(-)
```

</details>
