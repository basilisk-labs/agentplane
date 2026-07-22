Task: `202607222129-1ZQHJD`
Title: Capture anchored multi-run RF-04 replay telemetry
Canonical task record: `.agentplane/tasks/202607222129-1ZQHJD/README.md`

## Summary

Capture anchored multi-run RF-04 replay telemetry

Add an additive replay baseline for immutable pre-v0.7 main commit 1a702e160ba9f0efe7067f2a22fc008defc89ffb by executing all ten RF-04 scenarios at least five times in isolated fixtures, recording authoritative observed outcomes, provider token usage, cognitive and orchestration proxies, latency, retrieval, and evidence-provenance metrics, and enforcing offline provenance and coverage checks without rewriting the historical RF-04 baseline or changing product semantics.

## Scope

- In scope: execute exactly the ten existing RF-04 scenarios at least five valid times each in isolated fixture-backed repositories; record an immutable anchor manifest with subject SHA, scenario and harness digests, runtime and adapter/model profile, sandbox/cache mode, and hashes of every run envelope.
- Resolve 70/70 observed outcome cells, 27/27 provider-reported role token cells, and all 170 scalar cells as an observed number or typed not_applicable; never encode unknown as zero and never persist hidden reasoning.
- Measure prompt and duplicate bytes, LLM episodes, lifecycle/tool calls, preparation/search latency, time to first scoped mutation, time to verified result, retrieval hits/gaps, and evidence provenance.
- Preserve scripts/baselines/agent-efficiency-pre-v0.7-main.json unchanged; the replay baseline is additive and anchored to exact historical main 1a702e160ba9f0efe7067f2a22fc008defc89ffb.
- Structural projection is deterministic; token and latency distributions are diagnostic and comparable only for an identical model/runtime profile; capture may use network, but CI checks are offline.
- Out of scope: product semantic/lifecycle changes, live PR/merge/publish effects, cross-model comparisons, hard latency thresholds, secrets, or reasoning text.
- Stop rule: if the selected provider does not expose required usage fields, record a blocker or switch to an authoritative provider source; do not estimate reasoning tokens from bytes.

## Verification

- State: pending
- Note: Not recorded yet.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-07-22T21:30:53.096Z
- Branch: task/202607222129-1ZQHJD/capture-anchored-multi-run-rf-04-replay-telemetr
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .agentplane/tasks/202607221838-SD1W93/README.md    |   12 +-
 .agentplane/tasks/202607221907-DK2CJF/README.md    |    2 +
 .github/workflows/ci.yml                           |    4 +
 .github/workflows/prepublish.yml                   |    3 +
 docs/internal/v0.7-agent-efficiency-baseline.md    |  110 +-
 docs/internal/v0.7-refactor-plan.md                |    3 +-
 package.json                                       |    4 +-
 ...critical.agent-efficiency-replay-driver.test.ts |  411 +++++++
 ...un-cli.critical.agent-efficiency-replay.test.ts |  840 ++++++++++++++
 scripts/README.md                                  |   66 +-
 scripts/bench/capture-agent-efficiency-replay.mjs  |  602 ++++++++++
 .../internal/agent-efficiency-anchor-runtime.mjs   |  193 +++
 .../agent-efficiency-anchor-supervisor.mjs         |  513 ++++++++
 .../internal/agent-efficiency-codex-runtime.mjs    |  234 ++++
 .../bench/run-agent-efficiency-codex-replay.mjs    |  551 +++++++++
 scripts/checks/check-agent-efficiency-replay.mjs   |  187 +++
 scripts/lib/agent-efficiency-replay.mjs            | 1224 ++++++++++++++++++++
 17 files changed, 4914 insertions(+), 45 deletions(-)
```

</details>
