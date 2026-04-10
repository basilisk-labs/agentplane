# PR Review

Created: 2026-04-10T00:58:54.553Z
Branch: task/202604100054-REVRR6/finish-done-validation-order

## Summary

Prevent finish from mutating task docs before DONE validation

Fix finish so structured findings do not append to task README before already-DONE and --force validation completes; add regression coverage for failure without mutation and idempotent forced retry.

## Scope

- In scope: Fix finish so structured findings do not append to task README before already-DONE and --force validation completes; add regression coverage for failure without mutation and idempotent forced retry.
- Out of scope: unrelated refactors not required for "Prevent finish from mutating task docs before DONE validation".

## Verification

### Plan

1. Run the finish regression test that exercises `DONE` tasks with structured findings but without `--force`. Expected: the command fails and the task README is byte-for-byte unchanged.
2. Run the forced retry/idempotence finish test. Expected: `--force` still permits the retry path without duplicating DONE metadata or structured findings.
3. Inspect the finish flow ordering in code. Expected: DONE/force validation executes before any task-doc mutation helper is called.

### Current Status

- State: ok
- Note: vitest: bun x vitest run packages/agentplane/src/commands/task/finish.unit.test.ts; eslint: bun x eslint packages/agentplane/src/commands/task/finish.ts packages/agentplane/src/commands/task/finish.unit.test.ts

## Risks

- Risk level: not recorded
- Breaking change: no

### Rollback

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<!-- BEGIN AUTO SUMMARY -->
<details>
<summary>Raw evidence</summary>

- Updated: 2026-04-10T01:11:53.948Z
- Branch: task/202604100054-REVRR6/finish-done-validation-order
- Head: 0bf76c7322cc

```text
No changes detected.
```

</details>
<!-- END AUTO SUMMARY -->
