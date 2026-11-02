# PR Review

Created: 2026-11-02T09:31:31.784Z

## Task

- Task: `202611011514-52DTSZ`
- Title: Publish approved stale-admission retirement with exact compatibility delta
- Status: DOING
- Branch: `task/202611011514-52DTSZ/publish-approved-stale-admission-retirement-with`
- Canonical task record: `.agentplane/tasks/202611011514-52DTSZ/README.md`

## Verification

- State: pending
- Note: Not recorded yet.
- Canonical workflow state lives in the task README.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<!-- BEGIN AUTO SUMMARY -->
<details>
<summary>Raw evidence</summary>

- Updated: 2026-11-02T09:31:31.784Z
- Branch: task/202611011514-52DTSZ/publish-approved-stale-admission-retirement-with
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 ...run-cli.core.stale-admission-retirement.test.ts | 625 +++++++++++++++++++++
 .../src/cli/run-cli/command-catalog/task.ts        |   7 +
 .../src/cli/run-cli/command-loaders/task.ts        |   4 +
 .../task/stale-admission-retirement-evidence.ts    | 212 +++++++
 .../stale-admission-retirement-recovery.test.ts    | 161 ++++++
 .../task/stale-admission-retirement-validation.ts  | 431 ++++++++++++++
 .../task/stale-admission-retirement.command.ts     | 134 +++++
 .../task/stale-admission-retirement.test.ts        | 102 ++++
 .../commands/task/stale-admission-retirement.ts    | 158 ++++++
 .../baselines/v0.7-compatibility-candidate.json    |  79 ++-
 .../check-compatibility-contract-baseline.mjs      |  43 +-
 .../check-compatibility-contract-baseline.test.mjs |  52 ++
 12 files changed, 1997 insertions(+), 11 deletions(-)
```

</details>
<!-- END AUTO SUMMARY -->
