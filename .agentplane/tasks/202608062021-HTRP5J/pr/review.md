# PR Review

Created: 2026-08-06T22:03:16.318Z

## Task

- Task: `202608062021-HTRP5J`
- Title: Classify compatibility adapters for bounded 0.8 retirement
- Status: DOING
- Branch: `task/202608062021-HTRP5J/classify-compatibility-adapters-for-bounded-0-8`
- Canonical task record: `.agentplane/tasks/202608062021-HTRP5J/README.md`

## Verification

- State: needs_rework
- Note: Legacy manifest schema v2, doctor report, targeted tests, typecheck, docs reference, lint, and runtime JSON inspection pass. Critical suite remains blocked by the shared compatibility-contract ratchet owned by 202608061850-BZT3D9; rebase after that foundation merges and rerun all Verify Steps.
- Canonical workflow state lives in the task README.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<!-- BEGIN AUTO SUMMARY -->
<details>
<summary>Raw evidence</summary>

- Updated: 2026-08-06T22:03:41.537Z
- Branch: task/202608062021-HTRP5J/classify-compatibility-adapters-for-bounded-0-8
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 docs/user/breaking-changes.mdx                     | 18 ++++
 docs/user/cli-reference.generated.mdx              |  1 +
 docs/user/commands.mdx                             |  3 +-
 .../assets/compatibility-retirement-manifest.json  | 96 ++++++++++++++++++++--
 .../agentplane/src/commands/doctor-legacy.run.ts   | 24 +++++-
 .../src/commands/doctor/legacy-manifest.ts         | 74 ++++++++++++++++-
 .../src/commands/doctor/legacy-probes.test.ts      | 43 ++++++++++
 .../src/commands/doctor/legacy-probes.ts           | 12 ++-
 8 files changed, 259 insertions(+), 12 deletions(-)
```

</details>
<!-- END AUTO SUMMARY -->
