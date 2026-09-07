# PR Review

Created: 2026-09-07T15:46:17.994Z

## Task

- Task: `202609071541-47TFVD`
- Title: Propagate approved CI scope to external implementation commit guards
- Status: DOING
- Branch: `task/202609071541-47TFVD/propagate-approved-ci-scope-to-external-implemen`
- Canonical task record: `.agentplane/tasks/202609071541-47TFVD/README.md`

## Verification

- State: needs_rework
- Note: Rework: Declared check failed: bun run ci:local:full
- Canonical workflow state lives in the task README.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<!-- BEGIN AUTO SUMMARY -->
<details>
<summary>Raw evidence</summary>

- Updated: 2026-09-07T15:48:53.177Z
- Branch: task/202609071541-47TFVD/propagate-approved-ci-scope-to-external-implemen
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../external-agent-implementation-authority.ts     | 22 +++++-
 .../external-agent-implementation-recovery.test.ts | 83 ++++++++++++++++++++++
 2 files changed, 103 insertions(+), 2 deletions(-)
```

</details>
<!-- END AUTO SUMMARY -->
