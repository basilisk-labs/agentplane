# PR Review

Created: 2026-08-06T22:11:26.099Z

## Task

- Task: `202608062023-V3WHE9`
- Title: Add safe local evidence retention, statistics, and garbage collection
- Status: DOING
- Branch: `task/202608062023-V3WHE9/add-safe-local-evidence-retention-statistics-and`
- Canonical task record: `.agentplane/tasks/202608062023-V3WHE9/README.md`

## Verification

- State: needs_rework
- Note: Evidence unit/maintenance suites pass (8 tests), CLI contract passes (3 tests), typecheck/lint/docs/build pass, and live dry runs report 17,457 tracked evidence files / 145,406,551 bytes, 189 valid reachable objects, 19 safe compact candidates, and 0 GC candidates. Critical suite remains blocked by the shared compatibility ratchet owned by 202608061850-BZT3D9.
- Canonical workflow state lives in the task README.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<!-- BEGIN AUTO SUMMARY -->
<details>
<summary>Raw evidence</summary>

- Updated: 2026-08-06T22:11:40.567Z
- Branch: task/202608062023-V3WHE9/add-safe-local-evidence-retention-statistics-and
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 docs/user/cli-reference.generated.mdx              |  97 ++++++
 docs/user/commands.mdx                             |  39 +++
 .../src/cli/run-cli.core.evidence.test.ts          |  55 ++++
 ...-cli.critical.agent-efficiency-baseline.test.ts |  15 +-
 .../src/cli/run-cli/command-catalog/project.ts     |  28 +-
 .../src/cli/run-cli/command-loaders/evidence.ts    |  44 +++
 .../src/cli/run-cli/command-loaders/project.ts     |  11 -
 .../src/commands/evidence/evidence-inventory.ts    | 343 ++++++++++++++++++++
 .../evidence/evidence-maintenance.command.ts       | 185 +++++++++++
 .../commands/evidence/evidence-maintenance.test.ts | 360 +++++++++++++++++++++
 .../src/commands/evidence/evidence-maintenance.ts  | 206 ++++++++++++
 .../src/commands/evidence/evidence-manifest.ts     |  16 +-
 .../src/commands/evidence/evidence-sha256.ts       |  12 +
 .../src/commands/evidence/evidence.command.ts      |   4 +-
 .../baselines/v0.7-compatibility-candidate.json    | 195 ++++++++++-
 .../check-compatibility-contract-baseline.mjs      | 130 +++++++-
 16 files changed, 1696 insertions(+), 44 deletions(-)
```

</details>
<!-- END AUTO SUMMARY -->
