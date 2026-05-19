---
id: "202605190828-VFEE9F"
title: "Fix postpublish audit live asset verification"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 8
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "release"
  - "workflow"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-19T08:28:58.874Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-19T08:50:48.609Z"
  updated_by: "CODER"
  note: |-
    Review follow-up addressed: live GitHub Release asset evidence is now mandatory; unavailable gh/live evidence fails closed instead of falling back to planned embedded assets.

    Command: bunx vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/commands/release/audit-platform-publication-script.test.ts
    Result: pass
    Evidence: 1 file passed, 6 tests passed, duration 3.98s.
    Scope: focused postpublish audit regression tests including unavailable-live-evidence fail-closed case.

    Command: bunx prettier scripts/release/audit-platform-publication.mjs packages/agentplane/src/commands/release/audit-platform-publication-script.test.ts --check
    Result: pass
    Evidence: All matched files use Prettier code style.
    Scope: touched audit script and test.

    Command: bunx eslint scripts/release/audit-platform-publication.mjs packages/agentplane/src/commands/release/audit-platform-publication-script.test.ts
    Result: pass
    Evidence: no lint output, exit 0.
    Scope: touched audit script and test.

    Command: node scripts/release/audit-platform-publication.mjs --publish-result .agentplane/.release/vfee9f-audit/publish-result.json --json
    Result: pass
    Evidence: v0.6.3 publish-result returned ok=true with failures=[] using live GitHub Release asset lookup.
    Scope: real v0.6.3 publish-result and release assets.
  attempts: 0
commit: null
comments:
  -
    author: "CODER"
    body: "Start: Implement postpublish audit live asset verification in the dedicated task worktree with focused regression coverage for v0.6.3-style publish-result evidence."
events:
  -
    type: "status"
    at: "2026-05-19T08:29:57.922Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Implement postpublish audit live asset verification in the dedicated task worktree with focused regression coverage for v0.6.3-style publish-result evidence."
  -
    type: "verify"
    at: "2026-05-19T08:39:41.792Z"
    author: "CODER"
    state: "ok"
    note: |-
      Command: bunx vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/commands/release/audit-platform-publication-script.test.ts
      Result: pass
      Evidence: 1 file passed, 5 tests passed, duration 1.47s.
      Scope: focused postpublish audit regression tests.

      Command: bunx prettier scripts/release/audit-platform-publication.mjs packages/agentplane/src/commands/release/audit-platform-publication-script.test.ts --check
      Result: pass
      Evidence: All matched files use Prettier code style.
      Scope: touched audit script and test.

      Command: bunx eslint scripts/release/audit-platform-publication.mjs packages/agentplane/src/commands/release/audit-platform-publication-script.test.ts
      Result: pass
      Evidence: no lint output, exit 0.
      Scope: touched audit script and test.

      Command: node scripts/release/audit-platform-publication.mjs --publish-result .agentplane/.release/vfee9f-audit/publish-result.json --json
      Result: pass
      Evidence: v0.6.3 publish-result returned ok=true with failures=[].
      Scope: live GitHub Release asset lookup against the successful v0.6.3 publish-result.
  -
    type: "verify"
    at: "2026-05-19T08:50:48.609Z"
    author: "CODER"
    state: "ok"
    note: |-
      Review follow-up addressed: live GitHub Release asset evidence is now mandatory; unavailable gh/live evidence fails closed instead of falling back to planned embedded assets.

      Command: bunx vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/commands/release/audit-platform-publication-script.test.ts
      Result: pass
      Evidence: 1 file passed, 6 tests passed, duration 3.98s.
      Scope: focused postpublish audit regression tests including unavailable-live-evidence fail-closed case.

      Command: bunx prettier scripts/release/audit-platform-publication.mjs packages/agentplane/src/commands/release/audit-platform-publication-script.test.ts --check
      Result: pass
      Evidence: All matched files use Prettier code style.
      Scope: touched audit script and test.

      Command: bunx eslint scripts/release/audit-platform-publication.mjs packages/agentplane/src/commands/release/audit-platform-publication-script.test.ts
      Result: pass
      Evidence: no lint output, exit 0.
      Scope: touched audit script and test.

      Command: node scripts/release/audit-platform-publication.mjs --publish-result .agentplane/.release/vfee9f-audit/publish-result.json --json
      Result: pass
      Evidence: v0.6.3 publish-result returned ok=true with failures=[] using live GitHub Release asset lookup.
      Scope: real v0.6.3 publish-result and release assets.
