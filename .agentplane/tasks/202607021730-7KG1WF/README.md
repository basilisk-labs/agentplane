---
id: "202607021730-7KG1WF"
title: "Document and migrate maximum-assimilation v2"
status: "TODO"
priority: "high"
owner: "CODER"
revision: 1
origin:
  system: "manual"
depends_on:
  - "202607021729-8S1DF3"
tags:
  - "docs"
task_kind: "docs"
mutation_scope: "docs"
blueprint_request: "docs.change"
verify:
  - "ap doctor"
  - "bun run docs:check"
  - "node .agentplane/policy/check-routing.mjs"
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
comments: []
events: []
doc_version: 3
doc_updated_at: "2026-07-02T17:30:08.946Z"
doc_updated_by: "CODER"
description: "Phase 5 from the Context Maximum Assimilation PRD. Add migration or dry-run support for legacy context modes/artifacts, preserve existing wiki/facts/graph, generate initial topology/entity/page manifests where possible, and update user/developer docs plus release notes for the single public maximum-assimilation workflow."
sections:
  Summary: |-
    Document and migrate maximum-assimilation v2

    Phase 5 from the Context Maximum Assimilation PRD. Add migration or dry-run support for legacy context modes/artifacts, preserve existing wiki/facts/graph, generate initial topology/entity/page manifests where possible, and update user/developer docs plus release notes for the single public maximum-assimilation workflow.
  Scope: |-
    - In scope: Phase 5 from the Context Maximum Assimilation PRD. Add migration or dry-run support for legacy context modes/artifacts, preserve existing wiki/facts/graph, generate initial topology/entity/page manifests where possible, and update user/developer docs plus release notes for the single public maximum-assimilation workflow.
    - Out of scope: unrelated refactors not required for "Document and migrate maximum-assimilation v2".
  Plan: |-
    1. Implement the change for "Document and migrate maximum-assimilation v2".
    2. Run required checks and capture verification evidence.
    3. Finalize task findings and finish with traceable commit metadata.
  Verify Steps: |-
    PLANNER fallback scaffold for "Document and migrate maximum-assimilation v2". Replace with task-specific acceptance checks when PLANNER context is available.

    1. Review the requested outcome for "Document and migrate maximum-assimilation v2". Expected: the visible result matches ## Summary and stays inside approved scope.
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

Document and migrate maximum-assimilation v2

Phase 5 from the Context Maximum Assimilation PRD. Add migration or dry-run support for legacy context modes/artifacts, preserve existing wiki/facts/graph, generate initial topology/entity/page manifests where possible, and update user/developer docs plus release notes for the single public maximum-assimilation workflow.

## Scope

- In scope: Phase 5 from the Context Maximum Assimilation PRD. Add migration or dry-run support for legacy context modes/artifacts, preserve existing wiki/facts/graph, generate initial topology/entity/page manifests where possible, and update user/developer docs plus release notes for the single public maximum-assimilation workflow.
- Out of scope: unrelated refactors not required for "Document and migrate maximum-assimilation v2".

## Plan

1. Implement the change for "Document and migrate maximum-assimilation v2".
2. Run required checks and capture verification evidence.
3. Finalize task findings and finish with traceable commit metadata.

## Verify Steps

PLANNER fallback scaffold for "Document and migrate maximum-assimilation v2". Replace with task-specific acceptance checks when PLANNER context is available.

1. Review the requested outcome for "Document and migrate maximum-assimilation v2". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
