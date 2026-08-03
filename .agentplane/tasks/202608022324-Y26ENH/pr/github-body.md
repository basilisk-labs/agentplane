Task: `202608022324-Y26ENH`
Title: Restore supervisor orchestration latency to the v0.6 baseline
Canonical task record: `.agentplane/tasks/202608022324-Y26ENH/README.md`

## Summary

Restore supervisor orchestration latency to the v0.6 baseline

Profile the canonical task advance and task run preparation paths, remove redundant repository scans, CLI bootstraps, context preparation, and route recomputation where state fingerprints permit safe reuse, and establish release gates that prevent setup latency or time-to-verified regressions relative to the matched v0.6 baseline without weakening correctness or evidence.

## Scope

- In scope: Profile the canonical task advance and task run preparation paths, remove redundant repository scans, CLI bootstraps, context preparation, and route recomputation where state fingerprints permit safe reuse, and establish release gates that prevent setup latency or time-to-verified regressions relative to the matched v0.6 baseline without weakening correctness or evidence.
- Out of scope: unrelated refactors not required for "Restore supervisor orchestration latency to the v0.6 baseline".

## Verification

- State: ok
- Note:

```text
Verified fa975c224d25: exact clean supervisor benchmark passed 10 cold/30 warm for external advance
and managed run; all contract and regression suites passed.
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-08-03T01:52:19.630Z
- Branch: task/202608022324-Y26ENH/restore-supervisor-orchestration-latency-to-the
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../commands/shared/route-decision-workspace.ts    |  32 ++
 .../src/commands/shared/route-decision.ts          |  61 ++-
 .../shared/side-effect-authority-store.test.ts     |   8 +-
 .../commands/shared/side-effect-authority-store.ts |  19 +-
 .../agentplane/src/commands/shared/task-backend.ts |  12 +-
 .../workflow-step-fingerprint-policy-paths.ts      |  30 ++
 .../commands/shared/workflow-step-fingerprint.ts   |  61 +--
 .../src/commands/task/advance.command.ts           |   8 +-
 .../src/commands/task/agent-action-packet.test.ts  |  45 ++
 .../src/commands/task/agent-action-packet.ts       |   6 +-
 .../src/commands/task/external-agent-supervisor.ts |  13 +-
 .../agentplane/src/commands/task/handoff.shared.ts |  15 +-
 .../src/runner/observation/git-snapshot.test.ts    |  37 ++
 .../src/runner/observation/git-snapshot.ts         |   2 +-
 .../src/runner/observation/git-snapshot/capture.ts | 205 ++++---
 .../src/runner/observation/git-snapshot/model.ts   |   4 +
 .../agentplane/src/runner/task-run-paths.test.ts   |   6 +
 packages/agentplane/src/runner/task-run-paths.ts   |   8 +-
 .../src/runner/usecases/agent-work-order.ts        | 128 +++--
 .../agentplane/src/runner/usecases/task-run.ts     |  28 +-
 .../bench/capture-agent-efficiency-candidate.mjs   |  21 +-
 scripts/lib/qualification-packed-runtime.mjs       |  78 +++
 .../check-v0.7.1-efficiency-evidence.mjs           |  13 +-
 .../measure-v0.7.1-matched-cli-latency.mjs         | 104 +---
 .../measure-v0.7.1-supervisor-latency.mjs          | 587 +++++++++++++++++++++
 .../qualification/release-qualification.test.mjs   |  59 ++-
 .../v0.7.1-release-qualification.json              |  33 +-
 27 files changed, 1282 insertions(+), 341 deletions(-)
```

</details>
