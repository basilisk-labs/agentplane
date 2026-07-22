---
id: "202607222129-1ZQHJD"
title: "Capture anchored multi-run RF-04 replay telemetry"
status: "DOING"
priority: "high"
owner: "TESTER"
revision: 11
origin:
  system: "manual"
depends_on:
  - "202607221846-SXJ75T"
tags:
  - "benchmark"
  - "instrumentation"
  - "milestone-alpha1"
  - "quality"
  - "refactor"
  - "rf-04"
  - "v0.7"
  - "wave-trust"
  - "code"
task_kind: "code"
mutation_scope: "code"
risk_flags:
  - "network"
blueprint_request: "performance.benchmark"
verify:
  - "bun run bench:agent-efficiency:replay:capture -- --anchor 1a702e160ba9f0efe7067f2a22fc008defc89ffb --runs 5"
  - "bun run bench:agent-efficiency:replay:check"
  - "bun run ci:contract"
  - "bun run test:critical"
  - "bun run typecheck"
  - "bunx vitest run packages/agentplane/src/cli/run-cli.critical.agent-efficiency-replay.test.ts"
plan_approval:
  state: "approved"
  updated_at: "2026-07-22T21:30:26.197Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
  attempts: 0
commit: null
comments:
  -
    author: "TESTER"
    body: "Start: capture anchored multi-run RF-04 replay telemetry and wire it into the alpha.1 gate."
  -
    author: "TESTER"
    body: "Blocker (replay capture): repository evidence cannot populate the required 27 provider token cells. The current token accumulator reads input/output/total only; committed anchor run-state/result/events contain no usage and the only committed trace is empty. No global credentials or live provider calls were authorized for this pass. Infrastructure remains fail-closed until an explicitly authorized driver emits 50 sanitized envelopes with provider-reported input_tokens, output_tokens, and reasoning_tokens. The task must remain unverified until that capture succeeds."
  -
    author: "ORCHESTRATOR"
    body: "Approval: on 2026-07-23 the user explicitly authorized access to the configured Codex/provider authentication, network use, and fifty live replay calls for this RF-04 capture. Credentials must remain outside artifacts and output; the driver must use a minimal environment and sanitized envelopes."
  -
    author: "TESTER"
    body: "Audit hardening complete: committed evidence bundles are content-addressed from canonical sanitized payload bytes; every cell resolves to an exact artifact/source value; exact repo-local driver bytes and contract are in the anchor/harness; the driver receives only an explicit environment allowlist; all actual outcomes are retained and compared with the golden control; recursive host paths and broader credential forms are rejected. Targeted critical tests, lint, TypeScript build, documentation generation, workflow command checks, and policy routing pass. Capture/check remain intentionally fail-closed until the authorized live capture is committed."
  -
    author: "TESTER"
    body: "Pre-pilot driver contract ready: exact detached anchor checkout, lock-matched subject-local dependencies, canonical bundle manifests, fixture-scoped AgentPlane HOME/XDG/tmp, sanitized Codex runtime, no raw prompt/final/JSONL persistence, and all-or-nothing capture. Exact-anchor offline init/task/dry-run probe passed with six preparation CLI calls; live pilot remains gated on independent commit audit."
