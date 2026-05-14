# PR Review

Created: 2026-05-13T20:59:57.460Z

## Task

- Task: `202605132058-36REEV`
- Title: Split PR metadata helpers
- Status: DOING
- Branch: `task/202605132058-36REEV/split-pr-meta`
- Canonical task record: `.agentplane/tasks/202605132058-36REEV/README.md`

## Verification

- State: ok
- Note: Verified: pr-meta focused tests passed (16 tests); typecheck passed; hotspot threshold check passed with existing warning-only debt; Prettier matched files passed; policy routing passed.
- Canonical workflow state lives in the task README.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<!-- BEGIN AUTO SUMMARY -->
<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-14T06:51:05.175Z
- Branch: task/202605132058-36REEV/split-pr-meta
- Head: ab343f9a369d

```text
 .agentplane/policy/incidents.md                    |   1 +
 .../blueprint/resolved-snapshot.json               | 528 ++++++++++++++++++
 packages/agentplane/src/commands/shared/pr-meta.ts | 606 +--------------------
 .../src/commands/shared/pr-meta/builders.ts        | 229 ++++++++
 .../src/commands/shared/pr-meta/helpers.ts         |  86 +++
 .../src/commands/shared/pr-meta/lifecycle.ts       |  60 ++
 .../src/commands/shared/pr-meta/parser.ts          | 132 +++++
 .../src/commands/shared/pr-meta/types.ts           |  23 +
 .../src/commands/shared/pr-meta/verify-log.ts      |  71 +++
 scripts/baselines/knip-baseline.json               |  83 ++-
 10 files changed, 1185 insertions(+), 634 deletions(-)
```

</details>
<!-- END AUTO SUMMARY -->
