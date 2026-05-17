---
id: "202605171241-TTZEGQ"
title: "Harden release platform publication guidance"
result_summary: "Merged via PR #3830."
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
  updated_at: "2026-05-17T12:41:30.286Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-17T12:47:49.344Z"
  updated_by: "CODER"
  note: "Command: bun run test:project -- agentplane packages/agentplane/src/commands/release/audit-platform-publication-script.test.ts packages/agentplane/src/commands/release/write-publish-result-manifest-script.test.ts packages/agentplane/src/commands/release/publish-workflow-contract.test.ts | Result: pass | Evidence: 3 files, 16 tests passed. Command: bun run docs:scripts:check | Result: pass | Evidence: scripts/README.md up to date. Command: node .agentplane/policy/check-routing.mjs | Result: pass | Evidence: policy routing OK. Command: ap doctor | Result: pass with existing warnings | Evidence: doctor OK, warnings are pre-existing hook/runtime/branch_pr reconciliation drift outside this task."
  attempts: 0
commit:
  hash: "764d27b18c603de675e36c94dbfee135c2087674"
  message: "Merge pull request #3830 from basilisk-labs/task/202605171241-TTZEGQ/release-platform-evidence"
comments:
  -
    author: "CODER"
    body: "Start: Hardening release publication evidence flow in a dedicated worktree from origin/main because base main is dirty and behind; scope is limited to release audit tooling, release skill guidance, and focused tests."
  -
    author: "INTEGRATOR"
    body: "Verified: PR #3830 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
events:
  -
    type: "status"
    at: "2026-05-17T12:42:41.830Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Hardening release publication evidence flow in a dedicated worktree from origin/main because base main is dirty and behind; scope is limited to release audit tooling, release skill guidance, and focused tests."
  -
    type: "verify"
    at: "2026-05-17T12:47:49.344Z"
    author: "CODER"
    state: "ok"
    note: "Command: bun run test:project -- agentplane packages/agentplane/src/commands/release/audit-platform-publication-script.test.ts packages/agentplane/src/commands/release/write-publish-result-manifest-script.test.ts packages/agentplane/src/commands/release/publish-workflow-contract.test.ts | Result: pass | Evidence: 3 files, 16 tests passed. Command: bun run docs:scripts:check | Result: pass | Evidence: scripts/README.md up to date. Command: node .agentplane/policy/check-routing.mjs | Result: pass | Evidence: policy routing OK. Command: ap doctor | Result: pass with existing warnings | Evidence: doctor OK, warnings are pre-existing hook/runtime/branch_pr reconciliation drift outside this task."
  -
    type: "status"
    at: "2026-05-17T13:19:24.940Z"
    author: "INTEGRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: PR #3830 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
