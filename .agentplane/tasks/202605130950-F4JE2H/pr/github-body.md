Task: `202605130950-F4JE2H`
Title: Stabilize recent GitHub CI failure modes
Canonical task record: `.agentplane/tasks/202605130950-F4JE2H/README.md`

## Summary

Stabilize recent GitHub CI failure modes

Make recent GitHub Actions failures less likely by hermeticizing wait-remote-pr-checks tests, handling sqlite stdin pipe errors, and reducing CI gate noise without weakening code quality.

## Scope

- In scope: Make recent GitHub Actions failures less likely by hermeticizing wait-remote-pr-checks tests, handling sqlite stdin pipe errors, and reducing CI gate noise without weakening code quality.
- Out of scope: unrelated refactors not required for "Stabilize recent GitHub CI failure modes".

## Verification

- State: pending
- Note: Not recorded yet.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-13T10:00:51.210Z
- Branch: task/202605130950-F4JE2H/ci-failure-stability
- Head: 7587eeffa3af

```text
 .github/workflows/ci.yml                           |  4 +-
 .../src/cli/wait-remote-pr-checks-script.test.ts   | 62 ++++++++++++++-
 .../agentplane/src/commands/context/sqlite.test.ts | 87 ++++++++++++++++++++++
 packages/agentplane/src/commands/context/sqlite.ts | 37 +++++++--
 4 files changed, 178 insertions(+), 12 deletions(-)
```

</details>
