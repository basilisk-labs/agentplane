---
id: "202607222129-1ZQHJD"
title: "Capture anchored multi-run RF-04 replay telemetry"
status: "DOING"
priority: "high"
owner: "TESTER"
revision: 29
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
  updated_at: "2026-07-23T01:28:43.355Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-07-23T14:10:16.897Z"
  updated_by: "TESTER"
  note: "Post-rebase verification passed on ba22c6f7: immutable RF-04 patch parity confirmed by range-diff and SHA256; offline replay validates 50 runs, 70/70 outcomes, 27/27 provider token cells, 170/170 scalar cells, structural 006ddc6d and diagnostics 01c7b818; four focused suites pass 40/40; all 11 critical chunks, typecheck, routing, full ci:contract, architecture, clone=88, Knip, and coverage gates pass. Historical baseline blob remains cc5eb860, 50 envelopes and 50 evidence bundles remain canonical, transaction marker is absent, and alpha.1 still directly depends on this task."
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
  -
    author: "TESTER"
    body: "Replacement pilot executed exactly once with no retry. The direct/run-01 driver failed closed before artifact publication with diagnostic CODEX_FINAL_STATUS_COUNT. Transaction marker, replay envelopes, evidence bundles, and replay baseline are absent; the worktree remained clean. Full 50-run capture was not started. Offline remediation is limited to resolving repeated schema-valid status events only when their sanitized status values agree; conflicting values remain a hard failure. A new provider call requires separate approval after tests and independent audit pass."
  -
    author: "TESTER"
    body: "The approved replacement pilot passed with exact provider input/output/reasoning usage. The immediately following full capture stopped fail-closed on the first direct/run-01 episode with CODEX_FINAL_STATUS_CONFLICT; the remaining 49 runs were not started. All publication targets and the transaction marker are absent, and the worktree had no generated capture residue. Live evidence and the pinned Codex --output-last-message contract show that schema-constrained intermediate agent messages may legitimately change status; the bounded repair now resolves the last independently validated status before the single turn.completed boundary and rejects any post-completion status with CODEX_FINAL_STATUS_ORDER. No further provider run is authorized by this repair."
  -
    author: "TESTER"
    body: "The authorized full capture advanced through 40/50 scenario runs (45/55 provider episodes) and then failed closed before provider execution for adapter_failure/run-01 with ANCHOR_TASK_NEW. Nine later scenario runs were not started. Transaction cleanup removed all 40 staged envelopes, evidence bundles, and the marker; no baseline or partial artifact was published. Root cause: the logical CURRENT_AGENT telemetry label was passed as a concrete anchor task actor, while the frozen anchor accepts CODER. The fix maps CURRENT_AGENT to CODER only for task owner, plan author, and start author while preserving CURRENT_AGENT in prompts, episode ledger, provider usage, and token usage. Exact-anchor mocked regression and the four focused suites pass 40/40. The user authorized autonomous retries, so no repeated provider approval is required within this RF-04 scope."
  -
    author: "TESTER"
    body: "The autonomous full retry completed successfully: 50/50 scenario runs and 55/55 provider episodes were published as 50 sanitized envelopes and 50 content-addressed evidence bundles. The offline checker resolves 70/70 outcome cells, 27/27 provider token cells, and 170/170 scalar cells under one fixed profile; structural_sha256=sha256:006ddc6d2b8e8c350a879edeb7140d36dbbd31c0c745b96f57792871b9099ee4 and diagnostics_sha256=sha256:01c7b81828826b44d18d0b6a26288ac62b031cf4e30242a421f77ec37b2ca44e. Secret and host-path scans are clean, staging and transaction markers are absent, and the historical baseline blob remains cc5eb8600d41b7da3adf19ee06b58227caaab064. Four focused suites pass 40/40; all 11 critical chunks, TypeScript, workflow lint, task-state, policy routing, format, replay, guards, lint, and architecture checks pass. Full ci:contract reaches clone:check and then exposes a pre-existing main drift (91 clones versus baseline 88); clean main reproduces the same 91, while no reported clone pair touches an RF-04 file. This unrelated baseline reconciliation is being handled separately before final verification."
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
  -
    type: "comment"
    at: "2026-07-23T10:46:35.188Z"
    author: "TESTER"
    body: "Replacement pilot executed exactly once with no retry. The direct/run-01 driver failed closed before artifact publication with diagnostic CODEX_FINAL_STATUS_COUNT. Transaction marker, replay envelopes, evidence bundles, and replay baseline are absent; the worktree remained clean. Full 50-run capture was not started. Offline remediation is limited to resolving repeated schema-valid status events only when their sanitized status values agree; conflicting values remain a hard failure. A new provider call requires separate approval after tests and independent audit pass."
  -
    type: "comment"
    at: "2026-07-23T11:04:47.308Z"
    author: "TESTER"
    body: "The approved replacement pilot passed with exact provider input/output/reasoning usage. The immediately following full capture stopped fail-closed on the first direct/run-01 episode with CODEX_FINAL_STATUS_CONFLICT; the remaining 49 runs were not started. All publication targets and the transaction marker are absent, and the worktree had no generated capture residue. Live evidence and the pinned Codex --output-last-message contract show that schema-constrained intermediate agent messages may legitimately change status; the bounded repair now resolves the last independently validated status before the single turn.completed boundary and rejects any post-completion status with CODEX_FINAL_STATUS_ORDER. No further provider run is authorized by this repair."
  -
    type: "comment"
    at: "2026-07-23T12:20:31.095Z"
    author: "TESTER"
    body: "The authorized full capture advanced through 40/50 scenario runs (45/55 provider episodes) and then failed closed before provider execution for adapter_failure/run-01 with ANCHOR_TASK_NEW. Nine later scenario runs were not started. Transaction cleanup removed all 40 staged envelopes, evidence bundles, and the marker; no baseline or partial artifact was published. Root cause: the logical CURRENT_AGENT telemetry label was passed as a concrete anchor task actor, while the frozen anchor accepts CODER. The fix maps CURRENT_AGENT to CODER only for task owner, plan author, and start author while preserving CURRENT_AGENT in prompts, episode ledger, provider usage, and token usage. Exact-anchor mocked regression and the four focused suites pass 40/40. The user authorized autonomous retries, so no repeated provider approval is required within this RF-04 scope."
  -
    type: "comment"
    at: "2026-07-23T13:19:15.080Z"
    author: "TESTER"
    body: "The autonomous full retry completed successfully: 50/50 scenario runs and 55/55 provider episodes were published as 50 sanitized envelopes and 50 content-addressed evidence bundles. The offline checker resolves 70/70 outcome cells, 27/27 provider token cells, and 170/170 scalar cells under one fixed profile; structural_sha256=sha256:006ddc6d2b8e8c350a879edeb7140d36dbbd31c0c745b96f57792871b9099ee4 and diagnostics_sha256=sha256:01c7b81828826b44d18d0b6a26288ac62b031cf4e30242a421f77ec37b2ca44e. Secret and host-path scans are clean, staging and transaction markers are absent, and the historical baseline blob remains cc5eb8600d41b7da3adf19ee06b58227caaab064. Four focused suites pass 40/40; all 11 critical chunks, TypeScript, workflow lint, task-state, policy routing, format, replay, guards, lint, and architecture checks pass. Full ci:contract reaches clone:check and then exposes a pre-existing main drift (91 clones versus baseline 88); clean main reproduces the same 91, while no reported clone pair touches an RF-04 file. This unrelated baseline reconciliation is being handled separately before final verification."
  -
    type: "verify"
    at: "2026-07-23T14:02:48.535Z"
    author: "TESTER"
    state: "needs_rework"
    note: "Fresh clone:check on RF-04 head ba30ea2a fails only because the branch is eight main commits behind W084MM: 91 clones versus baseline 88. Update the task branch from main fd1e52a7, keep RF-04 artifacts and immutable anchor unchanged, then rerun the full declared verification contract."
  -
    type: "verify"
    at: "2026-07-23T14:10:16.897Z"
    author: "TESTER"
    state: "ok"
    note: "Post-rebase verification passed on ba22c6f7: immutable RF-04 patch parity confirmed by range-diff and SHA256; offline replay validates 50 runs, 70/70 outcomes, 27/27 provider token cells, 170/170 scalar cells, structural 006ddc6d and diagnostics 01c7b818; four focused suites pass 40/40; all 11 critical chunks, typecheck, routing, full ci:contract, architecture, clone=88, Knip, and coverage gates pass. Historical baseline blob remains cc5eb860, 50 envelopes and 50 evidence bundles remain canonical, transaction marker is absent, and alpha.1 still directly depends on this task."
