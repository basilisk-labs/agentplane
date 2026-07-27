---
id: "202607270107-GRJSV6"
title: "Preserve authority-only tails during merged cleanup"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 5
origin:
  system: "manual"
depends_on: []
tags:
  - "post-merge-followup"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-07-27T01:07:38.771Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
  attempts: 0
commit: null
comments:
  -
    author: "ORCHESTRATOR"
    body: "Start: approved post-merge cleanup authority follow-up."
events:
  -
    type: "status"
    at: "2026-07-27T01:07:39.057Z"
    author: "ORCHESTRATOR"
    from: "TODO"
    to: "DOING"
    note: "Start: approved post-merge cleanup authority follow-up."
doc_version: 3
doc_updated_at: "2026-07-27T01:21:15.474Z"
doc_updated_by: "ORCHESTRATOR"
description: "Follow up RF13: permit targeted merged cleanup only when a local post-merge tail is proven authority-only against the provider-merged head, and classify hosted close finalization as local reversible after the merge and pre-merge closure are already durable."
sections:
  Summary: |-
    Preserve authority-only tails during merged cleanup

    Follow up RF13: permit targeted merged cleanup only when a local post-merge tail is proven authority-only against the provider-merged head, and classify hosted close finalization as local reversible after the merge and pre-merge closure are already durable.
  Scope: |-
    - In scope: Follow up RF13: permit targeted merged cleanup only when a local post-merge tail is proven authority-only against the provider-merged head, and classify hosted close finalization as local reversible after the merge and pre-merge closure are already durable.
    - Out of scope: unrelated refactors not required for "Preserve authority-only tails during merged cleanup".
  Plan: "1. CODER: add a narrowly scoped cleanup proof that accepts only a provider-merged task head followed by authority-only task README records; keep semantic or arbitrary post-merge tails blocked. 2. CODER: classify hosted-close finalization as local reversible because protected merge and task completion are already durable before cleanup. 3. TESTER: add regression coverage for accepted authority-only tails and rejected semantic tails, then run focused cleanup/authority checks. 4. EVALUATOR: record an independent pass against the new proof. 5. INTEGRATOR: merge the follow-up and rerun targeted cleanup for NWVCAG."
  Verify Steps: |-
    1. Run targeted cleanup proof tests. Expected: a provider-merged head followed only by authority-extension README commits is removable; a non-authority tail remains blocked.
    2. Run authority policy tests. Expected: task.hosted_close.finalize is local_reversible and requires no authority because protected merge and close evidence already exist.
    3. Run format, lint, type checks, and ci:contract. Expected: all pass without generated-artifact drift.
    4. Re-run RF13 targeted cleanup after integration. Expected: the previously blocked local authority-only tail is removed by the CLI, while no unrelated worktree or branch is touched.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
extensions:
  workflow_route_baseline:
    start_head_sha: "518f9f4a62e09016262af2cbbeb89947550be2e0"
    version: 1
id_source: "generated"
---
## Summary

Preserve authority-only tails during merged cleanup

Follow up RF13: permit targeted merged cleanup only when a local post-merge tail is proven authority-only against the provider-merged head, and classify hosted close finalization as local reversible after the merge and pre-merge closure are already durable.

## Scope

- In scope: Follow up RF13: permit targeted merged cleanup only when a local post-merge tail is proven authority-only against the provider-merged head, and classify hosted close finalization as local reversible after the merge and pre-merge closure are already durable.
- Out of scope: unrelated refactors not required for "Preserve authority-only tails during merged cleanup".

## Plan

1. CODER: add a narrowly scoped cleanup proof that accepts only a provider-merged task head followed by authority-only task README records; keep semantic or arbitrary post-merge tails blocked. 2. CODER: classify hosted-close finalization as local reversible because protected merge and task completion are already durable before cleanup. 3. TESTER: add regression coverage for accepted authority-only tails and rejected semantic tails, then run focused cleanup/authority checks. 4. EVALUATOR: record an independent pass against the new proof. 5. INTEGRATOR: merge the follow-up and rerun targeted cleanup for NWVCAG.

## Verify Steps

1. Run targeted cleanup proof tests. Expected: a provider-merged head followed only by authority-extension README commits is removable; a non-authority tail remains blocked.
2. Run authority policy tests. Expected: task.hosted_close.finalize is local_reversible and requires no authority because protected merge and close evidence already exist.
3. Run format, lint, type checks, and ci:contract. Expected: all pass without generated-artifact drift.
4. Re-run RF13 targeted cleanup after integration. Expected: the previously blocked local authority-only tail is removed by the CLI, while no unrelated worktree or branch is touched.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
