Task: `202608062021-HTRP5J`
Title: Classify compatibility adapters for bounded 0.8 retirement
Canonical task record: `.agentplane/tasks/202608062021-HTRP5J/README.md`

## Summary

Classify compatibility adapters for bounded 0.8 retirement

Complete the compatibility retirement manifest so every adapter has an explicit removal version, support-until or zero-usage condition, archive conversion policy, or permanent historical-reader designation; keep historical readers out of normal execution paths where already separable, and verify doctor legacy reports the classification without deleting safety or recovery contracts in 0.7.5.

## Scope

- In scope: Complete the compatibility retirement manifest so every adapter has an explicit removal version, support-until or zero-usage condition, archive conversion policy, or permanent historical-reader designation; keep historical readers out of normal execution paths where already separable, and verify doctor legacy reports the classification without deleting safety or recovery contracts in 0.7.5.
- Out of scope: unrelated refactors not required for "Classify compatibility adapters for bounded 0.8 retirement".

## Verification

- State: ok
- Note:

```text
Bounded compatibility-retirement policy, doctor reporting, generated docs, type safety, critical
behavior, and repository contracts pass on current main.
```
- Canonical workflow state lives in the task README.

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