doc_version: 3
doc_updated_at: "2026-05-17T13:19:24.947Z"
doc_updated_by: "INTEGRATOR"
description: "Update AgentPlane release guidance so agents verify every publication platform and cannot treat external distribution handoffs as completed releases without evidence."
sections:
  Summary: |-
    Harden release platform publication guidance

    Update AgentPlane release guidance so agents verify every publication platform and cannot treat external distribution handoffs as completed releases without evidence.
  Scope: |-
    - In scope: Update AgentPlane release guidance so agents verify every publication platform and cannot treat external distribution handoffs as completed releases without evidence.
    - Out of scope: unrelated refactors not required for "Harden release platform publication guidance".
  Plan: "Plan: 1. Start a dedicated branch_pr worktree for CODER. 2. Update the existing agentplane-release-and-packaging-operator skill with the current multi-platform publication matrix, fail-closed evidence rules, and recovery workflow commands. 3. Add or tighten automated checks around publish-result/external distribution evidence so a release cannot be represented as complete when Homebrew/Scoop/setup-agentplane are only PR-opened or skipped. 4. Run focused release workflow/tooling tests plus policy routing checks; record any skipped checks with blocker/risk."
  Verify Steps: |-
    1. Run `bun run release:postpublish:audit -- --publish-result <fixture-or-artifact>` against success and incomplete publish-result fixtures. Expected: success passes; incomplete external handoff fails.
    2. Run focused release tests covering publish-result and post-publish audit behavior. Expected: tests pass.
    3. Run `node .agentplane/policy/check-routing.mjs`. Expected: policy routing remains valid.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-17T12:47:49.344Z — VERIFY — ok

    By: CODER

    Note: Command: bun run test:project -- agentplane packages/agentplane/src/commands/release/audit-platform-publication-script.test.ts packages/agentplane/src/commands/release/write-publish-result-manifest-script.test.ts packages/agentplane/src/commands/release/publish-workflow-contract.test.ts | Result: pass | Evidence: 3 files, 16 tests passed. Command: bun run docs:scripts:check | Result: pass | Evidence: scripts/README.md up to date. Command: node .agentplane/policy/check-routing.mjs | Result: pass | Evidence: policy routing OK. Command: ap doctor | Result: pass with existing warnings | Evidence: doctor OK, warnings are pre-existing hook/runtime/branch_pr reconciliation drift outside this task.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-17T12:42:41.830Z, excerpt_hash=sha256:f95f496930725f67cfc4e17b5a1157759e530e3d7f21bf11cc1bea4f692e3088

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605171241-TTZEGQ-release-platform-evidence/.agentplane/tasks/202605171241-TTZEGQ/blueprint/resolved-snapshot.json
    - old_digest: 4becffa5218d494c8ded7faaa641bb92f1e40dd9f10c3bf4bd3cb1d44943fbb9
    - current_digest: 4becffa5218d494c8ded7faaa641bb92f1e40dd9f10c3bf4bd3cb1d44943fbb9
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605171241-TTZEGQ

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Harden release platform publication guidance

Update AgentPlane release guidance so agents verify every publication platform and cannot treat external distribution handoffs as completed releases without evidence.

## Scope

- In scope: Update AgentPlane release guidance so agents verify every publication platform and cannot treat external distribution handoffs as completed releases without evidence.
- Out of scope: unrelated refactors not required for "Harden release platform publication guidance".

## Plan

Plan: 1. Start a dedicated branch_pr worktree for CODER. 2. Update the existing agentplane-release-and-packaging-operator skill with the current multi-platform publication matrix, fail-closed evidence rules, and recovery workflow commands. 3. Add or tighten automated checks around publish-result/external distribution evidence so a release cannot be represented as complete when Homebrew/Scoop/setup-agentplane are only PR-opened or skipped. 4. Run focused release workflow/tooling tests plus policy routing checks; record any skipped checks with blocker/risk.

## Verify Steps

1. Run `bun run release:postpublish:audit -- --publish-result <fixture-or-artifact>` against success and incomplete publish-result fixtures. Expected: success passes; incomplete external handoff fails.
2. Run focused release tests covering publish-result and post-publish audit behavior. Expected: tests pass.
3. Run `node .agentplane/policy/check-routing.mjs`. Expected: policy routing remains valid.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-17T12:47:49.344Z — VERIFY — ok

By: CODER

Note: Command: bun run test:project -- agentplane packages/agentplane/src/commands/release/audit-platform-publication-script.test.ts packages/agentplane/src/commands/release/write-publish-result-manifest-script.test.ts packages/agentplane/src/commands/release/publish-workflow-contract.test.ts | Result: pass | Evidence: 3 files, 16 tests passed. Command: bun run docs:scripts:check | Result: pass | Evidence: scripts/README.md up to date. Command: node .agentplane/policy/check-routing.mjs | Result: pass | Evidence: policy routing OK. Command: ap doctor | Result: pass with existing warnings | Evidence: doctor OK, warnings are pre-existing hook/runtime/branch_pr reconciliation drift outside this task.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-17T12:42:41.830Z, excerpt_hash=sha256:f95f496930725f67cfc4e17b5a1157759e530e3d7f21bf11cc1bea4f692e3088

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605171241-TTZEGQ-release-platform-evidence/.agentplane/tasks/202605171241-TTZEGQ/blueprint/resolved-snapshot.json
- old_digest: 4becffa5218d494c8ded7faaa641bb92f1e40dd9f10c3bf4bd3cb1d44943fbb9
- current_digest: 4becffa5218d494c8ded7faaa641bb92f1e40dd9f10c3bf4bd3cb1d44943fbb9
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605171241-TTZEGQ

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
