## Summary

Apply recipe prompt mutations to compiled graph

Wire installed and active recipe prompt module mutations into the compiled prompt graph refresh path so recipe enable/disable/update can affect generated prompt surfaces transactionally.

## Scope

- In scope: apply active recipe prompt module mutations during project overlay/prompt graph refresh.
- In scope: transactional behavior for install/enable/disable/update and conflict/requirement failures.
- In scope: local artifact refresh only; no remote recipe index refresh unless separately approved.
- Out of scope: adding new recipe catalog content.

## Verification

- State: ok
- Note: Active recipe prompt modules and mutation sets now compile into generated prompt-graph.json during recipe refresh, with compile failures blocking transactional publication.
- Full verification checklist lives in local review.md.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-04-29T19:14:12.219Z
- Branch: task/202604291531-N0H28A/recipe-mutation-graph
- Head: 3784a23ed7ca

```text
 .../src/commands/recipes.transaction.test.ts       |  88 ++++++++++++-
 .../agentplane/src/commands/recipes/impl/apply.ts  | 138 +------------------
 .../src/commands/recipes/impl/overlay-compile.ts   |  65 +++++++++
 .../commands/recipes/impl/overlay-project.test.ts  |  20 ++-
 .../src/commands/recipes/impl/overlay-project.ts   |   4 +
 .../src/commands/recipes/impl/overlay-publish.ts   |  24 ++++
 .../agentplane/src/commands/recipes/impl/paths.ts  |   4 +
 .../recipes/impl/project-installed-recipes.test.ts |  16 ++-
 .../src/commands/recipes/impl/prompt-assets.ts     | 146 +++++++++++++++++++++
 .../agentplane/src/runtime/prompt-modules/index.ts |   1 +
 .../src/runtime/prompt-modules/validation.ts       |  46 +++++++
 11 files changed, 407 insertions(+), 145 deletions(-)
```

</details>
