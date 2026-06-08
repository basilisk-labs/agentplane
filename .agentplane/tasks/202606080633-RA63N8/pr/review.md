# PR Review

Created: 2026-06-08T06:35:18.787Z

## Task

- Task: `202606080633-RA63N8`
- Title: Add deterministic intake and quality diagnostics
- Status: DOING
- Branch: `task/202606080633-RA63N8/add-deterministic-intake-and-quality-diagnostics`
- Canonical task record: `.agentplane/tasks/202606080633-RA63N8/README.md`

## Verification

- State: ok
- Note: Verified: deterministic intake command, task-local manifest writing, insights quality counters, runner failure fingerprints, and generated CLI reference were covered by targeted tests, typecheck, lint, docs freshness, routing, and doctor.
- Canonical workflow state lives in the task README.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<!-- BEGIN AUTO SUMMARY -->
<details>
<summary>Raw evidence</summary>

- Updated: 2026-06-08T06:35:18.787Z
- Branch: task/202606080633-RA63N8/add-deterministic-intake-and-quality-diagnostics
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 docs/user/cli-reference.generated.mdx              |  46 ++++
 .../agentplane/src/cli/run-cli.core.intake.test.ts | 176 ++++++++++++
 .../src/cli/run-cli/command-catalog/core.ts        |   6 +
 .../src/cli/run-cli/command-loaders/core.ts        |   2 +
 .../src/commands/insights/insights-report.ts       |  89 +++++-
 .../src/commands/intake/intake-report.ts           | 300 +++++++++++++++++++++
 .../src/commands/intake/intake.command.ts          | 167 ++++++++++++
 7 files changed, 785 insertions(+), 1 deletion(-)
```

</details>
<!-- END AUTO SUMMARY -->