events:
  -
    type: "status"
    at: "2026-07-22T21:30:53.047Z"
    author: "TESTER"
    from: "TODO"
    to: "DOING"
    note: "Start: capture anchored multi-run RF-04 replay telemetry and wire it into the alpha.1 gate."
  -
    type: "comment"
    at: "2026-07-22T21:48:26.389Z"
    author: "TESTER"
    body: "Blocker (replay capture): repository evidence cannot populate the required 27 provider token cells. The current token accumulator reads input/output/total only; committed anchor run-state/result/events contain no usage and the only committed trace is empty. No global credentials or live provider calls were authorized for this pass. Infrastructure remains fail-closed until an explicitly authorized driver emits 50 sanitized envelopes with provider-reported input_tokens, output_tokens, and reasoning_tokens. The task must remain unverified until that capture succeeds."
  -
    type: "comment"
    at: "2026-07-22T22:04:37.959Z"
    author: "ORCHESTRATOR"
    body: "Approval: on 2026-07-23 the user explicitly authorized access to the configured Codex/provider authentication, network use, and fifty live replay calls for this RF-04 capture. Credentials must remain outside artifacts and output; the driver must use a minimal environment and sanitized envelopes."
  -
    type: "comment"
    at: "2026-07-22T22:12:16.241Z"
    author: "TESTER"
    body: "Audit hardening complete: committed evidence bundles are content-addressed from canonical sanitized payload bytes; every cell resolves to an exact artifact/source value; exact repo-local driver bytes and contract are in the anchor/harness; the driver receives only an explicit environment allowlist; all actual outcomes are retained and compared with the golden control; recursive host paths and broader credential forms are rejected. Targeted critical tests, lint, TypeScript build, documentation generation, workflow command checks, and policy routing pass. Capture/check remain intentionally fail-closed until the authorized live capture is committed."
  -
    type: "comment"
    at: "2026-07-22T23:32:05.755Z"
    author: "TESTER"
    body: "Pre-pilot driver contract ready: exact detached anchor checkout, lock-matched subject-local dependencies, canonical bundle manifests, fixture-scoped AgentPlane HOME/XDG/tmp, sanitized Codex runtime, no raw prompt/final/JSONL persistence, and all-or-nothing capture. Exact-anchor offline init/task/dry-run probe passed with six preparation CLI calls; live pilot remains gated on independent commit audit."
doc_version: 3
doc_updated_at: "2026-07-22T23:32:05.755Z"
doc_updated_by: "TESTER"
description: "Add an additive replay baseline for immutable pre-v0.7 main commit 1a702e160ba9f0efe7067f2a22fc008defc89ffb by executing all ten RF-04 scenarios at least five times in isolated fixtures, recording authoritative observed outcomes, provider token usage, cognitive and orchestration proxies, latency, retrieval, and evidence-provenance metrics, and enforcing offline provenance and coverage checks without rewriting the historical RF-04 baseline or changing product semantics."
sections:
  Summary: |-
    Capture anchored multi-run RF-04 replay telemetry

    Add an additive replay baseline for immutable pre-v0.7 main commit 1a702e160ba9f0efe7067f2a22fc008defc89ffb by executing all ten RF-04 scenarios at least five times in isolated fixtures, recording authoritative observed outcomes, provider token usage, cognitive and orchestration proxies, latency, retrieval, and evidence-provenance metrics, and enforcing offline provenance and coverage checks without rewriting the historical RF-04 baseline or changing product semantics.
  Scope: |-
    - In scope: execute exactly the ten existing RF-04 scenarios at least five valid times each in isolated fixture-backed repositories; record an immutable anchor manifest with subject SHA, scenario and harness digests, runtime and adapter/model profile, sandbox/cache mode, and hashes of every run envelope.
    - Resolve 70/70 observed outcome cells, 27/27 provider-reported role token cells, and all 170 scalar cells as an observed number or typed not_applicable; never encode unknown as zero and never persist hidden reasoning.
    - Measure prompt and duplicate bytes, LLM episodes, lifecycle/tool calls, preparation/search latency, time to first scoped mutation, time to verified result, retrieval hits/gaps, and evidence provenance.
    - Preserve scripts/baselines/agent-efficiency-pre-v0.7-main.json unchanged; the replay baseline is additive and anchored to exact historical main 1a702e160ba9f0efe7067f2a22fc008defc89ffb.
    - Structural projection is deterministic; token and latency distributions are diagnostic and comparable only for an identical model/runtime profile; capture may use network, but CI checks are offline.
    - Out of scope: product semantic/lifecycle changes, live PR/merge/publish effects, cross-model comparisons, hard latency thresholds, secrets, or reasoning text.
    - Stop rule: if the selected provider does not expose required usage fields, record a blocker or switch to an authoritative provider source; do not estimate reasoning tokens from bytes.
  Plan: |-
    1. Define the replay schema, applicability rules, immutable anchor manifest, and comparison policy.
    2. Build an isolated exact-SHA driver with disposable repositories and fixture-backed external operations.
    3. Add passive observers for CLI events, provider usage, Git/filesystem effects, checks, retrieval, and evidence provenance.
    4. Execute at least five valid runs for each of the ten RF-04 scenarios and store sanitized envelopes plus hashes.
    5. Build a deterministic structural projection and separate diagnostic distributions with sample count, median, p95, mean, and standard deviation.
    6. Add offline rebuild and tamper checks for anchor, coverage, usage, outcomes, provenance, run count, artifact hashes, self-rehash, safety regression, and structural-digest exclusions.
    7. Integrate the check into critical, contract, and prepublish lanes; update the roadmap and make this task a required alpha.1 dependency.
  Verify Steps: |-
    1. Run bun run bench:agent-efficiency:replay:capture -- --anchor 1a702e160ba9f0efe7067f2a22fc008defc89ffb --runs 5. Expected: ten scenarios, at least fifty valid envelopes, one fixed model/runtime profile, no secrets or absolute host paths.
    2. Run bun run bench:agent-efficiency:replay:check. Expected: 70/70 outcomes, 27/27 provider token cells, and 170/170 scalar cells resolved as observed or typed not_applicable; every hash and anchor matches.
    3. Rebuild the summary twice from the same frozen envelopes. Expected: byte-identical structural projection/digest and exactly reproducible diagnostic statistics.
    4. Run tamper fixtures. Expected: changed anchor, usage, outcome, provenance, run count, or artifact hash fails; timestamp, host, and latency samples do not alter structural digest.
    5. Run bunx vitest run packages/agentplane/src/cli/run-cli.critical.agent-efficiency-replay.test.ts. Expected: focused replay contract passes.
    6. Run bun run test:critical, bun run typecheck, and bun run ci:contract. Expected: all full gates pass on one reviewed SHA.
    7. Verify alpha.1 dependency closure. Expected: 202607221907-DK2CJF directly depends on this task and cannot qualify before replay telemetry is DONE.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert only the new replay scripts, sanitized artifacts, tests, CI entries, roadmap row, and dependency edge.
    - Do not alter the historical RF-04 baseline or immutable anchor SHA.
    - Do not remove the alpha.1 dependency merely to pass the gate; if capture is impossible, replace it with another bounded task that records the blocker.
    - Delete unpublished provider traces; never overwrite a published baseline artifact.
  Findings: ""
