---
id: "202607300654-0ANCWF"
title: "Atomically synchronize RF-04 incident archival across package assets"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 5
origin:
  system: "manual"
depends_on:
  - "202607300553-CR9VTJ"
tags:
  - "assets"
  - "code"
  - "incidents"
  - "milestone-beta1"
  - "release"
  - "rf-04"
  - "v0.7"
task_kind: "code"
mutation_scope: "code"
blueprint_request: "code.branch_pr"
verify:
  - "ap doctor"
  - "bun run agents:check"
  - "bun run assets:builtin:check"
  - "node .agentplane/policy/check-routing.mjs"
  - "node scripts/check-release-incidents.mjs"
plan_approval:
  state: "approved"
  updated_at: "2026-07-30T06:55:13.148Z"
  updated_by: "ORCHESTRATOR"
  note: "Approved under the user's standing authorization. Package/project policy parity is a required atomic code boundary exposed by hosted CI, not a provider retry or release expansion."
verification:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
  attempts: 0
commit: null
comments:
  -
    author: "CODER"
    body: "Start: continue branch_pr task in the dedicated task worktree."
events:
  -
    type: "status"
    at: "2026-07-30T06:55:29.628Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: continue branch_pr task in the dedicated task worktree."
doc_version: 3
doc_updated_at: "2026-07-30T06:55:29.628Z"
doc_updated_by: "CODER"
description: "Supersede the unmergeable docs-only archival PR #4683 by applying the already-approved external-mitigation disposition atomically: remove INC-20260730-01 from the packaged canonical incident policy, synchronize the project policy target, regenerate built-in assets, and add the faithful historical archive record. Preserve CR9VTJ do_not_publish evidence and the no-retry/no-replacement boundary; do not call a provider, release, or publish a package."
sections:
  Summary: |-
    Atomically synchronize RF-04 incident archival across package assets

    Supersede the unmergeable docs-only archival PR #4683 by applying the already-approved external-mitigation disposition atomically: remove INC-20260730-01 from the packaged canonical incident policy, synchronize the project policy target, regenerate built-in assets, and add the faithful historical archive record. Preserve CR9VTJ do_not_publish evidence and the no-retry/no-replacement boundary; do not call a provider, release, or publish a package.
  Scope: |-
    - In scope: Supersede the unmergeable docs-only archival PR #4683 by applying the already-approved external-mitigation disposition atomically: remove INC-20260730-01 from the packaged canonical incident policy, synchronize the project policy target, regenerate built-in assets, and add the faithful historical archive record. Preserve CR9VTJ do_not_publish evidence and the no-retry/no-replacement boundary; do not call a provider, release, or publish a package.
    - Out of scope: unrelated refactors not required for "Atomically synchronize RF-04 incident archival across package assets".
  Plan: "1. Reconstruct the exact externally mitigated RF-04 disposition from the failed provider precondition and merged CR9VTJ non-publication decision. 2. Update the canonical packaged incident policy first, then synchronize the project policy target and regenerate the built-in asset table. 3. Add the identical, faithful historical archive entry without changing provider or release semantics. 4. Prove package/project parity and rerun the exact local CI path that rejected PR #4683. 5. Verify, evaluate, integrate through branch_pr, and close PR #4683 only as superseded after the replacement task is merged."
  Verify Steps: |-
    1. Inspect the original INC-20260730-01 and CR9VTJ packet. Expected: the preserved archive includes RF04_DRIVER_ERROR:CODEX_VERSION_MISMATCH, qualification_decision=do_not_publish, live_provider_measurement=not_run_by_packet_builder, and makes no successful-rerun claim.
    2. Inspect packages/agentplane/assets/policy/incidents.md, .agentplane/policy/incidents.md, and docs/developer/incident-archive.mdx. Expected: the incident is absent from both active registries and occurs exactly once in the archive as externally mitigated, with source evidence and a future pinned-environment reopen condition.
    3. Run bun run agents:check and bun run assets:builtin:check. Expected: canonical package policy, project policy target, and generated built-in asset table are synchronized.
    4. Run node scripts/check-release-incidents.mjs, node .agentplane/policy/check-routing.mjs, ap doctor, and bun run ci:local:fast. Expected: release gate, policy routing, workflow health, and the previously failed routed CI path pass.
    5. Run git diff --check and inspect the diff. Expected: only incident archive/registries, generated asset table, and task artifacts change; no provider call, measurement retry, package release, or unrelated product code.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
extensions:
  workflow_route_baseline:
    start_head_sha: "951374ef0854d7bccd57361e6be7ec6ddededa6d"
    version: 1
id_source: "generated"
---
## Summary

Atomically synchronize RF-04 incident archival across package assets

Supersede the unmergeable docs-only archival PR #4683 by applying the already-approved external-mitigation disposition atomically: remove INC-20260730-01 from the packaged canonical incident policy, synchronize the project policy target, regenerate built-in assets, and add the faithful historical archive record. Preserve CR9VTJ do_not_publish evidence and the no-retry/no-replacement boundary; do not call a provider, release, or publish a package.

## Scope

- In scope: Supersede the unmergeable docs-only archival PR #4683 by applying the already-approved external-mitigation disposition atomically: remove INC-20260730-01 from the packaged canonical incident policy, synchronize the project policy target, regenerate built-in assets, and add the faithful historical archive record. Preserve CR9VTJ do_not_publish evidence and the no-retry/no-replacement boundary; do not call a provider, release, or publish a package.
- Out of scope: unrelated refactors not required for "Atomically synchronize RF-04 incident archival across package assets".

## Plan

1. Reconstruct the exact externally mitigated RF-04 disposition from the failed provider precondition and merged CR9VTJ non-publication decision. 2. Update the canonical packaged incident policy first, then synchronize the project policy target and regenerate the built-in asset table. 3. Add the identical, faithful historical archive entry without changing provider or release semantics. 4. Prove package/project parity and rerun the exact local CI path that rejected PR #4683. 5. Verify, evaluate, integrate through branch_pr, and close PR #4683 only as superseded after the replacement task is merged.

## Verify Steps

1. Inspect the original INC-20260730-01 and CR9VTJ packet. Expected: the preserved archive includes RF04_DRIVER_ERROR:CODEX_VERSION_MISMATCH, qualification_decision=do_not_publish, live_provider_measurement=not_run_by_packet_builder, and makes no successful-rerun claim.
2. Inspect packages/agentplane/assets/policy/incidents.md, .agentplane/policy/incidents.md, and docs/developer/incident-archive.mdx. Expected: the incident is absent from both active registries and occurs exactly once in the archive as externally mitigated, with source evidence and a future pinned-environment reopen condition.
3. Run bun run agents:check and bun run assets:builtin:check. Expected: canonical package policy, project policy target, and generated built-in asset table are synchronized.
4. Run node scripts/check-release-incidents.mjs, node .agentplane/policy/check-routing.mjs, ap doctor, and bun run ci:local:fast. Expected: release gate, policy routing, workflow health, and the previously failed routed CI path pass.
5. Run git diff --check and inspect the diff. Expected: only incident archive/registries, generated asset table, and task artifacts change; no provider call, measurement retry, package release, or unrelated product code.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
