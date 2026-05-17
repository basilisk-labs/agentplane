---
id: "202605170813-46BSFQ"
title: "Add GitHub repository health workflows"
status: "DOING"
priority: "med"
owner: "CODER"
revision: 5
origin:
  system: "manual"
depends_on: []
tags:
  - "ci"
  - "github"
  - "security"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-17T08:14:06.642Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-17T08:26:42.195Z"
  updated_by: "CODER"
  note: "Added GitHub-native repository health workflows and verified workflow lint, formatting, and doctor in the task worktree."
  attempts: 0
commit: null
comments:
  -
    author: "CODER"
    body: "Start: Add GitHub-native repository health workflow configuration in a dedicated task branch, limited to CodeQL, dependency review, and Dependabot files under .github."
events:
  -
    type: "status"
    at: "2026-05-17T08:17:05.653Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Add GitHub-native repository health workflow configuration in a dedicated task branch, limited to CodeQL, dependency review, and Dependabot files under .github."
  -
    type: "verify"
    at: "2026-05-17T08:26:42.195Z"
    author: "CODER"
    state: "ok"
    note: "Added GitHub-native repository health workflows and verified workflow lint, formatting, and doctor in the task worktree."
doc_version: 3
doc_updated_at: "2026-05-17T08:26:42.232Z"
doc_updated_by: "CODER"
description: "Add GitHub-native maintenance workflows for code scanning, dependency review, and dependency update tracking."
sections:
  Summary: |-
    Add GitHub repository health workflows
    
    Add GitHub-native maintenance workflows for code scanning, dependency review, and dependency update tracking.
  Scope: |-
    - In scope: Add GitHub-native maintenance workflows for code scanning, dependency review, and dependency update tracking.
    - Out of scope: unrelated refactors not required for "Add GitHub repository health workflows".
  Plan: "Scope: add GitHub-native repository health maintenance configuration only. Files: .github/dependabot.yml, .github/workflows/dependency-review.yml, .github/workflows/codeql.yml. Do not touch application code or existing workflow semantics except through additive workflows. Verification: inspect generated YAML, run workflow lint/contract if available, and record any GitHub UI-only settings that cannot be enabled from repo files."
  Verify Steps: |-
    1. Inspect added GitHub workflow/config files. Expected: only additive repository-health files are changed under `.github/**`.
    2. Run `bun run workflows:lint`. Expected: actionlint and workflow command contract checks pass.
    3. Run `node packages/agentplane/bin/agentplane.js doctor`. Expected: repository workflow/runtime checks pass in the task worktree.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-17T08:26:42.195Z — VERIFY — ok
    
    By: CODER
    
    Note: Added GitHub-native repository health workflows and verified workflow lint, formatting, and doctor in the task worktree.
    Attempts: 0
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-17T08:17:05.653Z, excerpt_hash=sha256:6c4b27be81433c453025e67fc02e4becb85665b4dacd800292296f9aa43279f0
    
    Details:
    
    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605170813-46BSFQ-github-health-workflows/.agentplane/tasks/202605170813-46BSFQ/blueprint/resolved-snapshot.json
    - old_digest: 99f9ba7df480dc5c369b08bdc46e737fb075cf321354390d63e08c3b21e1995b
    - current_digest: 99f9ba7df480dc5c369b08bdc46e737fb075cf321354390d63e08c3b21e1995b
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605170813-46BSFQ
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    - Observation: Command: bun run workflows:lint; Result: pass; Evidence: workflow and command guidance contract OK, workflow lifecycle parity OK, critical Vitest route OK. Command: bun run format:check -- .github/dependabot.yml .github/workflows/dependency-review.yml .github/workflows/codeql.yml .agentplane/tasks/202605170813-46BSFQ/README.md; Result: pass; Evidence: All matched files use Prettier code style. Command: node packages/agentplane/bin/agentplane.js doctor; Result: pass; Evidence: doctor OK with 0 errors, 2 pre-existing branch_pr task-state warnings unrelated to this scope.
      Impact: Repository now has committed config for CodeQL scanning, dependency review on dependency/workflow PR changes, and grouped weekly Dependabot updates.
      Resolution: No code-path changes; GitHub UI-only secret scanning and push protection still need repository/admin setting verification.
id_source: "generated"
---
## Summary

Add GitHub repository health workflows

Add GitHub-native maintenance workflows for code scanning, dependency review, and dependency update tracking.

## Scope

- In scope: Add GitHub-native maintenance workflows for code scanning, dependency review, and dependency update tracking.
- Out of scope: unrelated refactors not required for "Add GitHub repository health workflows".

## Plan

Scope: add GitHub-native repository health maintenance configuration only. Files: .github/dependabot.yml, .github/workflows/dependency-review.yml, .github/workflows/codeql.yml. Do not touch application code or existing workflow semantics except through additive workflows. Verification: inspect generated YAML, run workflow lint/contract if available, and record any GitHub UI-only settings that cannot be enabled from repo files.

## Verify Steps

1. Inspect added GitHub workflow/config files. Expected: only additive repository-health files are changed under `.github/**`.
2. Run `bun run workflows:lint`. Expected: actionlint and workflow command contract checks pass.
3. Run `node packages/agentplane/bin/agentplane.js doctor`. Expected: repository workflow/runtime checks pass in the task worktree.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-17T08:26:42.195Z — VERIFY — ok

By: CODER

Note: Added GitHub-native repository health workflows and verified workflow lint, formatting, and doctor in the task worktree.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-17T08:17:05.653Z, excerpt_hash=sha256:6c4b27be81433c453025e67fc02e4becb85665b4dacd800292296f9aa43279f0

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605170813-46BSFQ-github-health-workflows/.agentplane/tasks/202605170813-46BSFQ/blueprint/resolved-snapshot.json
- old_digest: 99f9ba7df480dc5c369b08bdc46e737fb075cf321354390d63e08c3b21e1995b
- current_digest: 99f9ba7df480dc5c369b08bdc46e737fb075cf321354390d63e08c3b21e1995b
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605170813-46BSFQ

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- Observation: Command: bun run workflows:lint; Result: pass; Evidence: workflow and command guidance contract OK, workflow lifecycle parity OK, critical Vitest route OK. Command: bun run format:check -- .github/dependabot.yml .github/workflows/dependency-review.yml .github/workflows/codeql.yml .agentplane/tasks/202605170813-46BSFQ/README.md; Result: pass; Evidence: All matched files use Prettier code style. Command: node packages/agentplane/bin/agentplane.js doctor; Result: pass; Evidence: doctor OK with 0 errors, 2 pre-existing branch_pr task-state warnings unrelated to this scope.
  Impact: Repository now has committed config for CodeQL scanning, dependency review on dependency/workflow PR changes, and grouped weekly Dependabot updates.
  Resolution: No code-path changes; GitHub UI-only secret scanning and push protection still need repository/admin setting verification.
