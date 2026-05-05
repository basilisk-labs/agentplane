---
id: "202605051806-BW1M39"
title: "Document cloud backend integration contract"
result_summary: "Cloud backend integration documentation landed on main via merge commit a7b14d3e."
status: "DONE"
priority: "med"
owner: "DOCS"
revision: 6
origin:
  system: "manual"
depends_on: []
tags:
  - "backend"
  - "cloud"
  - "docs"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-05T18:07:14.624Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-05T18:21:18.788Z"
  updated_by: "CODER"
  note: "Verified: cloud backend user and developer docs now match the implemented init, connect, sync, inspect, and freshness behavior using neutral terminology."
commit:
  hash: "a7b14d3e4fc80ed21ad8bba703f582e716130861"
  message: "🔀 RZ8SA1 integrate: Add cloud backend init contract"
comments:
  -
    author: "CODER"
    body: "Start: Update cloud backend docs in the shared batch worktree after the code contract is implemented, keeping terms neutral and implementation-focused."
  -
    author: "INTEGRATOR"
    body: "Verified: Cloud backend integration documentation merged to main after docs routing, diff check, doctor, and hosted docs checks."
events:
  -
    type: "status"
    at: "2026-05-05T18:07:50.757Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Update cloud backend docs in the shared batch worktree after the code contract is implemented, keeping terms neutral and implementation-focused."
  -
    type: "verify"
    at: "2026-05-05T18:21:18.788Z"
    author: "CODER"
    state: "ok"
    note: "Verified: cloud backend user and developer docs now match the implemented init, connect, sync, inspect, and freshness behavior using neutral terminology."
  -
    type: "status"
    at: "2026-05-05T18:27:20.825Z"
    author: "INTEGRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: Cloud backend integration documentation merged to main after docs routing, diff check, doctor, and hosted docs checks."
doc_version: 3
doc_updated_at: "2026-05-05T18:27:20.827Z"
doc_updated_by: "INTEGRATOR"
description: "Update AgentPlane documentation so local and cloud backend flows describe the init choice, endpoint configuration, GitHub App interaction through the cloud service, sync freshness checks, and current limitations."
sections:
  Summary: |-
    Document cloud backend integration contract
    
    Update AgentPlane documentation so local and cloud backend flows describe the init choice, endpoint configuration, GitHub App interaction through the cloud service, sync freshness checks, and current limitations.
  Scope: |-
    - In scope: Update AgentPlane documentation so local and cloud backend flows describe the init choice, endpoint configuration, GitHub App interaction through the cloud service, sync freshness checks, and current limitations.
    - Out of scope: unrelated refactors not required for "Document cloud backend integration contract".
  Plan: "Epic E4: Cloud backend documentation contract. Scope: update public docs for local versus cloud backend flow, cloud endpoint configuration, GitHub App interaction through the cloud service, and freshness/sync behavior. Verify: docs lint/link checks, agentplane doctor, and policy routing check."
  Verify Steps: |-
    1. Review the requested outcome for "Document cloud backend integration contract". Expected: the visible result matches ## Summary and stays inside approved scope.
    2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
    3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-05T18:21:18.788Z — VERIFY — ok
    
    By: CODER
    
    Note: Verified: cloud backend user and developer docs now match the implemented init, connect, sync, inspect, and freshness behavior using neutral terminology.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-05T18:07:50.757Z, excerpt_hash=sha256:54ad0e7007f29ce876b15f4c29294bf14b5b972f37cf0851508d49ca0ae31fa6
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    - Observation: Command: node .agentplane/policy/check-routing.mjs; Result: pass; Evidence: policy routing OK. Command: git diff --check; Result: pass; Evidence: no whitespace errors. Command: node packages/agentplane/bin/agentplane.js doctor; Result: pass; Evidence: doctor OK with repo-local runtime.
      Impact: Docs no longer describe an unimplemented browser connect command as local CLI behavior.
      Resolution: Browser authorization and provider choice remain cloud-service responsibilities; local AgentPlane documents the metadata and token boundary.
      Promotion: incident-candidate
      Fixability: external
id_source: "generated"
---
## Summary

Document cloud backend integration contract

Update AgentPlane documentation so local and cloud backend flows describe the init choice, endpoint configuration, GitHub App interaction through the cloud service, sync freshness checks, and current limitations.

## Scope

- In scope: Update AgentPlane documentation so local and cloud backend flows describe the init choice, endpoint configuration, GitHub App interaction through the cloud service, sync freshness checks, and current limitations.
- Out of scope: unrelated refactors not required for "Document cloud backend integration contract".

## Plan

Epic E4: Cloud backend documentation contract. Scope: update public docs for local versus cloud backend flow, cloud endpoint configuration, GitHub App interaction through the cloud service, and freshness/sync behavior. Verify: docs lint/link checks, agentplane doctor, and policy routing check.

## Verify Steps

1. Review the requested outcome for "Document cloud backend integration contract". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-05T18:21:18.788Z — VERIFY — ok

By: CODER

Note: Verified: cloud backend user and developer docs now match the implemented init, connect, sync, inspect, and freshness behavior using neutral terminology.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-05T18:07:50.757Z, excerpt_hash=sha256:54ad0e7007f29ce876b15f4c29294bf14b5b972f37cf0851508d49ca0ae31fa6

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- Observation: Command: node .agentplane/policy/check-routing.mjs; Result: pass; Evidence: policy routing OK. Command: git diff --check; Result: pass; Evidence: no whitespace errors. Command: node packages/agentplane/bin/agentplane.js doctor; Result: pass; Evidence: doctor OK with repo-local runtime.
  Impact: Docs no longer describe an unimplemented browser connect command as local CLI behavior.
  Resolution: Browser authorization and provider choice remain cloud-service responsibilities; local AgentPlane documents the metadata and token boundary.
  Promotion: incident-candidate
  Fixability: external
