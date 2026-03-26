---
id: "202603261739-GWD3WX"
title: "Audit GitHub protection and required-check flow"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 6
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "github"
  - "ci"
  - "workflow"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-26T17:40:25.373Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-03-26T17:49:43.896Z"
  updated_by: "CODER"
  note: |-
    Command: bun run workflow:github-protection:check
    Result: pass
    Evidence: strict=true and all three canonical required checks are bound to app_id=15368 on main branch protection.
    Scope: live GitHub protection contract for the repository merge gate.
    
    Command: bunx vitest run packages/agentplane/src/cli/check-github-protection-contract-script.test.ts
    Result: pass
    Evidence: 4 tests passed covering help, success, null app_id failure, and required-check drift failure.
    Scope: new audit script behavior.
    
    Command: bunx prettier --check scripts/check-github-protection-contract.mjs packages/agentplane/src/cli/check-github-protection-contract-script.test.ts docs/user/branching-and-pr-artifacts.mdx docs/user/commands.mdx docs/help/troubleshooting-by-symptom.mdx package.json && bunx eslint scripts/check-github-protection-contract.mjs packages/agentplane/src/cli/check-github-protection-contract-script.test.ts
    Result: pass
    Evidence: formatting and lint both passed for the touched script, test, docs, and package script surface.
    Scope: touched code/docs hygiene.
commit: null
comments:
  -
    author: "CODER"
    body: "Start: audit GitHub branch protection, codify a required-check drift guard, and document the canonical branch_pr merge diagnostics so Expected-without-reported-status failures are caught early."
events:
  -
    type: "status"
    at: "2026-03-26T17:42:54.245Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: audit GitHub branch protection, codify a required-check drift guard, and document the canonical branch_pr merge diagnostics so Expected-without-reported-status failures are caught early."
  -
    type: "verify"
    at: "2026-03-26T17:49:43.896Z"
    author: "CODER"
    state: "ok"
    note: |-
      Command: bun run workflow:github-protection:check
      Result: pass
      Evidence: strict=true and all three canonical required checks are bound to app_id=15368 on main branch protection.
      Scope: live GitHub protection contract for the repository merge gate.
      
      Command: bunx vitest run packages/agentplane/src/cli/check-github-protection-contract-script.test.ts
      Result: pass
      Evidence: 4 tests passed covering help, success, null app_id failure, and required-check drift failure.
      Scope: new audit script behavior.
      
      Command: bunx prettier --check scripts/check-github-protection-contract.mjs packages/agentplane/src/cli/check-github-protection-contract-script.test.ts docs/user/branching-and-pr-artifacts.mdx docs/user/commands.mdx docs/help/troubleshooting-by-symptom.mdx package.json && bunx eslint scripts/check-github-protection-contract.mjs packages/agentplane/src/cli/check-github-protection-contract-script.test.ts
      Result: pass
      Evidence: formatting and lint both passed for the touched script, test, docs, and package script surface.
      Scope: touched code/docs hygiene.
doc_version: 3
doc_updated_at: "2026-03-26T17:49:43.912Z"
doc_updated_by: "CODER"
description: "Analyze the current GitHub branch protection and Actions check behavior, codify a repository-level audit for required check drift, and document the canonical branch_pr merge gate so Expected-without-reported-status regressions are detected automatically."
sections:
  Summary: |-
    Audit GitHub protection and required-check flow
    
    Analyze the current GitHub branch protection and Actions check behavior, codify a repository-level audit for required check drift, and document the canonical branch_pr merge gate so Expected-without-reported-status regressions are detected automatically.
  Scope: |-
    - In scope: Analyze the current GitHub branch protection and Actions check behavior, codify a repository-level audit for required check drift, and document the canonical branch_pr merge gate so Expected-without-reported-status regressions are detected automatically.
    - Out of scope: unrelated refactors not required for "Audit GitHub protection and required-check flow".
  Plan: |-
    1. Add a repository-level GitHub protection audit that compares main branch required checks against the canonical GitHub Actions check-run names and app binding.
    2. Document the canonical branch_pr merge gate and the diagnostics for Expected-without-reported-status failures.
    3. Verify the new audit locally and record the current optimized GitHub flow plus remaining technical debt.
  Verify Steps: |-
    1. Run the new GitHub protection audit command against the repository. Expected: it succeeds and confirms that `main` branch protection requires the canonical GitHub Actions check-runs for `Core CI / test`, `Core CI / test-windows`, and `Docs CI / docs`.
    2. Run the targeted verification suite for the new audit and touched workflow/docs surfaces. Expected: all tests/checks pass without regressions in the touched scope.
    3. Review the updated docs and workflow guidance. Expected: they explain the canonical `branch_pr` merge gate and the diagnostics for `Expected — Waiting for status to be reported`, with residual technical debt captured in `## Findings`.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    #### 2026-03-26T17:49:43.896Z — VERIFY — ok
    
    By: CODER
    
    Note: Command: bun run workflow:github-protection:check
    Result: pass
    Evidence: strict=true and all three canonical required checks are bound to app_id=15368 on main branch protection.
    Scope: live GitHub protection contract for the repository merge gate.
    
    Command: bunx vitest run packages/agentplane/src/cli/check-github-protection-contract-script.test.ts
    Result: pass
    Evidence: 4 tests passed covering help, success, null app_id failure, and required-check drift failure.
    Scope: new audit script behavior.
    
    Command: bunx prettier --check scripts/check-github-protection-contract.mjs packages/agentplane/src/cli/check-github-protection-contract-script.test.ts docs/user/branching-and-pr-artifacts.mdx docs/user/commands.mdx docs/help/troubleshooting-by-symptom.mdx package.json && bunx eslint scripts/check-github-protection-contract.mjs packages/agentplane/src/cli/check-github-protection-contract-script.test.ts
    Result: pass
    Evidence: formatting and lint both passed for the touched script, test, docs, and package script surface.
    Scope: touched code/docs hygiene.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-26T17:49:21.811Z, excerpt_hash=sha256:109b1f77bb1ea7d604aa8e4ba8da63ab04f8b94d034e10fd6ae4a6639788a0c7
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: "- Remaining GitHub Actions technical debt: workflow jobs still emit Node 20 deprecation warnings for actions/checkout@v4 and dorny/paths-filter@v3. This no longer blocks mergeability, but the repository should upgrade or explicitly opt into Node 24 before GitHub forces the switch."
id_source: "generated"
---
## Summary

