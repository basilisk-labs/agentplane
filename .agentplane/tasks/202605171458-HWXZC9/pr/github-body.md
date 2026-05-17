Task: `202605171458-HWXZC9`
Title: Fix context init starter wiki lint
Canonical task record: `.agentplane/tasks/202605171458-HWXZC9/README.md`

## Summary

Fix context init starter wiki lint

Ensure context init generated starter wiki pages satisfy context wiki lint frontmatter requirements, including adaptive profile starter indexes and AGENTS page.

## Scope

- In scope: Ensure context init generated starter wiki pages satisfy context wiki lint frontmatter requirements, including adaptive profile starter indexes and AGENTS page.
- Out of scope: unrelated refactors not required for "Fix context init starter wiki lint".

## Verification

- State: ok
- Note:

```text
Verified context init starter wiki lint fix: fresh adaptive context init now generates lintable
starter wiki pages; focused regression and local checks pass.
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-17T15:31:42.491Z
- Branch: task/202605171458-HWXZC9/context-init-wiki-lint
- Head: 0747a540ef6b

```text
 .../blueprint/resolved-snapshot.json               | 559 +++++++++++++++++++++
 .../agentplane/src/commands/context/init-wiki.ts   | 103 ++++
 packages/agentplane/src/commands/context/init.ts   |  56 +--
 .../src/commands/context/release-readiness.test.ts |  30 ++
 4 files changed, 707 insertions(+), 41 deletions(-)
```

</details>
