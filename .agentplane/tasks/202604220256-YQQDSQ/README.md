---
id: "202604220256-YQQDSQ"
title: "Remove unused files and exports from Knip baseline"
result_summary: "Implementation commit e2bf2301b1de. Verification passed: bun run arch:baseline && bun run arch:deps && bun run ci:local:fast && bun run knip:check && git diff --check."
status: "DONE"
priority: "high"
owner: "CODER"
revision: 7
origin:
  system: "manual"
depends_on:
  - "202604220256-EA8MDP"
tags:
  - "ci"
  - "cleanup"
  - "tooling"
verify:
  - "bun run arch:baseline && bun run arch:deps"
  - "bun run ci:local:fast"
  - "bun run knip:check"
  - "git diff --check"
plan_approval:
  state: "approved"
  updated_at: "2026-04-22T02:59:09.481Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-04-22T08:27:13.345Z"
  updated_by: "CODER"
  note: "Verified: removed safe unused files, declared @agentplane/testkit as package dev dependency, lowered knip baseline to files=5 exports=235 types=298 total=538, and passed bun run arch:baseline && bun run arch:deps && bun run ci:local:fast && bun run knip:check && git diff --check."
commit:
  hash: "e2bf2301b1deabff83304b4ffd47b14de4f8b756"
  message: "🧹 YQQDSQ cleanup: lower knip baseline"
comments:
  -
    author: "CODER"
    body: "Start: inspect knip report, remove safe unused code, and lower the guarded unused-code baseline."
  -
    author: "CODER"
    body: "Verified: safe unused files removed, @agentplane/testkit declared for agentplane tests, and knip baseline lowered to files=5 exports=235 types=298 total=538."
events:
  -
    type: "status"
    at: "2026-04-22T08:15:35.701Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: inspect knip report, remove safe unused code, and lower the guarded unused-code baseline."
  -
    type: "verify"
    at: "2026-04-22T08:27:13.345Z"
    author: "CODER"
    state: "ok"
    note: "Verified: removed safe unused files, declared @agentplane/testkit as package dev dependency, lowered knip baseline to files=5 exports=235 types=298 total=538, and passed bun run arch:baseline && bun run arch:deps && bun run ci:local:fast && bun run knip:check && git diff --check."
  -
    type: "status"
    at: "2026-04-22T08:27:28.645Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: safe unused files removed, @agentplane/testkit declared for agentplane tests, and knip baseline lowered to files=5 exports=235 types=298 total=538."
doc_version: 3
doc_updated_at: "2026-04-22T08:27:28.646Z"
doc_updated_by: "CODER"
description: "Delete or wire intentional unused files/exports reported by knip and lower the unused-code baseline after cleanup."
sections:
  Summary: "Turn the current knip baseline debt into concrete removals and stricter enforcement."
  Scope: "Files/exports reported by knip, knip baseline/config, tests affected by removals. Do not remove public API without compatibility/deprecation review."
  Plan: |-
    1. Review each unused file/export from knip report.
    2. Delete truly dead code and document intentional public exports if any remain.
    3. Update knip baseline to the new lower count.
    4. Verify package builds/tests and knip check.
  Verify Steps: "Run knip:report, knip:check, fast CI, git diff --check."
  Verification: |-
    Pending implementation.
    
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-22T08:27:13.345Z — VERIFY — ok
    
    By: CODER
    
    Note: Verified: removed safe unused files, declared @agentplane/testkit as package dev dependency, lowered knip baseline to files=5 exports=235 types=298 total=538, and passed bun run arch:baseline && bun run arch:deps && bun run ci:local:fast && bun run knip:check && git diff --check.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-22T08:15:35.710Z, excerpt_hash=sha256:bc81e77384e553834a06a17efb5f75ee07f348f14e57dc1976906bd9a5e8cb85
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: "Restore removed files/exports and previous knip baseline."
  Findings: "None yet."
id_source: "generated"
---
## Summary

Turn the current knip baseline debt into concrete removals and stricter enforcement.

## Scope

Files/exports reported by knip, knip baseline/config, tests affected by removals. Do not remove public API without compatibility/deprecation review.

## Plan

1. Review each unused file/export from knip report.
2. Delete truly dead code and document intentional public exports if any remain.
3. Update knip baseline to the new lower count.
4. Verify package builds/tests and knip check.

## Verify Steps

Run knip:report, knip:check, fast CI, git diff --check.

## Verification

Pending implementation.

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-22T08:27:13.345Z — VERIFY — ok

By: CODER

Note: Verified: removed safe unused files, declared @agentplane/testkit as package dev dependency, lowered knip baseline to files=5 exports=235 types=298 total=538, and passed bun run arch:baseline && bun run arch:deps && bun run ci:local:fast && bun run knip:check && git diff --check.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-22T08:15:35.710Z, excerpt_hash=sha256:bc81e77384e553834a06a17efb5f75ee07f348f14e57dc1976906bd9a5e8cb85

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

Restore removed files/exports and previous knip baseline.

## Findings

None yet.
