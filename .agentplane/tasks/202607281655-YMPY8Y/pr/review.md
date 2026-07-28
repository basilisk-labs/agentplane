# PR Review

Created: 2026-07-28T16:57:04.791Z

## Task

- Task: `202607281655-YMPY8Y`
- Title: Authorize replacement evaluator episodes after terminal failure
- Status: DONE
- Branch: `task/202607281655-YMPY8Y/authorize-replacement-evaluator-episodes-after-t`
- Canonical task record: `.agentplane/tasks/202607281655-YMPY8Y/README.md`

## Verification

- State: ok
- Note: Hosted static rework verified: all replacement-test lint findings are resolved while the eight command-level replacement scenarios remain green.
- Canonical workflow state lives in the task README.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<!-- BEGIN AUTO SUMMARY -->
<details>
<summary>Raw evidence</summary>

- Updated: 2026-07-28T16:57:08.231Z
- Branch: task/202607281655-YMPY8Y/authorize-replacement-evaluator-episodes-after-t
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 docs/user/cli-reference.generated.mdx              |   1 +
 ...-cli.critical.agent-efficiency-baseline.test.ts |   7 +-
 .../evaluator/evaluator-execute-supervisor.ts      |  66 +++-
 .../evaluator/evaluator-execute.command.test.ts    | 369 ++++++++++++++++++++-
 .../commands/evaluator/evaluator-review-usecase.ts |  20 +-
 .../evaluator/evaluator-verification-records.ts    |  15 +
 .../src/commands/evaluator/evaluator.command.ts    |   1 +
 .../src/commands/evaluator/evaluator.spec.ts       |   9 +
 .../shared/supervisor-execution-episode.ts         | 133 ++++++--
 .../runner/supervisor-execution-episode.test.ts    | 128 +++++++
 .../src/runner/supervisor-execution-episode.ts     | 102 +++++-
 packages/core/src/schemas/index.ts                 |   1 +
 .../baselines/v0.7-compatibility-candidate.json    |  35 +-
 .../check-compatibility-contract-baseline.mjs      |  16 +
 14 files changed, 855 insertions(+), 48 deletions(-)
```

</details>
<!-- END AUTO SUMMARY -->
