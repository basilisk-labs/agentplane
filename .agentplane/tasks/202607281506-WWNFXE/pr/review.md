# PR Review

Created: 2026-07-28T15:06:48.295Z

## Task

- Task: `202607281506-WWNFXE`
- Title: Enforce non-empty EVALUATOR pass findings
- Status: DOING
- Branch: `task/202607281506-WWNFXE/enforce-evaluator-pass-findings`
- Canonical task record: `.agentplane/tasks/202607281506-WWNFXE/README.md`

## Verification

- State: ok
- Note: Verified evaluator quality-gate consistency: every pass now carries an evidence-backed finding and empty findings are rejected by both the provider schema and strict SGR validator. Checks passed: focused evaluator/SGR suites (39), typecheck, format, routing validation.
- Canonical workflow state lives in the task README.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<!-- BEGIN AUTO SUMMARY -->
<details>
<summary>Raw evidence</summary>

- Updated: 2026-07-28T15:07:14.580Z
- Branch: task/202607281506-WWNFXE/enforce-evaluator-pass-findings
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../evaluator-episode.calibration.test.ts          |  5 +++-
 .../src/commands/evaluator/evaluator-episode.ts    |  1 +
 .../evaluator/evaluator-execute.command.test.ts    | 22 ++++++++--------
 .../src/runtime/sgr/contract-evaluator-routing.ts  |  4 +--
 .../agentplane/src/runtime/sgr/contracts.test.ts   | 29 ++++++++++++----------
 5 files changed, 34 insertions(+), 27 deletions(-)
```

</details>
<!-- END AUTO SUMMARY -->
