Task: `202605041907-B7VKWQ`
Title: Fix lint blockers for docs branch push

## Summary

Fix lint blockers for docs branch push

Fix the two ESLint errors blocking pre-push on the docs branch: prefer RegExp.exec in runtime.command.test.ts and remove the unused CONFIG_REL_PATH import in upgrade.ts.

## Scope

- In scope: Fix the two ESLint errors blocking pre-push on the docs branch: prefer RegExp.exec in runtime.command.test.ts and remove the unused CONFIG_REL_PATH import in upgrade.ts.
- Out of scope: unrelated refactors not required for "Fix lint blockers for docs branch push".

## Verification

- State: ok
- Note: Focused lint blockers fixed and verified.
- Full verification checklist lives in local review.md.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-04T19:10:02.393Z
- Branch: task/202605041830-H4923B/dev-fast-local-checks
- Head: 936c5c9d0840

```text
 .agentplane/WORKFLOW.md                            |   2 +-
 .agentplane/tasks/202605041830-H4923B/README.md    | 171 +++++++++
 .../tasks/202605041830-H4923B/pr/diffstat.txt      |   4 +
 .../tasks/202605041830-H4923B/pr/github-body.md    |  40 ++
 .../tasks/202605041830-H4923B/pr/github-title.txt  |   1 +
 .agentplane/tasks/202605041830-H4923B/pr/meta.json |  14 +
 .../tasks/202605041830-H4923B/pr/notes.jsonl       |   0
 .agentplane/tasks/202605041830-H4923B/pr/review.md |  64 ++++
 .../tasks/202605041830-H4923B/pr/verify.log        |   0
 .agentplane/tasks/202605041903-H4PPTY/README.md    | 137 +++++++
 .../tasks/202605041903-H4PPTY/pr/diffstat.txt      |  15 +
 .../tasks/202605041903-H4PPTY/pr/github-body.md    |  50 +++
 .../tasks/202605041903-H4PPTY/pr/github-title.txt  |   1 +
 .agentplane/tasks/202605041903-H4PPTY/pr/meta.json |  14 +
 .../tasks/202605041903-H4PPTY/pr/notes.jsonl       |   0
 .agentplane/tasks/202605041903-H4PPTY/pr/review.md |  73 ++++
 .../tasks/202605041903-H4PPTY/pr/verify.log        |   0
 docs/developer/blueprints.mdx                      | 421 +++++++++++++++++++++
 docs/developer/code-quality.mdx                    |  26 +-
 docs/developer/contributing.mdx                    |  12 +-
 docs/index.mdx                                     |  31 +-
 website/sidebars.ts                                |   1 +
 22 files changed, 1059 insertions(+), 18 deletions(-)
```

</details>
