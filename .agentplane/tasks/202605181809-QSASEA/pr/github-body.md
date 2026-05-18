Task: `202605181809-QSASEA`
Title: Reframe docs around agent-first usage
Canonical task record: `.agentplane/tasks/202605181809-QSASEA/README.md`

## Summary

Reframe docs around agent-first usage

Make documentation emphasize install/init/agent handoff as the default path, document AgentPlane as agent-agnostic through repo files and AGENTS.md, and separate local context into its own docs section.

## Scope

- In scope: Make documentation emphasize install/init/agent handoff as the default path, document AgentPlane as agent-agnostic through repo files and AGENTS.md, and separate local context into its own docs section.
- Out of scope: unrelated refactors not required for "Reframe docs around agent-first usage".

## Verification

- State: ok
- Note:

```text
Verified on commit 9d2d9ad67: docs IA, sidebar, typecheck, and Docusaurus build-check passed for the
agent-first docs restructure.
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-18T18:19:16.116Z
- Branch: task/202605181809-QSASEA/agent-first-docs-ia
- Head: 9d2d9ad67325

```text
 .../blueprint/resolved-snapshot.json               | 395 +++++++++++++++++++++
 docs/README.md                                     |   9 +-
 .../documentation-information-architecture.mdx     |  42 ++-
 docs/index.mdx                                     |  78 ++--
 docs/recipes/index.mdx                             |   2 +-
 docs/user/agent-handoff.mdx                        |  88 +++++
 docs/user/overview.mdx                             |  43 ++-
 docs/user/setup.mdx                                |  53 ++-
 docs/user/website-ia.mdx                           |  42 ++-
 docs/workflow-guides/index.mdx                     |  15 +-
 website/sidebars.ts                                |  64 ++--
 website/static/img/social/docs/releases/v0.6.2.png | Bin 0 -> 41467 bytes
 .../static/img/social/docs/user/agent-handoff.png  | Bin 0 -> 45956 bytes
 website/static/img/social/docs/workflow-guides.png | Bin 48598 -> 47032 bytes
 14 files changed, 699 insertions(+), 132 deletions(-)
```

</details>
