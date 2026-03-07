---
id: "202603072133-4XZFXD"
title: "Audit historical task commit anomalies"
status: "DOING"
priority: "high"
owner: "PLANNER"
depends_on:
  - "202603072133-TBN594"
  - "202603072133-RHJ409"
tags:
  - "tasks"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-07T21:42:29.177Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-03-07T21:45:46.728Z"
  updated_by: "REVIEWER"
  note: "Verified: historical task archive anomalies are now bucketed with concrete counts, representative samples, and a repair strategy; the next task can safely distinguish exact remaps, legacy backfills, and meta-task close references."
commit: null
comments:
  -
    author: "PLANNER"
    body: "Start: classify historical task archive warnings into concrete buckets, measure repairability, and record the migration strategy before touching any archive data."
events:
  -
    type: "status"
    at: "2026-03-07T21:42:33.206Z"
    author: "PLANNER"
    from: "TODO"
    to: "DOING"
    note: "Start: classify historical task archive warnings into concrete buckets, measure repairability, and record the migration strategy before touching any archive data."
  -
    type: "verify"
    at: "2026-03-07T21:45:29.661Z"
    author: "REVIEWER"
    state: "ok"
    note: "Verified: historical task archive anomalies are now bucketed with concrete counts, representative samples, and a repair strategy; the next task can safely distinguish exact remaps, legacy backfills, and meta-task close references."
  -
    type: "verify"
    at: "2026-03-07T21:45:46.728Z"
    author: "REVIEWER"
    state: "ok"
    note: "Verified: historical task archive anomalies are now bucketed with concrete counts, representative samples, and a repair strategy; the next task can safely distinguish exact remaps, legacy backfills, and meta-task close references."
doc_version: 2
doc_updated_at: "2026-03-07T21:45:46.730Z"
doc_updated_by: "REVIEWER"
description: "Classify DONE-task commit-hash anomalies in the archive, separate repairable metadata from irrecoverable legacy backfills, and capture the repair strategy."
id_source: "generated"
---
## Summary

Audit historical DONE-task commit anomalies so the next repair task knows exactly which cases can be auto-fixed and which cases require policy changes or explicit exemptions.

## Scope

In scope: analyze existing task READMEs, doctor warning classes, and current git history. Out of scope: actual metadata repair, doctor behavior changes, or broad docs rewrites.

## Plan

1. Implement the change for "Audit historical task commit anomalies".
2. Run required checks and capture verification evidence.
3. Finalize task notes and finish with traceable commit metadata.

## Risks

- Risk: hidden regressions in touched paths.
- Mitigation: run required checks before finish and record evidence.

## Verify Steps

1. Reproduce the doctor warning classes. 2. Produce a bucketed anomaly inventory with counts and representative examples. 3. Ensure the follow-up repair strategy is concrete enough to implement in the next task.

## Verification

Command: historical anomaly inventory (tasks.json + git history)
Result: pass
Evidence: DONE archive splits into 218 unknown hashes and 21 close-commit references; 98 unknown hashes are explicit Legacy completion backfills, only 3 non-backfill unknown hashes have deterministic exact-subject remaps, and 16 of 21 close references are meta/orchestrator cross-task closures
Scope: .agentplane/tasks.json, historical task READMEs, current git history
Links: .agentplane/tasks/202603072133-4XZFXD/README.md

Command: representative task sampling
Result: pass
Evidence: sampled 202601041253-00006 (legacy backfill), 202602081437-D547F3 (epic cross-task close), 202602090801-349KZ4 and 202602090802-H3DVFH (no-op/already-implemented close refs), and 202602111631-B66HV5 (epic closure) to validate the buckets
Scope: historical task README evidence
Links: .agentplane/tasks/202601041253-00006/README.md, .agentplane/tasks/202602081437-D547F3/README.md

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-03-07T21:45:46.728Z — VERIFY — ok

By: REVIEWER

Note: Verified: historical task archive anomalies are now bucketed with concrete counts, representative samples, and a repair strategy; the next task can safely distinguish exact remaps, legacy backfills, and meta-task close references.

VerifyStepsRef: doc_version=2, doc_updated_at=2026-03-07T21:45:39.928Z, excerpt_hash=sha256:a80892743b5bcafce7d62ef4b621aa2a5661b7d4a3f7a1b2254a34a86252f617

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Notes

Audit summary: 1) 98/218 unknown hashes are explicit legacy backfills and are not safely repairable from local repo data alone. 2) Only 3 unknown hashes have an exact current-history subject remap. 3) 16/21 close-commit warnings are ORCHESTRATOR/meta cross-task closures; these likely need semantics-aware doctor handling rather than blind hash rewriting. 4) The next repair task should implement deterministic remaps where exact, introduce a reviewed repair report for the rest, and refine doctor to distinguish invalid implementation hashes from legitimate meta closures.