doc_version: 3
doc_updated_at: "2026-07-23T14:10:17.280Z"
doc_updated_by: "TESTER"
description: "Add an additive replay baseline for immutable pre-v0.7 main commit 1a702e160ba9f0efe7067f2a22fc008defc89ffb by executing all ten RF-04 scenarios at least five times in isolated fixtures, recording provider-reported token usage and 70 resolved outcome cells with per-field fixture_control or supervisor_observed provenance, collecting cognitive, orchestration, latency, retrieval, and evidence metrics, and enforcing offline provenance and coverage checks without rewriting the historical RF-04 baseline or changing product semantics."
sections:
  Summary: |-
    Capture anchored multi-run RF-04 replay telemetry

    Add an additive replay baseline for immutable pre-v0.7 main commit 1a702e160ba9f0efe7067f2a22fc008defc89ffb by executing all ten RF-04 scenarios at least five times in isolated fixtures, recording authoritative observed outcomes, provider token usage, cognitive and orchestration proxies, latency, retrieval, and evidence-provenance metrics, and enforcing offline provenance and coverage checks without rewriting the historical RF-04 baseline or changing product semantics.
  Scope: |-
    - Resolve 70/70 outcome cells with field-level provenance: golden expectations and declared lifecycle controls are fixture_control; filesystem effects, final status, scope violations, and other independently measured facts are supervisor_observed. Never relabel fixture controls as observations.
    - Resolve 27/27 provider-reported role token cells and all 170 scalar cells as an observed value or typed not_applicable; never encode unknown as zero and never persist prompts, final text, stderr, credentials, or hidden reasoning.
    - Capture ten RF-04 scenarios at five runs each as 50 sanitized envelopes and 55 declared provider episodes under one fixed model/runtime profile, using exact-anchor CLI preparation and the reviewed Codex driver.
    - Preserve scripts/baselines/agent-efficiency-pre-v0.7-main.json unchanged; the replay baseline remains additive and anchored to exact historical main 1a702e160ba9f0efe7067f2a22fc008defc89ffb.
    - Keep product semantics unchanged; this task measures and verifies the pre-v0.7 control.
  Plan: |-
    1. Keep the immutable anchor, replay schema, applicability rules, per-field provenance, and comparison policy fail-closed.
    2. Use the audited capture runtime, canonical targets, transaction recovery, sterile Git/environment, and separate portable versus capture-platform dependency receipts.
    3. Run one non-persisting direct/run-01 pilot with no retry; continue only if exact provider usage includes reasoning_output_tokens and every safety/linkage check passes.
    4. Execute five valid runs for each of the ten RF-04 scenarios with the reviewed driver, producing 50 sanitized envelopes and 55 declared provider episodes under one fixed model/runtime profile.
    5. Validate and publish envelopes, evidence bundles, and replay baseline as one rollback transaction with the baseline installed last.
    6. Rebuild offline and reject anchor, dependency, usage, resolved-outcome, provenance, run-count, artifact-hash, self-rehash, safety, or structural-digest tampering.
    7. Keep the alpha.1 gate dependent on the completed replay task.
  Verify Steps: |-
    1. Run the reviewed capture command with --pilot and the Codex replay driver. Expected: only direct/run-01 executes, nothing is persisted, no retry occurs, exact provider input/output/reasoning usage is present, and all receipt, effect, status, dependency, and path checks pass.
    2. Run the full capture at anchor 1a702e160ba9f0efe7067f2a22fc008defc89ffb with --runs 5 and the reviewed driver. Expected: ten scenarios, 50 valid sanitized envelopes, 55 declared provider episodes, one fixed model/runtime profile, no secrets or absolute host paths.
    3. Run the offline replay checker. Expected: 70/70 resolved outcome cells carry exact fixture_control or supervisor_observed provenance, 27/27 provider token cells and 170/170 scalar cells are resolved as observed values or typed not_applicable, and every artifact, dependency, harness, anchor, and transaction hash matches.
    4. Run the four focused RF-04 replay test files and tamper cases. Expected: 40/40 pass and changes to anchor, portable or platform dependency receipt, usage, outcome, provenance, run count, target safety, final-status ordering, or artifact hash fail closed.
    5. Confirm scripts/baselines/agent-efficiency-pre-v0.7-main.json is byte-identical and the alpha.1 gate directly depends on this task.
    6. Run formatting, scoped lint, TypeScript, policy routing, critical-route, hotspot, and diff checks. Expected: all pass without live-data exceptions.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-07-23T14:02:48.535Z — VERIFY — needs_rework

    By: TESTER

    Note: Fresh clone:check on RF-04 head ba30ea2a fails only because the branch is eight main commits behind W084MM: 91 clones versus baseline 88. Update the task branch from main fd1e52a7, keep RF-04 artifacts and immutable anchor unchanged, then rerun the full declared verification contract.
    Attempts: 1

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-23T13:19:15.374Z, excerpt_hash=sha256:ebef1420355cb6aa0b63e71b4bebb4392cc88acd42e080b39d63f6ccf9e2a9c6

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/base-main-for-XS41ZV/.agentplane/worktrees/202607222129-1ZQHJD-capture-anchored-multi-run-rf-04-replay-telemetr/.agentplane/tasks/202607222129-1ZQHJD/blueprint/resolved-snapshot.json
    - old_digest: c623f4d584bdb41f52b4f3ff3de5ffc857f8654dc401d312940b98493af8189b
    - current_digest: c623f4d584bdb41f52b4f3ff3de5ffc857f8654dc401d312940b98493af8189b
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202607222129-1ZQHJD

    DecisionContextRef:
    - operator_action: stop
    - can_execute_now: false
    - safe_command: none
    - diagnostic_command: none
    - source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: false
    - repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
    - risks: none

    ### 2026-07-23T14:10:16.897Z — VERIFY — ok

    By: TESTER

    Note: Post-rebase verification passed on ba22c6f7: immutable RF-04 patch parity confirmed by range-diff and SHA256; offline replay validates 50 runs, 70/70 outcomes, 27/27 provider token cells, 170/170 scalar cells, structural 006ddc6d and diagnostics 01c7b818; four focused suites pass 40/40; all 11 critical chunks, typecheck, routing, full ci:contract, architecture, clone=88, Knip, and coverage gates pass. Historical baseline blob remains cc5eb860, 50 envelopes and 50 evidence bundles remain canonical, transaction marker is absent, and alpha.1 still directly depends on this task.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-23T14:02:48.808Z, excerpt_hash=sha256:ebef1420355cb6aa0b63e71b4bebb4392cc88acd42e080b39d63f6ccf9e2a9c6

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/base-main-for-XS41ZV/.agentplane/worktrees/202607222129-1ZQHJD-capture-anchored-multi-run-rf-04-replay-telemetr/.agentplane/tasks/202607222129-1ZQHJD/blueprint/resolved-snapshot.json
    - old_digest: c623f4d584bdb41f52b4f3ff3de5ffc857f8654dc401d312940b98493af8189b
    - current_digest: c623f4d584bdb41f52b4f3ff3de5ffc857f8654dc401d312940b98493af8189b
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202607222129-1ZQHJD

    DecisionContextRef:
    - operator_action: stop
    - can_execute_now: false
    - safe_command: none
    - diagnostic_command: none
    - source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: false
    - repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
    - risks: none

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert only the new replay scripts, sanitized artifacts, tests, CI entries, roadmap row, and dependency edge.
    - Do not alter the historical RF-04 baseline or immutable anchor SHA.
    - Do not remove the alpha.1 dependency merely to pass the gate; if capture is impossible, replace it with another bounded task that records the blocker.
    - Delete unpublished provider traces; never overwrite a published baseline artifact.
  Findings: |-
    The first authorized replacement pilot ran once with no retry and failed closed before publication with CODEX_FINAL_STATUS_COUNT. No replay artifacts, transaction marker, raw prompt, final text, or JSONL remained. The first bounded repair distinguished repeated identical values from conflicts.

    A second separately approved pilot passed and returned exact provider input, output, and reasoning usage. The immediately following approved full capture stopped fail-closed on the first direct/run-01 episode with CODEX_FINAL_STATUS_CONFLICT; the remaining 49 runs were not started, and transaction cleanup again removed every unpublished target.

    The second live result invalidated the assumption that every schema-valid streamed status is final. The pinned Codex CLI exposes all streaming item events but defines --output-last-message as the final agent response; the official Codex SDK likewise overwrites finalResponse on each agent_message. The bounded repair therefore validates every pre-completion status independently, resolves the last enum before the single turn.completed boundary, and rejects post-completion messages with CODEX_FINAL_STATUS_ORDER. Raw JSON remains unpersisted.

    An authorized full retry then completed 40 of 50 scenario runs and 45 of 55 provider episodes in staging. The driver failed before provider execution on adapter_failure/run-01 with ANCHOR_TASK_NEW; nine later scenario runs did not start. All-or-nothing cleanup removed the 40 staged envelopes, evidence bundles, and transaction marker, so no replay baseline or partial artifact was published.

    The frozen anchor has no CURRENT_AGENT role: it is a logical executor and telemetry label, not a concrete lifecycle actor. The repair maps CURRENT_AGENT to CODER only for task owner, plan author, and start author. Exact-anchor offline coverage proves the lifecycle succeeds while prompts, episode ledger, provider usage, and token usage retain CURRENT_AGENT; the four focused RF-04 suites pass 40/40 and an independent audit found no P0/P1/P2 issue.

    The autonomous full retry completed all 50 scenario runs and 55 provider episodes. It published 50 sanitized envelopes and 50 content-addressed evidence bundles under one fixed profile. The offline checker resolves 70/70 outcome cells, 27/27 provider token cells, and 170/170 scalar cells with structural_sha256 sha256:006ddc6d2b8e8c350a879edeb7140d36dbbd31c0c745b96f57792871b9099ee4 and diagnostics_sha256 sha256:01c7b81828826b44d18d0b6a26288ac62b031cf4e30242a421f77ec37b2ca44e. Secret and host-path scans are clean, staging and transaction markers are absent, and the historical baseline blob remains cc5eb8600d41b7da3adf19ee06b58227caaab064.

    The aggregate baseline and per-run capture files are machine-owned canonical, content-addressed JSON. A scoped Prettier exclusion preserves those bytes while replay:check remains the stricter canonical/hash/linkage validator; format:check and replay:check both pass, and an independent audit found no P0/P1/P2 issue.

    All RF-04-specific and critical checks pass. Full ci:contract reaches clone:check and then exposes an unrelated pre-existing main drift: clean main and this branch both report 91 clones against baseline 88, and none of the current 91 clone pairs touches an RF-04 file. That baseline reconciliation must be resolved separately before final task verification.
