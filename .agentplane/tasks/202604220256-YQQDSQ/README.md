---
id: "202604220256-YQQDSQ"
title: "Remove unused files and exports from Knip baseline"
status: "TODO"
priority: "high"
owner: "CODER"
revision: 4
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
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
commit: null
comments: []
events: []
doc_version: 3
doc_updated_at: "2026-04-22T02:56:16.937Z"
doc_updated_by: "PLANNER"
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
  Verification: "Pending implementation."
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

## Rollback Plan

Restore removed files/exports and previous knip baseline.

## Findings

None yet.
