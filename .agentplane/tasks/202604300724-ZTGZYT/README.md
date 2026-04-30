---
id: "202604300724-ZTGZYT"
title: "Restore release agent and policy parity"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 4
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
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
commit: null
comments:
  -
    author: "CODER"
    body: "Start: reproduce agents:check drift, apply canonical sync only if needed, and verify release parity gates."
events:
  -
    type: "status"
    at: "2026-04-30T07:28:07.835Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: reproduce agents:check drift, apply canonical sync only if needed, and verify release parity gates."
doc_version: 3
doc_updated_at: "2026-04-30T07:28:07.835Z"
doc_updated_by: "CODER"
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
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
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
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
