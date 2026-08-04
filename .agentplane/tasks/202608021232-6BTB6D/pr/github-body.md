Task: `202608021232-6BTB6D`
Title: Capture exact v0.7.1 semantic efficiency evidence
Canonical task record: `.agentplane/tasks/202608021232-6BTB6D/README.md`

## Summary

Produce a release-blocking, reproducible qualification record for the final v0.7.1 implementation subject. The record must cover deterministic lifecycle, context, recovery, packaging, hosted, latency, and tooling scenarios before exactly one no-retry Codex provider generation captures 50 runs across 10 scenarios and 55 provider episodes. The evidence must prove semantic quality parity, at least 20% total provider-token reduction, exact provenance, and explicit classification of every failure.

## Scope

- In scope: freeze one exact implementation subject SHA and Codex CLI version; execute the versioned v0.7.1 qualification matrix; capture deterministic and provider evidence; verify lifecycle/context/recovery/packaging/hosted coverage; measure matched CLI and supervisor latency; validate token and outcome thresholds; preserve raw logs and a classified defect ledger; obtain an independent EVALUATOR verdict.
- Provider boundary: run the 10-scenario x 5-run capture exactly once, yielding 50 runs and 55 provider episodes, with no retry, replacement, or selective rerun. A failed episode remains failed evidence.
- Stop before provider execution if deterministic audit has any blocking failure, the candidate SHA or Codex version changes, an existing capture generation is present, the tracked tree is dirty, or a GitHub release-blocking defect changes package/source content.
- Out of scope: fixing discovered product defects inside this evidence task, dependency upgrades from PR #4752, branch cleanup, version bump, npm publication, and unrelated refactors. Discovered blocking defects require a separate executable task and a newly versioned candidate generation after repair.

## Verification

- State: ok
- Note:

```text
PASS: integration verification now validates the immutable recorded provider gate without starting a
new provider episode.
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-08-03T20:40:27.237Z
- Branch: task/202608021232-6BTB6D/capture-exact-v0-7-1-semantic-efficiency-evidenc
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 ...cli.critical.agent-efficiency-candidate.test.ts | 13 +++
 ...critical.agent-efficiency-replay-driver.test.ts | 33 ++++++++
 ...tical.agent-efficiency-replay-hardening.test.ts | 43 +++++++---
 .../shared/supervisor-execution-episode.test.ts    | 13 +++
 .../shared/supervisor-execution-episode.ts         |  8 +-
 .../agentplane/src/commands/shared/task-backend.ts |  9 +-
 .../commands/task/external-agent-exchange.test.ts  | 31 +++++++
 .../src/commands/task/external-agent-exchange.ts   |  6 +-
 .../src/commands/task/external-agent-supervisor.ts | 12 ++-
 packages/agentplane/src/shared/env.test.ts         | 16 +++-
 packages/agentplane/src/shared/env.ts              | 15 +++-
 .../bench/capture-agent-efficiency-candidate.mjs   | 54 +++++++++---
 scripts/bench/capture-agent-efficiency-replay.mjs  | 82 +++++++++++++++++-
 .../internal/agent-efficiency-codex-runtime.mjs    |  8 +-
 scripts/lib/test-route-registry.mjs                |  2 +
 .../check-v0.7.1-product-contract.mjs              | 99 +++++++++++++++++++++-
 .../measure-v0.7.1-supervisor-latency.mjs          |  4 +-
 .../qualification/release-qualification.test.mjs   | 29 +++++--
 .../run-v0.7.1-release-qualification.mjs           | 14 ++-
 .../v0.7.1-release-qualification.json              |  5 +-
 20 files changed, 444 insertions(+), 52 deletions(-)
```

</details>
