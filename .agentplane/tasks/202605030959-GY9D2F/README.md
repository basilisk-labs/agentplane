---
id: "202605030959-GY9D2F"
title: "Fix release recovery checksum source"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 4
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "recovery"
  - "release"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-03T10:00:30.819Z"
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
    body: "Start: Fix recovery distribution publishing so reruns for an existing tag use immutable release-owned checksums instead of regenerating hashes from the current runtime checkout."
events:
  -
    type: "status"
    at: "2026-05-03T10:50:04.282Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Fix recovery distribution publishing so reruns for an existing tag use immutable release-owned checksums instead of regenerating hashes from the current runtime checkout."
doc_version: 3
doc_updated_at: "2026-05-03T10:50:04.282Z"
doc_updated_by: "CODER"
description: "Recovery workflow must publish external distribution modules from the immutable release payload, not from whatever runtime checkout is used to rerun the workflow. Prevent checksum drift when rerunning external module publication for an existing tag."
sections:
  Summary: |-
    Fix release recovery checksum source
    
    Recovery workflow must publish external distribution modules from the immutable release payload, not from whatever runtime checkout is used to rerun the workflow. Prevent checksum drift when rerunning external module publication for an existing tag.
  Scope: |-
    - In scope: Recovery workflow must publish external distribution modules from the immutable release payload, not from whatever runtime checkout is used to rerun the workflow. Prevent checksum drift when rerunning external module publication for an existing tag.
    - Out of scope: unrelated refactors not required for "Fix release recovery checksum source".
  Plan: |-
    Plan:
    1. Inspect publish-distribution-module recovery flow and identify where runtime checkout and release payload SHA are conflated.
    2. Change recovery publication so external modules are rendered only from immutable v0.4.2 release evidence or downloaded release checksums, not regenerated from the current source checkout.
    3. Add regression coverage proving rerunning external publication for an old tag cannot produce checksums for a newer commit.
    4. Verify with focused tests plus workflow/script freshness checks.
    Acceptance: rerunning external module recovery for an existing tag uses release-owned hashes and cannot silently publish artifacts for a different commit.
  Verify Steps: |-
    1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
    3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.
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

Fix release recovery checksum source

Recovery workflow must publish external distribution modules from the immutable release payload, not from whatever runtime checkout is used to rerun the workflow. Prevent checksum drift when rerunning external module publication for an existing tag.

## Scope

- In scope: Recovery workflow must publish external distribution modules from the immutable release payload, not from whatever runtime checkout is used to rerun the workflow. Prevent checksum drift when rerunning external module publication for an existing tag.
- Out of scope: unrelated refactors not required for "Fix release recovery checksum source".

## Plan

Plan:
1. Inspect publish-distribution-module recovery flow and identify where runtime checkout and release payload SHA are conflated.
2. Change recovery publication so external modules are rendered only from immutable v0.4.2 release evidence or downloaded release checksums, not regenerated from the current source checkout.
3. Add regression coverage proving rerunning external publication for an old tag cannot produce checksums for a newer commit.
4. Verify with focused tests plus workflow/script freshness checks.
Acceptance: rerunning external module recovery for an existing tag uses release-owned hashes and cannot silently publish artifacts for a different commit.

## Verify Steps

1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
