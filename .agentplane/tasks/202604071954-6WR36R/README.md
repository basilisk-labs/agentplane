---
id: "202604071954-6WR36R"
title: "Make integrate recover from repairable PR artifact drift"
result_summary: "Merged via PR #134."
status: "DONE"
priority: "high"
owner: "CODER"
revision: 8
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "github"
  - "workflow"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-04-07T19:59:31.745Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-04-07T20:53:31.375Z"
  updated_by: "CODER"
  note: "Refreshed verification after rebase onto origin/main. Checks remain valid for the rebased head because the code diff did not change; only parent history changed."
commit:
  hash: "f4ab2104dd6bea55ddb781a85c1663acb128c8ef"
  message: "github/workflow: Make integrate recover from repairable PR artifact drift (6WR36R) (#134)"
comments:
  -
    author: "CODER"
    body: "Start: repair integrate/pr-check handling for refreshable PR artifact drift while preserving strict failures for real branch divergence."
  -
    author: "INTEGRATOR"
    body: "Verified: PR #134 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
events:
  -
    type: "status"
    at: "2026-04-07T20:28:06.097Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: repair integrate/pr-check handling for refreshable PR artifact drift while preserving strict failures for real branch divergence."
  -
    type: "verify"
    at: "2026-04-07T20:47:13.337Z"
    author: "CODER"
    state: "ok"
    note: "Checks: bun x vitest run packages/agentplane/src/commands/pr/integrate/internal/prepare.test.ts; bun x vitest run packages/agentplane/src/cli/run-cli.core.pr-flow.pr.test.ts -t 'pr check'; bun x eslint packages/agentplane/src/commands/pr/internal/freshness.ts packages/agentplane/src/commands/pr/check.ts packages/agentplane/src/commands/pr/integrate/internal/prepare.ts packages/agentplane/src/commands/pr/integrate/internal/prepare.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.pr.test.ts. Evidence: pr check now recovers missing verify metadata only when task verification or verify.log proves current-head freshness, while real stale verify-sha drift still fails."
  -
    type: "verify"
    at: "2026-04-07T20:53:31.375Z"
    author: "CODER"
    state: "ok"
    note: "Refreshed verification after rebase onto origin/main. Checks remain valid for the rebased head because the code diff did not change; only parent history changed."
  -
    type: "status"
    at: "2026-04-07T21:04:29.432Z"
    author: "INTEGRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: PR #134 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
doc_version: 3
doc_updated_at: "2026-04-07T21:04:29.438Z"
doc_updated_by: "INTEGRATOR"
description: "Allow branch_pr integrate to repair or tolerate refreshable pr/meta.json and verify-sha drift instead of hard-failing on recoverable projection mismatches."
sections:
  Summary: |-
    Make integrate recover from repairable PR artifact drift
    
    Allow branch_pr integrate to repair or tolerate refreshable pr/meta.json and verify-sha drift instead of hard-failing on recoverable projection mismatches.
  Scope: |-
    - In scope: Allow branch_pr integrate to repair or tolerate refreshable pr/meta.json and verify-sha drift instead of hard-failing on recoverable projection mismatches.
    - Out of scope: unrelated refactors not required for "Make integrate recover from repairable PR artifact drift".
  Plan: "Teach integrate and adjacent PR artifact refresh paths to treat missing or stale projection files as repairable when the branch snapshot is authoritative, while keeping strict failures for real branch drift."
  Verify Steps: |-
    1. Run focused integrate tests. Expected: recoverable pr/meta.json or verify-sha drift no longer hard-fails integrate.
    2. Exercise strict drift coverage. Expected: real branch drift still fails with an explicit validation error.
    3. Run focused lint on touched integrate files. Expected: repaired artifact-refresh paths lint cleanly.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-07T20:47:13.337Z — VERIFY — ok
    
    By: CODER
    
    Note: Checks: bun x vitest run packages/agentplane/src/commands/pr/integrate/internal/prepare.test.ts; bun x vitest run packages/agentplane/src/cli/run-cli.core.pr-flow.pr.test.ts -t 'pr check'; bun x eslint packages/agentplane/src/commands/pr/internal/freshness.ts packages/agentplane/src/commands/pr/check.ts packages/agentplane/src/commands/pr/integrate/internal/prepare.ts packages/agentplane/src/commands/pr/integrate/internal/prepare.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.pr.test.ts. Evidence: pr check now recovers missing verify metadata only when task verification or verify.log proves current-head freshness, while real stale verify-sha drift still fails.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-07T20:28:06.106Z, excerpt_hash=sha256:1a3def187f7dc53641cdf9e5a826f814531967db06217c3ee6d9a782b614e533
    
    ### 2026-04-07T20:53:31.375Z — VERIFY — ok
    
    By: CODER
    
    Note: Refreshed verification after rebase onto origin/main. Checks remain valid for the rebased head because the code diff did not change; only parent history changed.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-07T20:47:13.340Z, excerpt_hash=sha256:1a3def187f7dc53641cdf9e5a826f814531967db06217c3ee6d9a782b614e533
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Make integrate recover from repairable PR artifact drift

Allow branch_pr integrate to repair or tolerate refreshable pr/meta.json and verify-sha drift instead of hard-failing on recoverable projection mismatches.

## Scope

- In scope: Allow branch_pr integrate to repair or tolerate refreshable pr/meta.json and verify-sha drift instead of hard-failing on recoverable projection mismatches.
- Out of scope: unrelated refactors not required for "Make integrate recover from repairable PR artifact drift".

## Plan

Teach integrate and adjacent PR artifact refresh paths to treat missing or stale projection files as repairable when the branch snapshot is authoritative, while keeping strict failures for real branch drift.

## Verify Steps

1. Run focused integrate tests. Expected: recoverable pr/meta.json or verify-sha drift no longer hard-fails integrate.
2. Exercise strict drift coverage. Expected: real branch drift still fails with an explicit validation error.
3. Run focused lint on touched integrate files. Expected: repaired artifact-refresh paths lint cleanly.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-07T20:47:13.337Z — VERIFY — ok

By: CODER

Note: Checks: bun x vitest run packages/agentplane/src/commands/pr/integrate/internal/prepare.test.ts; bun x vitest run packages/agentplane/src/cli/run-cli.core.pr-flow.pr.test.ts -t 'pr check'; bun x eslint packages/agentplane/src/commands/pr/internal/freshness.ts packages/agentplane/src/commands/pr/check.ts packages/agentplane/src/commands/pr/integrate/internal/prepare.ts packages/agentplane/src/commands/pr/integrate/internal/prepare.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.pr.test.ts. Evidence: pr check now recovers missing verify metadata only when task verification or verify.log proves current-head freshness, while real stale verify-sha drift still fails.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-07T20:28:06.106Z, excerpt_hash=sha256:1a3def187f7dc53641cdf9e5a826f814531967db06217c3ee6d9a782b614e533

### 2026-04-07T20:53:31.375Z — VERIFY — ok

By: CODER

Note: Refreshed verification after rebase onto origin/main. Checks remain valid for the rebased head because the code diff did not change; only parent history changed.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-07T20:47:13.340Z, excerpt_hash=sha256:1a3def187f7dc53641cdf9e5a826f814531967db06217c3ee6d9a782b614e533

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
