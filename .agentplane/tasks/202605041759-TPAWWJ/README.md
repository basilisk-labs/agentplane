---
id: "202605041759-TPAWWJ"
title: "Refresh README demo tape and social assets"
result_summary: "Merged via PR #871."
status: "DONE"
priority: "med"
owner: "DOCS"
revision: 6
origin:
  system: "manual"
depends_on: []
tags:
  - "docs"
verify:
  - "agentplane doctor"
  - "git diff --check"
  - "node .agentplane/policy/check-routing.mjs"
  - "vhs docs/assets/agentplane-demo.tape"
plan_approval:
  state: "approved"
  updated_at: "2026-05-04T17:59:34.575Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-04T18:02:16.677Z"
  updated_by: "DOCS"
  note: "Command: vhs docs/assets/agentplane-demo.tape | Result: pass | Evidence: generated docs/assets/agentplane-demo.gif as 960x540 GIF. Command: git diff --check | Result: pass | Evidence: no whitespace errors. Command: node .agentplane/policy/check-routing.mjs | Result: pass | Evidence: policy routing OK. Command: agentplane doctor | Result: pass | Evidence: doctor OK with only informational runtime handoff entries."
commit:
  hash: "b54285710d7e1321753fe59d8045b3c8298e6ec9"
  message: "Merge pull request #871 from basilisk-labs/task/202605041759-TPAWWJ/readme-demo-assets"
comments:
  -
    author: "DOCS"
    body: "Start: refresh the README demo tape, generated GIF, and visual social/header assets under the approved docs scope."
  -
    author: "INTEGRATOR"
    body: "Verified: PR #871 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
events:
  -
    type: "status"
    at: "2026-05-04T17:59:41.137Z"
    author: "DOCS"
    from: "TODO"
    to: "DOING"
    note: "Start: refresh the README demo tape, generated GIF, and visual social/header assets under the approved docs scope."
  -
    type: "verify"
    at: "2026-05-04T18:02:16.677Z"
    author: "DOCS"
    state: "ok"
    note: "Command: vhs docs/assets/agentplane-demo.tape | Result: pass | Evidence: generated docs/assets/agentplane-demo.gif as 960x540 GIF. Command: git diff --check | Result: pass | Evidence: no whitespace errors. Command: node .agentplane/policy/check-routing.mjs | Result: pass | Evidence: policy routing OK. Command: agentplane doctor | Result: pass | Evidence: doctor OK with only informational runtime handoff entries."
  -
    type: "status"
    at: "2026-05-04T18:07:54.210Z"
    author: "INTEGRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: PR #871 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
doc_version: 3
doc_updated_at: "2026-05-04T18:07:54.214Z"
doc_updated_by: "INTEGRATOR"
description: "Replace the README demo VHS tape/GIF with a working ACR-ready scenario and include refreshed social/header assets."
sections:
  Summary: |-
    Refresh README demo tape and social assets
    
    Replace the README demo VHS tape/GIF with a working ACR-ready scenario and include refreshed social/header assets.
  Scope: |-
    - In scope: Replace the README demo VHS tape/GIF with a working ACR-ready scenario and include refreshed social/header assets.
    - Out of scope: unrelated refactors not required for "Refresh README demo tape and social assets".
  Plan: |-
    1. Replace docs/assets/agentplane-demo.tape with a working VHS scenario that initializes a demo repo, records a task, approves a plan, verifies a focused diff, finishes the task, and checks the generated ACR.
    2. Generate docs/assets/agentplane-demo.gif from that tape and confirm it renders as a 960x540 GIF.
    3. Include the refreshed README/header and social image assets already present in docs/assets.
    4. Run VHS generation, git diff whitespace check, policy routing, and agentplane doctor before commit/push.
  Verify Steps: |-
    1. Review the requested outcome for "Refresh README demo tape and social assets". Expected: the visible result matches ## Summary and stays inside approved scope.
    2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
    3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-04T18:02:16.677Z — VERIFY — ok
    
    By: DOCS
    
    Note: Command: vhs docs/assets/agentplane-demo.tape | Result: pass | Evidence: generated docs/assets/agentplane-demo.gif as 960x540 GIF. Command: git diff --check | Result: pass | Evidence: no whitespace errors. Command: node .agentplane/policy/check-routing.mjs | Result: pass | Evidence: policy routing OK. Command: agentplane doctor | Result: pass | Evidence: doctor OK with only informational runtime handoff entries.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-04T17:59:41.137Z, excerpt_hash=sha256:65f9476f634f9e5eafb5aa5f5b544f03658587683f9760fd8e8144211a82d371
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Refresh README demo tape and social assets

Replace the README demo VHS tape/GIF with a working ACR-ready scenario and include refreshed social/header assets.

## Scope

- In scope: Replace the README demo VHS tape/GIF with a working ACR-ready scenario and include refreshed social/header assets.
- Out of scope: unrelated refactors not required for "Refresh README demo tape and social assets".

## Plan

1. Replace docs/assets/agentplane-demo.tape with a working VHS scenario that initializes a demo repo, records a task, approves a plan, verifies a focused diff, finishes the task, and checks the generated ACR.
2. Generate docs/assets/agentplane-demo.gif from that tape and confirm it renders as a 960x540 GIF.
3. Include the refreshed README/header and social image assets already present in docs/assets.
4. Run VHS generation, git diff whitespace check, policy routing, and agentplane doctor before commit/push.

## Verify Steps

1. Review the requested outcome for "Refresh README demo tape and social assets". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-04T18:02:16.677Z — VERIFY — ok

By: DOCS

Note: Command: vhs docs/assets/agentplane-demo.tape | Result: pass | Evidence: generated docs/assets/agentplane-demo.gif as 960x540 GIF. Command: git diff --check | Result: pass | Evidence: no whitespace errors. Command: node .agentplane/policy/check-routing.mjs | Result: pass | Evidence: policy routing OK. Command: agentplane doctor | Result: pass | Evidence: doctor OK with only informational runtime handoff entries.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-04T17:59:41.137Z, excerpt_hash=sha256:65f9476f634f9e5eafb5aa5f5b544f03658587683f9760fd8e8144211a82d371

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
