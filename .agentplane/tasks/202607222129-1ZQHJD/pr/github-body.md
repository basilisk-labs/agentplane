Task: `202607222129-1ZQHJD`
Title: Capture anchored multi-run RF-04 replay telemetry
Canonical task record: `.agentplane/tasks/202607222129-1ZQHJD/README.md`

## Summary

Capture anchored multi-run RF-04 replay telemetry

Add an additive replay baseline for immutable pre-v0.7 main commit 1a702e160ba9f0efe7067f2a22fc008defc89ffb by executing all ten RF-04 scenarios at least five times in isolated fixtures, recording authoritative observed outcomes, provider token usage, cognitive and orchestration proxies, latency, retrieval, and evidence-provenance metrics, and enforcing offline provenance and coverage checks without rewriting the historical RF-04 baseline or changing product semantics.

## Scope

- Resolve 70/70 outcome cells with field-level provenance: golden expectations and declared lifecycle controls are fixture_control; filesystem effects, final status, scope violations, and other independently measured facts are supervisor_observed. Never relabel fixture controls as observations.
- Resolve 27/27 provider-reported role token cells and all 170 scalar cells as an observed value or typed not_applicable; never encode unknown as zero and never persist prompts, final text, stderr, credentials, or hidden reasoning.
- Capture ten RF-04 scenarios at five runs each as 50 sanitized envelopes and 55 declared provider episodes under one fixed model/runtime profile, using exact-anchor CLI preparation and the reviewed Codex driver.
- Preserve scripts/baselines/agent-efficiency-pre-v0.7-main.json unchanged; the replay baseline remains additive and anchored to exact historical main 1a702e160ba9f0efe7067f2a22fc008defc89ffb.
- Keep product semantics unchanged; this task measures and verifies the pre-v0.7 control.

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
 docs/internal/v0.7-agent-efficiency-baseline.md    |  134 +-
 docs/internal/v0.7-refactor-plan.md                |    1 +
 package.json                                       |    4 +-
 ...critical.agent-efficiency-replay-driver.test.ts |  430 ++++++
 ...tical.agent-efficiency-replay-hardening.test.ts |  683 +++++++++
 ...un-cli.critical.agent-efficiency-replay.test.ts |  958 +++++++++++++
 scripts/README.md                                  |   66 +-
 scripts/bench/capture-agent-efficiency-replay.mjs  |  595 ++++++++
 .../internal/agent-efficiency-anchor-runtime.mjs   |  254 ++++
 .../agent-efficiency-anchor-supervisor.mjs         |  554 ++++++++
 .../internal/agent-efficiency-capture-runtime.mjs  |  130 ++
 .../internal/agent-efficiency-codex-runtime.mjs    |  264 ++++
 .../agent-efficiency-dependency-manifest.mjs       |  485 +++++++
 .../internal/agent-efficiency-driver-contract.mjs  |  112 ++
 .../internal/agent-efficiency-fixture-effects.mjs  |  133 ++
 .../bench/run-agent-efficiency-codex-replay.mjs    |  586 ++++++++
 scripts/checks/check-agent-efficiency-replay.mjs   |  179 +++
 scripts/lib/agent-efficiency-replay-harness.mjs    |  133 ++
 scripts/lib/agent-efficiency-replay-safety.mjs     |  317 +++++
 scripts/lib/agent-efficiency-replay.mjs            | 1480 ++++++++++++++++++++
 24 files changed, 7475 insertions(+), 44 deletions(-)
```

</details>
