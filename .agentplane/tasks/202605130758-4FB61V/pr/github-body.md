Task: `202605130758-4FB61V`
Title: Fix release notes template leakage
Canonical task record: `.agentplane/tasks/202605130758-4FB61V/README.md`

## Summary

Fix release notes template leakage

Remove template placeholders from v0.5.0 release notes and harden release notes validation against placeholder leakage.

## Scope

- In scope: Remove template placeholders from v0.5.0 release notes and harden release notes validation against placeholder leakage.
- Out of scope: unrelated refactors not required for "Fix release notes template leakage".

## Verification

- State: pending
- Note: Not recorded yet.
- Canonical workflow state lives in the task README.

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
