---
id: "202605111514-Y22GT0"
title: "Fix git lock guard allowlist drift"
result_summary: "Merged via PR #3582."
status: "DONE"
priority: "med"
owner: "INTEGRATOR"
revision: 1
origin:
  system: "manual"
depends_on: []
tags:
  - "cli"
  - "code"
verify: []
plan_approval:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
verification:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
  attempts: 0
commit:
  hash: "3a765d4aafe4339eae00eccdf8f9ba6729f44298"
  message: "Merge pull request #3582 from basilisk-labs/task/202605111514-Y22GT0/fix-git-lock-guard-allowlist"
comments:
  -
    author: "INTEGRATOR"
    body: "Start: Reconcile git-index-lock allowlist drift for doctor-git-locks files after merge and run targeted verification before branch_pr handoff."
  -
    author: "INTEGRATOR"
    body: "Verified: PR #3582 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
events:
  -
    type: "status"
    at: "2026-05-11T15:15:04.386Z"
    author: "INTEGRATOR"
    from: "TODO"
    to: "DOING"
    note: "Start: Reconcile git-index-lock allowlist drift for doctor-git-locks files after merge and run targeted verification before branch_pr handoff."
  -
    type: "status"
    at: "2026-05-11T15:18:56.630Z"
    author: "INTEGRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: PR #3582 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
doc_version: 3
doc_updated_at: "2026-05-11T15:18:56.637Z"
doc_updated_by: "INTEGRATOR"
description: "Reconcile allowlist in git-index-lock-guard for new doctor-git-locks files"
sections:
  Summary: |-
    Fix git lock guard allowlist drift
    
    Reconcile allowlist in git-index-lock-guard for new doctor-git-locks files
  Scope: |-
    - In scope: Reconcile allowlist in git-index-lock-guard for new doctor-git-locks files.
    - Out of scope: unrelated refactors not required for "Fix git lock guard allowlist drift".
  Plan: "1) Reconcile git-index-lock-guard allowlist against merged code: ensure doctor-git-locks command/spec files are listed as allowed lock touch points. 2) Run targeted and broad checks covering CLI docs, recipes inventory, and index-lock tests. 3) Re-open PR/task lifecycle for branch_pr and mark task DONE."
  Verify Steps: |-
    1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
    3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
