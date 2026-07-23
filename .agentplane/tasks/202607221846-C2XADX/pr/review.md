# PR Review

Created: 2026-07-23T17:58:52.150Z

## Task

- Task: `202607221846-C2XADX`
- Title: Generate runner manifest examples from canonical fixtures
- Status: DOING
- Branch: `task/202607221846-C2XADX/generate-runner-manifest-examples-from-canonical`
- Canonical task record: `.agentplane/tasks/202607221846-C2XADX/README.md`

## Verification

- State: pending
- Note: Not recorded yet.
- Canonical workflow state lives in the task README.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<!-- BEGIN AUTO SUMMARY -->
<details>
<summary>Raw evidence</summary>

- Updated: 2026-07-23T17:58:56.069Z
- Branch: task/202607221846-C2XADX/generate-runner-manifest-examples-from-canonical
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 packages/agentplane/assets/RUNNER.md               |   2 +-
 .../src/runner/usecases/task-run-blueprint.test.ts |  28 +--
 .../task-run-bootstrap.result-examples.test.ts     | 125 ++++++++++++
 .../src/runner/usecases/task-run-bootstrap.ts      | 210 +++++++--------------
 .../src/shared/builtin-assets.generated.ts         |   4 +-
 packages/core/src/index.ts                         |   3 +
 .../core/src/runner/agent-semantic-result.test.ts  |  42 ++++-
 packages/core/src/runner/agent-semantic-result.ts  | 105 +++++++++--
 packages/core/src/schemas/index.ts                 |   3 +
 schemas/README.md                                  |   8 +-
 .../agent-semantic-result-v2.blocked.valid.json    |  13 ++
 .../agent-semantic-result-v2.failed.valid.json     |  16 ++
 ...ent-semantic-result-v2.needs-context.valid.json |  13 ++
 scripts/baselines/trust-boundary-violations.json   |  18 --
 scripts/checks/check-spec-examples.mjs             |  47 +++--
 scripts/generate/sync-schemas.mjs                  |  43 ++++-
 scripts/workflow/run-runner-codex-smoke.mjs        |  14 +-
 17 files changed, 460 insertions(+), 234 deletions(-)
```

</details>
<!-- END AUTO SUMMARY -->
