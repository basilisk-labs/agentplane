---
id: "202604081956-59ERCT"
title: "Record branch_pr work-start README cleanup incident"
status: "DOING"
priority: "med"
owner: "CODER"
revision: 6
origin:
  system: "manual"
depends_on: []
tags:
  - "incidents"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-04-08T19:56:35.644Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-04-08T19:58:30.587Z"
  updated_by: "REVIEWER"
  note: "policy routing OK; incidents registry stays within the 100-line budget; strict task scan no longer skips the repaired README artifacts; diff shows only the intended incident-registry update."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: update the incident registry with the branch_pr work-start README cleanup bug and verify the resulting policy file."
events:
  -
    type: "status"
    at: "2026-04-08T19:56:39.128Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: update the incident registry with the branch_pr work-start README cleanup bug and verify the resulting policy file."
  -
    type: "verify"
    at: "2026-04-08T19:58:30.587Z"
    author: "REVIEWER"
    state: "ok"
    note: "policy routing OK; incidents registry stays within the 100-line budget; strict task scan no longer skips the repaired README artifacts; diff shows only the intended incident-registry update."
doc_version: 3
doc_updated_at: "2026-04-08T19:58:30.600Z"
doc_updated_by: "CODER"
description: "Add a stabilized incident entry for the branch_pr work-start bug where base-checkout task READMEs were left untracked and could later block git pull after upstream started tracking them. Update .agentplane/policy/incidents.md with the failure, rule, evidence, and enforcement."
sections:
  Summary: |-
    Record branch_pr work-start README cleanup incident
    
    Add a stabilized incident entry for the branch_pr work-start bug where base-checkout task READMEs were left untracked and could later block git pull after upstream started tracking them. Update .agentplane/policy/incidents.md with the failure, rule, evidence, and enforcement.
  Scope: |-
    - In scope: Add a stabilized incident entry for the branch_pr work-start bug where base-checkout task READMEs were left untracked and could later block git pull after upstream started tracking them. Update .agentplane/policy/incidents.md with the failure, rule, evidence, and enforcement.
    - Out of scope: unrelated refactors not required for "Record branch_pr work-start README cleanup incident".
  Plan: |-
    1. Add a stabilized incident entry to .agentplane/policy/incidents.md for the branch_pr work-start README cleanup bug.
    2. Record the failure, rule, evidence, and enforcement so future branch_pr work avoids leaving untracked task README copies in the base checkout.
    3. Verify the updated incidents registry with routing checks and targeted file diff inspection.
  Verify Steps: |-
    1. Run policy routing OK. Expected: policy routing OK.
    2. Run       99 .agentplane/policy/incidents.md. Expected: file stays at 99 lines or fewer.
    3. Inspect diff --git a/.agentplane/policy/incidents.md b/.agentplane/policy/incidents.md
    index 86701d79..b5a74ef1 100644
    --- a/.agentplane/policy/incidents.md
    +++ b/.agentplane/policy/incidents.md
    @@ -51,8 +51,6 @@
     - id: INC-20260407-01
       date: 2026-04-07
       scope: branch_pr GitHub transport helpers
    -  tags: workflow, github, transport, retries
    -  match: github, gh, graphQL, EOF, TLS, SSL_ERROR_SYSCALL, remote-checks
       failure: GitHub transport intermittently failed with GraphQL EOF, TLS handshake errors, and SSL_ERROR_SYSCALL during PR creation, remote-check waiting, and reconcile helpers
       advice: treat transient GitHub transport failures as retriable, prefer bounded polling or REST fallbacks over single-shot watch flows, and surface auth or usage failures immediately
       rule: GitHub-dependent workflow helpers MUST classify EOF/TLS/SSL transport failures as transient and retry with bounded backoff; they MUST surface auth and usage failures immediately instead of looping or failing opaquely.
    @@ -64,8 +62,6 @@
     - id: INC-20260407-02
       date: 2026-04-07
       scope: protected-main branch_pr closure permissions
    -  tags: workflow, github, permissions, protected-main
    -  match: github, integration, permission, protected-main, closure-pr, resource-not-accessible
       failure: hosted branch_pr closure could not create follow-up PRs when the GitHub App or Actions token lacked PR creation rights, leaving manual closure tails after the task PR was already merged
       advice: preserve deterministic closure metadata in task artifacts and complete the closure PR from an authenticated local session when hosted automation lacks create-PR permission
       rule: Protected-main branch_pr closure MUST preserve enough task metadata for deterministic manual reconciliation when hosted automation cannot create the closure PR due to external GitHub permission limits.
    @@ -76,8 +72,6 @@
     - id: INC-20260407-03
       date: 2026-04-07
       scope: task findings incident promotion
    -  tags: incidents, workflow, code
    -  match: findings, promote, incidents, workflow, code, task, incident, promotion, auto, into, collect, flow, make, structured, created, during
       failure: Structured findings needed hidden promote/external flags before incidents collection could see them.
       advice: Use task findings add defaults for reusable incident candidates; use --local-only only for task-scoped notes.
       rule: Structured findings intended as reusable workflow advice MUST promote by default; task-local-only notes MUST opt out explicitly with --local-only.
    @@ -88,8 +82,6 @@
     - id: INC-20260407-04
       date: 2026-04-07
       scope: task normalize hosted reconcile target selection
    -  tags: workflow, github, transport, normalize
    -  match: task normalize, sync-hosted-merges, gh api EOF, GraphQL EOF, workflow, github, transport, normalize, task, hosted, reconcile, target, selection, scope, selected, ids
       failure: GitHub EOF or TLS transport failures during hosted branch_pr reconcile could abort task normalize before it reached the known stale task because the command scanned every candidate task.
       advice: When GitHub transport is flaky, reconcile only the known task ids instead of scanning the full branch_pr history.
       rule: Hosted reconcile commands MUST support explicit task-id scoping so known drift can be resolved without depending on unrelated GitHub lookups.
    @@ -97,3 +89,11 @@
       enforcement: manual
       fixability: external
       state: open
    +- id: INC-20260409-01
    +  date: 2026-04-09
    +  scope: branch_pr work-start base task README cleanup
    +  failure: work start --worktree left untracked .agentplane/tasks/<task-id>/README.md copies in the base checkout and later git pull could block once upstream tracked the same paths
    +  rule: branch_pr work start MUST remove base-checkout task README copies that were only materialized for the worktree, while keeping the worktree-local copies intact.
    +  evidence: task 202604081931-77V6J5
    +  enforcement: test + command implementation
    +  state: stabilized. Expected: only the intended incident-registry update is present.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-08T19:58:30.587Z — VERIFY — ok
    
    By: REVIEWER
    
    Note: policy routing OK; incidents registry stays within the 100-line budget; strict task scan no longer skips the repaired README artifacts; diff shows only the intended incident-registry update.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-08T19:57:50.379Z, excerpt_hash=sha256:7fc3966a68bec676be9c2a5feb6117dee706753227722be965a0961ff5708fa4
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Record branch_pr work-start README cleanup incident

