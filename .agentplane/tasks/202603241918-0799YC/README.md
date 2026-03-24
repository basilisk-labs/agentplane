---
id: "202603241918-0799YC"
title: "GitHub admin: remove main-branch bypass from the normal workflow"
result_summary: "Enabled admin enforcement on main branch protection; remote green is now required for admins too."
status: "DONE"
priority: "high"
owner: "ORCHESTRATOR"
revision: 8
origin:
  system: "manual"
depends_on:
  - "202603241918-762TM7"
tags:
  - "workflow"
  - "github"
  - "admin"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-24T19:57:24.095Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-03-24T20:17:52.756Z"
  updated_by: "ORCHESTRATOR"
  note: |-
    Command: gh api repos/basilisk-labs/agentplane/branches/main/protection
    Result: pass
    Evidence: classic branch protection on `main` requires `Core CI / test`, `Core CI / test-windows`, and `Docs CI / docs`, while `enforce_admins` was initially false.
    Scope: GitHub branch protection state for `main`.
    Links: GitHub branch protection API, task 202603241918-0799YC
    
    Command: gh api repos/basilisk-labs/agentplane/rulesets
    Result: pass
    Evidence: returned `[]`, confirming the bypass was not coming from repo-level rulesets.
    Scope: GitHub ruleset inventory for the repository.
    Links: GitHub rulesets API, task 202603241918-0799YC
    
    Command: gh api graphql -f query='query { repository(owner:"basilisk-labs", name:"agentplane") { branchProtectionRules(first: 20) { nodes { id pattern isAdminEnforced requiredStatusCheckContexts requiresStrictStatusChecks } } } }'
    Result: pass
    Evidence: branch protection rule `main` (`BPR_kwDORCLmJM4EWdOA`) reported `isAdminEnforced=false` before the change.
    Scope: GraphQL branchProtectionRule state before mutation.
    Links: GitHub GraphQL branchProtectionRules query, task 202603241918-0799YC
    
    Command: gh api graphql -f query='mutation($input: UpdateBranchProtectionRuleInput!) { updateBranchProtectionRule(input: $input) { branchProtectionRule { id pattern isAdminEnforced requiredStatusCheckContexts requiresStrictStatusChecks requiresConversationResolution allowsForcePushes allowsDeletions } } }' -F 'input[branchProtectionRuleId]=BPR_kwDORCLmJM4EWdOA' -F 'input[isAdminEnforced]=true'
    Result: pass
    Evidence: mutation succeeded and returned `isAdminEnforced=true` while preserving the required checks and other guardrails.
    Scope: GitHub branch protection mutation for `main`.
    Links: GitHub GraphQL updateBranchProtectionRule mutation, task 202603241918-0799YC
    
    Command: gh api repos/basilisk-labs/agentplane/branches/main/protection/enforce_admins
    Result: pass
    Evidence: post-change read returned `enabled=true`, confirming admins can no longer bypass required checks on `main` in the normal workflow.
    Scope: final GitHub branch protection state for `main`.
    Links: GitHub branch protection API, task 202603241918-0799YC
commit:
  hash: "bead9a8ce733ca4ab0fe9003f3d36288a6ecf575"
  message: "✅ 762TM7 close: Repo-local workflow default is branch_pr and the base branch is pinned to main. (202603241918-762TM7) [code,workflow,config]"
comments:
  -
    author: "ORCHESTRATOR"
    body: "Start: auditing and tightening GitHub branch protection so main no longer relies on bypass for normal development, required checks stay authoritative, and the exact server-side delta is recorded before follow-up workflow docs/tooling changes."
  -
    author: "INTEGRATOR"
    body: "Verified: GitHub branch protection on main now enforces admins, keeps the existing required checks, and removes the old admin-bypass path from the normal workflow; repo-level rulesets remain empty, and the exact GraphQL mutation plus final protection state were recorded in task verification."
