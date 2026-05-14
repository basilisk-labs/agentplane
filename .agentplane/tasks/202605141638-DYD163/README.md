---
id: "202605141638-DYD163"
title: "Unify release note validation rules"
status: "DOING"
priority: "med"
owner: "CODER"
revision: 6
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "release"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-14T16:41:00.774Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-14T18:01:58.256Z"
  updated_by: "CODER"
  note: "Release-note validation SSOT verified: TS release preflight imports the canonical release-notes-rules.json and the MJS check reads the same file; existing fixtures cover placeholders, required sections, duplicate headings, fenced bullets, and minimum bullets. Checks: apply.preflight.test.ts 15 tests passed; node scripts/release/check-release-notes.mjs --tag v0.6.0 passed; targeted eslint passed; policy routing passed."
  attempts: 0
commit: null
comments:
  -
    author: "CODER"
    body: "Start: Unifying release-note validation rules inside the approved v0.6 audit follow-up batch worktree, with shared fixtures and script coverage."
events:
  -
    type: "status"
    at: "2026-05-14T17:36:39.926Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Unifying release-note validation rules inside the approved v0.6 audit follow-up batch worktree, with shared fixtures and script coverage."
  -
    type: "verify"
    at: "2026-05-14T18:01:58.256Z"
    author: "CODER"
    state: "ok"
    note: "Release-note validation SSOT verified: TS release preflight imports the canonical release-notes-rules.json and the MJS check reads the same file; existing fixtures cover placeholders, required sections, duplicate headings, fenced bullets, and minimum bullets. Checks: apply.preflight.test.ts 15 tests passed; node scripts/release/check-release-notes.mjs --tag v0.6.0 passed; targeted eslint passed; policy routing passed."
doc_version: 3
doc_updated_at: "2026-05-14T18:01:58.275Z"
doc_updated_by: "CODER"
description: "Move duplicated release-note validation invariants out of the TS preflight and MJS release script into one canonical rules surface, keep both callers aligned, and add fixture tests that prove section, placeholder, duplicate heading, and bullet-count behavior share the same contract."
sections:
  Summary: |-
    Unify release note validation rules

    Move duplicated release-note validation invariants out of the TS preflight and MJS release script into one canonical rules surface, keep both callers aligned, and add fixture tests that prove section, placeholder, duplicate heading, and bullet-count behavior share the same contract.
  Scope: |-
    - In scope: Move duplicated release-note validation invariants out of the TS preflight and MJS release script into one canonical rules surface, keep both callers aligned, and add fixture tests that prove section, placeholder, duplicate heading, and bullet-count behavior share the same contract.
    - Out of scope: unrelated refactors not required for "Unify release note validation rules".
  Plan: "Unify release-note validation rule ownership. Scope: shared rule module usable by release apply TS preflight and MJS release script, fixture tests for headings/placeholders/duplicates/bullets/fences, and removal of duplicated constants/functions. Out of scope: changing release-note public template content unless required by tests."
  Verify Steps: "1. Prove TS release apply preflight and scripts/release/check-release-notes.mjs consume one canonical rule set or generated mirror. 2. Add/adjust fixtures for required sections, duplicate headings, template placeholders, fenced bullet lines, and tag validation. 3. Run targeted release-note tests and the release-note script against docs/releases/v0.6.0.md. 4. Run bun run lint:core -- changed release validation files. 5. Run node .agentplane/policy/check-routing.mjs."
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-14T18:01:58.256Z — VERIFY — ok

    By: CODER

    Note: Release-note validation SSOT verified: TS release preflight imports the canonical release-notes-rules.json and the MJS check reads the same file; existing fixtures cover placeholders, required sections, duplicate headings, fenced bullets, and minimum bullets. Checks: apply.preflight.test.ts 15 tests passed; node scripts/release/check-release-notes.mjs --tag v0.6.0 passed; targeted eslint passed; policy routing passed.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-14T17:36:39.926Z, excerpt_hash=sha256:cfafc816c8345c1544c47222e20d89105a88ef02280f05c140d018fbbc1b591c

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605141638-78JKTQ-v06-audit-followups/.agentplane/tasks/202605141638-DYD163/blueprint/resolved-snapshot.json
    - old_digest: e72abb0d8250098c78c5d8aac016c77f97dc736cc0d41dc2300c8df2e1bb28b4
    - current_digest: e72abb0d8250098c78c5d8aac016c77f97dc736cc0d41dc2300c8df2e1bb28b4
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605141638-DYD163

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    - Observation: The remaining executable validation logic stays in each caller, but rule constants now have one checked-in source.
      Impact: Reduces TS/MJS drift for release-note template placeholders, required sections, and bullet minimums.
      Resolution: Added canonical rules JSON and wired both validation callers to it.
id_source: "generated"
---
## Summary

Unify release note validation rules

Move duplicated release-note validation invariants out of the TS preflight and MJS release script into one canonical rules surface, keep both callers aligned, and add fixture tests that prove section, placeholder, duplicate heading, and bullet-count behavior share the same contract.

## Scope

- In scope: Move duplicated release-note validation invariants out of the TS preflight and MJS release script into one canonical rules surface, keep both callers aligned, and add fixture tests that prove section, placeholder, duplicate heading, and bullet-count behavior share the same contract.
- Out of scope: unrelated refactors not required for "Unify release note validation rules".

## Plan

Unify release-note validation rule ownership. Scope: shared rule module usable by release apply TS preflight and MJS release script, fixture tests for headings/placeholders/duplicates/bullets/fences, and removal of duplicated constants/functions. Out of scope: changing release-note public template content unless required by tests.

## Verify Steps

1. Prove TS release apply preflight and scripts/release/check-release-notes.mjs consume one canonical rule set or generated mirror. 2. Add/adjust fixtures for required sections, duplicate headings, template placeholders, fenced bullet lines, and tag validation. 3. Run targeted release-note tests and the release-note script against docs/releases/v0.6.0.md. 4. Run bun run lint:core -- changed release validation files. 5. Run node .agentplane/policy/check-routing.mjs.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-14T18:01:58.256Z — VERIFY — ok

By: CODER

Note: Release-note validation SSOT verified: TS release preflight imports the canonical release-notes-rules.json and the MJS check reads the same file; existing fixtures cover placeholders, required sections, duplicate headings, fenced bullets, and minimum bullets. Checks: apply.preflight.test.ts 15 tests passed; node scripts/release/check-release-notes.mjs --tag v0.6.0 passed; targeted eslint passed; policy routing passed.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-14T17:36:39.926Z, excerpt_hash=sha256:cfafc816c8345c1544c47222e20d89105a88ef02280f05c140d018fbbc1b591c

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605141638-78JKTQ-v06-audit-followups/.agentplane/tasks/202605141638-DYD163/blueprint/resolved-snapshot.json
- old_digest: e72abb0d8250098c78c5d8aac016c77f97dc736cc0d41dc2300c8df2e1bb28b4
- current_digest: e72abb0d8250098c78c5d8aac016c77f97dc736cc0d41dc2300c8df2e1bb28b4
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605141638-DYD163

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- Observation: The remaining executable validation logic stays in each caller, but rule constants now have one checked-in source.
  Impact: Reduces TS/MJS drift for release-note template placeholders, required sections, and bullet minimums.
  Resolution: Added canonical rules JSON and wired both validation callers to it.
