# PR Review

Created: 2026-05-14T13:16:34.344Z

## Task

- Task: `202605141314-QGDT9K`
- Title: Fix v0.6.0 release notes quality gate
- Status: DOING
- Branch: `task/202605141314-QGDT9K/fix-v06-release-notes`
- Canonical task record: `.agentplane/tasks/202605141314-QGDT9K/README.md`

## Verification

- State: ok
- Note: Release notes quality gate verified: v0.6.0 notes now use the release template, validation rejects frontmatter-only headings and missing sections, and targeted release tests pass.
- Canonical workflow state lives in the task README.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<!-- BEGIN AUTO SUMMARY -->
<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-14T13:33:07.351Z
- Branch: task/202605141314-QGDT9K/fix-v06-release-notes
- Head: e3a1368b5bfb

```text
 .../blueprint/resolved-snapshot.json               | 415 +++++++++++++++++++++
 docs/releases/README.md                            |  16 +-
 docs/releases/v0.6.0.md                            |  85 +++--
 .../src/commands/release/apply.apply-flow.test.ts  |   9 +-
 .../commands/release/apply.preflight.package.ts    |  46 ++-
 .../src/commands/release/apply.preflight.test.ts   | 140 ++++---
 .../commands/release/apply.push-recovery.test.ts   |  13 +-
 .../release/apply.version-mutation.test.ts         |  11 +-
 packages/testkit/src/release.ts                    |  33 ++
 scripts/release/check-release-notes.mjs            | 105 ++----
 10 files changed, 708 insertions(+), 165 deletions(-)
```

</details>
<!-- END AUTO SUMMARY -->
