Task: `202610102009-NYTBDA`
Title: Qualify GitLab frozen-source and logical-target publication regression
Canonical task record: `.agentplane/tasks/202610102009-NYTBDA/README.md`

## Summary

Qualify GitLab frozen-source and logical-target publication regression

Issue #6119 was observed with installed 0.7.12-beta.1, not qualified7b46. Add generic regression coverage of the existing provider-base separation; do not duplicate or change production implementation. Exercise legacy task_execution_context base_ref/base_sha as a frozen40-character commit with configured logicalmain through real PR synchronization and GitLab POST payload construction, mocking only external transport. Use local Git target evidence, no live GitLab writes/network/provider. Preserve frozen verification/diff base and source/task evidence. Test missing or inconsistent branch evidence refuses before provider POST; retain existing GitHub behavior. No Factory-specific adapter, lifecycle workaround, retargeting or release claim. Read existing K43XFE/RDP source coverage; report exact source/runtime/check evidence for independent review.

## Scope

- In scope: Issue #6119 was observed with installed 0.7.12-beta.1, not qualified7b46. Add generic regression coverage of the existing provider-base separation; do not duplicate or change production implementation. Exercise legacy task_execution_context base_ref/base_sha as a frozen40-character commit with configured logicalmain through real PR synchronization and GitLab POST payload construction, mocking only external transport. Use local Git target evidence, no live GitLab writes/network/provider. Preserve frozen verification/diff base and source/task evidence. Test missing or inconsistent branch evidence refuses before provider POST; retain existing GitHub behavior. No Factory-specific adapter, lifecycle workaround, retargeting or release claim. Read existing K43XFE/RDP source coverage; report exact source/runtime/check evidence for independent review.
- Out of scope: unrelated refactors not required for "Qualify GitLab frozen-source and logical-target publication regression".

## Verification

- State: pending
- Note: Not recorded yet.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-10-10T20:23:08.421Z
- Branch: task/202610102009-NYTBDA/gitlab-frozen-base-regression
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../src/commands/pr/internal/provider-base.test.ts |  37 ++--
 .../pr/internal/sync-gitlab-frozen-base.test.ts    | 186 +++++++++++++++++++++
 2 files changed, 206 insertions(+), 17 deletions(-)
```

</details>
