---
id: "202608061925-KANFC0"
title: "Preserve exact Windows task README file identities"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 6
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
task_kind: "code"
mutation_scope: "code"
risk_flags:
  - "security"
blueprint_request: "code.branch_pr"
verify:
  - "bunx vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/backends/task-backend.local.test.ts"
plan_approval:
  state: "approved"
  updated_at: "2026-08-06T19:25:23.776Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
  attempts: 0
execution_route:
  frozen: true
  reason_codes:
    - "repository_branch_pr_floor"
  repository_mode: "branch_pr"
  requested_mode: "branch_pr"
  schema_version: 1
  selected_mode: "branch_pr"
commit: null
comments:
  -
    author: "CODER"
    body: "Start: continue branch_pr task in the dedicated task worktree."
events:
  -
    type: "status"
    at: "2026-08-06T19:28:55.044Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: continue branch_pr task in the dedicated task worktree."
doc_version: 3
doc_updated_at: "2026-08-06T19:31:40.635Z"
doc_updated_by: "CODER"
description: "Fix local task scans so NTFS file IDs above Number.MAX_SAFE_INTEGER remain exact across pre-scan and stable-read identity checks, preventing false unreadable_readme failures in verify and finish."
sections:
  Summary: |-
    Preserve exact Windows task README file identities

    Fix local task scans so NTFS file IDs above Number.MAX_SAFE_INTEGER remain exact across pre-scan and stable-read identity checks, preventing false unreadable_readme failures in verify and finish.
  Scope: |-
    - In scope: Fix local task scans so NTFS file IDs above Number.MAX_SAFE_INTEGER remain exact across pre-scan and stable-read identity checks, preventing false unreadable_readme failures in verify and finish.
    - Out of scope: unrelated refactors not required for "Preserve exact Windows task README file identities".
  Plan: "1. Reproduce the precision boundary with a synthetic NTFS-style file identity above 2^53 and trace the local task scan into the stable no-follow reader. 2. Make the pre-scan use bigint filesystem metadata end-to-end, converting only safe cache fields such as README size and mtime to numbers. 3. Add focused regression coverage for exact high file IDs plus normal local task scans. 4. Run local backend, critical CLI, type, formatting, and Windows hosted gates. 5. Integrate before the 0.7.5 release task and record the external bug report as provenance."
  Verify Steps: |-
    1. Run `bunx vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/backends/task-backend.local.test.ts`. Expected: a synthetic NTFS-style file identity above `Number.MAX_SAFE_INTEGER` remains byte-exact through the scan identity helper and ordinary local task scans still pass.
    2. Run `bun run typecheck` and `bun run test:critical`. Expected: no type, local backend, verify, finish, or lifecycle regression.
    3. Confirm the implementation obtains task README metadata with `lstat(..., { bigint: true })` before passing the identity to stable protected reads. Expected: no number-to-bigint conversion occurs for `dev` or `ino`.
    4. Confirm Windows hosted CI passes before integration. Expected: required `PR verification` is green on the exact PR head.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    - Observation: External Windows report and source trace confirmed local task pre-scan converted Number-based lstat dev/ino into BigInt before exact protected-read comparison.
      Impact: NTFS file IDs above 2^53 could be rounded and falsely classified as unreadable_readme, blocking verify and finish while direct task reads still succeeded.
      Resolution: Use BigIntStats for pre-scan identity, preserve dev/ino exactly, reconstruct fractional mtimeMs from mtimeNs for cache compatibility, and cover an unsafe-in-Number Windows-style identity.
extensions:
  workflow_route_baseline:
    start_head_sha: "0e1d30346d74b782d736e480700919077e532c5f"
    version: 1
id_source: "generated"
---
## Summary

Preserve exact Windows task README file identities

Fix local task scans so NTFS file IDs above Number.MAX_SAFE_INTEGER remain exact across pre-scan and stable-read identity checks, preventing false unreadable_readme failures in verify and finish.

## Scope

- In scope: Fix local task scans so NTFS file IDs above Number.MAX_SAFE_INTEGER remain exact across pre-scan and stable-read identity checks, preventing false unreadable_readme failures in verify and finish.
- Out of scope: unrelated refactors not required for "Preserve exact Windows task README file identities".

## Plan

1. Reproduce the precision boundary with a synthetic NTFS-style file identity above 2^53 and trace the local task scan into the stable no-follow reader. 2. Make the pre-scan use bigint filesystem metadata end-to-end, converting only safe cache fields such as README size and mtime to numbers. 3. Add focused regression coverage for exact high file IDs plus normal local task scans. 4. Run local backend, critical CLI, type, formatting, and Windows hosted gates. 5. Integrate before the 0.7.5 release task and record the external bug report as provenance.

## Verify Steps

1. Run `bunx vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/backends/task-backend.local.test.ts`. Expected: a synthetic NTFS-style file identity above `Number.MAX_SAFE_INTEGER` remains byte-exact through the scan identity helper and ordinary local task scans still pass.
2. Run `bun run typecheck` and `bun run test:critical`. Expected: no type, local backend, verify, finish, or lifecycle regression.
3. Confirm the implementation obtains task README metadata with `lstat(..., { bigint: true })` before passing the identity to stable protected reads. Expected: no number-to-bigint conversion occurs for `dev` or `ino`.
4. Confirm Windows hosted CI passes before integration. Expected: required `PR verification` is green on the exact PR head.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- Observation: External Windows report and source trace confirmed local task pre-scan converted Number-based lstat dev/ino into BigInt before exact protected-read comparison.
  Impact: NTFS file IDs above 2^53 could be rounded and falsely classified as unreadable_readme, blocking verify and finish while direct task reads still succeeded.
  Resolution: Use BigIntStats for pre-scan identity, preserve dev/ino exactly, reconstruct fractional mtimeMs from mtimeNs for cache compatibility, and cover an unsafe-in-Number Windows-style identity.
