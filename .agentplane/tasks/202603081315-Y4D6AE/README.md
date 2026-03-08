---
id: "202603081315-Y4D6AE"
title: "Add repository-expected CLI version diagnostics"
status: "DOING"
priority: "med"
owner: "CODER"
depends_on:
  - "202603081315-H2E5Q5"
tags:
  - "code"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-08T13:46:05.612Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
commit: null
comments:
  -
    author: "CODER"
    body: "Start: wiring repo-level expected CLI version into config plus runtime diagnostics. Scope stays on detection and explicit recovery, not silent global mutation."
events:
  -
    type: "status"
    at: "2026-03-08T13:46:14.145Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: wiring repo-level expected CLI version into config plus runtime diagnostics. Scope stays on detection and explicit recovery, not silent global mutation."
doc_version: 3
doc_updated_at: "2026-03-08T14:00:30.188Z"
doc_updated_by: "CODER"
description: "Store the expected agentplane CLI version in repo configuration and detect when the active global CLI is older, with a safe recovery path that does not silently mutate global installs."
id_source: "generated"
---
## Summary

- Problem: a repository may assume a newer `agentplane` CLI than the active global install, but today that expectation is implicit and easy to miss.
- Target outcome: repo config can declare the expected CLI version, and runtime diagnostics report when the active CLI is older with an exact recovery path.
- Constraint: do not silently mutate a contributor's global install just because a repository asks for it.

## Scope

### In scope
- Add repo config fields for expected CLI version.
- Detect older active CLI versions in runtime diagnostics and doctor/preflight-relevant surfaces.
- Provide a deterministic recovery command or workflow.

### Out of scope
- Silent global auto-update from repo config.
- New network-heavy install/update workflow beyond a clear recovery path.

## Plan

1. Extend config schema/defaults with repo-level expected CLI version metadata.
2. Reuse existing runtime version resolution and semver comparison to detect when the active CLI is older than the repo expectation.
3. Surface the mismatch in `doctor` and `runtime explain`, update docs/tests, and keep the recovery path explicit rather than silent.

## Verify Steps

1. Load config containing an expected CLI version newer than the active binary. Expected: diagnostics detect the mismatch and report the expected/current versions.
2. Run `agentplane runtime explain` and `agentplane doctor` in mismatch fixtures. Expected: both show a safe recovery path instead of silently mutating global installs.
3. Run targeted config/runtime/doctor tests. Expected: new version-drift behavior passes without regressions in normal workspaces.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

1. Revert the config schema and runtime diagnostic changes.
2. Re-run targeted config/runtime/doctor tests to confirm legacy behavior is restored.

## Findings

- Observation: repositories had no explicit contract for the minimum `agentplane` CLI version, so version drift stayed implicit until commands behaved unexpectedly.
  Impact: contributors on older global installs could enter mixed-state recovery paths without realizing the CLI itself was behind the repository expectation.
  Resolution: added `framework.cli.expected_version` to repo config, wired it through `init` and `upgrade`, and surfaced actionable mismatch diagnostics in `runtime explain` and `doctor`.
  Promotion: tooling
- Observation: automatic global CLI mutation from repo config would create hidden side effects and violate the current safety model for network/global changes.
  Impact: a repository-local setting could silently rewrite a contributor's global toolchain.
  Resolution: kept this task on explicit detection and recovery only; any future auto-update path should remain opt-in and separately approved.
  Promotion: incident-candidate
