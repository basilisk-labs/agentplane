# PR Review

Created: 2026-05-13T08:09:10.107Z

## Task

- Task: `202605130758-4FB61V`
- Title: Fix release notes template leakage
- Status: DOING
- Branch: `task/202605130758-4FB61V/release-notes-template-guard`
- Canonical task record: `.agentplane/tasks/202605130758-4FB61V/README.md`

## Verification

- State: ok
- Note: Verified release notes template leakage fix: v0.5.0 placeholders removed; release notes validators reject template placeholders, Writing Rules blocks, and duplicate section headings. Checks passed: bun test packages/agentplane/src/commands/release/apply.preflight.test.ts; bunx eslint scripts/check-release-notes.mjs packages/agentplane/src/commands/release/apply.preflight.package.ts packages/agentplane/src/commands/release/apply.preflight.test.ts; node scripts/check-release-notes.mjs --tag v0.5.0; node .agentplane/policy/check-routing.mjs; ap doctor; git diff --check.
- Canonical workflow state lives in the task README.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<!-- BEGIN AUTO SUMMARY -->
<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-13T09:53:33.482Z
- Branch: task/202605130758-4FB61V/release-notes-template-guard
- Head: 24b1dc2ed0f2

```text
 .../blueprint/resolved-snapshot.json               | 415 +++++++++++++++++++++
 docs/releases/v0.5.0.md                            |  32 +-
 .../commands/release/apply.preflight.package.ts    |  50 +++
 .../src/commands/release/apply.preflight.test.ts   |  66 +++-
 scripts/check-release-notes.mjs                    |  42 +++
 5 files changed, 576 insertions(+), 29 deletions(-)
```

</details>
<!-- END AUTO SUMMARY -->
