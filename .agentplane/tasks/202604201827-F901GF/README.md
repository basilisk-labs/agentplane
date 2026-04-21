---
id: "202604201827-F901GF"
title: "Add task closure recovery skill"
result_summary: "Added repo-local task closure recovery skill for finish, hosted-close, close-tail, PR metadata, and branch divergence recovery."
status: "DONE"
priority: "med"
owner: "CODER"
revision: 6
origin:
  system: "manual"
depends_on: []
tags:
  - "docs"
  - "skills"
  - "workflow"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-04-20T18:27:51.415Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-04-21T03:45:09.619Z"
  updated_by: "CODER"
  note: "Verified task closure recovery skill content, skills index entry, format check, policy routing, and doctor evidence."
commit:
  hash: "a49495728059f6890988785f20b3eba41a18fbbf"
  message: "📝 7Y2QS2 task: refresh PR artifacts"
comments:
  -
    author: "CODER"
    body: "Start: implementing task closure recovery skill."
  -
    author: "CODER"
    body: "Verified: task closure recovery skill added, indexed, and checked."
events:
  -
    type: "status"
    at: "2026-04-20T18:28:06.920Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: implementing task closure recovery skill."
  -
    type: "verify"
    at: "2026-04-21T03:45:09.619Z"
    author: "CODER"
    state: "ok"
    note: "Verified task closure recovery skill content, skills index entry, format check, policy routing, and doctor evidence."
  -
    type: "status"
    at: "2026-04-21T03:48:25.137Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: task closure recovery skill added, indexed, and checked."
doc_version: 3
doc_updated_at: "2026-04-21T03:48:25.137Z"
doc_updated_by: "CODER"
description: "Add a repo-local skill for diagnosing and recovering direct finish, hosted-close, close-tail, PR metadata, dirty artifact, and remote divergence task closure failures."
sections:
  Summary: |-
    Add task closure recovery skill
    
    Add a repo-local skill for diagnosing and recovering direct finish, hosted-close, close-tail, PR metadata, dirty artifact, and remote divergence task closure failures.
  Scope: |-
    - In scope: Add a repo-local skill for diagnosing and recovering direct finish, hosted-close, close-tail, PR metadata, dirty artifact, and remote divergence task closure failures.
    - Out of scope: unrelated refactors not required for "Add task closure recovery skill".
  Plan: |-
    Plan:
    1. Add a repo-local task closure recovery skill under skills/ with frontmatter metadata and recovery workflows for direct finish, hosted-close, close-tail, PR metadata, dirty artifacts, and branch divergence.
    2. Update the skills index so the skill is discoverable by humans and prompt discovery.
    3. Verify with formatting, policy checks, and doctor.
  Verify Steps: |-
    1. Review the requested outcome for "Add task closure recovery skill". Expected: the visible result matches ## Summary and stays inside approved scope.
    2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
    3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-21T03:45:09.619Z — VERIFY — ok
    
    By: CODER
    
    Note: Verified task closure recovery skill content, skills index entry, format check, policy routing, and doctor evidence.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-20T18:28:06.946Z, excerpt_hash=sha256:9851991ee2f5efd32d0483900123d45bb965fe0ec67b748d726e07ccb703571a
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    - Observation: Added skills/agentplane-task-closure-recovery/SKILL.md and indexed it in skills/README.md.
      Impact: Agents get targeted recovery guidance for finish/hosted-close/close-tail/PR divergence failures.
      Resolution: Checks passed: bun run format:check; node .agentplane/policy/check-routing.mjs; agentplane doctor.
      Promotion: incident-candidate
      Fixability: external
id_source: "generated"
---
## Summary

Add task closure recovery skill

Add a repo-local skill for diagnosing and recovering direct finish, hosted-close, close-tail, PR metadata, dirty artifact, and remote divergence task closure failures.

## Scope

- In scope: Add a repo-local skill for diagnosing and recovering direct finish, hosted-close, close-tail, PR metadata, dirty artifact, and remote divergence task closure failures.
- Out of scope: unrelated refactors not required for "Add task closure recovery skill".

## Plan

Plan:
1. Add a repo-local task closure recovery skill under skills/ with frontmatter metadata and recovery workflows for direct finish, hosted-close, close-tail, PR metadata, dirty artifacts, and branch divergence.
2. Update the skills index so the skill is discoverable by humans and prompt discovery.
3. Verify with formatting, policy checks, and doctor.

## Verify Steps

1. Review the requested outcome for "Add task closure recovery skill". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-21T03:45:09.619Z — VERIFY — ok

By: CODER

Note: Verified task closure recovery skill content, skills index entry, format check, policy routing, and doctor evidence.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-20T18:28:06.946Z, excerpt_hash=sha256:9851991ee2f5efd32d0483900123d45bb965fe0ec67b748d726e07ccb703571a

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- Observation: Added skills/agentplane-task-closure-recovery/SKILL.md and indexed it in skills/README.md.
  Impact: Agents get targeted recovery guidance for finish/hosted-close/close-tail/PR divergence failures.
  Resolution: Checks passed: bun run format:check; node .agentplane/policy/check-routing.mjs; agentplane doctor.
  Promotion: incident-candidate
  Fixability: external
