---
id: "202605221745-8BHZSX"
title: "Route quickstart and role guidance to agent context surfaces"
result_summary: "Closed as duplicate of 202605230332-RYW28Y; closure metadata repaired for doctor."
risk_level: "low"
breaking: false
status: "DONE"
priority: "med"
owner: "DOCS"
revision: 6
origin:
  system: "manual"
depends_on:
  - "202605221744-GF25D1"
  - "202605221744-XBKXEW"
tags:
  - "cli"
  - "docs"
  - "workflow"
task_kind: "docs"
mutation_scope: "docs"
blueprint_request: "docs.change"
verify:
  - "Confirm guidance points to active work and task brief surfaces without removing command-specific recovery paths."
  - "Regenerate CLI docs if generated reference output changes."
  - "Run command-guide or help snapshot tests covering quickstart and role guidance."
plan_approval:
  state: "approved"
  updated_at: "2026-05-22T17:45:49.015Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
  attempts: 0
quality_review:
  state: "pass"
  updated_at: "2026-06-05T00:59:46.535Z"
  updated_by: "EVALUATOR"
  note: "Duplicate closure metadata repair is traceable."
  evaluated_sha: "ee7ffc9dc935fcba1c2a64fc9ec6579d40efd971"
  blueprint_digest: "ad1ae99b9b46491829333085473747661dd2c5c37b9e27bc8ab4949265a3f4f0"
  evidence_refs:
    - ".agentplane/tasks/202605221745-8BHZSX/README.md"
    - ".agentplane/tasks/202605221745-8BHZSX/quality/20260605-005946535-recovery-context/quality-report.json"
    - ".agentplane/tasks/202605221745-8BHZSX/quality/20260605-005946535-recovery-context/evaluator-prompt.md"
    - ".agentplane/tasks/202605221745-8BHZSX/quality/20260605-005946535-recovery-context/evaluator-opinion.md"
    - ".agentplane/tasks/202605221745-8BHZSX/blueprint/resolved-snapshot.json"
  findings:
    - "Task was already DONE as duplicate of 202605230332-RYW28Y; commit 2426e688f is the task-close merge that updated this task's closure README."
commit:
  hash: "ee7ffc9dc935fcba1c2a64fc9ec6579d40efd971"
  message: "🖼️ 202606042316-XH5D0B docs: add v0.6.17 social assets"
comments:
  -
    author: "ORCHESTRATOR"
    body: |-
      Verified: 202605221745-8BHZSX is a bookkeeping duplicate of 202605230332-RYW28Y (Route agent context guidance through task brief); no code/config changes are expected in this task and closure is recorded as no-op.

      Reason: Covered by RYW28Y, which updated the installed quickstart, role guidance, generated bootstrap docs, and onboarding checks through task active/task brief.
  -
    author: "INTEGRATOR"
    body: "Verified: duplicate closure remains no-op; recording evaluator-matched base implementation commit metadata to satisfy lifecycle traceability."
events:
  -
    type: "status"
    at: "2026-05-23T03:43:25.161Z"
    author: "ORCHESTRATOR"
    from: "TODO"
    to: "DONE"
    note: |-
      Verified: 202605221745-8BHZSX is a bookkeeping duplicate of 202605230332-RYW28Y (Route agent context guidance through task brief); no code/config changes are expected in this task and closure is recorded as no-op.

      Reason: Covered by RYW28Y, which updated the installed quickstart, role guidance, generated bootstrap docs, and onboarding checks through task active/task brief.
  -
    type: "status"
    at: "2026-06-05T01:00:44.757Z"
    author: "INTEGRATOR"
    from: "DONE"
    to: "DONE"
    note: "Verified: duplicate closure remains no-op; recording evaluator-matched base implementation commit metadata to satisfy lifecycle traceability."
doc_version: 3
doc_updated_at: "2026-06-05T01:00:44.760Z"
doc_updated_by: "INTEGRATOR"
description: "Update installed quickstart, role supplements, and generated docs guidance to direct agents toward active work and task brief surfaces instead of manual command stitching."
sections:
  Summary: |-
    Route quickstart and role guidance to agent context surfaces

    Update installed quickstart, role supplements, and generated docs guidance to direct agents toward active work and task brief surfaces instead of manual command stitching.
  Scope: |-
    - In scope: Update installed quickstart, role supplements, and generated docs guidance to direct agents toward active work and task brief surfaces instead of manual command stitching.
    - Out of scope: unrelated refactors not required for "Route quickstart and role guidance to agent context surfaces".
  Plan: "After the active work and task brief surfaces exist, update quickstart, role supplements, and generated user docs so agents start from those context-rich commands rather than manually combining task list, status, work resume, verify-show, and docs lookup."
  Verify Steps: |-
    PLANNER fallback scaffold for "Route quickstart and role guidance to agent context surfaces". Replace with task-specific acceptance checks when PLANNER context is available.

    1. Review the requested outcome for "Route quickstart and role guidance to agent context surfaces". Expected: the visible result matches ## Summary and stays inside approved scope.
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

Route quickstart and role guidance to agent context surfaces

Update installed quickstart, role supplements, and generated docs guidance to direct agents toward active work and task brief surfaces instead of manual command stitching.

## Scope

- In scope: Update installed quickstart, role supplements, and generated docs guidance to direct agents toward active work and task brief surfaces instead of manual command stitching.
- Out of scope: unrelated refactors not required for "Route quickstart and role guidance to agent context surfaces".

## Plan

After the active work and task brief surfaces exist, update quickstart, role supplements, and generated user docs so agents start from those context-rich commands rather than manually combining task list, status, work resume, verify-show, and docs lookup.

## Verify Steps

PLANNER fallback scaffold for "Route quickstart and role guidance to agent context surfaces". Replace with task-specific acceptance checks when PLANNER context is available.

1. Review the requested outcome for "Route quickstart and role guidance to agent context surfaces". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