Audit GitHub protection and required-check flow

Analyze the current GitHub branch protection and Actions check behavior, codify a repository-level audit for required check drift, and document the canonical branch_pr merge gate so Expected-without-reported-status regressions are detected automatically.

## Scope

- In scope: Analyze the current GitHub branch protection and Actions check behavior, codify a repository-level audit for required check drift, and document the canonical branch_pr merge gate so Expected-without-reported-status regressions are detected automatically.
- Out of scope: unrelated refactors not required for "Audit GitHub protection and required-check flow".

## Plan

1. Add a repository-level GitHub protection audit that compares main branch required checks against the canonical GitHub Actions check-run names and app binding.
2. Document the canonical branch_pr merge gate and the diagnostics for Expected-without-reported-status failures.
3. Verify the new audit locally and record the current optimized GitHub flow plus remaining technical debt.

## Verify Steps

1. Run the new GitHub protection audit command against the repository. Expected: it succeeds and confirms that `main` branch protection requires the canonical GitHub Actions check-runs for `Core CI / test`, `Core CI / test-windows`, and `Docs CI / docs`.
2. Run the targeted verification suite for the new audit and touched workflow/docs surfaces. Expected: all tests/checks pass without regressions in the touched scope.
3. Review the updated docs and workflow guidance. Expected: they explain the canonical `branch_pr` merge gate and the diagnostics for `Expected — Waiting for status to be reported`, with residual technical debt captured in `## Findings`.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-03-26T17:49:43.896Z — VERIFY — ok

By: CODER

Note: Command: bun run workflow:github-protection:check
Result: pass
Evidence: strict=true and all three canonical required checks are bound to app_id=15368 on main branch protection.
Scope: live GitHub protection contract for the repository merge gate.

Command: bunx vitest run packages/agentplane/src/cli/check-github-protection-contract-script.test.ts
Result: pass
Evidence: 4 tests passed covering help, success, null app_id failure, and required-check drift failure.
Scope: new audit script behavior.

Command: bunx prettier --check scripts/check-github-protection-contract.mjs packages/agentplane/src/cli/check-github-protection-contract-script.test.ts docs/user/branching-and-pr-artifacts.mdx docs/user/commands.mdx docs/help/troubleshooting-by-symptom.mdx package.json && bunx eslint scripts/check-github-protection-contract.mjs packages/agentplane/src/cli/check-github-protection-contract-script.test.ts
Result: pass
Evidence: formatting and lint both passed for the touched script, test, docs, and package script surface.
Scope: touched code/docs hygiene.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-26T17:49:21.811Z, excerpt_hash=sha256:109b1f77bb1ea7d604aa8e4ba8da63ab04f8b94d034e10fd6ae4a6639788a0c7

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- Remaining GitHub Actions technical debt: workflow jobs still emit Node 20 deprecation warnings for actions/checkout@v4 and dorny/paths-filter@v3. This no longer blocks mergeability, but the repository should upgrade or explicitly opt into Node 24 before GitHub forces the switch.
