Task: `202607300112-48RH1X`
Title: Authorize deterministic RF-04 qualification rebuild evidence
Canonical task record: `.agentplane/tasks/202607300112-48RH1X/README.md`

## Summary

Authorize deterministic RF-04 qualification rebuild evidence

Repair the RF-04 replay capture safety contract so a qualification packet can rebuild frozen envelopes into its exact task-local evidence file without a provider driver, retry, replacement capture, or mutable baseline write. Keep all non-qualification capture targets restricted.

## Scope

- In scope: Repair the RF-04 replay capture safety contract so a qualification packet can rebuild frozen envelopes into its exact task-local evidence file without a provider driver, retry, replacement capture, or mutable baseline write. Keep all non-qualification capture targets restricted.
- Out of scope: unrelated refactors not required for "Authorize deterministic RF-04 qualification rebuild evidence".

## Verification

- State: ok
- Note:

```text
Qualification rebuild evidence is restricted to the deterministic task-local path and preserves the
RF-04 non-publication gate.
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-07-30T01:13:16.182Z
- Branch: task/202607300112-48RH1X/authorize-deterministic-rf-04-qualification-rebu
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../evaluator-qualification-packet.test.ts         | 120 ++++++++++++++++++++-
 .../src/commands/task/qualification-packet-rf04.ts |  10 +-
 scripts/bench/capture-agent-efficiency-replay.mjs  | 108 +++++++++++++++++--
 scripts/lib/agent-efficiency-replay-safety.mjs     |  32 +++++-
 4 files changed, 256 insertions(+), 14 deletions(-)
```

</details>