events:
  -
    type: "status"
    at: "2026-03-24T20:14:44.519Z"
    author: "ORCHESTRATOR"
    from: "TODO"
    to: "DOING"
    note: "Start: auditing and tightening GitHub branch protection so main no longer relies on bypass for normal development, required checks stay authoritative, and the exact server-side delta is recorded before follow-up workflow docs/tooling changes."
  -
    type: "verify"
    at: "2026-03-24T20:17:52.756Z"
    author: "ORCHESTRATOR"
    state: "ok"
    note: |-
      Command: gh api repos/basilisk-labs/agentplane/branches/main/protection
      Result: pass
      Evidence: classic branch protection on `main` requires `Core CI / test`, `Core CI / test-windows`, and `Docs CI / docs`, while `enforce_admins` was initially false.
      Scope: GitHub branch protection state for `main`.
      Links: GitHub branch protection API, task 202603241918-0799YC
      
      Command: gh api repos/basilisk-labs/agentplane/rulesets
      Result: pass
      Evidence: returned `[]`, confirming the bypass was not coming from repo-level rulesets.
      Scope: GitHub ruleset inventory for the repository.
      Links: GitHub rulesets API, task 202603241918-0799YC
      
      Command: gh api graphql -f query='query { repository(owner:"basilisk-labs", name:"agentplane") { branchProtectionRules(first: 20) { nodes { id pattern isAdminEnforced requiredStatusCheckContexts requiresStrictStatusChecks } } } }'
      Result: pass
      Evidence: branch protection rule `main` (`BPR_kwDORCLmJM4EWdOA`) reported `isAdminEnforced=false` before the change.
      Scope: GraphQL branchProtectionRule state before mutation.
      Links: GitHub GraphQL branchProtectionRules query, task 202603241918-0799YC
      
      Command: gh api graphql -f query='mutation($input: UpdateBranchProtectionRuleInput!) { updateBranchProtectionRule(input: $input) { branchProtectionRule { id pattern isAdminEnforced requiredStatusCheckContexts requiresStrictStatusChecks requiresConversationResolution allowsForcePushes allowsDeletions } } }' -F 'input[branchProtectionRuleId]=BPR_kwDORCLmJM4EWdOA' -F 'input[isAdminEnforced]=true'
      Result: pass
      Evidence: mutation succeeded and returned `isAdminEnforced=true` while preserving the required checks and other guardrails.
      Scope: GitHub branch protection mutation for `main`.
      Links: GitHub GraphQL updateBranchProtectionRule mutation, task 202603241918-0799YC
      
      Command: gh api repos/basilisk-labs/agentplane/branches/main/protection/enforce_admins
      Result: pass
      Evidence: post-change read returned `enabled=true`, confirming admins can no longer bypass required checks on `main` in the normal workflow.
      Scope: final GitHub branch protection state for `main`.
      Links: GitHub branch protection API, task 202603241918-0799YC
  -
    type: "status"
    at: "2026-03-24T20:18:11.182Z"
    author: "INTEGRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: GitHub branch protection on main now enforces admins, keeps the existing required checks, and removes the old admin-bypass path from the normal workflow; repo-level rulesets remain empty, and the exact GraphQL mutation plus final protection state were recorded in task verification."
