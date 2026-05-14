Task: `202605132058-36REEV`
Title: Split PR metadata helpers
Canonical task record: `.agentplane/tasks/202605132058-36REEV/README.md`

## Summary

Split PR metadata helpers

Refactor the shared branch_pr PR metadata helper into smaller compatibility-preserving modules without changing public imports or behavior.

## Scope

- In scope: Refactor the shared branch_pr PR metadata helper into smaller compatibility-preserving modules without changing public imports or behavior.
- Out of scope: unrelated refactors not required for "Split PR metadata helpers".

## Verification

- State: ok
- Note:

```text
Verified: pr-meta focused tests passed (16 tests); typecheck passed; hotspot threshold check passed
with existing warning-only debt; Prettier matched files passed; policy routing passed.
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-14T05:57:30.281Z
- Branch: task/202605132058-36REEV/split-pr-meta
- Head: 8eb04297f91d

```text
 .agentplane/policy/incidents.md                    |   1 +
 .../blueprint/resolved-snapshot.json               | 528 ++++++++++++++++++
 packages/agentplane/src/commands/shared/pr-meta.ts | 614 +--------------------
 .../src/commands/shared/pr-meta/builders.ts        | 229 ++++++++
 .../src/commands/shared/pr-meta/helpers.ts         |  86 +++
 .../src/commands/shared/pr-meta/lifecycle.ts       |  60 ++
 .../src/commands/shared/pr-meta/parser.ts          | 132 +++++
 .../src/commands/shared/pr-meta/types.ts           |  34 ++
 .../src/commands/shared/pr-meta/verify-log.ts      |  71 +++
 9 files changed, 1170 insertions(+), 585 deletions(-)
```

</details>