id_source: "generated"
---
## Summary

Capture anchored multi-run RF-04 replay telemetry

Add an additive replay baseline for immutable pre-v0.7 main commit 1a702e160ba9f0efe7067f2a22fc008defc89ffb by executing all ten RF-04 scenarios at least five times in isolated fixtures, recording authoritative observed outcomes, provider token usage, cognitive and orchestration proxies, latency, retrieval, and evidence-provenance metrics, and enforcing offline provenance and coverage checks without rewriting the historical RF-04 baseline or changing product semantics.

## Scope

- Resolve 70/70 outcome cells with field-level provenance: golden expectations and declared lifecycle controls are fixture_control; filesystem effects, final status, scope violations, and other independently measured facts are supervisor_observed. Never relabel fixture controls as observations.
- Resolve 27/27 provider-reported role token cells and all 170 scalar cells as an observed value or typed not_applicable; never encode unknown as zero and never persist prompts, final text, stderr, credentials, or hidden reasoning.
- Capture ten RF-04 scenarios at five runs each as 50 sanitized envelopes and 55 declared provider episodes under one fixed model/runtime profile, using exact-anchor CLI preparation and the reviewed Codex driver.
- Preserve scripts/baselines/agent-efficiency-pre-v0.7-main.json unchanged; the replay baseline remains additive and anchored to exact historical main 1a702e160ba9f0efe7067f2a22fc008defc89ffb.
- Keep product semantics unchanged; this task measures and verifies the pre-v0.7 control.

