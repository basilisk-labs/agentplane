---
id: "202605012054-HS993A"
title: "Fix publish evidence GH auth"
result_summary: "Merged via PR #734."
status: "DONE"
priority: "high"
owner: "CODER"
revision: 6
origin:
  system: "manual"
depends_on: []
tags:
  - "ci"
  - "release"
  - "workflow"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-01T20:54:31.301Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-01T20:55:55.110Z"
  updated_by: "CODER"
  note: "Passed publish workflow contract test, workflow command contract, lint, routing, diff check, and doctor."
commit:
  hash: "c329da9be70f46f70224d6117c44dce1c9f7f008"
  message: "release: Authenticate publish evidence gh steps (HS993A)"
comments:
  -
    author: "CODER"
    body: "Start: fix publish workflow release evidence gh authentication after successful publication."
  -
    author: "INTEGRATOR"
    body: "Verified: PR #734 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
events:
  -
    type: "status"
    at: "2026-05-01T20:54:39.411Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: fix publish workflow release evidence gh authentication after successful publication."
  -
    type: "verify"
    at: "2026-05-01T20:55:55.110Z"
    author: "CODER"
    state: "ok"
    note: "Passed publish workflow contract test, workflow command contract, lint, routing, diff check, and doctor."
  -
    type: "status"
    at: "2026-05-01T21:00:23.947Z"
    author: "INTEGRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: PR #734 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
doc_version: 3
doc_updated_at: "2026-05-01T21:00:23.953Z"
doc_updated_by: "INTEGRATOR"
description: "Make post-publish release evidence PR recovery authenticate gh so successful releases do not end as failed after publication."
sections:
  Summary: |-
    Fix publish evidence GH auth
    
    Make post-publish release evidence PR recovery authenticate gh so successful releases do not end as failed after publication.
  Scope: |-
    - In scope: Make post-publish release evidence PR recovery authenticate gh so successful releases do not end as failed after publication.
    - Out of scope: unrelated refactors not required for "Fix publish evidence GH auth".
  Plan: |-
    1. Inspect publish.yml post-publish release evidence steps and existing workflow contract tests.
    2. Add GH_TOKEN/GITHUB_TOKEN env where gh CLI is used after publish-result creation, keeping permissions unchanged.
    3. Add/update workflow contract coverage so the release-evidence PR check cannot run without GH_TOKEN.
    4. Run targeted release workflow contract tests plus routing, lint, and doctor.
    5. Merge through branch_pr and confirm main is clean.
  Verify Steps: |-
    1. Review the requested outcome for "Fix publish evidence GH auth". Expected: the visible result matches ## Summary and stays inside approved scope.
    2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
    3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-01T20:55:55.110Z — VERIFY — ok
    
    By: CODER
    
    Note: Passed publish workflow contract test, workflow command contract, lint, routing, diff check, and doctor.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-01T20:54:39.411Z, excerpt_hash=sha256:ef662bfe322aceba2e940bc301ec5c266414be377482451d3a58f5518603cfdf
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    - Observation: Release evidence gh CLI steps now set GH_TOKEN from github.token.
      Impact: A successful publish run should not fail after release/tag/GHCR creation merely because gh cannot authenticate in the evidence follow-up block.
      Resolution: Added GH_TOKEN env to release evidence PR check/create/merge steps and contract coverage.
      Promotion: incident-candidate
      Fixability: external
id_source: "generated"
---
## Summary

Fix publish evidence GH auth

Make post-publish release evidence PR recovery authenticate gh so successful releases do not end as failed after publication.

## Scope

- In scope: Make post-publish release evidence PR recovery authenticate gh so successful releases do not end as failed after publication.
- Out of scope: unrelated refactors not required for "Fix publish evidence GH auth".

## Plan

1. Inspect publish.yml post-publish release evidence steps and existing workflow contract tests.
2. Add GH_TOKEN/GITHUB_TOKEN env where gh CLI is used after publish-result creation, keeping permissions unchanged.
3. Add/update workflow contract coverage so the release-evidence PR check cannot run without GH_TOKEN.
4. Run targeted release workflow contract tests plus routing, lint, and doctor.
5. Merge through branch_pr and confirm main is clean.

## Verify Steps

1. Review the requested outcome for "Fix publish evidence GH auth". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-01T20:55:55.110Z — VERIFY — ok

By: CODER

Note: Passed publish workflow contract test, workflow command contract, lint, routing, diff check, and doctor.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-01T20:54:39.411Z, excerpt_hash=sha256:ef662bfe322aceba2e940bc301ec5c266414be377482451d3a58f5518603cfdf

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- Observation: Release evidence gh CLI steps now set GH_TOKEN from github.token.
  Impact: A successful publish run should not fail after release/tag/GHCR creation merely because gh cannot authenticate in the evidence follow-up block.
  Resolution: Added GH_TOKEN env to release evidence PR check/create/merge steps and contract coverage.
  Promotion: incident-candidate
  Fixability: external
