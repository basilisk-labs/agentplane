---
id: "202605270820-6AM6AH"
title: "Clarify untracked git status preflight"
status: "DOING"
priority: "med"
owner: "CODER"
revision: 7
origin:
  system: "manual"
depends_on: []
tags:
  - "docs"
  - "workflow"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-27T08:21:15.751Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-27T09:17:52.522Z"
  updated_by: "CODER"
  note: "Command: bun run format:check. Result: pass. Evidence: All matched files use Prettier code style after hosted verify-contract failure. Scope: full repository formatting contract. Command: node .agentplane/policy/check-routing.mjs. Result: pass. Evidence: policy routing OK with AGENTS.md line budget at 248 wc lines. Scope: policy gateway budget. Command: git diff --check. Result: pass. Evidence: no whitespace errors. Scope: follow-up formatting fix."
  attempts: 0
commit: null
comments:
  -
    author: "CODER"
    body: "Start: Clarify the bootstrap git status contract so tracked-only cleanliness remains explicit while agents also inspect full working-tree changes, including untracked files."
events:
  -
    type: "status"
    at: "2026-05-27T08:21:50.308Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Clarify the bootstrap git status contract so tracked-only cleanliness remains explicit while agents also inspect full working-tree changes, including untracked files."
  -
    type: "verify"
    at: "2026-05-27T08:27:10.010Z"
    author: "CODER"
    state: "ok"
    note: "Command: node .agentplane/policy/check-routing.mjs. Result: pass. Evidence: policy routing OK after keeping AGENTS.md at 249 lines. Scope: AGENTS gateway and policy budget. Command: agentplane doctor. Result: pass. Evidence: doctor OK with informational runtime findings only. Scope: repository health. Command: bun x vitest run packages/agentplane/src/cli/command-guide.test.ts --hookTimeout 60000 --testTimeout 60000. Result: pass. Evidence: 1 file, 8 tests passed. Scope: quickstart/bootstrap rendering. Command: bun run docs:bootstrap:check. Result: pass. Evidence: generated bootstrap doc and startup command blocks aligned. Scope: generated docs freshness. Command: git diff --check. Result: pass. Evidence: no whitespace errors. Scope: final diff."
  -
    type: "verify"
    at: "2026-05-27T09:17:52.522Z"
    author: "CODER"
    state: "ok"
    note: "Command: bun run format:check. Result: pass. Evidence: All matched files use Prettier code style after hosted verify-contract failure. Scope: full repository formatting contract. Command: node .agentplane/policy/check-routing.mjs. Result: pass. Evidence: policy routing OK with AGENTS.md line budget at 248 wc lines. Scope: policy gateway budget. Command: git diff --check. Result: pass. Evidence: no whitespace errors. Scope: follow-up formatting fix."
doc_version: 3
doc_updated_at: "2026-05-27T09:17:52.585Z"
doc_updated_by: "CODER"
description: "Clarify bootstrap and policy preflight so agents distinguish tracked-only cleanliness from full working-tree changes including untracked files."
sections:
  Summary: |-
    Clarify untracked git status preflight

    Clarify bootstrap and policy preflight so agents distinguish tracked-only cleanliness from full working-tree changes including untracked files.
  Scope: |-
    - In scope: Clarify bootstrap and policy preflight so agents distinguish tracked-only cleanliness from full working-tree changes including untracked files.
    - Out of scope: unrelated refactors not required for "Clarify untracked git status preflight".
  Plan: |-
    1. Update bootstrap/preflight command surfaces to show both tracked-only cleanliness and full working-tree changes.
    2. Regenerate or update derived user docs/assets that mirror bootstrap guidance.
    3. Add or adjust focused tests/snapshots for the new preflight command contract.
    4. Verify routing, doctor, and targeted tests; record evidence in the task.
  Verify Steps: |-
    1. Run node .agentplane/policy/check-routing.mjs. Expected: routing budgets and policy graph pass.
    2. Run agentplane doctor. Expected: no actionable repository health failures.
    3. Run bun x vitest run packages/agentplane/src/cli/command-guide.test.ts --hookTimeout 60000 --testTimeout 60000. Expected: bootstrap/quickstart rendering covers both tracked-only and full working-tree status guidance.
    4. Run bun run docs:bootstrap:check. Expected: generated bootstrap docs are fresh.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-27T08:27:10.010Z — VERIFY — ok

    By: CODER

    Note: Command: node .agentplane/policy/check-routing.mjs. Result: pass. Evidence: policy routing OK after keeping AGENTS.md at 249 lines. Scope: AGENTS gateway and policy budget. Command: agentplane doctor. Result: pass. Evidence: doctor OK with informational runtime findings only. Scope: repository health. Command: bun x vitest run packages/agentplane/src/cli/command-guide.test.ts --hookTimeout 60000 --testTimeout 60000. Result: pass. Evidence: 1 file, 8 tests passed. Scope: quickstart/bootstrap rendering. Command: bun run docs:bootstrap:check. Result: pass. Evidence: generated bootstrap doc and startup command blocks aligned. Scope: generated docs freshness. Command: git diff --check. Result: pass. Evidence: no whitespace errors. Scope: final diff.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-27T08:22:58.187Z, excerpt_hash=sha256:6bbc6e3af6769374dc59031f9180da0f387ce40a698c5f080eeff2dc81939ccc

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605270820-6AM6AH-clarify-untracked-preflight/.agentplane/tasks/202605270820-6AM6AH/blueprint/resolved-snapshot.json
    - old_digest: 6ea1f362fda19107e2e6cb3747d26a0646d2bd3344c34feae8fed42a89a5ac78
    - current_digest: 6ea1f362fda19107e2e6cb3747d26a0646d2bd3344c34feae8fed42a89a5ac78
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605270820-6AM6AH

    ### 2026-05-27T09:17:52.522Z — VERIFY — ok

    By: CODER

    Note: Command: bun run format:check. Result: pass. Evidence: All matched files use Prettier code style after hosted verify-contract failure. Scope: full repository formatting contract. Command: node .agentplane/policy/check-routing.mjs. Result: pass. Evidence: policy routing OK with AGENTS.md line budget at 248 wc lines. Scope: policy gateway budget. Command: git diff --check. Result: pass. Evidence: no whitespace errors. Scope: follow-up formatting fix.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-27T08:27:10.028Z, excerpt_hash=sha256:6bbc6e3af6769374dc59031f9180da0f387ce40a698c5f080eeff2dc81939ccc

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605270820-6AM6AH-clarify-untracked-preflight/.agentplane/tasks/202605270820-6AM6AH/blueprint/resolved-snapshot.json
    - old_digest: 6ea1f362fda19107e2e6cb3747d26a0646d2bd3344c34feae8fed42a89a5ac78
    - current_digest: 6ea1f362fda19107e2e6cb3747d26a0646d2bd3344c34feae8fed42a89a5ac78
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605270820-6AM6AH

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Clarify untracked git status preflight

