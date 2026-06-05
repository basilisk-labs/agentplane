# PR Review

Created: 2026-06-05T06:33:43.715Z

## Task

- Task: `202606050602-FH9XC6`
- Title: Publish v0.6.18 patch release
- Status: DOING
- Branch: `task/202606050602-FH9XC6/publish-v0-6-18-patch-release`
- Canonical task record: `.agentplane/tasks/202606050602-FH9XC6/README.md`

## Verification

- State: pending
- Note: Not recorded yet.
- Canonical workflow state lives in the task README.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<!-- BEGIN AUTO SUMMARY -->
<details>
<summary>Raw evidence</summary>

- Updated: 2026-06-05T06:33:43.715Z
- Branch: task/202606050602-FH9XC6/publish-v0-6-18-patch-release
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .agentplane/WORKFLOW.md                            |   3 +-
 .agentplane/workflows/last-known-good.md           |   3 +-
 docs/reference/generated-reference.mdx             |   6 +--
 docs/releases/v0.6.18.md                           |  46 +++++++++++++++++++++
 packages/agentplane/package.json                   |   6 +--
 ....core.pr-flow.pr-check-remote-artifacts.test.ts |   2 +-
 packages/agentplane/src/commands/pr/check.ts       |  17 +++-----
 packages/core/package.json                         |   2 +-
 packages/recipes/package.json                      |   2 +-
 packages/recipes/src/index.ts                      |   2 +-
 packages/spec/examples/acr.json                    |   4 +-
 packages/testkit/package.json                      |   2 +-
 .../static/img/social/docs/releases/v0.6.18.png    | Bin 0 -> 54453 bytes
 website/static/img/social/manifest.json            |   8 ++++
 14 files changed, 76 insertions(+), 27 deletions(-)
```

</details>
<!-- END AUTO SUMMARY -->