doc_version: 3
doc_updated_at: "2026-03-24T20:18:11.183Z"
doc_updated_by: "INTEGRATOR"
description: "Update GitHub branch protection usage so normal development no longer bypasses required checks on main. This is an operational/admin task needed to make branch_pr actually enforce remote green before main."
sections:
  Summary: |-
    GitHub admin: remove main-branch bypass from the normal workflow
    
    Update GitHub branch protection usage so normal development no longer bypasses required checks on main. This is an operational/admin task needed to make branch_pr actually enforce remote green before main.
  Scope: |-
    - In scope: Update GitHub branch protection usage so normal development no longer bypasses required checks on main. This is an operational/admin task needed to make branch_pr actually enforce remote green before main.
    - Out of scope: unrelated refactors not required for "GitHub admin: remove main-branch bypass from the normal workflow".
  Plan: |-
    1. Inspect the current GitHub protection/ruleset configuration for main and identify the exact bypass path that still allows direct pushes before remote required checks finish.
    2. Remove or narrow the bypass so normal development cannot update main before required checks are green.
    3. Verify the resulting protection contract matches the intended branch_pr-first workflow.
  Verify Steps: |-
    1. Inspect the GitHub branch protection or ruleset after the change. Expected: main still requires the existing required checks and no longer allows the normal workflow actor to bypass them.
    2. Compare the resulting protection model against the intended workflow. Expected: remote-green-before-main now depends on PR/required-check flow rather than a bypassed direct push.
    3. Record the exact GitHub-side delta in task verification notes. Expected: the new protection state is auditable without guessing.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    #### 2026-03-24T20:17:52.756Z — VERIFY — ok
    
    By: ORCHESTRATOR
    
    Note: Command: gh api repos/basilisk-labs/agentplane/branches/main/protection
    Result: pass
    Evidence: classic branch protection on `main` requires `Core CI / test`, `Core CI / test-windows`, and `Docs CI / docs`, while `enforce_admins` was initially false.
    Scope: GitHub branch protection state for `main`.
    Links: GitHub branch protection API, task 202603241918-0799YC
    
    Command: gh api repos/basilisk-labs/agentplane/rulesets
    Result: pass
    Evidence: returned `[]`, confirming the bypass was not coming from repo-level rulesets.
    Scope: GitHub ruleset inventory for the repository.
    Links: GitHub rulesets API, task 202603241918-0799YC
    
    Command: gh api graphql -f query='query { repository(owner:"basilisk-labs", name:"agentplane") { branchProtectionRules(first: 20) { nodes { id pattern isAdminEnforced requiredStatusCheckContexts requiresStrictStatusChecks } } } }'\nResult: pass\nEvidence: branch protection rule `main` (`BPR_kwDORCLmJM4EWdOA`) reported `isAdminEnforced=false` before the change.\nScope: GraphQL branchProtectionRule state before mutation.\nLinks: GitHub GraphQL branchProtectionRules query, task 202603241918-0799YC\n\nCommand: gh api graphql -f query='mutation($input: UpdateBranchProtectionRuleInput!) { updateBranchProtectionRule(input: $input) { branchProtectionRule { id pattern isAdminEnforced requiredStatusCheckContexts requiresStrictStatusChecks requiresConversationResolution allowsForcePushes allowsDeletions } } }' -F 'input[branchProtectionRuleId]=BPR_kwDORCLmJM4EWdOA' -F 'input[isAdminEnforced]=true'\nResult: pass\nEvidence: mutation succeeded and returned `isAdminEnforced=true` while preserving the required checks and other guardrails.\nScope: GitHub branch protection mutation for `main`.\nLinks: GitHub GraphQL updateBranchProtectionRule mutation, task 202603241918-0799YC\n\nCommand: gh api repos/basilisk-labs/agentplane/branches/main/protection/enforce_admins\nResult: pass\nEvidence: post-change read returned `enabled=true`, confirming admins can no longer bypass required checks on `main` in the normal workflow.\nScope: final GitHub branch protection state for `main`.\nLinks: GitHub branch protection API, task 202603241918-0799YC
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-24T20:17:52.180Z, excerpt_hash=sha256:5c88274dee0fe4c9a8e61b6c81624e59cbb64d532ffe323c75e0679fc809b6c8
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    1. GitHub repo-level rulesets are currently empty (`gh api repos/basilisk-labs/agentplane/rulesets` returned `[]`), so the normal bypass path was not a ruleset exception but classic branch protection with `isAdminEnforced=false` on the `main` branch protection rule.
    2. The REST mutation paths for `enforce_admins` returned GitHub HTTP 500 with an empty body in this repository, while the equivalent GraphQL `updateBranchProtectionRule` mutation succeeded. The operational runbook for this repository should therefore prefer the GraphQL path when the REST endpoint is unstable.
id_source: "generated"
---
## Summary

GitHub admin: remove main-branch bypass from the normal workflow

Update GitHub branch protection usage so normal development no longer bypasses required checks on main. This is an operational/admin task needed to make branch_pr actually enforce remote green before main.

## Scope

