---
id: "202605170813-46BSFQ"
title: "Add GitHub repository health workflows"
status: "DOING"
priority: "med"
owner: "CODER"
revision: 4
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
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
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
doc_version: 3
doc_updated_at: "2026-05-17T08:17:05.653Z"
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
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
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
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
