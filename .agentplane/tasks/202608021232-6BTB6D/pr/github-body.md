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

- State: needs_rework
- Note:

```text
Exact candidate 2da557536 failed deterministic release qualification: cold managed task run p95
exceeded the matched v0.6.26 ceiling by 2.655 ms; provider gate was not run.
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-08-03T20:40:27.237Z
- Branch: task/202608021232-6BTB6D/capture-exact-v0-7-1-semantic-efficiency-evidenc
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
No changes detected.
```

</details>
