---
id: "202608021535-9EWFAB"
title: "Compact and deduplicate v0.7.1 task evidence"
status: "DOING"
priority: "med"
owner: "CODER"
revision: 4
origin:
  system: "manual"
depends_on: []
tags:
  - "compaction"
  - "evidence"
  - "v0.7.1"
task_kind: "code"
mutation_scope: "code"
blueprint_request: "code.branch_pr"
verify:
  - "bun run ci:contract"
  - "bun run test:critical"
  - "bun run typecheck"
plan_approval:
  state: "approved"
  updated_at: "2026-08-03T16:19:04.434Z"
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
    author: "CODER"
    body: "Start: continue branch_pr task in the dedicated task worktree."
events:
  -
    type: "status"
    at: "2026-08-03T16:19:36.480Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: continue branch_pr task in the dedicated task worktree."
doc_version: 3
doc_updated_at: "2026-08-03T16:19:36.480Z"
doc_updated_by: "CODER"
description: "Replace repeated evaluator diffs, prompts, and raw logs with content-addressed references and compact Git-tracked manifests while preserving local-first auditability, exact hashes, ACR receipts, offline recovery, and optional access to raw objects."
sections:
  Summary: |-
    Compact and deduplicate v0.7.1 task evidence

    Replace repeated evaluator diffs, prompts, and raw logs with content-addressed references and compact Git-tracked manifests while preserving local-first auditability, exact hashes, ACR receipts, offline recovery, and optional access to raw objects.
  Scope: |-
    - In scope: Replace repeated evaluator diffs, prompts, and raw logs with content-addressed references and compact Git-tracked manifests while preserving local-first auditability, exact hashes, ACR receipts, offline recovery, and optional access to raw objects.
    - Out of scope: unrelated refactors not required for "Compact and deduplicate v0.7.1 task evidence".
  Plan: |-
    1. Capture the evaluator-evidence baseline and classify durable outcome artifacts versus immutable evaluator inputs; preserve the measured baseline of 5,440 quality files, 88,984,550 bytes, and 18,243,269 exact duplicate bytes.
    2. Add a deterministic task-local content-addressed evidence object store and compact per-review manifest; write immutable inputs once by SHA-256, verify existing bytes before reuse, and keep evaluator paths directly readable offline.
    3. Route evaluator diff, blueprint, observed checks, prompt, and result schema through the object store while retaining small result, report, episode, and opinion artifacts; preserve quality-review gates, ACR receipts, evidence-bundle integrity, and legacy raw-packet compatibility.
    4. Add idempotence, collision/tamper, repeated-preparation deduplication, manifest verification, and compatibility tests; suppress noisy Git diffs for immutable object blobs without hiding their hashes or contents.
    5. Prove that repeated preparation creates one object per digest and reduces duplicated tracked bytes for immutable inputs by at least 80% in the acceptance fixture; then run typecheck, focused evaluator/evidence/critical suites, ci:contract, test:fast, diff/hotspot/Knip checks, and independent evaluator review.
  Verify Steps: |-
    PLANNER fallback scaffold for "Compact and deduplicate v0.7.1 task evidence". Replace with task-specific acceptance checks when PLANNER context is available.

    1. Review the requested outcome for "Compact and deduplicate v0.7.1 task evidence". Expected: the visible result matches ## Summary and stays inside approved scope.
    2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
    3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
extensions:
  workflow_route_baseline:
    start_head_sha: "42d25ee59e3cf08909f91dd4dce761250029bf23"
    version: 1
id_source: "generated"
---
## Summary

Compact and deduplicate v0.7.1 task evidence

Replace repeated evaluator diffs, prompts, and raw logs with content-addressed references and compact Git-tracked manifests while preserving local-first auditability, exact hashes, ACR receipts, offline recovery, and optional access to raw objects.

## Scope

- In scope: Replace repeated evaluator diffs, prompts, and raw logs with content-addressed references and compact Git-tracked manifests while preserving local-first auditability, exact hashes, ACR receipts, offline recovery, and optional access to raw objects.
- Out of scope: unrelated refactors not required for "Compact and deduplicate v0.7.1 task evidence".

## Plan

1. Capture the evaluator-evidence baseline and classify durable outcome artifacts versus immutable evaluator inputs; preserve the measured baseline of 5,440 quality files, 88,984,550 bytes, and 18,243,269 exact duplicate bytes.
2. Add a deterministic task-local content-addressed evidence object store and compact per-review manifest; write immutable inputs once by SHA-256, verify existing bytes before reuse, and keep evaluator paths directly readable offline.
3. Route evaluator diff, blueprint, observed checks, prompt, and result schema through the object store while retaining small result, report, episode, and opinion artifacts; preserve quality-review gates, ACR receipts, evidence-bundle integrity, and legacy raw-packet compatibility.
4. Add idempotence, collision/tamper, repeated-preparation deduplication, manifest verification, and compatibility tests; suppress noisy Git diffs for immutable object blobs without hiding their hashes or contents.
5. Prove that repeated preparation creates one object per digest and reduces duplicated tracked bytes for immutable inputs by at least 80% in the acceptance fixture; then run typecheck, focused evaluator/evidence/critical suites, ci:contract, test:fast, diff/hotspot/Knip checks, and independent evaluator review.

## Verify Steps

PLANNER fallback scaffold for "Compact and deduplicate v0.7.1 task evidence". Replace with task-specific acceptance checks when PLANNER context is available.

1. Review the requested outcome for "Compact and deduplicate v0.7.1 task evidence". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
