Task: `202605281707-51DD0G`
Title: Route packet v2 for agent next-action surfaces
Canonical task record: `.agentplane/tasks/202605281707-51DD0G/README.md`

## Summary

Route packet v2 for agent next-action surfaces

Extend route oracle outputs into a richer execution packet for task brief/status/next-action and runner bundle consumers.

## Scope

- In scope: Extend route oracle outputs into a richer execution packet for task brief/status/next-action and runner bundle consumers.
- Out of scope: unrelated refactors not required for "Route packet v2 for agent next-action surfaces".

## Verification

- State: ok
- Note:

```text
Command: bunx vitest run packages/agentplane/src/cli/local-ci-selection.test.ts
packages/agentplane/src/runner/result-manifest.test.ts
packages/agentplane/src/cli/run-cli.core.route-decision.test.ts
packages/agentplane/src/runner/usecases/task-run-blueprint.test.ts
packages/agentplane/src/commands/evaluator/evaluator-run.command.test.ts --config
vitest.workspace.ts; Result: pass, 5 files and 84 tests. Command: bun run typecheck; Result: pass.
Command: bun run format:changed; Result: pass. Command: bun run hotspots:check; Result: pass with
warnings below thresholds. Command: node .agentplane/policy/check-routing.mjs; Result: pass.
Command: ap doctor; Result: pass after framework dev bootstrap. Command: bun run docs:cli:check,
docs:bootstrap:check, release:parity; Result: pass.
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-28T17:09:33.355Z
- Branch: task/202605281707-51DD0G/route-packet-v2
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .agentplane/tasks/202605281707-6MNB2K/README.md    | 136 +++++
 .../blueprint/resolved-snapshot.json               | 572 ++++++++++++++++++++
 .agentplane/tasks/202605281707-7FSSSP/README.md    | 136 +++++
 .../blueprint/resolved-snapshot.json               | 572 ++++++++++++++++++++
 .agentplane/tasks/202605281707-B1DQCY/README.md    | 136 +++++
 .../blueprint/resolved-snapshot.json               | 572 ++++++++++++++++++++
 .agentplane/tasks/202605281707-DPJKMR/README.md    | 136 +++++
 .../blueprint/resolved-snapshot.json               | 572 ++++++++++++++++++++
 .agentplane/tasks/202605281707-FMY3FQ/README.md    | 136 +++++
 .../blueprint/resolved-snapshot.json               | 598 +++++++++++++++++++++
 .agentplane/tasks/202605281707-QEW595/README.md    | 136 +++++
 .../blueprint/resolved-snapshot.json               | 572 ++++++++++++++++++++
 .agentplane/tasks/202605281707-VP74QA/README.md    | 136 +++++
 .../blueprint/resolved-snapshot.json               | 455 ++++++++++++++++
 docs/user/cli-reference.generated.mdx              |   2 +
 .../agentplane/src/cli/local-ci-selection.test.ts  |  54 ++
 .../src/cli/run-cli.core.route-decision.test.ts    |  22 +
 .../src/commands/evaluator/evaluator.command.ts    |  14 +
 .../src/commands/evaluator/evaluator.spec.ts       |   9 +
 .../agentplane/src/commands/runtime.command.ts     |  49 +-
 packages/agentplane/src/commands/runtime.spec.ts   |  10 +-
 .../src/commands/shared/route-batch-ownership.ts   |   1 +
 .../src/commands/shared/route-decision.ts          |  16 +-
 .../agentplane/src/commands/shared/route-oracle.ts |  96 ++++
 .../agentplane/src/commands/task/brief.command.ts  |  23 +
 .../src/commands/task/next-action.command.ts       |   8 +
 .../agentplane/src/commands/task/status.command.ts |  10 +
 .../agentplane/src/runner/result-manifest.test.ts  |  40 ++
 packages/agentplane/src/runner/result-manifest.ts  |  53 ++
 packages/agentplane/src/runner/types/invocation.ts |   3 +
 .../src/runner/usecases/task-run-blueprint.test.ts |  14 +-
 .../src/runner/usecases/task-run-bootstrap.ts      |  25 +-
 scripts/lib/local-ci-selection.mjs                 | 103 ++++
 scripts/lib/test-route-registry.mjs                |  33 ++
 34 files changed, 5444 insertions(+), 6 deletions(-)
```

</details>