## Plan

1. Keep the immutable anchor, replay schema, applicability rules, per-field provenance, and comparison policy fail-closed.
2. Use the audited capture runtime, canonical targets, transaction recovery, sterile Git/environment, and separate portable versus capture-platform dependency receipts.
3. Run one non-persisting direct/run-01 pilot with no retry; continue only if exact provider usage includes reasoning_output_tokens and every safety/linkage check passes.
4. Execute five valid runs for each of the ten RF-04 scenarios with the reviewed driver, producing 50 sanitized envelopes and 55 declared provider episodes under one fixed model/runtime profile.
5. Validate and publish envelopes, evidence bundles, and replay baseline as one rollback transaction with the baseline installed last.
6. Rebuild offline and reject anchor, dependency, usage, resolved-outcome, provenance, run-count, artifact-hash, self-rehash, safety, or structural-digest tampering.
7. Keep the alpha.1 gate dependent on the completed replay task.

## Verify Steps

1. Run the reviewed capture command with --pilot and the Codex replay driver. Expected: only direct/run-01 executes, nothing is persisted, no retry occurs, exact provider input/output/reasoning usage is present, and all receipt, effect, status, dependency, and path checks pass.
2. Run the full capture at anchor 1a702e160ba9f0efe7067f2a22fc008defc89ffb with --runs 5 and the reviewed driver. Expected: ten scenarios, 50 valid sanitized envelopes, 55 declared provider episodes, one fixed model/runtime profile, no secrets or absolute host paths.
3. Run the offline replay checker. Expected: 70/70 resolved outcome cells carry exact fixture_control or supervisor_observed provenance, 27/27 provider token cells and 170/170 scalar cells are resolved as observed values or typed not_applicable, and every artifact, dependency, harness, anchor, and transaction hash matches.
4. Run the four focused RF-04 replay test files and tamper cases. Expected: 40/40 pass and changes to anchor, portable or platform dependency receipt, usage, outcome, provenance, run count, target safety, final-status ordering, or artifact hash fail closed.
5. Confirm scripts/baselines/agent-efficiency-pre-v0.7-main.json is byte-identical and the alpha.1 gate directly depends on this task.
6. Run formatting, scoped lint, TypeScript, policy routing, critical-route, hotspot, and diff checks. Expected: all pass without live-data exceptions.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-07-23T14:02:48.535Z — VERIFY — needs_rework

