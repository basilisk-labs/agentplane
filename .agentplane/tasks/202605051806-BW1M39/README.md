---
id: "202605051806-BW1M39"
title: "Document cloud backend integration contract"
status: "DOING"
priority: "med"
owner: "DOCS"
revision: 4
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
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
commit: null
comments:
  -
    author: "CODER"
    body: "Start: Update cloud backend docs in the shared batch worktree after the code contract is implemented, keeping terms neutral and implementation-focused."
events:
  -
    type: "status"
    at: "2026-05-05T18:07:50.757Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Update cloud backend docs in the shared batch worktree after the code contract is implemented, keeping terms neutral and implementation-focused."
doc_version: 3
doc_updated_at: "2026-05-05T18:07:50.757Z"
doc_updated_by: "CODER"
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
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
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
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