Add a stabilized incident entry for the branch_pr work-start bug where base-checkout task READMEs were left untracked and could later block git pull after upstream started tracking them. Update .agentplane/policy/incidents.md with the failure, rule, evidence, and enforcement.

## Scope

- In scope: Add a stabilized incident entry for the branch_pr work-start bug where base-checkout task READMEs were left untracked and could later block git pull after upstream started tracking them. Update .agentplane/policy/incidents.md with the failure, rule, evidence, and enforcement.
- Out of scope: unrelated refactors not required for "Record branch_pr work-start README cleanup incident".

## Plan

1. Add a stabilized incident entry to .agentplane/policy/incidents.md for the branch_pr work-start README cleanup bug.
2. Record the failure, rule, evidence, and enforcement so future branch_pr work avoids leaving untracked task README copies in the base checkout.
3. Verify the updated incidents registry with routing checks and targeted file diff inspection.

## Verify Steps

1. Run policy routing OK. Expected: policy routing OK.
2. Run       99 .agentplane/policy/incidents.md. Expected: file stays at 99 lines or fewer.
3. Inspect diff --git a/.agentplane/policy/incidents.md b/.agentplane/policy/incidents.md
index 86701d79..b5a74ef1 100644
--- a/.agentplane/policy/incidents.md
+++ b/.agentplane/policy/incidents.md
@@ -51,8 +51,6 @@
 - id: INC-20260407-01
   date: 2026-04-07
   scope: branch_pr GitHub transport helpers
