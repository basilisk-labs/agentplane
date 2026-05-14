Task: `202605141638-78JKTQ`
Title: Harden cloud auto-push failure semantics
Canonical task record: `.agentplane/tasks/202605141638-78JKTQ/README.md`

## Summary

Harden cloud auto-push failure semantics

Design and implement protection for cloud-backend local mutations when maybeAutoPush fails, so pending local writes cannot be silently overwritten by a later prefer-remote pull. Add tests that cover network/retriable push failure followed by pull conflict resolution.

## Scope

- In scope: Design and implement protection for cloud-backend local mutations when maybeAutoPush fails, so pending local writes cannot be silently overwritten by a later prefer-remote pull. Add tests that cover network/retriable push failure followed by pull conflict resolution.
- Out of scope: unrelated refactors not required for "Harden cloud auto-push failure semantics".

## Verification

- State: ok
- Note:

```text
Cloud auto-push failure protection verified: failed auto-push now writes durable pending_push state,
prefer-remote pull refuses to overwrite pending local mutations, inspect freshness exposes
pendingPush, and explicit successful push clears the marker. Checks: task-backend.cloud.test.ts +
cloud-backend-state.test.ts 30 tests passed; agentplane typecheck passed; targeted eslint passed;
policy routing passed.
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-14T17:36:30.606Z
- Branch: task/202605141638-78JKTQ/v06-audit-followups
- Head: 4b51366ad263

```text
No changes detected.
```

</details>
