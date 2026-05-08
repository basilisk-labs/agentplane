Task: `202605081758-TEPFPR`
Title: Reposition public copy around Git-native AI evidence
Canonical task record: `.agentplane/tasks/202605081758-TEPFPR/README.md`

## Summary

Reposition public copy around Git-native AI evidence

Update AgentPlane public README, website, and docs copy from audit-layer CLI framing toward Git-native infrastructure for traceable AI work, with ACR as the main evidence artifact.

## Scope

- In scope: Update AgentPlane public README, website, and docs copy from audit-layer CLI framing toward Git-native infrastructure for traceable AI work, with ACR as the main evidence artifact.
- Out of scope: unrelated refactors not required for "Reposition public copy around Git-native AI evidence".

## Verification

- State: ok
- Note: Command: node .agentplane/policy/check-routing.mjs; Result: pass; Evidence: policy routing OK; Scope: policy routing after docs/site copy changes; Links: .agentplane/policy/*.md. Command: ap doctor; Result: pass; Evidence: doctor OK with zero errors and zero warnings; Scope: task worktree runtime and branch_pr drift. Command: bun run docs:ia:check; Result: pass; Evidence: docs IA, sidebar coverage, and current path references are aligned; Scope: docs/index.mdx and website/sidebars.ts. Command: bun run docs:site:typecheck; Result: pass; Evidence: website TypeScript check exited 0; Scope: Docusaurus config and homepage TSX. Command: bun run docs:site:build; Result: pass; Evidence: static files generated successfully; only existing dependency warning from vscode-languageserver-types; Scope: docs site routes, anchors, and content. Command: bun run docs:site:check:design; Result: pass; Evidence: DESIGN.md compliance check passed; Scope: public website content. Command: git diff --check; Result: pass; Evidence: no whitespace errors; Scope: all changed files.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-08T18:36:03.784Z
- Branch: task/202605081758-TEPFPR/git-native-evidence-copy
- Head: b2206a9ca8b1

```text
 .../blueprint/resolved-snapshot.json               | 341 +++++++++++++++++++++
 README.md                                          |  76 +++--
 docs/assets/header.png                             | Bin 84547 -> 98735 bytes
 docs/assets/header.svg                             |  16 +-
 docs/compare.mdx                                   |  67 +++-
 docs/index.mdx                                     | 275 ++++++++++-------
 docs/launch/checklist.md                           |   2 +-
 docs/launch/hn.md                                  |   6 +-
 docs/launch/reddit.md                              |  10 +-
 docs/launch/twitter.md                             |   8 +-
 docs/listing.md                                    |  44 ++-
 docs/manifesto.mdx                                 |  76 ++++-
 docs/showcase.mdx                                  |  56 +++-
 docs/user/agent-change-record.mdx                  |  54 +++-
 docs/user/overview.mdx                             |  74 +++--
 docs/user/setup.mdx                                | 340 +++++---------------
 docs/user/website-ia.mdx                           |  60 +++-
 docs/workflow-guides/claude-code.mdx               |  36 ++-
 docs/workflow-guides/codex.mdx                     |  29 +-
 docs/workflow-guides/github-actions.mdx            |  28 ++
 packages/agentplane/README.md                      |  32 +-
 website/docusaurus.config.ts                       |  89 +++++-
 website/sidebars.ts                                |  44 ++-
 website/src/data/homepage-content.ts               | 133 ++++----
 website/src/pages/index.tsx                        |  35 ++-
 .../social/docs/workflow-guides/claude-code.png    | Bin 53889 -> 56535 bytes
 .../img/social/docs/workflow-guides/codex.png      | Bin 50140 -> 53854 bytes
 27 files changed, 1336 insertions(+), 595 deletions(-)
```

</details>
