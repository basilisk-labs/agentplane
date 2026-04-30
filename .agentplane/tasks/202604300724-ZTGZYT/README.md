---
id: "202604300724-ZTGZYT"
title: "Restore release agent and policy parity"
result_summary: "Merged via PR #597."
status: "DONE"
priority: "high"
owner: "CODER"
revision: 8
origin:
  system: "manual"
depends_on: []
tags:
  - "agents"
  - "policy"
  - "release"
verify:
  - "agentplane doctor"
  - "bun run agents:check"
  - "bun run framework:dev:bootstrap"
  - "bun run policy:routing:check"
  - "git diff --check"
plan_approval:
  state: "approved"
  updated_at: "2026-04-30T07:26:29.024Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-04-30T07:31:27.475Z"
  updated_by: "CODER"
  note: "Verified: current clean HEAD is ready for PR publication after sync and verification metadata refresh."
commit:
  hash: "ac0e1ff930edc7707d7f70677415f117cd7e234e"
  message: "Merge pull request #597 from basilisk-labs/task/202604300724-ZTGZYT/release-parity-sync"
comments:
  -
    author: "CODER"
    body: "Start: reproduce agents:check drift, apply canonical sync only if needed, and verify release parity gates."
  -
    author: "INTEGRATOR"
    body: "Verified: PR #597 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
events:
  -
    type: "status"
    at: "2026-04-30T07:28:07.835Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: reproduce agents:check drift, apply canonical sync only if needed, and verify release parity gates."
  -
    type: "verify"
    at: "2026-04-30T07:30:17.103Z"
    author: "CODER"
    state: "ok"
    note: "Verified: release agent/policy mirrors are synchronized with canonical prompt assets; agents check, policy routing, diff check, framework bootstrap, and doctor passed."
  -
    type: "verify"
    at: "2026-04-30T07:30:45.957Z"
    author: "CODER"
    state: "ok"
    note: "Verified: current branch HEAD contains synced agent/policy mirrors and task graph artifacts; agents check, policy routing, diff check, framework bootstrap, and doctor passed."
  -
    type: "verify"
    at: "2026-04-30T07:31:27.475Z"
    author: "CODER"
    state: "ok"
    note: "Verified: current clean HEAD is ready for PR publication after sync and verification metadata refresh."
  -
    type: "status"
    at: "2026-04-30T07:34:38.279Z"
    author: "INTEGRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: PR #597 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
doc_version: 3
doc_updated_at: "2026-04-30T07:34:38.286Z"
doc_updated_by: "INTEGRATOR"
description: "Make release hygiene pass by reconciling generated project agent and policy mirrors with canonical framework prompt assets after the fragmented prompt migration. Scope is limited to sync output and any minimal follow-up needed for agents:check."
sections:
  Summary: |-
    Restore release agent and policy parity
    
    Make release hygiene pass by reconciling generated project agent and policy mirrors with canonical framework prompt assets after the fragmented prompt migration. Scope is limited to sync output and any minimal follow-up needed for agents:check.
  Scope: |-
    - In scope: Make release hygiene pass by reconciling generated project agent and policy mirrors with canonical framework prompt assets after the fragmented prompt migration. Scope is limited to sync output and any minimal follow-up needed for agents:check.
    - Out of scope: unrelated refactors not required for "Restore release agent and policy parity".
  Plan: |-
    1. Reproduce the current release parity failure with bun run agents:check.
    2. Run the canonical sync path only if it changes the generated project agent/policy mirrors needed for parity.
    3. Review generated diffs to ensure they are sync output, not unrelated policy edits.
    4. Verify agents:check, policy:routing:check, git diff --check, framework:dev:bootstrap, and doctor.
    5. Publish through branch_pr and close after hosted merge.
  Verify Steps: |-
    1. Review the requested outcome for "Restore release agent and policy parity". Expected: the visible result matches ## Summary and stays inside approved scope.
    2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
    3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-30T07:30:17.103Z — VERIFY — ok
    
    By: CODER
    
    Note: Verified: release agent/policy mirrors are synchronized with canonical prompt assets; agents check, policy routing, diff check, framework bootstrap, and doctor passed.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-30T07:28:07.835Z, excerpt_hash=sha256:b195c0f501b773a1b83129ce78989062063fc361e1cc8da0a841932193abe0ef
    
    ### 2026-04-30T07:30:45.957Z — VERIFY — ok
    
    By: CODER
    
    Note: Verified: current branch HEAD contains synced agent/policy mirrors and task graph artifacts; agents check, policy routing, diff check, framework bootstrap, and doctor passed.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-30T07:30:17.120Z, excerpt_hash=sha256:b195c0f501b773a1b83129ce78989062063fc361e1cc8da0a841932193abe0ef
    
    ### 2026-04-30T07:31:27.475Z — VERIFY — ok
    
    By: CODER
    
    Note: Verified: current clean HEAD is ready for PR publication after sync and verification metadata refresh.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-30T07:30:45.963Z, excerpt_hash=sha256:b195c0f501b773a1b83129ce78989062063fc361e1cc8da0a841932193abe0ef
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    - Observation: bun run agents:check initially failed because target .agentplane agent and policy mirrors lagged the canonical fragmented prompt assets.
      Impact: release:ci-check was blocked before publishing because agents:check failed.
      Resolution: Ran bun run agents:sync and verified the generated mirror output.
      Promotion: incident-candidate
      Fixability: external
    
    - Observation: Current HEAD includes the verified sync output and refreshed task artifacts.
      Impact: This clears the release agents:check blocker for the next tasks.
      Resolution: Recorded final verification for HEAD after task artifact refresh.
      Promotion: incident-candidate
      Fixability: external
    
    - Observation: Final branch HEAD carries generated mirror sync, task graph records, and verification metadata.
      Impact: Downstream release-readiness tasks can depend on this PR once merged.
      Resolution: Final verification recorded after metadata commit.
      Promotion: incident-candidate
      Fixability: external
