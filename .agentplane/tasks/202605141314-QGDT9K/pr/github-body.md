Task: `202605141314-QGDT9K`
Title: Fix v0.6.0 release notes quality gate
Canonical task record: `.agentplane/tasks/202605141314-QGDT9K/README.md`

## Summary

Fix v0.6.0 release notes quality gate

Rewrite the v0.6.0 release notes into the public release-note format, harden validation so shallow changelog text cannot pass, and update the published GitHub Release body after verification.

## Scope

- In scope: Rewrite the v0.6.0 release notes into the public release-note format, harden validation so shallow changelog text cannot pass, and update the published GitHub Release body after verification.
- Out of scope: unrelated refactors not required for "Fix v0.6.0 release notes quality gate".

## Verification

- State: ok
- Note:

```text
Release notes quality gate verified: v0.6.0 notes now use the release template, validation rejects
frontmatter-only headings and missing sections, and targeted release tests pass.
```
- Canonical workflow state lives in the task README.

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
