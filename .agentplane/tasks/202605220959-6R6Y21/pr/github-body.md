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
Verified: EVALUATOR quality gate passed for the upgrade commit boundary and blueprint artifact
classification fix. Regression tests cover #4010/#4011 .gitignore upgrade leftovers and #4012
blueprint evidence classification; typecheck, format, doctor, and routing checks passed.
BlueprintSnapshotRef: cbd6cbc9c91eea107af28b205fade48933638e0957e81159a25e5cf45a21e838
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-22T10:00:06.472Z
- Branch: task/202605220959-6R6Y21/fix-open-issues
- Head: 78f88bcefaa1

```text
No changes detected.
```

</details>
