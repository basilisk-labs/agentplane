---
id: "202604091841-2ZX1MQ"
title: "Fix normalize GitHub auth propagation without manual GH_TOKEN export"
result_summary: "Merged via PR #214."
status: "DONE"
priority: "high"
owner: "CODER"
revision: 7
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "github"
  - "workflow"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-04-09T18:41:50.125Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-04-09T18:49:20.388Z"
  updated_by: "CODER"
  note: "Verified that normalize and hosted merge sync no longer let repo dotenv GitHub tokens shadow a valid gh login, with targeted normalize and hosted-merge-sync regressions plus eslint."
commit:
  hash: "3f71884dad3ea379707edd5d1c1e7b27a5f60320"
  message: "🧩 2ZX1MQ integrate: github/workflow: Fix normalize GitHub auth propagation without manual GH_TOKEN export"
comments:
  -
    author: "CODER"
    body: "Start: remove the manual GH_TOKEN requirement from normalize and hosted-merge reconcile so GitHub lookups work from an already logged-in gh session."
  -
    author: "INTEGRATOR"
    body: "Verified: targeted normalize and hosted-merge regressions, eslint, and hosted required checks for PR #214 passed before base integration."
events:
  -
    type: "status"
    at: "2026-04-09T18:42:01.455Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: remove the manual GH_TOKEN requirement from normalize and hosted-merge reconcile so GitHub lookups work from an already logged-in gh session."
  -
    type: "verify"
    at: "2026-04-09T18:49:20.388Z"
    author: "CODER"
    state: "ok"
    note: "Verified that normalize and hosted merge sync no longer let repo dotenv GitHub tokens shadow a valid gh login, with targeted normalize and hosted-merge-sync regressions plus eslint."
  -
    type: "status"
    at: "2026-04-09T19:42:39.895Z"
    author: "INTEGRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: targeted normalize and hosted-merge regressions, eslint, and hosted required checks for PR #214 passed before base integration."
doc_version: 3
doc_updated_at: "2026-04-09T19:42:39.895Z"
doc_updated_by: "INTEGRATOR"
description: "Make branch_pr hosted-merge reconcile and task normalize resolve GitHub auth from the user's existing gh login, without requiring a manual GH_TOKEN export in the shell."
sections:
  Summary: |-
    Fix normalize GitHub auth propagation without manual GH_TOKEN export
    
    Make branch_pr hosted-merge reconcile and task normalize resolve GitHub auth from the user's existing gh login, without requiring a manual GH_TOKEN export in the shell.
  Scope: |-
    - In scope: Make branch_pr hosted-merge reconcile and task normalize resolve GitHub auth from the user's existing gh login, without requiring a manual GH_TOKEN export in the shell.
    - Out of scope: unrelated refactors not required for "Fix normalize GitHub auth propagation without manual GH_TOKEN export".
  Plan: "1. Reproduce the current normalize auth failure without GH_TOKEN and isolate the env propagation path used for gh child processes. 2. Change the GitHub child env or auth resolution so normalize inherits valid gh auth from the logged-in session without reintroducing opaque auth behavior. 3. Add regressions for the authenticated and unauthenticated paths, then verify with targeted tests and lint."
  Verify Steps: |-
    1. In a logged-in shell with no explicit GH_TOKEN export, run the targeted normalize/hosted-merge path or its regression harness. Expected: GitHub lookups succeed without HTTP 401 Bad credentials.
    2. Run the targeted tests covering gh child-process auth propagation and failure classification. Expected: authenticated flows pass; truly unauthenticated flows still fail with an explicit auth error.
    3. Run eslint and the touched task-normalize/hosted-merge-sync regressions. Expected: all touched checks exit 0.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-09T18:49:20.388Z — VERIFY — ok
    
    By: CODER
    
    Note: Verified that normalize and hosted merge sync no longer let repo dotenv GitHub tokens shadow a valid gh login, with targeted normalize and hosted-merge-sync regressions plus eslint.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-09T18:42:01.461Z, excerpt_hash=sha256:7f00d6ff056adb47c71592062d68636adfb8aeff166b1f6c739a13c7d1ceabb5
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    - Observation: Repo dotenv loading could inject GITHUB_TOKEN into gh subprocesses and override a valid gh keyring session during hosted merge sync.
      Impact: task normalize and other branch_pr reconcile helpers could fail with HTTP 401 Bad credentials unless the operator manually exported GH_TOKEN from gh auth token.
      Resolution: Track auth vars loaded only from repo dotenv and strip them from gh child env, while preserving explicit shell or CI auth tokens and HOME-based gh sessions.
      Promotion: incident-candidate
      Fixability: external
id_source: "generated"
---
## Summary

Fix normalize GitHub auth propagation without manual GH_TOKEN export

Make branch_pr hosted-merge reconcile and task normalize resolve GitHub auth from the user's existing gh login, without requiring a manual GH_TOKEN export in the shell.

## Scope

- In scope: Make branch_pr hosted-merge reconcile and task normalize resolve GitHub auth from the user's existing gh login, without requiring a manual GH_TOKEN export in the shell.
- Out of scope: unrelated refactors not required for "Fix normalize GitHub auth propagation without manual GH_TOKEN export".

## Plan

1. Reproduce the current normalize auth failure without GH_TOKEN and isolate the env propagation path used for gh child processes. 2. Change the GitHub child env or auth resolution so normalize inherits valid gh auth from the logged-in session without reintroducing opaque auth behavior. 3. Add regressions for the authenticated and unauthenticated paths, then verify with targeted tests and lint.

## Verify Steps

1. In a logged-in shell with no explicit GH_TOKEN export, run the targeted normalize/hosted-merge path or its regression harness. Expected: GitHub lookups succeed without HTTP 401 Bad credentials.
2. Run the targeted tests covering gh child-process auth propagation and failure classification. Expected: authenticated flows pass; truly unauthenticated flows still fail with an explicit auth error.
3. Run eslint and the touched task-normalize/hosted-merge-sync regressions. Expected: all touched checks exit 0.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-09T18:49:20.388Z — VERIFY — ok

By: CODER

Note: Verified that normalize and hosted merge sync no longer let repo dotenv GitHub tokens shadow a valid gh login, with targeted normalize and hosted-merge-sync regressions plus eslint.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-09T18:42:01.461Z, excerpt_hash=sha256:7f00d6ff056adb47c71592062d68636adfb8aeff166b1f6c739a13c7d1ceabb5

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- Observation: Repo dotenv loading could inject GITHUB_TOKEN into gh subprocesses and override a valid gh keyring session during hosted merge sync.
  Impact: task normalize and other branch_pr reconcile helpers could fail with HTTP 401 Bad credentials unless the operator manually exported GH_TOKEN from gh auth token.
  Resolution: Track auth vars loaded only from repo dotenv and strip them from gh child env, while preserving explicit shell or CI auth tokens and HOME-based gh sessions.
  Promotion: incident-candidate
  Fixability: external
