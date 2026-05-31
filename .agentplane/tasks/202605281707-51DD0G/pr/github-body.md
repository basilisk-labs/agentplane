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
Verified after rebasing PR #4197 onto origin/main and fixing route bootstrap packet typing: route
oracle now reports wait_hosted_checks as action_kind=local_command and safe_to_mutate=true; focused
vitest suite passed (5 files, 85 tests); bun run typecheck passed; node
.agentplane/policy/check-routing.mjs passed; ap doctor exited 0; bun run format:changed passed; bun
run hotspots:check passed with warnings below thresholds; docs:cli:check, docs:bootstrap:check, and
release:parity passed.
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-28T17:09:33.355Z
- Branch: task/202605281707-51DD0G/route-packet-v2
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .agentplane/tasks/202605281707-6MNB2K/README.md    | 137 +++++
 .../blueprint/resolved-snapshot.json               | 572 ++++++++++++++++++++
 .agentplane/tasks/202605281707-7FSSSP/README.md    | 137 +++++
 .../blueprint/resolved-snapshot.json               | 572 ++++++++++++++++++++
 .agentplane/tasks/202605281707-B1DQCY/README.md    | 137 +++++
 .../blueprint/resolved-snapshot.json               | 572 ++++++++++++++++++++
 .agentplane/tasks/202605281707-DPJKMR/README.md    | 137 +++++
 .../blueprint/resolved-snapshot.json               | 572 ++++++++++++++++++++
 .agentplane/tasks/202605281707-FMY3FQ/README.md    | 137 +++++
 .../blueprint/resolved-snapshot.json               | 598 +++++++++++++++++++++
 .agentplane/tasks/202605281707-QEW595/README.md    | 137 +++++
 .../blueprint/resolved-snapshot.json               | 572 ++++++++++++++++++++
 .agentplane/tasks/202605281707-VP74QA/README.md    | 137 +++++
 .../blueprint/resolved-snapshot.json               | 455 ++++++++++++++++
 docs/user/cli-reference.generated.mdx              |   2 +
 .../agentplane/src/cli/local-ci-selection.test.ts  |  54 ++
 .../src/commands/evaluator/evaluator.spec.ts       |   9 +
 .../agentplane/src/commands/runtime.command.ts     |  49 +-
 packages/agentplane/src/commands/runtime.spec.ts   |  10 +-
 .../src/commands/shared/route-batch-ownership.ts   |   1 +
 .../src/commands/task/next-action.command.ts       |   7 +
 .../agentplane/src/commands/task/status.command.ts |  10 +
 .../agentplane/src/runner/adapters/codex.test.ts   |   2 +-
 .../agentplane/src/runner/result-manifest.test.ts  |  40 ++
 packages/agentplane/src/runner/result-manifest.ts  |  53 ++
 packages/agentplane/src/runner/types/invocation.ts |   3 +
 .../src/runner/usecases/task-run-bootstrap.ts      |  24 +-
 scripts/lib/local-ci-selection.mjs                 | 103 ++++
 scripts/lib/test-route-registry.mjs                |  32 ++
 29 files changed, 5265 insertions(+), 6 deletions(-)
```

</details>
