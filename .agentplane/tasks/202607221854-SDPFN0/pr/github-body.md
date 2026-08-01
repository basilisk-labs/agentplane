Task: `202607221854-SDPFN0`
Title: Complete CommandSession capability migration
Canonical task record: `.agentplane/tasks/202607221854-SDPFN0/README.md`

## Summary

Complete CommandSession capability migration

Integrate the five independently verified command-family vertical slices, remove the coarse CommandNeeds compatibility layer after zero consumers remain, and prove catalog-wide minimal capability and lazy preparation invariants.

## Scope

- In scope: integrate the separately verified project/config/help/docs, task/lifecycle/route, context/evaluator, runner/Hermes, and provider/release/ops capability slices; remove the coarse CommandNeeds adapter after zero consumers; validate catalog-wide requirement visibility and lazy preparation profiles.
- Out of scope: implementing family-specific migrations inside this fan-in task.

## Verification

- State: ok
- Note:

```text
PASS: deterministic SHA-bound evidence refreshed after evaluator block; implementation unchanged at
d89988611fbd.
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-08-01T13:22:06.203Z
- Branch: task/202607221854-SDPFN0/complete-commandsession-capability-migration
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../src/cli/run-cli/command-catalog.test.ts        |  72 +--
 .../run-cli/command-catalog/context-evaluator.ts   | 321 ++++++++++++++
 .../src/cli/run-cli/command-catalog/core.ts        |  78 ++--
 .../src/cli/run-cli/command-catalog/kernel.ts      | 155 +------
 .../src/cli/run-cli/command-catalog/lifecycle.ts   |  33 +-
 .../src/cli/run-cli/command-catalog/project.ts     | 483 +++++++--------------
 .../src/cli/run-cli/command-catalog/task.ts        |  61 ++-
 .../src/cli/run-cli/command-loaders/core.ts        |  40 +-
 .../src/cli/run-cli/command-loaders/evaluator.ts   |  55 +++
 .../src/cli/run-cli/command-loaders/lifecycle.ts   |   6 +-
 .../src/cli/run-cli/command-loaders/project.ts     | 162 +++----
 .../src/cli/run-cli/command-loaders/task.ts        |  17 +-
 .../agentplane/src/cli/run-cli/commands/codex.ts   |  11 +-
 .../agentplane/src/commands/acr/acr.command.ts     |   2 +-
 .../src/commands/backend/sync.command.ts           |   2 +-
 .../src/commands/blueprint/blueprint.command.ts    |   2 +-
 .../src/commands/intake/intake.command.ts          |   4 +-
 scripts/baselines/knip-baseline.json               |   9 +-
 18 files changed, 848 insertions(+), 665 deletions(-)
```

</details>