By: TESTER

Note: Fresh clone:check on RF-04 head ba30ea2a fails only because the branch is eight main commits behind W084MM: 91 clones versus baseline 88. Update the task branch from main fd1e52a7, keep RF-04 artifacts and immutable anchor unchanged, then rerun the full declared verification contract.
Attempts: 1

VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-23T13:19:15.374Z, excerpt_hash=sha256:ebef1420355cb6aa0b63e71b4bebb4392cc88acd42e080b39d63f6ccf9e2a9c6

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/base-main-for-XS41ZV/.agentplane/worktrees/202607222129-1ZQHJD-capture-anchored-multi-run-rf-04-replay-telemetr/.agentplane/tasks/202607222129-1ZQHJD/blueprint/resolved-snapshot.json
- old_digest: c623f4d584bdb41f52b4f3ff3de5ffc857f8654dc401d312940b98493af8189b
- current_digest: c623f4d584bdb41f52b4f3ff3de5ffc857f8654dc401d312940b98493af8189b
- route_changed: no
- safe_command: agentplane blueprint snapshot 202607222129-1ZQHJD

DecisionContextRef:
- operator_action: stop
- can_execute_now: false
- safe_command: none
- diagnostic_command: none
- source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: false
- repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
- risks: none

### 2026-07-23T14:10:16.897Z — VERIFY — ok

