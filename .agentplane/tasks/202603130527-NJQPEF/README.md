---
id: "202603130527-NJQPEF"
title: "Align release prepublish gate with Core CI coverage guards"
status: "DOING"
priority: "high"
owner: "CODER"
depends_on: []
tags:
  - "release"
  - "code"
  - "ci"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-13T05:28:42.390Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-03-13T05:36:08.912Z"
  updated_by: "CODER"
  note: "Command: bun run test:workflow-coverage; Result: pass; Evidence: workflow/harness branch thresholds remained green. Scope: release parity coverage guards. Command: bun run test:significant-coverage; Result: pass; Evidence: guard commands.ts stayed at 85.51% branch and comment-commit.ts at 75.00%. Scope: significant release-safe coverage gate. Command: bun run release:prepublish; Result: pass; Evidence: full release ci-check plus release pack path completed with the new workflow/significant coverage steps included in the live command string. Scope: release prepublish parity with Core CI coverage guards."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: align release prepublish with the coverage guards that actually broke on the 0.3.6 release SHA, then sync the release docs to the resulting contract before touching publish gating."
events:
  -
    type: "status"
    at: "2026-03-13T05:28:51.878Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: align release prepublish with the coverage guards that actually broke on the 0.3.6 release SHA, then sync the release docs to the resulting contract before touching publish gating."
  -
    type: "verify"
    at: "2026-03-13T05:36:08.912Z"
    author: "CODER"
    state: "ok"
    note: "Command: bun run test:workflow-coverage; Result: pass; Evidence: workflow/harness branch thresholds remained green. Scope: release parity coverage guards. Command: bun run test:significant-coverage; Result: pass; Evidence: guard commands.ts stayed at 85.51% branch and comment-commit.ts at 75.00%. Scope: significant release-safe coverage gate. Command: bun run release:prepublish; Result: pass; Evidence: full release ci-check plus release pack path completed with the new workflow/significant coverage steps included in the live command string. Scope: release prepublish parity with Core CI coverage guards."
doc_version: 3
doc_updated_at: "2026-03-13T05:36:08.913Z"
doc_updated_by: "CODER"
description: "Make release:prepublish and publish prerequisites include the same significant/workflow coverage guards that currently fail only in Core CI, then sync release docs to that contract."
id_source: "generated"
---
## Summary

Align release prepublish gate with Core CI coverage guards

Make release:prepublish and publish prerequisites include the same significant/workflow coverage guards that currently fail only in Core CI, then sync release docs to that contract.

## Scope

- In scope: Make release:prepublish and publish prerequisites include the same significant/workflow coverage guards that currently fail only in Core CI, then sync release docs to that contract.
- Out of scope: unrelated refactors not required for "Align release prepublish gate with Core CI coverage guards".

## Plan

1. Expand release:ci-check/release:prepublish to include the same significant and workflow coverage guards that matter for release safety.
2. Add or update targeted tests/docs so the release contract is explicit and reproducible.
3. Verify the expanded gate locally and record exact evidence in the task README.

## Verify Steps

1. Run `bun run test:workflow-coverage`. Expected: the workflow/harness coverage guard still passes after the release-gate change.
2. Run `bun run test:significant-coverage`. Expected: the significant coverage guard runs inside the release-oriented path and passes.
3. Run `bun run release:prepublish`. Expected: release prepublish now covers the same critical Linux coverage guards that previously only failed in Core CI.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-03-13T05:36:08.912Z — VERIFY — ok

By: CODER

Note: Command: bun run test:workflow-coverage; Result: pass; Evidence: workflow/harness branch thresholds remained green. Scope: release parity coverage guards. Command: bun run test:significant-coverage; Result: pass; Evidence: guard commands.ts stayed at 85.51% branch and comment-commit.ts at 75.00%. Scope: significant release-safe coverage gate. Command: bun run release:prepublish; Result: pass; Evidence: full release ci-check plus release pack path completed with the new workflow/significant coverage steps included in the live command string. Scope: release prepublish parity with Core CI coverage guards.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-13T05:28:51.878Z, excerpt_hash=sha256:84952fb88526441ab9f712707829bd9fd6171738d27fd36fbb6d32d6d61009a2

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
