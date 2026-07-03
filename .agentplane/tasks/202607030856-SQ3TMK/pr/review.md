# PR Review

Created: 2026-07-03T08:58:48.978Z

## Task

- Task: `202607030856-SQ3TMK`
- Title: Fix context wiki index lint and strengthen extraction assimilation
- Status: DOING
- Branch: `task/202607030856-SQ3TMK/fix-context-wiki-index-lint-and-strengthen-extra`
- Canonical task record: `.agentplane/tasks/202607030856-SQ3TMK/README.md`

## Verification

- State: ok
- Note: Focused context tests, routing policy check, doctor, typecheck, lint:core, format:changed, and six-document assimilation smoke test passed.
- Canonical workflow state lives in the task README.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<!-- BEGIN AUTO SUMMARY -->
<details>
<summary>Raw evidence</summary>

- Updated: 2026-07-03T08:58:48.978Z
- Branch: task/202607030856-SQ3TMK/fix-context-wiki-index-lint-and-strengthen-extra
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../tasks/202607030734-7S66KX/pr/diffstat.txt      |  9 ++++-
 .../tasks/202607030734-7S66KX/pr/github-body.md    | 11 ++++--
 .../tasks/202607030734-7S66KX/pr/github-title.txt  |  2 +-
 .agentplane/tasks/202607030734-7S66KX/pr/meta.json |  2 +-
 .agentplane/tasks/202607030734-7S66KX/pr/review.md | 13 +++++--
 .../run-cli.core.help-snap.test.ts.snap            |  9 ++++-
 .../src/cli/run-cli.core.docs-cli.test.ts          |  2 +-
 ...run-cli.core.lifecycle.finish-branch-pr.test.ts | 17 +++++----
 ...-cli.core.lifecycle.finish-close-commit.test.ts |  6 +++-
 .../run-cli.core.pr-flow.pr-open.network.test.ts   | 12 +++----
 ...re.pr-flow.pr-validation.open-hydration.test.ts | 41 ++++++++++++++--------
 ...n-cli.core.pr-flow.pr-validation.update.test.ts | 10 +++---
 .../commands/context/extraction-apply.unit.test.ts |  7 +++-
 .../agentplane/src/commands/context/extraction.ts  |  2 +-
 .../src/commands/context/release-readiness.test.ts | 10 ++++++
 packages/agentplane/src/commands/context/wiki.ts   | 13 ++++++-
 .../agentplane/src/context/extraction-writer.ts    | 25 +++++++++++++
 17 files changed, 146 insertions(+), 45 deletions(-)
```

</details>
<!-- END AUTO SUMMARY -->
