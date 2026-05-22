Task: `202605220959-6R6Y21`
Title: Fix open upgrade and blueprint artifact issues
Canonical task record: `.agentplane/tasks/202605220959-6R6Y21/README.md`

## Summary

Fix open upgrade and blueprint artifact issues

Fix GitHub issues #4010, #4011, and #4012 by hardening upgrade commit boundaries and clarifying blueprint task artifact handling.

## Scope

- In scope: Fix GitHub issues #4010, #4011, and #4012 by hardening upgrade commit boundaries and clarifying blueprint task artifact handling.
- Out of scope: unrelated refactors not required for "Fix open upgrade and blueprint artifact issues".

## Verification

- State: ok
- Note:

```text
Verified: EVALUATOR quality gate re-run after lint-fix commit b40ef2939. Hosted verify-routed
failure was targeted ESLint only; local targeted ESLint, focused Vitest, typecheck, format, diff
check, doctor, and routing checks now pass. BlueprintSnapshotRef:
cbd6cbc9c91eea107af28b205fade48933638e0957e81159a25e5cf45a21e838
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-22T10:18:20.989Z
- Branch: task/202605220959-6R6Y21/fix-open-issues
- Head: b40ef293923a

```text
 .../blueprint/resolved-snapshot.json               | 570 +++++++++++++++++++++
 .../cli/run-cli.core.branch-meta.readiness.test.ts |  81 ++-
 .../src/cli/run-cli.core.upgrade.test.ts           |  64 +++
 .../cli/run-cli/commands/core/preflight-render.ts  |   1 +
 .../cli/run-cli/commands/core/preflight-report.ts  |  21 +-
 packages/agentplane/src/commands/upgrade.ts        |  42 +-
 packages/agentplane/src/commands/upgrade/apply.ts  |  42 ++
 7 files changed, 816 insertions(+), 5 deletions(-)
```

</details>