By: TESTER

Note: Post-rebase verification passed on ba22c6f7: immutable RF-04 patch parity confirmed by range-diff and SHA256; offline replay validates 50 runs, 70/70 outcomes, 27/27 provider token cells, 170/170 scalar cells, structural 006ddc6d and diagnostics 01c7b818; four focused suites pass 40/40; all 11 critical chunks, typecheck, routing, full ci:contract, architecture, clone=88, Knip, and coverage gates pass. Historical baseline blob remains cc5eb860, 50 envelopes and 50 evidence bundles remain canonical, transaction marker is absent, and alpha.1 still directly depends on this task.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-23T14:02:48.808Z, excerpt_hash=sha256:ebef1420355cb6aa0b63e71b4bebb4392cc88acd42e080b39d63f6ccf9e2a9c6

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/base-main-for-XS41ZV/.agentplane/worktrees/202607222129-1ZQHJD-capture-anchored-multi-run-rf-04-replay-telemetr/.agentplane/tasks/202607222129-1ZQHJD/blueprint/resolved-snapshot.json
- old_digest: c623f4d584bdb41f52b4f3ff3de5ffc857f8654dc401d312940b98493af8189b
- current_digest: c623f4d584bdb41f52b4f3ff3de5ffc857f8654dc401d312940b98493af8189b
- route_changed: no
- safe_command: agentplane blueprint snapshot 202607222129-1ZQHJD

