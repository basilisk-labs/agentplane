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

- State: ok
- Note:

```text
The W03 measurement route is complete: it preserved the frozen baseline, created a matched-runtime
bridge, materialized the exact candidate comparison, and recorded the required failing beta.1
latency verdict without a provider retry.
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-07-29T21:07:30.628Z
- Branch: task/202607292104-W03KZ0/measure-sha-bound-rf-04-candidate-performance
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .agentplane/policy/incidents.md                    |    3 +-
 package.json                                       |    2 +
 packages/agentplane/assets/policy/incidents.md     |    3 +-
 ...cli.critical.agent-efficiency-candidate.test.ts |  214 ++++
 ...critical.agent-efficiency-replay-driver.test.ts |   12 +
 ...tical.agent-efficiency-replay-hardening.test.ts |   27 +
 ...un-cli.critical.agent-efficiency-replay.test.ts |    6 +-
 scripts/README.md                                  |   32 +-
 .../bench/capture-agent-efficiency-candidate.mjs   | 1162 ++++++++++++++++++++
 scripts/bench/capture-agent-efficiency-replay.mjs  |   65 +-
 .../capture-agent-efficiency-runtime-bridge.mjs    |  165 +++
 .../agent-efficiency-anchor-supervisor.mjs         |    5 +-
 .../internal/agent-efficiency-codex-runtime.mjs    |   16 +-
 .../bench/run-agent-efficiency-codex-replay.mjs    |    8 +-
 scripts/checks/check-agent-efficiency-replay.mjs   |   30 +-
 scripts/lib/agent-efficiency-replay-safety.mjs     |   20 +-
 scripts/lib/agent-efficiency-replay.mjs            |   58 +
 17 files changed, 1763 insertions(+), 65 deletions(-)
```

</details>