doc_version: 3
doc_updated_at: "2026-05-19T08:50:48.684Z"
doc_updated_by: "CODER"
description: "Make the postpublish audit verify live GitHub Release assets instead of relying only on embedded release-distribution manifest entries, so release-distribution.json is not reported missing after a successful publish."
sections:
  Summary: |-
    Fix postpublish audit live asset verification

    Make the postpublish audit verify live GitHub Release assets instead of relying only on embedded release-distribution manifest entries, so release-distribution.json is not reported missing after a successful publish.
  Scope: |-
    - In scope: Make the postpublish audit verify live GitHub Release assets instead of relying only on embedded release-distribution manifest entries, so release-distribution.json is not reported missing after a successful publish.
    - Out of scope: unrelated refactors not required for "Fix postpublish audit live asset verification".
  Plan: "Fix postpublish audit live asset verification. Scope: scripts/release/audit-platform-publication.mjs and focused tests/fixtures only. Acceptance: audit checks required GitHub Release assets against live/retrieved asset names, keeps npm/tag/GHCR/external module checks, fails closed on missing assets, and no longer reports release-distribution.json missing for successful v0.6.3-style publication evidence. Follow-up backlog remains separate: wait-aware publish dispatch, declarative release version surfaces, pre-release task registry reconciliation."
  Verify Steps: |-
    1. Run the focused test for postpublish audit asset verification. Expected: audit passes when live GitHub Release assets include release-distribution.json even if embedded releaseAssets does not.
    2. Run the negative focused test. Expected: audit fails when a required live asset is absent.
    3. Run lint or exact-file validation for touched release audit code. Expected: no new lint/type errors in touched scope.
    4. Run `node scripts/release/audit-platform-publication.mjs --publish-result <fixture> --github-release-assets <fixture>`. Expected: command returns success for the v0.6.3-shaped fixture.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-19T08:39:41.792Z — VERIFY — ok

    By: CODER

    Note: Command: bunx vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/commands/release/audit-platform-publication-script.test.ts
    Result: pass
    Evidence: 1 file passed, 5 tests passed, duration 1.47s.
    Scope: focused postpublish audit regression tests.

    Command: bunx prettier scripts/release/audit-platform-publication.mjs packages/agentplane/src/commands/release/audit-platform-publication-script.test.ts --check
    Result: pass
    Evidence: All matched files use Prettier code style.
    Scope: touched audit script and test.

    Command: bunx eslint scripts/release/audit-platform-publication.mjs packages/agentplane/src/commands/release/audit-platform-publication-script.test.ts
    Result: pass
    Evidence: no lint output, exit 0.
    Scope: touched audit script and test.

    Command: node scripts/release/audit-platform-publication.mjs --publish-result .agentplane/.release/vfee9f-audit/publish-result.json --json
    Result: pass
    Evidence: v0.6.3 publish-result returned ok=true with failures=[].
    Scope: live GitHub Release asset lookup against the successful v0.6.3 publish-result.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-19T08:29:57.922Z, excerpt_hash=sha256:0eb23f32e740df1822ea65cafaf1287cfd7a6963a1565ebae8aed8150e6b74cb

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605190828-VFEE9F-postpublish-audit-live-assets/.agentplane/tasks/202605190828-VFEE9F/blueprint/resolved-snapshot.json
    - old_digest: c80ffcdce67020ae3a1f5183484db3557ba1aa2cc4bc46e176880b7cee0f8cc8
    - current_digest: c80ffcdce67020ae3a1f5183484db3557ba1aa2cc4bc46e176880b7cee0f8cc8
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605190828-VFEE9F

    ### 2026-05-19T08:50:48.609Z — VERIFY — ok

    By: CODER

    Note: Review follow-up addressed: live GitHub Release asset evidence is now mandatory; unavailable gh/live evidence fails closed instead of falling back to planned embedded assets.

    Command: bunx vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/commands/release/audit-platform-publication-script.test.ts
    Result: pass
    Evidence: 1 file passed, 6 tests passed, duration 3.98s.
    Scope: focused postpublish audit regression tests including unavailable-live-evidence fail-closed case.

    Command: bunx prettier scripts/release/audit-platform-publication.mjs packages/agentplane/src/commands/release/audit-platform-publication-script.test.ts --check
    Result: pass
    Evidence: All matched files use Prettier code style.
    Scope: touched audit script and test.

    Command: bunx eslint scripts/release/audit-platform-publication.mjs packages/agentplane/src/commands/release/audit-platform-publication-script.test.ts
    Result: pass
    Evidence: no lint output, exit 0.
    Scope: touched audit script and test.

    Command: node scripts/release/audit-platform-publication.mjs --publish-result .agentplane/.release/vfee9f-audit/publish-result.json --json
    Result: pass
    Evidence: v0.6.3 publish-result returned ok=true with failures=[] using live GitHub Release asset lookup.
    Scope: real v0.6.3 publish-result and release assets.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-19T08:39:41.844Z, excerpt_hash=sha256:0eb23f32e740df1822ea65cafaf1287cfd7a6963a1565ebae8aed8150e6b74cb

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605190828-VFEE9F-postpublish-audit-live-assets/.agentplane/tasks/202605190828-VFEE9F/blueprint/resolved-snapshot.json
    - old_digest: c80ffcdce67020ae3a1f5183484db3557ba1aa2cc4bc46e176880b7cee0f8cc8
    - current_digest: c80ffcdce67020ae3a1f5183484db3557ba1aa2cc4bc46e176880b7cee0f8cc8
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605190828-VFEE9F

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Fix postpublish audit live asset verification

