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
Verified: EVALUATOR quality gate re-run after implementation commit d191d3340. The fix covers
#4010/#4011 by committing runtime SQLite .gitignore upgrade leftovers and allowlisted managed
leftovers, and covers #4012 by classifying blueprint artifacts as task_blueprint_evidence.
BlueprintSnapshotRef: cbd6cbc9c91eea107af28b205fade48933638e0957e81159a25e5cf45a21e838
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-22T10:11:06.313Z
- Branch: task/202605220959-6R6Y21/fix-open-issues
- Head: d191d3340c96

```text
 .../blueprint/resolved-snapshot.json               | 570 +++++++++++++++++++++
 .../cli/run-cli.core.branch-meta.readiness.test.ts |  81 ++-
 .../src/cli/run-cli.core.upgrade.test.ts           |  63 +++
 .../cli/run-cli/commands/core/preflight-render.ts  |   1 +
 .../cli/run-cli/commands/core/preflight-report.ts  |  21 +-
 packages/agentplane/src/commands/upgrade.ts        |  42 +-
 packages/agentplane/src/commands/upgrade/apply.ts  |  42 ++
 7 files changed, 815 insertions(+), 5 deletions(-)
```

</details>