id_source: "generated"
---
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

## Plan

1. Define the replay schema, applicability rules, immutable anchor manifest, and comparison policy.
2. Build an isolated exact-SHA driver with disposable repositories and fixture-backed external operations.
3. Add passive observers for CLI events, provider usage, Git/filesystem effects, checks, retrieval, and evidence provenance.
4. Execute at least five valid runs for each of the ten RF-04 scenarios and store sanitized envelopes plus hashes.
5. Build a deterministic structural projection and separate diagnostic distributions with sample count, median, p95, mean, and standard deviation.
6. Add offline rebuild and tamper checks for anchor, coverage, usage, outcomes, provenance, run count, artifact hashes, self-rehash, safety regression, and structural-digest exclusions.
7. Integrate the check into critical, contract, and prepublish lanes; update the roadmap and make this task a required alpha.1 dependency.

## Verify Steps

1. Run bun run bench:agent-efficiency:replay:capture -- --anchor 1a702e160ba9f0efe7067f2a22fc008defc89ffb --runs 5. Expected: ten scenarios, at least fifty valid envelopes, one fixed model/runtime profile, no secrets or absolute host paths.
2. Run bun run bench:agent-efficiency:replay:check. Expected: 70/70 outcomes, 27/27 provider token cells, and 170/170 scalar cells resolved as observed or typed not_applicable; every hash and anchor matches.
3. Rebuild the summary twice from the same frozen envelopes. Expected: byte-identical structural projection/digest and exactly reproducible diagnostic statistics.
4. Run tamper fixtures. Expected: changed anchor, usage, outcome, provenance, run count, or artifact hash fails; timestamp, host, and latency samples do not alter structural digest.
5. Run bunx vitest run packages/agentplane/src/cli/run-cli.critical.agent-efficiency-replay.test.ts. Expected: focused replay contract passes.
6. Run bun run test:critical, bun run typecheck, and bun run ci:contract. Expected: all full gates pass on one reviewed SHA.
7. Verify alpha.1 dependency closure. Expected: 202607221907-DK2CJF directly depends on this task and cannot qualify before replay telemetry is DONE.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert only the new replay scripts, sanitized artifacts, tests, CI entries, roadmap row, and dependency edge.
- Do not alter the historical RF-04 baseline or immutable anchor SHA.
- Do not remove the alpha.1 dependency merely to pass the gate; if capture is impossible, replace it with another bounded task that records the blocker.
- Delete unpublished provider traces; never overwrite a published baseline artifact.

## Findings
