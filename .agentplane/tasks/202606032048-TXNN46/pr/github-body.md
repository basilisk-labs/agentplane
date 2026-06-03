Task: `202606032048-TXNN46`
Title: Accept blocked runner result manifests
Canonical task record: `.agentplane/tasks/202606032048-TXNN46/README.md`

## Summary

Fix GitHub issue #4412 by making runner result manifest handling accept an externally blocked delegated run instead of rejecting it as an internal invalid_result_manifest error.

## Scope

In scope: runner result manifest schema/parsing, terminal status mapping for blocked external publication or policy cases, and focused tests covering status=blocked. Out of scope: GitHub permission repair, Codex auth changes, broad runner lifecycle refactors, release publication.

## Verification

- State: ok
- Note:

```text
Command: bunx vitest --config vitest.workspace.ts run --project agentplane
packages/agentplane/src/runner/result-manifest.test.ts | Result: pass | Evidence: initial focused
run passed 1 file / 8 tests, including blocked terminal manifest regression. Command: bun run
schemas:check | Result: pass | Evidence: schemas OK after schemas:sync. Command: bun run
--filter=@agentplaneorg/core typecheck && bun run --filter=agentplane typecheck | Result: pass |
Evidence: both package typechecks exited 0. Command: node .agentplane/policy/check-routing.mjs |
Result: pass | Evidence: policy routing OK. Command: ap task verify-show 202606032048-TXNN46 |
Result: pass | Evidence: Verify Steps and blueprint snapshot read back current.
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-06-03T20:49:53.044Z
- Branch: task/202606032048-TXNN46/accept-blocked-runner-result-manifests
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../agentplane/src/commands/task/run-render.ts     |  4 ++-
 .../agentplane/src/runner/result-manifest.test.ts  | 30 ++++++++++++++++++++++
 packages/agentplane/src/runner/result-manifest.ts  | 10 ++++++--
 .../agentplane/src/runner/task-state-render.ts     |  4 +++
 packages/agentplane/src/runner/types/invocation.ts |  2 +-
 packages/core/schemas/task-handoff.schema.json     |  2 +-
 .../schemas/task-readme-frontmatter.schema.json    |  4 +--
 packages/core/schemas/tasks-export.schema.json     |  4 +--
 .../core/src/tasks/task-artifact-schema.handoff.ts |  1 +
 .../core/src/tasks/task-artifact-schema.task.ts    |  1 +
 packages/core/src/tasks/task-store.ts              |  8 +++++-
 packages/core/src/tasks/tasks-export.ts            |  1 +
 packages/spec/schemas/task-handoff.schema.json     |  2 +-
 .../schemas/task-readme-frontmatter.schema.json    |  4 +--
 packages/spec/schemas/tasks-export.schema.json     |  4 +--
 schemas/task-handoff.schema.json                   |  2 +-
 schemas/task-readme-frontmatter.schema.json        |  4 +--
 schemas/tasks-export.schema.json                   |  4 +--
 18 files changed, 71 insertions(+), 20 deletions(-)
```

</details>
