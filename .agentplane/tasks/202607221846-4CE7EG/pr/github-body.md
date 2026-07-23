Task: `202607221846-4CE7EG`
Title: Split agent semantic results from legacy observed claims
Canonical task record: `.agentplane/tasks/202607221846-4CE7EG/README.md`

## Summary

Split agent semantic results from legacy observed claims

RF-01a: define the agent-writable AgentSemanticResult contract and a compatibility reader that cannot treat process status, exit, timing, metrics, checks, or filesystem evidence as observed truth.

## Scope

- In scope: semantic result schema/types/fixtures, provenance for agent-reported claims, compatibility reading of v1 manifests, warning/normalization behavior, and removal of observed fields from the writable v2 schema.
- Out of scope: process/Git/check observation implementation, which belongs to the ExecutionReceipt task.

## Verification

- State: needs_rework
- Note:

```text
No implementation changes are present at the current task head; return to CODER for RF-01a
implementation before evidence-based verification.
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-07-23T14:37:15.639Z
- Branch: task/202607221846-4CE7EG/split-agent-semantic-results-from-legacy-observe
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../agentplane/src/runner/adapters/codex.test.ts   | 106 +++-
 .../agentplane/src/runner/adapters/custom.test.ts  | 102 +++-
 packages/agentplane/src/runner/adapters/custom.ts  |  48 +-
 .../src/runner/adapters/execute-supervised.ts      |  30 +-
 .../src/runner/result-manifest-artifacts.ts        | 298 +++++++----
 .../src/runner/result-manifest-policy.test.ts      |  59 ++-
 .../src/runner/result-manifest-policy.ts           |  37 +-
 .../agentplane/src/runner/result-manifest.test.ts  | 582 ++++++++++++++-------
 packages/agentplane/src/runner/result-manifest.ts  | 488 ++++++++---------
 .../agentplane/src/runner/task-state-render.ts     |  96 +++-
 packages/agentplane/src/runner/types.ts            |   7 +-
 packages/agentplane/src/runner/types/invocation.ts |  72 ++-
 .../src/runner/usecases/task-run-lifecycle.test.ts |  75 ++-
 packages/core/src/index.ts                         |  17 +
 .../core/src/runner/agent-semantic-result.test.ts  | 108 ++++
 packages/core/src/runner/agent-semantic-result.ts  | 168 ++++++
 packages/core/src/schemas/index.ts                 |  20 +
 schemas/README.md                                  |  19 +-
 schemas/agent-semantic-result.schema.json          | 307 +++++++++++
 .../examples/agent-semantic-result-v2.valid.json   |  16 +
 .../examples/runner-result-manifest-v1.legacy.json |  32 ++
 scripts/baselines/knip-baseline.json               |   5 -
 scripts/baselines/trust-boundary-violations.json   | 333 ------------
 scripts/generate/sync-schemas.mjs                  |  33 +-
 24 files changed, 2042 insertions(+), 1016 deletions(-)
```

</details>
