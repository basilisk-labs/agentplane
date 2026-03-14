---
id: "202603140758-GWZW7Y"
title: "Infer Redmine canonical-state readiness from issue payloads"
result_summary: "Operators can now inspect visible Redmine custom fields, see canonical_state visibility, and detect live field-name drift before wiring canonical_state env ids."
status: "DONE"
priority: "med"
owner: "CODER"
revision: 13
depends_on: []
tags:
  - "code"
  - "backend"
  - "redmine"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-14T08:01:49.144Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-03-14T08:11:04.300Z"
  updated_by: "CODER"
  note: "Command: targeted vitest for redmine backend/CLI/help plus bun run test:backend:redmine-live, eslint, prettier, and both package builds. Result: pass. Evidence: 58 targeted backend+CLI tests passed, 12 help/docs tests passed, 2 live sandbox tests passed, eslint/prettier clean, both builds green. Scope: Redmine read-only inspection helper, backend inspect CLI surface, doctor hint, live tests, and docs/help updates."
commit:
  hash: "5b7a09fd478b7e14e5cd368b262c4926ff722599"
  message: "🔎 GWZW7Y task: inspect Redmine field readiness from issue payloads"
comments:
  -
    author: "CODER"
    body: "Start: implement a read-only Redmine issue-field inspection path, wire it into backend CLI diagnostics, and cover both mocked and live sandbox behavior without relying on admin-only custom_fields APIs."
  -
    author: "CODER"
    body: "Verified: added a read-only Redmine field inspection path, exposed it via backend inspect, and covered mocked plus live sandbox diagnostics without relying on admin-only custom_fields access."
events:
  -
    type: "status"
    at: "2026-03-14T08:01:49.575Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: implement a read-only Redmine issue-field inspection path, wire it into backend CLI diagnostics, and cover both mocked and live sandbox behavior without relying on admin-only custom_fields APIs."
  -
    type: "verify"
    at: "2026-03-14T08:11:04.300Z"
    author: "CODER"
    state: "ok"
    note: "Command: targeted vitest for redmine backend/CLI/help plus bun run test:backend:redmine-live, eslint, prettier, and both package builds. Result: pass. Evidence: 58 targeted backend+CLI tests passed, 12 help/docs tests passed, 2 live sandbox tests passed, eslint/prettier clean, both builds green. Scope: Redmine read-only inspection helper, backend inspect CLI surface, doctor hint, live tests, and docs/help updates."
  -
    type: "status"
    at: "2026-03-14T08:11:40.394Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: added a read-only Redmine field inspection path, exposed it via backend inspect, and covered mocked plus live sandbox diagnostics without relying on admin-only custom_fields access."
doc_version: 3
doc_updated_at: "2026-03-14T08:11:40.395Z"
doc_updated_by: "CODER"
description: "Add read-only discovery and clearer readiness diagnostics when Redmine API key cannot access custom_fields.json but issue payloads may still reveal canonical_state field usage."
sections:
  Summary: "Add a read-only Redmine field-catalog inspection path that derives readiness facts from ordinary issue payloads, so canonical_state and field-name drift can be diagnosed even when the API key cannot read /custom_fields.json."
  Scope: "In scope: Redmine backend read-only field inspection from issue payloads, a small backend CLI surface to print the inspection result, doctor/help/docs alignment where it improves operator guidance, and mocked plus live regressions. Out of scope: remote writes, tracker schema mutation, and risky auto-wiring of field ids from display names."
  Plan: |-
    1. Add a read-only Redmine field-catalog inspection helper that scans visible issue custom_fields and summarizes canonical_state visibility plus configured-id name drift.
    2. Expose that inspection through a small backend CLI command and sync help/docs so operators can diagnose readiness without /custom_fields.json access.
    3. Cover the behavior with mocked backend tests, CLI/help/docs tests, and the existing live sandbox suite.
  Verify Steps: |-
    1. bun x vitest run packages/agentplane/src/backends/task-backend.redmine.test.ts packages/agentplane/src/commands/backend.test.ts packages/agentplane/src/cli/run-cli.core.backend-sync.test.ts --hookTimeout 60000 --testTimeout 60000
    2. bun x vitest run packages/agentplane/src/cli/run-cli.core.help-snap.test.ts packages/agentplane/src/cli/run-cli.core.docs-cli.test.ts --hookTimeout 60000 --testTimeout 60000
    3. bun run test:backend:redmine-live
    4. ./node_modules/.bin/eslint <touched runtime/test files>
    5. bun run --filter=@agentplaneorg/core build && bun run --filter=agentplane build
  Verification: |-
    Verification will record targeted backend, CLI, and live-sandbox evidence for the new read-only inspection path.
    
    <!-- BEGIN VERIFICATION RESULTS -->
    #### 2026-03-14T08:11:04.300Z — VERIFY — ok
    
    By: CODER
    
    Note: Command: targeted vitest for redmine backend/CLI/help plus bun run test:backend:redmine-live, eslint, prettier, and both package builds. Result: pass. Evidence: 58 targeted backend+CLI tests passed, 12 help/docs tests passed, 2 live sandbox tests passed, eslint/prettier clean, both builds green. Scope: Redmine read-only inspection helper, backend inspect CLI surface, doctor hint, live tests, and docs/help updates.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-14T08:10:53.985Z, excerpt_hash=sha256:167408df9e22f8670433f29feadae5c7981753a3804d8fbaf0554aeb370a5af8
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: "Revert the inspection command and backend discovery helper, then restore the previous Redmine help/docs wording if the new diagnostics prove noisy or misleading."
  Findings: "Live inspection confirmed two operational facts on the sandbox: ordinary issues.json payloads expose custom field ids and names without admin access, and the current tracker does not expose a visible canonical_state field while several configured ids already have mismatched display names (for example doc->verify and doc_version->commit). That made read-only inspection and drift reporting the safe improvement, while silent auto-wiring by field name would have been unsound."
