---
id: "202605130758-4FB61V"
title: "Fix release notes template leakage"
status: "DOING"
priority: "med"
owner: "CODER"
revision: 1
origin:
  system: "manual"
depends_on: []
tags:
  - "release"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-13T07:59:05.437Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-13T09:54:05.898Z"
  updated_by: "CODER"
  note: "Verified release notes template leakage fix: v0.5.0 placeholders removed; release notes validators reject template placeholders, Writing Rules blocks, and duplicate section headings. Checks passed: bun test packages/agentplane/src/commands/release/apply.preflight.test.ts; bunx eslint scripts/check-release-notes.mjs packages/agentplane/src/commands/release/apply.preflight.package.ts packages/agentplane/src/commands/release/apply.preflight.test.ts; node scripts/check-release-notes.mjs --tag v0.5.0; node .agentplane/policy/check-routing.mjs; ap doctor; git diff --check."
  attempts: 0
commit: null
comments:
  -
    author: "CODER"
    body: "Start: fixing the leaked v0.5.0 release-note template block and adding a focused validation guard for placeholders, duplicate sections, and published writing rules."
events:
  -
    type: "status"
    at: "2026-05-13T08:09:10.034Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: fixing the leaked v0.5.0 release-note template block and adding a focused validation guard for placeholders, duplicate sections, and published writing rules."
  -
    type: "verify"
    at: "2026-05-13T09:54:05.898Z"
    author: "CODER"
    state: "ok"
    note: "Verified release notes template leakage fix: v0.5.0 placeholders removed; release notes validators reject template placeholders, Writing Rules blocks, and duplicate section headings. Checks passed: bun test packages/agentplane/src/commands/release/apply.preflight.test.ts; bunx eslint scripts/check-release-notes.mjs packages/agentplane/src/commands/release/apply.preflight.package.ts packages/agentplane/src/commands/release/apply.preflight.test.ts; node scripts/check-release-notes.mjs --tag v0.5.0; node .agentplane/policy/check-routing.mjs; ap doctor; git diff --check."
doc_version: 3
doc_updated_at: "2026-05-13T09:54:05.903Z"
doc_updated_by: "CODER"
description: "Remove template placeholders from v0.5.0 release notes and harden release notes validation against placeholder leakage."
sections:
  Summary: |-
    Fix release notes template leakage
    
    Remove template placeholders from v0.5.0 release notes and harden release notes validation against placeholder leakage.
  Scope: |-
    - In scope: Remove template placeholders from v0.5.0 release notes and harden release notes validation against placeholder leakage.
    - Out of scope: unrelated refactors not required for "Fix release notes template leakage".
  Plan: "1. Create a branch_pr worktree for CODER. 2. Replace the leaked v0.5.0 template block with real release summary/categories without duplicate sections. 3. Harden release note validation to reject template placeholders, published Writing Rules blocks, and duplicate release sections. 4. Add focused tests for placeholder rejection and valid notes. 5. Run targeted release-note tests, check-release-notes for v0.5.0, routing check, and doctor; record verification."
  Verify Steps: |-
    1. Review the requested outcome for "Fix release notes template leakage". Expected: the visible result matches ## Summary and stays inside approved scope.
    2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
    3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-13T09:54:05.898Z — VERIFY — ok
    
    By: CODER
    
    Note: Verified release notes template leakage fix: v0.5.0 placeholders removed; release notes validators reject template placeholders, Writing Rules blocks, and duplicate section headings. Checks passed: bun test packages/agentplane/src/commands/release/apply.preflight.test.ts; bunx eslint scripts/check-release-notes.mjs packages/agentplane/src/commands/release/apply.preflight.package.ts packages/agentplane/src/commands/release/apply.preflight.test.ts; node scripts/check-release-notes.mjs --tag v0.5.0; node .agentplane/policy/check-routing.mjs; ap doctor; git diff --check.
    Attempts: 0
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-13T08:09:10.034Z, excerpt_hash=sha256:4ce5acdba341738551e924ae56fe237cecb172ad2ab47aa81ecdbf9d4771f32c
    
    Details:
    
    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605130758-4FB61V-release-notes-template-guard/.agentplane/tasks/202605130758-4FB61V/blueprint/resolved-snapshot.json
    - old_digest: 635a98e00703d73845f4676cd40ee2164795af185a09d0e0b7dd4b3f4f0faa03
    - current_digest: 635a98e00703d73845f4676cd40ee2164795af185a09d0e0b7dd4b3f4f0faa03
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605130758-4FB61V
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Fix release notes template leakage

Remove template placeholders from v0.5.0 release notes and harden release notes validation against placeholder leakage.

## Scope

- In scope: Remove template placeholders from v0.5.0 release notes and harden release notes validation against placeholder leakage.
- Out of scope: unrelated refactors not required for "Fix release notes template leakage".

## Plan

1. Create a branch_pr worktree for CODER. 2. Replace the leaked v0.5.0 template block with real release summary/categories without duplicate sections. 3. Harden release note validation to reject template placeholders, published Writing Rules blocks, and duplicate release sections. 4. Add focused tests for placeholder rejection and valid notes. 5. Run targeted release-note tests, check-release-notes for v0.5.0, routing check, and doctor; record verification.

## Verify Steps

1. Review the requested outcome for "Fix release notes template leakage". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-13T09:54:05.898Z — VERIFY — ok

By: CODER

Note: Verified release notes template leakage fix: v0.5.0 placeholders removed; release notes validators reject template placeholders, Writing Rules blocks, and duplicate section headings. Checks passed: bun test packages/agentplane/src/commands/release/apply.preflight.test.ts; bunx eslint scripts/check-release-notes.mjs packages/agentplane/src/commands/release/apply.preflight.package.ts packages/agentplane/src/commands/release/apply.preflight.test.ts; node scripts/check-release-notes.mjs --tag v0.5.0; node .agentplane/policy/check-routing.mjs; ap doctor; git diff --check.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-13T08:09:10.034Z, excerpt_hash=sha256:4ce5acdba341738551e924ae56fe237cecb172ad2ab47aa81ecdbf9d4771f32c

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605130758-4FB61V-release-notes-template-guard/.agentplane/tasks/202605130758-4FB61V/blueprint/resolved-snapshot.json
- old_digest: 635a98e00703d73845f4676cd40ee2164795af185a09d0e0b7dd4b3f4f0faa03
- current_digest: 635a98e00703d73845f4676cd40ee2164795af185a09d0e0b7dd4b3f4f0faa03
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605130758-4FB61V

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
