---
id: "202603130626-MZV4NG"
title: "Add Core CI release-ready contract test"
status: "TODO"
priority: "med"
owner: "CODER"
depends_on: []
tags:
  - "release"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-13T06:27:18.118Z"
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
doc_updated_at: "2026-03-13T06:27:16.766Z"
doc_updated_by: "ORCHESTRATOR"
description: "Protect ci.yml release-ready job shape with a workflow contract test so future edits cannot silently break artifact publishing."
id_source: "generated"
---
## Summary

Add Core CI release-ready contract test

Protect ci.yml release-ready job shape with a workflow contract test so future edits cannot silently break artifact publishing.

## Scope

- In scope: Protect ci.yml release-ready job shape with a workflow contract test so future edits cannot silently break artifact publishing.
- Out of scope: unrelated refactors not required for "Add Core CI release-ready contract test".

## Plan

1. Add a dedicated contract test for `.github/workflows/ci.yml` covering the `release-ready` job shape, dependencies, and artifact upload conditions.
2. Keep the assertions narrow enough to detect contract drift without coupling to unrelated CI job details.
3. Run the new contract test plus workflow lint/build checks and record evidence.

## Verify Steps

1. Run `bun x vitest run packages/agentplane/src/commands/release/ci-workflow-contract.test.ts --hookTimeout 60000 --testTimeout 60000`. Expected: `Core CI` keeps the release-ready job contract intact.
2. Run `bun run workflows:lint`. Expected: `.github/workflows/ci.yml` remains valid after adding the coverage test target.
3. Inspect the new test file and `.github/workflows/ci.yml`. Expected: the test asserts `release-ready` dependencies, artifact name, and readiness gating.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