id_source: "generated"
---
## Summary

Add a read-only Redmine field-catalog inspection path that derives readiness facts from ordinary issue payloads, so canonical_state and field-name drift can be diagnosed even when the API key cannot read /custom_fields.json.

## Scope

In scope: Redmine backend read-only field inspection from issue payloads, a small backend CLI surface to print the inspection result, doctor/help/docs alignment where it improves operator guidance, and mocked plus live regressions. Out of scope: remote writes, tracker schema mutation, and risky auto-wiring of field ids from display names.

## Plan

1. Add a read-only Redmine field-catalog inspection helper that scans visible issue custom_fields and summarizes canonical_state visibility plus configured-id name drift.
2. Expose that inspection through a small backend CLI command and sync help/docs so operators can diagnose readiness without /custom_fields.json access.
3. Cover the behavior with mocked backend tests, CLI/help/docs tests, and the existing live sandbox suite.

## Verify Steps

1. bun x vitest run packages/agentplane/src/backends/task-backend.redmine.test.ts packages/agentplane/src/commands/backend.test.ts packages/agentplane/src/cli/run-cli.core.backend-sync.test.ts --hookTimeout 60000 --testTimeout 60000
2. bun x vitest run packages/agentplane/src/cli/run-cli.core.help-snap.test.ts packages/agentplane/src/cli/run-cli.core.docs-cli.test.ts --hookTimeout 60000 --testTimeout 60000
3. bun run test:backend:redmine-live
4. ./node_modules/.bin/eslint <touched runtime/test files>
5. bun run --filter=@agentplaneorg/core build && bun run --filter=agentplane build

## Verification

Verification will record targeted backend, CLI, and live-sandbox evidence for the new read-only inspection path.

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-03-14T08:11:04.300Z — VERIFY — ok

By: CODER

Note: Command: targeted vitest for redmine backend/CLI/help plus bun run test:backend:redmine-live, eslint, prettier, and both package builds. Result: pass. Evidence: 58 targeted backend+CLI tests passed, 12 help/docs tests passed, 2 live sandbox tests passed, eslint/prettier clean, both builds green. Scope: Redmine read-only inspection helper, backend inspect CLI surface, doctor hint, live tests, and docs/help updates.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-14T08:10:53.985Z, excerpt_hash=sha256:167408df9e22f8670433f29feadae5c7981753a3804d8fbaf0554aeb370a5af8

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

Revert the inspection command and backend discovery helper, then restore the previous Redmine help/docs wording if the new diagnostics prove noisy or misleading.

## Findings

Live inspection confirmed two operational facts on the sandbox: ordinary issues.json payloads expose custom field ids and names without admin access, and the current tracker does not expose a visible canonical_state field while several configured ids already have mismatched display names (for example doc->verify and doc_version->commit). That made read-only inspection and drift reporting the safe improvement, while silent auto-wiring by field name would have been unsound.
