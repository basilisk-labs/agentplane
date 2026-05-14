---
id: "202605141314-QGDT9K"
title: "Fix v0.6.0 release notes quality gate"
result_summary: "Merged via PR #3713."
status: "DONE"
priority: "high"
owner: "CODER"
revision: 6
origin:
  system: "manual"
depends_on: []
tags:
  - "release"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-14T13:15:13.200Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-14T13:32:01.561Z"
  updated_by: "CODER"
  note: "Release notes quality gate verified: v0.6.0 notes now use the release template, validation rejects frontmatter-only headings and missing sections, and targeted release tests pass."
  attempts: 0
commit:
  hash: "880a40641c21093563aaea0283dcd23b6db961e1"
  message: "Merge pull request #3713 from basilisk-labs/task/202605141314-QGDT9K/fix-v06-release-notes"
comments:
  -
    author: "CODER"
    body: "Start: rewriting the v0.6.0 release notes into the public release template and tightening validation so malformed or shallow release documents fail before publication."
  -
    author: "INTEGRATOR"
    body: "Verified: PR #3713 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
events:
  -
    type: "status"
    at: "2026-05-14T13:16:33.628Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: rewriting the v0.6.0 release notes into the public release template and tightening validation so malformed or shallow release documents fail before publication."
  -
    type: "verify"
    at: "2026-05-14T13:32:01.561Z"
    author: "CODER"
    state: "ok"
    note: "Release notes quality gate verified: v0.6.0 notes now use the release template, validation rejects frontmatter-only headings and missing sections, and targeted release tests pass."
  -
    type: "status"
    at: "2026-05-14T14:23:40.873Z"
    author: "INTEGRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: PR #3713 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
doc_version: 3
doc_updated_at: "2026-05-14T14:23:40.879Z"
doc_updated_by: "INTEGRATOR"
description: "Rewrite the v0.6.0 release notes into the public release-note format, harden validation so shallow changelog text cannot pass, and update the published GitHub Release body after verification."
sections:
  Summary: |-
    Fix v0.6.0 release notes quality gate
    
    Rewrite the v0.6.0 release notes into the public release-note format, harden validation so shallow changelog text cannot pass, and update the published GitHub Release body after verification.
  Scope: |-
    - In scope: Rewrite the v0.6.0 release notes into the public release-note format, harden validation so shallow changelog text cannot pass, and update the published GitHub Release body after verification.
    - Out of scope: unrelated refactors not required for "Fix v0.6.0 release notes quality gate".
  Plan: "1. Rewrite docs/releases/v0.6.0.md from the release template: public Summary, Added, Improved, Fixed, Upgrade Notes, and Verification sections with concrete evidence. 2. Harden scripts/release/check-release-notes.mjs so release notes must have a real Release Notes heading and required sections, not just frontmatter or a generic Changes list. 3. Add focused release-note validation tests and update fixtures that intentionally represent valid notes. 4. Run the release-note checker, targeted release tests, routing check, and doctor. 5. Open/merge the task PR through branch_pr flow, then update the published GitHub Release body from the verified notes and verify readback."
  Verify Steps: |-
    PLANNER fallback scaffold for "Fix v0.6.0 release notes quality gate". Replace with task-specific acceptance checks when PLANNER context is available.
    
    1. Review the requested outcome for "Fix v0.6.0 release notes quality gate". Expected: the visible result matches ## Summary and stays inside approved scope.
    2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
    3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-14T13:32:01.561Z — VERIFY — ok
    
    By: CODER
    
    Note: Release notes quality gate verified: v0.6.0 notes now use the release template, validation rejects frontmatter-only headings and missing sections, and targeted release tests pass.
    Attempts: 0
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-14T13:16:33.628Z, excerpt_hash=sha256:7ff83bb635cb353793a4ca9c702f6beae42c496dfb421e0b51f1d15a88e00c33
    
    Details:
    
    Command: node scripts/release/check-release-notes.mjs --tag v0.6.0. Result: pass. Evidence: no output, exit 0. Scope: published v0.6.0 notes structure.
    Command: bunx prettier --check changed release-note files. Result: pass. Evidence: All matched files use Prettier code style. Scope: changed docs/scripts/tests.
    Command: bunx vitest run apply.preflight/apply-flow/version-mutation/push-recovery release tests. Result: pass. Evidence: 4 files passed, 24 tests passed. Scope: release-note validation and release apply/candidate flows.
    Command: node .agentplane/policy/check-routing.mjs. Result: pass. Evidence: policy routing OK. Scope: policy gateway routing.
    Command: agentplane doctor. Result: pass with warnings. Evidence: doctor OK, errors=0 warnings=2; warnings are pre-existing branch_pr normalization issues for unrelated shipped tasks.
    
    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605141314-QGDT9K-fix-v06-release-notes/.agentplane/tasks/202605141314-QGDT9K/blueprint/resolved-snapshot.json
    - old_digest: 4952652fde8bbb0bce6523d373afe56d79ecfdfd873765ff429d8f5539a2f014
    - current_digest: 4952652fde8bbb0bce6523d373afe56d79ecfdfd873765ff429d8f5539a2f014
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605141314-QGDT9K
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Fix v0.6.0 release notes quality gate