id_source: "generated"
---
## Summary

Restore release agent and policy parity

Make release hygiene pass by reconciling generated project agent and policy mirrors with canonical framework prompt assets after the fragmented prompt migration. Scope is limited to sync output and any minimal follow-up needed for agents:check.

## Scope

- In scope: Make release hygiene pass by reconciling generated project agent and policy mirrors with canonical framework prompt assets after the fragmented prompt migration. Scope is limited to sync output and any minimal follow-up needed for agents:check.
- Out of scope: unrelated refactors not required for "Restore release agent and policy parity".

## Plan

1. Reproduce the current release parity failure with bun run agents:check.
2. Run the canonical sync path only if it changes the generated project agent/policy mirrors needed for parity.
3. Review generated diffs to ensure they are sync output, not unrelated policy edits.
4. Verify agents:check, policy:routing:check, git diff --check, framework:dev:bootstrap, and doctor.
5. Publish through branch_pr and close after hosted merge.

## Verify Steps

1. Review the requested outcome for "Restore release agent and policy parity". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-30T07:30:17.103Z — VERIFY — ok

By: CODER

Note: Verified: release agent/policy mirrors are synchronized with canonical prompt assets; agents check, policy routing, diff check, framework bootstrap, and doctor passed.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-30T07:28:07.835Z, excerpt_hash=sha256:b195c0f501b773a1b83129ce78989062063fc361e1cc8da0a841932193abe0ef

### 2026-04-30T07:30:45.957Z — VERIFY — ok

By: CODER

Note: Verified: current branch HEAD contains synced agent/policy mirrors and task graph artifacts; agents check, policy routing, diff check, framework bootstrap, and doctor passed.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-30T07:30:17.120Z, excerpt_hash=sha256:b195c0f501b773a1b83129ce78989062063fc361e1cc8da0a841932193abe0ef

### 2026-04-30T07:31:27.475Z — VERIFY — ok

By: CODER

Note: Verified: current clean HEAD is ready for PR publication after sync and verification metadata refresh.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-30T07:30:45.963Z, excerpt_hash=sha256:b195c0f501b773a1b83129ce78989062063fc361e1cc8da0a841932193abe0ef

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- Observation: bun run agents:check initially failed because target .agentplane agent and policy mirrors lagged the canonical fragmented prompt assets.
  Impact: release:ci-check was blocked before publishing because agents:check failed.
  Resolution: Ran bun run agents:sync and verified the generated mirror output.
  Promotion: incident-candidate
  Fixability: external

- Observation: Current HEAD includes the verified sync output and refreshed task artifacts.
  Impact: This clears the release agents:check blocker for the next tasks.
  Resolution: Recorded final verification for HEAD after task artifact refresh.
  Promotion: incident-candidate
  Fixability: external

- Observation: Final branch HEAD carries generated mirror sync, task graph records, and verification metadata.
  Impact: Downstream release-readiness tasks can depend on this PR once merged.
  Resolution: Final verification recorded after metadata commit.
  Promotion: incident-candidate
  Fixability: external