DecisionContextRef:
- operator_action: stop
- can_execute_now: false
- safe_command: none
- diagnostic_command: none
- source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: false
- repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
- risks: none

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert only the new replay scripts, sanitized artifacts, tests, CI entries, roadmap row, and dependency edge.
- Do not alter the historical RF-04 baseline or immutable anchor SHA.
- Do not remove the alpha.1 dependency merely to pass the gate; if capture is impossible, replace it with another bounded task that records the blocker.
- Delete unpublished provider traces; never overwrite a published baseline artifact.

## Findings

The first authorized replacement pilot ran once with no retry and failed closed before publication with CODEX_FINAL_STATUS_COUNT. No replay artifacts, transaction marker, raw prompt, final text, or JSONL remained. The first bounded repair distinguished repeated identical values from conflicts.

A second separately approved pilot passed and returned exact provider input, output, and reasoning usage. The immediately following approved full capture stopped fail-closed on the first direct/run-01 episode with CODEX_FINAL_STATUS_CONFLICT; the remaining 49 runs were not started, and transaction cleanup again removed every unpublished target.

The second live result invalidated the assumption that every schema-valid streamed status is final. The pinned Codex CLI exposes all streaming item events but defines --output-last-message as the final agent response; the official Codex SDK likewise overwrites finalResponse on each agent_message. The bounded repair therefore validates every pre-completion status independently, resolves the last enum before the single turn.completed boundary, and rejects post-completion messages with CODEX_FINAL_STATUS_ORDER. Raw JSON remains unpersisted.

An authorized full retry then completed 40 of 50 scenario runs and 45 of 55 provider episodes in staging. The driver failed before provider execution on adapter_failure/run-01 with ANCHOR_TASK_NEW; nine later scenario runs did not start. All-or-nothing cleanup removed the 40 staged envelopes, evidence bundles, and transaction marker, so no replay baseline or partial artifact was published.

The frozen anchor has no CURRENT_AGENT role: it is a logical executor and telemetry label, not a concrete lifecycle actor. The repair maps CURRENT_AGENT to CODER only for task owner, plan author, and start author. Exact-anchor offline coverage proves the lifecycle succeeds while prompts, episode ledger, provider usage, and token usage retain CURRENT_AGENT; the four focused RF-04 suites pass 40/40 and an independent audit found no P0/P1/P2 issue.

The autonomous full retry completed all 50 scenario runs and 55 provider episodes. It published 50 sanitized envelopes and 50 content-addressed evidence bundles under one fixed profile. The offline checker resolves 70/70 outcome cells, 27/27 provider token cells, and 170/170 scalar cells with structural_sha256 sha256:006ddc6d2b8e8c350a879edeb7140d36dbbd31c0c745b96f57792871b9099ee4 and diagnostics_sha256 sha256:01c7b81828826b44d18d0b6a26288ac62b031cf4e30242a421f77ec37b2ca44e. Secret and host-path scans are clean, staging and transaction markers are absent, and the historical baseline blob remains cc5eb8600d41b7da3adf19ee06b58227caaab064.

The aggregate baseline and per-run capture files are machine-owned canonical, content-addressed JSON. A scoped Prettier exclusion preserves those bytes while replay:check remains the stricter canonical/hash/linkage validator; format:check and replay:check both pass, and an independent audit found no P0/P1/P2 issue.

All RF-04-specific and critical checks pass. Full ci:contract reaches clone:check and then exposes an unrelated pre-existing main drift: clean main and this branch both report 91 clones against baseline 88, and none of the current 91 clone pairs touches an RF-04 file. That baseline reconciliation must be resolved separately before final task verification.