Rewrite the v0.6.0 release notes into the public release-note format, harden validation so shallow changelog text cannot pass, and update the published GitHub Release body after verification.

## Scope

- In scope: Rewrite the v0.6.0 release notes into the public release-note format, harden validation so shallow changelog text cannot pass, and update the published GitHub Release body after verification.
- Out of scope: unrelated refactors not required for "Fix v0.6.0 release notes quality gate".

## Plan

1. Rewrite docs/releases/v0.6.0.md from the release template: public Summary, Added, Improved, Fixed, Upgrade Notes, and Verification sections with concrete evidence. 2. Harden scripts/release/check-release-notes.mjs so release notes must have a real Release Notes heading and required sections, not just frontmatter or a generic Changes list. 3. Add focused release-note validation tests and update fixtures that intentionally represent valid notes. 4. Run the release-note checker, targeted release tests, routing check, and doctor. 5. Open/merge the task PR through branch_pr flow, then update the published GitHub Release body from the verified notes and verify readback.

## Verify Steps

PLANNER fallback scaffold for "Fix v0.6.0 release notes quality gate". Replace with task-specific acceptance checks when PLANNER context is available.

1. Review the requested outcome for "Fix v0.6.0 release notes quality gate". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-14T13:32:01.561Z — VERIFY — ok

By: CODER

Note: Release notes quality gate verified: v0.6.0 notes now use the release template, validation rejects frontmatter-only headings and missing sections, and targeted release tests pass.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-14T13:16:33.628Z, excerpt_hash=sha256:7ff83bb635cb353793a4ca9c702f6beae42c496dfb421e0b51f1d15a88e00c33

Details:

Command: node scripts/release/check-release-notes.mjs --tag v0.6.0. Result: pass. Evidence: no output, exit 0. Scope: published v0.6.0 notes structure.
Command: bunx prettier --check changed release-note files. Result: pass. Evidence: All matched files use Prettier code style. Scope: changed docs/scripts/tests.
Command: bunx vitest run apply.preflight/apply-flow/version-mutation/push-recovery release tests. Result: pass. Evidence: 4 files passed, 24 tests passed. Scope: release-note validation and release apply/candidate flows.
Command: node .agentplane/policy/check-routing.mjs. Result: pass. Evidence: policy routing OK. Scope: policy gateway routing.
Command: agentplane doctor. Result: pass with warnings. Evidence: doctor OK, errors=0 warnings=2; warnings are pre-existing branch_pr normalization issues for unrelated shipped tasks.

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605141314-QGDT9K-fix-v06-release-notes/.agentplane/tasks/202605141314-QGDT9K/blueprint/resolved-snapshot.json
- old_digest: 4952652fde8bbb0bce6523d373afe56d79ecfdfd873765ff429d8f5539a2f014
- current_digest: 4952652fde8bbb0bce6523d373afe56d79ecfdfd873765ff429d8f5539a2f014
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605141314-QGDT9K

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
