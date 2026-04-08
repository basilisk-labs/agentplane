---
id: "202604080136-AEDVG6"
title: "Fail fast when editing policy mirrors instead of canonical assets"
result_summary: "integrate: squash task/202604080136-AEDVG6/policy-canonical-guard"
status: "DONE"
priority: "med"
owner: "CODER"
revision: 5
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "policy"
  - "workflow"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-04-08T04:11:29.446Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
commit:
  hash: "6524ce06d4178386a0f478a42ad59190adcdb8ec"
  message: "📝 AEDVG6 task: sync GitHub PR metadata"
comments:
  -
    author: "INTEGRATOR"
    body: "Verified: Integrated via squash; verify=skipped(no commands); pr=.agentplane/tasks/202604080136-AEDVG6/pr."
events:
  -
    type: "status"
    at: "2026-04-08T17:57:55.957Z"
    author: "INTEGRATOR"
    from: "TODO"
    to: "DONE"
    note: "Verified: Integrated via squash; verify=skipped(no commands); pr=.agentplane/tasks/202604080136-AEDVG6/pr."
doc_version: 3
doc_updated_at: "2026-04-08T17:57:55.962Z"
doc_updated_by: "INTEGRATOR"
description: "Policy mirror drift is currently caught late in agents:check and pre-push. Add an earlier deterministic guard so operators editing .agentplane/policy paths get immediate feedback about packages/agentplane/assets/policy as the canonical source."
sections:
  Summary: |-
    Fail fast when editing policy mirrors instead of canonical assets
    
    Policy mirror drift is currently caught late in agents:check and pre-push. Add an earlier deterministic guard so operators editing .agentplane/policy paths get immediate feedback about packages/agentplane/assets/policy as the canonical source.
  Scope: |-
    - In scope: Policy mirror drift is currently caught late in agents:check and pre-push. Add an earlier deterministic guard so operators editing .agentplane/policy paths get immediate feedback about packages/agentplane/assets/policy as the canonical source.
    - Out of scope: unrelated refactors not required for "Fail fast when editing policy mirrors instead of canonical assets".
  Plan: |-
    1. Trace where policy mirror drift is currently detected and choose the earliest safe guard surface.
    2. Add a deterministic fast-fail diagnostic pointing to packages/agentplane/assets/policy as the canonical source.
    3. Add regression tests and verify the new guard path.
  Verify Steps: |-
    1. Editing only .agentplane/policy mirrors should fail fast with a canonical-assets diagnostic before expensive pre-push checks.
    2. Add regression coverage for the early guard path.
    3. Run the targeted guard test suite.
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

Fail fast when editing policy mirrors instead of canonical assets

Policy mirror drift is currently caught late in agents:check and pre-push. Add an earlier deterministic guard so operators editing .agentplane/policy paths get immediate feedback about packages/agentplane/assets/policy as the canonical source.

## Scope

- In scope: Policy mirror drift is currently caught late in agents:check and pre-push. Add an earlier deterministic guard so operators editing .agentplane/policy paths get immediate feedback about packages/agentplane/assets/policy as the canonical source.
- Out of scope: unrelated refactors not required for "Fail fast when editing policy mirrors instead of canonical assets".

## Plan

1. Trace where policy mirror drift is currently detected and choose the earliest safe guard surface.
2. Add a deterministic fast-fail diagnostic pointing to packages/agentplane/assets/policy as the canonical source.
3. Add regression tests and verify the new guard path.

## Verify Steps

1. Editing only .agentplane/policy mirrors should fail fast with a canonical-assets diagnostic before expensive pre-push checks.
2. Add regression coverage for the early guard path.
3. Run the targeted guard test suite.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
