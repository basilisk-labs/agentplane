---
id: "202605150000-GNXMCA"
title: "Fix v0.6.1 publish payload drift"
result_summary: "Merged via PR #3778."
status: "DONE"
priority: "high"
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
  updated_at: "2026-05-15T00:00:23.444Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-15T00:02:00.386Z"
  updated_by: "CODER"
  note: "Release checks passed after updating ACR example payload to 0.6.1."
  attempts: 0
commit:
  hash: "03acb7398ddfef745f284a32090ede8e45df99be"
  message: "Merge pull request #3778 from basilisk-labs/task/202605150000-GNXMCA/fix-v061-publish-payload"
comments:
  -
    author: "CODER"
    body: "Start: Fixing the v0.6.1 publish validation drift in the release payload fixture, then rerunning exact release checks before opening the branch PR."
  -
    author: "INTEGRATOR"
    body: "Verified: PR #3778 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
events:
  -
    type: "status"
    at: "2026-05-15T00:00:33.722Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Fixing the v0.6.1 publish validation drift in the release payload fixture, then rerunning exact release checks before opening the branch PR."
  -
    type: "verify"
    at: "2026-05-15T00:02:00.386Z"
    author: "CODER"
    state: "ok"
    note: "Release checks passed after updating ACR example payload to 0.6.1."
  -
    type: "status"
    at: "2026-05-15T00:08:31.422Z"
    author: "INTEGRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: PR #3778 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
doc_version: 3
doc_updated_at: "2026-05-15T00:08:31.428Z"
doc_updated_by: "INTEGRATOR"
description: "Update the release payload fixtures so the v0.6.1 publish workflow passes exact-ref validation, then resume publication verification."
sections:
  Summary: |-
    Fix v0.6.1 publish payload drift
    
    Update the release payload fixtures so the v0.6.1 publish workflow passes exact-ref validation, then resume publication verification.
  Scope: |-
    - In scope: Update the release payload fixtures so the v0.6.1 publish workflow passes exact-ref validation, then resume publication verification.
    - Out of scope: unrelated refactors not required for "Fix v0.6.1 publish payload drift".
  Plan: "Plan: fix v0.6.1 exact-ref publish validation by updating only stale release payload fixture versions first; run node scripts/checks/check-acr-example-version.mjs, bun run release:check, and targeted release metadata checks; open a small branch_pr PR; after merge, dispatch Publish release with the canonical release SHA and verify external distribution surfaces."
  Verify Steps: |-
    PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.
    
    1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
    3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-15T00:02:00.386Z — VERIFY — ok
    
    By: CODER
    
    Note: Release checks passed after updating ACR example payload to 0.6.1.
    Attempts: 0
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-15T00:00:33.722Z, excerpt_hash=sha256:4067e6c0d2671944bbb825f93b0ba7363aab826f8b2f3d8fbcbd2a2e4f1204c6
    
    Details:
    
    Command: node scripts/checks/check-acr-example-version.mjs | Result: pass | Evidence: ACR example version OK (0.6.1) | Scope: packages/spec/examples/acr.json release payload.
    Command: bun run release:check | Result: pass | Evidence: incidents gate, ACR gate, package builds, tarball policy, and blueprint release gate passed | Scope: v0.6.1 publish exact-ref validation.
    Command: node scripts/check-release-version.mjs --tag v0.6.1 and node scripts/check-release-notes.mjs --tag v0.6.1 | Result: pass | Evidence: both exited 0 | Scope: version and release notes parity.
    
    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605150000-GNXMCA-fix-v061-publish-payload/.agentplane/tasks/202605150000-GNXMCA/blueprint/resolved-snapshot.json
    - old_digest: 78fcea3addd639bcd39aaa1b9d201552f50ebab498cadfffeabbe872288610b2
    - current_digest: 78fcea3addd639bcd39aaa1b9d201552f50ebab498cadfffeabbe872288610b2
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605150000-GNXMCA
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Fix v0.6.1 publish payload drift

Update the release payload fixtures so the v0.6.1 publish workflow passes exact-ref validation, then resume publication verification.

## Scope

- In scope: Update the release payload fixtures so the v0.6.1 publish workflow passes exact-ref validation, then resume publication verification.
- Out of scope: unrelated refactors not required for "Fix v0.6.1 publish payload drift".

## Plan

Plan: fix v0.6.1 exact-ref publish validation by updating only stale release payload fixture versions first; run node scripts/checks/check-acr-example-version.mjs, bun run release:check, and targeted release metadata checks; open a small branch_pr PR; after merge, dispatch Publish release with the canonical release SHA and verify external distribution surfaces.

## Verify Steps

PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.

1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-15T00:02:00.386Z — VERIFY — ok

By: CODER

Note: Release checks passed after updating ACR example payload to 0.6.1.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-15T00:00:33.722Z, excerpt_hash=sha256:4067e6c0d2671944bbb825f93b0ba7363aab826f8b2f3d8fbcbd2a2e4f1204c6

Details:

Command: node scripts/checks/check-acr-example-version.mjs | Result: pass | Evidence: ACR example version OK (0.6.1) | Scope: packages/spec/examples/acr.json release payload.
Command: bun run release:check | Result: pass | Evidence: incidents gate, ACR gate, package builds, tarball policy, and blueprint release gate passed | Scope: v0.6.1 publish exact-ref validation.
Command: node scripts/check-release-version.mjs --tag v0.6.1 and node scripts/check-release-notes.mjs --tag v0.6.1 | Result: pass | Evidence: both exited 0 | Scope: version and release notes parity.

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605150000-GNXMCA-fix-v061-publish-payload/.agentplane/tasks/202605150000-GNXMCA/blueprint/resolved-snapshot.json
- old_digest: 78fcea3addd639bcd39aaa1b9d201552f50ebab498cadfffeabbe872288610b2
- current_digest: 78fcea3addd639bcd39aaa1b9d201552f50ebab498cadfffeabbe872288610b2
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605150000-GNXMCA

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