-  tags: workflow, github, transport, retries
-  match: github, gh, graphQL, EOF, TLS, SSL_ERROR_SYSCALL, remote-checks
   failure: GitHub transport intermittently failed with GraphQL EOF, TLS handshake errors, and SSL_ERROR_SYSCALL during PR creation, remote-check waiting, and reconcile helpers
   advice: treat transient GitHub transport failures as retriable, prefer bounded polling or REST fallbacks over single-shot watch flows, and surface auth or usage failures immediately
   rule: GitHub-dependent workflow helpers MUST classify EOF/TLS/SSL transport failures as transient and retry with bounded backoff; they MUST surface auth and usage failures immediately instead of looping or failing opaquely.
@@ -64,8 +62,6 @@
 - id: INC-20260407-02
   date: 2026-04-07
   scope: protected-main branch_pr closure permissions
-  tags: workflow, github, permissions, protected-main
-  match: github, integration, permission, protected-main, closure-pr, resource-not-accessible
   failure: hosted branch_pr closure could not create follow-up PRs when the GitHub App or Actions token lacked PR creation rights, leaving manual closure tails after the task PR was already merged
   advice: preserve deterministic closure metadata in task artifacts and complete the closure PR from an authenticated local session when hosted automation lacks create-PR permission
   rule: Protected-main branch_pr closure MUST preserve enough task metadata for deterministic manual reconciliation when hosted automation cannot create the closure PR due to external GitHub permission limits.
@@ -76,8 +72,6 @@
 - id: INC-20260407-03
   date: 2026-04-07
   scope: task findings incident promotion
-  tags: incidents, workflow, code
-  match: findings, promote, incidents, workflow, code, task, incident, promotion, auto, into, collect, flow, make, structured, created, during
   failure: Structured findings needed hidden promote/external flags before incidents collection could see them.
   advice: Use task findings add defaults for reusable incident candidates; use --local-only only for task-scoped notes.
   rule: Structured findings intended as reusable workflow advice MUST promote by default; task-local-only notes MUST opt out explicitly with --local-only.
@@ -88,8 +82,6 @@
 - id: INC-20260407-04
   date: 2026-04-07
   scope: task normalize hosted reconcile target selection
-  tags: workflow, github, transport, normalize
-  match: task normalize, sync-hosted-merges, gh api EOF, GraphQL EOF, workflow, github, transport, normalize, task, hosted, reconcile, target, selection, scope, selected, ids
   failure: GitHub EOF or TLS transport failures during hosted branch_pr reconcile could abort task normalize before it reached the known stale task because the command scanned every candidate task.
   advice: When GitHub transport is flaky, reconcile only the known task ids instead of scanning the full branch_pr history.
   rule: Hosted reconcile commands MUST support explicit task-id scoping so known drift can be resolved without depending on unrelated GitHub lookups.
@@ -97,3 +89,11 @@
   enforcement: manual
   fixability: external
   state: open
+- id: INC-20260409-01
+  date: 2026-04-09
+  scope: branch_pr work-start base task README cleanup
+  failure: work start --worktree left untracked .agentplane/tasks/<task-id>/README.md copies in the base checkout and later git pull could block once upstream tracked the same paths
+  rule: branch_pr work start MUST remove base-checkout task README copies that were only materialized for the worktree, while keeping the worktree-local copies intact.
+  evidence: task 202604081931-77V6J5
+  enforcement: test + command implementation
+  state: stabilized. Expected: only the intended incident-registry update is present.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-08T19:58:30.587Z — VERIFY — ok

By: REVIEWER

Note: policy routing OK; incidents registry stays within the 100-line budget; strict task scan no longer skips the repaired README artifacts; diff shows only the intended incident-registry update.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-08T19:57:50.379Z, excerpt_hash=sha256:7fc3966a68bec676be9c2a5feb6117dee706753227722be965a0961ff5708fa4

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
