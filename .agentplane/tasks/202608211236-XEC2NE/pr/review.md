# PR Review

Created: 2026-08-21T12:41:06.582Z

## Task

- Task: `202608211236-XEC2NE`
- Title: Repair packaged candidate verification-contract refresh after managed upgrade
- Status: DOING
- Branch: `task/202608211236-XEC2NE/repair-packaged-candidate-verification-contract`
- Canonical task record: `.agentplane/tasks/202608211236-XEC2NE/README.md`

## Verification

- State: needs_rework
- Note: Rework: Declared check failed: node scripts/qualification/run-v0.7.1-release-qualification.mjs --mode audit --profile full --fail-on-scenario-failure --scenario packaged-candidate-flow
- Canonical workflow state lives in the task README.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<!-- BEGIN AUTO SUMMARY -->
<details>
<summary>Raw evidence</summary>

- Updated: 2026-08-21T21:04:38.003Z
- Branch: task/202608211236-XEC2NE/repair-packaged-candidate-verification-contract
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../task/verify-record-observed-changes.ts         |  4 +-
 .../task/verify-record.durability.unit.test.ts     | 45 ++++++++++++++++++++++
 2 files changed, 47 insertions(+), 2 deletions(-)
```

</details>
<!-- END AUTO SUMMARY -->
