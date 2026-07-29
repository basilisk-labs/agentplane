Task: `202607292104-W03KZ0`
Title: Measure SHA-bound RF-04 candidate performance
Canonical task record: `.agentplane/tasks/202607292104-W03KZ0/README.md`

## Summary

Measure SHA-bound RF-04 candidate performance

Implement a candidate-SHA RF-04 measurement route that records actual token, latency, success, rework, and safety values for the reviewed beta.1 product SHA, compares them with the frozen baseline using declared thresholds, and emits evaluator-reviewable evidence. Keep publication blocked; do not weaken beta.1 acceptance criteria.

## Scope

- In scope: Implement a candidate-SHA RF-04 measurement route that records actual token, latency, success, rework, and safety values for the reviewed beta.1 product SHA, compares them with the frozen baseline using declared thresholds, and emits evaluator-reviewable evidence. Keep publication blocked; do not weaken beta.1 acceptance criteria.
- Out of scope: unrelated refactors not required for "Measure SHA-bound RF-04 candidate performance".

## Verification

- State: pending
- Note: Not recorded yet.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-07-29T21:07:30.628Z
- Branch: task/202607292104-W03KZ0/measure-sha-bound-rf-04-candidate-performance
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 package.json                                       |   2 +
 ...cli.critical.agent-efficiency-candidate.test.ts | 167 ++++
 scripts/README.md                                  |  32 +-
 .../bench/capture-agent-efficiency-candidate.mjs   | 884 +++++++++++++++++++++
 4 files changed, 1070 insertions(+), 15 deletions(-)
```

</details>