- In scope: Update GitHub branch protection usage so normal development no longer bypasses required checks on main. This is an operational/admin task needed to make branch_pr actually enforce remote green before main.
- Out of scope: unrelated refactors not required for "GitHub admin: remove main-branch bypass from the normal workflow".

## Plan

1. Inspect the current GitHub protection/ruleset configuration for main and identify the exact bypass path that still allows direct pushes before remote required checks finish.
2. Remove or narrow the bypass so normal development cannot update main before required checks are green.
3. Verify the resulting protection contract matches the intended branch_pr-first workflow.

## Verify Steps

1. Inspect the GitHub branch protection or ruleset after the change. Expected: main still requires the existing required checks and no longer allows the normal workflow actor to bypass them.
2. Compare the resulting protection model against the intended workflow. Expected: remote-green-before-main now depends on PR/required-check flow rather than a bypassed direct push.
3. Record the exact GitHub-side delta in task verification notes. Expected: the new protection state is auditable without guessing.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-03-24T20:17:52.756Z — VERIFY — ok

By: ORCHESTRATOR

Note: Command: gh api repos/basilisk-labs/agentplane/branches/main/protection
Result: pass
Evidence: classic branch protection on `main` requires `Core CI / test`, `Core CI / test-windows`, and `Docs CI / docs`, while `enforce_admins` was initially false.
Scope: GitHub branch protection state for `main`.
Links: GitHub branch protection API, task 202603241918-0799YC

Command: gh api repos/basilisk-labs/agentplane/rulesets
Result: pass
Evidence: returned `[]`, confirming the bypass was not coming from repo-level rulesets.
Scope: GitHub ruleset inventory for the repository.
Links: GitHub rulesets API, task 202603241918-0799YC

Command: gh api graphql -f query='query { repository(owner:"basilisk-labs", name:"agentplane") { branchProtectionRules(first: 20) { nodes { id pattern isAdminEnforced requiredStatusCheckContexts requiresStrictStatusChecks } } } }'\nResult: pass\nEvidence: branch protection rule `main` (`BPR_kwDORCLmJM4EWdOA`) reported `isAdminEnforced=false` before the change.\nScope: GraphQL branchProtectionRule state before mutation.\nLinks: GitHub GraphQL branchProtectionRules query, task 202603241918-0799YC\n\nCommand: gh api graphql -f query='mutation($input: UpdateBranchProtectionRuleInput!) { updateBranchProtectionRule(input: $input) { branchProtectionRule { id pattern isAdminEnforced requiredStatusCheckContexts requiresStrictStatusChecks requiresConversationResolution allowsForcePushes allowsDeletions } } }' -F 'input[branchProtectionRuleId]=BPR_kwDORCLmJM4EWdOA' -F 'input[isAdminEnforced]=true'\nResult: pass\nEvidence: mutation succeeded and returned `isAdminEnforced=true` while preserving the required checks and other guardrails.\nScope: GitHub branch protection mutation for `main`.\nLinks: GitHub GraphQL updateBranchProtectionRule mutation, task 202603241918-0799YC\n\nCommand: gh api repos/basilisk-labs/agentplane/branches/main/protection/enforce_admins\nResult: pass\nEvidence: post-change read returned `enabled=true`, confirming admins can no longer bypass required checks on `main` in the normal workflow.\nScope: final GitHub branch protection state for `main`.\nLinks: GitHub branch protection API, task 202603241918-0799YC

VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-24T20:17:52.180Z, excerpt_hash=sha256:5c88274dee0fe4c9a8e61b6c81624e59cbb64d532ffe323c75e0679fc809b6c8

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

1. GitHub repo-level rulesets are currently empty (`gh api repos/basilisk-labs/agentplane/rulesets` returned `[]`), so the normal bypass path was not a ruleset exception but classic branch protection with `isAdminEnforced=false` on the `main` branch protection rule.
2. The REST mutation paths for `enforce_admins` returned GitHub HTTP 500 with an empty body in this repository, while the equivalent GraphQL `updateBranchProtectionRule` mutation succeeded. The operational runbook for this repository should therefore prefer the GraphQL path when the REST endpoint is unstable.
