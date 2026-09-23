Task: `202609231152-HP97AA`
Title: Allow explicit USER rejection of an approved blocked canonical plan
Canonical task record: `.agentplane/tasks/202609231152-HP97AA/README.md`

## Summary

Allow explicit USER rejection of an approved blocked canonical plan

Fix the unreachable canonical replanning route: task plan reject currently treats reject_plan as planning but rejects it whenever USER authority lineage exists. Preserve USER authority and existing blocked implementation evidence, allow only the exact manual USER rejection path, and add a regression test that exercises the real runtime guard.

## Scope

- In scope: Fix the unreachable canonical replanning route: task plan reject currently treats reject_plan as planning but rejects it whenever USER authority lineage exists. Preserve USER authority and existing blocked implementation evidence, allow only the exact manual USER rejection path, and add a regression test that exercises the real runtime guard.
- Out of scope: unrelated refactors not required for "Allow explicit USER rejection of an approved blocked canonical plan".

## Verification

- State: ok
- Note: Verified: canonical Task Kernel final checks passed.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-09-23T12:04:47.411Z
- Branch: task/202609231152-HP97AA/allow-explicit-user-rejection-of-an-approved-blo
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../src/commands/task/kernel-runtime-context.ts    | 27 ++++++++++-----
 .../src/commands/task/plan-reject.command.test.ts  | 40 ++++++++++++++++++++++
 2 files changed, 58 insertions(+), 9 deletions(-)
```

</details>
