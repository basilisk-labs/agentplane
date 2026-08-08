# PR Review

Created: 2026-08-06T22:03:16.318Z

## Task

- Task: `202608062021-HTRP5J`
- Title: Classify compatibility adapters for bounded 0.8 retirement
- Status: DONE
- Branch: `task/202608062021-HTRP5J/classify-compatibility-adapters-for-bounded-0-8`
- Canonical task record: `.agentplane/tasks/202608062021-HTRP5J/README.md`

## Verification

- State: ok
- Note: Doctor legacy now exposes retirement policy, scope, and removal blocker in both JSON and human output; all declared and repository contract checks pass.
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
 docs/user/commands.mdx                             |  3 +-
 .../assets/compatibility-retirement-manifest.json  | 96 ++++++++++++++++++++--
 .../agentplane/src/commands/doctor-legacy.run.ts   | 25 +++++-
 .../src/commands/doctor/legacy-manifest.ts         | 74 ++++++++++++++++-
 .../src/commands/doctor/legacy-probes.test.ts      | 47 +++++++++++
 .../src/commands/doctor/legacy-probes.ts           | 12 ++-
 7 files changed, 263 insertions(+), 12 deletions(-)
```

</details>
<!-- END AUTO SUMMARY -->