Clarify bootstrap and policy preflight so agents distinguish tracked-only cleanliness from full working-tree changes including untracked files.

## Scope

- In scope: Clarify bootstrap and policy preflight so agents distinguish tracked-only cleanliness from full working-tree changes including untracked files.
- Out of scope: unrelated refactors not required for "Clarify untracked git status preflight".

## Plan

1. Update bootstrap/preflight command surfaces to show both tracked-only cleanliness and full working-tree changes.
2. Regenerate or update derived user docs/assets that mirror bootstrap guidance.
3. Add or adjust focused tests/snapshots for the new preflight command contract.
4. Verify routing, doctor, and targeted tests; record evidence in the task.

## Verify Steps

1. Run node .agentplane/policy/check-routing.mjs. Expected: routing budgets and policy graph pass.
2. Run agentplane doctor. Expected: no actionable repository health failures.
3. Run bun x vitest run packages/agentplane/src/cli/command-guide.test.ts --hookTimeout 60000 --testTimeout 60000. Expected: bootstrap/quickstart rendering covers both tracked-only and full working-tree status guidance.
4. Run bun run docs:bootstrap:check. Expected: generated bootstrap docs are fresh.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-27T08:27:10.010Z — VERIFY — ok

By: CODER

Note: Command: node .agentplane/policy/check-routing.mjs. Result: pass. Evidence: policy routing OK after keeping AGENTS.md at 249 lines. Scope: AGENTS gateway and policy budget. Command: agentplane doctor. Result: pass. Evidence: doctor OK with informational runtime findings only. Scope: repository health. Command: bun x vitest run packages/agentplane/src/cli/command-guide.test.ts --hookTimeout 60000 --testTimeout 60000. Result: pass. Evidence: 1 file, 8 tests passed. Scope: quickstart/bootstrap rendering. Command: bun run docs:bootstrap:check. Result: pass. Evidence: generated bootstrap doc and startup command blocks aligned. Scope: generated docs freshness. Command: git diff --check. Result: pass. Evidence: no whitespace errors. Scope: final diff.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-27T08:22:58.187Z, excerpt_hash=sha256:6bbc6e3af6769374dc59031f9180da0f387ce40a698c5f080eeff2dc81939ccc

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605270820-6AM6AH-clarify-untracked-preflight/.agentplane/tasks/202605270820-6AM6AH/blueprint/resolved-snapshot.json
- old_digest: 6ea1f362fda19107e2e6cb3747d26a0646d2bd3344c34feae8fed42a89a5ac78
- current_digest: 6ea1f362fda19107e2e6cb3747d26a0646d2bd3344c34feae8fed42a89a5ac78
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605270820-6AM6AH

### 2026-05-27T09:17:52.522Z — VERIFY — ok

By: CODER

Note: Command: bun run format:check. Result: pass. Evidence: All matched files use Prettier code style after hosted verify-contract failure. Scope: full repository formatting contract. Command: node .agentplane/policy/check-routing.mjs. Result: pass. Evidence: policy routing OK with AGENTS.md line budget at 248 wc lines. Scope: policy gateway budget. Command: git diff --check. Result: pass. Evidence: no whitespace errors. Scope: follow-up formatting fix.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-27T08:27:10.028Z, excerpt_hash=sha256:6bbc6e3af6769374dc59031f9180da0f387ce40a698c5f080eeff2dc81939ccc

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605270820-6AM6AH-clarify-untracked-preflight/.agentplane/tasks/202605270820-6AM6AH/blueprint/resolved-snapshot.json
- old_digest: 6ea1f362fda19107e2e6cb3747d26a0646d2bd3344c34feae8fed42a89a5ac78
- current_digest: 6ea1f362fda19107e2e6cb3747d26a0646d2bd3344c34feae8fed42a89a5ac78
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605270820-6AM6AH

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