Make the postpublish audit verify live GitHub Release assets instead of relying only on embedded release-distribution manifest entries, so release-distribution.json is not reported missing after a successful publish.

## Scope

- In scope: Make the postpublish audit verify live GitHub Release assets instead of relying only on embedded release-distribution manifest entries, so release-distribution.json is not reported missing after a successful publish.
- Out of scope: unrelated refactors not required for "Fix postpublish audit live asset verification".

## Plan

Fix postpublish audit live asset verification. Scope: scripts/release/audit-platform-publication.mjs and focused tests/fixtures only. Acceptance: audit checks required GitHub Release assets against live/retrieved asset names, keeps npm/tag/GHCR/external module checks, fails closed on missing assets, and no longer reports release-distribution.json missing for successful v0.6.3-style publication evidence. Follow-up backlog remains separate: wait-aware publish dispatch, declarative release version surfaces, pre-release task registry reconciliation.

## Verify Steps

1. Run the focused test for postpublish audit asset verification. Expected: audit passes when live GitHub Release assets include release-distribution.json even if embedded releaseAssets does not.
2. Run the negative focused test. Expected: audit fails when a required live asset is absent.
3. Run lint or exact-file validation for touched release audit code. Expected: no new lint/type errors in touched scope.
4. Run `node scripts/release/audit-platform-publication.mjs --publish-result <fixture> --github-release-assets <fixture>`. Expected: command returns success for the v0.6.3-shaped fixture.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-19T08:39:41.792Z — VERIFY — ok

By: CODER

Note: Command: bunx vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/commands/release/audit-platform-publication-script.test.ts
Result: pass
Evidence: 1 file passed, 5 tests passed, duration 1.47s.
Scope: focused postpublish audit regression tests.

Command: bunx prettier scripts/release/audit-platform-publication.mjs packages/agentplane/src/commands/release/audit-platform-publication-script.test.ts --check
Result: pass
Evidence: All matched files use Prettier code style.
Scope: touched audit script and test.

Command: bunx eslint scripts/release/audit-platform-publication.mjs packages/agentplane/src/commands/release/audit-platform-publication-script.test.ts
Result: pass
Evidence: no lint output, exit 0.
Scope: touched audit script and test.

Command: node scripts/release/audit-platform-publication.mjs --publish-result .agentplane/.release/vfee9f-audit/publish-result.json --json
Result: pass
Evidence: v0.6.3 publish-result returned ok=true with failures=[].
Scope: live GitHub Release asset lookup against the successful v0.6.3 publish-result.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-19T08:29:57.922Z, excerpt_hash=sha256:0eb23f32e740df1822ea65cafaf1287cfd7a6963a1565ebae8aed8150e6b74cb

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605190828-VFEE9F-postpublish-audit-live-assets/.agentplane/tasks/202605190828-VFEE9F/blueprint/resolved-snapshot.json
- old_digest: c80ffcdce67020ae3a1f5183484db3557ba1aa2cc4bc46e176880b7cee0f8cc8
- current_digest: c80ffcdce67020ae3a1f5183484db3557ba1aa2cc4bc46e176880b7cee0f8cc8
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605190828-VFEE9F

### 2026-05-19T08:50:48.609Z — VERIFY — ok

By: CODER

Note: Review follow-up addressed: live GitHub Release asset evidence is now mandatory; unavailable gh/live evidence fails closed instead of falling back to planned embedded assets.

Command: bunx vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/commands/release/audit-platform-publication-script.test.ts
Result: pass
Evidence: 1 file passed, 6 tests passed, duration 3.98s.
Scope: focused postpublish audit regression tests including unavailable-live-evidence fail-closed case.

Command: bunx prettier scripts/release/audit-platform-publication.mjs packages/agentplane/src/commands/release/audit-platform-publication-script.test.ts --check
Result: pass
Evidence: All matched files use Prettier code style.
Scope: touched audit script and test.

Command: bunx eslint scripts/release/audit-platform-publication.mjs packages/agentplane/src/commands/release/audit-platform-publication-script.test.ts
Result: pass
Evidence: no lint output, exit 0.
Scope: touched audit script and test.

Command: node scripts/release/audit-platform-publication.mjs --publish-result .agentplane/.release/vfee9f-audit/publish-result.json --json
Result: pass
Evidence: v0.6.3 publish-result returned ok=true with failures=[] using live GitHub Release asset lookup.
Scope: real v0.6.3 publish-result and release assets.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-19T08:39:41.844Z, excerpt_hash=sha256:0eb23f32e740df1822ea65cafaf1287cfd7a6963a1565ebae8aed8150e6b74cb

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605190828-VFEE9F-postpublish-audit-live-assets/.agentplane/tasks/202605190828-VFEE9F/blueprint/resolved-snapshot.json
- old_digest: c80ffcdce67020ae3a1f5183484db3557ba1aa2cc4bc46e176880b7cee0f8cc8
- current_digest: c80ffcdce67020ae3a1f5183484db3557ba1aa2cc4bc46e176880b7cee0f8cc8
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605190828-VFEE9F

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
