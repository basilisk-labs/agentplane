---
id: "202605170905-RZ8M15"
title: "Minimize branch_pr generated artifacts"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 5
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "workflow"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-17T09:06:02.588Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-18T10:54:03.816Z"
  updated_by: "CODER"
  note: "Command: bun run test:project agentplane -- run-cli.core.init.test.ts; Result: pass; Evidence: 287 files passed, 1646 tests passed, 2 skipped. Command: bun run typecheck; Result: pass. Command: bun run format:changed; Result: pass. Command: node .agentplane/policy/check-routing.mjs; Result: pass. Command: git check-ignore for handoff and local-backups paths; Result: pass. Command: git push origin task/202605170905-RZ8M15/untracked-artifacts; Result: pass with pre-push fast CI."
  attempts: 0
commit: null
comments:
  -
    author: "CODER"
    body: "Start: investigating untracked branch_pr artifacts and tightening generated artifact handling so repo status does not accumulate transient files."
events:
  -
    type: "status"
    at: "2026-05-18T10:46:46.303Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: investigating untracked branch_pr artifacts and tightening generated artifact handling so repo status does not accumulate transient files."
  -
    type: "verify"
    at: "2026-05-18T10:54:03.816Z"
    author: "CODER"
    state: "ok"
    note: "Command: bun run test:project agentplane -- run-cli.core.init.test.ts; Result: pass; Evidence: 287 files passed, 1646 tests passed, 2 skipped. Command: bun run typecheck; Result: pass. Command: bun run format:changed; Result: pass. Command: node .agentplane/policy/check-routing.mjs; Result: pass. Command: git check-ignore for handoff and local-backups paths; Result: pass. Command: git push origin task/202605170905-RZ8M15/untracked-artifacts; Result: pass with pre-push fast CI."
doc_version: 3
doc_updated_at: "2026-05-18T10:54:03.828Z"
doc_updated_by: "CODER"
description: "Reduce non-canonical generated artifacts in branch_pr while preserving compact traceability via README, ACR, PR metadata, and reconstructable digests."
sections:
  Summary: |-
    Minimize branch_pr generated artifacts

    Reduce non-canonical generated artifacts in branch_pr while preserving compact traceability via README, ACR, PR metadata, and reconstructable digests.
  Scope: |-
    - In scope: Reduce non-canonical generated artifacts in branch_pr while preserving compact traceability via README, ACR, PR metadata, and reconstructable digests.
    - Out of scope: unrelated refactors not required for "Minimize branch_pr generated artifacts".
  Plan: |-
    1. Audit current artifact writers for handoff history, blueprint snapshots, PR projections, ACR, runner/debug artifacts, and website social PNG generation.
    2. Implement compact tracked trace policy: keep canonical README/ACR/pr meta; move handoff history and reconstructable/generated projections to cache or on-demand paths; preserve digest/ref evidence needed to reconstruct full blueprint state.
    3. Add focused tests for drift classification, artifact writes, and any cache/manifest behavior changed.
    4. Run task verify-show plus focused test suite and record verification evidence.
  Verify Steps: |-
    PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.

    1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
    3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-18T10:54:03.816Z — VERIFY — ok

    By: CODER

    Note: Command: bun run test:project agentplane -- run-cli.core.init.test.ts; Result: pass; Evidence: 287 files passed, 1646 tests passed, 2 skipped. Command: bun run typecheck; Result: pass. Command: bun run format:changed; Result: pass. Command: node .agentplane/policy/check-routing.mjs; Result: pass. Command: git check-ignore for handoff and local-backups paths; Result: pass. Command: git push origin task/202605170905-RZ8M15/untracked-artifacts; Result: pass with pre-push fast CI.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-18T10:46:46.303Z, excerpt_hash=sha256:4067e6c0d2671944bbb825f93b0ba7363aab826f8b2f3d8fbcbd2a2e4f1204c6

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605170905-RZ8M15-untracked-artifacts/.agentplane/tasks/202605170905-RZ8M15/blueprint/resolved-snapshot.json
    - old_digest: 3b0423f92893ac48504120a6dc6f71078f8000a7d2f18bc6c1197bf9bfb70ded
    - current_digest: 3b0423f92893ac48504120a6dc6f71078f8000a7d2f18bc6c1197bf9bfb70ded
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605170905-RZ8M15

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Minimize branch_pr generated artifacts

Reduce non-canonical generated artifacts in branch_pr while preserving compact traceability via README, ACR, PR metadata, and reconstructable digests.

## Scope

- In scope: Reduce non-canonical generated artifacts in branch_pr while preserving compact traceability via README, ACR, PR metadata, and reconstructable digests.
- Out of scope: unrelated refactors not required for "Minimize branch_pr generated artifacts".

## Plan

1. Audit current artifact writers for handoff history, blueprint snapshots, PR projections, ACR, runner/debug artifacts, and website social PNG generation.
2. Implement compact tracked trace policy: keep canonical README/ACR/pr meta; move handoff history and reconstructable/generated projections to cache or on-demand paths; preserve digest/ref evidence needed to reconstruct full blueprint state.
3. Add focused tests for drift classification, artifact writes, and any cache/manifest behavior changed.
4. Run task verify-show plus focused test suite and record verification evidence.

## Verify Steps

PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.

1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-18T10:54:03.816Z — VERIFY — ok

By: CODER

Note: Command: bun run test:project agentplane -- run-cli.core.init.test.ts; Result: pass; Evidence: 287 files passed, 1646 tests passed, 2 skipped. Command: bun run typecheck; Result: pass. Command: bun run format:changed; Result: pass. Command: node .agentplane/policy/check-routing.mjs; Result: pass. Command: git check-ignore for handoff and local-backups paths; Result: pass. Command: git push origin task/202605170905-RZ8M15/untracked-artifacts; Result: pass with pre-push fast CI.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-18T10:46:46.303Z, excerpt_hash=sha256:4067e6c0d2671944bbb825f93b0ba7363aab826f8b2f3d8fbcbd2a2e4f1204c6

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605170905-RZ8M15-untracked-artifacts/.agentplane/tasks/202605170905-RZ8M15/blueprint/resolved-snapshot.json
- old_digest: 3b0423f92893ac48504120a6dc6f71078f8000a7d2f18bc6c1197bf9bfb70ded
- current_digest: 3b0423f92893ac48504120a6dc6f71078f8000a7d2f18bc6c1197bf9bfb70ded
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605170905-RZ8M15

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
