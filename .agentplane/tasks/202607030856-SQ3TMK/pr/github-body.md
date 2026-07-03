Task: `202607030856-SQ3TMK`
Title: Fix context wiki index lint and strengthen extraction assimilation
Canonical task record: `.agentplane/tasks/202607030856-SQ3TMK/README.md`

## Summary

Fix context wiki index lint and strengthen extraction assimilation

Fix the post-index wiki lint failure found during assimilation smoke testing, improve extraction apply/reporting where source-backed assimilation is weak, and verify with a larger network-document assimilation test on main.

## Scope

- In scope: Fix the post-index wiki lint failure found during assimilation smoke testing, improve extraction apply/reporting where source-backed assimilation is weak, and verify with a larger network-document assimilation test on main.
- Out of scope: unrelated refactors not required for "Fix context wiki index lint and strengthen extraction assimilation".

## Verification

- State: ok
- Note:

```text
Review fixes verified: legacy generated wiki index pages are healed with frontmatter; extraction
apply reports input_source_paths separately from applied source_paths.
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-07-03T09:16:42.189Z
- Branch: task/202607030856-SQ3TMK/fix-context-wiki-index-lint-and-strengthen-extra
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../commands/context/extraction-apply.unit.test.ts | 49 ++++++++++++++++-
 .../agentplane/src/commands/context/extraction.ts  |  2 +-
 .../src/commands/context/release-readiness.test.ts | 10 ++++
 .../src/commands/context/wiki-index.unit.test.ts   | 63 ++++++++++++++++++++++
 packages/agentplane/src/commands/context/wiki.ts   | 26 ++++++++-
 .../agentplane/src/context/extraction-writer.ts    | 29 ++++++++++
 6 files changed, 175 insertions(+), 4 deletions(-)
```

</details>
